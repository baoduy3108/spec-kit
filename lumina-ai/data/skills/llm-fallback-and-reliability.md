---
name: llm-fallback-and-reliability
description: LLM reliability and fallback — tiered fallback chains across providers/models, circuit breakers, retries with backoff, timeouts, handling rate limits and errors, graceful degradation, and health checks. Use when making LLM calls reliable, designing provider fallback, handling model outages/rate limits, or building a resilient AI pipeline.
category: ai-agent
keywords_vi: độ tin cậy và dự phòng llm, chuỗi dự phòng phân tầng qua nhiều nhà cung cấp mô hình, ngắt mạch circuit breaker cho llm, thử lại với backoff khi gọi model, timeout khi sinh token, xử lý giới hạn tốc độ và lỗi provider llm, model yếu hơn thay khi model mạnh lỗi, kiểm tra sức khỏe provider
---

# LLM Reliability & Fallback

LLM providers fail — outages, rate limits, timeouts, empty responses, content filters. A production AI system must **keep working anyway**. Reliability comes from **fallback chains, circuit breakers, and graceful degradation** so users always get *an* answer rather than an error (see llm-gateway-and-model-routing).

## Why LLM Calls Fail

- **Provider outages / 5xx errors**, **rate limits (429)**, **timeouts** (slow generation), **empty/refused responses**, **context-length errors**, **auth/quota exhaustion**. Any external LLM will fail sometimes — design for it.

## Tiered Fallback Chains

The core pattern:
- Define an **ordered chain of models/providers**: e.g. premium → cheaper → free → **local**. On failure, **advance to the next** and retry the request.
- **Ordering** — by quality/cost (best first, cheapest last) or by reliability. A local model at the end guarantees an answer even if all cloud providers are down.
- Each provider is an interchangeable backend behind a common interface, so failover is transparent to callers.
- **Graceful degradation** — a weaker model answering beats a hard failure. Prefer *some* answer over *no* answer for most use cases.

## Circuit Breakers

Don't hammer a failing provider:
- A **circuit breaker** tracks failures per provider. After N consecutive failures, it **"opens"** — skip that provider for a cooldown period (fail fast, don't waste time/quota).
- After the cooldown, **"half-open"** — try one request; success closes the circuit (resume), failure reopens it.
- Prevents cascading slowdowns from a dead provider and gives it time to recover.

## Retries, Backoff & Timeouts

- **Retries** — retry *transient* failures (timeouts, 5xx, 429), not permanent ones (400 bad request, auth errors — retrying wastes resources).
- **Exponential backoff + jitter** — wait increasingly longer between retries (and add randomness) to avoid thundering-herd retries. Respect `Retry-After` on 429.
- **Timeouts** — cap how long you wait for a response (and for the first token in streaming). A hung request shouldn't block forever; time out and fall over.
- **Retry budget** — limit total retries so a single request can't spiral.

## Handling Rate Limits

- On **429**, back off and/or **route to a different provider** immediately (fallback shines here). Track per-provider limits and spread load.
- **Load balancing** across multiple keys/providers raises effective throughput.

## Health Checks & Monitoring

- **Health checks** — periodically verify each provider is reachable; deprioritize unhealthy ones in the chain.
- **Observability** — log failures, fallback events, latencies, and which model actually served each request (see llm-observability). Alert on elevated error rates.
- **Metrics** — success rate, fallback frequency, per-provider reliability — guide chain ordering and provider choice.

## Graceful Degradation Strategies

- **Model fallback** — weaker model when the strong one fails.
- **Feature fallback** — disable optional steps (tools, long context) to complete the core request.
- **Cached/canned responses** — for repeated queries, serve cache if live generation fails.
- **Honest failure** — if *everything* fails, return a clear, friendly error (not a stack trace), and log it.

Make LLM systems reliable with **tiered fallback chains** (premium→free→local, advancing on failure for graceful degradation), **circuit breakers** (skip failing providers, recover on cooldown), disciplined **retries with exponential backoff + jitter** and **timeouts** (only for transient errors), smart **rate-limit handling** (back off / reroute), and **health checks + observability** to guide the chain. The goal: no matter which providers fail, the user still gets a usable answer — resilience is a first-class feature, not an afterthought.
