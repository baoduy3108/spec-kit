---
name: register-allocation-and-graph-coloring
description: How a compiler decides which variables live in fast CPU registers and which spill to slow memory — register allocation modeled as graph coloring. Variables that are live at the same time interfere and can't share a register; the allocator colors the interference graph with K colors (registers) and spills the rest. Use to understand spilling, live ranges, why register pressure hurts performance, and what "the compiler ran out of registers" means.
category: systems-internals
keywords_vi: cấp phát thanh ghi register allocation, tô màu đồ thị graph coloring, biến sống cùng lúc giao nhau, tràn thanh ghi spill, khoảng sống live range, áp lực thanh ghi register pressure
---

# Register Allocation & Graph Coloring

A CPU has only a handful of **registers** (the fastest storage — a few dozen general-purpose ones), but a program has arbitrarily many variables and temporaries. The compiler must decide **which values live in registers** (fast) and which get **spilled to memory** (slow — a load/store on every access). Doing this well is one of the highest-impact back-end optimizations, and the classic formulation is **graph coloring** (see ssa-form-and-compiler-optimization, how-cpu-caches-work, how-jit-compilers-work).

## Live Ranges and Interference

A variable's **live range** is the span of code from where it's defined to its last use. Two variables **interfere** if their live ranges **overlap** — both hold a needed value at the same time, so they **cannot share** one register. Build the **interference graph**: one node per variable, an edge between any two that interfere.

## Coloring the Graph

Assigning registers = **coloring** the interference graph so that **no two adjacent nodes share a color**, using **K colors** where K = number of available registers. If the graph is **K-colorable**, every variable gets a register. This is NP-hard in general, so compilers use heuristics — the classic **Chaitin-Briggs** algorithm:
1. **Simplify** — repeatedly remove nodes with **degree < K** (they can always be colored) and push them on a stack.
2. **Spill** — if only high-degree nodes remain, pick one to **spill** (mark as a spill candidate) and remove it.
3. **Select** — pop nodes off the stack, assigning each a color not used by its neighbors.

## Spilling

When there aren't enough registers, some variables **spill** to the stack: the compiler inserts **loads before uses and stores after defs**. Spills are expensive (memory traffic), so allocators pick spill candidates by cost heuristics — prefer spilling variables used **infrequently** or **outside hot loops** (spill weight = use frequency / live-range length). A value used inside a tight loop should almost never be the one spilled.

## Register Pressure

**Register pressure** = how many values are simultaneously live. High pressure → more interference → more spills → slower code. Things that raise pressure: huge functions, many live temporaries, aggressive loop unrolling, deep inlining. This is a real tension: **inlining and unrolling help, but past a point they blow the register budget** and cause spills that erase the gains.

## Design Guidance (for understanding/using)

- **Keep hot loops lean** — fewer simultaneously-live variables in the loop body → fewer spills.
- **Don't over-unroll / over-inline** — watch for a regression where more unrolling gets *slower* (register pressure → spills).
- **Read the assembly** for hot code — lots of stack loads/stores in a loop signals spilling; restructure to reduce live values.
- **Let the allocator work** — it's very good; micro-managing "keep this in a register" (e.g. old `register` keyword) is usually pointless on modern compilers.

## Pitfalls (in understanding/using)

- Assuming all locals live in registers → past register count, they **spill** to memory.
- Aggressive unrolling/inlining "for speed" that raises pressure → **more spills**, net slower.
- Long live ranges (compute a value early, use it much later) → it ties up a register the whole time; compute closer to use.
- Ignoring spills in profiling → mysterious loop slowness that's really memory traffic.
- Confusing register allocation (which values in registers) with instruction scheduling (their order).
