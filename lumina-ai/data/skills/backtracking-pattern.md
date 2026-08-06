---
name: backtracking-pattern
description: The backtracking technique for exhaustive search — build a solution incrementally, and abandon (prune) a partial path the moment it can't lead to a valid answer. Use for permutations, combinations, subsets, N-Queens, Sudoku, word search, and constraint-satisfaction problems.
category: engineering
keywords_vi: backtracking, quay lui, liệt kê hoán vị tổ hợp, tập con subset, n-queens sudoku, tìm kiếm vét cạn có cắt tỉa, constraint satisfaction, thuật toán quay lui
---

# Backtracking Pattern

Backtracking is a smart brute force: explore the decision tree of all possibilities depth-first, but **prune** branches that can't work as early as possible.

## The Shape

At each step you make a **choice**, recurse to make the next choice, then **undo** the choice (backtrack) to try the next option:
```
def backtrack(state, choices):
    if state is a complete solution:
        record it; return
    for choice in choices:
        if choice is valid given state:   # prune here
            apply choice to state
            backtrack(state, next choices)
            undo choice from state        # the "back" in backtracking
```
The undo step is what lets one recursion tree explore all paths without copying state everywhere.

## Classic Uses

- **Subsets / combinations** — at each element, choose "include" or "skip"; use a start index to avoid reusing/reordering.
- **Permutations** — choose each unused element in turn; track used.
- **N-Queens / Sudoku** — place a piece/number only if it doesn't violate constraints; recurse; remove on failure.
- **Word search / maze / path enumeration** — move to a valid neighbor, mark visited, recurse, unmark.
- **Partitioning / expression building** — split at valid points.

## Pruning Is Everything

Naive backtracking is exponential. The art is **cutting branches early**: check validity *before* recursing (don't place a queen in an attacked square), sort to enable early termination, skip duplicates (sort + "skip if same as previous and previous not used"), and use bitmasks/sets for O(1) constraint checks. Good pruning turns "impossible" into "instant."

## Complexity & When to Use

Backtracking explores up to all combinations, so it's exponential — appropriate when the input is **small** (n ≤ ~20 for subsets/permutations) or pruning is strong. If the problem has overlapping subproblems and optimal substructure, **dynamic programming** may replace the exponential search with polynomial time — check for that first on "count/optimize" variants. Backtracking shines when you must **enumerate** or **find any/all** valid configurations.

## Pitfalls

- **Forgetting to undo** state → corrupts sibling branches (the #1 bug).
- **Not pruning** → times out.
- Duplicate results from not handling repeated elements (sort + skip).
- Mutating a shared list and recording it by reference — record a copy.
