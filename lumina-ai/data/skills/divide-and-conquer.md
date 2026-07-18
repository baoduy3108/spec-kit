---
name: divide-and-conquer
description: The divide-and-conquer paradigm — break a problem into smaller subproblems, solve recursively, combine results. Covers merge sort, quicksort, binary search, the master theorem for recurrences, and when it applies. Use when designing recursive algorithms, analyzing recurrence complexity, or recognizing divide-and-conquer problems.
category: engineering
keywords_vi: divide and conquer, chia để trị, chia nhỏ đệ quy rồi gộp, merge sort quicksort, master theorem, đệ quy phân tích độ phức tạp, thuật toán đệ quy
---

# Divide and Conquer

Divide-and-conquer is a fundamental algorithm-design paradigm: **break** a problem into smaller instances of the same problem, **solve** those recursively, and **combine** their solutions into the answer. Many of the most important algorithms follow this shape.

## The Three Steps

1. **Divide** — split the problem into subproblems (usually 2+ smaller pieces).
2. **Conquer** — solve each subproblem **recursively** (base case for the smallest).
3. **Combine** — merge the subproblem solutions into the full solution.
The "combine" step is often where the real work (and the algorithm's character) lives.

## Classic Examples

- **Merge sort** — divide the array in half, sort each half recursively, then **merge** two sorted halves (the combine step). `O(n log n)`, stable, predictable — the combine (merging) does the work.
- **Quicksort** — **partition** around a pivot (the divide does the work here), then recurse on each side; little combine needed. `O(n log n)` average, `O(n²)` worst (bad pivots), but fast in practice and in-place.
- **Binary search** — halve the search space each step (see binary-search-patterns). `O(log n)`.
- **Fast algorithms** — Karatsuba multiplication, FFT, closest-pair, Strassen's matrix multiply — all beat naive methods via divide-and-conquer.

## Analyzing the Cost: the Master Theorem

Divide-and-conquer runtimes follow **recurrences** like `T(n) = a·T(n/b) + f(n)` (a subproblems, each size n/b, plus f(n) to divide/combine). The **master theorem** gives the complexity by comparing f(n) to `n^(log_b a)`:
- If dividing/combining is cheap relative to the subproblems → subproblems dominate.
- If it's expensive → the combine dominates.
- If balanced → a log factor appears.
E.g. merge sort: `T(n) = 2T(n/2) + O(n)` → `O(n log n)`. This is how you reason about recursive algorithm cost.

## When It Applies

- The problem **decomposes** into independent same-type subproblems.
- Subproblem solutions **combine** into the whole.
- Especially good for **parallelism** — independent subproblems run concurrently (see concurrency-and-parallelism).
Contrast with **dynamic programming** (see dynamic-programming-patterns), which is for **overlapping** subproblems (reuse results); divide-and-conquer subproblems are typically **disjoint**.

## Pitfalls (in understanding/using)

- Applying it when subproblems **overlap** — you'll recompute work; use DP (memoization) instead.
- Ignoring the **combine** cost — an expensive merge can dominate and negate the benefit.
- **Deep recursion** → stack overflow for large inputs; consider iterative/explicit-stack versions or tail optimization.
- Poor **base case** / pivot choice (quicksort's `O(n²)`) — randomize or use medians.
- Over-dividing tiny inputs — recursion overhead exceeds savings; switch to a simple method below a threshold (many sorts do insertion sort for small subarrays).
- Forgetting subproblems must be **independent** for the paradigm (and for safe parallelization).
