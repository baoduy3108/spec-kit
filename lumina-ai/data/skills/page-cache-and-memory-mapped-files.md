---
name: page-cache-and-memory-mapped-files
description: Why reading the same file twice is instant and how databases map files into memory — the OS page cache and mmap. The kernel caches file pages in RAM, so most reads never touch disk; mmap maps a file into a process's address space so file access becomes memory access. Use to understand why "free RAM" is used by cache, dirty pages/writeback, mmap vs read/write, page faults, and msync durability.
category: systems-internals
keywords_vi: bộ đệm trang page cache kernel giữ trang tệp trong ram, đọc lại tệp gần như tức thì không chạm đĩa, ánh xạ tệp vào bộ nhớ mmap biến truy cập tệp thành truy cập bộ nhớ, trang bẩn dirty page và ghi lại writeback, ram trống bị dùng làm cache, lỗi trang page fault nạp trang theo yêu cầu
---

# Page Cache & Memory-Mapped Files

Disk is orders of magnitude slower than RAM, so the operating system works hard to **avoid touching it**. The main mechanism is the **page cache**: the kernel keeps recently-used file pages in RAM, so the *second* time anyone reads that data it comes from memory at RAM speed — no disk I/O. This is why "my RAM is almost full" is usually *good* (the kernel is caching files for you), and why the same query runs slow cold then fast warm (see how-virtual-memory-works, zero-copy-io, write-ahead-logging).

## The Page Cache

Every `read()`/`write()` goes **through** the page cache:
- **Read** — if the page is cached (hit), copy from RAM; if not (miss), the kernel loads it from disk into the cache, then serves it. **Read-ahead** prefetches sequential pages, so streaming reads stay fast.
- **Write** — normally **write-back**: the write updates the cached page, marks it **dirty**, and returns *immediately*; a background flusher (or `fsync`) writes dirty pages to disk **later**. This makes writes fast but means "written" ≠ "durable" until flushed (the crux of WAL/`fsync`).

Free RAM is "wasted" RAM, so the kernel fills it with cache and evicts (usually LRU-ish) under memory pressure. Cached file pages are **reclaimable** instantly, which is why cache doesn't cause OOM.

## Memory-Mapped Files (mmap)

`mmap` maps a file **directly into a process's virtual address space**. Now you access the file by **reading/writing memory** — no `read()`/`write()` syscalls per access. Under the hood it's the page cache again: touching an unmapped page triggers a **page fault**, the kernel loads that page from disk into the cache and maps it in, and your access continues. Benefits:
- **No explicit syscalls / fewer copies** — the data isn't copied into a separate user buffer; you read the cache pages directly (relates to zero-copy).
- **Demand paging** — only the pages you touch are loaded; you can "open" a huge file and pay only for what you access.
- **Sharing** — multiple processes mapping the same file **share** the same physical pages.

Databases (LMDB, and parts of SQLite/others) use mmap to treat on-disk structures as memory. Durability still needs **`msync`/`fsync`** — a dirty mapped page isn't on disk until flushed.

## Trade-offs of mmap

- ✅ Simple pointer access, demand-paged, shareable, avoids copy.
- ❌ **I/O errors surface as faults/signals (SIGBUS)** mid-access, not as a `read()` return code — harder to handle; unpredictable latency when a touch faults to disk; less control over read-ahead/caching than explicit I/O; TLB pressure for huge mappings.

## Design Guidance (for understanding/using)

- **Don't fear cache filling RAM** — it's reclaimable; "used by cache" is healthy.
- **Remember write-back ≠ durable** — call `fsync`/`msync` before you rely on data surviving a crash.
- **Use mmap for random access to large files** and sharing; use buffered `read/write` when you need clear error handling and streaming control.
- **Warm the cache** for latency-sensitive first requests, or expect a cold-start penalty.
- **Watch dirty-page pressure** — huge bursts of writes can stall on write-back; tune flush thresholds for write-heavy systems.

## Pitfalls (in understanding/using)

- Thinking a returned `write()` is **durable** → it's in the page cache (dirty); crash loses it without `fsync`.
- Alarm at "low free memory" → most is reclaimable **cache**, not a leak.
- Assuming mmap has **no** I/O cost → touching a non-resident page faults to disk (unpredictable latency).
- Ignoring `msync`/`fsync` with mmap → dirty mapped pages aren't persisted.
- Not handling **SIGBUS** with mmap on I/O errors/truncated files → crashes instead of graceful errors.
