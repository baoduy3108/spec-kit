---
name: game-loop-and-fixed-timestep
description: The heartbeat of every game — the game loop — and why physics needs a FIXED timestep while rendering runs as fast as it can. Covers delta-time movement, why variable-step physics is non-deterministic and explodes at low FPS, the accumulator pattern (fixed updates + interpolation), and decoupling update from render. Use to write frame-rate-independent movement, stable physics, and smooth rendering.
category: game-dev
keywords_vi: vòng lặp game game loop nhịp tim của game, vật lý cần bước thời gian cố định fixed timestep còn render chạy nhanh tuỳ máy, di chuyển theo delta-time độc lập khung hình, bước biến thiên gây phi tất định và nổ vật lý khi fps thấp, mẫu accumulator update cố định cộng nội suy interpolation, tách update khỏi render
---

# The Game Loop & Fixed Timestep

Every real-time game runs a **game loop**: process input → update the world → render → repeat, many times per second. How you structure that loop decides whether your game feels smooth and behaves consistently, or stutters and breaks at different frame rates. The two hard problems are **frame-rate independence** (a character shouldn't move faster on a 144Hz monitor than a 60Hz one) and **stable physics** (collisions shouldn't tunnel or explode when FPS dips) (see collision-detection-and-response, easing-and-animation-timing, how-cpu-caches-work).

## Delta-Time: Frame-Rate-Independent Movement

The naive loop moves things a fixed amount per frame (`x += 5`), so on a faster machine everything runs faster — a classic bug. The fix: measure **delta time** (`dt`, seconds since last frame) and scale motion by it: `x += speed * dt`. Now speed is in units/second and is the same regardless of frame rate. This works well for simple **kinematic** movement and animation timing.

## Why Physics Needs a FIXED Timestep

Delta-time alone breaks down for **physics** (gravity, forces, collisions, stacking):
- **Non-determinism** — variable `dt` means the simulation evolves differently on different machines/frame rates; multiplayer and replays desync.
- **Instability / explosions** — integrators (especially for springs/constraints) become unstable with large or varying steps; a lag spike (`dt` = 0.5s) can send objects flying or **tunnel** through walls.
So physics wants a **fixed timestep**: always advance the simulation by a constant `dt` (e.g. 1/60s), no matter the render rate. Consistent, deterministic, stable.

## The Accumulator Pattern (fix your timestep)

You can't guarantee frames arrive every 1/60s, so you **decouple** simulation from rendering with an **accumulator** (the classic "Fix Your Timestep" pattern):
```
accumulator += frameTime            // real elapsed time
while (accumulator >= FIXED_DT) {    // run 0..N fixed physics steps
  update(FIXED_DT)
  accumulator -= FIXED_DT
}
render(accumulator / FIXED_DT)       // interpolate remainder for smoothness
```
- Physics always steps by `FIXED_DT` → deterministic and stable. On a slow frame it runs **several** steps to catch up; on a fast frame it may run **zero**.
- **Rendering interpolates** between the last two physics states using the leftover fraction, so motion looks smooth even though physics ticks at a fixed rate.
- Cap the number of catch-up steps to avoid a **spiral of death** (physics falling further behind, running ever more steps).

## Design Guidance (for understanding/using)

- **Scale all time-based motion by `dt`** — never assume a frame rate; units are per-second.
- **Run physics on a fixed timestep** via an accumulator — deterministic, stable, multiplayer-safe.
- **Interpolate rendering** between fixed states for smooth visuals decoupled from the physics rate.
- **Clamp `dt`/catch-up steps** — a huge frame gap (tab was backgrounded) shouldn't run 1000 physics steps; cap it.
- **Separate update from render** — logic at a fixed rate, drawing as fast as the display allows.

## Pitfalls (in understanding/using)

- Moving by a **constant per frame** (`x+=5`) → speed depends on FPS; faster PCs run faster.
- Feeding **variable `dt`** into physics → non-deterministic, unstable, tunneling on lag spikes.
- No **interpolation** with fixed physics → visible stutter/juddering between ticks.
- Uncapped catch-up on a big frame gap → **spiral of death**; the game freezes trying to catch up.
- Assuming delta-time fixes everything → it handles kinematics, but **physics still needs a fixed step**.
