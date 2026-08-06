---
name: llm-inference-optimization
description: Serve LLMs efficiently at scale — the prefill vs decode phases, the KV cache and why it dominates memory, continuous/in-flight batching (vLLM), PagedAttention, quantization, speculative decoding, and the throughput-vs-latency trade-off. Use when serving an LLM to many users, or reasoning about tokens/sec, GPU memory, and cost.
category: ai-agent
keywords_vi: tối ưu inference llm, serve llm, vllm, continuous batching, kv cache, paged attention, throughput token, speculative decoding, phục vụ nhiều người dùng llm
---

# LLM Inference Optimization

Serving an LLM to many users is a memory- and throughput-optimization problem. The bottleneck is usually GPU memory (the KV cache), not compute.

## Two Phases

- **Prefill** — process the whole prompt at once to build its KV cache. Compute-bound, parallel, fast per token.
- **Decode** — generate output tokens one at a time, each attending to the growing KV cache. Memory-bandwidth-bound and sequential — this dominates latency for long outputs. Understanding this split explains why long prompts are cheap-ish but long generations are slow.

## The KV Cache (the central constraint)

Each token's attention keys/values are cached so they aren't recomputed every step. This cache **grows with sequence length × batch size** and consumes most of the GPU memory during serving — it, not the model weights, usually limits how many concurrent requests fit. Optimizing serving is largely optimizing the KV cache.

## Throughput Techniques

- **Continuous (in-flight) batching** — instead of waiting to batch requests together statically, add/remove requests from the running batch every step as some finish and others arrive. Keeps the GPU saturated; the core win of vLLM/TGI — often several× the throughput of naive batching.
- **PagedAttention** (vLLM) — manage the KV cache in fixed pages like OS virtual memory, eliminating fragmentation and allowing near-100% memory utilization and sharing (e.g. common prompt prefixes). More concurrent requests per GPU.
- **Quantization** — run weights (and sometimes KV cache) at lower precision (INT8/FP8/4-bit) to cut memory and speed decode, trading a little quality.
- **Speculative decoding** — a small draft model proposes several tokens, the big model verifies them in one pass; accepted tokens skip full decode steps → lower latency with identical output distribution.
- **Prefix/prompt caching** — reuse the KV cache of a shared system prompt across requests instead of recomputing prefill each time.

## The Core Trade-off

**Throughput vs latency.** Bigger batches = more tokens/sec/GPU (cheaper per token) but higher per-request latency; smaller batches = snappier responses, lower utilization. Tune batch size, and set separate targets for time-to-first-token (prefill/interactive feel) vs tokens/sec (generation speed). Right-size the model and quantization to the quality you actually need — the cheapest optimization is not running a bigger model than the task requires.

This is the machinery behind hosted LLM APIs and why self-hosting at scale is an infra discipline, not just "load the model."
