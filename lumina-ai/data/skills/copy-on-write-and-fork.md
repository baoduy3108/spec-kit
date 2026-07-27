---
name: copy-on-write-and-fork
description: How fork() creates a whole new process almost for free, and the copy-on-write (COW) trick behind it — parent and child share physical pages read-only until one writes, triggering a per-page copy. Use to understand why fork is cheap, COW page faults, why Redis forks to snapshot, the write-amplification pitfall with GC/refcounts, and COW beyond fork (filesystems, snapshots).
category: systems-internals
keywords_vi: sao chép khi ghi copy-on-write cow tiến trình con dùng chung trang chỉ đọc, fork tạo tiến trình mới gần như miễn phí, chỉ sao chép trang khi có bên ghi vào, lỗi trang cow kích hoạt sao chép từng trang, redis fork để chụp nhanh dữ liệu, khuếch đại ghi khi gc hay refcount chạm trang
---

# Copy-on-Write & fork()

`fork()` duplicates an entire process — its whole address space, potentially gigabytes. If it literally **copied** all that memory, fork would be catastrophically slow and often pointless (many children immediately `exec` a new program, throwing the copy away). Instead the OS uses **Copy-on-Write (COW)**: the copy is **lazy**. Parent and child **share the same physical pages** right after fork, and a real copy happens only for pages that actually get **written** — so fork is nearly instant regardless of process size (see how-virtual-memory-works, page-cache-and-memory-mapped-files, mvcc-and-snapshot-isolation).

## How COW Works

After `fork()`:
1. The child gets its **own page tables**, but they point at the **same physical pages** as the parent.
2. **All shared pages are marked read-only** in *both* processes.
3. When either process **writes** to a shared page, the CPU raises a **protection fault**. The kernel's fault handler **copies that one page**, gives the writer its private copy (now writable), and lets the write proceed.

So you only pay to copy pages that are **modified** — untouched pages stay shared forever. `fork()` then `exec()` copies almost nothing (the old address space is discarded). This is why spawning processes on Unix is cheap.

## Where COW Shines: Snapshots via fork

**Redis** persistence (RDB/BGSAVE) is the classic example: to snapshot the dataset without blocking, Redis **forks**. The child sees a **frozen, consistent** view of memory (COW guarantees the child's pages don't change even as the parent keeps serving writes) and serializes it to disk, while the parent keeps handling requests. It's a cheap, instant, consistent point-in-time copy — the same idea as MVCC snapshots and filesystem snapshots (ZFS/Btrfs also use COW).

## The Big Pitfall: Write Amplification

COW's cost is **deferred, not free**. If the parent (or child) **writes a lot** after fork, each first write to a shared page forces a copy — memory usage can **balloon** and page-fault storms hurt latency. Worse, seemingly "read-only" workloads can touch pages:
- **Garbage collectors** that move objects or update mark bits **write** to pages → COW-copies them.
- **Reference counting** (CPython) writes a refcount into an object's page on *every* access — so even "reading" data after fork dirties pages, defeating COW sharing (a known memory issue for forking CPython workers).

So the memory saving assumes the post-fork workload is genuinely **write-light** on shared pages.

## Design Guidance (for understanding/using)

- **Fork is cheap; the writes after are what cost** — plan for COW copying proportional to what gets modified.
- **Use fork for consistent snapshots** (like Redis) when the parent's write rate during the snapshot is modest.
- **Watch memory headroom** — a write-heavy parent during a fork'd snapshot can spike RSS toward 2×; provision for it.
- **Beware GC/refcount write-amplification** — forking + reference counting (CPython) erodes COW sharing; prefer designs that keep shared data untouched.
- **`fork()+exec()` is fine** — the address space is dropped, so COW copies almost nothing.

## Pitfalls (in understanding/using)

- Assuming fork **copies** all memory → it shares via COW; the copy is lazy and per-page.
- Assuming COW makes the snapshot **free** → heavy post-fork writes trigger copies and RSS spikes.
- Forgetting **refcounting/GC dirties pages** → "read-only" child/parent still COW-copies, wasting memory.
- Forking a **multi-threaded** process and doing non-async-signal-safe work before `exec` → deadlocks (only the forking thread survives).
- Not provisioning for the **transient 2× memory** during a fork-based snapshot under write load.
