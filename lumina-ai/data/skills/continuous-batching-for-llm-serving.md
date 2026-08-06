---
name: continuous-batching-for-llm-serving
description: How LLM servers reach high throughput despite requests of wildly different lengths — continuous (in-flight) batching. Instead of static batches that wait for the slowest sequence, the scheduler adds and evicts sequences every decode step, keeping the GPU full. Use to understand why naive batching wastes GPU, iteration-level scheduling, throughput vs latency, and why one long generation no longer stalls a whole batch.
category: ai-ml-internals
keywords_vi: gộp lô liên tục continuous batching phục vụ llm thông lượng cao, batch tĩnh phải chờ chuỗi dài nhất lãng phí gpu, lập lịch theo từng bước iteration-level thêm và loại chuỗi mỗi bước decode, giữ gpu luôn đầy, đánh đổi thông lượng và độ trễ, một chuỗi sinh dài không làm nghẽn cả lô
---

# Continuous Batching for LLM Serving

Serving LLMs efficiently is hard because requests are **wildly uneven**: one user wants 10 tokens, another wants 2000, and they arrive at different times. **Static batching** — collect N requests, run them together until *all* finish — wastes enormous GPU: short sequences finish early and their slots sit **idle** while the batch waits for the longest one, and new requests must wait for the whole batch to complete before they even start. **Continuous batching** (a.k.a. **in-flight / iteration-level batching**) fixes this and is the single biggest throughput win in modern LLM servers like vLLM and TGI (see llm-inference-optimization, paged-attention-and-kv-cache-memory, prefill-and-decode-disaggregation).

## The Key Shift: Schedule Per Iteration, Not Per Request

An autoregressive model generates **one token per forward step** for each active sequence. Continuous batching exploits this: the scheduler makes a decision **every decode step**, not once per batch:
- When a sequence **finishes** (emits EOS or hits its length), it's **immediately evicted** and its slot freed **that step** — no waiting for batch-mates.
- **Waiting requests are admitted** into the running batch as soon as slots open, even mid-generation of others.

So the batch is a **living set** that continuously gains and sheds sequences, keeping the GPU's compute width **saturated** instead of draining as sequences finish. A single 2000-token generation no longer holds a slot that 200 short requests could have cycled through.

## Prefill vs Decode in the Loop

Each new request first needs a **prefill** (process the whole prompt in one big parallel pass, building its KV cache), then enters the **decode** loop (one token at a time). The scheduler interleaves incoming prefills with ongoing decodes — often preferring to batch decodes for steady throughput and slotting prefills in as capacity allows (chunked prefill avoids a long prompt stalling decodes). Balancing these is what tuning an LLM server is really about.

## Throughput vs Latency

Continuous batching massively raises **throughput** (tokens/sec across all users) and GPU utilization, but a bigger running batch can raise **per-token latency** for an individual request (more sequences share each step). Servers expose knobs — max batch size, max number of sequences, KV-cache memory budget — to trade aggregate throughput against tail latency per user.

## Design Guidance (for understanding/using)

- **Use a server that does continuous batching** (vLLM/TGI/TensorRT-LLM) — don't hand-roll static batching for production LLM serving.
- **Right-size the batch/KV budget** — bigger batches = more throughput but higher per-token latency and more KV memory (see paged-attention).
- **Watch KV-cache memory, not just compute** — the number of concurrent sequences is usually **memory-bound** (KV cache), which caps the batch.
- **Separate/limit prefill impact** — long prompts do heavy prefill; chunked prefill keeps decodes flowing.
- **Measure tokens/sec AND p99 latency** — tune to your SLA, not just raw throughput.

## Pitfalls (in understanding/using)

- Assuming **static** batching is fine → short requests idle GPU waiting on the longest; big utilization loss.
- Ignoring **KV-cache memory** as the real limit on batch size → OOM or over-conservative batching.
- Cranking batch size for throughput → per-user latency and tail latency degrade.
- Letting a **long prefill** block the decode loop → latency spikes; use chunked prefill.
- Thinking more GPUs alone fixes throughput → without continuous batching you waste the ones you have.
