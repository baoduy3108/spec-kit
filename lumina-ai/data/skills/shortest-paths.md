---
name: shortest-paths
description: Weighted shortest-path algorithms — Dijkstra (non-negative weights, with a priority queue), Bellman-Ford (handles negative edges, detects negative cycles), 0-1 BFS, and A* (heuristic-guided). Use to find least-cost routes in a weighted graph and to pick the right algorithm for the edge weights and constraints.
category: engineering
keywords_vi: shortest path, đường đi ngắn nhất, dijkstra, bellman-ford, trọng số âm negative weight, a-star heuristic, tìm đường trọng số, thuật toán đường ngắn nhất
---

# Weighted Shortest Paths

When edges have weights (costs, distances, times), BFS no longer gives the shortest path — you need a weight-aware algorithm. Pick by the edge weights.

## Dijkstra (the default)

For graphs with **non-negative** edge weights. Greedily expand the closest-unfinalized node using a **min-priority queue**:
```
dist = {start: 0}; pq = [(0, start)]
while pq:
    d, u = heappop(pq)
    if d > dist[u]: continue          # stale entry
    for v, w in adj[u]:
        if d + w < dist.get(v, INF):
            dist[v] = d + w; heappush(pq, (dist[v], v))
```
O((V+E) log V). Track parents to reconstruct the path. **Dijkstra breaks with negative edges** — it finalizes nodes assuming distances only grow.

## Bellman-Ford (negative edges)

Handles **negative** weights. Relax all E edges V−1 times; O(V·E) — slower but general. A further relaxation that still improves a distance means a **negative cycle** exists (no shortest path defined) — Bellman-Ford is how you *detect* one.

## 0-1 BFS & Plain BFS

- All weights equal → **plain BFS** (treat as unweighted).
- Weights only 0 or 1 → **0-1 BFS** with a deque (push 0-edges front, 1-edges back), O(V+E) — faster than Dijkstra for this case.

## A* (heuristic-guided)

Dijkstra plus a **heuristic** estimate of remaining distance to the goal, exploring promising nodes first. With an **admissible** heuristic (never overestimates) it finds the optimal path while expanding far fewer nodes — ideal for single-source-single-target on maps/grids (Manhattan/Euclidean heuristics).

## Choosing

- Non-negative weights, one source → **Dijkstra**.
- Negative weights or need negative-cycle detection → **Bellman-Ford**.
- All-pairs shortest paths on a small graph → **Floyd-Warshall** (O(V³)).
- Single target with a good heuristic (maps, games) → **A***.
- Unweighted / equal weights → **BFS**; 0/1 weights → **0-1 BFS**.

## Pitfalls

- **Using Dijkstra with negative edges** → wrong answers (the classic mistake).
- Forgetting to skip **stale** priority-queue entries (check `d > dist[u]`).
- Not reconstructing the path (store parents) when the route, not just the cost, is needed.
- Very large graphs — Dijkstra's PQ memory; consider A* or bidirectional search.
