#!/usr/bin/env python3
"""Chuẩn bị dữ liệu fine-tune cho LUMINA local model.

Tải các dataset SFT/instruction THẬT từ HuggingFace và chuẩn hoá về MỘT format
chat JSONL thống nhất:  {"messages": [{"role": "...", "content": "..."}, ...]}

Chỉ hỗ trợ sẵn các dataset ĐÚNG loại (xem DATASETS.md). Thêm nguồn khác bằng cách
viết một hàm map trả về list[dict(role,content)] rồi đăng ký vào SOURCES.

Chạy trên máy có kết nối mạng (tải dataset). KHÔNG cần GPU cho bước này.

Ví dụ:
    python prepare_data.py --sources dolly,ultrachat,openhermes,openorca \
        --max-per-source 8000 --out data/train.jsonl
"""
from __future__ import annotations
import argparse
import json
import os
import random


def _dolly(row):
    instr = (row.get("instruction") or "").strip()
    ctx = (row.get("context") or "").strip()
    resp = (row.get("response") or "").strip()
    if not instr or not resp:
        return None
    user = f"{instr}\n\n{ctx}" if ctx else instr
    return [{"role": "user", "content": user}, {"role": "assistant", "content": resp}]


def _ultrachat(row):
    msgs = row.get("messages")
    if not msgs:
        return None
    out = [{"role": m["role"], "content": m["content"]} for m in msgs
           if m.get("role") in ("system", "user", "assistant") and m.get("content")]
    return out if len(out) >= 2 else None


def _openhermes(row):
    conv = row.get("conversations")
    if not conv:
        return None
    role_map = {"system": "system", "human": "user", "gpt": "assistant"}
    out = []
    for m in conv:
        role = role_map.get(m.get("from"))
        val = (m.get("value") or "").strip()
        if role and val:
            out.append({"role": role, "content": val})
    return out if len(out) >= 2 else None


def _openorca(row):
    q = (row.get("question") or "").strip()
    a = (row.get("response") or "").strip()
    sys = (row.get("system_prompt") or "").strip()
    if not q or not a:
        return None
    out = []
    if sys:
        out.append({"role": "system", "content": sys})
    out.append({"role": "user", "content": q})
    out.append({"role": "assistant", "content": a})
    return out


# name -> (hf_id, split, map_fn)
SOURCES = {
    "dolly":     ("databricks/databricks-dolly-15k", "train",     _dolly),
    "ultrachat": ("HuggingFaceH4/ultrachat_200k",    "train_sft", _ultrachat),
    "openhermes":("teknium/OpenHermes-2.5",          "train",     _openhermes),
    "openorca":  ("Open-Orca/OpenOrca",              "train",     _openorca),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", default="dolly,ultrachat",
                    help="Danh sách nguồn, phẩy ngăn cách: " + ",".join(SOURCES))
    ap.add_argument("--max-per-source", type=int, default=8000,
                    help="Số mẫu tối đa lấy mỗi nguồn (giữ dataset nhỏ, sạch).")
    ap.add_argument("--out", default="data/train.jsonl")
    ap.add_argument("--seed", type=int, default=42)
    args = ap.parse_args()

    try:
        from datasets import load_dataset
    except ImportError:
        raise SystemExit("Thiếu thư viện: pip install -r requirements.txt")

    random.seed(args.seed)
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    total = 0
    with open(args.out, "w", encoding="utf-8") as f:
        for name in [s.strip() for s in args.sources.split(",") if s.strip()]:
            if name not in SOURCES:
                print(f"[bỏ qua] nguồn không hỗ trợ: {name}")
                continue
            hf_id, split, fn = SOURCES[name]
            print(f"[tải] {name} ← {hf_id}:{split}")
            try:
                ds = load_dataset(hf_id, split=split, streaming=True)
            except Exception as e:
                print(f"  ! lỗi tải {hf_id}: {e}")
                continue
            kept = 0
            for row in ds:
                if kept >= args.max_per_source:
                    break
                try:
                    msgs = fn(row)
                except Exception:
                    msgs = None
                if not msgs:
                    continue
                f.write(json.dumps({"messages": msgs}, ensure_ascii=False) + "\n")
                kept += 1
                total += 1
            print(f"  → giữ {kept} mẫu")
    print(f"\nXong: {total} mẫu → {args.out}")
    print("Kiểm nhanh: head -n1 " + args.out)


if __name__ == "__main__":
    main()
