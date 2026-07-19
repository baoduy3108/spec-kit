---
name: how-speculative-decoding-works
description: How speculative decoding speeds up LLM inference — a small fast "draft" model proposes several tokens which the large model verifies in one parallel pass, accepting the correct prefix; why it's faster with identical output. Use to understand speculative decoding, faster LLM inference, draft models, or why token generation can be accelerated without quality loss.
category: ai-agent
keywords_vi: speculative decoding, draft model, tăng tốc suy luận llm, model lớn xác minh song song, chấp nhận prefix đúng, nhanh hơn cùng kết quả
---

# How Speculative Decoding Works

Speculative decoding is a clever trick to make LLM text generation **faster** — often 2–3× — **without changing the output**. It attacks the fundamental slowness of autoregressive generation: tokens are produced **one at a time**, each requiring a full forward pass of the huge model (see how-llms-work, llm-cost-and-latency-optimization).

## The Bottleneck: One Token at a Time

An LLM generates **sequentially** — to produce token N, it needs token N−1, so it can't generate ahead in parallel. Each token costs one expensive forward pass of the large model. Generation latency ≈ (number of tokens) × (time per pass), and that per-token pass is the wall. Speculative decoding breaks the "one costly pass per token" limit.

## The Core Idea: Draft, Then Verify

Use **two models**:
- A **small, fast "draft" model** — cheaply **guesses** the next several tokens (say 4) in a quick sequence.
- The **large "target" model** — takes those drafted tokens and **verifies them all in a single parallel forward pass** (the key: verifying k tokens costs about the same as generating **one**, because the model can process the whole drafted sequence at once).
Then:
- Accept the drafted tokens that **match** what the large model would have produced (a correct **prefix**).
- At the first mismatch, discard the rest and use the large model's own token there.
So in **one** expensive large-model pass, you can advance **several** tokens (all the ones the cheap draft got right) instead of just one — a big speedup when the draft is often right.

## Why the Output Is Identical

Crucially, speculative decoding is **lossless** — the final output is **exactly** what the large model would have produced alone. The draft model only **proposes**; the large model **verifies** and has final say (accepting only tokens consistent with its own distribution, and correcting at the first divergence). So you get the large model's quality at higher speed — not an approximation. This is what makes it so attractive: pure speed, no quality trade-off.

## Why It's Faster (the intuition)

Easy/predictable tokens (common words, obvious continuations) are ones a small model also gets right — so the draft nails them and they're accepted in bulk, cheaply. Hard/surprising tokens cause a mismatch and fall back to the large model. Since a lot of text is "easy," the draft's acceptance rate is high, and you skip many expensive single-token passes. The speedup depends on how often the draft agrees with the target (higher acceptance = more speedup).

## Variants

- **Draft model** — a separate small model (needs one that agrees often with the target).
- **Self-speculative / Medusa / n-gram** — generate drafts from the model itself (extra heads) or simple heuristics, avoiding a separate model.
The principle — cheaply propose, verify in parallel, accept the correct prefix — is the same.

## Pitfalls (in understanding/using)

- Thinking it **changes/degrades** output — it's **lossless**; output equals the large model's (that's the point).
- Expecting speedup when the **draft rarely agrees** with the target (low acceptance rate → little benefit; the draft must be well-matched).
- Overhead when drafts are usually **wrong** — running the draft then discarding it wastes work; the draft must be fast and often-right.
- Assuming it helps **throughput** the same as **latency** — its main win is per-request latency (batched serving has other optimizations).
- Confusing it with **quantization/distillation** (which trade quality for speed) — speculative decoding trades **no** quality.
- Needing extra memory for the **draft model** alongside the target.
