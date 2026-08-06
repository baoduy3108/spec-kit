---
name: automatic-prompt-optimization
description: Automatic prompt and skill optimization — algorithmically improving prompts/instructions instead of hand-tuning, via DSPy, APE, OPRO, evolutionary search, and LLM-as-optimizer. Covers metric-driven optimization loops, bootstrapping few-shot examples, instruction search, and skill self-improvement. Use when auto-optimizing a prompt, tuning instructions against a metric, building a prompt optimizer, or improving a skill programmatically.
category: ai-agent
keywords_vi: tối ưu prompt tự động, tự động tối ưu prompt, dspy, opro, ape sinh chỉ dẫn, bộ tối ưu prompt, prompt optimizer, tối ưu chỉ dẫn theo thước đo, bootstrap few-shot, kỹ năng tự cải thiện theo điểm
---

# Automatic Prompt & Skill Optimization

Hand-tuning prompts by trial and error is slow and doesn't scale. **Automatic prompt optimization** treats the prompt (or a skill's instructions) as something a *program* improves against a **metric** — the same loop as training, but the thing being tuned is text, not weights (see skill-optimization-as-training, prompt-engineering).

## The Core Loop

1. **Define a metric** — a measurable score for "good output" (exact match, F1, an LLM-judge rubric, task success rate). Without a metric there's nothing to optimize toward.
2. **Have a dataset** — a handful to a few hundred labeled examples (input → desired output) to score candidates on. Split train/dev to avoid overfitting the prompt to noise.
3. **Propose candidates** — generate variant prompts/instructions (reworded, restructured, with different few-shot examples).
4. **Evaluate** — run each candidate on the dev set, score with the metric.
5. **Select & iterate** — keep the best, mutate/recombine, repeat until the score plateaus.

## Key Methods

- **APE (Automatic Prompt Engineer)** — an LLM *proposes* many instruction candidates from examples, you score them, keep the best. "Let the model write its own prompt."
- **OPRO (Optimization by PROmpting)** — use the LLM itself as the optimizer: feed it the history of (prompt, score) pairs and ask it to propose a better prompt. The trajectory of scores guides it.
- **DSPy** — treat an LLM pipeline as a *program* of modules; a **compiler** optimizes the prompts/few-shot demos for each module against your metric (e.g. `BootstrapFewShot`, `MIPRO`). You write the logic and metric; DSPy tunes the strings.
- **Evolutionary / genetic search** — maintain a population of prompts, mutate and crossbreed the best each generation. Good for large, rugged search spaces.
- **Bootstrapping few-shot** — instead of hand-picking examples, *search* for the demonstration set that maximizes the metric (which examples, in what order).

## Optimizing Skills, Not Just Prompts

The same loop improves a **skill/instruction document**: score how well the skill makes the model perform its task, then let an LLM rewrite sections, test, and keep improvements. This is "skill self-improvement" — measure, mutate the instructions, verify the score went up, repeat. Guard against **description drift** (the trigger/description must stay accurate) and **overfitting** to a tiny eval set.

## Pitfalls

- **Overfitting** — a prompt tuned on 10 examples may memorize them; always hold out a dev set and check variance across seeds/runs.
- **Metric gaming** — the optimizer exploits weaknesses in a bad metric (e.g. rewards length). Make the metric robust; spot-check winners by hand.
- **Cost** — each candidate × each example = many LLM calls. Cache, sample, and stop early when the score plateaus (see llm-cost-and-latency-optimization).
- **Non-determinism** — scores wobble run to run; average several runs before declaring a winner.

Automatically optimize prompts and skills by closing a **metric-driven loop**: define a score, propose candidates (APE/OPRO/DSPy/evolutionary), evaluate on a held-out set, and keep the best — replacing hand-tuning with a measurable search. It's the same discipline as training, applied to text: the win is reproducible, quantified improvement instead of guesswork, as long as you guard against overfitting and metric gaming.
