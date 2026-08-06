---
name: tail-calls-and-continuations
description: Why some recursive functions run in constant stack space and others overflow — tail calls and tail-call optimization (TCO) — and the deeper idea of continuations (the "rest of the computation" as a value), CPS, and how async/await and generators are continuations in disguise. Use to understand stack overflow vs constant-space recursion, why loops and tail recursion are equivalent, and what "saving the rest of the program" means.
category: systems-internals
keywords_vi: lời gọi đuôi tail call và tối ưu tco chạy đệ quy trong không gian stack hằng số, vì sao đệ quy thường tràn stack còn đệ quy đuôi thì không, tiếp diễn continuation là phần còn lại của tính toán như một giá trị, phong cách truyền tiếp diễn cps, async await và generator là continuation trá hình, vòng lặp và đệ quy đuôi tương đương
---

# Tail Calls & Continuations

Two related ideas explain a lot of "why does this recurse forever without overflowing?" and "how does async/await actually pause and resume?": **tail calls** (a call in tail position that needs no stack frame after it) and **continuations** (the entire "rest of the computation" captured as a value). Both are about **what has to be remembered** while a computation is in flight (see how-interpreters-work, functional-programming-principles, event-loop-and-async-io).

## Tail Position and TCO

A call is in **tail position** if it's the **last thing** a function does — its result is returned directly, with nothing left to compute afterward:

```
factorial(n, acc):
  if n == 0: return acc
  return factorial(n-1, acc*n)   # tail call: nothing happens after it returns
```

Because there's **no work left** in the caller after this call, the caller's stack frame is useless — it doesn't need to "come back". **Tail-Call Optimization (TCO)** reuses the current frame instead of pushing a new one, so a tail-recursive function runs in **constant stack space**, exactly like a loop. Without TCO the same recursion pushes a frame per call and **overflows** for large `n`.

Contrast **non-tail** recursion, where work remains after the call:
```
return n * factorial(n-1)   # must multiply AFTER the call returns → frame must persist
```
Here each frame *must* be kept (to do the multiply), so stack grows with depth.

## Loops ≡ Tail Recursion

Any loop can be written as tail recursion and vice versa — they're the same shape (iterate with an accumulator, no growing stack). Languages that guarantee TCO (Scheme, and via patterns in Scala/Clojure/Erlang) let you write recursion where you'd otherwise need a loop. Many languages (CPython, most JS engines) **don't** guarantee TCO, so deep recursion overflows — use an explicit loop or an explicit stack.

## Continuations: the Rest of the Program

A **continuation** reifies "**what to do next**" — the entire remaining computation — as a value you can hold and invoke. In **Continuation-Passing Style (CPS)**, functions don't *return*; they take an extra argument `k` (the continuation) and **call it** with the result. Every call becomes a tail call. This is the theoretical backbone of control flow.

You already use continuations disguised as language features:
- **async/await** — awaiting suspends the function, capturing "the rest after the await" as a continuation the runtime resumes when the awaited value is ready.
- **Generators / coroutines** — `yield` saves a continuation and hands control back; resuming re-enters where you left off.
- **Callbacks / promises**, **exceptions** (non-local exit), **green threads** — all are continuation machinery.

## Design Guidance (for understanding/using)

- **Know whether your language guarantees TCO** — if not, don't rely on deep tail recursion; use a loop or manual stack.
- **Make recursion tail-recursive with an accumulator** where you need bounded stack and the language supports TCO.
- **Recognize async/await and generators as continuations** — that mental model explains suspension/resumption and why state is preserved across `await`.
- **Prefer iteration** in languages without TCO for large inputs to avoid stack overflow.

## Pitfalls (in understanding/using)

- Assuming tail recursion is always optimized → in Python/most JS it is **not**; you'll overflow.
- Writing "almost tail" recursion (a `+ 1` or `* n` after the call) → it's **not** in tail position; the frame must persist.
- Very deep non-tail recursion on large inputs → stack overflow; convert to a loop/explicit stack.
- Thinking async/await runs on threads → it's continuation-based suspension on one thread (usually), not parallelism.
- Confusing tail-call elimination (space) with inlining (call removal) — different optimizations.
