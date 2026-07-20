---
name: memory-models-and-happens-before
description: How memory models work in concurrent programming — why compilers and CPUs reorder memory operations, the happens-before relationship, data races and why they're undefined behavior, and how atomics/memory barriers and synchronization establish ordering. Use to understand memory models, data races, happens-before, why concurrent code needs synchronization, or memory ordering/atomics.
category: engineering
keywords_vi: memory model bộ nhớ đồng thời, vì sao compiler cpu sắp xếp lại lệnh, quan hệ happens-before, data race là undefined behavior, atomics memory barrier, đồng bộ thiết lập thứ tự
---

# Memory Models and Happens-Before

A memory model defines **what a thread is guaranteed to see** of other threads' memory operations — and the answer is far less than intuition suggests, because **compilers and CPUs reorder memory operations** for speed. Understanding this (and the **happens-before** relationship) is what separates correct concurrent code from code that works on your machine and mysteriously breaks elsewhere (see concurrency-and-parallelism, how-cpu-caches-work).

## The Surprise: Operations Get Reordered

You write memory reads/writes in a certain order, but **you have no guarantee they execute in that order** as seen by *other* threads. Two layers reorder:
- **The compiler** reorders/eliminates memory accesses during optimization (see how-compilers-optimize-code) — as long as it preserves **single-threaded** behavior.
- **The CPU** reorders loads/stores and buffers writes in caches (store buffers, out-of-order execution — see how-cpu-caches-work) for performance; a write by one core becomes visible to another core **later**, possibly in a different order.
Within a **single** thread, everything appears in order (the illusion is preserved). But **across** threads, another thread can observe your writes **out of order** or **stale**. This is why naive lock-free code fails.

## Happens-Before: The Ordering Guarantee

The memory model defines ordering through the **happens-before** relation: if operation A **happens-before** B, then A's effects are **guaranteed visible** to B. Key sources of happens-before:
- **Program order** within a single thread.
- **Synchronization** — releasing a lock happens-before acquiring it; writing an atomic (with proper ordering) happens-before reading it; thread `start`/`join`.
If two accesses are **not** ordered by happens-before, there's **no guarantee** about what one thread sees of the other — the value could be old, torn, or reordered. Correct concurrent code works by establishing happens-before edges (via locks/atomics) wherever threads communicate.

## Data Races: Undefined Behavior

A **data race** is: two threads access the **same** memory, at least one **writes**, and there's **no happens-before** ordering between them (no synchronization). In languages like C/C++/Rust/Go/Java, a data race is **undefined behavior** (or at least "no guarantees") — the program may see stale/torn values, or the optimizer, assuming no races, may transform the code into something nonsensical. Crucially: "it worked in my tests" means nothing — races are **timing-dependent** and may only manifest under load, on other hardware, or with a different compiler. **A data race is a bug even if it appears to work.**

## Establishing Order: Atomics and Barriers

To communicate safely between threads you must create happens-before with proper tools:
- **Locks/mutexes** — the simplest: everything before an unlock happens-before everything after the matching lock.
- **Atomic variables with memory ordering** — atomics provide indivisible access **and** ordering guarantees. Common orderings: **sequentially consistent** (strongest, simplest to reason about, default), **acquire/release** (pair a release-store with an acquire-load to establish happens-before — cheaper), **relaxed** (atomicity only, **no** ordering — for counters where order doesn't matter; easy to misuse).
- **Memory barriers/fences** — low-level instructions preventing reordering across them (usually you use atomics/locks rather than raw fences).

## Design Guidance

- **Prefer high-level synchronization** (locks, channels, higher-level concurrency) over hand-rolled lock-free code — it's brutally hard to get right.
- **Any shared mutable data accessed by multiple threads needs synchronization** — no exceptions; unsynchronized = data race = UB.
- **Use atomics** for lock-free counters/flags, with the **correct** memory ordering (default to sequentially consistent unless you deeply understand acquire/release).
- **Don't rely on "it works"** — races are nondeterministic; use race detectors (TSan, Go's `-race`).
- **Immutability / message passing** sidesteps most of this — no shared mutable state, no races.

## Pitfalls (in understanding/using)

- Assuming memory operations are seen by other threads **in program order** → they aren't; reordering is real.
- **Unsynchronized** access to shared mutable data → a data race (UB), even if it seems to work in testing.
- Believing "it passed my tests" makes racy code correct → races are timing/hardware/compiler dependent.
- Using **relaxed** atomics expecting ordering → relaxed gives atomicity only, **no** happens-before.
- Hand-rolling **lock-free** algorithms without deeply understanding the memory model → subtle, catastrophic bugs.
- Forgetting the **compiler** reorders too (not just the CPU) — `volatile` in C/C++ does **not** make things thread-safe (it's not about atomicity/ordering across threads).
- Not using a **race detector** — the cheapest way to catch these before they ship.
