---
name: message-queues-and-events
description: Design asynchronous, event-driven systems with message queues — decoupling producers/consumers, delivery guarantees (at-least/at-most/exactly-once), idempotent consumers, ordering, dead-letter queues, backpressure, and queue (RabbitMQ/SQS) vs log (Kafka) semantics. Use when adding a queue, designing event-driven flows, or debugging duplicate/lost/out-of-order messages.
category: engineering
keywords_vi: message queue, hàng đợi tin nhắn, event-driven, kafka rabbitmq, xử lý bất đồng bộ, at-least-once, dead letter queue, worker tiêu thụ, tin nhắn trùng lặp
---

# Message Queues & Events

Queues decouple a producer from a consumer: the producer hands off work and moves on; consumers process at their own pace. This smooths spikes, isolates failures, and enables async workflows.

## When to Use

Offload slow/spiky work (email, image/video processing, notifications, third-party calls), fan-out one event to many consumers, decouple services so one being down doesn't block the other, and level load (queue absorbs bursts; workers drain steadily).

## Delivery Guarantees

- **At-most-once** — may lose messages, never duplicates. Rarely acceptable.
- **At-least-once** — never lost, but **may duplicate** (redelivery after a consumer crash before ack). The common default — so **consumers MUST be idempotent**.
- **Exactly-once** — very hard end-to-end; usually achieved as at-least-once delivery + idempotent processing, not true once-only delivery. Don't assume the broker gives it for free.

**Idempotent consumer** = processing the same message twice has the same effect as once. Use an idempotency key / dedup table / upsert. This is the single most important correctness rule with queues.

## Queue vs Log

- **Queue (RabbitMQ, SQS)** — a message is consumed and removed; work is distributed across competing consumers. Good for task distribution.
- **Log (Kafka)** — an ordered, retained, replayable stream; many independent consumer groups read at their own offset; ordering within a partition. Good for event sourcing, analytics, multiple subscribers, and replay.

## Operational Concerns

- **Ack after success, not on receipt** — ack only once work is durably done, so a crash redelivers rather than loses.
- **Dead-letter queue (DLQ)** — route messages that fail repeatedly to a DLQ instead of infinite retry; alert and inspect them.
- **Retries with backoff** — retry transient failures with exponential backoff + jitter; cap attempts, then DLQ.
- **Ordering** — most queues don't guarantee global order; if you need it, use a partition/ordering key (and accept it limits parallelism). Design to tolerate out-of-order where possible.
- **Backpressure** — bound queue depth and consumer concurrency; monitor lag/depth. An unbounded growing queue means consumers can't keep up — scale them or shed load.
- **Poison messages** — one un-processable message shouldn't block the queue; time-box processing and DLQ failures.
