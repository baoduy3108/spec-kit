#!/usr/bin/env python3
"""Chuẩn bị dữ liệu ẢNH→CODE cho fine-tune VLM (Rico / Vision2UI / WebCode2M).

Tải dataset đa phương thức từ HuggingFace, LƯU ẢNH ra đĩa, và ghi một manifest
JSONL mỗi dòng: {"image": "<đường dẫn>", "prompt": "<yêu cầu>", "code": "<đáp án>"}.
train_vlm_lora.py đọc manifest này.

KHÁC pipeline text: đầu vào có ẢNH nên phải lưu file ảnh + tham chiếu đường dẫn.
Schema mỗi dataset khác nhau và hay đổi — dùng --list để xem cột thật rồi chỉnh
map nếu cần (giống prepare_data.py bên ../).

Chạy trên máy có mạng (tải dataset). Không cần GPU cho bước NÀY, nhưng bước train
thì CẦN GPU.

Ví dụ:
    python prepare_vlm_data.py --list --sources vision2ui
    python prepare_vlm_data.py --sources vision2ui --max 5000 \
        --img-dir data/img --out data/vlm_train.jsonl
"""
from __future__ import annotations
import argparse
import json
import os

DEFAULT_PROMPT = "Viết code HTML/CSS tái tạo giao diện trong ảnh này."

# name -> (hf_id, config|None, split)
SOURCES = {
    "vision2ui":  ("xcodemind/vision2ui", None, "train"),
    "webcode2m":  ("xcodemind/webcode2m", None, "train"),
    "rico":       ("creative-graphic-design/Rico", None, "train"),
}

# Tên cột ẢNH và cột CODE thường gặp (tự dò; chỉnh nếu card dataset khác).
_IMG_KEYS = ("image", "screenshot", "img", "png", "rendered_image")
_CODE_KEYS = ("code", "html", "text", "target", "output", "annotation", "layout")


def _pick(row: dict, keys) -> str | None:
    for k in keys:
        if k in row and row[k] not in (None, ""):
            return k
    return None


def _save_image(img, path: str) -> bool:
    """img có thể là PIL.Image (datasets giải mã sẵn) hoặc dict/bytes. Trả True nếu lưu được."""
    try:
        from PIL import Image
        if hasattr(img, "save"):                      # PIL.Image
            img.convert("RGB").save(path)
            return True
        if isinstance(img, dict) and img.get("bytes"):
            import io
            Image.open(io.BytesIO(img["bytes"])).convert("RGB").save(path)
            return True
        if isinstance(img, (bytes, bytearray)):
            import io
            Image.open(io.BytesIO(img)).convert("RGB").save(path)
            return True
    except Exception as e:  # noqa: BLE001
        print(f"  ! lưu ảnh lỗi: {e}")
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", default="vision2ui", help="phẩy ngăn cách; xem SOURCES.")
    ap.add_argument("--max", type=int, default=5000, help="số mẫu tối đa mỗi nguồn.")
    ap.add_argument("--img-dir", default="data/img")
    ap.add_argument("--out", default="data/vlm_train.jsonl")
    ap.add_argument("--prompt", default=DEFAULT_PROMPT)
    ap.add_argument("--list", action="store_true", help="In cột thật của dataset rồi thoát.")
    args = ap.parse_args()

    try:
        from datasets import load_dataset
    except ImportError:
        raise SystemExit("Thiếu thư viện: pip install -r requirements.txt")

    names = [s.strip().lower() for s in args.sources.split(",") if s.strip()]

    if args.list:
        for name in names:
            if name not in SOURCES:
                print(f"[bỏ qua] {name}"); continue
            hf_id, cfg, split = SOURCES[name]
            ds = load_dataset(hf_id, cfg, split=split, streaming=True) if cfg \
                else load_dataset(hf_id, split=split, streaming=True)
            row = next(iter(ds))
            print(f"\n== {name} ({hf_id}) — cột thật ==")
            for k, v in row.items():
                print(f"   {k}: {type(v).__name__}")
        return

    os.makedirs(args.img_dir, exist_ok=True)
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    total = 0
    with open(args.out, "w", encoding="utf-8") as f:
        for name in names:
            if name not in SOURCES:
                print(f"[bỏ qua] nguồn không hỗ trợ: {name}"); continue
            hf_id, cfg, split = SOURCES[name]
            print(f"[tải] {name} ← {hf_id}")
            try:
                ds = load_dataset(hf_id, cfg, split=split, streaming=True) if cfg \
                    else load_dataset(hf_id, split=split, streaming=True)
            except Exception as e:  # noqa: BLE001
                print(f"  ! lỗi tải: {e}"); continue
            kept = 0
            for i, row in enumerate(ds):
                if kept >= args.max:
                    break
                ik = _pick(row, _IMG_KEYS)
                ck = _pick(row, _CODE_KEYS)
                if not ik or not ck:
                    if i == 0:
                        print(f"  ! không tự nhận ra cột ảnh/code (có: {list(row)}). "
                              f"Chỉnh _IMG_KEYS/_CODE_KEYS theo card dataset.")
                    continue
                img_path = os.path.join(args.img_dir, f"{name}_{kept:06d}.jpg")
                if not _save_image(row[ik], img_path):
                    continue
                code = row[ck]
                code = code if isinstance(code, str) else json.dumps(code, ensure_ascii=False)
                f.write(json.dumps({"image": img_path, "prompt": args.prompt,
                                    "code": code.strip()}, ensure_ascii=False) + "\n")
                kept += 1; total += 1
            print(f"  → giữ {kept} mẫu (ảnh trong {args.img_dir})")
    print(f"\nXong: {total} mẫu → {args.out}")


if __name__ == "__main__":
    main()
