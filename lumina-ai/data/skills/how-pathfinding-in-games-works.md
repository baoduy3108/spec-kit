---
name: how-pathfinding-in-games-works
description: How game pathfinding works — representing the world as a grid or navmesh, finding routes with A*, then smoothing paths and adding steering/local avoidance so agents move naturally and dodge each other. Use to make NPCs navigate a level, understand navmesh vs grid, A* in games, or steering/local avoidance.
category: engineering
keywords_vi: pathfinding trong game, tìm đường npc, biểu diễn thế giới grid navmesh, a-star tìm lộ trình, làm mượt đường đi, steering tránh va chạm cục bộ, di chuyển tự nhiên
---

# How Pathfinding in Games Works

Pathfinding is how a game's characters (NPCs, enemies, units) figure out **how to get from A to B** around obstacles. It combines a **world representation** (grid or navmesh), a **search algorithm** (usually A*), and **movement refinement** (path smoothing + steering) so agents move believably rather than robotically (see shortest-paths, graph-traversal, game-ai-behavior).

## Step 1: Represent the World as a Graph

A search algorithm needs a **graph** of where an agent can move. Two common representations:
- **Grid** — divide the level into cells (walkable/blocked). Simple, great for tile-based games, but coarse and can produce blocky paths; large grids are expensive.
- **Navigation mesh (navmesh)** — cover walkable areas with a set of connected **convex polygons**. Far fewer nodes than a fine grid, represents open 3D/irregular spaces efficiently, and gives more natural paths. The standard for 3D games.
- **Waypoint graphs** — hand/auto-placed nodes connected by links; older, simpler, less flexible.

The representation determines the nodes the search explores.

## Step 2: Search With A*

**A\*** is the workhorse pathfinding algorithm (see shortest-paths). It finds the shortest path efficiently by combining:
- **g** — cost so far from the start, and
- **h** — a **heuristic** estimate of the remaining cost to the goal (e.g. straight-line distance).
A* expands the node with the lowest **f = g + h**, so the heuristic **guides** the search toward the goal instead of exploring blindly (that's what makes it faster than Dijkstra). An **admissible** heuristic (never overestimates) guarantees the shortest path. On a navmesh, A* runs over polygons; on a grid, over cells.

## Step 3: Smooth and Move (steering)

The raw A* path is a list of nodes/cells — following it literally looks **robotic** (zig-zagging along grid lines, hugging corners). Refine it:
- **Path smoothing / string-pulling** — remove unnecessary waypoints and straighten segments where line-of-sight allows, so the agent walks a natural direct route, not a staircase.
- **Steering behaviors** — instead of teleporting between waypoints, apply **seek/arrive** forces toward the next point for smooth acceleration/turning (Reynolds steering).
- **Local avoidance** — A* handles **static** geometry, but agents must dodge **dynamic** obstacles (other units, the player) in real time. Techniques like **RVO/ORCA**, steering separation, or flow fields handle local, moment-to-moment avoidance **on top of** the global path.

So: **A\* for the global route, steering + local avoidance for the moment-to-moment movement.**

## Performance Considerations

- Pathfinding is expensive; **don't** re-path every agent every frame. **Amortize** (spread searches across frames), **cache** paths, and re-path only on change.
- **Flow fields** — for **many** agents heading to the **same** goal (RTS swarms), compute one field the whole crowd follows, instead of A* per unit.
- **Hierarchical pathfinding** — path at a coarse level first, refine locally, for huge maps.

## Pitfalls (in understanding/using)

- Following the **raw A\*** path literally → robotic, corner-hugging, zig-zag movement; smooth it and use steering.
- Handling only **static** obstacles → agents walk through / bump into each other and the player; add local avoidance.
- **Re-pathing every agent every frame** → performance death; amortize, cache, use flow fields for crowds.
- A **too-fine grid** → huge node counts and slow searches; consider a navmesh.
- A **non-admissible** heuristic (overestimating) → A* may return non-optimal paths (sometimes an acceptable trade for speed).
- Ignoring **dynamic** map changes (doors, destroyed walls) → stale paths lead agents into walls.
- Forgetting **agent size/clearance** → paths that fit a point but not the actual character.
