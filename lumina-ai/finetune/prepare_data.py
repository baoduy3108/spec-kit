#!/usr/bin/env python3
"""Chuẩn bị dữ liệu fine-tune cho LUMINA local model.

Tải các dataset SFT/instruction THẬT từ HuggingFace và chuẩn hoá về MỘT format
chat JSONL thống nhất:  {"messages": [{"role": "...", "content": "..."}, ...]}

QUAN TRỌNG — KHÔNG train lên BENCHMARK (HumanEval/MBPP/AIME/BFCL/SWE-bench…):
đó là data đánh giá; train vào = nhiễm dữ liệu (contamination) → điểm ảo, gian lận.
Với dataset vừa có train vừa có test (GSM8K/MATH): CHỈ dùng split TRAIN để SFT,
để dành TEST cho eval. Script này chặn cứng các benchmark eval-only.

Chạy trên máy có mạng (tải dataset). KHÔNG cần GPU cho bước này. Một số dataset
lớn cần `--config`/split đúng theo card của nó — nếu tải lỗi, script báo rõ.

Ví dụ:
    python prepare_data.py --list
    python prepare_data.py --sources opencodereasoning,numinamath,xlam,dolly \
        --max-per-source 8000 --out data/train.jsonl
"""
from __future__ import annotations
import argparse
import json
import os
import random


# ── các bộ CHỈ để ĐÁNH GIÁ — chặn cứng, không cho train ─────────────────────
EVAL_ONLY = {
    "humaneval": "openai/openai_humaneval — benchmark 164 bài, train vào = gian lận.",
    "mbpp": "google-research-datasets/mbpp — benchmark, chỉ eval.",
    "aime": "AIME_2024 — benchmark 30 bài, chỉ eval.",
    "bfcl": "Berkeley-Function-Calling-Leaderboard — benchmark tool-use, chỉ eval.",
    "swebench": "princeton-nlp/SWE-bench — benchmark agentic, chỉ eval.",
    "swe-bench": "princeton-nlp/SWE-bench — benchmark agentic, chỉ eval.",
}


def _norm(user, assistant, system=None):
    out = []
    if system:
        out.append({"role": "system", "content": system})
    out.append({"role": "user", "content": user})
    out.append({"role": "assistant", "content": assistant})
    return out


def _ultrachat(row):
    msgs = row.get("messages")
    if not msgs:
        return None
    out = [{"role": m["role"], "content": m["content"]} for m in msgs
           if m.get("role") in ("system", "user", "assistant") and m.get("content")]
    return out if len(out) >= 2 else None


def _sharegpt(row):
    conv = row.get("conversations") or row.get("conversation")
    if not conv:
        return None
    rm = {"system": "system", "human": "user", "user": "user", "gpt": "assistant", "assistant": "assistant"}
    out = []
    for m in conv:
        role = rm.get(m.get("from") or m.get("role"))
        val = (m.get("value") or m.get("content") or "").strip()
        if role and val:
            out.append({"role": role, "content": val})
    return out if len(out) >= 2 else None


def _dolly(row):
    instr = (row.get("instruction") or "").strip()
    ctx = (row.get("context") or "").strip()
    resp = (row.get("response") or "").strip()
    if not instr or not resp:
        return None
    return _norm(f"{instr}\n\n{ctx}" if ctx else instr, resp)


def _openorca(row):
    q = (row.get("question") or "").strip()
    a = (row.get("response") or "").strip()
    if not q or not a:
        return None
    return _norm(q, a, (row.get("system_prompt") or "").strip() or None)


def _xlam(row):
    q = (row.get("query") or "").strip()
    tools = row.get("tools")
    ans = row.get("answers")
    if not q or not ans:
        return None
    tools_s = tools if isinstance(tools, str) else json.dumps(tools, ensure_ascii=False)
    ans_s = ans if isinstance(ans, str) else json.dumps(ans, ensure_ascii=False)
    return _norm(q, ans_s, "Công cụ khả dụng (JSON): " + tools_s)


def _auto(row):
    """Tự nhận diện format phổ biến → cặp user/assistant."""
    if isinstance(row.get("messages"), list):
        return _ultrachat(row)
    if isinstance(row.get("conversations"), list) or isinstance(row.get("conversation"), list):
        return _sharegpt(row)

    def pick(*keys):
        for k in keys:
            v = row.get(k)
            if v not in (None, "") and isinstance(v, (str, int, float)):
                return str(v).strip()
        return ""

    user = pick("instruction", "question", "problem", "prompt", "query", "input", "text")
    asst = pick("output", "response", "answer", "solution", "completion", "answers",
                "r1_solution", "generation", "gpt")
    ctx = pick("context") or (pick("input") if row.get("instruction") else "")
    if user and asst:
        if ctx and ctx != user:
            user = f"{user}\n\n{ctx}"
        return _norm(user, asst)
    return None


# name -> (hf_id, config|None, split, map_fn, note)
SOURCES = {
    # instruction/chat tổng quát
    "dolly":      ("databricks/databricks-dolly-15k", None, "train", _dolly, "CC BY-SA 3.0"),
    "ultrachat":  ("HuggingFaceH4/ultrachat_200k", None, "train_sft", _ultrachat, "MIT"),
    "openhermes": ("teknium/OpenHermes-2.5", None, "train", _sharegpt, "kiểm giấy phép từng nguồn con"),
    "openorca":   ("Open-Orca/OpenOrca", None, "train", _openorca, "MIT (data); sinh từ GPT"),
    # code reasoning (mạnh nhất) — có thể cần chỉnh config/split theo card
    "opencodereasoning":  ("nvidia/OpenCodeReasoning", None, "train", _auto, "code reasoning ~735k; có thể cần config"),
    "opencodeinstruct":   ("nvidia/OpenCodeInstruct", None, "train", _auto, "5M instruction code"),
    # competitive (SFT problem→solution; coi chừng trùng benchmark)
    "apps":         ("codeparrot/apps", None, "train", _auto, "dùng split train; cẩn thận contamination"),
    "codecontests": ("deepmind/code_contests", None, "train", _auto, "problem→solution"),
    "taco":         ("BAAI/TACO", None, "train", _auto, "problem→solution"),
    # math + logic (dùng split TRAIN)
    "numinamath": ("AI-MO/NuminaMath-CoT", None, "train", _auto, "CoT toán chất lượng cao"),
    "gsm8k":      ("gsm8k", "main", "train", _auto, "CHỈ split train (test để eval)"),
    "math":       ("EleutherAI/hendrycks_math", "algebra", "train", _auto, "cần chọn config môn học; CHỈ train"),
    # agent / tool use
    "xlam":     ("Salesforce/xlam-function-calling-60k", None, "train", _xlam, "60k function-calling"),
    "toolbench":("ToolBench/ToolBench", None, "train", _sharegpt, "tool-use; format phức tạp, có thể cần chỉnh"),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", default="dolly,ultrachat",
                    help="Danh sách nguồn, phẩy ngăn cách. Xem --list.")
    ap.add_argument("--max-per-source", type=int, default=8000)
    ap.add_argument("--out", default="data/train.jsonl")
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--list", action="store_true", help="In danh sách nguồn hỗ trợ rồi thoát.")
    args = ap.parse_args()

    if args.list:
        print("Nguồn SFT hỗ trợ (fine-tune được):")
        for n, (hid, cfg, sp, _, note) in SOURCES.items():
            print(f"  {n:16s} {hid} [{cfg or '-'}:{sp}]  — {note}")
        print("\nBENCHMARK — CẤM train (chỉ eval):")
        for n, why in EVAL_ONLY.items():
            print(f"  {n:16s} {why}")
        return

    try:
        from datasets import load_dataset
    except ImportError:
        raise SystemExit("Thiếu thư viện: pip install -r requirements.txt")

    random.seed(args.seed)
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    total = 0
    with open(args.out, "w", encoding="utf-8") as f:
        for name in [s.strip().lower() for s in args.sources.split(",") if s.strip()]:
            if name in EVAL_ONLY:
                print(f"[TỪ CHỐI] '{name}' là BENCHMARK — không train vào. {EVAL_ONLY[name]}")
                continue
            if name not in SOURCES:
                print(f"[bỏ qua] nguồn không hỗ trợ: {name} (xem --list)")
                continue
            hf_id, cfg, split, fn, _ = SOURCES[name]
            print(f"[tải] {name} ← {hf_id} [{cfg or '-'}:{split}]")
            try:
                ds = (load_dataset(hf_id, cfg, split=split, streaming=True) if cfg
                      else load_dataset(hf_id, split=split, streaming=True))
            except Exception as e:
                print(f"  ! lỗi tải {hf_id}: {e}\n    → có thể cần chỉnh config/split theo card dataset.")
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


if __name__ == "__main__":
    main()
