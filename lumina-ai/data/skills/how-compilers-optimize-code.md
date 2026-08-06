---
name: how-compilers-optimize-code
description: How compiler optimizations work — passes like constant folding, dead-code elimination, inlining, common-subexpression elimination, loop optimizations, and register allocation, enabled by IR/SSA form, plus why some code can't be optimized. Use to understand compiler optimizations, why hand-optimizing is often pointless, SSA, or what -O2 actually does.
category: engineering
keywords_vi: compiler tối ưu code thế nào, các pass tối ưu, constant folding dead code elimination, inlining, common subexpression, tối ưu vòng lặp, cấp phát thanh ghi, ssa ir
---

# How Compilers Optimize Code

Modern compilers don't just translate your source to machine code — they **transform it to run faster and smaller** while preserving its meaning. Understanding the main **optimization passes** explains why "clever" hand-optimization is often pointless (the compiler already does it), and why some code stays slow (the compiler *can't* prove it's safe to optimize) — see how-compilers-work, how-jit-compilers-work.

## The Foundation: Intermediate Representation and SSA

Compilers don't optimize source text directly — they lower it to an **Intermediate Representation (IR)**, a simpler, uniform form that's easy to analyze and rewrite. Most modern optimizers use **SSA (Static Single Assignment)** form, where **every variable is assigned exactly once** (new versions get new names). SSA makes data flow explicit — it's trivial to see where each value comes from and goes — which makes many optimizations dramatically simpler and more powerful. Optimizations are **passes** over this IR.

## The Classic Optimization Passes

- **Constant folding** — compute constant expressions at **compile time**: `2 * 60 * 60` becomes `7200`; no runtime work.
- **Constant propagation** — replace variables known to be constant with their value, enabling more folding.
- **Dead-code elimination** — remove code whose result is **never used** (unused variables, unreachable branches, computations with no effect). Enabled by data-flow analysis.
- **Common-subexpression elimination (CSE)** — compute a repeated expression **once** and reuse it instead of recomputing.
- **Inlining** — replace a function **call** with the function's **body**. Removes call overhead and, crucially, **exposes more optimization** across the boundary (the caller and callee optimize together). One of the most impactful passes.
- **Loop optimizations** — the hottest code is usually loops:
  - **Loop-invariant code motion** — hoist computations that don't change out of the loop.
  - **Strength reduction** — replace expensive ops with cheaper ones (multiply → add).
  - **Unrolling** — replicate the loop body to cut branch/counter overhead and enable vectorization.
  - **Vectorization** — use SIMD instructions to process multiple elements at once.
- **Register allocation** — keep the most-used values in fast **CPU registers** instead of memory (a graph-coloring problem — see how-cpu-caches-work for why memory is slow). Hugely affects performance.

These passes **feed each other** — inlining exposes constants, folding creates dead code, DCE cleans it up — so compilers run them repeatedly.

## Optimization Levels

`-O0` (none, fast compile, debuggable) → `-O1/-O2` (standard optimizations) → `-O3` (aggressive, may increase size) → `-Os` (optimize for size). Higher levels enable more/aggressive passes at the cost of compile time and debuggability.

## Why Some Code Can't Be Optimized

Optimizations must **preserve behavior**, so the compiler only applies them when it can **prove** they're safe. It **gives up** when it can't:
- **Aliasing** — if two pointers *might* refer to the same memory, the compiler can't reorder/cache accesses (pointer aliasing kills optimizations; this is why `restrict`/value types help).
- **Side effects / volatile / I/O** — can't be reordered or removed.
- **Function calls it can't see** (across an un-inlined boundary) — must assume the worst.
- **Observable floating-point** — reassociating floats changes results, so it's restricted.
This is why the same algorithm can be fast or slow depending on whether the compiler can *prove* things about it.

## Design Guidance / Implications

- **Write clear code; let the compiler optimize** — it does constant folding, CSE, inlining, etc. better and more reliably than manual micro-tweaks.
- **Enable optimizations** (`-O2`) for release builds — huge free speedups.
- **Help the optimizer** — avoid unnecessary aliasing, keep hot functions inlinable, use types that convey intent.
- **Profile** before hand-optimizing — the compiler already handles the obvious; spend effort where it can't (algorithms, data layout — see how-cpu-caches-work).

## Pitfalls (in understanding/using)

- **Micro-optimizing by hand** what the compiler already does (folding, CSE, strength reduction) → wasted effort, uglier code.
- Benchmarking with **optimizations off** (`-O0`) → misleading numbers.
- Expecting the compiler to optimize across **aliasing / opaque calls / side effects** it can't prove safe → it conservatively won't.
- Relying on **unsafe float reassociation** the compiler won't do (unless you opt into fast-math, which changes results).
- Assuming inlining/unrolling is **always** a win — code bloat can hurt instruction cache; the compiler heuristics usually know better.
- Confusing **optimization** (same behavior, faster) with changing the **algorithm** (the bigger win the compiler can't do for you).
