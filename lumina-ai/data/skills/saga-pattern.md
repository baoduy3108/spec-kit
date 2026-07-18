---
name: saga-pattern
description: How the saga pattern handles distributed transactions across microservices — a sequence of local transactions with compensating actions to undo on failure, orchestration vs choreography, and eventual consistency instead of a distributed ACID transaction. Use when coordinating a transaction across multiple services/databases, handling partial failures, or understanding sagas vs two-phase commit.
category: engineering
keywords_vi: saga pattern, giao dịch phân tán microservices, chuỗi giao dịch cục bộ, compensating action bù trừ, orchestration vs choreography, eventual consistency, thất bại một phần
---

# The Saga Pattern

A saga manages a **transaction that spans multiple services/databases** — where a single ACID transaction is impossible because each service owns its own database. It's the standard way microservices coordinate a multi-step business process (order → payment → inventory → shipping) that must either fully complete or cleanly undo.

## The Problem

In a monolith with one database, a transaction gives you atomicity (all-or-nothing) for free (see how-database-transactions-work). But in microservices, each service has its **own** database — there's no shared transaction. If "place order" touches Order, Payment, and Inventory services, and Payment succeeds but Inventory fails, you can't just `ROLLBACK` across services. You need another mechanism. (Two-phase commit exists but is slow, blocking, and poorly supported across heterogeneous services — see two-phase-commit.)

## The Saga: Local Transactions + Compensation

A saga breaks the distributed transaction into a **sequence of local transactions**, one per service, each committing to its own database. The key idea: if a later step **fails**, you run **compensating transactions** to **undo** the earlier committed steps — semantically reversing them.
Example: Order created → Payment charged → Inventory reserved → **Shipping fails** → run compensations: release inventory → **refund** payment → cancel order.
There's no rollback; instead each committed step has a matching "undo" action. Compensation is a **business** reversal (refund, cancel, restock), not a database rollback — because the data is already committed and possibly visible.

## Orchestration vs Choreography

Two ways to coordinate the steps:
- **Orchestration** — a central **orchestrator** (saga coordinator) tells each service what to do and, on failure, triggers the compensations in reverse. Explicit, easy to follow and monitor, but the orchestrator is a central piece.
- **Choreography** — no central controller; each service **emits events** and others **react** (see message-queues-and-events, how-change-data-capture-works). Decoupled and scalable, but the flow is emergent and harder to trace/debug (who does what when?).
Orchestration for complex flows you need to reason about; choreography for simple, loosely-coupled ones.

## Eventual Consistency (the trade-off)

A saga gives up **immediate** consistency for **eventual** consistency: there are moments where the system is partially complete (payment charged but not yet shipped) before it converges to a consistent end state (fully done or fully compensated). You must design for these intermediate states (a "pending" order status) and accept that other parts of the system might briefly see them. This is the fundamental cost of distributed transactions without 2PC.

## Pitfalls (in understanding/using)

- **Non-idempotent** steps/compensations — messages retry (at-least-once), so each action and its compensation must be **idempotent** (see idempotency).
- Forgetting some actions **can't be undone** cleanly (an email sent, a real-world action) — design compensations carefully or make such steps last.
- **Compensation failures** — the undo itself can fail; need retries/alerting and sometimes manual intervention.
- Exposing **intermediate inconsistent states** to users/other services without designing for them (use pending/tentative statuses).
- Choosing **choreography** for a complex flow → an untraceable web of events; use orchestration when you need to reason about it.
- Reaching for a **distributed transaction (2PC)** where a saga is more appropriate (or vice versa) — sagas fit long-running business processes.
- Not modeling the saga's state (which step are we on?) durably → can't recover mid-saga after a crash.
