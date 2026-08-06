---
name: semantic-caching
description: How semantic caching works for LLM apps — caching answers keyed by meaning (embedding similarity) rather than exact match, so paraphrased/similar queries reuse a cached response, plus similarity thresholds, invalidation, and the risk of wrong-answer reuse. Use to cut LLM cost/latency on repeated similar queries, understand semantic caching, or cache LLM responses safely.
category: ai-agent
keywords_vi: semantic caching, cache theo ngữ nghĩa, key theo embedding similarity, câu hỏi tương tự dùng lại cache, ngưỡng similarity threshold, invalidation, rủi ro trả sai
---

# Semantic Caching

Semantic caching stores LLM answers keyed by the **meaning** of the query (via embeddings), so that **paraphrased or similar** questions reuse a cached response instead of calling the model again. It's a powerful cost/latency win for apps with repetitive queries (FAQs, support, common questions) — where a traditional exact-match cache would almost never hit.

## Why Exact-Match Caching Fails for LLMs

A normal cache (see caching-strategies) keys on the **exact** input. But natural-language queries are phrased a thousand ways — "How do I reset my password?", "I forgot my login", "can't sign in, need new password" all want the same answer, yet share no exact string. Exact-match caching misses all of them. LLM traffic has lots of **semantically-similar** but textually-different queries — invisible to string caching.

## How It Works

1. **Embed the query** — convert the incoming query to a vector (see vector-embeddings).
2. **Search the cache** — look for a previously-cached query whose embedding is **similar** (nearest-neighbor over cached query embeddings — see how-vector-databases-work) above a similarity **threshold**.
3. **Hit** → return the cached answer (skip the LLM entirely — instant, free).
4. **Miss** → call the LLM, then store the (query embedding → answer) in the cache for next time.
So "semantically the same question" → one model call amortized across many phrasings.

## The Critical Knob: Similarity Threshold

This is where semantic caching is **risky** and needs care:
- **Threshold too loose** → different questions get matched and served the **wrong** cached answer (a subtly different query returns an answer that doesn't fit — a correctness bug that's worse than a cache miss).
- **Threshold too strict** → few hits, little benefit.
Tune the threshold carefully and conservatively — the cost of a wrong cached answer (misleading the user) usually outweighs the savings of an aggressive cache. Test on real query pairs.

## Invalidation & Freshness

Cached answers go **stale** when the underlying data/knowledge changes (see how-http-caching-works). Semantic caches need invalidation strategies: TTLs, invalidate on source updates (see how-change-data-capture-works), or scope caching to stable/general knowledge and **bypass** it for personalized, time-sensitive, or user-specific queries (never serve one user's personalized answer to another).

## When to Use

- **Great for** — high-volume repetitive queries (FAQs, docs Q&A, support), general knowledge, expensive/slow model calls.
- **Avoid for** — personalized, user-specific, real-time, or high-stakes answers where a wrong reuse is harmful.

## Pitfalls (in understanding/using)

- **Threshold too loose** → serving the **wrong** answer to a similar-but-different question (correctness bug); be conservative.
- Caching **personalized/user-specific** answers → leaking one user's answer to another (also a privacy issue).
- **No invalidation** → serving stale answers after the underlying info changed.
- Caching **time-sensitive** queries ("latest...", "today's...") → outdated responses.
- Ignoring the **embedding model** quality — bad embeddings → bad similarity matches.
- Assuming it's like a normal cache — the **wrong-match** failure mode is unique and dangerous; test on real query pairs.
- Not measuring **hit rate vs wrong-hit rate** — track both to tune safely.
