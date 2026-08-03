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


def _aya(row):
    # Aya (đa ngôn ngữ): inputs → user, targets → assistant.
    u = (row.get("inputs") or "").strip()
    a = (row.get("targets") or "").strip()
    return _norm(u, a) if u and a else None


def _lima(row):
    # LIMA: 'conversations' là LIST CHUỖI xen kẽ user/assistant (không phải dict).
    conv = row.get("conversations")
    if not isinstance(conv, list) or len(conv) < 2:
        return None
    out = []
    for i, turn in enumerate(conv):
        txt = (turn if isinstance(turn, str) else str(turn)).strip()
        if not txt:
            return None
        out.append({"role": "user" if i % 2 == 0 else "assistant", "content": txt})
    return out if len(out) >= 2 else None


def _capybara(row):
    # Capybara: 'conversation' là list các lượt, mỗi lượt có input + output.
    conv = row.get("conversation") or row.get("conversations")
    if not isinstance(conv, list):
        return None
    out = []
    for turn in conv:
        u = (turn.get("input") or "").strip()
        a = (turn.get("output") or "").strip()
        if u:
            out.append({"role": "user", "content": u})
        if a:
            out.append({"role": "assistant", "content": a})
    return out if len(out) >= 2 else None


def _swesmith(row):
    # SWE-smith (DỮ LIỆU TRAIN, không phải benchmark): mô tả lỗi → patch sửa.
    prob = (row.get("problem_statement") or row.get("issue") or "").strip()
    patch = (row.get("patch") or row.get("gold_patch") or "").strip()
    if not prob or not patch:
        return None
    return _norm(prob, "```diff\n" + patch + "\n```")


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
    "norobots":   ("HuggingFaceH4/no_robots", None, "train", _ultrachat, "CC BY-NC 4.0 — người viết, rất sạch"),
    "tulu2":      ("allenai/tulu-v2-sft-mixture", None, "train", _ultrachat, "ODC-BY; hỗn hợp nhiều SFT chất lượng"),
    "lima":       ("GAIR/lima", None, "train", _lima, "1k mẫu CỰC sạch (gated — cần đăng nhập HF)"),
    "capybara":   ("LDJnr/Capybara", None, "train", _capybara, "hội thoại nhiều lượt, reasoning"),
    "wizardlm":   ("WizardLMTeam/WizardLM_evol_instruct_70k", None, "train", _auto, "Evol-Instruct 70k"),
    "aya":        ("CohereLabs/aya_dataset", None, "train", _aya, "đa ngôn ngữ 100+ (gated — cần đăng nhập HF)"),
    # code reasoning (mạnh nhất) — có thể cần chỉnh config/split theo card
    "opencodereasoning":  ("nvidia/OpenCodeReasoning", None, "train", _auto, "code reasoning ~735k; có thể cần config"),
    "opencodereasoning2": ("nvidia/OpenCodeReasoning-2", None, "python", _auto, "~2.16M; split theo ngôn ngữ: python|cpp"),
    "opencodeinstruct":   ("nvidia/OpenCodeInstruct", None, "train", _auto, "5M instruction code"),
    # competitive (SFT problem→solution; coi chừng trùng benchmark)
    "apps":         ("codeparrot/apps", None, "train", _auto, "dùng split train; cẩn thận contamination"),
    "codecontests": ("deepmind/code_contests", None, "train", _auto, "problem→solution"),
    "taco":         ("BAAI/TACO", None, "train", _auto, "problem→solution"),
    # math + logic (dùng split TRAIN)
    "numinamath": ("AI-MO/NuminaMath-CoT", None, "train", _auto, "CoT toán chất lượng cao"),
    "gsm8k":      ("gsm8k", "main", "train", _auto, "CHỈ split train (test để eval)"),
    "math":       ("EleutherAI/hendrycks_math", "algebra", "train", _auto, "cần chọn config môn học; CHỈ train"),
    # agent / tool use / SWE
    "xlam":     ("Salesforce/xlam-function-calling-60k", None, "train", _xlam, "60k function-calling"),
    "toolbench":("ToolBench/ToolBench", None, "train", _sharegpt, "tool-use; format phức tạp, có thể cần chỉnh"),
    "swesmith": ("SWE-bench/SWE-smith", None, "train", _swesmith, "DỮ LIỆU TRAIN cho SWE-agent (KHÁC SWE-bench benchmark)"),
}


def _iter_skill_pairs(skills_dir):
    """Đọc data/skills/*.md của LUMINA → cặp SFT (dạy VĂN PHONG/ĐỊNH DẠNG skill).

    ⚠️ Đọc README: nhồi skills vào TRỌNG SỐ thường KÉM HƠN tiêm prompt lúc chạy
    (đang dùng), và mất khả năng sửa skill bằng edit .md. Nguồn này chỉ dành cho ai
    CỐ TÌNH muốn bake một phần hành vi skill vào model — không khuyến nghị làm chính.
    """
    if not os.path.isdir(skills_dir):
        print(f"  ! không thấy thư mục skills: {skills_dir}")
        return
    for fn in sorted(os.listdir(skills_dir)):
        if not fn.endswith(".md") or fn.upper().startswith("ATTRIBUTION"):
            continue
        try:
            with open(os.path.join(skills_dir, fn), encoding="utf-8") as fh:
                raw = fh.read()
        except OSError:
            continue
        name, desc, body = fn[:-3], "", raw
        if raw.startswith("---"):
            end = raw.find("\n---", 3)
            if end != -1:
                fm, body = raw[3:end], raw[end + 4:]
                for line in fm.splitlines():
                    if line.startswith("name:"):
                        name = line[5:].strip()
                    elif line.startswith("description:"):
                        desc = line[12:].strip()
        body = body.strip()
        if not body:
            continue
        topic = desc or name
        yield _norm(f"Hướng dẫn chuyên sâu về: {topic}", body)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", default="dolly,ultrachat",
                    help="Danh sách nguồn, phẩy ngăn cách. Xem --list. "
                         "Nguồn đặc biệt 'skills' = bake skills LUMINA (xem --skills-dir).")
    ap.add_argument("--skills-dir",
                    default=os.path.join(os.path.dirname(__file__), "..", "data", "skills"),
                    help="Thư mục skills .md khi dùng nguồn 'skills'.")
    ap.add_argument("--max-per-source", type=int, default=8000)
    ap.add_argument("--out", default="data/train.jsonl")
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--list", action="store_true", help="In danh sách nguồn hỗ trợ rồi thoát.")
    args = ap.parse_args()

    if args.list:
        print("Nguồn SFT hỗ trợ (fine-tune được):")
        for n, (hid, cfg, sp, _, note) in SOURCES.items():
            print(f"  {n:16s} {hid} [{cfg or '-'}:{sp}]  — {note}")
        print(f"  {'skills':16s} (LOCAL) data/skills/*.md — bake skill LUMINA (KHÔNG khuyến nghị làm chính)")
        print("\nBENCHMARK — CẤM train (chỉ eval):")
        for n, why in EVAL_ONLY.items():
            print(f"  {n:16s} {why}")
        return

    names = [s.strip().lower() for s in args.sources.split(",") if s.strip()]
    needs_hf = any(n in SOURCES for n in names)
    load_dataset = None
    if needs_hf:
        try:
            from datasets import load_dataset
        except ImportError:
            raise SystemExit("Thiếu thư viện: pip install -r requirements.txt")

    random.seed(args.seed)
    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    total = 0
    with open(args.out, "w", encoding="utf-8") as f:
        for name in names:
            if name in EVAL_ONLY:
                print(f"[TỪ CHỐI] '{name}' là BENCHMARK — không train vào. {EVAL_ONLY[name]}")
                continue
            if name == "skills":
                print(f"[đọc] skills LUMINA ← {args.skills_dir}")
                kept = 0
                for msgs in _iter_skill_pairs(args.skills_dir):
                    if kept >= args.max_per_source:
                        break
                    f.write(json.dumps({"messages": msgs}, ensure_ascii=False) + "\n")
                    kept += 1
                    total += 1
                print(f"  → giữ {kept} mẫu (⚠️ tiêm prompt lúc chạy vẫn tốt hơn — xem README)")
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
