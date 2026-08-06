---
name: prompt-caching-and-context-reuse
description: Cutting LLM cost and latency by caching a stable prompt PREFIX (system prompt, tool definitions, long documents, few-shot examples) so repeated requests reuse the model's already-computed state instead of reprocessing those tokens — the provider bills cached input tokens at a large discount. Covers what to put in the cached prefix, ordering stable-before-variable, TTL/cache hits, and pitfalls. Use to reduce LLM token cost/latency, understand prompt caching, or structure prompts for reuse.
category: ai-agent
keywords_vi: prompt caching tái dùng tiền tố ổn định, cache system prompt tài liệu dài few-shot, giảm chi phí và độ trễ token lặp, xếp phần ổn định trước phần thay đổi, cache hit ttl, khác với semantic cache
---

# Prompt Caching & Context Reuse

Agents and chat apps resend the **same big prefix** every turn: a long system prompt, tool/function definitions, retrieved documents, few-shot examples. Reprocessing those identical tokens every call wastes money and latency. **Prompt caching** lets the provider **store the computed state of a prefix** and **reuse** it on later requests that start with the same tokens — billing those cached tokens at a **steep discount** (often ~10% of normal input price) and returning faster (see llm-cost-and-latency-optimization, kv-cache-and-attention-optimization if present, semantic-caching-for-llms).

## What It Is (and isn't)

- **Prompt/prefix caching** caches the model's internal state for an **exact token prefix**. The next request with the **same prefix** skips recomputing it. It's *exact-prefix*, provider-side, and about **input** processing.
- It's **not** response caching (returning a stored answer) and **not** semantic caching (matching *similar* queries — see semantic-caching-for-llms). Prompt caching still runs the model; it just doesn't re-ingest the cached prefix.

## The Golden Rule: Stable Before Variable

A cache hit requires the request to **begin with the exact cached tokens**. So structure the prompt **most-stable → most-variable**:
1. System prompt / instructions (rarely change)
2. Tool/function definitions
3. Long shared documents / knowledge / few-shot examples
4. — cache boundary —
5. The conversation / the user's new message (changes every turn)
If anything early changes (even a timestamp in the system prompt), the prefix differs and the cache **misses**. Keep volatile content **out of** the cached region.

## Economics & Behavior

- **Write once, read cheap** — the first call *writes* the cache (sometimes a small premium); subsequent calls *read* it at a big discount.
- **TTL** — caches expire after a short idle window (minutes); a busy endpoint keeps them warm, an idle one re-pays the write.
- **Best when the prefix is large and reused** — a 20-token prompt isn't worth caching; a 10k-token system+docs prefix hit every turn is a huge win.
- **Latency** drops too (less prefill work), not just cost.

## Design Guidance

- **Put the big stable stuff first**; put the changing turn last.
- **Mark/segment the cacheable prefix** per your provider's API (explicit cache breakpoints where supported).
- **Don't inject volatile tokens early** (timestamps, request ids, per-user nonces) — they bust the cache.
- **Keep the prefix byte-identical** across calls (same tool JSON, same ordering, same whitespace).
- **Keep it warm** — batch/route traffic so caches don't expire between calls.
- **Combine with semantic caching** for repeated *answers*, and RAG for the variable part.

## Pitfalls (in understanding/using)

- Putting **variable content early** (timestamp, session id) → permanent cache misses.
- Expecting caching to match **similar** prompts → it's **exact-prefix**; use semantic caching for similarity.
- Reordering/reformatting the prefix between calls → different tokens → miss.
- Assuming the cache is **long-lived** → short TTL; idle endpoints re-pay writes.
- Caching a **tiny** prefix → overhead outweighs benefit.
- Forgetting cached content is still **sent/processed logically** — it lowers cost, not your context-length usage.
