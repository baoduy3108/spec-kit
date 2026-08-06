---
name: distributed-tracing
description: Trace a request across services — traces and spans, propagating trace context (correlation/trace IDs) across service and async boundaries, sampling, and using traces to find latency bottlenecks and failures in a distributed system. Use when debugging cross-service latency/errors or instrumenting observability (the three pillars: logs, metrics, traces).
category: engineering
keywords_vi: distributed tracing, truy vết phân tán, trace span, correlation id trace id, opentelemetry, tìm nút thắt latency, debug nhiều service, quan sát observability
---

# Distributed Tracing

In a microservices/distributed system, one user request touches many services. Logs and metrics tell you *a* service is slow; **tracing** tells you *which hop* in *which request* and why.

## Traces & Spans

- A **trace** represents one end-to-end request, identified by a **trace ID**.
- A **span** is one unit of work within it (an HTTP handler, a DB query, an RPC), with a start/end time, a parent span, and attributes (status, tags). Spans nest into a tree.
Rendered as a waterfall, a trace shows exactly where the time went — the 800ms was the third downstream call, not the one you suspected.

## Context Propagation (the key mechanism)

For spans from different services to join one trace, the **trace context must travel with the request**: the caller injects the trace ID + parent span ID into outgoing headers (W3C `traceparent`), and the callee extracts them and continues the trace. This must cross **every boundary** — HTTP, gRPC, and especially **async** ones (message queues: put the context in message metadata; background jobs: carry it along). A broken propagation = orphaned spans and a trace that "ends" mysteriously.

A lightweight version even in a monolith: attach a **correlation ID** to each request and include it in every log line, so you can grep all logs for one request.

## Sampling

Tracing every request is expensive at scale, so **sample** — keep a percentage (head sampling) or decide after seeing the trace (tail sampling, to always keep errors/slow ones). Balance cost against coverage; always sample errors and outliers.

## Using Traces

- **Find latency bottlenecks** — sort spans by duration; the critical path is obvious.
- **Debug cross-service errors** — follow one failing request through every service it touched.
- **Understand dependencies** — traces reveal the real call graph (often surprising).
- Combine with the other two **observability pillars**: **metrics** (aggregate rates/latencies/errors — the "what"), **logs** (detailed events — the "why"), **traces** (the request's path — the "where"). Use OpenTelemetry as the vendor-neutral standard.

## Pitfalls

- **Broken context propagation** (especially across queues/async) → disconnected traces.
- **Re-serializing** or dropping trace headers at a proxy/gateway.
- Tracing everything with no sampling → huge cost; or sampling out all the errors you needed.
- High-cardinality span attributes blowing up storage.
- Treating traces as a replacement for logs/metrics rather than complementary.
