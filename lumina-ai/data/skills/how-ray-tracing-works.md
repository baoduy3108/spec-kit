---
name: how-ray-tracing-works
description: How ray tracing works — simulating light by casting rays from the camera into the scene, computing intersections, shading, and recursively tracing reflection/refraction/shadow rays; why it's realistic but expensive, and rasterization vs ray tracing. Use to understand ray tracing, path tracing, realistic rendering, reflections/shadows, or rasterization vs ray tracing.
category: engineering
keywords_vi: how ray tracing works, ray tracing hoạt động thế nào, mô phỏng ánh sáng bằng tia, phóng tia từ camera, giao điểm intersection, shading, tia phản xạ khúc xạ bóng, rasterization vs ray tracing
---

# How Ray Tracing Works

Ray tracing renders images by **simulating how light travels**, producing highly realistic reflections, refractions, shadows, and lighting. It's the technique behind film-quality CGI and modern real-time ray-traced games. Understanding it clarifies why it looks so good and costs so much (see how-3d-rendering-works for the rasterization alternative).

## The Core Idea: Trace Rays of Light

In reality, light rays leave sources, bounce around, and some enter your eye. Simulating *every* photon is infeasible, so ray tracing works **backwards**: cast rays **from the camera** out through each pixel into the scene, and trace what they hit. For each pixel:
1. **Cast a ray** from the camera through that pixel into the scene.
2. **Find the closest intersection** — which object (and where) the ray hits first (this intersection math is the bulk of the work — testing rays against scene geometry, accelerated by spatial structures — see below).
3. **Shade** the hit point — compute its color based on materials and lighting.
4. **Recurse** — cast **secondary rays** to capture how light interacts:
   - **Shadow rays** — toward each light: if blocked, the point is in shadow.
   - **Reflection rays** — for shiny surfaces, bounce and trace what's reflected (mirrors, gloss).
   - **Refraction rays** — for transparent materials, bend through them (glass, water).
Each secondary ray can spawn more (a reflection sees another reflection...), **recursively**, up to a depth limit.

## Why It's Realistic

Because it actually **simulates light transport**, ray tracing produces effects that are hard for rasterization: accurate **reflections and refractions** (a mirror reflecting the true scene, glass bending light), **soft shadows**, and — with **path tracing** (tracing many random light paths and averaging, see how-random-number-generation-works) — **global illumination**: light bouncing between surfaces, color bleeding, realistic ambient light. These emergent effects come "for free" from simulating rays, rather than being faked.

## Why It's Expensive

Tracing rays — especially many bounces and many rays per pixel (needed to reduce noise in path tracing) — is **hugely compute-intensive**. Naively, each ray tests against every object. Optimizations make it feasible:
- **Acceleration structures** (BVH — bounding volume hierarchies, k-d trees) so a ray quickly finds candidate objects instead of testing all (like a spatial index — see how-b-trees-work).
- **GPU / dedicated RT hardware** (RTX cores) accelerate ray-triangle intersection (see how-gpus-work).
- **Denoising** — trace fewer rays (noisy result), then AI-denoise to a clean image — key to real-time ray tracing.

## Rasterization vs Ray Tracing

- **Rasterization** (see how-3d-rendering-works) — projects triangles to the screen and shades them; extremely **fast**, the basis of real-time graphics, but reflections/shadows/global illumination must be **faked** with tricks (shadow maps, screen-space reflections) that are approximate.
- **Ray tracing** — simulates light for **accurate** results, but far slower.
Modern games use **hybrid** rendering: rasterize the scene for speed, ray-trace specific effects (reflections, shadows, GI) for realism.

## Pitfalls (in understanding/using)

- Expecting ray tracing to be **cheap/real-time** without acceleration structures + hardware + denoising — it's inherently expensive.
- Not using an **acceleration structure** (BVH) → testing every ray against every object (unusably slow).
- Too few **rays per pixel** in path tracing → noisy images (needs many samples or denoising).
- Excessive **recursion depth** (endless reflections) without a bound → runaway cost.
- Assuming it replaces rasterization entirely — real-time uses **hybrid**; rasterization is still king for speed.
- Confusing **ray tracing** (from camera, general) with **path tracing** (many random light paths for full global illumination) — related but distinct.
