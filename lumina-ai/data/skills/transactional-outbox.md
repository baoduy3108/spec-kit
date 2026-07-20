---
name: transactional-outbox
description: The transactional outbox pattern — reliably publishing events after a database change by writing the event to an outbox table in the same transaction, then relaying it to the message broker, avoiding the dual-write problem. Use to reliably publish events with a DB write, avoid lost or phantom events, or implement the outbox pattern.
category: engineering
keywords_vi: transactional outbox, hộp thư đi giao dịch, ghi event vào bảng outbox cùng transaction, tránh dual write, relay sang message broker, đảm bảo không mất event, phát sự kiện tin cậy
---

# The Transactional Outbox Pattern

The transactional outbox solves a deceptively hard problem: **reliably publishing a message/event whenever you commit a database change**. The naive approach — write to the DB, then publish to the broker — has a subtle but serious flaw. The outbox pattern fixes it by making the event part of the **same database transaction** (see message-queues-and-events, event-driven-architecture, idempotency).

## The Problem: The Dual-Write Trap

You want to: (1) save an order to the database, and (2) publish an "OrderCreated" event to a message broker (Kafka, RabbitMQ). These are **two separate systems**, and you can't wrap them in one atomic transaction. So whatever order you do them:
- **DB commit succeeds, then publish fails** (broker down, process crashes) → the order exists but **no event was sent** — downstream services never hear about it (lost event, inconsistent state).
- **Publish succeeds, then DB commit fails** (rollback) → an event went out for an order that **doesn't exist** (phantom event).

This is the **dual-write problem**: two writes to two systems can't be made atomic, so failures leave them inconsistent. You can't reliably keep a database and a message broker in sync with naive dual writes.

## The Core Idea: Write the Event to the DB, Too

The outbox trick: instead of publishing directly, **write the event as a row into an `outbox` table in the *same* database transaction** as the business change.
1. In one atomic DB transaction: save the order **and** insert an "OrderCreated" row into the outbox table. Either **both** commit or **both** roll back — no inconsistency possible.
2. A separate **relay** process reads unpublished outbox rows and publishes them to the broker, marking them sent once acknowledged.

Now the event is durably captured atomically with the data. Even if the relay crashes, the outbox row is still there and will be published when it recovers — **no lost events, no phantom events**.

## Relaying the Outbox

Two common ways to get outbox rows to the broker:
- **Polling publisher** — a background job periodically queries the outbox for unsent rows, publishes them, marks them done. Simple, works anywhere.
- **Change Data Capture (CDC)** — tail the database's transaction log (e.g. Debezium) and stream new outbox rows to the broker. Lower latency, no polling load.

## At-Least-Once → Need Idempotency

The relay guarantees **at-least-once** delivery — it might publish a row **twice** (it published, then crashed before marking it sent, so it republishes on restart). Therefore **consumers must be idempotent** (see idempotency, delivery-semantics): dedupe by the event's unique ID so processing it twice is harmless. This is the standard trade: outbox gives you no-lost-events, idempotency handles the occasional duplicate.

## Design Guidance

- **Same transaction** — the whole point is that the business write and the outbox write commit together atomically.
- **Unique event IDs** — so consumers can dedupe (idempotency).
- **Mark/clean up** sent rows — and prune the outbox table so it doesn't grow forever.
- **Order** — if event ordering matters, preserve it in the relay (per-key ordering).

## Pitfalls (in understanding/using)

- **Dual writes** without an outbox → lost events (DB committed, publish failed) or phantom events (published, DB rolled back).
- Writing the outbox row in a **separate** transaction from the business change → reintroduces the exact inconsistency you were avoiding.
- Consumers **not idempotent** → the at-least-once relay causes duplicate processing.
- Never **pruning** the outbox table → unbounded growth.
- Ignoring **ordering** when it matters → events applied out of sequence.
- Assuming the relay gives **exactly-once** — it's at-least-once; dedupe on the consumer side (see delivery-semantics).
