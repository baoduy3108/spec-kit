---
name: profile-guided-optimization
description: How compilers optimize for how your program ACTUALLY runs, not how it might run — Profile-Guided Optimization (PGO). Collect runtime profiles (which branches, calls, and paths are hot) from a representative workload, feed them back into a recompile, and the compiler lays out code, inlines, and predicts branches based on real behavior. Use to understand PGO, hot/cold splitting, branch layout, and why "optimize the common case" beats guessing.
category: systems-internals
keywords_vi: profile-guided optimization pgo, tối ưu theo hồ sơ chạy thật, thu thập profile nhánh nóng, tách mã nóng lạnh hot cold splitting, dự đoán nhánh theo tần suất thật, tối ưu trường hợp phổ biến common case
---

# Profile-Guided Optimization (PGO)

An optimizing compiler constantly guesses: *which branch is usually taken? which call is hot enough to inline? which functions run together and should sit near each other in memory?* At compile time it can only heuristically guess. **Profile-Guided Optimization** replaces guessing with **measurement**: run the program on a **representative workload**, record what actually happened, and recompile using that profile so the compiler optimizes for **real** behavior (see escape-analysis-and-inlining, performance-optimization, how-jit-compilers-work).

## The Three-Step Loop

1. **Instrument / sample** — build an instrumented binary that counts branch outcomes, call frequencies, and path counts; or **sample** a production binary with low overhead (e.g. `perf`-based AutoFDO/CSSPGO). 
2. **Run a representative workload** — exercise the program the way real users do. **This is the crux**: the profile must match production, or you optimize the wrong paths.
3. **Recompile with the profile** — the compiler now knows the hot/cold reality and optimizes accordingly.

## What the Profile Unlocks

- **Better inlining** — inline calls that are *actually* hot (from real counts), skip cold ones → smaller code where it doesn't matter, faster where it does.
- **Branch layout** — arrange code so the **common** branch is the fall-through (no taken-branch penalty) and hint the CPU's predictor correctly.
- **Hot/cold splitting** — move rarely-run code (error handling, edge cases) **out of line** into a separate "cold" section, so hot functions pack tightly and the instruction cache holds mostly code that runs.
- **Function reordering / layout** — place functions that call each other **nearby** to improve i-cache and TLB locality; a linker step (BOLT/Propeller) can even re-lay-out an already-compiled binary using profiles.
- **Loop and vectorization decisions** guided by real trip counts.

The theme is **"optimize the common case"** — spend code quality and cache budget on what runs most, and exile the rare.

## JIT vs AOT

A **JIT** does PGO implicitly and continuously: it profiles at runtime and recompiles hot methods with speculation (see how-jit-compilers-work). **AOT PGO** brings the same benefit to ahead-of-time-compiled languages (C/C++/Rust/Go) at build time — you supply the profile explicitly. Reported gains are commonly **10–20%+** on large real workloads (browsers, databases, compilers themselves).

## Design Guidance (for understanding/using)

- **Profile a representative workload** — the #1 rule; a misleading profile can make things *worse* by optimizing cold paths.
- **Keep profiles fresh** — as code and usage change, stale profiles mis-guide; re-collect periodically (production sampling/AutoFDO makes this cheap).
- **Combine with LTO** — link-time optimization + PGO compound (cross-module inlining guided by real hotness).
- **Consider post-link tools** (BOLT/Propeller) for extra layout wins on top of a PGO build.
- **Measure the whole pipeline** — PGO's benefit is workload-specific; verify on your real traffic.

## Pitfalls (in understanding/using)

- **Unrepresentative training workload** → optimizes the wrong paths, sometimes a net regression.
- **Stale profiles** after code/usage changes → mis-predicted branches and bad layout.
- Expecting PGO to fix **algorithmic** problems → it tunes layout/inlining/branches, not your O(n²).
- Instrumentation overhead confusing the profile → prefer low-overhead sampling for production collection.
- Forgetting that a **JIT already does this** — AOT PGO is for AOT languages; don't double-count the benefit.
