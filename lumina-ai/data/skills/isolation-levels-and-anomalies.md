---
name: isolation-levels-and-anomalies
description: What the SQL isolation levels actually protect against — the concurrency anomalies (dirty read, non-repeatable read, phantom, lost update, write skew) — and the correctness-vs-performance trade of Read Committed, Repeatable Read, Snapshot, and Serializable. Use to pick an isolation level deliberately, understand why the default (usually Read Committed) allows surprising anomalies, and why "Serializable" isn't automatic.
category: databases
keywords_vi: mức cô lập isolation level và các bất thường đồng thời, đọc bẩn dirty read đọc không lặp lại non-repeatable phantom, mất cập nhật lost update và write skew, read committed repeatable read snapshot serializable, mặc định thường read committed cho phép bất thường bất ngờ, đánh đổi đúng đắn và hiệu năng chọn mức cô lập
---

# Isolation Levels & Anomalies

When transactions run concurrently, they can interfere in subtle ways that produce wrong results even though each transaction is individually correct. **Isolation levels** define **which interferences (anomalies) are allowed**, trading correctness for concurrency/performance. The trap: most databases **default to a weak level** (usually Read Committed) that permits anomalies developers don't expect — so you must choose deliberately (see two-phase-locking-and-deadlocks, mvcc-and-snapshot-isolation, how-database-transactions-work).

## The Anomalies (what can go wrong)

- **Dirty read** — read another transaction's **uncommitted** data that may roll back. You acted on data that never existed.
- **Non-repeatable read** — read a row twice in one transaction and get **different values** because another committed an update in between.
- **Phantom read** — re-run a **range query** and get **different rows** because another transaction inserted/deleted matching rows.
- **Lost update** — two transactions read a value, both modify it, both write; one update **silently overwrites** the other (classic read-modify-write race, e.g. two `balance = balance - 10`).
- **Write skew** — two transactions read an overlapping set, each checks an invariant that holds, and each writes a **different** row, together **breaking** the invariant (the on-call-doctors example). Allowed even by Snapshot Isolation.

## The Levels (weakest → strongest)

- **Read Uncommitted** — allows dirty reads. Rarely useful.
- **Read Committed** — only reads **committed** data (no dirty reads), but each statement sees a fresh snapshot → **non-repeatable reads and phantoms still possible**. The **common default** (Postgres, Oracle, SQL Server). Lost updates possible on naive read-modify-write.
- **Repeatable Read** — a transaction sees a **stable snapshot** of rows it read (no non-repeatable reads). In the SQL standard phantoms may remain; many MVCC engines' RR ≈ **Snapshot Isolation** (prevents phantoms too but allows **write skew**). MySQL/InnoDB default.
- **Snapshot Isolation** — consistent snapshot as of transaction start; prevents dirty/non-repeatable/phantom, and lost updates (first-committer-wins), **but allows write skew** — it is *not* serializable.
- **Serializable** — the result equals **some serial order**; prevents **all** anomalies including write skew. Achieved via strict 2PL or **Serializable Snapshot Isolation (SSI)** (Postgres). Strongest, most blocking/aborts.

## The Key Misconception

"My database has transactions, so I'm safe" is false. At the **default** level, **lost updates and write skew can still corrupt data**. Preventing them requires either a higher level (**Serializable**), explicit locking (`SELECT ... FOR UPDATE`), atomic operations (`UPDATE ... SET x = x - 10`), or optimistic version checks.

## Design Guidance (for understanding/using)

- **Know your database's default** (usually Read Committed) and what it does **not** prevent.
- **For read-modify-write, don't rely on default isolation** — use atomic `UPDATE`, `SELECT FOR UPDATE`, optimistic version columns, or Serializable.
- **Use Serializable for invariants across rows** (balances, scheduling, uniqueness-by-computation) where write skew would corrupt — and handle the extra **serialization-failure retries**.
- **Match level to need** — higher isolation = more blocking/aborts; don't globally crank to Serializable if a targeted lock suffices.
- **Test under concurrency** — anomalies don't appear in single-threaded testing.

## Pitfalls (in understanding/using)

- Assuming "transactions" imply **serializable** → defaults are weaker; anomalies slip through.
- Naive **read-modify-write** at Read Committed → **lost updates**; use atomic updates or locking.
- Believing **Snapshot Isolation** is serializable → it allows **write skew**.
- Cranking everything to **Serializable** without handling **retry on serialization failure** → app errors under load.
- Only testing single-threaded → concurrency anomalies stay hidden until production.
