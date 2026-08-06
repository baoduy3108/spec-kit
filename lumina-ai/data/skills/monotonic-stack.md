---
name: monotonic-stack
description: The monotonic-stack technique — keep a stack whose values stay increasing or decreasing to answer "next/previous greater or smaller element" queries and related problems in O(n). Use for next-greater-element, daily-temperatures, largest-rectangle-in-histogram, stock-span, and trapping-rain-water style problems.
category: engineering
keywords_vi: monotonic stack, ngăn xếp đơn điệu, next greater element, phần tử lớn hơn kế tiếp, largest rectangle histogram, trapping rain water, thuật toán stack, daily temperatures
---

# Monotonic Stack

A monotonic stack is a normal stack kept sorted (always increasing or always decreasing) by popping elements that violate the order before pushing. It answers "nearest greater/smaller element" questions in a single O(n) pass instead of O(n²).

## The Core Move

Iterate the array once. Before pushing the current element, **pop everything on the stack that the current element "resolves."** The popped elements found their answer (the current element is their next-greater/smaller); the element left on top after popping is the *previous* greater/smaller.

```
# Next greater element to the right
stack = []            # holds indices, values decreasing
for i in range(n):
    while stack and a[i] > a[stack[-1]]:
        j = stack.pop()
        answer[j] = a[i]        # a[i] is j's next greater
    stack.append(i)
# indices still on the stack have no next greater
```
Each index is pushed and popped at most once → **O(n)** total.

## Which Direction?

- **Decreasing stack** (pop when current is larger) → finds **next greater** (or previous greater, depending on which side you read).
- **Increasing stack** (pop when current is smaller) → finds **next/previous smaller**.
Choose the invariant from what "resolves" an element.

## Classic Problems

- **Next Greater Element / Daily Temperatures** — how many days until a warmer day.
- **Largest Rectangle in Histogram** — for each bar, the nearest smaller bars on each side bound its widest rectangle; monotonic stack finds them in O(n).
- **Trapping Rain Water** — water bounded by nearest taller bars (stack or two-pointer).
- **Stock span**, **remove-k-digits to make smallest number**, **sum of subarray minimums**.

## Recognizing It

Signal: the problem asks about the **nearest element greater/smaller** than each element, or areas/spans bounded by taller/shorter neighbors, and a brute force is O(n²) nested comparison. A monotonic stack collapses it to O(n).

## Pitfalls

- Store **indices** (not just values) when you need distances/widths.
- Get the pop condition (`>` vs `>=`) right for handling equal elements (affects duplicates).
- Remember to handle elements **left on the stack** at the end (they have no answer / hit the boundary).
