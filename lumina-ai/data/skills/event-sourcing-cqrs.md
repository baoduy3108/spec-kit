---
name: event-sourcing-cqrs
description: Event sourcing and CQRS — store state as an immutable append-only log of events (replayable to derive current state), separate the write model from read models (projections), and understand the trade-offs (audit/temporal queries vs complexity, eventual consistency, versioning). Use when considering event sourcing/CQRS or designing an audit-heavy, event-driven domain.
category: engineering
keywords_vi: event sourcing, cqrs, lưu trạng thái bằng sự kiện, append-only log sự kiện, projection read model, tách read write, replay sự kiện, audit lịch sử thay đổi
---

# Event Sourcing & CQRS

Two related patterns often used together — powerful for the right problem, over-engineering for the wrong one.

## Event Sourcing

Instead of storing only the **current state** (a row you overwrite), store the **full sequence of events** that led to it, as an immutable, append-only log: `AccountOpened`, `MoneyDeposited(100)`, `MoneyWithdrawn(30)`. Current state is **derived by replaying** the events.

Benefits:
- **Complete audit trail** — you have every change, who and when, for free (regulatory, debugging, "why is this value what it is?").
- **Temporal queries** — reconstruct state at any past point in time ("what was the balance on March 1?").
- **Replay** — rebuild new read models or fix a projection bug by replaying history; derive views you didn't anticipate.
- Events are a natural fit for **event-driven** integration (other services subscribe).

Costs: more complex; you can't just `UPDATE`; querying current state means replaying (mitigated by snapshots); events are forever so **versioning/schema evolution** of events is a real concern; deleting data (GDPR) is hard against an immutable log.

## CQRS (Command Query Responsibility Segregation)

Separate the **write model** (commands that change state, optimized for validation/consistency) from the **read model(s)** (queries, optimized for how you display data). Reads and writes have different shapes and scaling needs, so give them different models — often different datastores.

With event sourcing, **projections** build read models by consuming the event log: each read view (a denormalized table, a search index, a cache) is updated as events arrive. You can have many read models from one event stream.

## Eventual Consistency

Read models are updated **after** the write, so they lag slightly — a command succeeds, but a query might briefly show old data. The system is **eventually consistent**; the UI must tolerate it (optimistic update, "processing…", or read-your-writes tricks). This is the main behavioral change to design around.

## When to Use (and Not)

- **Good fit** — audit/compliance-heavy domains (finance, healthcare, orders), complex domains where history/temporal queries matter, or high read/write asymmetry.
- **Overkill** — simple CRUD apps, small teams, or where a normal database with an audit table suffices. CQRS/ES adds real complexity (eventual consistency, event versioning, more moving parts) — adopt it because the domain demands it, not by default. You can also apply CQRS *without* full event sourcing (just separate read/write models).

## Pitfalls

- Adopting it for simple CRUD → needless complexity.
- Ignoring **event schema evolution** — old events must stay replayable as your code changes (upcasting/versioned events).
- UI/logic not tolerating **eventual consistency** of read models.
- No snapshots → replaying huge histories gets slow.
