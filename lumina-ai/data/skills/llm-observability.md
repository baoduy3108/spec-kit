---
name: llm-observability
description: How to observe and debug LLM applications in production — tracing multi-step chains/agents, logging prompts/responses/tokens/cost/latency, monitoring quality and failures, capturing user feedback, and running online evals. Use to debug LLM apps, trace agents/chains, track token cost, monitor LLM quality in production, or set up LLM observability.
category: ai-agent
keywords_vi: llm observability, tracing chuỗi agent, token cost latency llm, quan sát gỡ lỗi ứng dụng llm, log prompt response, giám sát chất lượng lỗi, feedback người dùng, online eval
---

# LLM Observability

LLM applications are **non-deterministic** and often **multi-step** (chains, RAG, agents with tool calls), which makes them uniquely hard to debug and monitor. LLM observability is the practice of capturing what the app actually did — prompts, responses, retrievals, tool calls, tokens, cost, latency, and quality — so you can debug failures, control cost, and track quality in production (see observability-and-instrumentation for the general discipline).

## Why Traditional Monitoring Isn't Enough

A normal request either works or errors. An LLM app can return a **200 OK with a bad answer** — hallucinated, off-topic, or wrong — with no exception. And a single user request may fan out into many steps (retrieve → rerank → LLM → tool call → LLM again). You can't debug "why was the answer wrong?" from HTTP metrics alone. You need to see **inside** the chain.

## Tracing (the core capability)

**Trace** each request end-to-end through all its steps (see distributed-tracing): the exact **prompt** sent, the **response**, retrieved **chunks** (for RAG), each **tool call** and its result, and every LLM call in an agent loop — with timing and tokens per step. A trace lets you answer "at which step did this go wrong?" — bad retrieval? bad prompt? wrong tool? Tools like LangSmith, Langfuse, Phoenix, and OpenTelemetry-based tracers provide this. Tracing is the single most valuable LLM-observability capability.

## What to Log & Monitor

- **Prompts & responses** — the actual inputs/outputs (essential for debugging; mind PII/privacy — see secrets-management, llm-guardrails-and-safety).
- **Tokens & cost** — input/output tokens and $ per request/feature/user — to catch cost blowups and optimize (see llm-cost-and-latency-optimization).
- **Latency** — per step, to find bottlenecks (which model/tool/retrieval is slow).
- **Errors & fallbacks** — API errors, timeouts, rate limits, retries, guardrail triggers.
- **Quality signals** — see below.

## Measuring Quality in Production

The hard part — quality isn't a simple metric:
- **User feedback** — thumbs up/down, edits, regenerations, abandonment — direct signal of good/bad answers. Capture it.
- **Online evals** — run automated checks (LLM-as-judge, groundedness, guardrail flags — see rag-evaluation, evaluation) on a sample of production traffic to track quality over time.
- **Track drift** — quality can degrade as data, usage, or a provider's model changes; monitor trends.
- Link feedback/evals back to **traces** so you can inspect *why* a flagged response was bad.

## Close the Loop

Observability feeds improvement: use traces of failures to build a **test/eval set** (see rag-evaluation), find common failure modes, and validate fixes. Production data is your best source of hard cases.

## Pitfalls (in understanding/using)

- **Only HTTP/infra metrics** → blind to bad-but-successful answers; you need prompt/response/quality visibility.
- **No tracing** of multi-step chains/agents → can't localize *which* step failed.
- **Not tracking tokens/cost** → surprise bills and no data to optimize.
- **No quality signal** (feedback/evals) → you don't know if answers are good until users complain.
- **Logging PII/secrets** in prompts/responses without care → privacy/compliance risk (redact — see llm-guardrails-and-safety).
- Not linking **feedback to traces** → can't investigate why flagged responses failed.
- Ignoring **drift** — assuming quality is static (models, data, and usage change).
- Collecting data but never **closing the loop** into evals/fixes.
