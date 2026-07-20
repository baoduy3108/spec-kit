---
name: sorting-algorithms
description: How the major sorting algorithms work and when to use each — quicksort, merge sort, heapsort, insertion sort, and non-comparison sorts (counting/radix); the O(n log n) comparison lower bound, stability, in-place vs extra memory, and what real library sorts (Timsort/introsort) do. Use to understand sorting algorithms, choosing a sort, stability, or why library sort is usually enough.
category: engineering
keywords_vi: sorting algorithm, thuật toán sắp xếp, quicksort, merge sort, heapsort, insertion sort, counting radix sort, stability ổn định, timsort introsort
---

# Sorting Algorithms

Sorting is one of the most-studied problems in computing, and understanding the trade-offs helps you choose (or trust your library) and reason about performance. The main axes: **time complexity, stability, memory (in-place?), and adaptivity.**

## The Comparison Lower Bound

Any sort that works by **comparing** elements needs at least **`O(n log n)`** comparisons in the worst case — a proven lower bound. So `O(n log n)` is optimal for general comparison sorts; you only beat it by **not comparing** (counting/radix, below), which needs special assumptions about the keys.

## The Main Comparison Sorts

- **Quicksort** — partition around a pivot, recurse (divide-and-conquer). `O(n log n)` average, **`O(n²)` worst** (bad pivots — mitigate with random/median pivots), **in-place**, cache-friendly, usually **fastest in practice**. Not stable.
- **Merge sort** — divide, sort halves, merge. **Guaranteed `O(n log n)`**, **stable**, but needs **`O(n)` extra memory**. Great when stability or worst-case guarantees matter, or for **external/linked** data.
- **Heapsort** — build a heap, repeatedly extract the max (see heap-priority-queue). **Guaranteed `O(n log n)`**, **in-place**, but poor cache behavior and not stable → rarely the fastest, but a solid worst-case in-place option.
- **Insertion sort** — `O(n²)`, but **excellent for small or nearly-sorted** arrays (adaptive, low overhead, stable). Real sorts use it for tiny subarrays.

## Non-Comparison Sorts (beating n log n)

When keys are small integers or fixed-width, you can sort in **`O(n)`**:
- **Counting sort** — count occurrences of each key value, then emit in order. Great for small key ranges.
- **Radix sort** — sort by digits/bytes, least- or most-significant first (using a stable sub-sort). Good for fixed-length integers/strings.
These trade generality (assumptions about keys) and extra memory for linear time.

## Stability

A **stable** sort preserves the relative order of equal elements. This matters when sorting by multiple keys (sort by name, then stably by date, and the name order within each date is preserved). Merge sort, insertion, counting are stable; quicksort and heapsort are not (without extra work).

## What Real Libraries Do

You rarely implement these — library sorts are highly optimized hybrids:
- **Timsort** (Python, Java objects) — merge sort + insertion sort, **adaptive** (exploits existing runs in real-world data), **stable**.
- **Introsort** (C++ `std::sort`) — quicksort that **switches to heapsort** if recursion goes too deep (avoiding quicksort's `O(n²)`), with insertion sort for small parts.
Trust these unless you have a special case (huge data, special keys, external sorting).

## Pitfalls (in understanding/using)

- **Reimplementing** a sort when the standard library's is faster and correct — only do so for special constraints.
- Using **quicksort** on adversarial/sorted input without random/median pivots → `O(n²)`.
- Assuming a sort is **stable** when it isn't (breaks multi-key sorting).
- Forgetting merge sort's **`O(n)` memory** cost (matters for huge arrays / embedded).
- Reaching for a comparison sort when keys allow **counting/radix** `O(n)`.
- Ignoring that **nearly-sorted** data makes insertion/Timsort near-linear — algorithm choice depends on the data, not just n.
