---
name: heap-priority-queue
description: The heap / priority queue — a tree-based structure giving O(log n) insert and O(1) peek / O(log n) pop of the min or max, and its patterns: top-k elements, streaming median (two heaps), merging k sorted lists, and scheduling. Use for "k largest/smallest", "kth element", running median, or repeatedly extracting the best/next item.
category: engineering
keywords_vi: heap, priority queue, hàng đợi ưu tiên, top k phần tử, k lớn nhất nhỏ nhất, kth largest, median dòng dữ liệu, merge k sorted, min-heap max-heap
---

# Heap / Priority Queue

A heap keeps the min (or max) element instantly accessible while allowing efficient inserts and removals — perfect when you repeatedly need "the best remaining item."

## What It Gives You

- **peek** min/max — O(1).
- **push** — O(log n).
- **pop** min/max — O(log n).
It's a binary tree stored in an array where each parent is ≤ (min-heap) or ≥ (max-heap) its children — the **heap property**. Most languages ship one (`heapq` in Python is a min-heap; use negatives or a max-heap wrapper for max).

## Core Patterns

- **Top-k largest/smallest** — keep a heap of size k: for k largest, use a **min-heap** of size k and pop the smallest whenever it grows past k; the heap ends holding the k largest. O(n log k), better than sorting O(n log n) when k ≪ n.
- **Kth largest/smallest** — same size-k heap; its root is the answer (great for streaming data).
- **Merge k sorted lists/arrays** — push the head of each list; pop the smallest, push its successor. O(N log k).
- **Streaming median (two heaps)** — a max-heap for the lower half and a min-heap for the upper half, balanced in size; the median is a root (or their average). Handles a running stream.
- **Scheduling / Dijkstra / Prim / A*** — repeatedly extract the next-best (soonest task, nearest node).
- **"Process events in priority order"** — the general shape.

## When to Use It

You need the **extreme** element repeatedly but don't need everything fully sorted. Sorting once is O(n log n) and static; a heap is better when data **streams in**, when you only need **top-k** (size-k heap), or when you interleave inserts and extract-min. If you need the whole thing sorted once, just sort.

## Pitfalls

- **Min vs max** confusion — Python's `heapq` is min-only; negate values or store `(-priority, item)` for a max-heap.
- For top-k **largest**, counterintuitively use a **min**-heap of size k (evict the smallest); for top-k smallest, a max-heap.
- Storing tuples for priority — ensure ties don't try to compare unorderable items (add a tiebreaker counter).
- A heap gives the extreme, **not** sorted iteration or search — it's not a substitute for a sorted structure or a BST.
