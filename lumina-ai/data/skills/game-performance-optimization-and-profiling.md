---
name: game-performance-optimization-and-profiling
description: Optimizing game performance and profiling — the frame budget (16.6ms/60fps), finding CPU vs GPU bound, cutting draw calls via batching/instancing, overdraw, garbage-collection spikes and object pooling, LOD and culling, and using profilers to measure before optimizing. Use when a game is dropping frames/stuttering, hitting a frame-rate target, reducing draw calls, or profiling CPU/GPU/memory in a game.
category: game-dev
keywords_vi: tối ưu hiệu năng game, profiling game đo hiệu năng, frame budget 16ms 60fps, cpu bound hay gpu bound, giảm draw call batching instancing, overdraw vẽ chồng, gc spike giật do rác, object pooling tái dùng, lod và culling, game bị tụt khung hình
---

# Game Performance Optimization & Profiling

A game must hit its **frame budget** every frame or it stutters. At 60 fps you have **~16.6 ms** per frame (33 ms at 30 fps) for *everything* — logic, physics, rendering. Optimization is about staying under budget; the golden rule: **profile first, optimize the measured bottleneck** — never guess (see performance-optimization).

## Profile First: CPU-bound or GPU-bound?

- Use the engine profiler (Unity Profiler, Unreal Insights/`stat` commands, Godot monitors, RenderDoc, PIX, Xcode/Android GPU tools).
- **Find the limiter**: if the CPU frame time ≫ GPU, you're **CPU-bound** (too much logic/draw-call submission/GC); if GPU ≫ CPU, you're **GPU-bound** (overdraw, shader cost, fill rate).
- Optimizing the side that *isn't* the bottleneck does nothing. Measure, fix the top cost, re-measure. Watch the **frame-time graph** for spikes, not just average FPS (a 60 fps average with 100 ms hitches feels broken).

## CPU-Side Wins

- **Draw calls** — each is CPU overhead. **Batch** (static/dynamic batching), **GPU instancing** for many identical meshes, and **atlas** sprites so they share a texture/material (see sprite-atlas-and-texture-packing). Fewer, bigger submissions.
- **Garbage-collection spikes** — per-frame allocations (new lists, boxing, string concats) trigger GC hitches. **Pool objects** (bullets, enemies, particles) instead of instantiate/destroy; avoid allocations in `Update` (see particle-systems-and-vfx).
- **Reduce per-frame work** — cache `GetComponent`/lookups, disable Tick/Update on idle objects, use timers/events over polling, spread heavy work across frames or threads/jobs.
- **Physics** — fewer colliders, simpler shapes, right fixed-timestep, sleep inactive bodies.

## GPU-Side Wins

- **Overdraw** — pixels drawn multiple times (stacked transparency, particles). Cut transparent layers, use opaque where possible; visualize with overdraw view.
- **Culling** — **frustum culling** (skip off-screen) and **occlusion culling** (skip hidden); don't submit what isn't seen.
- **LOD (Level of Detail)** — swap to lower-poly meshes/simpler shaders at distance; **mipmaps** for textures.
- **Shader cost** — expensive per-pixel math/texture samples; simplify graphs, move work to vertex stage (see shader-graphs-and-node-based-materials). Watch resolution/fill rate on mobile.

## Memory & Loading

- Budget **texture/mesh memory**; compress textures, unload unused assets/banks, stream large content.
- **Hitches from loading** — load async, pool, and warm up shaders/assets to avoid runtime spikes.

## Process

1. **Set a target** (60/30 fps, device class). 2. **Profile** to find the bottleneck. 3. **Fix the top cost** (usually draw calls or GC on CPU; overdraw/fill on GPU). 4. **Re-measure**. 5. Repeat until under budget. Avoid premature micro-optimizations that don't move the measured number.

Optimize games by respecting the **16.6 ms frame budget** and **profiling to find whether you're CPU- or GPU-bound** before touching anything. On CPU, cut **draw calls** (batch/instance/atlas) and **GC spikes** (object pooling, no per-frame allocations); on GPU, cut **overdraw**, add **culling and LOD**, and simplify shaders. Chase frame-time **spikes**, fix the measured top cost, and re-measure — never optimize by guesswork.
