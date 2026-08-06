---
name: how-jit-compilers-work
description: How JIT compilers work — compiling hot code to native machine code at runtime, using profiling to find hot paths, speculative optimization with guards and deoptimization, and tiered compilation, plus JIT vs AOT trade-offs. Use to understand JIT compilation, why JS/JVM/.NET get fast, warmup, deoptimization, or JIT vs AOT.
category: engineering
keywords_vi: jit compiler, deoptimization, tiered compilation, warmup khởi động nóng, biên dịch nóng lúc chạy, profiling hot path, tối ưu suy đoán guard, jit vs aot
---

# How JIT Compilers Work

A Just-In-Time (JIT) compiler compiles code to **native machine code at runtime**, while the program is running — combining the flexibility of an interpreter with speed approaching a compiled language. It's why JavaScript (V8), the JVM (HotSpot), and .NET can be fast despite starting as interpreted/bytecode. The core ideas: **compile the hot code, use runtime information to optimize speculatively, and fall back safely when guesses are wrong** (see how-interpreters-work, how-compilers-optimize-code).

## The Problem: Interpreters Are Flexible but Slow

An interpreter (see how-interpreters-work) executes bytecode/AST directly — flexible, portable, quick to start, but **slow** (interpretation overhead per operation). Ahead-of-time (AOT) compilation is fast but rigid (compile everything up front, no runtime information). A JIT gets the best of both: **start interpreting** (fast startup, flexibility), then **compile the parts that matter** to native code (speed) — using knowledge only available **at runtime**.

## The Core Idea: Compile the Hot Code

Most programs spend most of their time in a **small fraction** of the code (hot loops, hot functions). A JIT:
1. **Starts by interpreting** (or quickly compiling) — the program runs immediately.
2. **Profiles at runtime** — counts how often functions/loops execute to find the **"hot"** code.
3. **Compiles hot code to optimized native machine code** — so the frequently-run parts run at full speed, while rarely-run code stays interpreted (not worth the compile cost).
This is why there's **"warmup"**: a JIT'd program gets **faster over time** as the JIT identifies and compiles hot paths. Early on it's slow (interpreting + compiling); once warm, it's fast.

## Speculative Optimization: Guards and Deoptimization

The JIT's superpower is using **runtime observations** to make optimizations an AOT compiler **can't**:
- It **observes** that a variable has "always been an integer" or a call "always hits the same method," and **speculatively compiles** specialized fast code assuming that stays true (crucial for dynamic languages where types aren't known statically).
- It inserts **guards** — cheap runtime checks that the assumption still holds.
- If a guard **fails** (the value is suddenly a string, a new type appears), the JIT **deoptimizes** — throws away the specialized code and falls **back to the interpreter** (or recompiles) for that case.
So the JIT bets on observed patterns for speed, with guards + deoptimization as the safety net. This is how JS engines make dynamically-typed code fast — by speculating it behaves monomorphically.

## Tiered Compilation

Real JITs use **multiple tiers** balancing compile cost vs code quality:
- **Tier 0** — interpreter (instant start, slow execution).
- **Tier 1** — a **quick** JIT (fast to compile, lightly optimized) for warm code.
- **Tier 2+** — an **optimizing** JIT (slow to compile, heavily optimized) for the hottest code.
Code is promoted up tiers as it proves hot, so you pay expensive optimization **only** where it pays off.

## JIT vs AOT

- **JIT** — adapts to actual runtime behavior (speculative optimization, profile-guided), great for dynamic languages and long-running processes; costs **warmup** time and memory, and startup is slower.
- **AOT** — compiles everything up front: **fast startup**, predictable, no warmup, smaller memory — but **can't** use runtime information, so it's more conservative. Better for short-lived programs, CLIs, and startup-sensitive workloads.
- Some systems combine them (AOT for startup + JIT for peak, or profile-guided AOT).

## Pitfalls (in understanding/using)

- Benchmarking **without warmup** → measuring the interpreter/compiling phase, not steady-state; JIT numbers need warmup.
- Assuming a JIT'd language is **always** slow (interpreted) or **always** fast — it depends on warmup and how well code stays monomorphic.
- Writing **megamorphic** / type-unstable code (a variable that's many different types) → guards fail, deopt thrashes, speed collapses; keep types stable on hot paths.
- Expecting JIT benefits in **short-lived** processes (CLIs, serverless cold starts) → they die before warming up; AOT often wins there.
- Ignoring **memory/startup** cost of the JIT for latency-sensitive startup.
- Confusing **JIT** (compile at runtime) with **AOT** (compile before running) — different trade-offs, sometimes combined.
