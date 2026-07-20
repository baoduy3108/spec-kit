---
name: backpressure-and-flow-control
description: Backpressure and flow control — how a system under load signals producers to slow down instead of unboundedly buffering or crashing, using bounded queues, blocking, dropping, or credit-based flow control. Use to design systems that stay stable under overload, handle fast producers and slow consumers, or add backpressure.
category: engineering
keywords_vi: backpressure, áp lực ngược, flow control kiểm soát luồng, producer nhanh consumer chậm, hàng đợi có giới hạn, báo producer chậm lại, tránh tràn bộ nhớ khi quá tải
---

# Backpressure and Flow Control

Backpressure is how a system **signals upstream producers to slow down** when downstream consumers can't keep up — rather than silently buffering forever until it runs out of memory and crashes. It's the difference between a system that **degrades gracefully** under overload and one that falls over (see rate-limiting-algorithms, message-queues-and-events, retries-and-resilience).

## The Problem: Fast Producer, Slow Consumer

Whenever one part of a system produces work **faster** than another can process it (a firehose of events into a slow database, a fast client into a slow handler), the excess has to go **somewhere**. The naive answer — an **unbounded queue/buffer** — just delays disaster: the buffer grows without limit, latency climbs, memory fills, and eventually the process is OOM-killed. The queue **hid** the overload instead of handling it. Backpressure makes the overload **visible and controlled**.

## The Core Idea: Push Back on the Producer

Backpressure means the consumer (or the system between) can **tell the producer to slow down or stop**. The mechanisms, from gentlest to harshest:
- **Bounded queues + blocking** — the buffer has a fixed size; when full, the producer **blocks** (waits) until space frees up. Natural backpressure — the producer is throttled to the consumer's rate.
- **Credit / demand-based flow control** — the consumer explicitly **requests** N items ("I can handle 10 more"); the producer sends only what's demanded (the model behind reactive streams, TCP windows, HTTP/2 flow control).
- **Dropping / load shedding** — when you *can't* slow the producer (e.g. real-time sensor data, inbound traffic), **drop** excess (sample, drop oldest, reject with 429) to protect the system (see retries-and-resilience). Better to serve some requests well than all requests badly.

## Where It Shows Up

- **TCP** — the receive window *is* backpressure (receiver tells sender how much it can accept).
- **Reactive streams** (Reactor, RxJava, Akka Streams) — built around demand signals.
- **Message queues** — bounded queues + consumer acknow... consumers pull at their own pace (see message-queues-and-events).
- **Thread pools / bounded work queues** — reject or block when saturated rather than spawning unbounded work.

## Design Guidance

- **Bound every queue.** An unbounded buffer is a latent crash. Pick a size and decide what happens when it's full (block, drop, reject).
- **Decide block vs drop by data type** — block for work you must not lose; drop/shed for data where fresh-but-partial beats complete-but-late.
- **Propagate backpressure end-to-end** — a bounded queue that feeds an unbounded one just moves the problem.
- **Shed load early** — reject at the edge (429) before work enters expensive stages.

## Pitfalls (in understanding/using)

- **Unbounded queues/buffers** — the classic hidden failure; they turn overload into an OOM crash instead of a controlled slowdown.
- Buffering where you should **drop** (real-time data) — stale buffered data is worse than fresh sampled data.
- Backpressure that **doesn't propagate** — one unbounded stage anywhere in the pipeline defeats the whole scheme.
- No **load shedding** for un-throttleable inbound traffic → the system accepts more than it can serve and collapses.
- Confusing backpressure (slow the producer) with **rate limiting** (cap the rate) — related, but rate limiting is a fixed policy while backpressure is dynamic feedback.
- Treating a full queue as an error to retry immediately → amplifies the overload (see retries-and-resilience).
