---
name: sweep-line-algorithms
description: How sweep-line (plane sweep) algorithms work — processing geometric or interval events in sorted order as an imaginary line sweeps across, maintaining an active set, to solve problems like interval overlap/merging, segment intersection, and skyline. Use for interval scheduling/merging, detecting overlaps, computational geometry, or event-ordering problems.
category: engineering
keywords_vi: sweep line, đường quét, interval overlap, meeting rooms, xử lý sự kiện theo thứ tự, active set, gộp interval merge, hình học tính toán skyline
---

# Sweep-Line Algorithms

The sweep-line (plane-sweep) technique solves geometric and interval problems by imagining a line **sweeping** across the plane (usually left to right), processing **events** in sorted order and maintaining a set of currently "active" objects. It turns 2D geometry into a sequence of 1D updates — often reducing `O(n²)` brute force to `O(n log n)`.

## The Core Idea: Events in Sorted Order

Instead of comparing every pair of objects, you:
1. Identify **events** — the interesting x-coordinates (an interval's start/end, a segment's endpoints).
2. **Sort** events by position.
3. Sweep through them in order, maintaining an **active set** of objects the line currently intersects, updating it at each event and checking only **relevant neighbors** — not all pairs.
Sorting (`O(n log n)`) plus efficient active-set updates (often with a balanced tree/heap) gives the speedup. The key insight: things can only interact when the sweep line passes through both, so you only compare **temporally-adjacent** objects.

## Classic Applications

- **Interval overlap / merging** — sort interval endpoints; sweep, incrementing a counter on a "start" and decrementing on an "end." The counter tells you how many intervals overlap at any point (max concurrency, meeting-room count). Merging intervals is a 1D sweep. This is the everyday use.
- **Segment intersection** (Bentley-Ottmann) — sweep a vertical line across line segments, keeping the active segments **ordered by y**; intersections can only occur between segments **adjacent** in that order → find all intersections in `O((n+k) log n)` instead of `O(n²)`.
- **Skyline problem** — buildings' silhouette via sweeping x-coordinates with a max-heap of active heights.
- **Closest pair, area of union of rectangles, convex hull** (related sorting-based sweeps).

## The Meeting-Rooms Pattern (very common)

"Given intervals, how many rooms/resources needed at once?" Sort all **start** and **end** times; sweep in time order — a start means +1 active, an end means −1; the running **maximum** is the answer. This interval-scheduling sweep appears constantly (calendar overlaps, resource allocation, load-testing concurrency).

## Why It's Powerful

It reduces "check all pairs" (`O(n²)`) to "process sorted events, comparing only neighbors" (`O(n log n)`) by exploiting that interactions are **local** as the line moves. The active set (a heap or balanced BST) makes neighbor queries and updates `O(log n)`.

## Pitfalls (in understanding/using)

- **Event ordering ties** — when a start and end share a coordinate, the ordering (does the interval end before the next begins?) matters and defines whether touching intervals count as overlapping. Decide and sort tie-breaks deliberately.
- Choosing the wrong **active-set structure** — needs `O(log n)` insert/delete/neighbor (balanced BST/heap), or you lose the speedup.
- Forgetting to handle **both** endpoints as events (or vertical segments/degenerate cases in geometry).
- Applying it where a simpler one-pass suffices (sorted intervals merging is already a light sweep).
- Off-by-one in inclusive/exclusive interval boundaries → wrong overlap counts.
