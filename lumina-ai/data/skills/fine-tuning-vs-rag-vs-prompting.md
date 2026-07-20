---
name: fine-tuning-vs-rag-vs-prompting
description: Choose how to adapt an LLM to your task — prompting/few-shot, RAG (inject knowledge at query time), or fine-tuning (train on examples to change behavior/style) — with the trade-offs in cost, freshness, knowledge vs behavior, and data needs. Use when deciding whether to fine-tune, use RAG, or just prompt for an LLM feature.
category: ai-agent
keywords_vi: fine-tuning hay rag hay prompt, khi nào fine-tune, chọn cách chỉnh llm, dạy model kiến thức mới, few-shot prompting, huấn luyện model, adapt llm
---

# Fine-tuning vs RAG vs Prompting

Three ways to make an LLM do your task. They solve *different* problems — the common mistake is fine-tuning when you needed RAG (or vice versa). Escalate only as needed: **prompt → RAG → fine-tune**.

## Prompting / Few-Shot (start here)

Just write good instructions, optionally with a few examples in the prompt. **Zero training, instant iteration, no data pipeline.** Solves most tasks: formatting, extraction, classification, rewriting, general Q&A. Try this first and exhaust it (better instructions, examples, structure — see prompt-engineering) before anything heavier. Limits: bounded by context size and the base model's knowledge/skills.

## RAG — inject KNOWLEDGE at query time

Retrieve relevant documents and put them in the prompt (see rag-fundamentals). Use RAG when the problem is **the model doesn't *know* something** — private data, up-to-date facts, a large/changing knowledge base. RAG **adds knowledge without training**, stays fresh (just update the index), gives citations, and reduces hallucination. It does **not** teach the model new skills, formats, or style.

## Fine-tuning — change BEHAVIOR/style/skill

Continue training the model on many input→output examples so the *weights* change. Use fine-tuning when the problem is **the model doesn't behave the way you need** consistently: a specific output format/schema every time, a particular tone/persona, a narrow specialized task, or to make a smaller/cheaper model match a bigger one's behavior on your task. It bakes *behavior* in (shorter prompts, more consistency). It's **poor for knowledge** — you can't reliably teach facts by fine-tuning (and facts go stale, and it hallucinates confidently). It needs a **quality dataset** (hundreds–thousands of examples), costs compute, and must be redone as needs change.

## The Decision

- Need a different **format/tone/behavior**, have examples, prompting isn't consistent enough → **fine-tune**.
- Need the model to **know specific/fresh/private facts** → **RAG**.
- Everything else, and always to start → **prompting/few-shot**.
- **Combine** them: fine-tune for behavior *and* RAG for knowledge is common and powerful.

## Pitfalls

- **Fine-tuning to add knowledge** — the classic mistake; use RAG. Fine-tuning teaches *how to respond*, not *facts*.
- **Fine-tuning too early** — before exhausting prompting; you burn time/money on a static artifact you'll have to redo.
- **RAG for a behavior problem** — no amount of retrieved docs fixes a model that won't follow your format; that's prompting or fine-tuning.
- Underestimating the **data quality** fine-tuning demands (garbage examples → garbage model).
- Forgetting fine-tuned models and datasets need **maintenance** as the base model and requirements evolve.
