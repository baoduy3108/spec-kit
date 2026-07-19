---
name: llm-cost-and-latency-optimization
description: How to cut LLM app cost and latency — model routing (small vs large), prompt/context trimming, prompt caching, semantic caching, streaming for perceived speed, batching, output limits, and RAG over huge context. Use to reduce LLM API costs, speed up responses, or optimize an LLM app's economics and UX.
category: ai-agent
keywords_vi: llm cost latency optimization, giảm chi phí tăng tốc llm, model routing nhỏ lớn, cắt gọn prompt context, prompt caching semantic cache, streaming, batching, giới hạn output
---

# LLM Cost & Latency Optimization

LLM API calls cost money (per token) and time (generation is slow). At scale, an unoptimized LLM app is expensive and sluggish. Optimization keeps it affordable and responsive without sacrificing much quality — often the difference between a viable product and a money pit (see saas-metrics, model-hierarchy).

## Understand the Cost/Latency Drivers

- **Tokens** — you pay per input **and** output token (see how-tokenizers-work), and latency grows with tokens (especially output — generation is sequential). Fewer tokens = cheaper and faster.
- **Model size** — bigger models cost more per token and are slower. Latency is dominated by output length and model size.

## Model Routing (the biggest lever)

Don't use your most powerful (expensive/slow) model for **everything**. **Route** by task difficulty (see model-hierarchy):
- **Small/fast/cheap** models for simple tasks (classification, extraction, routing, easy Q&A) — often 10–100× cheaper.
- **Large/capable** models only for hard reasoning/generation.
A **router** classifies the request and picks the cheapest model that can do it. Or **cascade**: try a small model, escalate to a big one only if it fails/is low-confidence. Massive savings with little quality loss on the easy majority.

## Reduce Tokens

- **Trim the prompt/context** — remove boilerplate, redundant instructions, and unnecessary retrieved chunks (see rag-retrieval-and-reranking — rerank and send fewer, better chunks). Every token in the context is paid for on **every** call.
- **Limit output** — set max tokens and prompt for concise answers; long outputs cost most.
- **Summarize/compress** long histories instead of resending full chat logs (see conversation memory ideas).

## Caching

- **Prompt caching** — many providers cache a **static prompt prefix** (system prompt, long context, few-shot examples) so repeated calls with the same prefix are much cheaper/faster. Structure prompts with the stable part first to maximize cache hits.
- **Semantic caching** — cache **answers to semantically-similar queries** (see semantic-caching) so repeated/near-duplicate questions skip the model entirely. Big wins for FAQ-like traffic.
- **Exact-match caching** — trivially cache identical requests.

## Perceived Speed & Throughput

- **Streaming** — stream tokens to the user as they generate (see how-server-sent-events-work). Doesn't reduce total time, but the user sees output **immediately** — hugely better perceived latency for chat.
- **Batching** — batch independent requests together where the provider/infra supports it (higher throughput, better GPU utilization — see how-gpus-work) for offline/bulk workloads.
- **Parallelize** independent LLM calls instead of chaining them serially.

## Pitfalls (in understanding/using)

- Using the **biggest model for everything** — the top cost driver; route by difficulty.
- **Bloated context/prompts** — paying for redundant tokens on every call; trim aggressively.
- **No caching** — recomputing identical/similar requests; use prompt + semantic caching.
- **Unbounded output** — long generations dominate cost/latency; cap and prompt for concision.
- Ignoring **streaming** for chat UX — users wait on a blank screen unnecessarily.
- Resending **full chat history** every turn instead of summarizing/truncating.
- Optimizing cost so hard that **quality** drops below usable — measure quality alongside cost (see rag-evaluation, evaluation).
- Not measuring — track token usage/cost/latency per request (see llm-observability) before optimizing.
