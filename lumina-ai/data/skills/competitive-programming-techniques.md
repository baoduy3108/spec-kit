---
name: competitive-programming-techniques
description: Competitive programming (thi chuyên Tin / olympiad informatics) — problem-solving strategy, complexity and constraints reading, core algorithms and data structures, dynamic programming, graph algorithms, greedy, and contest technique. Use for competitive programming, algorithm contests (ICPC/IOI/Codeforces), thi HSG Tin, or solving algorithmic problems under constraints.
category: knowledge
keywords_vi: lập trình thi đấu thi chuyên tin olympiad, chiến lược giải bài và đọc ràng buộc độ phức tạp, thuật toán và cấu trúc dữ liệu cốt lõi, quy hoạch động, thuật toán đồ thị, tham lam greedy, kỹ thuật thi codeforces icpc
---

# Competitive Programming Techniques (Thi chuyên Tin)

Competitive programming solves **algorithmic problems under tight time/memory limits**, scored by correctness and efficiency. It's the core of informatics olympiads (HSG Tin, IOI, ICPC, Codeforces). Success needs a toolbox of algorithms *plus* the judgment to pick the right one for the constraints.

## Reading Constraints → Choosing Complexity

The first, crucial skill: **constraints tell you the intended complexity.**
- n ≤ 20 → exponential (2ⁿ, bitmask/backtracking) is fine. n ≤ 500 → O(n³). n ≤ 5000 → O(n²). n ≤ 10⁵–10⁶ → O(n log n) or O(n). n ≤ 10⁹ → O(log n) or math.
- Time limits (~10⁸ operations/second) let you back-calculate the required Big-O (see algorithms-and-complexity). Reading constraints *first* prevents solving the wrong-complexity approach.

## Core Data Structures

- **Arrays, prefix sums** (range-sum queries in O(1)), **two pointers**, **sliding window**.
- **Stacks/queues, monotonic stack/deque**, **priority queue (heap)**.
- **Hash maps/sets**, **sorting** + binary search (lower/upper bound).
- **Union-Find (DSU)** — near-O(1) merge/find, for connectivity.
- **Segment tree / Fenwick (BIT)** — range queries + point/range updates in O(log n). Essential for many hard problems.

## Key Algorithm Families

- **Binary search** — on answer (search the *result* space for monotone-feasible problems) — a powerful, widely-applicable trick.
- **Two pointers / sliding window** — linear-time subarray/subsequence problems.
- **Greedy** — make locally-optimal choices; prove correctness (exchange argument) or it fails.
- **Divide and conquer.**

## Dynamic Programming (The Big One)

DP is central and heavily tested:
- **Define the state** (what subproblem), the **transition** (recurrence), and **base cases**; ensure no cycles (topological order).
- **Classic DPs** — knapsack, longest common/increasing subsequence, edit distance, interval DP, digit DP, **bitmask DP** (small n), tree DP, DP on subsets.
- **Optimizations** — memoization vs tabulation; space reduction; convex-hull trick, divide-and-conquer optimization (advanced).
- The skill is *recognizing* a problem as DP and formulating the state cleanly.

## Graph Algorithms

- **Traversal** — BFS (shortest path in unweighted), DFS (connectivity, cycles, topological sort).
- **Shortest paths** — Dijkstra (non-negative weights), Bellman-Ford (negative), Floyd-Warshall (all-pairs).
- **MST** — Kruskal (with DSU), Prim.
- **Advanced** — strongly connected components, LCA, max-flow/min-cut, bipartite matching.

## Contest Technique

- **Read all problems first**; start with the easiest (solve by expected difficulty, not order).
- **Edge cases** — empty input, n=1, overflow (use 64-bit!), boundaries. Test before submitting.
- **Complexity check** — verify your solution fits the limits *before* coding.
- **Debugging** — stress-testing (brute vs fast on random cases), careful I/O, and knowing common pitfalls (integer overflow, off-by-one, uninitialized).
- **Implementation speed** — clean, bug-resistant code and a personal template library.

Master competitive programming by **reading constraints to choose the target complexity**, wielding the **core data structures** (prefix sums, DSU, segment tree/BIT, heaps), the **algorithm families** (binary search including on-the-answer, two-pointers, greedy), especially **dynamic programming** (state/transition/base, the classic patterns), and **graph algorithms** (BFS/DFS, Dijkstra, MST, flows) — plus disciplined **contest technique** (easiest-first, edge cases, overflow, stress-testing). Recognizing which tool fits the constraints and implementing it cleanly under pressure is exactly what thi-chuyên-Tin and algorithm contests reward.
