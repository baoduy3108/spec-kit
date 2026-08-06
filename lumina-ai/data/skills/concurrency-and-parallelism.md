---
name: concurrency-and-parallelism
description: Reason about concurrent and parallel code — the difference between them, race conditions and data races, locks/deadlock and lock ordering, atomics, the actor/message-passing and async/await models, thread pools, and when to use each. Use when writing multithreaded/async code or debugging a race, deadlock, or intermittent concurrency bug.
category: engineering
keywords_vi: concurrency, đa luồng, song song, race condition, deadlock, bất đồng bộ async await, lock mutex, bug chập chờn đa luồng
---

# Concurrency & Parallelism

**Concurrency** is dealing with many things at once (structure); **parallelism** is doing many things at once (execution). You can have concurrency on one core (interleaving) and need it even without parallelism (e.g. waiting on I/O).

## The Core Hazards

- **Race condition** — the result depends on timing between threads. The classic is read-modify-write on shared state (`x = x + 1` from two threads loses updates).
- **Data race** — unsynchronized access to shared memory where at least one is a write; undefined behavior in many languages. Every data race is a bug even if it "usually works."
- The fix is one of: **don't share** (give each worker its own data), **make it immutable**, or **synchronize** access.

## Synchronization Tools

- **Mutex/lock** — one holder at a time around a critical section. Keep critical sections tiny; never do I/O or call unknown code while holding a lock.
- **Deadlock** — two threads each hold what the other needs. Prevent by **acquiring locks in a consistent global order**, using timeouts, or reducing lock scope. A deadlock that appears once in prod is a lock-ordering bug.
- **Atomics** — lock-free primitives (`compare-and-swap`, atomic counters) for simple shared state; faster but harder to reason about for anything compound.
- **Read-write locks / semaphores / condition variables** for specific patterns; don't reach for them before a plain mutex is proven insufficient.

## Models That Avoid Shared-State Pain

- **Message passing / actors / channels** — workers own their state and communicate by sending messages; "don't communicate by sharing memory, share memory by communicating." Eliminates most data races by construction.
- **async/await (event loop)** — single-threaded concurrency for **I/O-bound** work: thousands of in-flight operations without threads. Beware blocking the event loop with CPU work — offload it. Async ≠ parallel.
- **Thread/worker pools** — bound parallelism to ~CPU count for **CPU-bound** work; unbounded threads thrash.

## Choosing

- **I/O-bound** (network, disk, waiting) → async/await or a small thread pool.
- **CPU-bound** (compute) → parallelism across cores (worker pool / multiprocessing; mind the GIL in CPython — use processes).
- **Shared mutable state** → prefer message passing; if you must share, one lock with a clear ownership rule beats many clever ones.

Debug intermittent failures as concurrency bugs: add logging with thread ids, reduce to the smallest interleaving, and stress-test with many iterations — a race that fails 1/1000 needs thousands of runs to reproduce.
