---
name: procedural-dungeon-and-level-generation
description: Algorithms for procedurally generating dungeons and levels — BSP room partitioning, cellular-automata caves, drunkard's walk, room-and-corridor placement, graph-based connectivity (Delaunay/MST + loops), and guaranteeing solvability. Use when generating dungeon layouts, cave systems, or roguelike levels algorithmically, or ensuring a generated level is fully connected and playable.
category: game-dev
keywords_vi: sinh dungeon, procedural dungeon, sinh màn chơi thuật toán, bsp chia phòng, cellular automata, drunkard walk đào hang, phòng và hành lang, delaunay mst nối phòng, tạo hầm ngục roguelike, kết nối phòng bằng đồ thị
---

# Procedural Dungeon & Level Generation

Beyond noise-based terrain (see procedural-generation-in-games), **dungeon/level generation** is about placing **rooms, corridors, and caves** that are connected, varied, and *always beatable*. Different algorithms give different feels (see roguelike-design-and-procedural-runs, wave-function-collapse).

## BSP (Binary Space Partitioning) — structured dungeons

- Recursively **split the map** into sub-rectangles (alternate horizontal/vertical splits, stop at a min size).
- Place a **room** inside each leaf partition, then **connect sibling rooms** with corridors as you walk back up the tree.
- Result: clean, non-overlapping, roughly grid-like dungeons (classic Rogue/Nethack feel). Easy to control room count/size.

## Cellular Automata — organic caves

- Start with a grid **randomly filled** ~45% wall. Then iterate a rule: a cell becomes wall if it has ≥5 wall neighbors, else floor (a few passes).
- This **smooths noise into cave blobs** — natural, organic caverns. Cheap and tunable via fill % and iterations.
- **Flood-fill** afterward to find disconnected pockets; delete small ones or tunnel to connect them.

## Drunkard's Walk / Random Walk — winding tunnels

- A "digger" starts on a filled map and **carves floor as it random-walks**, optionally biased toward a target or open area, until it's carved enough %.
- Gives winding, connected, cave-like paths. Bias and step count control openness. Guaranteed connected (it's one continuous path).

## Room-and-Corridor & Connectivity

- Scatter **rooms** (rejection-sample non-overlapping rects), then connect them. To decide *which* rooms connect:
  - Build a graph of room centers, compute a **Delaunay triangulation**, take its **Minimum Spanning Tree** (guarantees every room reachable, no redundancy), then **add back a few random edges** for loops (pure MST feels too linear).
- Carve **L-shaped or straight corridors** along chosen edges. Loops make dungeons feel less like a tree and more explorable.

## Guaranteeing Playability (non-negotiable)

- **Connectivity** — always verify the player can reach every required area: **flood-fill** from the start; if the exit/keys aren't reachable, tunnel or regenerate.
- **Solvability with locks/keys** — place keys *before* their doors along the traversal order; validate the critical path.
- **Seeded generation** — same seed → same dungeon (reproducible bugs, shareable levels, daily challenges).
- **Constraints over pure random** — enforce min room spacing, corridor width, and reachable objectives; regenerate or repair layouts that fail checks.

Generate dungeons by choosing an algorithm for the feel you want — **BSP** for structured rooms, **cellular automata** for organic caves, **drunkard's walk** for winding tunnels — then connect rooms via a **Delaunay + MST (plus a few loop edges)** graph. Always **flood-fill to guarantee connectivity and solvability**, place keys before locks on the critical path, and **seed** generation for reproducibility. Randomness makes variety; the connectivity/solvability checks make it playable.
