---
name: two-pointers-pattern
description: The two-pointers technique — use two indices moving through data (opposite ends converging, or fast/slow) to solve pair-sum, palindrome, in-place partition/dedup, and cycle-detection problems in O(n) time and O(1) space. Use for sorted-array pair problems, in-place array rearrangement, or linked-list cycle/middle detection.
category: engineering
keywords_vi: two pointers, hai con trỏ, cặp tổng sorted array, đảo mảng tại chỗ, fast slow pointer, phát hiện chu trình linked list, palindrome, thuật toán con trỏ
---

# Two Pointers Pattern

Replace nested loops with two coordinated indices, solving many array/list problems in O(n) time and O(1) extra space.

## Variant 1: Opposite Ends (converging)

Two pointers start at both ends and move toward each other. Works on **sorted** arrays or symmetric checks:
- **Pair sum** — on a sorted array, `left`/`right`; if `a[left]+a[right] > target` move right in, else move left out. O(n) instead of O(n²).
- **Palindrome check** — compare `s[left]` and `s[right]`, move inward.
- **Container/area problems** — move the pointer at the limiting side.
- **3-sum** — fix one element, two-pointer the rest.

## Variant 2: Same Direction (slow/fast)

Both start at the front; one moves faster or conditionally:
- **In-place dedup/partition** — a slow "write" pointer and a fast "read" pointer; write only elements that should be kept (remove duplicates, move zeros to end, partition by a pivot). The array is rearranged in place.
- **Nth-from-end** — advance fast n steps, then move both until fast hits the end.

## Variant 3: Fast/Slow (Floyd's cycle detection)

On a linked list, `slow` moves 1 step, `fast` moves 2:
- If they **meet**, there's a **cycle** (and you can find its start).
- When `fast` reaches the end, `slow` is at the **middle**.
Detects cycles and finds the midpoint in O(n) time, O(1) space — no visited set needed.

## When to Reach For It

Sorted array + looking for a pair/triplet → converging pointers. In-place array rearrangement without extra space → slow/fast write pointer. Linked-list cycle/middle → Floyd's. Signal: "in-place", "O(1) space", "sorted", "pair", "palindrome".

## Pitfalls

- Converging-pointer pair-sum **requires sorted input** (sort first, or use a hash map instead if unsorted).
- Watch loop bounds (`left < right` vs `<=`) and pointer-crossing.
- For dedup, the slow pointer marks the next write position — return its final value as the new length.
