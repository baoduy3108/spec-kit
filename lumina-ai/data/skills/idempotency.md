---
name: idempotency
description: Make operations safe to repeat — idempotency keys for POST/payment APIs, natural idempotency (PUT, upserts, set operations), deduplication, and why at-least-once delivery and client retries make it mandatory. Use when designing APIs, payments, or message consumers that must not double-apply on retry.
category: engineering
keywords_vi: idempotency, idempotent, thao tác lặp lại an toàn, idempotency key, tránh xử lý trùng, retry không double, thanh toán hai lần, dedup
---

# Idempotency

An operation is **idempotent** if doing it twice has the same effect as doing it once. This is essential wherever retries or duplicate messages happen — which is almost everywhere in distributed systems.

## Why You Can't Avoid It

Networks are unreliable: a client sends a request, the server processes it, but the **response is lost** — the client can't tell if it succeeded, so it retries. Queues deliver **at-least-once** (duplicates on redelivery). Webhooks retry. Without idempotency, the retry double-charges the card, sends two emails, or creates two orders. Idempotency turns "did it happen?" ambiguity into a safe retry.

## HTTP Methods

- **GET, PUT, DELETE** are idempotent by definition (GET reads; PUT sets to a value; DELETE removes — repeat = same state).
- **POST is not** — it creates something new each time. This is exactly where you must add protection.

## Idempotency Keys (for POST / payments)

The client generates a unique **idempotency key** per logical operation and sends it (header) with the request, retrying with the **same key**. The server:
1. On first sight of the key, process the operation and **store the key + the result**.
2. On a repeat of that key, **skip processing and return the stored result**.
This makes "create charge / place order" safe to retry. Store keys with a TTL; make the check-and-store atomic to avoid a race where two concurrent requests with the same key both process.

## Natural Idempotency (design it away)

Better than dedup logic: design operations to be inherently idempotent.
- **Upsert** instead of insert ("set user 42's email to X" repeats harmlessly; "insert a new email row" doesn't).
- **Set/assign** instead of increment ("set status = paid" is idempotent; "add $10" is not — unless keyed).
- Use the client-provided id as the primary key so a duplicate create hits a uniqueness constraint instead of making a second row.

## Message Consumers

Since queues are at-least-once, consumers **must** dedupe: record processed message ids and skip repeats, or make the effect idempotent. Never assume a message arrives exactly once.

## Pitfalls

- Treating POST as safe to retry with no key → duplicates.
- **Race conditions** — two concurrent requests with the same key both processing (make check-and-record atomic / use a unique constraint).
- Storing the idempotency result too briefly (retry after TTL reprocesses) or forever (unbounded storage).
- Making the *check* idempotent but the *side effect* (email/charge) still firing twice — the whole operation must be covered.
