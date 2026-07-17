---
name: topological-sort
description: Topological sorting of a directed acyclic graph (DAG) — order nodes so every edge points forward, via Kahn's algorithm (BFS on in-degrees) or DFS post-order, and detect cycles when no valid order exists. Use for dependency resolution, build/task ordering, course scheduling, and any "do X before Y" ordering problem.
category: engineering
keywords_vi: topological sort, sắp xếp topo, thứ tự phụ thuộc dependency, dag, lịch học course schedule, kahn in-degree, thứ tự build, phát hiện chu trình
---

# Topological Sort

A topological order lists the nodes of a **directed acyclic graph** so that for every edge u→v, u comes before v. It answers "in what order can I do these tasks given their dependencies?"

## When You Need It

Anything with "X must happen before Y": build systems (compile order), package/dependency resolution, course prerequisites, task scheduling, spreadsheet cell recalculation, resolving a chain of migrations. If the dependency graph has a **cycle**, no valid order exists — and detecting that is part of the job.

## Kahn's Algorithm (BFS on in-degrees)

```
compute in-degree of every node
queue = all nodes with in-degree 0
while queue:
    u = queue.popleft(); output u
    for v in adj[u]:
        in_degree[v] -= 1
        if in_degree[v] == 0: queue.append(v)
if len(output) < num_nodes: cycle exists   # not all nodes ordered
```
Intuition: repeatedly take a node with no remaining prerequisites, remove it, and unlock its dependents. If some nodes never reach in-degree 0, they're stuck in a **cycle**. O(V+E).

## DFS Post-Order

Do DFS; when a node finishes (all descendants visited), push it onto a stack. The reversed finish order is a topological order. Detect cycles with three-color marking (encountering a node currently on the recursion stack = back edge = cycle).

## Notes

- **Multiple valid orders** usually exist — any order respecting all edges is correct (Kahn with a priority queue gives the lexicographically smallest if needed).
- **Cycle = no topological order.** Both algorithms detect it; use that to report "circular dependency."
- Works only on **directed** graphs; undirected dependencies don't have a topo order.
- The output feeds naturally into processing tasks in dependency order (e.g. DP on a DAG, or running build steps).

## Pitfalls

- Forgetting the cycle check (Kahn: output count < node count) — silently returning a partial order.
- Building the edge direction backwards ("A depends on B" means edge B→A, so B comes first — get this straight).
- Assuming a unique answer when many are valid.
