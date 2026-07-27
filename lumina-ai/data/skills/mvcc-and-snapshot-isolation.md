---
name: mvcc-and-snapshot-isolation
description: How databases let many readers and writers work concurrently without blocking each other — Multi-Version Concurrency Control (MVCC). Instead of locking rows for reads, the DB keeps multiple versions of each row and gives each transaction a consistent snapshot as of its start. Use to understand snapshot isolation, readers-don't-block-writers, write skew, and why "vacuum"/version cleanup exists.
category: systems-internals
keywords_vi: nhiều phiên bản dữ liệu mvcc, cô lập ảnh chụp snapshot isolation, đọc không chặn ghi và ghi không chặn đọc, giao dịch nhìn ảnh nhất quán tại thời điểm bắt đầu, write skew và bất thường tuần tự, dọn phiên bản cũ vacuum
---

# MVCC & Snapshot Isolation

Old databases made readers and writers fight over **locks**: a reader held a lock so a writer waited, and vice versa — throughput collapsed under contention. **Multi-Version Concurrency Control (MVCC)** removes that fight: the database keeps **several versions of each row**, and each transaction reads a **consistent snapshot** of the data as it existed when the transaction began. So **readers never block writers, and writers never block readers** (see acid-transactions, transaction-isolation-levels, how-databases-work).

## The Core Idea

Every row version carries metadata: which transaction **created** it and which transaction **deleted/superseded** it (via transaction ids or timestamps). A transaction sees a row version if it was committed **before** the transaction's snapshot and not yet deleted as of that snapshot. Updates don't overwrite in place — they write a **new version** and mark the old one obsolete.

## Snapshot Isolation

Under **snapshot isolation (SI)**, a transaction behaves as if it took a photograph of the entire database at its start:
- All its reads come from that consistent snapshot — no non-repeatable reads, no dirty reads.
- Its writes are invisible to others until it commits.
- On commit, the DB checks for **write-write conflicts**: if two transactions modified the same row concurrently, one is aborted ("first committer wins" / serialization failure).

SI is cheap and gives most of what apps want — but it is **not** full serializability.

## Write Skew — the classic SI anomaly

Two transactions each read an overlapping set, each checks an invariant, and each writes a **different** row. Individually valid, together they break the invariant. Classic example: two on-call doctors each check "at least one other is on duty" (true), each takes themselves off — now **zero** on duty. No write-write conflict occurred, so SI allows it. Fixes: **Serializable Snapshot Isolation (SSI)** (Postgres `SERIALIZABLE`), explicit locking (`SELECT ... FOR UPDATE`), or materializing the conflict.

## Version Cleanup (Vacuum / GC)

Old versions accumulate as garbage once no live snapshot can see them. The DB must **reclaim** them: Postgres `VACUUM`, others have background GC. Neglect it and you get **bloat** — wasted space, slower scans, and (in Postgres) transaction-id wraparound risk.

## Design Guidance

- **Use SI/read-committed for most workloads** — huge concurrency win over lock-based reads.
- **Know it's not serializable** — if correctness depends on cross-row invariants, use `SERIALIZABLE` or explicit locks; don't assume SI prevents write skew.
- **Keep transactions short** — long-running readers hold old snapshots alive, blocking version cleanup and causing bloat.
- **Tune/monitor vacuum** — bloat is the silent MVCC tax.

## Pitfalls (in understanding/using)

- Assuming snapshot isolation == serializable → **write skew** slips through.
- Long-open transactions → they pin old versions, starve GC, bloat storage.
- Expecting reads to see others' **uncommitted** writes → snapshots only show committed-before-start data.
- Forgetting cleanup exists → unbounded bloat and degrading performance.
- Reusing a snapshot's stale reads to make a decision that another txn already invalidated.
