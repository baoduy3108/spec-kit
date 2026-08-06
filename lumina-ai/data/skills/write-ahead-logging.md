---
name: write-ahead-logging
description: How databases survive crashes without losing committed data — the Write-Ahead Log (WAL). Every change is appended to a durable log BEFORE the data pages are updated, so on restart the system replays (redo) committed changes and rolls back (undo) uncommitted ones. Use to understand durability, crash recovery, fsync, checkpoints, and why WAL turns random page writes into fast sequential appends.
category: systems-internals
keywords_vi: ghi log trước khi ghi dữ liệu wal, đảm bảo bền vững sau khi sập máy, redo và undo khi khởi động lại, ghi tuần tự nhanh thay vì ghi ngẫu nhiên, fsync và checkpoint gom log, phục hồi sau sự cố crash recovery
---

# Write-Ahead Logging (WAL)

A database promises **durability**: once it says "committed", that data survives a crash — power loss mid-write, kernel panic, `kill -9`. But writing data pages in place is **random I/O** and can be **interrupted halfway**, leaving corrupt pages. The **Write-Ahead Log** solves both: append a record describing the change to a **sequential log** and `fsync` it to disk **before** touching the actual data pages. The log *is* the source of truth for recovery (see how-databases-work, acid-transactions, fsync-and-durability).

## The Golden Rule

> **Log the intent before you apply it.** No data page may reach disk before the log record describing its change is durable.

Because appends to a single file are **sequential**, they're far faster than scattered in-place page writes — WAL turns slow random writes into fast sequential ones, then applies the real pages lazily in the background.

## What a Log Record Holds

- A **transaction id**, a **sequence number** (LSN — log sequence number, monotonically increasing).
- Enough to **redo** the change (the new value / operation) and often to **undo** it (the old value).
- A **commit record** marks a transaction durable — recovery treats a txn as committed **only if** its commit record is in the log.

## Crash Recovery: Redo + Undo

On restart the system replays the log from the last checkpoint:
1. **Analysis** — scan forward to find which transactions were in flight.
2. **Redo** — reapply every logged change (committed or not) to restore the exact pre-crash state, even changes not yet flushed to data pages.
3. **Undo** — roll back transactions that never committed, using the undo info.

This is roughly the **ARIES** algorithm. The invariant: a committed txn's effects are **guaranteed present**; an uncommitted txn's effects are **guaranteed absent**.

## Checkpoints

The log can't grow forever. A **checkpoint** periodically flushes dirty data pages and records "everything up to LSN X is safely on the data pages", so recovery can start there instead of the beginning — bounding both log size and restart time. Tuning checkpoint frequency trades steady-state I/O against recovery time.

## Where You See It

- **Postgres** WAL, **SQLite** WAL mode, **MySQL/InnoDB** redo log, **etcd/Raft** logs, filesystem **journals** (ext4, NTFS).
- **Replication** often ships the WAL to replicas (log shipping / streaming replication) — the log doubles as the change stream (see how-database-replication-works, how-change-data-capture-works).

## Design Guidance

- **`fsync` is the durability boundary** — a write isn't durable until the log is `fsync`ed. Group-commit batches many txns into one `fsync` for throughput.
- **Sequential log, lazy pages** — accept that data pages lag; the log guarantees they can be reconstructed.
- **Checkpoint to bound recovery** — long gaps between checkpoints mean long restarts.
- **Never truncate the log** past what replicas / checkpoints still need.

## Pitfalls (in understanding/using)

- Thinking "committed" means "data page written" → it means "log record `fsync`ed"; the page may follow later.
- Disabling `fsync` for speed → fast until a crash silently loses committed data.
- Forgetting the log needs its **own** durable, ideally separate, fast device.
- Assuming replay is optional — without redo, unflushed committed changes vanish.
- Confusing the WAL (crash recovery) with the binlog/CDC stream (though they often share a source).
