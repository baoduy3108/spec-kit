---
name: microservices-and-boundaries
description: Decide whether and how to split a system into services — monolith-first, service boundaries around business capabilities, data ownership (one DB per service, no shared tables), inter-service communication (sync vs async), distributed-system failure modes, and the real operational cost. Use when considering microservices, defining service boundaries, or debugging a distributed architecture.
category: engineering
keywords_vi: microservices, tách service, monolith hay microservice, ranh giới service, database per service, kiến trúc phân tán, chia nhỏ hệ thống, giao tiếp giữa service
---

# Microservices & Service Boundaries

Microservices trade code-level complexity for operational and distributed-systems complexity. Often the right first answer is **not** microservices.

## Monolith First

Start with a well-structured **modular monolith** — clear internal module boundaries, one deployable. It's simpler to build, test, deploy, and debug. Extract a service only when a specific driver demands it: independent scaling of one hot component, independent deploy cadence for different teams, or genuine technology isolation. Splitting a small app into services buys you network latency, partial failure, and distributed debugging for no real gain.

## Where the Boundaries Go

- **Around business capabilities / bounded contexts**, not technical layers. "Orders", "Payments", "Inventory" — each owns a cohesive slice of the domain end-to-end. A boundary that splits one transaction across two services is usually wrong.
- **High cohesion inside, low coupling across.** If two services constantly call each other for one operation, they're one service.
- **Conway's Law** — service boundaries tend to mirror team boundaries; align them deliberately.

## Data Ownership (the hard rule)

**Each service owns its data; no shared database, no cross-service table access.** Other services get that data only through the owner's API/events. A shared DB re-couples services (a schema change breaks everyone) and defeats the point. This means data is duplicated and eventually consistent — accept it, or don't split.

## Communication

- **Synchronous (REST/gRPC)** — simple request/response, but couples availability (callee down → caller blocked) and adds latency per hop. Add timeouts, retries with backoff, and circuit breakers.
- **Asynchronous (events/queues)** — publish events; consumers react. Decouples availability and enables fan-out, at the cost of eventual consistency and harder reasoning.
- Avoid deep synchronous call chains (A→B→C→D) — latency and failure compound.

## Distributed Reality

You now face: partial failure (some services up, some down), network unreliability, no distributed transactions (use sagas/compensation, not 2PC), eventual consistency, harder debugging (need distributed tracing/correlation IDs), and versioned contracts between services. Invest in observability, CI/CD, and infra *before* going distributed — without them, microservices are slower, not faster.
