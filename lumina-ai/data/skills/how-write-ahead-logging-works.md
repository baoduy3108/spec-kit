---
name: how-write-ahead-logging-works
description: How write-ahead logging (WAL) works — the log-before-apply rule that gives databases atomicity and durability, redo/undo, checkpoints, crash recovery, and how the WAL also enables replication. Use to understand write-ahead logs, database durability, crash recovery, or how commits survive power loss.
category: engineering
keywords_vi: write ahead log hoạt động thế nào, wal, nhật ký ghi trước, durability bền vững, crash recovery phục hồi sau sự cố, redo undo, checkpoint, replication
---

# How Write-Ahead Logging Works

Write-ahead logging (WAL) is the mechanism that lets databases (and filesystems) guarantee **atomicity** and **durability** despite crashes — how a committed transaction survives a power failure that happens a microsecond later. It's the "D" (and much of the "A") in ACID.

## The Core Rule

**Write the intended change to a sequential log — and flush it to durable storage — *before* modifying the actual data pages.** The log record ("change page X from A to B") is written first; the data page can be updated later, lazily, in memory. Hence *write-ahead*.

Why this works: the log is written **sequentially** (fast, even on spinning disks) and is the single source of truth for "what was promised." A commit is durable the instant its log record is `fsync`ed — even if the data files haven't been touched yet.

## Crash Recovery — Redo & Undo

On restart after a crash, the DB reads the log and reconciles:
- **Redo** — re-apply changes of **committed** transactions whose data pages may not have been flushed yet (they're in the log, so replay them). Guarantees durability.
- **Undo** — roll back changes of transactions that were **in-flight** (not committed) at crash time. Guarantees atomicity (no partial transactions).
After recovery, the DB is in a consistent state reflecting exactly the committed transactions.

## Checkpoints

The log can't grow forever, and replaying from the beginning of time would be slow. A **checkpoint** periodically flushes dirty data pages to disk and records a marker, so recovery only needs to replay the log **since the last checkpoint**. Older log segments can then be recycled/archived. Checkpoints trade steady I/O for bounded recovery time.

## Bonus: Replication & More

Because the WAL is a complete, ordered record of every change, it's reused for:
- **Replication** — ship the WAL to replicas that replay it to stay in sync (physical/streaming replication in Postgres, MySQL binlog).
- **Point-in-time recovery** — restore a base backup + replay WAL up to a chosen moment.
- **Change data capture** — tail the log to stream changes to other systems.
The humble log becomes the backbone of durability, HA, and integration.

## Why It Beats Alternatives

Writing data pages directly and hoping is unsafe (a crash mid-write corrupts them). Writing everything twice to fixed locations is slow. Sequential append-then-lazily-apply gives **both** safety and speed — sequential writes are the fastest kind, and the expensive random data-page writes are deferred and batched.

## Pitfalls (in understanding/using)

- Thinking "committed" means "written to the data files" — it means "durably in the log."
- Disabling `fsync`/`synchronous_commit` for speed → silently losing committed data on power loss (know the trade-off).
- Letting the WAL fill the disk (unarchived/unrecycled log) — a real outage cause.
- Ignoring checkpoint tuning — too rare = long recovery; too frequent = I/O spikes.
- Assuming the app layer gets WAL guarantees across services — WAL is per-database (see idempotency for cross-system safety).
