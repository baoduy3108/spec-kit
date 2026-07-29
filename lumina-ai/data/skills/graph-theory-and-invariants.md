---
name: graph-theory-and-invariants
description: Graph theory and combinatorial games for competition math (thi chuyên/olympiad) — graphs, vertices/edges/degrees, connectivity, trees, coloring, Euler/Hamiltonian paths, and combinatorial game theory (winning/losing positions, Nim, strategy-stealing). Use for olympiad/gifted-exam graph theory, combinatorial games, or discrete structures.
category: knowledge
keywords_vi: lý thuyết đồ thị và trò chơi tổ hợp thi chuyên olympiad, đồ thị đỉnh cạnh bậc, tính liên thông và cây, tô màu đồ thị, đường euler và hamilton, lý thuyết trò chơi tổ hợp, thế thắng thế thua và nim, chiến lược đối xứng
---

# Graph Theory & Combinatorial Games

Graph theory (the study of networks of vertices and edges) and combinatorial game theory are discrete-math topics that appear in olympiads and thi-chuyên. They model relationships and two-player games, and their problems reward clever structural insight over computation.

## Graphs: The Basics

- A **graph** is vertices (points) connected by **edges** (lines). Model relationships: people/friendships, cities/roads, states/moves.
- **Degree** — the number of edges at a vertex. **Handshake lemma**: the sum of all degrees = 2×(number of edges), so the number of odd-degree vertices is even. A simple but powerful counting fact.
- **Directed vs undirected, weighted, simple vs multigraph, bipartite** (two groups, edges only between).

## Connectivity & Trees

- **Path, cycle, connected** (every vertex reachable). **Components** — maximal connected pieces.
- **Tree** — a connected graph with no cycles; n vertices → exactly n−1 edges; unique path between any two vertices. Trees model hierarchies and appear everywhere.
- **Spanning trees, bridges, cut vertices** — structural features used in proofs.

## Coloring

- **Graph coloring** — assign colors to vertices so adjacent ones differ; the **chromatic number** is the minimum colors needed.
- **Bipartite ⟺ 2-colorable ⟺ no odd cycles** — a key theorem.
- Coloring arguments prove impossibility (like checkerboard colorings — see invariants) and model scheduling/conflict problems.

## Euler & Hamiltonian Paths

- **Eulerian path/circuit** — uses every *edge* exactly once; exists iff the graph is connected with 0 (circuit) or 2 (path) odd-degree vertices (the Königsberg bridges result).
- **Hamiltonian path/cycle** — visits every *vertex* exactly once; hard in general (no simple criterion), a classic problem type.

## Combinatorial Game Theory

Two-player games with perfect information and no chance (Nim, take-away games):
- **Winning (N) vs losing (P) positions** — a **P-position** (previous player wins) is one where *every* move leads to an N-position; an **N-position** (next player wins) has *some* move to a P-position. Work backward from terminal positions to classify all.
- **Nim** — the classic; the winning strategy uses the **XOR (nim-sum)** of pile sizes (a P-position has nim-sum 0). Sprague-Grundy theory generalizes this.
- **Strategy-stealing** — prove the first player wins *without* finding the strategy, by showing a second-player win could be "stolen."
- **Symmetry strategies** — mirror the opponent's moves to guarantee a win/draw.

## Problem-Solving

- **Model as a graph** — turn a relationship/configuration problem into vertices and edges.
- **Degree and parity arguments** (handshake lemma), **coloring** for impossibility, **connectivity/tree** structure.
- **For games** — classify positions (P/N) via backward induction, look for invariants, symmetry, or pairing strategies.
- **Extremal and invariant** thinking (see mathematical-induction-and-proof) applies throughout.

Master competition graph theory and games via **graph basics** (degrees, the handshake lemma), **connectivity and trees** (n−1 edges, unique paths), **coloring** (chromatic number, bipartite = no odd cycles, impossibility proofs), **Euler/Hamiltonian paths**, and **combinatorial game theory** (winning/losing positions by backward induction, Nim's XOR strategy, strategy-stealing and symmetry). Modeling problems as graphs or games and finding the structural invariant or winning strategy is the discrete-math skill that cracks these thi-chuyên/olympiad problems.
