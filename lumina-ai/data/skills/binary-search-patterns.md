---
name: binary-search-patterns
description: Binary search beyond "find in a sorted array" — the correct boundary template, finding leftmost/rightmost occurrences, and "binary search the answer" (search a monotonic predicate over a value range for min/max feasible value). Use for sorted-array lookups, first/last-position problems, and optimization problems with a monotonic feasibility check.
category: engineering
keywords_vi: binary search, tìm kiếm nhị phân, tìm vị trí đầu cuối, search the answer, min max thỏa điều kiện, chia đôi khoảng, thuật toán nhị phân, monotonic predicate
---

# Binary Search Patterns

Binary search is O(log n) — but its real power is searching *any* monotonic space, not just sorted arrays. Off-by-one bugs are the classic pain; use a consistent template.

## The Core Template

Halve the search range each step. The reliable form uses a **half-open interval** and moves boundaries so it can't loop forever:
```
lo, hi = 0, n            # search space
while lo < hi:
    mid = lo + (hi - lo) // 2   # avoid overflow
    if condition(mid):
        hi = mid          # answer is mid or left
    else:
        lo = mid + 1      # answer is right of mid
return lo                 # first index where condition is true
```
Pick the invariant ("everything below lo is false, everything at/above the answer is true") and keep it consistent — that's what kills off-by-one bugs.

## Leftmost / Rightmost

For duplicates, don't stop at the first match — keep searching the correct side to find the **first** or **last** occurrence (lower/upper bound). This is how you count occurrences or find insertion points.

## Binary Search the Answer (the big one)

Many optimization problems have no sorted array but a **monotonic predicate**: "is a value v feasible?" is false up to some threshold and true after (or vice versa). Then binary-search the *value range* for the boundary:
- "Minimum capacity/speed to finish in time T" — feasibility is monotonic in capacity → binary search capacity, checking `canFinish(cap)`.
- "Split array into k parts minimizing the largest sum", "smallest divisor", "Koko eating bananas" — all this shape.
Recognize it when the problem asks for a min/max value subject to a checkable, monotonic condition — even without any array to search.

## Requirements & Pitfalls

- The space must be **monotonic** (sorted, or predicate flips once) — otherwise binary search is invalid.
- `mid = lo + (hi-lo)//2` avoids integer overflow and biases correctly.
- Decide `lo<hi` vs `lo<=hi` and update boundaries to match — mixing them causes infinite loops or missed answers.
- Define the search space bounds carefully (inclusive/exclusive) for "search the answer" problems.
