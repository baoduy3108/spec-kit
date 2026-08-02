---
name: llm-gateway-and-model-routing
description: LLM gateway and multi-model routing — unifying many LLM providers behind one API, routing by cost/quality/latency, tiered fallback chains, an OpenAI-compatible surface, provider abstraction, and hiding model identity. Use when building an LLM gateway/router, aggregating multiple model providers, a fallback chain, or a unified LLM API.
category: ai-agent
keywords_vi: cổng llm và định tuyến đa mô hình, hợp nhất nhiều nhà cung cấp llm sau một api, định tuyến theo chi phí chất lượng độ trễ, chuỗi dự phòng phân tầng fallback, bề mặt tương thích openai, trừu tượng hóa nhà cung cấp, ẩn danh tính model
---

# LLM Gateway & Model Routing

An **LLM gateway** unifies many model providers (OpenAI, Anthropic, Google, open models via Groq/OpenRouter/Ollama…) behind **one API and one routing layer** — choosing the right model per request, failing over when one is down, and controlling cost. It's the architecture behind "one endpoint, many brains" (see capability-abstraction-and-backend-routing, api-gateway-patterns).

## Why a Gateway

- **One integration, many models** — apps call the gateway, not each provider's SDK. Swap/add models without touching app code.
- **Routing** — pick the model per request (by cost, quality, latency, capability, or availability).
- **Resilience** — if a provider errors or rate-limits, fail over to another automatically.
- **Governance** — central place for auth, quotas, logging, cost control, and safety.

## Provider Abstraction

- Normalize providers behind a **common interface** (`stream_chat(messages, params) → tokens`). Many providers already speak **OpenAI-compatible** APIs (same `/chat/completions` shape) — so one client class + different base_url/model/key serves several.
- Handle per-provider quirks (auth headers, streaming format, error codes, token limits) inside adapters so the core stays uniform.

## Routing Strategies

Choose the model per request by:
- **Tiered/quality** — a premium model for hard/important requests, cheaper/free models otherwise. Route by task difficulty (prompt length, detected complexity).
- **Cost-aware** — prefer cheaper/free models; escalate only when needed. Big savings.
- **Latency** — pick the fastest for interactive use.
- **Capability** — route vision to a vision model, code to a code model, long-context to a long-context model.
- **Load/availability** — spread across providers; avoid rate-limited ones.
Often a mix: a **router** classifies the request, then selects.

## Tiered Fallback Chains

The reliability core (see llm-fallback-and-reliability):
- Define an **ordered chain**: premium → cheaper → free → local. On failure (error, timeout, rate-limit, empty response), advance to the next.
- **Circuit breakers** — temporarily skip a provider that keeps failing (see resilience patterns), retrying it later.
- **Graceful degradation** — the user always gets *an* answer, even if from a weaker model. Never a hard failure if any brain is available.

## OpenAI-Compatible Surface

Exposing `/v1/chat/completions` in **OpenAI's format** lets any OpenAI SDK/tool point at your gateway with just a base-URL change — huge for adoption (drop-in compatibility). Accept `{model, messages, stream}`, return the standard `choices[].message`/`delta` shapes. The `model` field can be a *logical* name (e.g. "auto") that your router maps to a real backend.

## Hiding Model Identity

A gateway often presents **one product name** ("our AI") rather than exposing which provider/model served each request — for branding, flexibility (swap backends freely), and to avoid leaking vendor details. Normalize responses so the switch is invisible to callers.

## Cross-Cutting Concerns

- **Auth & keys** — API keys per client (see api-key-management-and-security), scoped and rate-limited.
- **Quotas & cost** — per-user/tier limits; track spend per provider (see llm-cost-and-latency-optimization).
- **Observability** — log routing decisions, latencies, errors, costs per model (see llm-observability).
- **Caching** — cache identical prompts to cut cost/latency.
- **Safety** — central guardrails (see llm-guardrails-and-safety).

Build an LLM gateway by **abstracting providers behind a common (often OpenAI-compatible) interface**, **routing per request** (cost/quality/latency/capability/availability), running a **tiered fallback chain with circuit breakers** for resilience, exposing an **OpenAI-compatible `/v1` surface** for drop-in adoption, optionally **hiding model identity** behind one product name, and centralizing **auth, quotas, observability, caching, and safety**. The result: one reliable, cost-efficient endpoint that transparently orchestrates many models.
