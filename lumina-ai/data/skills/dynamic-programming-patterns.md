---
name: dynamic-programming-patterns
description: Solve problems with dynamic programming — recognize overlapping subproblems and optimal substructure, define the state and recurrence, then memoize (top-down) or tabulate (bottom-up), plus space optimization. Covers the classic families (knapsack, LIS, edit distance, grid paths, interval DP). Use for count/min/max/"can it be done" problems with reusable subresults.
category: engineering
keywords_vi: dynamic programming, quy hoạch động, dp, đệ quy có nhớ memoization, tabulation, knapsack ba lô, longest increasing subsequence, edit distance, đếm số cách
---

# Dynamic Programming Patterns

DP solves a big problem by combining answers to overlapping subproblems, computing each subproblem **once**. It turns exponential recursion into polynomial time.

## Recognize It

Two signals must both hold:
- **Overlapping subproblems** — the naive recursion recomputes the same inputs many times (Fibonacci, grid paths).
- **Optimal substructure** — the optimal answer is built from optimal answers to subproblems.
Trigger phrases: "count the number of ways", "minimum/maximum cost/length", "is it possible to…", "longest/shortest …" where greedy doesn't work.

## The Method

1. **Define the state** — what parameters uniquely identify a subproblem? (index, remaining capacity, position, last choice). This is the hardest and most important step.
2. **Write the recurrence** — express `dp[state]` in terms of smaller states (the transition/choice).
3. **Base cases** — the smallest states' answers.
4. **Order / memoize** — top-down memoization (recursion + cache) or bottom-up tabulation (fill a table in dependency order).
5. **Answer** — read it off the final state.

## Top-Down vs Bottom-Up

- **Top-down (memoization)** — write the natural recursion, cache results by state. Easiest to derive; only computes needed states.
- **Bottom-up (tabulation)** — fill an array iteratively in order; no recursion overhead, and enables **space optimization** (often you only need the last row/few values → O(1) or O(n) space instead of O(n²)).

## Classic Families (recognize the shape)

- **0/1 knapsack** — pick items under a capacity: `dp[i][w]`. (Subset-sum, partition are variants.)
- **Longest Increasing Subsequence** — `dp[i]` = best ending at i (O(n²), or O(n log n) with binary search).
- **Edit distance / LCS** — two-sequence DP on `dp[i][j]`.
- **Grid paths** — `dp[i][j]` from neighbors (min path sum, unique paths).
- **Interval DP** — `dp[i][j]` over a range (matrix-chain, burst balloons, palindrome partitioning).
- **DP on trees / bitmask DP** for small-set state.

## Pitfalls

- **Wrong/insufficient state** — if the recurrence needs info the state doesn't capture, add a dimension.
- **Greedy where DP is needed** — a locally best choice isn't always globally optimal; if a counterexample exists, use DP.
- **Base cases / bounds** off by one.
- Over-large state (memory blow-up) — look for a dimension to drop via space optimization.
- If subproblems **don't** overlap, DP adds nothing — plain recursion/divide-and-conquer is right.
