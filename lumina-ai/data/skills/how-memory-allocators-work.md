---
name: how-memory-allocators-work
description: How dynamic memory allocation works — how malloc/free manage the heap with free lists, size classes, and metadata; internal vs external fragmentation; why allocation isn't free; and how garbage collectors (mark-sweep, generational) reclaim memory automatically. Use to understand heap allocation cost, fragmentation, and GC behavior.
category: engineering
keywords_vi: cấp phát bộ nhớ hoạt động thế nào, malloc free, heap allocator, free list, phân mảnh fragmentation, garbage collector mark sweep, quản lý heap, hiểu allocator
---

# How Memory Allocators Work

An allocator hands out chunks of the heap on request (`malloc`) and takes them back (`free`), managing the bookkeeping so programs don't have to.

## The Heap & Free Lists

The heap is a large region the allocator carves up. It tracks which chunks are free using a **free list** (or several, by size). On `malloc(n)`:
- Find a free chunk ≥ n (strategies: first-fit, best-fit, segregated **size classes** — buckets per size, the fast modern approach).
- Split it if larger; record the size in **metadata** (a header before the block) so `free` knows how big it is.
On `free`, mark the chunk free and **coalesce** with adjacent free chunks to rebuild large blocks.

This is why allocation isn't free — it's searching/splitting/bookkeeping — and why allocating many tiny objects on a hot path hurts (pool them or use an arena instead).

## Fragmentation

- **External fragmentation** — free memory exists but is scattered in small pieces, so a large request fails despite enough total free space. Coalescing and size classes fight this.
- **Internal fragmentation** — rounding a request up to a size class wastes the slack inside the block.
Long-running processes with varied allocation patterns can fragment badly — a real cause of creeping memory use.

## Manual vs Garbage Collection

- **Manual** (C/C++) — you `free`; forget → leak, double-free/use-after-free → corruption.
- **Garbage collection** — the runtime finds and frees unreachable objects automatically:
  - **Mark-sweep** — mark everything reachable from roots, sweep (free) the rest.
  - **Generational** — most objects die young, so collect the "young generation" frequently and cheaply, promote survivors to older generations collected rarely. This is why GC is usually cheap but occasionally pauses.
- **Ownership/RAII** (Rust/C++ smart pointers) — deterministic freeing tied to scope, no GC pauses.

## Practical Takeaways

- Allocation has cost; on hot paths, reuse buffers, use object pools/arenas, or preallocate.
- Fragmentation and GC pauses explain memory/latency behavior in long-running services.
- A "leak" in GC languages is unintended reachability (see memory-management) — the allocator can't free what's still referenced.
