---
name: algorithms-and-complexity
description: Choose the right algorithm and data structure and reason about Big-O — time/space complexity, picking hash map vs tree vs array, the standard problem-solving patterns (two pointers, sliding window, binary search, BFS/DFS, dynamic programming, greedy), and recognizing which pattern a problem fits. Use when solving an algorithmic problem or improving a slow function's complexity.
category: engineering
keywords_vi: thuật toán, độ phức tạp, big-o, cấu trúc dữ liệu, tối ưu thuật toán, dynamic programming, binary search, chọn cấu trúc dữ liệu
---

# Algorithms & Complexity

The biggest speedups come from a better algorithm/data structure (lower Big-O), not micro-optimizing a bad one. Reduce the complexity class first.

## Big-O Quickly

Describe how work grows with input size n, worst case: `O(1)` constant, `O(log n)` (halving — binary search), `O(n)` linear scan, `O(n log n)` (good sorts, divide-and-conquer), `O(n²)` (nested loops over the input — a smell for large n), `O(2ⁿ)`/`O(n!)` (brute-force combinatorial — only for tiny n). Also track **space** complexity. A nested loop that's `O(n²)` on 10⁶ items is ~10¹² ops — hopeless; find the `O(n)`/`O(n log n)` version.

## Pick the Data Structure

- **Hash map/set** — `O(1)` average lookup/insert; the default for "have I seen this?", counting, dedup, grouping. Turns many `O(n²)` scans into `O(n)`.
- **Array/list** — `O(1)` index, `O(n)` search/insert-middle; cache-friendly, great for sequential access.
- **Balanced tree / sorted structure** — `O(log n)` ops *with order* (range queries, next-greater, ordered iteration) — when you need sorted-ness a hash map can't give.
- **Heap/priority queue** — `O(log n)` push/pop of the min/max; for "top-k", scheduling, Dijkstra.
- **Stack/queue/deque** — LIFO/FIFO for traversal, undo, BFS frontiers.

## Standard Patterns (recognize the shape)

- **Two pointers** — sorted array pair/triplet sums, in-place partitioning.
- **Sliding window** — longest/shortest contiguous subarray/substring meeting a condition.
- **Binary search** — sorted data, *or* "search the answer space" (min value satisfying a monotonic predicate).
- **BFS / DFS** — graph/tree traversal; BFS for shortest path in unweighted graphs, DFS for exhaustive/backtracking.
- **Dynamic programming** — overlapping subproblems + optimal substructure; define the state and recurrence, then memoize or tabulate. Signal: "count the ways", "min/max cost", "can it be partitioned".
- **Greedy** — a locally-optimal choice yields global optimum (prove it, or it's a trap); interval scheduling, Huffman.

## Method

Understand the problem and constraints (n's size tells you the target complexity) → brute force first for correctness → identify the bottleneck's Big-O → match to a pattern/data structure that lowers it → verify on edge cases (empty, single, duplicates, huge). Don't optimize below the dominant term — `O(n)` with a big constant still beats `O(n²)` at scale.
