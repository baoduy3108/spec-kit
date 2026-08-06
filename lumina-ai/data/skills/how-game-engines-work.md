---
name: how-game-engines-work
description: How a game engine works — the game loop (input→update→render), fixed vs variable timestep and delta time, the entity-component-system (ECS) architecture, collision detection, scene graph, and the asset/rendering pipeline. Use to understand real-time interactive systems, game loops, and why frame timing and ECS matter.
category: engineering
keywords_vi: game engine hoạt động thế nào, vòng lặp game game loop, delta time timestep, entity component system ecs, va chạm collision, làm game, hiểu game engine
---

# How Game Engines Work

A game is a program that runs a tight loop many times per second, simulating a world and drawing it.

## The Game Loop

Every frame: **process input → update the world → render**, repeated as fast as possible (target 60 fps → ~16ms/frame). The whole feel of a game comes from this loop running smoothly.

## Delta Time & Timestep

Frames don't take equal time, so movement must scale by **delta time** (seconds since last frame): `position += velocity * dt`. Otherwise the game runs faster on faster machines.
- **Variable timestep** — update with whatever dt occurred; simple, but physics can become unstable at low frame rates.
- **Fixed timestep** — run the simulation in fixed steps (e.g. 1/60s), accumulating leftover time, and interpolate for rendering. Deterministic and stable — the standard for physics. Understanding this explains "why does the physics break when the frame rate drops."

## Entity-Component-System (ECS)

Instead of deep inheritance hierarchies (a `FlyingEnemy` class...), modern engines use **composition**:
- **Entities** — just IDs.
- **Components** — plain data (Position, Velocity, Health, Sprite) attached to entities.
- **Systems** — logic that operates on all entities having certain components (a MovementSystem processes everything with Position + Velocity).
This is data-oriented (cache-friendly), flexible (mix components freely), and avoids the rigidity of inheritance — a concrete win of composition-over-inheritance.

## Collision & Physics

Detecting overlaps naively is O(n²) pairs; engines use **broad phase** (spatial partitioning — grids, quadtrees, bounding volumes — to cheaply cull far-apart pairs) then **narrow phase** (precise shape tests) on the survivors, then **resolve** collisions (push apart, apply impulses). Same integration + collision ideas as a physics engine.

## Rendering & Scene

A **scene graph** organizes objects (with parent-child transforms); the renderer culls what's off-screen, sorts, and issues GPU draw calls (batching to minimize state changes). Assets (meshes, textures, audio) are loaded/streamed through an asset pipeline.

The core insight: real-time interactivity = a loop + delta-time simulation + efficient collision + GPU rendering, with ECS keeping the growing entity zoo manageable.
