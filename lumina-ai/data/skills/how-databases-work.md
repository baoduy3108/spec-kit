---
name: how-databases-work
description: How a relational database works internally — storage pages and the buffer pool, B-tree vs LSM-tree indexes, the write-ahead log (WAL) for durability, how a query goes from SQL to execution plan, transactions/ACID and MVCC for isolation, and why these explain performance and locking behavior. Use to reason deeply about database performance, durability, and concurrency.
category: engineering
keywords_vi: database hoạt động thế nào, cơ chế database bên trong, b-tree lsm, write-ahead log wal, mvcc, buffer pool, query execution, hiểu database sâu
---

# How Databases Work Internally

Understanding the engine explains why indexes help, why transactions cost, and why some queries lock.

## Storage & Buffer Pool

Data lives on disk in fixed-size **pages**. The **buffer pool** caches hot pages in memory; reads/writes go through it, and dirty pages are flushed later. Disk I/O dominates cost, so the whole design minimizes and sequences it. This is why a working set that fits in RAM is fast and one that doesn't thrashes.

## Indexes: B-tree vs LSM

- **B-tree** (most SQL DBs) — a balanced tree kept sorted by key; `O(log n)` lookups and range scans; updated in place. Great for reads and range queries; random writes cause page splits.
- **LSM-tree** (Cassandra, RocksDB) — buffers writes in memory (memtable), flushes sorted runs (SSTables) to disk, compacts them in the background. Fast writes, reads may check several levels. Chosen for write-heavy workloads.
This is why "which index/engine" is really "read-heavy vs write-heavy."

## Durability: Write-Ahead Log

Before changing a data page, the DB appends the change to a **WAL** (sequential, fast). On crash, it replays the log to recover committed transactions and roll back incomplete ones. This gives durability without flushing every random page synchronously — the sequential log is the trick behind ACID's "D."

## SQL → Execution

A query is **parsed** → **planned/optimized** (the planner uses table statistics and cost estimates to choose join order, join algorithm, and which indexes to use) → **executed** (operators pull rows: scans, joins, sorts, aggregates). This is exactly what `EXPLAIN` shows — and why stale statistics produce bad plans.

## Transactions, ACID & Isolation

**ACID** = Atomicity (all-or-nothing, via undo/WAL), Consistency, Isolation, Durability. Concurrency is managed by locks and/or **MVCC** (multi-version concurrency control): each transaction sees a consistent snapshot; writers create new row versions instead of blocking readers. Isolation levels (read-committed, repeatable-read, serializable) trade off anomalies (dirty/non-repeatable/phantom reads) against concurrency. Deadlocks arise when transactions lock resources in conflicting orders — the DB detects and aborts one.
