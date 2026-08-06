---
name: how-virtual-memory-works
description: How virtual memory works — the OS/hardware giving each process its own address space via page tables, the MMU translating virtual→physical addresses, pages and page faults, demand paging and swapping, and the TLB cache. Use to understand virtual memory, address spaces, page faults, swapping, or why processes are isolated.
category: engineering
keywords_vi: virtual memory hoạt động thế nào, bộ nhớ ảo, page table, mmu dịch địa chỉ, page fault, phân trang paging swap, tlb, không gian địa chỉ
---

# How Virtual Memory Works

Virtual memory gives each process the illusion of its own large, contiguous address space, while the OS and CPU map that onto real (physical) RAM behind the scenes. It's the foundation of process **isolation**, efficient RAM use, and running programs bigger than RAM.

## Virtual vs Physical Addresses

Programs use **virtual addresses**; the CPU's **MMU** (Memory Management Unit) translates each to a **physical address** in RAM using per-process **page tables**. Because every process has its own mapping, process A literally cannot name process B's memory → **isolation** (a crash or exploit in one can't touch another). The same virtual address in two processes maps to different physical memory.

## Pages & Page Tables

Memory is managed in fixed-size **pages** (typically 4 KB). The page table maps virtual pages → physical **frames**, with permission bits (read/write/execute) per page. Modern systems use **multi-level page tables** (or hashed/inverted tables) so the table itself doesn't consume huge memory for sparse address spaces.

## The TLB (making it fast)

Walking a multi-level page table on every memory access would be brutally slow. The **TLB (Translation Lookaside Buffer)** is a small, fast cache of recent virtual→physical translations in the CPU. Most accesses hit the TLB (near-free); a **TLB miss** triggers a page-table walk. Good locality keeps the TLB hot; scattered access ("TLB thrashing") hurts.

## Page Faults & Demand Paging

If a virtual page has no valid physical frame, accessing it triggers a **page fault** — a trap to the OS. The OS then:
- **Demand paging** — loads the page from disk (e.g. the first touch of a program's code) lazily, only when needed.
- **Swapping** — if RAM is full, evicts a page to disk (swap) and loads the wanted one. Too much of this is **thrashing** — the system spends all its time paging and grinds to a halt.
- Or it's an **invalid access** (segfault) → kill the process.
This lets programs use more address space than physical RAM, and lets the OS share pages (copy-on-write after `fork`, shared libraries).

## Why It Matters

- **Isolation & protection** (per-process spaces, permission bits — no write to code pages).
- **Overcommit & efficiency** (map more than RAM; load lazily; share read-only pages).
- Enables `mmap`, copy-on-write `fork`, memory-mapped files.

## Pitfalls (in understanding/using)

- Thinking a pointer's value is a physical location — it's virtual, per-process.
- Ignoring **locality** — poor access patterns thrash the TLB and cache (see how-cpus-work).
- **Thrashing** under memory pressure (excessive swapping) — add RAM or reduce working set.
- Assuming `malloc` touched physical RAM — pages are often mapped lazily until first write (demand paging).
- Confusing swap (disk) with RAM — heavy swap = disk-speed memory = slow.
