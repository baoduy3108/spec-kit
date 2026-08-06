---
name: serverless-architecture-patterns
description: How to architect serverless applications — function-as-a-service and event triggers, statelessness and externalized state, cold starts, designing around per-invocation billing and limits, and when serverless fits vs when it doesn't. Use to understand serverless patterns, AWS Lambda architecture, cold starts, or designing event-driven serverless systems.
category: engineering
keywords_vi: serverless architecture, kiến trúc serverless, function as a service faas, event trigger, stateless externalize state, cold start, billing theo invocation, khi nào dùng serverless
---

# Serverless Architecture Patterns

Serverless (Functions-as-a-Service like AWS Lambda, Cloud Functions) lets you run code **without managing servers** — the platform runs your function on demand, scales it automatically, and bills per invocation. Architecting for it well means embracing its model: small, stateless, event-triggered functions. (See how-serverless-works for the underlying mechanics.)

## The Model: Event-Triggered Functions

A serverless app is a set of **functions**, each triggered by an **event**: an HTTP request (via an API gateway — see api-gateway-patterns), a file upload, a queue message, a schedule, a database change. The function runs, does its work, and exits. You compose applications from these small event-handlers glued together by events (see event-driven-architecture). The platform handles provisioning, scaling (to zero and to thousands), and availability.

## Statelessness (a hard requirement)

Functions are **stateless and ephemeral** — an instance can be created, frozen, reused, or destroyed at any time, and consecutive requests may hit different instances. So you **cannot** rely on in-memory or local-disk state between invocations. **Externalize all state** to managed services: databases, caches (Redis), object storage (see object-storage), queues. Design each function to be self-contained given its input and external state. (This aligns with twelve-factor and immutable-infrastructure thinking.)

## Cold Starts

When a function hasn't run recently (or needs to scale up), the platform must **initialize a new instance** — load the runtime and your code — before handling the request: a **cold start**, adding latency (tens of ms to seconds, worse for heavy runtimes/large dependencies). Mitigations: keep functions **small** (fewer/lighter dependencies), choose fast-starting runtimes, use **provisioned concurrency** (keep instances warm) for latency-sensitive paths, and accept that cold starts mostly hurt spiky/low-traffic functions. Design latency-critical user paths with this in mind.

## Design Around Billing & Limits

- **Per-invocation + duration billing** — you pay per call and per ms of execution × memory. So **efficient, short** functions are cheaper; idle costs nothing (scale to zero). But very high-volume workloads can cost more than a always-on server — model it.
- **Execution limits** — max duration (e.g. 15 min), memory, payload size, /tmp space. Long-running or heavy jobs don't fit; break them up or use a different compute model.
- **Concurrency limits** — sudden scale can hit account limits or overwhelm **downstream** (a database's connection limit — see connection-pooling; serverless + traditional DB pooling is a known trap, use a serverless-friendly DB or a proxy).

## When Serverless Fits (and Doesn't)

- **Great for** — spiky/unpredictable traffic, event processing, glue/automation, low-to-moderate steady load, teams wanting minimal ops. Pay-per-use and auto-scale shine.
- **Poor fit** — sustained high-throughput (cost), long-running/stateful/latency-critical (cold starts, limits), heavy compute, or when you need fine-grained control. A container/VM may be better.
Many systems mix serverless (event glue, spiky endpoints) with containers (steady core services).

## Pitfalls (in understanding/using)

- Relying on **local/in-memory state** between invocations — functions are ephemeral; externalize state.
- Ignoring **cold starts** on latency-critical paths — keep functions lean, use provisioned concurrency.
- **Database connection exhaustion** — each concurrent function opening DB connections blows limits; use a proxy/serverless DB (see connection-pooling).
- Assuming serverless is always **cheaper** — high sustained load can cost more than a server; model it.
- Building a **giant "monolithic" function** or fighting execution limits with long jobs — decompose.
- Over-decomposing into hundreds of tiny functions → operational/observability complexity (see distributed-tracing).
- Vendor lock-in from deep platform-specific coupling — weigh portability.
