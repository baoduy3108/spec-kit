---
name: how-kv-cache-works
description: How the KV cache speeds up LLM inference — storing the key/value tensors of past tokens so each new token avoids recomputing attention over the whole sequence, why it dominates inference memory, and the optimizations around it. Use to understand KV cache, why LLM memory grows with context, prefill vs decode, or LLM inference memory cost.
category: ai-agent
keywords_vi: how kv cache works, kv cache hoạt động thế nào, lưu key value token quá khứ, tránh tính lại attention toàn chuỗi, bộ nhớ suy luận tăng theo ngữ cảnh, prefill decode
---

# How the KV Cache Works

The KV (key-value) cache is the single most important optimization in LLM **inference** — it's what makes token-by-token generation practical instead of hopelessly slow. It works by **storing intermediate attention values** for past tokens so they never have to be recomputed. Understanding it explains a lot about LLM speed, memory, and context-length limits (see how-transformers-work, llm-cost-and-latency-optimization).

## The Problem: Attention Recomputes the Whole Past

An LLM generates **one token at a time**, and each new token's attention (see how-transformers-work) needs the **keys and values** of **every previous token**. Naively, generating token N would require recomputing the key/value projections for all N−1 earlier tokens — over and over, every step — making generation cost grow **quadratically** and repeat enormous amounts of identical work. That's far too slow.

## The Core Idea: Cache the Keys and Values

The insight: the keys and values for past tokens **don't change** as you generate more tokens. So compute them **once** and **store** them. The KV cache keeps, for every layer, the **K and V tensors of all tokens generated so far**. Then, for each new token:
1. Compute the Q, K, V for just the **new** token.
2. Append its K and V to the cache.
3. Attend using the new Q against **all cached K/V** — no recomputation of past tokens.

This turns per-token work from "reprocess the whole sequence" into "process one token + read the cache," making generation roughly **linear** instead of quadratic. It's the difference between usable and unusable.

## Prefill vs Decode

KV caching creates two distinct phases of inference:
- **Prefill** — process the entire input **prompt** in one parallel pass, filling the KV cache for all prompt tokens (compute-bound, fast per token because parallel).
- **Decode** — generate output tokens **one at a time**, each reading/extending the cache (memory-bandwidth-bound; this is the slow, sequential part).
This is why a long **prompt** is cheap per token (parallel prefill) but long **generation** is expensive (sequential decode) — and why "time to first token" vs "tokens per second" are different metrics (see llm-cost-and-latency-optimization).

## The Cost: Memory

The trade-off is **memory**. The KV cache grows **linearly with sequence length and batch size** — for long contexts and many concurrent users, it can consume **more memory than the model weights themselves**, and it's the main limit on how long a context and how many parallel requests you can serve (see how-gpus-work). Hence a whole family of optimizations:
- **Multi-Query / Grouped-Query Attention (MQA/GQA)** — share K/V across attention heads to shrink the cache dramatically.
- **PagedAttention** (vLLM) — manage the cache in pages like virtual memory to avoid fragmentation and pack more requests.
- **Quantizing the KV cache** — store K/V in lower precision.
- **Prefix/prompt caching** — reuse the cache for a shared prompt prefix across requests.

## Why It Matters

The KV cache is why serving LLMs is a **memory** problem as much as a compute one, why long contexts are expensive, and why batching and cache optimizations (GQA, PagedAttention) are central to efficient inference. Nearly every LLM serving system is built around managing this cache well.

## Pitfalls (in understanding/using)

- Forgetting the cache grows with **context length × batch** — long contexts and high concurrency blow up memory (often the real bottleneck, not compute).
- Assuming long **prompts** and long **generations** cost the same — prefill (parallel) vs decode (sequential) differ greatly.
- Ignoring **GQA/MQA/PagedAttention** when serving at scale — the naive cache wastes huge memory.
- Thinking the cache changes the **output** — it's a pure optimization; results are identical, just faster.
- Not exploiting **prefix caching** for repeated system prompts (recomputing the same prefix every request).
- Confusing model-weight memory (fixed) with KV-cache memory (grows with usage) when sizing hardware.
