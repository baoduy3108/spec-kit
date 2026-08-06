---
name: prefill-and-decode-disaggregation
description: Why LLM inference has two very different phases — compute-bound prefill (process the whole prompt at once) and memory-bound decode (generate one token at a time) — and how disaggregating them onto separate resources improves latency and throughput. Use to understand TTFT vs TPOT, why batching helps decode but prefill saturates compute, chunked prefill, and why one long prompt hurts other users' token latency.
category: ai-ml-internals
keywords_vi: hai pha suy luận llm prefill nghẽn tính toán và decode nghẽn bộ nhớ, prefill xử lý cả prompt một lần decode sinh từng token, tách riêng disaggregation prefill và decode lên tài nguyên khác nhau, thời gian tới token đầu ttft và thời gian mỗi token tpot, chunked prefill chia nhỏ prompt dài, một prompt dài làm hại độ trễ token của người khác
---

# Prefill & Decode Disaggregation

LLM inference is really **two different workloads wearing one coat**, and treating them the same wastes hardware. When you send a prompt, the model first does **prefill** — read the entire prompt and build its KV cache in **one big parallel pass** — then **decode** — generate the answer **one token at a time**, each step attending to all prior tokens. These phases have **opposite** performance profiles, which is why modern serving stacks increasingly **disaggregate** them (see continuous-batching-for-llm-serving, paged-attention-and-kv-cache-memory, flash-attention).

## Two Phases, Two Bottlenecks

- **Prefill = compute-bound.** The whole prompt is processed at once, so there's a lot of parallel matmul work — it **saturates GPU compute (FLOPs)**. Its latency sets **TTFT** (Time To First Token). A long prompt = a big, heavy prefill.
- **Decode = memory-bound.** Generating one token does *little* compute but must **read the entire KV cache and weights** from memory every step. It's limited by **memory bandwidth**, not FLOPs. Its per-step latency sets **TPOT** (Time Per Output Token) / inter-token latency.

Because they bottleneck on different resources, the batching and scheduling that help one can **hurt** the other.

## Why They Interfere When Mixed

In a single shared batch:
- **Batching helps decode** — many sequences share the weight read, amortizing memory bandwidth → higher token throughput.
- **Prefill hogs compute** — when a long prompt's prefill runs, it monopolizes the GPU, and the ongoing decodes of *other users* stall → their **TPOT spikes** (inter-token stutter). One user's long prompt degrades everyone's streaming smoothness.

## Two Fixes: Chunked Prefill and Disaggregation

- **Chunked prefill** — split a long prompt's prefill into **smaller chunks** interleaved with decode steps, so a huge prompt can't block the decode loop for long. Keeps token streaming smooth on a single pool.
- **Prefill/decode disaggregation** — run prefill and decode on **separate GPU pools/instances**. A "prefill worker" builds the KV cache, then **hands it off** (transfers KV) to a "decode worker" that streams tokens. Each pool is tuned and scaled for its own bottleneck (compute vs bandwidth), so heavy prefills never interfere with smooth decoding — at the cost of transferring KV cache between them. Used in high-scale serving (e.g. DistServe, and production stacks) to hit **both** TTFT and TPOT SLAs.

## Design Guidance (for understanding/using)

- **Measure TTFT and TPOT separately** — they're governed by different phases; a single "latency" number hides the trade.
- **Use chunked prefill** to stop long prompts from stalling other users' token streams on shared serving.
- **Consider disaggregation at scale** when you must meet strict TTFT *and* TPOT and have enough GPUs to split pools.
- **Right-size per phase** — prefill wants compute; decode wants memory bandwidth and big batches; provision accordingly.
- **Long prompts are expensive up front** (prefill); long generations are expensive per token (decode) — optimize the one that dominates your workload.

## Pitfalls (in understanding/using)

- Treating inference as one uniform workload → you tune for the wrong bottleneck.
- Letting a long prompt's **prefill** run un-chunked in a shared batch → everyone's TPOT stutters.
- Optimizing only **throughput** and ignoring **TTFT** (or vice versa) → bad UX on the metric you ignored.
- Assuming decode is compute-heavy → it's **memory-bandwidth**-bound; batching (not more FLOPs) is the lever.
- Adding disaggregation without accounting for **KV-cache transfer** cost between pools.
