---
name: false-sharing-and-cache-line-contention
description: Why two threads writing to different, unrelated variables can still cripple performance — false sharing, where independent data shares one CPU cache line and the cache-coherence protocol ping-pongs it between cores. Use to understand cache lines, MESI invalidation, padding/alignment fixes, per-core sharding, and why a "lock-free" counter can still be slow.
category: systems-internals
keywords_vi: false sharing hai biến chung một cache line, giao thức nhất quán cache mesi, ping-pong giữa nhân, padding căn chỉnh tách cache line, per-core sharding, tranh chấp dòng cache contention
---

# False Sharing & Cache-Line Contention

You wrote lock-free code, gave each thread its **own** variable, and it *still* got slower with more cores. The culprit is almost always **false sharing**: the CPU moves memory in **cache lines** (typically **64 bytes**), not individual variables. If two threads on different cores write to two *different* variables that happen to sit in the **same cache line**, the cache-coherence protocol treats every write as a conflict and **bounces the line between cores** — even though the variables are logically independent (see how-cpu-caches-work, lock-free-and-wait-free-algorithms, memory-models-and-happens-before).

## Why It Happens: Cache Coherence

CPUs keep caches consistent with a protocol like **MESI** (Modified/Exclusive/Shared/Invalid). To *write*, a core must own the line in **Modified** state, which **invalidates** every other core's copy. So:
1. Core A writes variable X (in line L) → A owns L, invalidates B's copy.
2. Core B writes variable Y (also in line L) → B must fetch L from A, invalidate A's copy.
3. Core A writes X again → fetch L back from B…

The line **ping-pongs** across the interconnect on every write. The variables never actually share data — hence "**false**" sharing — but the hardware can't tell, so you pay full coherence cost. Throughput can drop by an order of magnitude and *worsen* as you add cores.

## Classic Triggers

- **Adjacent counters/flags** — an array of per-thread counters packed tightly (`counts[thread_id]`), several per line.
- **Hot fields next to each other** in a struct written by different threads (e.g. a queue's `head` and `tail`).
- **Lock + protected data** on the same line as an unrelated hot field.

## Fixes

- **Pad and align to a cache line** — put each hot per-thread variable on its **own** 64-byte line (padding, `alignas(64)`, `@Contended`, `#[repr(align(64))]`, `crossbeam::CachePadded`).
- **Separate read-mostly from write-hot** fields into different lines.
- **Per-core / per-thread sharding** with padded slots, aggregate only when reading.
- **Split hot struct fields** (e.g. keep a queue's producer and consumer indices far apart).

## Design Guidance

- **Suspect false sharing** when scaling is *negative* (more cores → slower) on write-heavy shared arrays/structs.
- **Confirm with a profiler** — `perf c2c`, VTune, or coherence-miss counters show line-bouncing directly; don't guess.
- **Pad only the hot spots** — padding everything wastes cache and hurts locality; target the contended lines.
- **Prefer aggregation** — write to per-core state, sum on read, instead of hammering one shared counter.

## Pitfalls (in understanding/using)

- Assuming "different variables ⇒ no contention" → same **line** = contention.
- Packing per-thread counters tightly for "memory efficiency" → false sharing tanks throughput.
- Padding *everything* → cache bloat and worse spatial locality; pad surgically.
- Blaming the lock/algorithm when the real cost is coherence traffic on one line.
- Forgetting that **read-only** sharing is fine — only concurrent **writes** cause the ping-pong.
