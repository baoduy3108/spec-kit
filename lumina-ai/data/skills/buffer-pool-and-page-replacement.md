---
name: buffer-pool-and-page-replacement
description: How a database caches disk pages in RAM and decides what to evict — the buffer pool and its replacement policy. Covers why databases manage their own cache instead of trusting the OS page cache, pinning, dirty pages and flushing, and why LRU fails on big scans (sequential flooding) so real systems use LRU-K/CLOCK/2Q. Use to understand buffer pool sizing, hit ratio, and scan-resistant eviction.
category: systems-internals
keywords_vi: bể đệm buffer pool cơ sở dữ liệu cache trang đĩa trong ram, chính sách thay thế trang page replacement chọn trang để đuổi, ghim trang pinning và trang bẩn dirty page cần ghi lại, lru hỏng khi quét lớn sequential flooding, dùng lru-k clock 2q chống quét, tỉ lệ trúng hit ratio và kích thước buffer pool
---

# Buffer Pool & Page Replacement

A database's data lives on disk but must be operated on in RAM. The **buffer pool** is the database's own in-memory cache of disk **pages** — the single most important structure for performance, because a query that finds its pages in the buffer pool (a **hit**) runs at memory speed, while a **miss** pays a disk read. Two questions define it: *how does it manage cached pages*, and *what does it evict when full* (see page-cache-and-memory-mapped-files, how-b-trees-work, write-ahead-logging).

## Why Databases Don't Just Trust the OS Page Cache

The OS already caches files (the page cache) — so why does a database build its **own** buffer pool? Because it knows things the OS can't:
- **Access patterns** — the DB knows this is an index root (hot) vs a one-time scan page (cold), so it can evict smarter.
- **Dirty-page control + WAL ordering** — the DB must ensure the **log is flushed before** a dirty data page (write-ahead rule); it needs precise control over *when* pages hit disk, which the OS cache doesn't give.
- **Pinning** — it must guarantee a page **stays in memory** while a query operates on it.

So databases manage pages explicitly (and often use `O_DIRECT` to bypass the OS cache and avoid double-caching).

## Mechanics: Pinning and Dirty Pages

- **Pin/unpin** — before using a page, a worker **pins** it (increments a count) so it can't be evicted mid-use; unpins when done. Only unpinned pages are eviction candidates.
- **Dirty pages** — a modified page is **dirty** and must be **written back** to disk before eviction (and after its WAL records are durable). Clean pages can be dropped for free.
- **Hit ratio** — the fraction of accesses served from the pool; the headline health metric. A bigger pool usually raises it, up to the working set.

## The Eviction Problem: Why Plain LRU Fails

The obvious policy is **LRU** (evict least-recently-used). But databases have a killer case: a **large sequential scan** (read a huge table once) touches millions of pages that will **never be reused**, and plain LRU dutifully evicts all your **hot** index/working-set pages to make room for scan pages that get used once and thrown away. This is **sequential flooding** — one big scan wrecks the cache for everyone. So real systems use **scan-resistant** policies:
- **LRU-K** — track the last *K* references; evict by the *K*-th-to-last access, so pages touched **once** (scans) are evicted before pages touched **repeatedly** (working set).
- **CLOCK / Second-Chance** — an approximation of LRU with a reference bit, cheap and lock-friendly.
- **2Q / ARC** — separate "seen once" from "seen again" queues so one-shot scan pages don't pollute the hot set.

## Design Guidance (for understanding/using)

- **Size the buffer pool to hold the working set** — it's usually the #1 database memory tuning knob; watch the **hit ratio**.
- **Expect scan-resistant eviction** — don't assume plain LRU; big analytical scans shouldn't evict OLTP hot pages.
- **Understand WAL ordering** — dirty pages can't flush before their log records; that coupling is why the DB owns the cache.
- **Avoid double caching** — if the DB uses its own buffer pool with direct I/O, the OS page cache would duplicate it.
- **Monitor dirty-page pressure** — a flush backlog stalls writes; checkpoint tuning bounds it.

## Pitfalls (in understanding/using)

- Assuming plain **LRU** → a single large scan floods and evicts the hot working set (sequential flooding).
- Buffer pool **too small** for the working set → thrashing, low hit ratio, disk-bound queries.
- Ignoring that dirty pages must **flush before eviction** (and after WAL) → correctness/ordering bugs if you hand-roll it.
- Double-caching (OS page cache + buffer pool) → wasted RAM; databases often use direct I/O.
- Treating hit ratio as the only metric → a 99% hit ratio can still hide a hot 1% causing all the latency.
