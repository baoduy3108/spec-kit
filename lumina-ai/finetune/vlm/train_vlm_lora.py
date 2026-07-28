#!/usr/bin/env python3
"""Fine-tune QLoRA cho VLM ẢNH→CODE — CẦN GPU CUDA (VLM 7B ≈ 24–48GB).

Đọc manifest JSONL từ prepare_vlm_data.py ({image, prompt, code}) và fine-tune một
VLM MỞ (mặc định Qwen2.5-VL-7B-Instruct) bằng LoRA 4-bit. Kết quả là LoRA adapter.

LƯU Ý THẬT:
- API processor/collator của VLM thay đổi theo phiên bản transformers. Script này
  viết cho họ Qwen2.5-VL; đổi model nền khác (Llama-3.2-Vision, InternVL…) có thể
  phải chỉnh cách dựng messages/processor theo tài liệu model đó.
- Không chạy được nếu máy không có GPU CUDA.

Ví dụ:
    python train_vlm_lora.py --base Qwen/Qwen2.5-VL-7B-Instruct \
        --data data/vlm_train.jsonl --out out/lumina-vlm-lora --epochs 1 --batch 1
"""
from __future__ import annotations
import argparse
import json


def load_manifest(path: str) -> list[dict]:
    rows = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                rows.append(json.loads(line))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="Qwen/Qwen2.5-VL-7B-Instruct")
    ap.add_argument("--data", default="data/vlm_train.jsonl")
    ap.add_argument("--out", default="out/lumina-vlm-lora")
    ap.add_argument("--epochs", type=float, default=1.0)
    ap.add_argument("--batch", type=int, default=1)
    ap.add_argument("--grad-accum", type=int, default=8)
    ap.add_argument("--lr", type=float, default=1e-4)
    ap.add_argument("--lora-r", type=int, default=16)
    ap.add_argument("--lora-alpha", type=int, default=32)
    args = ap.parse_args()

    try:
        import torch
        from PIL import Image
        from transformers import (AutoProcessor, BitsAndBytesConfig,
                                  Qwen2_5_VLForConditionalGeneration, Trainer,
                                  TrainingArguments)
        from peft import LoraConfig, get_peft_model
    except ImportError as e:
        raise SystemExit(f"Thiếu thư viện ({e}). Chạy: pip install -r requirements.txt (máy GPU CUDA)")

    processor = AutoProcessor.from_pretrained(args.base)
    bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4",
                             bnb_4bit_compute_dtype=torch.bfloat16,
                             bnb_4bit_use_double_quant=True)
    model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
        args.base, quantization_config=bnb, torch_dtype=torch.bfloat16, device_map="auto")

    lora = LoraConfig(
        r=args.lora_r, lora_alpha=args.lora_alpha, lora_dropout=0.05, bias="none",
        task_type="CAUSAL_LM",
        # Chỉ LoRA phần ngôn ngữ; giữ nguyên vision encoder cho nhẹ/ổn định.
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                        "gate_proj", "up_proj", "down_proj"])
    model = get_peft_model(model, lora)
    model.print_trainable_parameters()

    rows = load_manifest(args.data)
    print(f"Nạp {len(rows)} mẫu ảnh→code từ {args.data}")

    def collate(batch: list[dict]):
        texts, images = [], []
        for ex in batch:
            img = Image.open(ex["image"]).convert("RGB")
            messages = [{
                "role": "user",
                "content": [{"type": "image"}, {"type": "text", "text": ex["prompt"]}],
            }, {
                "role": "assistant",
                "content": [{"type": "text", "text": ex["code"]}],
            }]
            texts.append(processor.apply_chat_template(messages, tokenize=False,
                                                       add_generation_prompt=False))
            images.append([img])
        enc = processor(text=texts, images=images, return_tensors="pt",
                        padding=True, truncation=True, max_length=4096)
        labels = enc["input_ids"].clone()
        labels[labels == processor.tokenizer.pad_token_id] = -100
        enc["labels"] = labels
        return enc

    cfg = TrainingArguments(
        output_dir=args.out, num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch, gradient_accumulation_steps=args.grad_accum,
        learning_rate=args.lr, lr_scheduler_type="cosine", warmup_ratio=0.03,
        logging_steps=10, save_steps=200, save_total_limit=2, bf16=True,
        gradient_checkpointing=True, report_to="none", remove_unused_columns=False)
    trainer = Trainer(model=model, args=cfg, train_dataset=rows, data_collator=collate)
    trainer.train()
    trainer.save_model(args.out)
    processor.save_pretrained(args.out)
    print(f"\nXong. LoRA adapter (ảnh→code) → {args.out}")
    print("Gộp adapter + chạy bằng transformers, hoặc export sang runtime hỗ trợ VLM.")


if __name__ == "__main__":
    main()
