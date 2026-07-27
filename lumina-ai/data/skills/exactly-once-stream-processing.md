---
name: exactly-once-stream-processing
description: What "exactly-once" really means in stream processing (and what it doesn't) — the difference from at-least-once/at-most-once, why true exactly-once delivery is impossible but exactly-once effect/semantics is achievable via idempotency, deduplication, and atomic checkpoint+offset commits (two-phase commit to sinks). Use to reason about duplicates, replay after failure, idempotent sinks, and transactional output.
category: data-engineering
keywords_vi: xử lý luồng đúng một lần exactly-once, at-least-once và at-most-once, hiệu ứng đúng một lần khả thi, khử trùng lặp deduplication idempotent sink, chốt checkpoint và offset nguyên tử, xuất kết quả giao dịch two-phase commit tới sink
---

# Exactly-Once Stream Processing

"Exactly-once" is the most marketed and most misunderstood phrase in streaming. Taken literally — *each message is delivered and processed once, never zero or twice, across arbitrary failures* — it is **provably impossible** (a sender that crashes after sending but before the ack can't know whether to resend). What real systems provide is **exactly-once *semantics/effect*: the observable result is as if each event were processed once**, even though messages may physically be delivered more than once. Understanding this distinction prevents a lot of false confidence (see stream-processing, event-time-and-watermarks, idempotency).

## The Three Delivery Guarantees

- **At-most-once** — never reprocess; on failure, **drop**. No duplicates, but **data loss**. Rarely acceptable.
- **At-least-once** — never lose; on failure, **replay**. No loss, but **duplicates**. The common baseline.
- **Exactly-once (effect)** — never lose *and* no duplicate **effect**. Achieved by making replay **harmless**.

Since you can't avoid re-delivery, exactly-once = **at-least-once delivery + deduplication/idempotency so the duplicate has no effect.**

## The Two Halves You Must Handle

**1. Processing state (internal).** On failure the processor **replays** from the last checkpoint. To not double-count internal aggregates, state and input **position (offset)** must advance **atomically**: checkpoint the operator state *and* the source offsets together, so on recovery you resume from a consistent point (e.g. Flink's distributed snapshots / Chandy-Lamport; Kafka Streams' changelog + offset commit). If state advanced but the offset didn't (or vice versa), you get duplicates or gaps.

**2. Output to the sink (external).** Even with perfect internal state, you might **emit** a result, then crash before recording that you did, and re-emit on replay. Fixes:
- **Idempotent sink** — writing the same result twice = writing once (keyed upsert, dedup key, `PUT` by primary key). Simplest and most robust.
- **Transactional / two-phase-commit sink** — buffer outputs, commit them **atomically** with the checkpoint (Kafka transactions, transactional DB writes). Uncommitted outputs from a failed attempt are rolled back.
- **Deduplication** — tag each record with a unique id; the sink drops ids it has already seen.

## The Cost

Exactly-once isn't free: transactional commits and checkpoint coordination add **latency** and throughput overhead, and require **cooperating sinks**. Many pipelines deliberately choose **at-least-once + idempotent writes** as a simpler path to the same effect.

## Design Guidance (for understanding/using)

- **Say "exactly-once *effect*"** — design for harmless replay, not magical single-delivery.
- **Prefer idempotent sinks** (upsert by key, dedup id) — usually simpler and cheaper than full transactional output.
- **Couple state + offsets atomically** — never commit progress without committing the state it produced.
- **Know your sink's capability** — exactly-once end-to-end needs the sink to support transactions or idempotent writes; a dumb append-only sink can't.
- **Measure the overhead** — if latency matters more than perfect dedup, at-least-once may be the right call.

## Pitfalls (in understanding/using)

- Believing exactly-once means **no duplicate delivery** → it means no duplicate **effect**; duplicates still travel the wire.
- Getting internal state right but using a **non-idempotent** sink → duplicates leak out on replay.
- Committing offsets **before** the output is durable → data loss on crash; commit output first (or atomically).
- Assuming a framework's "exactly-once" covers the **sink** → it only covers what the sink supports.
- Paying for transactional exactly-once when **idempotent at-least-once** would meet the requirement.
