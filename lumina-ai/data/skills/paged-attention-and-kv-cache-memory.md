---
name: paged-attention-and-kv-cache-memory
description: Why LLM serving is memory-bound and how PagedAttention fixes KV-cache waste — by managing the key/value cache like OS virtual memory (fixed-size blocks/pages instead of one contiguous per-sequence buffer). Use to understand KV-cache fragmentation, over-reservation for max length, how paging enables higher batch sizes and prefix sharing (copy-on-write), and why memory (not FLOPs) limits concurrency.
category: ai-ml-internals
keywords_vi: paged attention, kv cache là nút cổ chai bộ nhớ, quản lý kv cache như bộ nhớ ảo hệ điều hành, khối trang cố định thay vì bộ đệm liền mạch, chia sẻ tiền tố prefix sharing, bộ nhớ chứ không phải flops giới hạn số chuỗi
---

# PagedAttention & KV-Cache Memory

The surprising truth about LLM serving: it's usually **memory-bound, not compute-bound**. Every active sequence must store a **KV cache** — the keys and values for all previous tokens at every layer — so that each new token can attend to the past without recomputing it. This cache is **huge** and grows with sequence length, and *how you allocate it* determines how many requests you can serve at once. **PagedAttention** (from vLLM) borrows the operating system's **virtual memory** idea to slash KV-cache waste (see how-kv-cache-works, continuous-batching-for-llm-serving, false-sharing-and-cache-line-contention).

## Why Naive KV Allocation Wastes Most of the Memory

The old approach allocates **one big contiguous buffer per sequence, sized for the maximum possible length**. That causes three wastes:
- **Internal fragmentation** — you reserve for 2048 tokens but the reply is 60 tokens; the rest is reserved-but-unused.
- **Over-reservation** — you can't know the final length, so you must reserve for the worst case up front, starving other requests.
- **External fragmentation** — variable-size contiguous buffers leave unusable gaps between them.

Studies found naive allocation wasted **60–80%** of KV memory. Since KV memory caps how many sequences fit, that waste directly caps throughput.

## The Fix: Page the KV Cache

PagedAttention stops requiring contiguous per-sequence memory. Instead:
- KV cache is split into **fixed-size blocks (pages)**, each holding the KV for a fixed number of tokens.
- A sequence's blocks can live **anywhere** in GPU memory, non-contiguously, tracked by a **block table** (like an OS page table mapping logical → physical pages).
- Blocks are **allocated on demand** as the sequence grows — no up-front worst-case reservation. Near-zero internal fragmentation (only the last partial block).

The attention kernel is written to gather KV across scattered blocks via the block table, so scattering costs almost nothing. Result: **far more sequences fit**, so batch sizes (and throughput) jump.

## Bonus: Prefix Sharing (Copy-on-Write)

Because KV lives in shareable blocks, **multiple sequences with the same prefix** (a shared system prompt, a common few-shot preamble, beam-search branches) can **point at the same physical KV blocks** instead of duplicating them — copy-on-write when they diverge. This saves memory and lets you skip recomputing shared prefixes (a form of prompt-caching at the KV level).

## Design Guidance (for understanding/using)

- **Think memory-first** — the KV cache, not GPU FLOPs, usually limits concurrency; budget it explicitly.
- **Use a paged-KV server** (vLLM/TGI) — it dramatically raises how many concurrent sequences fit.
- **Exploit prefix sharing** — put common system prompts/few-shot preambles up front so their KV is shared/cached.
- **Watch context length** — KV grows linearly with tokens; long contexts cut how many requests fit at once.
- **Tune block size** — smaller blocks reduce internal fragmentation but add bookkeeping.

## Pitfalls (in understanding/using)

- Assuming serving is **compute-bound** → it's usually KV-**memory**-bound; optimize memory to raise throughput.
- Allocating **max-length contiguous** KV per sequence → 60–80% waste, tiny batch sizes.
- Ignoring that **long contexts** shrink concurrency → a few long requests can crowd out many short ones.
- Duplicating KV for identical prefixes → wasted memory; use prefix sharing.
- Forgetting KV cache exists when estimating GPU memory → OOM under load.
