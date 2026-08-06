---
name: two-phase-commit
description: How two-phase commit (2PC) achieves atomicity across multiple databases/services — the prepare and commit phases coordinated by a transaction manager, why it's blocking and vulnerable to coordinator failure, and when to use it vs sagas. Use to understand distributed transactions, 2PC, atomic commit across systems, or why 2PC is avoided in microservices.
category: engineering
keywords_vi: two-phase commit, 2pc, giao dịch phân tán nguyên tử, prepare commit, transaction coordinator, blocking chặn khóa, coordinator failure, 2pc vs saga
---

# Two-Phase Commit (2PC)

Two-phase commit is a protocol for making a transaction **atomic across multiple databases/systems** — all commit or all abort, even though each has its own separate storage. It provides strong consistency, but its blocking nature and failure modes are why microservices often prefer sagas (see saga-pattern) instead.

## The Problem

You want to update several independent systems (two databases, a DB and a message queue) as **one atomic unit** — all succeed or all fail, with no partial state. Each system can commit its own local transaction, but how do you guarantee they all agree? 2PC coordinates them through a **transaction coordinator**.

## The Two Phases

A **coordinator** drives all the **participants** (the resource managers) through two phases:

**Phase 1 — Prepare (voting):**
- The coordinator asks every participant: "Can you commit this?"
- Each participant does the work, writes it durably to a state where it *could* commit, locks the affected data, and **votes** "yes" (prepared) or "no" (abort). A "yes" is a **promise** — it must be able to commit if asked, even after a crash.

**Phase 2 — Commit (or abort):**
- If **all** voted yes → the coordinator tells everyone to **commit**; they finalize and release locks.
- If **any** voted no (or timed out) → the coordinator tells everyone to **abort**; they roll back.
Because every participant promised in phase 1, the coordinator's phase-2 decision is guaranteed to be honorable by all → atomicity across systems.

## The Fatal Weaknesses

2PC gives strong atomicity but at a real cost:
- **Blocking** — participants **hold locks** on their data from the moment they vote "yes" until they receive the phase-2 decision. If the coordinator is slow or crashes, participants are **stuck holding locks**, blocking other work — potentially indefinitely. This kills throughput and availability.
- **Coordinator is a single point of failure** — if it dies after prepare but before deciding, participants are left "in doubt," holding locks, unable to safely commit or abort on their own. Recovery is complex.
- **Latency** — two round trips to every participant, synchronous, slow.
- **Poor fit for heterogeneous/loosely-coupled services** — needs all participants to support the protocol (XA), which many modern services/queues don't well.

## When to Use It (and Not)

- **Use 2PC** — within a controlled environment where strong atomic consistency across a few resources is essential and they support it (e.g. distributed databases, XA transactions across DB + JMS). Short-lived, low-contention.
- **Prefer sagas** — for microservices and long-running business processes: sagas trade immediate consistency for **availability and no distributed locks**, using compensations and eventual consistency (see saga-pattern). This is the modern default for cross-service workflows.

## Pitfalls (in understanding/using)

- Using 2PC in **microservices** for long or high-throughput flows → blocking locks and coordinator fragility cripple you; use sagas.
- Underestimating the **coordinator failure** problem — in-doubt participants holding locks is a real outage mode.
- Assuming all systems **support** 2PC/XA — many databases and message brokers don't cleanly.
- Ignoring the **latency and lock-holding** cost under contention.
- Thinking 2PC gives the same **isolation** guarantees as a single-DB transaction across systems — its guarantees are narrower and costlier.
- Reaching for distributed transactions at all when the operation could be redesigned to avoid needing cross-system atomicity (often the best fix).
