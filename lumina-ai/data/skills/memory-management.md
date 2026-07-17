---
name: memory-management
description: Reason about program memory — stack vs heap, allocation, garbage collection vs manual/ownership models, memory leaks and how they happen even in GC languages, references/pointers, and diagnosing leaks and out-of-memory. Use when debugging a leak, high memory use, or reasoning about performance/lifetime of data.
category: engineering
keywords_vi: quản lý bộ nhớ, memory leak, rò rỉ bộ nhớ, stack heap, garbage collection, out of memory, con trỏ tham chiếu, ứng dụng tốn ram
---

# Memory Management

Understanding where data lives and how long it lives explains a large class of performance and stability bugs.

## Stack vs Heap

- **Stack** — automatic, LIFO, per-call-frame; local variables and call bookkeeping. Fast (just moves a pointer), freed automatically on return. Fixed/known size; deep recursion overflows it.
- **Heap** — dynamically allocated, lives until freed/collected; for data whose size or lifetime isn't known at compile time or that outlives its creating function. Slower to allocate, and the source of leaks and fragmentation.

## How Memory Is Reclaimed

- **Garbage collection** (Java, JS, Python, Go) — the runtime frees objects no longer reachable from roots. Convenient, but not free: GC pauses, and **you can still leak** by keeping references you don't need.
- **Manual** (C/C++) — you `malloc`/`free`; forgetting to free leaks, freeing twice or using-after-free corrupts. Powerful and dangerous.
- **Ownership/RAII** (Rust, C++ smart pointers) — deterministic freeing tied to scope/ownership, no GC and (mostly) no leaks; the compiler enforces lifetimes.

## Leaks Happen in GC Languages Too

A "leak" in a GC language is **unintentional retention** — an object stays reachable so it's never collected. Common causes:
- Growing collections never cleared (a cache/list/map that only ever adds — an unbounded cache is the classic).
- **Event listeners / subscriptions / timers** not removed — they hold references to their targets.
- **Closures** capturing large objects and outliving them.
- Global/static references pinning objects for the process lifetime.
The symptom is memory that climbs over time and never comes back down.

## Diagnosing

- **Rising memory over time** → a leak/unbounded growth: take **heap snapshots** at intervals and diff them to see which object types keep growing and what's retaining them (retention path).
- **Out-of-memory crash** → either a genuine leak or a single operation loading too much at once (read a huge file/query fully into memory) — stream/paginate instead.
- Profile allocations to find churn (lots of short-lived objects → GC pressure); reuse buffers/objects on hot paths.
- Bound every cache (size or TTL), unsubscribe/clear on teardown, avoid holding references longer than needed, and don't load unbounded data into memory — stream it.
