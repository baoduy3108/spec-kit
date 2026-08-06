---
name: union-find
description: The union-find / disjoint-set-union (DSU) data structure — track a partition of elements into connected groups with near-O(1) union and find, using union by rank/size and path compression. Use for connectivity, counting connected components, cycle detection in undirected graphs, Kruskal's MST, and dynamic grouping/equivalence problems.
category: engineering
keywords_vi: union find, disjoint set, dsu, gộp nhóm, thành phần liên thông connected components, phát hiện chu trình đồ thị, kruskal mst, cấu trúc gộp tập hợp
---

# Union-Find (Disjoint Set Union)

Union-Find maintains a collection of disjoint sets and answers "are these two in the same set?" and "merge these two sets" in near-constant amortized time. It's the go-to for dynamic connectivity and grouping.

## The Idea

Each element points to a **parent**; following parents leads to a **root** that represents the set. Two elements are in the same set iff they share a root.
- **find(x)** — follow parents to the root (the set's id).
- **union(a, b)** — link the root of one set to the root of the other, merging them.

## The Two Optimizations (both essential)

Naive trees can degrade to O(n) chains. Two tricks make operations effectively O(α(n)) ≈ O(1):
- **Path compression** — during `find`, repoint every node on the path directly to the root, flattening the tree for next time.
- **Union by rank/size** — always attach the smaller/shorter tree under the larger's root, keeping trees shallow.
Together they give inverse-Ackermann (practically constant) amortized cost.

```
parent[i] = i; size[i] = 1
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path compression
        x = parent[x]
    return x
def union(a,b):
    ra, rb = find(a), find(b)
    if ra == rb: return False   # already connected
    if size[ra] < size[rb]: ra, rb = rb, ra
    parent[rb] = ra; size[ra] += size[rb]; return True
```

## When to Reach For It

- **Connected components / connectivity** — count groups, test if two nodes are connected, incrementally as edges are added.
- **Cycle detection in an undirected graph** — if `union(a,b)` finds they're already connected, adding edge (a,b) forms a cycle.
- **Kruskal's MST** — add edges in weight order, using union-find to skip edges that would form a cycle.
- **Dynamic equivalence** — grouping accounts, merging regions, "islands" in a grid, percolation.

## Notes & Pitfalls

- Union-Find handles **incremental** merging well but **not** efficient splitting (removing an edge) — it's union-only.
- The `union` returning whether a real merge happened is handy for cycle detection and counting components (decrement a counter on each successful union).
- For grid problems, map 2D cells to 1D indices.
- It answers connectivity, not shortest paths — use BFS/Dijkstra for distances.
