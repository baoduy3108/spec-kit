---
name: sliding-window-pattern
description: The sliding-window technique for subarray/substring problems — maintain a window [left,right] over a sequence, expand right to include, shrink left to satisfy a constraint, tracking a running aggregate in O(n) instead of O(n²). Use for "longest/shortest/count of contiguous subarray/substring meeting a condition" problems.
category: engineering
keywords_vi: sliding window, cửa sổ trượt, chuỗi con liên tiếp, subarray substring dài nhất, tối ưu vòng lặp lồng nhau, thuật toán cửa sổ, longest substring
---

# Sliding Window Pattern

Turns many O(n²) brute-force scans of contiguous subarrays/substrings into O(n) by maintaining a window instead of re-scanning.

## When It Applies

The problem asks about a **contiguous** subarray or substring and a condition like: longest/shortest window satisfying X, the count of windows, or a best sum/average of a window. Signal words: "contiguous", "substring", "subarray", "consecutive".

## The Technique

Keep two pointers `left` and `right` defining the current window, plus a running state (sum, counts, a frequency map):
1. **Expand** — move `right` forward, adding the new element into the window state.
2. **Check/shrink** — while the window violates the constraint (or to find the optimum), move `left` forward, removing elements from the state.
3. **Record** — update the answer with the current valid window.

Each element enters once (via right) and leaves once (via left) → **O(n)** total, even though the window resizes.

## Two Flavors

- **Fixed-size window** (size k) — slide by adding the new element and removing the one that fell off; track max sum/average, etc.
- **Variable-size window** — grow right greedily; shrink left when a constraint breaks (e.g. "longest substring with no repeats" — shrink until no duplicate; "smallest subarray with sum ≥ target" — shrink while still ≥ target).

## Template (variable window)

```
left = 0; state = empty; best = init
for right in range(n):
    add s[right] to state
    while window invalid:
        remove s[left] from state; left += 1
    best = update(best, right - left + 1)
```

## Common Pitfalls

- **Forgetting to update state on shrink** — removing from `left` must undo exactly what adding did.
- **Off-by-one on window size** — it's `right - left + 1`.
- Using it on **non-contiguous** problems — sliding window only works when the answer is a contiguous run; subsequences need DP.
- Not resetting/handling the frequency map correctly (counts hitting zero).
