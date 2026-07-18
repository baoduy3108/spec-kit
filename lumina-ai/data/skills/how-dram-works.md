---
name: how-dram-works
description: How dynamic RAM (DRAM) works — bits stored as charge in capacitors, why it needs constant refresh, rows/columns and the row buffer, latency (CAS/RAS) and why access isn't uniform, and the memory hierarchy context. Use to understand RAM, DRAM refresh, memory latency, why sequential memory access is faster, or SRAM vs DRAM.
category: engineering
keywords_vi: dram, ram bộ nhớ, tụ điện, refresh làm tươi, row buffer, hàng cột, latency cas ras, sram vs dram
---

# How DRAM Works

DRAM (Dynamic Random-Access Memory) is your computer's main memory. It's fast and dense but volatile, and its physics — storing bits as tiny charges — explain refresh, latency, and why "random" access isn't quite uniform.

## Bits as Charge in Capacitors

Each DRAM cell is a **capacitor + transistor**: a charged capacitor = 1, discharged = 0. This is extremely dense and cheap (one capacitor per bit), which is why main memory is DRAM. The catch: **capacitors leak charge** — a stored bit fades within milliseconds.

## Refresh (the "Dynamic")

Because charge leaks, DRAM must be **refreshed** constantly: every cell is read and rewritten (recharged) thousands of times per second, or data is lost. This background refresh is why it's *dynamic* RAM, and it costs a little power and bandwidth. Contrast **SRAM** (static RAM), which holds state in flip-flops (no refresh, faster, but ~6 transistors per bit → far less dense and more expensive — used for CPU caches, not main memory).

## Rows, Columns & the Row Buffer

DRAM is organized as a grid of **rows and columns**. To read a bit:
1. **Activate** the row (RAS) — the entire row is read into a fast **row buffer** (sense amplifiers). This is the slow step, and it's *destructive*, so the row must be written back.
2. **Column access** (CAS) — read the specific bits from the row buffer.
Key consequence: accessing another column **in the same open row** is fast (already in the buffer); accessing a **different row** requires closing the current row and activating the new one (slow). So DRAM access latency **isn't uniform** — locality within a row is much faster. This is one reason sequential memory access outperforms scattered access (alongside CPU caches and prefetching, see how-cpus-work).

## Latency & Timings

DRAM timings (CAS latency, tRCD, tRP — the numbers on RAM specs) measure these steps in clock cycles. Memory latency (~tens of nanoseconds) is **hundreds of CPU cycles** — which is precisely why CPUs have multi-level caches (see how-virtual-memory-works, how-cpus-work) to avoid hitting DRAM. Bandwidth (GB/s) and latency are different axes; both matter.

## Volatility & the Hierarchy

DRAM loses everything on power off (volatile) — that's why you save to disk. It sits in the memory hierarchy between fast/small SRAM caches and slow/large storage: registers → L1/L2/L3 (SRAM) → DRAM → SSD/HDD, each layer bigger and slower. Programs run fast when their working set fits in the faster layers.

## Pitfalls (in understanding/using)

- Assuming all memory access costs the same — row misses, cache misses, and NUMA make it very non-uniform; **locality matters**.
- Ignoring cache-friendliness — a scattered-access algorithm can be many× slower than a cache-friendly one doing the same work (see how-cpus-work).
- Confusing DRAM (main memory) with SRAM (cache) or with non-volatile storage.
- Forgetting volatility — unsaved data is gone on power loss.
- Treating memory bandwidth and latency as the same thing.
