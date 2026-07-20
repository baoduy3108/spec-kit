---
name: how-cpus-work
description: How a CPU executes code — the fetch-decode-execute cycle, registers and the ALU, the clock, pipelining and branch prediction, the memory hierarchy (registers→cache→RAM) and why cache locality dominates performance. Use to understand what "instructions", "registers", "cache misses", and "pipeline stalls" mean and why data layout affects speed.
category: engineering
keywords_vi: cpu hoạt động thế nào, bộ xử lý, fetch decode execute, thanh ghi register alu, pipeline branch prediction, cache miss locality, phần cứng máy tính, hiểu cpu
---

# How CPUs Work

A CPU repeatedly does one simple thing very fast: fetch an instruction, figure out what it means, do it.

## The Instruction Cycle

Driven by the **clock** (billions of ticks/second), the CPU runs the **fetch–decode–execute** cycle:
1. **Fetch** the next instruction from memory (address in the program counter).
2. **Decode** it into an operation + operands.
3. **Execute** — the **ALU** (arithmetic logic unit) does math/logic, or data moves between **registers** (tiny, ultra-fast on-chip storage) and memory.
4. Advance the program counter (or jump, for branches).

High-level code compiles down to millions of these primitive instructions.

## Going Fast: Pipelining & Prediction

Executing one instruction fully before starting the next wastes the chip. **Pipelining** overlaps stages like an assembly line — while one instruction executes, the next decodes and another fetches — so many are in flight at once. The catch: a **branch** (if/loop) means the CPU doesn't yet know which instruction comes next, so it uses **branch prediction** to guess and speculatively continue; a misprediction flushes the pipeline (a **stall**, wasted cycles). This is why unpredictable branches in hot loops hurt, and why branch-free/data-oriented code can be faster.

## The Memory Hierarchy (the real performance story)

Registers are instant; RAM is *hundreds* of cycles away. In between sit **caches** (L1/L2/L3) — small, fast copies of recently/nearby-used memory. A **cache hit** is fast; a **cache miss** stalls the CPU waiting for RAM. Caches load data in **cache lines** (chunks), so accessing memory **sequentially/locally** is far faster than random access:
- **Spatial locality** — nearby data is likely already in the loaded line.
- **Temporal locality** — recently used data is likely still cached.

This is why an array (contiguous) often beats a linked list (scattered) despite equal Big-O, why row-vs-column access order matters, and why "mechanical sympathy" (laying data out for the cache) can beat algorithmic cleverness on real hardware. Multiple **cores** run these cycles in parallel — the basis of the concurrency you exploit in software.
