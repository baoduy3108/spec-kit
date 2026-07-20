---
name: segment-and-fenwick-trees
description: How segment trees and Fenwick (binary indexed) trees answer range queries efficiently — turning O(n) range sums/mins into O(log n) with O(log n) updates, lazy propagation for range updates, and when to use which. Use when a problem needs repeated range queries with updates (range sum/min/max), or in competitive programming.
category: engineering
keywords_vi: segment tree, fenwick tree binary indexed tree, truy vấn khoảng range query, tổng đoạn range sum update, o(log n), lazy propagation, cây phân đoạn
---

# Segment Trees & Fenwick Trees

These data structures answer **range queries** (sum/min/max over a subarray) **with updates** efficiently. The problem: given an array, repeatedly ask "sum of elements from index i to j" **and** "change element k" — naive gives `O(n)` per query or per update. These structures make both `O(log n)`.

## The Problem They Solve

- **Naive array** — query a range: `O(n)`; update an element: `O(1)`. Bad if you query often.
- **Prefix-sum array** — query a range sum: `O(1)`; but **update: `O(n)`** (rebuild prefixes). Bad if you update often.
When you need **both** frequent range queries **and** updates, you need `O(log n)` for each — that's segment/Fenwick trees.

## Fenwick Tree (Binary Indexed Tree)

A compact, elegant structure for **prefix-sum-style** queries with point updates:
- Stores partial sums indexed by the binary representation of positions (each index covers a range determined by its lowest set bit).
- **Point update** and **prefix-sum query** in `O(log n)` using bit tricks (`i & -i` to jump).
- Very small code, low constant factor, `O(n)` memory.
Best for **sum** (and other invertible operations) with **point updates + prefix/range-sum queries**. It's the go-to when it fits — simpler and faster than a segment tree.

## Segment Tree (more general)

A binary tree where each node stores an aggregate (sum/min/max/gcd…) over a **segment** of the array; the root covers the whole array, leaves are single elements.
- **Query** a range: combine `O(log n)` nodes that exactly tile the range.
- **Update** an element: update its leaf and the `O(log n)` ancestors.
More flexible than Fenwick — handles **min/max/gcd** and other associative operations, not just invertible sums. Uses `O(n)` memory (about 2–4n).

## Lazy Propagation (range updates)

Plain segment trees do **point** updates. To update a **whole range** at once (e.g. "add 5 to elements i..j") in `O(log n)`, use **lazy propagation**: mark a node with a pending update and only **push it down** to children when needed. This enables efficient range-update + range-query — powerful for competitive programming and interval problems.

## Choosing

- **Fenwick tree** — sum/prefix queries with point updates; smallest, fastest, simplest. Default when applicable.
- **Segment tree** — min/max/gcd/custom aggregates, or when you need **range updates** (with lazy propagation). More general, more code.
- If the array is **static** (no updates) → just use a **prefix-sum** array (`O(1)` queries) or a sparse table (for idempotent min/max) — don't over-engineer.

## Pitfalls (in understanding/using)

- Using these when the array is **static** — a prefix-sum array is simpler and faster (no updates needed).
- Reaching for a **Fenwick** tree for min/max — it's for invertible ops (sum); use a segment tree for min/max.
- Forgetting **lazy propagation** for range updates (point-update segment trees are `O(n)` for a range update).
- Off-by-one and 1-indexing bugs (Fenwick trees are classically 1-indexed) — a common source of errors.
- Over-engineering an interview/simple problem — reach for these only when repeated range-query-with-update is the actual need.
- Memory: segment trees need ~2–4n; size them correctly.
