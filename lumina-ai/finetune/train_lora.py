#!/usr/bin/env python3
"""Fine-tune QLoRA cho LUMINA local model — CẦN GPU CUDA.

Đọc file chat JSONL (từ prepare_data.py) và fine-tune một model MỞ NHỎ (7B–14B)
bằng LoRA 4-bit (QLoRA) qua TRL SFTTrainer. Kết quả là một LoRA adapter nhỏ.

Ví dụ:
    python train_lora.py --base Qwen/Qwen2.5-7B-Instruct \
        --data data/train.jsonl --out out/lumina-lora \
        --epochs 1 --batch 2 --grad-accum 8 --lr 2e-4 --max-seq 2048

Máy tối thiểu: 1 GPU ~16–24GB (7B QLoRA). Thuê A100/H100 cloud vài giờ là đủ.
"""
from __future__ import annotations
import argparse


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="Qwen/Qwen2.5-7B-Instruct",
                    help="Model nền MỞ, cỡ nhỏ (7B–14B). VD: meta-llama/Llama-3.1-8B-Instruct, mistralai/Mistral-7B-Instruct-v0.3")
    ap.add_argument("--data", default="data/train.jsonl")
    ap.add_argument("--out", default="out/lumina-lora")
    ap.add_argument("--epochs", type=float, default=1.0)
    ap.add_argument("--batch", type=int, default=2)
    ap.add_argument("--grad-accum", type=int, default=8)
    ap.add_argument("--lr", type=float, default=2e-4)
    ap.add_argument("--max-seq", type=int, default=2048)
    ap.add_argument("--lora-r", type=int, default=16)
    ap.add_argument("--lora-alpha", type=int, default=32)
    args = ap.parse_args()

    try:
        import torch
        from datasets import load_dataset
        from transformers import (AutoModelForCausalLM, AutoTokenizer,
                                  BitsAndBytesConfig)
        from peft import LoraConfig
        from trl import SFTConfig, SFTTrainer
    except ImportError as e:
        raise SystemExit(f"Thiếu thư viện ({e}). Chạy: pip install -r requirements.txt (trên máy GPU CUDA)")

    tok = AutoTokenizer.from_pretrained(args.base)
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token

    # QLoRA: nạp model nền ở 4-bit để vừa 1 GPU
    bnb = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16,
        bnb_4bit_use_double_quant=True,
    )
    model = AutoModelForCausalLM.from_pretrained(
        args.base, quantization_config=bnb, torch_dtype=torch.bfloat16, device_map="auto",
    )

    ds = load_dataset("json", data_files=args.data, split="train")

    def to_text(row):
        # Dùng chat template của chính model nền → khớp định dạng khi chạy Ollama.
        return {"text": tok.apply_chat_template(row["messages"], tokenize=False,
                                                add_generation_prompt=False)}
    ds = ds.map(to_text, remove_columns=ds.column_names)

    lora = LoraConfig(
        r=args.lora_r, lora_alpha=args.lora_alpha, lora_dropout=0.05, bias="none",
        task_type="CAUSAL_LM",
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                        "gate_proj", "up_proj", "down_proj"],
    )
    cfg = SFTConfig(
        output_dir=args.out, num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch,
        gradient_accumulation_steps=args.grad_accum,
        learning_rate=args.lr, lr_scheduler_type="cosine", warmup_ratio=0.03,
        logging_steps=20, save_steps=200, save_total_limit=2,
        bf16=True, max_seq_length=args.max_seq, packing=True,
        dataset_text_field="text", report_to="none",
    )
    trainer = SFTTrainer(model=model, args=cfg, train_dataset=ds, peft_config=lora)
    trainer.train()
    trainer.save_model(args.out)
    tok.save_pretrained(args.out)
    print(f"\nXong. LoRA adapter → {args.out}")
    print("Tiếp theo: gộp adapter + xuất GGUF cho Ollama — xem export_ollama.md")


if __name__ == "__main__":
    main()
