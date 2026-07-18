---
name: how-garbage-collection-works
description: How automatic memory management (garbage collection) works — reachability from roots, mark-and-sweep, reference counting, generational and tracing collectors, stop-the-world pauses, and why GC exists. Use to understand garbage collection, GC pauses, memory reclamation, or the trade-offs of managed vs manual memory.
category: engineering
keywords_vi: garbage collection hoạt động thế nào, thu gom rác, quản lý bộ nhớ tự động, mark and sweep, reference counting, generational gc, stop the world pause
---

# How Garbage Collection Works

Garbage collection (GC) automatically frees memory the program no longer uses, so you don't manually `free()` (and don't get use-after-free/double-free bugs). It answers one question repeatedly: *which allocated objects can still be reached, and which are garbage?*

## Reachability — the core idea

An object is **live** if it's reachable from a **root** (global variables, the stack, CPU registers) by following references. Everything else is **garbage** and can be reclaimed. GC doesn't detect "unused" — it detects *unreachable*. That's why a reference you forgot to null out (a lingering entry in a cache/list) is a **leak even under GC**: it's still reachable.

## Tracing: Mark-and-Sweep

The classic algorithm:
1. **Mark** — start from roots, traverse all reachable objects, mark them live.
2. **Sweep** — walk the heap; anything unmarked is freed.
**Mark-compact** additionally moves survivors together to defragment memory (faster allocation afterward). Tracing collectors handle **cycles** naturally (A→B→A with no root is unreachable → collected).

## Reference Counting

Each object tracks how many references point to it; when the count hits zero, free it immediately. Simple, prompt, incremental — but **can't collect cycles** by itself (two objects referencing each other keep counts ≥1 forever) and has per-assignment overhead. Python uses refcounting **plus** a cycle detector; Swift uses ARC (refcounting) and asks you to break cycles with `weak` references.

## Generational GC (the key optimization)

**Generational hypothesis:** most objects die young. So split the heap into a **young generation** (collected often, cheaply) and **old generation** (collected rarely). New objects start young; survivors get **promoted**. Most collections only scan the small young gen → fast. This is why modern GCs (JVM, .NET, V8) are generational.

## Pauses & Modern Collectors

Naive GC is **stop-the-world** — the program pauses while collecting, causing latency spikes. Modern collectors (G1, ZGC, Shenandoah) do most work **concurrently** with the program and **incrementally**, shrinking pauses to sub-millisecond at the cost of throughput/complexity. There's an inherent trade-off between **throughput, latency (pause time), and memory footprint** — collectors pick a balance.

## Pitfalls (in understanding/using)

- Thinking GC eliminates leaks — **reachable-but-unused** objects (forgotten cache/listener references) still leak.
- Confusing "unused" with "unreachable" — GC only knows the latter.
- Assuming reference counting handles cycles (it doesn't alone).
- Ignoring GC pauses in latency-sensitive systems (tune the collector, reduce allocation rate).
- Over-allocating short-lived garbage → more GC pressure (pool/reuse in hot paths).
- Fighting the GC with manual `System.gc()` calls (usually counterproductive).
