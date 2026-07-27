---
name: two-phase-locking-and-deadlocks
description: How lock-based databases guarantee serializable transactions — Two-Phase Locking (2PL) — and the deadlocks it inevitably creates. Covers growing/shrinking lock phases, shared vs exclusive locks, why strict 2PL holds locks until commit, deadlock detection (wait-for graph) vs prevention, and lock escalation. Use to understand blocking, deadlock victims, lock granularity, and how 2PL differs from MVCC.
category: databases
keywords_vi: khoá hai pha two-phase locking 2pl đảm bảo giao dịch tuần tự hoá, pha tăng lấy khoá và pha giảm nhả khoá, khoá chia sẻ shared và độc quyền exclusive, strict 2pl giữ khoá tới khi commit, bế tắc deadlock và phát hiện bằng đồ thị chờ wait-for, chọn nạn nhân deadlock victim và leo thang khoá lock escalation
---

# Two-Phase Locking & Deadlocks

To let many transactions run concurrently *and* preserve **serializability** (the result equals some serial order), lock-based databases use **Two-Phase Locking (2PL)**. It's the classic pessimistic concurrency-control protocol, and its unavoidable side effect is **deadlock**. Understanding 2PL explains blocking, "deadlock detected: transaction aborted" errors, and how lock-based systems differ from MVCC ones (see mvcc-and-snapshot-isolation, isolation-levels-and-anomalies, how-database-transactions-work).

## The Two Phases

A transaction takes locks on the data it touches (**shared/read (S)** locks for reads, **exclusive/write (X)** locks for writes; S-locks are compatible with each other, X-locks conflict with everything). The rule that makes it correct:
- **Growing phase** — the transaction may **acquire** locks but must **not release** any.
- **Shrinking phase** — once it releases its **first** lock, it may **not acquire** any more.

This "all acquisitions before any release" ordering guarantees a **serializable** schedule. In practice databases use **Strict 2PL (S2PL)**: hold **all** locks until the transaction **commits/aborts**, then release together. Strictness also prevents **cascading aborts** (no one reads uncommitted data that later rolls back).

## Deadlocks Are Inevitable

Because transactions acquire multiple locks in whatever order their logic dictates, two can wait on each other forever:
- T1 holds lock on **A**, wants **B**; T2 holds **B**, wants **A**. Neither can proceed. **Deadlock.**

You can't fully avoid this with 2PL, so systems handle it one of two ways:
- **Detection (most common)** — maintain a **wait-for graph** (edge T1→T2 if T1 waits for a lock T2 holds); periodically look for a **cycle**; if found, pick a **victim** transaction and **abort** it (rolling it back) to break the cycle. The victim retries. This is what "deadlock detected, transaction rolled back" means — expected, not a corruption.
- **Prevention** — order locks or use timestamp schemes (wait-die / wound-wait) so a cycle can never form; or **timeouts** (abort a transaction that waits too long — simple but blunt).

## Lock Granularity and Escalation

Locks can be at **row**, **page**, or **table** level. Fine-grained (row) locks maximize concurrency but cost memory/bookkeeping; coarse (table) locks are cheap but serialize everyone. **Lock escalation** converts many fine locks into one coarse lock when a transaction holds too many — reducing overhead but **cutting concurrency** (and sometimes causing surprise blocking).

## 2PL vs MVCC

2PL makes **readers block writers and writers block readers** (shared/exclusive conflicts). **MVCC** (snapshot isolation) avoids most read-write blocking by versioning — readers see a snapshot, writers create new versions. Many databases combine them (MVCC for reads, locks for writes). Knowing which model your DB uses explains its blocking behavior.

## Design Guidance (for understanding/using)

- **Expect and handle deadlocks** — wrap transactions in **retry-on-deadlock** logic; a deadlock abort is normal under contention.
- **Acquire locks in a consistent order** across your code paths — the simplest way to *prevent* many deadlocks.
- **Keep transactions short** — long transactions hold locks longer (strict 2PL), increasing blocking and deadlock odds.
- **Mind lock granularity/escalation** — updating many rows can escalate to a table lock and stall others.
- **Know your engine's model** — pure 2PL blocks readers vs writers; MVCC engines behave very differently.

## Pitfalls (in understanding/using)

- Treating a **deadlock abort** as a bug/corruption → it's the DB correctly breaking a cycle; **retry** the transaction.
- Acquiring locks in **inconsistent orders** across code → self-inflicted deadlocks.
- **Long-running** transactions under strict 2PL → hold locks to commit, causing widespread blocking.
- Bulk updates triggering **lock escalation** → sudden table-level blocking of unrelated queries.
- Assuming all databases block like 2PL → MVCC engines don't block readers the same way; don't reason from the wrong model.
