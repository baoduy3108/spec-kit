---
name: stream-processing
description: Process unbounded data streams in near-real-time — event time vs processing time, windowing (tumbling/sliding/session), watermarks for late data, stateful processing, exactly-once semantics, and when streaming beats batch. Use when building real-time analytics/pipelines (Kafka Streams, Flink, Spark Streaming) or deciding streaming vs batch.
category: engineering
keywords_vi: stream processing, xử lý luồng dữ liệu, real-time near real-time, event time watermark, windowing tumbling sliding, kafka flink, exactly-once, khi nào streaming vs batch
---

# Stream Processing

Stream processing handles **unbounded, continuous** data — events arriving forever — computing results **as data flows** rather than in scheduled batches. It's for when insights are worth much more fresh (fraud, live dashboards, alerting, real-time recommendations).

## Streaming vs Batch

- **Batch** — process a bounded chunk on a schedule (see data-pipelines-etl). Simple, efficient, higher latency.
- **Streaming** — process each event (or micro-batch) continuously, seconds or sub-second latency. More complex; choose it only when the **latency requirement genuinely demands it** — streaming's operational cost is real.

## The Hard Part: Time

- **Event time vs processing time** — *when the event actually happened* vs *when your system processed it*. They differ because events arrive **late, out of order, or delayed** (a mobile app buffering offline data sends it hours later). Computing correct results requires reasoning in **event time**, not arrival time — otherwise a delayed event lands in the wrong time bucket.
- **Windowing** — since the stream never ends, you compute over **windows** of time:
  - **Tumbling** — fixed, non-overlapping (every 1 minute).
  - **Sliding** — overlapping (last 5 min, updated every 1 min).
  - **Session** — grouped by activity gaps (a user's session ends after N idle minutes).
- **Watermarks** — a heuristic saying "I've probably seen all events up to time T," letting the system decide when a window is "complete enough" to emit, while handling **late data** (drop it, or update the result). Balancing latency (emit early) vs completeness (wait for stragglers) is the core tension.

## State & Correctness

- **Stateful processing** — many stream computations (counts, aggregations, joins, deduplication) need to remember state across events; the engine manages this state durably (checkpointed) so it survives failures.
- **Delivery semantics** — at-least-once (may double-count on failure) vs **exactly-once** (correct even through failures, via checkpointing + idempotent sinks). Exactly-once is harder and is a key feature of mature engines (Flink, Kafka Streams). Consumers still often need idempotency (see idempotency, message-queues-and-events).

## Tools & Uses

Engines: Kafka Streams, Apache Flink, Spark Structured Streaming, cloud stream services — usually fed by a log/queue (Kafka). Uses: real-time dashboards/metrics, fraud/anomaly detection, alerting, live personalization, ETL-in-motion, IoT telemetry.

## Why It Matters

Explains: why real-time systems obsess over **event time, windows, and watermarks** (correctly handling late/out-of-order data), why streaming is more complex than batch (state, time, exactly-once), and when the freshness is worth it. Many problems people reach for streaming for are fine as frequent batch — reserve streaming for true low-latency needs.

## Pitfalls / Notes

- **Processing-time logic** that breaks on late/out-of-order events → wrong results.
- **Unbounded state** growth → memory blowup; bound windows/state with TTLs.
- **Choosing streaming when batch suffices** → needless complexity.
- **At-least-once without idempotent consumers** → double counting.
- Watermark tuning: too aggressive drops late data, too lax adds latency.
