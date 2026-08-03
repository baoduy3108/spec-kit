#!/usr/bin/env python3
"""Gộp LoRA adapter vào model NỀN → ra 1 thư mục model đầy đủ (chạy trên máy bạn).

Sau khi train xong (Kaggle/máy GPU) bạn có thư mục adapter (vd `out/lumina-lora`).
Script này gộp nó vào model nền thành model độc lập → sau đó convert GGUF cho Ollama
(xem export_ollama.md). KHÔNG cần gửi file cho ai — chỉ 1 lệnh, chạy tại chỗ.

  python merge_lora.py --adapter out/lumina-lora --out out/lumina-merged
  # base tự đọc từ adapter_config.json; ép base khác thì thêm --base <hf_id/đường_dẫn>

Cần GPU/CPU đủ RAM để nạp model nền ở FP16 (7B ≈ 15GB RAM/VRAM). Máy yếu thì làm
bước này ngay trên Kaggle/Colab rồi tải thư mục merged về.
"""
from __future__ import annotations
import argparse
import os


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--adapter", required=True, help="Thư mục LoRA adapter (từ train_lora.py).")
    ap.add_argument("--out", default="out/lumina-merged", help="Thư mục ghi model đã gộp.")
    ap.add_argument("--base", default=None,
                    help="Model nền (mặc định lấy từ adapter_config.json của adapter).")
    args = ap.parse_args()

    try:
        import torch
        from peft import PeftModel
        from transformers import AutoModelForCausalLM, AutoTokenizer
    except ImportError:
        raise SystemExit("Thiếu thư viện: pip install -r requirements.txt")

    # Base có thể suy ra từ adapter (peft ghi base_model_name_or_path) hoặc ép qua --base.
    if args.base:
        base_id = args.base
        base = AutoModelForCausalLM.from_pretrained(base_id, torch_dtype=torch.float16, device_map="cpu")
        model = PeftModel.from_pretrained(base, args.adapter)
    else:
        from peft import AutoPeftModelForCausalLM
        model = AutoPeftModelForCausalLM.from_pretrained(
            args.adapter, torch_dtype=torch.float16, device_map="cpu")
        base_id = model.peft_config["default"].base_model_name_or_path

    print(f"[gộp] adapter={args.adapter}  base={base_id}")
    model = model.merge_and_unload()          # gộp adapter vào weights → model FP16 đầy đủ
    os.makedirs(args.out, exist_ok=True)
    model.save_pretrained(args.out, safe_serialization=True)

    # Lưu tokenizer (ưu tiên của adapter, thiếu thì lấy của base) để model chạy độc lập.
    try:
        AutoTokenizer.from_pretrained(args.adapter).save_pretrained(args.out)
    except Exception:
        AutoTokenizer.from_pretrained(base_id).save_pretrained(args.out)

    print(f"✅ Xong → {args.out}\n   Bước tiếp: convert GGUF + nạp Ollama (xem export_ollama.md).")


if __name__ == "__main__":
    main()
