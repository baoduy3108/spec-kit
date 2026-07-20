---
name: object-pooling-in-games
description: The object pooling pattern — reusing a pre-allocated pool of objects (bullets, enemies, particles) instead of constantly creating and destroying them, to avoid garbage-collection hitches and allocation cost in real-time games. Use to avoid GC stutter, optimize spawning many short-lived objects, or implement an object pool.
category: engineering
keywords_vi: object pooling, object pool, tái sử dụng đối tượng, pool đạn particle, tránh giật garbage collection, cấp phát tốn kém, spawn nhiều đối tượng ngắn hạn, tái sử dụng thay vì tạo mới
---

# Object Pooling in Games

Object pooling is a performance pattern: instead of **creating and destroying** objects constantly (bullets, enemies, particles, projectiles), you keep a **pre-allocated pool** and **reuse** them. It exists mainly to avoid **garbage-collection hitches** and allocation overhead that cause frame stutter in real-time games — where a smooth, consistent frame rate is everything (see mobile-app-performance, how-game-engines-work).

## The Problem: Allocation Churn and GC Stutter

Games spawn tons of **short-lived** objects — a shooter fires hundreds of bullets, effects emit thousands of particles. Naively, each is **allocated** on spawn and **freed/garbage-collected** on death. Two costs bite:
- **Allocation cost** — creating objects isn't free, and doing it hundreds of times per frame adds up.
- **Garbage collection** — in GC'd languages (C#/Unity, JavaScript, Java), all that short-lived garbage triggers the **garbage collector**, which can **pause** execution mid-frame → a visible **stutter/hitch**. In a 60fps game, a GC pause blowing the 16ms budget is immediately felt.
Constant create/destroy churn is a top cause of jank in games.

## The Core Idea: Reuse Instead of Recreate

Pre-create a **pool** of N objects up front (or grow lazily), and instead of new/delete:
- **"Spawn"** = take an **inactive** object from the pool, reset its state, activate it.
- **"Despawn"** = **deactivate** it and return it to the pool (don't destroy it).
The object's memory is **reused** — no per-spawn allocation, no garbage for the GC to collect. The pool holds a stable set of objects that cycle between active and inactive. Bullets, particles, enemies, audio sources, and UI elements are classic pool candidates.

## How a Pool Works

- **Get()** — return an inactive object (reset it); if none free, either **grow** the pool or **reuse the oldest** (or refuse), per policy.
- **Return(obj)** — mark it inactive and available; **fully reset** its state so stale data doesn't leak into its next life.
- **Pre-warm** — allocate the expected number at load time (during a loading screen), so you don't pay allocation cost during gameplay.

## When to Use (and Not)

- **Use** for objects that are **spawned/destroyed frequently** and are **short-lived**: bullets, particles, enemies, projectiles, damage numbers, audio one-shots.
- **Don't** pool everything — pooling long-lived or rarely-created objects adds complexity for no gain, and holds memory you don't need. It's a **targeted** optimization for churn hot spots.
- Measure: pool where the profiler shows allocation/GC pressure.

## Design Guidance

- **Pool the churn hot spots** (bullets/particles/enemies), not everything.
- **Reset state on reuse** — position, velocity, health, timers, references — so a recycled object doesn't carry over its previous life.
- **Pre-warm** the pool during loading to avoid in-game allocation spikes.
- **Decide the empty-pool policy** — grow, reuse-oldest, or cap.
- **Beware dangling references** — code holding a reference to a returned (now-recycled) object will corrupt the new occupant; invalidate handles on return.
- **Cap pool size** where sensible to bound memory.

## Pitfalls (in understanding/using)

- **Not resetting** a reused object → stale state leaks (a "new" enemy spawns with the old one's health/position).
- **Dangling references** to a returned object → external code mutates a recycled object that's now something else.
- **Pooling everything** → needless complexity and memory for objects that don't churn.
- **Under-sized pool** with a bad empty policy → either allocation spikes (defeating the point) or objects vanishing.
- **Forgetting to return** objects → the pool "leaks" (everything stays active), and you allocate anyway.
- Assuming pooling helps in **non-GC, rare-spawn** cases → the benefit is mostly about churn and GC pressure; profile first.
