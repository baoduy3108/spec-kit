---
name: semantic-caching-for-llms
description: Caching LLM responses by MEANING — embed the incoming query, find a past query whose embedding is similar above a threshold, and return its stored answer instead of calling the model — so paraphrases of the same question hit the cache (unlike exact-string caching). Covers the similarity threshold trade-off (false hits vs misses), what's safe to cache, invalidation/TTL, and scoping caches per user/context. Use to cut LLM cost/latency on repeated questions, or understand semantic caching vs prompt caching.
category: ai-agent
keywords_vi: semantic cache cho llm theo ngữ nghĩa, câu hỏi tương tự trên ngưỡng trả đáp án cũ, khác cache khớp chuỗi chính xác, ngưỡng tương đồng đánh đổi hit sai, phạm vi cache theo người dùng
---

# Semantic Caching for LLMs

Many users ask the **same thing in different words**: "how do I reset my password?" vs "I forgot my password, what now?". An exact-string cache misses both because the strings differ. **Semantic caching** caches by **meaning**: embed the query, and if a **past query's embedding is similar enough** (cosine above a threshold), return its **stored answer** without calling the LLM — turning many paraphrases into one cache entry, cutting cost and latency (see vector-embeddings, prompt-caching-and-context-reuse, llm-cost-and-latency-optimization).

## How It Works

1. **Embed** the incoming query into a vector.
2. **Search** the cache (a small vector index) for the nearest past query.
3. If the similarity **≥ threshold**, it's a **hit** → return the cached answer (optionally with a freshness check).
4. Else **miss** → call the LLM, then **store** (query embedding → answer) for next time.
It's a layer *in front of* the model, distinct from **prompt caching** (which discounts reprocessing a shared *prefix* but still runs the model) — semantic caching can **skip the model call entirely**.

## The Threshold Trade-off (the crux)

- **Threshold too low** → **false hits**: it returns a cached answer for a question that's actually *different* → wrong/misleading responses. This is the dangerous failure.
- **Threshold too high** → **misses**: near-duplicates don't hit → less savings.
Tune the threshold on real query pairs; err on the side of **fewer false hits** (a miss just costs a call; a false hit gives a wrong answer). Log borderline cases.

## What's Safe to Cache

- ✅ **Stable, factual, context-independent** answers (docs Q&A, definitions, how-tos).
- ⚠️ **Personalized / stateful / time-sensitive** answers ("what's *my* balance", "today's news") — cache **per user/context** or **not at all**; a shared cache would leak or stale.
- ❌ Anything where a slightly-different question needs a genuinely different answer and the embeddings look similar.

## Design Guidance

- **Tune the threshold** on labeled query pairs; bias toward avoiding false hits.
- **Scope the cache key** by user/tenant/context when answers depend on them (prevent leakage).
- **Set TTL / invalidation** — expire time-sensitive entries; bust on underlying data change.
- **Store the source query** with the entry so you can audit hits and debug false positives.
- **Layer it**: semantic cache → (miss) prompt caching + RAG → LLM.
- **Consider a verification pass** for high-stakes hits (cheap check that the cached answer still fits).

## Pitfalls (in understanding/using)

- **Threshold too loose** → returns a cached answer to a *different* question (silent wrong answers).
- Caching **personalized/time-sensitive** replies in a **shared** cache → leaks or stale data.
- No **TTL/invalidation** → serving outdated answers after the truth changed.
- Confusing it with **prompt caching** — that discounts prefix reprocessing; this skips the call.
- Not **scoping** by context → "it depends" questions collide.
- Never auditing hits → false positives go unnoticed.
