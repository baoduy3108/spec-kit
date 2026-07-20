---
name: delivery-semantics
description: Message delivery semantics — at-most-once, at-least-once, and exactly-once, why true exactly-once delivery is impossible but effectively-once is achievable via idempotency and deduplication, and how to choose. Use to reason about at-least-once vs exactly-once, understand why messages get duplicated, or design reliable message processing.
category: engineering
keywords_vi: delivery semantics, ngữ nghĩa phân phối tin nhắn, at-most-once at-least-once exactly-once, exactly once bất khả thi, effectively once nhờ idempotency dedup, tại sao tin nhắn bị lặp
---

# Message Delivery Semantics

Delivery semantics describe the **reliability guarantee** of a messaging system — how many times a message might be delivered when failures happen. Understanding the three levels (and why "exactly-once" is more subtle than it sounds) is fundamental to building correct distributed systems (see message-queues-and-events, transactional-outbox, idempotency).

## The Three Guarantees

- **At-most-once** — each message is delivered **zero or one** times. The sender fires and forgets; if delivery fails, the message is **lost**. Simple and fast, but **may lose data**. Fine for tolerable-loss data (metrics samples, best-effort notifications).
- **At-least-once** — each message is delivered **one or more** times. The system **retries until acknowledged**, so nothing is lost — but a lost/late ack causes a **duplicate**. This is the most common and practical guarantee. Trade-off: **no loss, possible duplicates**.
- **Exactly-once** — each message affects the system **once and only once**. The holy grail — no loss, no duplicates.

## Why "Exactly-Once Delivery" Is Impossible

Here's the key insight most people miss: **exactly-once *delivery* over an unreliable network is provably impossible**. Consider: a sender delivers a message and waits for an ack. If the ack is lost, the sender can't tell whether the **message** failed (must resend → risk duplicate) or the **ack** failed (already delivered → resending duplicates). It **cannot** distinguish these, so it must choose: resend (at-least-once, risk duplicate) or don't (at-most-once, risk loss). No protocol escapes this fundamental uncertainty.

## Effectively-Once: The Achievable Goal

What people *mean* by "exactly-once" is achievable — not exactly-once **delivery**, but exactly-once **processing** (a.k.a. "effectively-once"): deliver at-least-once, then make **processing idempotent** so duplicates have **no additional effect**. The recipe:
- **At-least-once delivery** (retry until acked — never lose the message).
- **+ Deduplication / idempotency** on the consumer — attach a **unique message ID**; the consumer tracks processed IDs (or uses idempotency keys / an upsert / conditional write) so processing the same message twice is a **no-op** (see idempotency).

The result: from the outside, each message affects the system exactly once. Systems that advertise "exactly-once" (e.g. Kafka's exactly-once semantics) work this way — at-least-once plus dedup/transactional guarantees within their boundary, not magic delivery.

## Choosing

- **At-most-once** — when occasional loss is acceptable and you want minimal overhead (telemetry, non-critical events).
- **At-least-once + idempotent consumers** — the **default** for anything that matters (orders, payments, state changes). Accept duplicates at the transport, neutralize them in processing.
- Don't chase "true exactly-once delivery" — design for **effectively-once** instead.

## Design Guidance

- **Assume duplicates.** With at-least-once (the practical default), duplicates *will* happen; make every consumer idempotent (see idempotency).
- **Carry a unique ID** on each message for dedup.
- **Idempotent operations** — upserts, conditional writes, and dedup tables turn at-least-once into effectively-once.
- **Match the guarantee to the data's importance** — don't pay for at-least-once on throwaway metrics; don't use at-most-once for payments.

## Pitfalls (in understanding/using)

- Believing a system gives **true exactly-once delivery** — it's impossible; what's real is at-least-once + idempotency (effectively-once).
- Using **at-least-once** but **non-idempotent** consumers → duplicate side effects (double charges, double emails) when a message is redelivered.
- Using **at-most-once** for data you can't afford to lose.
- No **unique message ID** → can't dedupe, so you can't reach effectively-once.
- Assuming a duplicate is a bug to eliminate at the transport — it's inherent; **neutralize** it in processing instead.
- Confusing exactly-once **delivery** (impossible) with exactly-once **processing/effect** (achievable via idempotency).
