---
name: entity-component-system-architecture
description: Entity-Component-System (ECS) architecture for games — entities as IDs, components as plain data, systems as behavior over queries, composition over inheritance, and data-oriented layout for cache-friendly performance. Covers when ECS helps vs hurts. Use when structuring a game's code, escaping deep inheritance hierarchies, or asking how ECS works.
category: engineering
keywords_vi: kiến trúc ecs entity component system, thực thể là id component là dữ liệu, system xử lý theo truy vấn query, ưu tiên kết hợp thay vì kế thừa composition, bố cục hướng dữ liệu cache thân thiện, thoát cây kế thừa sâu game, tổ chức mã nguồn game
---

# Entity-Component-System (ECS)

ECS is an architectural pattern that structures game objects as **data + behavior separated**, favoring **composition over inheritance**. It solves the classic OOP game problem where a deep class tree (`GameObject → Character → Enemy → FlyingEnemy → …`) becomes rigid and tangled the moment something needs a mix of traits.

## The Three Parts

- **Entity** — just an **ID** (an integer). It has no data and no logic; it's a handle that components attach to. "Entity 42" *is* the player only because of the components tagged to 42.
- **Component** — **plain data, no behavior**: `Position{x,y}`, `Velocity{dx,dy}`, `Health{hp}`, `Sprite{...}`. A component is a struct. An entity's identity is the *set* of components it has.
- **System** — **behavior, no data**: logic that runs each frame over every entity matching a **query**. A `MovementSystem` processes all entities with `Position + Velocity`; a `RenderSystem` all with `Position + Sprite`.

Game logic becomes: *"for every entity with components X and Y, do Z."*

## Why Composition Wins

Want a flying, poisonous, exploding enemy? In inheritance you fight the class tree or duplicate code. In ECS you just attach `Flying + Poison + Explodes` components — no new class, no diamond problem. Behaviors combine freely because they're independent data tagged onto an ID. Adding a new capability is adding a component + a system, touching nothing existing. This flexibility is ECS's headline benefit even before performance.

## Data-Oriented Performance

The performance story is about **memory layout and the CPU cache**. If components of the same type are stored **contiguously** (arrays of `Position`, arrays of `Velocity`), a system iterating them streams linearly through memory — the cache prefetcher loves it, and you avoid the pointer-chasing and cache misses of an array of fat heterogeneous objects. This "structure of arrays" layout (see how-cpu-caches-work) is why ECS scales to tens of thousands of entities. **Archetype** ECS groups entities with identical component sets so queries iterate tight packed arrays.

## Storage Strategies

- **Archetype/table** — entities grouped by their exact component set; fast iteration, costlier structural changes (add/remove component moves the entity).
- **Sparse set** — per-component arrays with an index map; cheap add/remove, slightly less cache-perfect.

There's no single "correct" ECS — engines pick trade-offs. What matters is the principle: contiguous data, queried by systems.

## When ECS Helps — and When It Doesn't

ECS shines for games with **many interacting entities** and **combinatorial variety** of behavior (simulations, bullet hells, RTS, sandbox). It's overkill for a simple game with a handful of unique objects — the indirection and query machinery cost more than they save, and a plain object or a few components-on-a-class is clearer. Reach for ECS when inheritance starts hurting or entity counts climb, not reflexively.

The mental shift — *data and behavior are separate; identity is a bag of components* — is the whole idea. Everything else is optimization.
