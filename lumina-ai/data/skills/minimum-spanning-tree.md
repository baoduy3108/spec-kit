---
name: minimum-spanning-tree
description: How minimum spanning tree (MST) algorithms work — connecting all nodes of a weighted graph with minimum total edge weight, Kruskal's (sort edges + union-find) and Prim's (grow from a node with a priority queue), the greedy cut property, and applications. Use when connecting points at minimum cost, network/clustering design, or understanding Kruskal/Prim.
category: engineering
keywords_vi: minimum spanning tree, cây khung nhỏ nhất mst, nối tất cả đỉnh trọng số nhỏ nhất, kruskal union-find, prim priority queue, greedy cut property, đồ thị trọng số
---

# Minimum Spanning Tree (MST)

A minimum spanning tree connects **all** nodes of a weighted, connected graph using a subset of edges with **minimum total weight** and **no cycles**. It answers "what's the cheapest way to connect everything?" — laying network cable, road/utility design, clustering, and more.

## The Problem

Given a graph where edges have weights (costs/distances), find a **spanning tree** (connects all n nodes, uses exactly n−1 edges, no cycles) whose total edge weight is minimum. Two classic **greedy** algorithms solve it optimally, both relying on the **cut property**: for any way of splitting the nodes into two groups, the cheapest edge crossing the split is safe to include in some MST.

## Kruskal's Algorithm (edge-centric)

1. **Sort all edges** by weight (ascending).
2. Go through edges cheapest-first; **add an edge if it connects two currently-separate components** (i.e. doesn't form a cycle).
3. Stop when n−1 edges are added.
Detecting "would this create a cycle?" efficiently is exactly what **union-find** (disjoint-set, see union-find) does — find/union tell you if two nodes are already connected. Complexity `O(E log E)` (dominated by the sort). Great for **sparse** graphs and when edges are easy to sort.

## Prim's Algorithm (vertex-centric)

1. Start from any node; grow the tree one node at a time.
2. Repeatedly add the **cheapest edge** that connects a node **in** the tree to a node **outside** it.
3. Use a **priority queue** (min-heap, see heap-priority-queue) to always pick the smallest connecting edge quickly.
Complexity `O(E log V)` with a binary heap. Similar in spirit to Dijkstra (see shortest-paths). Good for **dense** graphs (with the right heap/adjacency representation).

## Why Greedy Works

The **cut property** guarantees the greedy choice is safe: the minimum-weight edge crossing any cut belongs to an MST. Both Kruskal (adding globally-cheapest safe edges) and Prim (adding the cheapest edge leaving the current tree) exploit this — a rare case where a simple greedy strategy is provably optimal (see greedy-algorithms).

## Applications

- **Network design** — minimum-cost wiring/piping/roads connecting all sites.
- **Clustering** — remove the most expensive MST edges to split into clusters (single-linkage clustering — see how-clustering-works).
- **Approximation** — MST underlies approximations for hard problems (e.g. TSP).
- Image segmentation, circuit design.

## Pitfalls (in understanding/using)

- Confusing MST with **shortest path** — MST minimizes *total* connection cost, not the distance between any two specific nodes (a shortest-path tree is different).
- Kruskal without **union-find** → slow cycle checks; union-find is what makes it efficient.
- Applying MST to a **disconnected** graph (no spanning tree exists) — you'd get a minimum spanning **forest**.
- Prim on very sparse graphs without proper structures, or Kruskal on dense graphs where sorting dominates — pick by graph density.
- Assuming the MST is **unique** — with equal edge weights there can be several valid MSTs.
- Directed graphs — MST is for **undirected** graphs; directed needs different (arborescence) algorithms.
