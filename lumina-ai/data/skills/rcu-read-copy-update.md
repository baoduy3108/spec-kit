---
name: rcu-read-copy-update
description: How read-mostly concurrent data structures let readers run with near-zero overhead and never block — Read-Copy-Update (RCU). Readers see a consistent version without locks; writers copy, modify, atomically swap the pointer, then defer freeing the old version until all pre-existing readers finish (grace period). Use to understand RCU, why readers pay nothing, grace periods, and read-mostly design in kernels/databases.
category: systems-internals
keywords_vi: đọc sao chép cập nhật rcu cho dữ liệu đọc nhiều ghi ít, người đọc không khoá và gần như không tốn phí, người ghi sao chép sửa rồi tráo con trỏ nguyên tử, hoãn giải phóng bản cũ tới hết giai đoạn ân hạn grace period, tất cả người đọc cũ đã xong mới thu hồi bộ nhớ, thiết kế read-mostly trong nhân hệ điều hành
---

# RCU (Read-Copy-Update)

Many concurrent structures are **read-mostly**: a routing table, a config map, a list of registered handlers — read millions of times, updated rarely. Locking every read (even a reader-writer lock) adds cache-line contention and coherence traffic that dominates when reads vastly outnumber writes. **RCU** flips the cost: **readers pay almost nothing** (no locks, no atomic writes, no waiting) and the *writer* absorbs all the complexity (see lock-free-and-wait-free-algorithms, false-sharing-and-cache-line-contention, memory-models-and-happens-before).

## The Three Steps (Read, Copy, Update)

To update a node, a writer:
1. **Read** — read the current version.
2. **Copy** — make a private copy and modify *that* (never mutate the live version in place).
3. **Update** — **atomically swap** the pointer so new readers see the new version.

Old readers that grabbed the pointer *before* the swap keep using the **old** version — which is still valid, unmodified memory. New readers see the new version. Both coexist. No reader ever sees a half-updated node.

## The Hard Part: When Can You Free the Old Version?

You can't free the old node while any reader might still be dereferencing it. RCU solves this with a **grace period**: the writer waits until **every reader that existed at swap time has finished** its read-side critical section. Only then is it safe to reclaim the old memory.

- Readers mark critical sections with `rcu_read_lock()`/`rcu_read_unlock()` — extremely cheap (often just disabling preemption or a per-CPU counter; **no atomic, no contention**).
- The writer calls `synchronize_rcu()` (block until grace period ends) or `call_rcu(free)` (defer the free asynchronously).
- The runtime detects a grace period by observing that each CPU has passed through a **quiescent state** (a point where it definitely holds no RCU reference).

## Why Readers Are So Cheap

Readers never write shared state, never take locks, never spin — so there's **no cache-line bouncing** among readers and they **scale linearly** with cores. That's RCU's superpower: read scalability at the cost of deferred, writer-side reclamation and slightly stale reads.

## Where You See It

- **Linux kernel** (its dominant use — dcache, networking, module lists).
- **Userspace RCU** libraries; read-mostly maps in high-performance servers and databases.
- Conceptually similar to **epoch-based reclamation** used in lock-free structures.

## Design Guidance

- **Use RCU only for read-mostly data** — writers are heavier (copy + grace period); write-heavy workloads lose.
- **Readers must not block** inside the critical section, and must re-read the pointer each traversal (don't cache it across sections).
- **Never mutate the published version in place** — always copy-modify-swap.
- **Defer frees** with `call_rcu` to keep writers from stalling on `synchronize_rcu`.
- **Accept staleness** — a reader may briefly use a version that's about to be replaced; fine for most read-mostly cases.

## Pitfalls (in understanding/using)

- Freeing the old version **immediately** after the swap → use-after-free for in-flight readers; you must wait a grace period.
- Mutating the live node instead of copying → readers see torn/half-updated state.
- Using RCU for **write-heavy** data → grace-period and copy costs outweigh read savings.
- Holding an RCU-protected pointer **across** read-unlock → it may be freed under you.
- Expecting strong freshness → RCU gives readers a possibly slightly-stale but always-consistent version.
