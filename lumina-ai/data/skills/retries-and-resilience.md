---
name: retries-and-resilience
description: Build resilient calls to unreliable dependencies — timeouts on everything, retries with exponential backoff and jitter, retry only idempotent/transient failures, the circuit breaker pattern, bulkheads, fallbacks, and graceful degradation. Use when calling external services/APIs/DBs that can be slow or fail.
category: engineering
keywords_vi: retry resilience, thử lại backoff, exponential backoff jitter, circuit breaker, timeout, chịu lỗi, gọi service ngoài chập chờn, graceful degradation
---

# Retries & Resilience

Any call across a network can be slow, fail, or hang. Resilience patterns keep one flaky dependency from taking down your service.

## Timeouts (non-negotiable)

**Every** external call — HTTP, DB query, RPC, cache — must have a timeout. Without one, a hung dependency ties up a thread/connection; enough hung calls exhaust the pool and your whole service stalls (a cascading failure). Set timeouts based on the dependency's real latency (p99 + margin), and keep the caller's timeout ≥ the callee's so you don't give up while it's still working.

## Retries — Carefully

Transient failures (network blip, 503, timeout) often succeed on retry. But retries are dangerous done wrong:
- **Exponential backoff** — wait 1s, 2s, 4s… not immediately (hammering a struggling service makes it worse — a **retry storm**).
- **Add jitter** — randomize the delay so many clients don't retry in sync (the thundering herd).
- **Cap attempts** — 3–5, then fail/dead-letter. Infinite retries amplify outages.
- **Only retry idempotent, transient failures** — never blindly retry a non-idempotent POST (double charge) unless it has an idempotency key; never retry a 400/permanent error (it'll fail again).

## Circuit Breaker

When a dependency is clearly down, stop calling it. A **circuit breaker** tracks failures; after a threshold it **opens** (fail fast immediately, no waiting on doomed calls), periodically lets a trial request through (**half-open**), and **closes** again when the dependency recovers. This gives the failing service room to recover and keeps your latency low instead of every request timing out.

## Isolate & Degrade

- **Bulkheads** — separate resource pools per dependency so one saturated dependency can't consume all threads/connections and starve the others.
- **Fallbacks / graceful degradation** — when a non-critical dependency fails, return a cached/default/partial result instead of a hard error (show stale data, hide the recommendations widget, queue the work). Decide per feature what "degraded but up" looks like.
- **Load shedding** — under overload, reject some requests fast (429) to keep the rest healthy, rather than collapsing entirely.

## Pitfalls

- **No timeouts** → hangs → pool exhaustion → cascading failure (the classic outage).
- **Retries without backoff/jitter/cap** → retry storms that amplify the outage.
- **Retrying non-idempotent ops** → duplicate side effects.
- **Retrying permanent errors** (4xx) → wasted work.
- No circuit breaker → every request waits on a dead dependency, spiking latency everywhere.
