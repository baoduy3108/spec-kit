---
name: dead-letter-queues
description: Dead-letter queues (DLQs) — where messages go after repeatedly failing to be processed, so a poison message doesn't block the queue or get silently lost, plus how to inspect, alert on, and replay them. Use to handle poison messages, design failure handling for message queues, or set up and drain a dead-letter queue.
category: engineering
keywords_vi: dead letter queue dlq, hàng đợi thư chết, tin nhắn lỗi lặp lại chuyển vào dlq, poison message không chặn hàng đợi, kiểm tra cảnh báo replay, xử lý thất bại queue
---

# Dead-Letter Queues (DLQs)

A dead-letter queue is a **holding area for messages that repeatedly fail** to be processed. Instead of a bad ("poison") message blocking the queue forever or being silently dropped, it's moved aside to a DLQ where it can be **inspected, alerted on, and replayed**. It's an essential safety net for any message-driven system (see message-queues-and-events, retry-and-backoff, idempotency).

## The Problem: Poison Messages

In a message queue, a consumer reads a message, processes it, and acknowledges it. But what if processing **always fails** for a particular message — a malformed payload, a bug triggered only by that data, a reference to something deleted? Without a plan:
- If the consumer **retries forever**, that message **blocks the queue** (or wastes cycles) indefinitely — a "poison message" jamming the pipeline.
- If the consumer **drops** it after failing, the message is **silently lost** — you never know data went missing.
Neither is acceptable. The DLQ is the third option: set it aside safely.

## The Core Idea: Move Aside After N Failures

The pattern: give each message a **retry/redelivery limit**. When a message has failed processing more than N times (or exceeded a max age), the queue system **moves it to a separate dead-letter queue** instead of redelivering it again. This:
- **Unblocks the main queue** — the poison message stops jamming healthy traffic.
- **Preserves the message** — it's not lost; it's parked for investigation.
- **Creates a signal** — a growing DLQ is an alertable indicator that something is systematically failing.

## Operating a DLQ

A DLQ is only useful if you actually **do something** with it:
- **Alert on it** — DLQ depth > 0 (or a threshold) should page/notify someone. An ignored DLQ is just a silent graveyard (data loss with extra steps).
- **Inspect** — examine dead-lettered messages to find the root cause (bad data? a bug? a downstream that was down?).
- **Fix and replay** — after fixing the cause, **re-drive** the messages back to the main queue for reprocessing. This requires consumers to be **idempotent** (see idempotency) so replays don't double-apply.
- **Include failure metadata** — record *why* it failed (error, attempt count, timestamps) to speed diagnosis.

## Design Guidance

- **Set a sensible retry limit** before dead-lettering — enough to ride out transient failures (see retries-and-resilience), not so many that a poison message wastes huge effort.
- **Distinguish transient vs permanent failures** — a downstream being briefly down (retry) differs from malformed data (dead-letter immediately, retrying won't help).
- **Make replay safe** — idempotent consumers so re-driving doesn't cause duplicate side effects.
- **Monitor and drain** — treat DLQ growth as an incident signal, not background noise.

## Pitfalls (in understanding/using)

- **No alerting** on the DLQ → messages pile up unnoticed; it becomes silent data loss.
- **No DLQ at all** → poison messages either block the queue forever or get dropped silently.
- **Retry limit too high** → a poison message burns resources through many pointless retries before dead-lettering.
- **Replaying without idempotency** → re-driving causes duplicate side effects (double charges, double emails).
- Dead-lettering **transient** failures too eagerly (downstream just blipped) → good messages land in the DLQ instead of succeeding on retry.
- Losing the **failure reason** → dead messages with no context are hard to diagnose.
