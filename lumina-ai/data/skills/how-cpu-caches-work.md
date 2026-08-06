---
name: how-cpu-caches-work
description: How CPU caches work — the L1/L2/L3 hierarchy, cache lines, spatial and temporal locality, hits vs misses, associativity and eviction, cache coherency across cores, and why cache-friendly code can be many times faster. Use to understand CPU caches, cache misses, data locality, false sharing, or writing cache-efficient code.
category: engineering
keywords_vi: cpu cache hoạt động thế nào, bộ nhớ đệm l1 l2 l3, cache line, locality cục bộ, cache hit miss, cache coherency, false sharing, code thân thiện cache
---

# How CPU Caches Work

A CPU cache is a small, very fast memory that sits between the processor and slow main memory (DRAM), holding recently/likely-used data. Because DRAM is hundreds of cycles away, caches are what keep a CPU fed — and understanding them is the difference between fast and slow code doing the same work.

## Why Caches Exist: the Memory Wall

CPUs are far faster than DRAM. A main-memory access costs ~100–300 cycles; a register or L1 hit costs ~1–4. Without caching, the CPU would stall constantly waiting for memory. Caches exploit a statistical fact about real programs: **locality**.

## Locality (the whole basis)

- **Temporal locality** — data used now is likely used again soon (loop counters, hot variables). Keep it cached.
- **Spatial locality** — data near what you just used is likely needed soon (array elements, struct fields). So caches load in **cache lines** (~64 bytes) — touching one byte pulls in its neighbors. Sequential/contiguous access gets many hits per line; scattered access wastes most of each line.

## The Hierarchy

Multiple levels trade size for speed:
- **L1** — tiny (~32–64 KB), fastest, per-core (often split instruction/data).
- **L2** — bigger (~256 KB–1 MB), a bit slower, per-core.
- **L3** — large (several–tens of MB), slower, **shared** across cores.
- then **DRAM**, then storage.
A **hit** at a level is fast; a **miss** falls through to the next, slower level. Minimizing misses is the game.

## Associativity & Eviction

A cache can't hold everything, so it maps addresses to a limited set of slots (**set-associative**) and **evicts** lines (usually approximately LRU) when full. Pathological access patterns (striding by the wrong power of two) can cause **conflict misses** even with plenty of cache. Mostly you don't tune this directly — you just keep data compact and access it in order.

## Cache Coherency (multicore)

Each core caches data; if two cores cache the same line and one writes, the others' copies must be invalidated/updated — **cache coherency** protocols (MESI) handle this in hardware. It's automatic but not free: **false sharing** — two cores writing *different* variables that happen to sit in the *same cache line* — causes the line to bounce between cores, killing performance. Pad/separate hot per-thread data to avoid it.

## Writing Cache-Friendly Code (why it matters)

Same algorithm, very different speed:
- Prefer **contiguous** structures (arrays over linked lists/pointer-chasing) — arrays stream through cache; linked nodes scatter across memory (cache miss per hop).
- **Access in memory order** (row-major loops in the right order; struct-of-arrays for hot fields).
- Keep working sets **small** enough to fit a cache level.
- Avoid **false sharing** in parallel code.
Cache-friendly code is often 2–10× faster than cache-oblivious code with identical big-O.

## Pitfalls (in understanding/using)

- Optimizing big-O but ignoring **constant factors** from cache misses (a "slower" contiguous algorithm can beat a "faster" pointer-chasing one).
- **Linked lists / node-per-object** designs in hot loops → a cache miss per element.
- **False sharing** silently serializing parallel code.
- Random/strided access patterns that touch one byte per cache line (wasting bandwidth).
- Assuming memory is uniform-cost — it's a hierarchy; locality is everything (see how-dram-works).
