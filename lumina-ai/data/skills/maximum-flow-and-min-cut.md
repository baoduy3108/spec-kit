---
name: maximum-flow-and-min-cut
description: How max-flow/min-cut works — pushing the most flow through a capacitated network from source to sink, augmenting paths (Ford-Fulkerson/Edmonds-Karp), the max-flow min-cut theorem, and modeling problems (bipartite matching, scheduling) as flow. Use to understand network flow, max-flow min-cut, bipartite matching as flow, or capacity/assignment problems.
category: engineering
keywords_vi: maximum flow min cut, luồng cực đại, mạng dung lượng source sink, augmenting path ford-fulkerson edmonds-karp, max-flow min-cut theorem, bipartite matching, bài toán phân công
---

# Maximum Flow & Minimum Cut

Max-flow asks: given a network of pipes (edges) with **capacities**, how much can flow from a **source** to a **sink**? It's a powerful modeling tool — many problems that don't look like flow (matching, assignment, scheduling, segmentation) reduce to it.

## The Flow Network

A directed graph where each edge has a **capacity** (max it can carry). Flow must obey:
- **Capacity constraint** — flow on an edge ≤ its capacity.
- **Conservation** — at every node except source/sink, flow in = flow out.
**Maximum flow** = the greatest total flow from source to sink. Think water through pipes, or data through a network with bandwidth limits (see how-load-balancers-work for real capacity ideas).

## Ford-Fulkerson: Augmenting Paths

The core method:
1. Find a path from source to sink with **spare capacity** (an **augmenting path**) in the **residual graph**.
2. Push as much flow as its bottleneck (minimum residual capacity) allows.
3. Update residual capacities — crucially, add **reverse (residual) edges** that let later paths **cancel/reroute** earlier flow (this "undo" ability is what makes it find the true optimum, not a greedy dead-end).
4. Repeat until no augmenting path exists → the flow is maximum.
**Edmonds-Karp** picks the augmenting path via **BFS** (shortest path), giving a polynomial `O(V·E²)` bound. Dinic's algorithm is faster for large graphs.

## The Max-Flow Min-Cut Theorem (the beautiful part)

The **maximum flow equals the minimum cut** — the smallest total capacity of edges you'd have to remove to completely disconnect source from sink. Intuitively: the flow is bottlenecked exactly by the tightest "wall" across the network. This duality means solving max-flow also finds the **min cut** (the critical bottleneck edges) — useful for reliability, segmentation, and "what's the weakest link" analysis.

## Modeling Problems as Flow

The real power is **reduction** — recasting other problems as max-flow:
- **Bipartite matching** (assign workers to jobs, students to schools) — add a source→workers and jobs→sink with capacity 1; max-flow = maximum matching.
- **Scheduling / assignment** — capacities model limits.
- **Image segmentation** — min-cut separates foreground/background.
- **Project selection, baseball elimination**, and more.
Recognizing that a problem "is flow" turns a hard-looking problem into a solved one.

## Pitfalls (in understanding/using)

- Forgetting **residual/reverse edges** — without the ability to reroute flow, you get a suboptimal greedy result, not the max flow.
- Ford-Fulkerson with **arbitrary** path choice and irrational/huge capacities can be slow/non-terminating — use BFS (Edmonds-Karp) or Dinic's for guarantees.
- Confusing **min cut** (min capacity to disconnect) with other "cut" notions.
- Missing that a problem can be **modeled as flow** (matching/assignment) — the reduction is the insight.
- Overkill on tiny/simple matching problems where a direct greedy/augmenting-path matching suffices.
- Directed vs undirected capacity modeling mistakes (split undirected edges carefully).
