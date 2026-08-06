---
name: graph-traversal
description: Traverse graphs with BFS and DFS — representation (adjacency list), visited-set to avoid infinite loops, BFS for shortest path in unweighted graphs and level-order, DFS for connectivity/cycles/backtracking, plus grid-as-graph problems. Use for connectivity, shortest unweighted path, flood fill, cycle detection, and "islands"/maze problems.
category: engineering
keywords_vi: graph traversal, duyệt đồ thị, bfs dfs, tìm đường ngắn nhất không trọng số, flood fill, đếm đảo islands, đồ thị kề adjacency, level order
---

# Graph Traversal (BFS & DFS)

Most graph problems reduce to visiting nodes systematically without revisiting. Represent the graph as an **adjacency list** (node → its neighbors), and always keep a **visited set** — without it, cycles cause infinite loops.

## BFS — Breadth-First (a queue)

Explore level by level from the source using a **queue**:
```
queue = [start]; visited = {start}
while queue:
    node = queue.popleft()
    for nb in adj[node]:
        if nb not in visited:
            visited.add(nb); queue.append(nb)
```
- **Shortest path in an unweighted graph** — BFS reaches every node in the fewest edges; track distance/parent as you go. This is BFS's killer feature.
- **Level-order** traversal (trees, "minimum steps" problems, word ladder).
- Multi-source BFS (start with several nodes in the queue) for "nearest of any source."

## DFS — Depth-First (recursion or a stack)

Go as deep as possible, then backtrack:
```
def dfs(node):
    visited.add(node)
    for nb in adj[node]:
        if nb not in visited: dfs(nb)
```
- **Connectivity / connected components** — count how many DFS/BFS calls it takes to cover all nodes.
- **Cycle detection** — in a directed graph, a back-edge to a node in the current recursion stack means a cycle (three-color marking).
- **Path enumeration / backtracking**, topological-sort DFS, flood fill.
- Watch recursion depth on huge graphs — use an explicit stack if stack overflow is a risk.

## Grid = Graph

Many "matrix" problems are graphs where each cell connects to its 4 (or 8) neighbors: **number of islands**, **flood fill**, **shortest path in a maze** (BFS), **rotting oranges** (multi-source BFS). Map (row,col) to nodes and reuse the templates.

## Choosing BFS vs DFS

- **Shortest path (unweighted), nearest, minimum steps → BFS.**
- **Connectivity, cycle detection, enumerate paths, topological order, or "just visit everything" → DFS** (simpler recursively).
- **Weighted shortest path → Dijkstra**, not plain BFS (BFS assumes equal edge cost).

## Pitfalls

- **Missing visited set** → infinite loop on cycles (or revisiting cost).
- Marking visited at the **wrong time** in BFS (mark on enqueue, not dequeue, to avoid duplicates in the queue).
- Confusing "shortest edges" (BFS) with "shortest weighted distance" (needs Dijkstra).
- Directed vs undirected edges when building the adjacency list.
