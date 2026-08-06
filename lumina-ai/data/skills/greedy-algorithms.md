---
name: greedy-algorithms
description: Design greedy algorithms — make the locally optimal choice at each step, but only when a greedy-choice property and optimal substructure guarantee it's globally optimal. Covers interval scheduling, Huffman, and how to prove (or disprove) a greedy works vs when DP is required. Use for optimization problems where a simple sorted/local rule might yield the optimum.
category: engineering
keywords_vi: greedy, thuật toán tham lam, chọn tối ưu cục bộ, interval scheduling, xếp lịch, huffman, tham lam có đúng không, tối ưu hóa
---

# Greedy Algorithms

A greedy algorithm builds a solution step by step, always taking the choice that looks best **right now**, never reconsidering. When it works, it's simple and fast (often just a sort + a pass). The danger: greedy is frequently *wrong*.

## When Greedy Is Correct

Greedy gives the global optimum only if the problem has:
- **Greedy-choice property** — a globally optimal solution can be reached by making locally optimal choices (the current best choice is safe, never needs undoing).
- **Optimal substructure** — after the greedy choice, the remaining subproblem is solved the same way.

**Prove it before trusting it.** Two techniques: an **exchange argument** (show any optimal solution can be transformed into the greedy one without getting worse) or show greedy "stays ahead" at every step. If you can construct a **counterexample** where local-best leads to a worse global result, greedy is wrong — use DP.

## Classic Correct Greedies

- **Interval scheduling (max non-overlapping)** — sort by **earliest finish time**, take each that doesn't conflict. (Sorting by start or by length is a tempting *wrong* greedy — a good example of why proof matters.)
- **Huffman coding** — repeatedly merge the two least-frequent nodes → optimal prefix code.
- **Fractional knapsack** — take highest value/weight ratio first (works because items are divisible — unlike 0/1 knapsack, which needs DP).
- **Dijkstra / Prim / Kruskal** — greedy on a priority queue / sorted edges (correctness proven).
- **Coin change** — greedy works only for *canonical* coin systems, not arbitrary ones (a classic trap — general coin change needs DP).

## The Greedy-vs-DP Decision

Both target optimization. **Greedy** commits to one choice per step (fast, but only if the greedy property holds). **DP** considers all choices and combines subproblem results (always correct for optimal-substructure problems, but slower). If a simple sorted/local rule is provably optimal → greedy; if local choices can lead astray and subproblems overlap → DP. When unsure, try to break greedy with a counterexample first.

## Method & Pitfalls

1. Find the greedy choice (usually revealed by sorting on the right key).
2. Argue it's safe (exchange argument) or find a counterexample.
3. Implement (typically sort + single pass, O(n log n)).

Pitfalls: **assuming greedy works without proof** (the #1 mistake), sorting by the wrong key, and applying it to non-canonical/indivisible problems (0/1 knapsack, arbitrary coin systems) where it silently returns suboptimal answers.
