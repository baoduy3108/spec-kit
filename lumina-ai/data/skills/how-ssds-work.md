---
name: how-ssds-work
description: How solid-state drives work — NAND flash cells, pages and blocks, why you can't overwrite in place (erase-before-write), the Flash Translation Layer, wear leveling, garbage collection, TRIM, and write amplification. Use to understand SSDs, flash storage, wear leveling, TRIM, or why SSD writes behave differently from disks.
category: engineering
keywords_vi: ssd hoạt động thế nào, ổ cứng thể rắn, nand flash, page block xóa trước khi ghi, wear leveling cân bằng hao mòn, trim, write amplification, flash translation layer
---

# How SSDs Work

Solid-state drives store data in **NAND flash** — no moving parts, so random access is fast and uniform (unlike spinning disks that must seek). But flash has quirks that shape SSD behavior and lifespan, all hidden behind a clever controller.

## NAND Flash: Cells, Pages, Blocks

Data is stored as charge in **cells** (transistors). Cells are grouped into **pages** (the smallest unit you can **read or write**, ~4–16 KB), and pages into **blocks** (the smallest unit you can **erase**, ~hundreds of pages). This asymmetry is the crux:
- You **write** at page granularity.
- You **erase** only whole blocks.
- **You cannot overwrite a page in place** — a page must be erased before it can be rewritten, and erase only works on the whole block.

## Erase-Before-Write & the FTL

Because of erase-before-write, "updating" a 4 KB file doesn't overwrite its page. Instead the SSD's **Flash Translation Layer (FTL)** writes the new data to a **fresh, already-erased page** and remaps the logical address to it, marking the old page **stale**. The FTL maintains the logical→physical mapping, so the OS sees normal addressable storage while the SSD shuffles data underneath.

## Garbage Collection & Write Amplification

Over time, blocks fill with a mix of valid and stale pages. **Garbage collection** reclaims space: copy the still-valid pages of a block elsewhere, then erase the whole block. This means writing 4 KB of user data can cause *more* physical writing (copying valid pages during GC) — **write amplification**. Higher amplification = slower writes and faster wear. Over-provisioning (spare capacity) reduces it.

## Wear Leveling

Each flash cell tolerates a **limited number of erase cycles** before wearing out. **Wear leveling** spreads writes evenly across all blocks so no single block dies early (if the FTL always reused the same blocks, hot data would burn them out). This is why you shouldn't defragment an SSD (pointless and adds wear) and why SSDs have finite but generally long endurance.

## TRIM

When you delete a file, the OS knows the pages are free, but the SSD doesn't (it just sees the filesystem stop referencing them). The **TRIM** command tells the SSD "these logical blocks are no longer needed," so GC can treat them as stale and reclaim them — keeping performance up and reducing write amplification. Modern OSes issue TRIM automatically.

## Pitfalls (in understanding/using)

- **Defragmenting an SSD** — useless (no seek penalty) and wastes write cycles.
- Assuming overwrite-in-place like a disk — SSDs remap; deleted data may persist physically until GC (secure erase matters for wiping).
- Ignoring **write amplification** in write-heavy workloads (databases) — over-provision, use larger writes.
- Filling an SSD to ~100% — leaves no spare blocks for GC → performance collapse and more wear.
- Forgetting that flash **wears out** — monitor SMART endurance for write-intensive uses.
- Expecting data retention forever unpowered — flash charge leaks over long unpowered periods.
