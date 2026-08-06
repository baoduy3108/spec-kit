---
name: bevy-and-rust-game-development
description: Bevy engine and Rust game development — the App/plugin structure, ECS with systems and queries, Resources, Components, Commands for spawning, the schedule/system ordering, Bevy's change detection, and working with Rust's ownership in a game. Use when building a game in Bevy, writing Rust game code, structuring systems/plugins, or handling ECS queries and the borrow checker in gameplay.
category: game-dev
keywords_vi: bevy engine làm game, game bằng rust bevy, app và plugin bevy, system và query bevy, resource và component bevy, commands spawn entity bevy, lịch chạy system ordering, change detection bevy, ownership rust trong game, ecs kiểu rust
---

# Bevy & Rust Game Development

Bevy is a modern, data-oriented game engine written in **Rust**, built around **ECS** (see entity-component-system-architecture) and a clean **plugin** architecture. It leans hard on Rust's safety: the borrow checker and the ECS scheduler cooperate to run systems in parallel without data races (see rust-ownership).

## The App & Plugins

- Everything starts with an **`App`**: you register plugins, resources, and systems, then `.run()`.
- **Plugins** bundle related setup (`DefaultPlugins` gives windowing, rendering, input, audio). Your own game is just more plugins — a clean way to split features (`CombatPlugin`, `UiPlugin`).
- `app.add_plugins(...)`, `app.insert_resource(...)`, `app.add_systems(Update, my_system)`.

## ECS in Bevy

- **Components** are plain Rust structs deriving `Component`: `#[derive(Component)] struct Velocity(Vec2);`
- **Systems** are plain functions whose **parameters declare what they access**: `fn move_players(mut q: Query<(&Velocity, &mut Transform)>)`. Bevy injects matching data.
- **Queries** filter entities by components: `Query<&Transform, With<Player>>`, `Query<..., Without<Frozen>>`. Iterate to read/write.
- **Resources** hold global singletons: `Res<Time>`, `ResMut<Score>`.
- **Commands** defer structural changes: `commands.spawn((Player, Transform::default(), Velocity(...)))` and `commands.entity(e).despawn()` — applied at the next sync point, so they don't conflict with in-flight iteration.

## Schedules & System Ordering

- Systems run in **schedules**: `Startup` (once), `Update` (each frame), `FixedUpdate` (fixed timestep — physics, see game-loop-and-fixed-timestep).
- Bevy runs systems **in parallel** when their data accesses don't conflict; it infers this from each system's `Query`/`Res` signature. Two systems both writing `Transform` won't run simultaneously.
- Control order with `.chain()` or `.before()/.after()`, and group with **system sets**. Ordering bugs (reading state before it's written) are the main gotcha.

## Change Detection & Events

- **Change detection** — query filters `Changed<T>` / `Added<T>` let a system react only to entities whose component changed this frame (efficient reactive logic).
- **Events** — `EventWriter<T>`/`EventReader<T>` decouple systems (damage events, collision events) without direct references.

## Rust Ownership in Gameplay

- The borrow checker forbids two mutable references to the same data — which is exactly why ECS queries are structured as they are. You don't hold long-lived references to entities; you **query each frame** and act on **`Entity` IDs** (cheap handles), not pointers.
- Avoid fighting the borrow checker by keeping systems small and single-access; reach other entities via a second `Query` param, not by storing references.
- Fast iteration: Bevy's `bevy_dylib`/dynamic linking speeds compile times during development.

Build Bevy games as an **`App` of plugins**, with **components as data structs**, **systems as functions that declare their `Query`/`Res` access**, and **`Commands` for spawning/despawning** — letting Bevy schedule systems in **parallel** by their data signatures. Put physics in `FixedUpdate`, use **`Changed<T>` and events** for reactive logic, and work *with* Rust's ownership by acting on `Entity` IDs and per-frame queries instead of stored references.
