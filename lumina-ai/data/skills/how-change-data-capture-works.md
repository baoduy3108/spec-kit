---
name: how-change-data-capture-works
description: How Change Data Capture (CDC) works — streaming a database's row-level changes (inserts/updates/deletes) to other systems by tailing the transaction log, versus polling; uses for replication, cache invalidation, search indexing, and event-driven pipelines. Use to understand CDC, Debezium, log-based change streaming, keeping systems in sync, or the outbox pattern.
category: engineering
keywords_vi: change data capture cdc, bắt thay đổi dữ liệu, tail transaction log, debezium, đồng bộ hệ thống, cache invalidation, cập nhật search index, outbox pattern
---

# How Change Data Capture Works

Change Data Capture (CDC) streams **every row-level change** in a database (inserts, updates, deletes) to other systems in near-real-time. It's how you keep a search index, cache, data warehouse, or downstream service in sync with your source database without brittle batch jobs.

## The Problem: Keeping Systems in Sync

Your app writes to its database, but other systems need to know about those changes: update the search index, invalidate a cache, feed the analytics warehouse, trigger downstream workflows. Options:
- **Dual writes** (app writes to DB *and* the other system) — fragile: the two can diverge if one write fails (no atomicity across systems).
- **Polling** — periodically query "what changed since last time?" — adds load, has latency, and misses deletes/intermediate states.
- **CDC** — capture changes at the source reliably and stream them out.

## Log-Based CDC (the good way)

The database already records every change durably in its **transaction log / write-ahead log** (see how-write-ahead-logging-works) for its own recovery and replication. Log-based CDC **tails that log** and emits each committed change as an event. Benefits:
- **Complete & ordered** — captures every insert/update/**delete** in commit order, including changes made by any client.
- **Low overhead** — reads the log the DB writes anyway; no extra queries hammering tables.
- **Low latency** — changes stream out as they commit.
Tools like **Debezium** do exactly this for Postgres (logical replication), MySQL (binlog), MongoDB, etc., publishing changes to Kafka or other streams (see message-queues-and-events, stream-processing).

## What You Do With the Stream

Each change event (table, operation, before/after values) drives:
- **Search indexing** — update Elasticsearch when a row changes.
- **Cache invalidation** — evict/update cache entries on the underlying change (solving stale-cache problems).
- **Replication / warehouse sync** — feed a data warehouse continuously (ELT, see how-data-warehouses-work) instead of nightly batches.
- **Event-driven microservices** — other services react to data changes.
- **Audit logs** — a complete history of changes.

## The Outbox Pattern (a related fix)

To reliably publish events *about* business actions (not just raw row changes) without dual-write inconsistency: write the event to an **outbox table in the same transaction** as the business data (so they commit atomically), then CDC/tail the outbox table to publish. This guarantees the event is emitted **exactly when** the data change commits — solving the dual-write problem.

## Pitfalls (in understanding/using)

- **Polling** instead of log-based CDC — misses deletes/intermediate states, adds DB load, higher latency.
- **Dual writes** to DB and downstream — no atomicity; use the outbox pattern + CDC.
- Downstream consumers must be **idempotent** — events can be redelivered (at-least-once) (see idempotency).
- **Schema changes** in the source can break CDC consumers — manage schema evolution.
- Initial **snapshot + stream** — new consumers need a backfill of existing data before the live stream, done consistently.
- Treating CDC events as ordered *across* tables/shards without care — ordering guarantees are per-partition.
