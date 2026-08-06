---
name: how-database-transactions-work
description: How database transactions work — ACID properties, isolation levels (read committed, repeatable read, serializable) and the anomalies they prevent (dirty/non-repeatable reads, phantoms), locking vs MVCC, and how atomicity/durability are achieved. Use to understand transactions, ACID, isolation levels, concurrency anomalies, or MVCC.
category: engineering
keywords_vi: database transaction hoạt động thế nào, giao dịch cơ sở dữ liệu, acid, isolation level, mvcc, dirty read phantom, khóa lock, atomicity durability
---

# How Database Transactions Work

A transaction groups multiple operations so they behave as one indivisible unit — either all succeed or none do — even under concurrency and crashes. This is what lets a bank transfer never lose or duplicate money. The guarantees are summarized as **ACID**.

## ACID

- **Atomicity** — all-or-nothing. A transaction commits fully or rolls back entirely; a crash mid-way leaves no partial effect. Achieved via a **write-ahead log** (see how-write-ahead-logging-works) / undo log.
- **Consistency** — the transaction moves the DB from one valid state to another (constraints, foreign keys hold). (Your app logic's responsibility too.)
- **Isolation** — concurrent transactions don't corrupt each other; the result is *as if* they ran in some serial order (to a degree set by the isolation level).
- **Durability** — once committed, it survives crashes (flushed to stable storage / the log is `fsync`ed).

## Isolation Levels & Anomalies

Full isolation is expensive, so SQL defines **levels** trading isolation for concurrency. Each prevents more **anomalies**:
- **Read Uncommitted** — allows **dirty reads** (seeing another transaction's uncommitted, maybe-rolled-back data). Rarely used.
- **Read Committed** (common default) — you only see committed data; but **non-repeatable reads** possible (re-reading a row gives a new value if another txn committed between).
- **Repeatable Read** — re-reading a row is stable; but **phantoms** possible (a range query returns new rows on re-run).
- **Serializable** — behaves as if transactions ran one-at-a-time; prevents all anomalies. Strongest, most contention.
Pick the weakest level that's correct for your logic — higher levels cost concurrency. Know your DB's *actual* default and semantics (they vary).

## How Isolation Is Implemented

- **Locking (2-phase locking)** — acquire locks (shared for reads, exclusive for writes), release at commit. Correct but readers and writers block each other → contention, and risk **deadlock** (two txns each holding a lock the other wants — the DB detects and aborts one).
- **MVCC (Multi-Version Concurrency Control)** — the modern approach (Postgres, Oracle, MySQL InnoDB). Keep **multiple versions** of rows; each transaction reads a **consistent snapshot** as of its start. **Readers don't block writers and vice versa** — huge concurrency win. Write conflicts are detected at commit. This is why Postgres reads scale so well.

## Atomicity & Durability Mechanics

The **write-ahead log (WAL)** records changes *before* applying them. On commit, the log record is durably flushed (`fsync`) — that's the durability point. On crash, recovery **replays** committed transactions (redo) and **undoes** uncommitted ones. Atomicity + durability fall out of the log.

## Pitfalls (in understanding/using)

- Assuming the default isolation is Serializable — it's usually **Read Committed** (weaker); code accordingly.
- **Long-running transactions** — hold locks/old MVCC versions, causing bloat and contention; keep them short.
- **Deadlocks** — order lock acquisition consistently; retry aborted transactions.
- **Lost updates** — read-modify-write without proper isolation/locking (`SELECT ... FOR UPDATE` or optimistic version checks).
- Thinking a transaction protects across separate service calls / external systems — it only covers the DB (see idempotency, sagas for distributed cases).
- Forgetting that "committed" means durably logged, not necessarily written to the data files yet.
