---
name: escape-analysis-and-inlining
description: Two compiler optimizations that quietly decide much of your program's speed — inlining (replacing a call with the callee's body to kill call overhead and unlock further optimization) and escape analysis (proving an object never leaves a scope, so it can be stack-allocated or eliminated instead of heap-allocated). Use to understand why small hot functions get inlined, why some allocations vanish, and how to write optimizer-friendly code.
category: systems-internals
keywords_vi: nội tuyến inlining thay lời gọi bằng thân hàm, phân tích thoát escape analysis, đối tượng không rời phạm vi không thoát, cấp phát trên stack thay vì heap, loại bỏ cấp phát scalar replacement, mở khóa tối ưu sau khi nội tuyến
---

# Escape Analysis & Inlining

Two of the most consequential compiler optimizations rarely appear in your source but dominate real performance: **inlining** removes function-call overhead and, more importantly, **exposes** the callee's code to the caller's optimizer; **escape analysis** proves an object's lifetime is confined so it can skip the heap entirely. Together they're why idiomatic, well-factored code can run as fast as hand-inlined code (see ssa-form-and-compiler-optimization, how-jit-compilers-work, how-garbage-collection-works).

## Inlining

**Inlining** replaces a call site with a copy of the callee's body. Direct wins: no call/return, no argument marshaling, no stack frame. The **bigger** win is *enabling other optimizations across the boundary* — after inlining, the optimizer can do constant propagation, dead-code elimination, and CSE **through** what used to be an opaque call. A tiny getter or a lambda passed to `map` becomes free.

But inlining isn't free: it **grows code size** (instruction-cache pressure) and **register pressure** (see register-allocation-and-graph-coloring). So compilers use **heuristics** — inline small, hot, frequently-called functions; skip large or cold ones. JITs inline based on **runtime profiles** (inline what's actually hot). Recursion and megamorphic virtual calls limit inlining.

## Escape Analysis

An object **escapes** a scope if a reference to it can be observed *after* the scope ends — e.g. it's returned, stored in a field/global, passed to a call that might retain it, or captured by a closure that outlives the scope. **Escape analysis** proves an object does **not** escape. When it doesn't, the compiler can:
- **Stack-allocate** it instead of the heap → no GC/`malloc` cost, freed automatically on return.
- **Scalar-replace** it → break the object into its fields held in registers, so the object *never materializes at all*.
- **Elide locks** on an object provably visible to one thread (lock elision).

This is why, in JITted languages (JVM, Go, V8), lots of "allocations" in tight loops cost **nothing** — the runtime proved they don't escape and never actually heap-allocated them.

## They Reinforce Each Other

Escape analysis is far more effective **after inlining**: once a callee is inlined, the compiler can see the object's *entire* lifetime in one scope and prove it doesn't escape. Inlining a factory + its usage often lets the whole allocation disappear.

## Design Guidance (for understanding/using)

- **Write small, focused functions** — they inline well; don't hand-inline for "speed", it hurts readability and the compiler already does it.
- **Keep objects local** — if a short-lived object never leaves the function, the runtime can stack-allocate/eliminate it; storing it in a field or returning it forces the heap.
- **Beware boundaries that block optimization** — virtual/interface dispatch, reflection, `volatile`, and passing objects to opaque calls can defeat escape analysis and inlining.
- **Check what the JIT/compiler did** — inlining and allocation-elision decisions are visible in optimizer/JIT logs (e.g. `-XX:+PrintInlining`, escape-analysis flags, Go `-gcflags=-m`).

## Pitfalls (in understanding/using)

- Hand-inlining everything → bigger code, worse i-cache/register pressure, and the compiler often un-does or would have done it better.
- Assuming every `new`/allocation hits the heap → escape analysis may erase it entirely.
- Accidentally making objects **escape** (storing in a field, returning, capturing in a long-lived closure) → forces heap allocation and GC pressure.
- Expecting inlining across **megamorphic** virtual calls or reflection → the compiler can't, and optimization stops at that wall.
- Confusing "inlined" with "faster always" — over-inlining can regress via code bloat.
