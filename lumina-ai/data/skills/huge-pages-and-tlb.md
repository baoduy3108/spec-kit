---
name: huge-pages-and-tlb
description: Why big-memory programs stall on address translation and how huge pages fix it — the TLB (Translation Lookaside Buffer) caches virtual→physical page mappings, and standard 4KB pages mean huge working sets overflow the TLB, causing costly page-walk misses. Huge pages (2MB/1GB) cover far more memory per TLB entry. Use to understand TLB misses, page-table walks, transparent vs explicit huge pages, and their trade-offs.
category: systems-internals
keywords_vi: trang lớn huge page và bộ đệm dịch địa chỉ tlb, tlb cache ánh xạ địa chỉ ảo sang vật lý, trang 4kb khiến tập làm việc lớn tràn tlb gây miss, đi bộ bảng trang page walk tốn kém khi tlb miss, trang lớn 2mb 1gb phủ nhiều bộ nhớ hơn mỗi mục tlb, transparent huge page thp so với cấp phát tường minh
---

# Huge Pages & the TLB

Every memory access your program makes uses a **virtual address** that the CPU must translate to a **physical address**. Doing that translation by walking the page tables in RAM on every access would be ruinously slow, so the CPU caches recent translations in the **TLB (Translation Lookaside Buffer)** — a small, very fast cache of virtual→physical page mappings. When a program's memory footprint is large, the TLB becomes a hidden bottleneck, and **huge pages** are the fix (see how-virtual-memory-works, how-cpu-caches-work, numa-and-memory-locality).

## The TLB and Why It Misses

The TLB is small — on the order of **hundreds to a couple thousand** entries. With the standard **4KB** page size, each TLB entry covers just 4KB, so the TLB can only "reach" a few megabytes of memory at once (entries × 4KB). A program touching **gigabytes** of data — a database buffer pool, a big in-memory index, an ML model — has a working set far larger than the TLB can cover. Result: frequent **TLB misses**, each triggering a **page-table walk** (multiple dependent memory reads to find the mapping) that stalls the pipeline. For memory-intensive workloads, TLB-miss/page-walk time can be a **significant fraction** of runtime — invisible in the code, real in the profiler.

## Huge Pages: More Reach Per Entry

A **huge page** is a single large page — **2MB** or **1GB** on x86 — instead of 4KB. The magic: **one TLB entry now covers 2MB (or 1GB)** instead of 4KB. So the same small TLB can map hundreds of times more memory, drastically cutting TLB misses for large working sets. Bonus: fewer page-table levels to walk, and less page-table memory. For big-memory apps this can yield **meaningful speedups** (often several percent, sometimes much more) purely from better translation coverage.

## Two Ways to Get Them

- **Transparent Huge Pages (THP)** — the kernel **automatically** promotes eligible regions to huge pages, no app changes. Convenient, but promotion/compaction can cause **latency spikes and fragmentation stalls**; some databases (Redis, Mongo, Oracle) recommend **disabling THP** because those pauses hurt tail latency more than the throughput gain helps.
- **Explicit huge pages** (hugetlbfs / `MAP_HUGETLB` / reserved pool) — you **reserve** huge pages up front and allocate from them deliberately. More control and predictable, used by databases/JVM (`-XX:+UseLargePages`) and DPDK; costs configuration and up-front reservation.

## The Trade-offs

- ✅ Fewer TLB misses and page-walks → faster for large working sets; less page-table overhead.
- ❌ **Internal fragmentation** (a 2MB page for a little data wastes memory); **allocation is harder** (needs 2MB of contiguous physical RAM — fragmentation can make this fail or stall); THP **compaction pauses** hurt latency-sensitive apps.

So huge pages help **large, dense, long-lived** memory (buffer pools, big heaps) and can *hurt* latency-critical or sparse-memory workloads.

## Design Guidance (for understanding/using)

- **Suspect the TLB** when a big-memory app spends surprising time on nothing obvious — profile TLB misses/page-walk cycles (`perf`).
- **Use explicit huge pages** for databases/JVM/large buffer pools with big, stable working sets.
- **Consider disabling THP** for latency-sensitive services (many DBs recommend it) to avoid compaction jitter; keep it for throughput-oriented batch work.
- **Reserve huge pages early** (at boot / before fragmentation) — contiguous physical memory gets scarce as uptime grows.
- **Don't huge-page everything** — sparse or short-lived allocations waste memory to internal fragmentation.

## Pitfalls (in understanding/using)

- Ignoring the TLB → large working sets silently stall on page-walks despite good cache behavior.
- Leaving **THP on** for a latency-sensitive database → compaction pauses spike tail latency.
- Expecting huge pages to help **small** footprints → they mostly add fragmentation there.
- Trying to allocate huge pages **late** on a fragmented system → allocation failures or stalls; reserve early.
- Confusing TLB (address-translation cache) with the data caches (L1/L2/L3) — different caches, different misses.
