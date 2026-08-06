---
name: vector-clocks-and-causality
description: How distributed systems track "what happened before what" without synchronized clocks — logical clocks (Lamport) and vector clocks. They capture causality (happens-before) and detect concurrent updates that need conflict resolution, since wall-clock timestamps lie across machines. Use to understand event ordering, causal consistency, conflict detection in replicas, and why last-write-wins by timestamp is dangerous.
category: distributed-systems
keywords_vi: vector clock, đồng hồ logic lamport, quan hệ nhân quả happens-before, phát hiện cập nhật đồng thời concurrent, đồng hồ tường không đáng tin giữa các máy, thứ tự sự kiện và nhất quán nhân quả, nguy hiểm last-write-wins theo timestamp
---

# Vector Clocks & Causality

In one process, "which event happened first?" is obvious — just read the program order. Across many machines it's genuinely hard: **wall clocks disagree** (clock skew, NTP jitter, leap seconds), so you **cannot** order events on different nodes by comparing their timestamps. Yet distributed systems constantly need to know whether update A **caused** B, or whether A and B happened **concurrently** (and thus conflict). **Logical clocks** answer this without synchronized time (see distributed-systems-fundamentals, eventual-consistency, merkle-trees-and-anti-entropy).

## Happens-Before

Lamport defined the **happens-before** relation (→):
- If A and B are in the same process and A comes first, then A → B.
- If A is a **send** and B is the matching **receive**, then A → B.
- Transitive: A → B and B → C ⇒ A → C.

If **neither** A → B nor B → A, the events are **concurrent** — no causal relationship, and in a replicated store they may be **conflicting writes** that need reconciliation.

## Lamport Clocks (scalar)

Each node keeps a counter. Increment on every event; on receiving a message, set the counter to `max(local, received) + 1`. Result: if A → B then `L(A) < L(B)`. Useful for a **total order** (break ties by node id), but the converse fails — `L(A) < L(B)` does **not** prove A → B. So Lamport clocks can't *detect* concurrency, only impose an order.

## Vector Clocks (per-node counters)

A **vector clock** keeps one counter **per node**: `[n1, n2, n3, ...]`. A node increments its own entry on each event; on receiving a message it takes the element-wise `max` then increments its own. Now you can **compare** two vectors:
- A → B if **every** element of A ≤ B and at least one is strictly less.
- **Concurrent** if neither dominates the other (each has some element larger).

This is the key power: vector clocks **detect concurrency** — exactly the case where two replicas made independent, conflicting updates.

## Why Last-Write-Wins by Timestamp Is Dangerous

Many systems resolve conflicts by "keep the write with the latest wall-clock timestamp". But clock skew means the "later" timestamp may belong to the **causally earlier** write — you can silently **discard the newer update**. Vector clocks avoid this by resolving on **causality**, not on untrustworthy time. When they report concurrency, hand the conflict to a real merge (CRDTs, app-level reconciliation, or user choice — see crdts-and-local-first-sync).

## Design Guidance

- **Use vector clocks to detect conflicts**, then merge deliberately — don't blindly LWW by timestamp.
- **Bound vector size** — one entry per writer grows with cluster churn; use dotted version vectors / pruning for large fleets.
- **Lamport clocks suffice** when you only need *a* consistent total order (e.g. tie-breaking), not conflict detection.
- **Prefer causal consistency** where users notice violations (a reply appearing before its message).

## Pitfalls (in understanding/using)

- Ordering cross-machine events by **wall clock** → skew gives wrong order and lost writes.
- Using a **Lamport** clock and assuming `L(A)<L(B)` means A caused B → it doesn't.
- **LWW by timestamp** → silently drops concurrent (and sometimes newer) updates.
- Letting vector clocks **grow unbounded** with every transient node → prune / use dotted versions.
- Treating "concurrent" as an error instead of a signal that a **merge decision** is required.
