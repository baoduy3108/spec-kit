---
name: agent-observability-and-tracing
description: Seeing inside multi-step LLM/agent runs — capturing a trace of spans (each LLM call, tool call, retrieval) with inputs/outputs, tokens, cost, and latency per step, plus the prompts actually sent — so you can debug why an agent did the wrong thing, find the slow/expensive step, and evaluate quality over time. Covers traces vs metrics vs evals, what to log, and replay. Use to debug/monitor an agent, trace LLM calls, or attribute token cost per step.
category: ai-agent
keywords_vi: quan sát và trace agent nhiều bước, span mỗi lần gọi llm và tool và truy xuất, ghi input output token chi phí độ trễ mỗi bước, replay debug agent làm sai, prompt thực sự gửi đi
---

# Agent Observability & Tracing

A single LLM chat is easy to reason about; a **multi-step agent** — that plans, calls tools, retrieves, and loops — is a black box when it goes wrong. **Which step chose the bad tool? What prompt did it actually see? Where did the tokens/cost/latency go?** Agent observability makes runs **inspectable**: it records a **trace** of the whole run as nested **spans**, so you can debug, optimize, and evaluate instead of guessing (see observability-and-instrumentation, agentic-workflow-patterns, llm-cost-and-latency-optimization).

## The Model: Traces and Spans

- A **trace** = one end-to-end agent run (one user request).
- A **span** = one step within it: an LLM call, a tool/function call, a retrieval, a sub-agent. Spans **nest** (an orchestrator span contains worker spans).
- Each span records: **inputs & outputs**, the **exact prompt/messages sent** and the raw completion, **tokens** (in/out), **cost**, **latency**, tool name/args/result, and **errors**. Metadata (model, temperature, user/session id) ties it together.
This is the LLM-specific counterpart to distributed tracing (spans/parent-child), tuned to capture **prompts and token economics** that generic APM misses.

## Three Complementary Signals

- **Traces** — the *what happened* of a single run (debugging: "why did it answer X?").
- **Metrics** — aggregates over many runs (tokens/day, p95 latency, tool error rate, cost per request) for dashboards/alerts.
- **Evals** — scoring output **quality** (correctness, groundedness, format) over a dataset or on live traffic — because "no errors" ≠ "good answers".
You need all three: traces to debug, metrics to monitor, evals to know if it's actually good.

## Why It Matters

- **Debug non-determinism** — see the *real* prompt (after all injection/RAG) and the model's actual reasoning/tool choices; reproduce and **replay** a failing run.
- **Attribute cost & latency** — find the one step burning tokens or seconds; optimize it (cache it, shrink its context).
- **Catch silent failures** — a tool returning garbage, a retrieval bringing wrong docs, a loop that never converges.
- **Improve over time** — curate failing traces into an eval set; measure regressions when you change prompts/models.

## Design Guidance

- **Instrument every step** as a span (LLM, tool, retrieval) with inputs/outputs, tokens, cost, latency, errors.
- **Log the exact prompt sent** (post-templating/RAG) — not the template — so you can see what the model saw.
- **Correlate** spans by trace/session/user ids; make traces **replayable**.
- **Track metrics** (cost, latency, error/tool-failure rates) and **alert** on regressions.
- **Run evals** on curated + sampled live traces; turn failures into test cases.
- **Redact secrets/PII** in captured payloads; mind retention.

## Pitfalls (in understanding/using)

- Logging only **final output** → can't tell which step failed.
- Logging the **template**, not the **rendered prompt** → you don't see what the model actually got.
- Watching **only errors** → misses "ran fine, answered wrong" (need evals).
- No **cost/token per span** → can't find the expensive step.
- Traces you **can't replay** → hard to reproduce/fix.
- Capturing raw payloads with **secrets/PII** and no redaction/retention policy.
