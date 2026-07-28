---
name: fluid-simulation-basics
description: Fluid simulation basics — grid (Eulerian) vs particle (Lagrangian/SPH) methods, the Navier-Stokes intuition, advection, pressure projection for incompressibility, real-time approximations, and fake-fluid tricks for games. Use when simulating water, smoke, fire, or gas, or asking how fluid simulation works.
category: engineering
keywords_vi: mô phỏng chất lỏng cơ bản fluid simulation, phương pháp lưới eulerian so với hạt sph lagrangian, trực giác navier-stokes, đối lưu advection, chiếu áp suất giữ không nén incompressible pressure projection, xấp xỉ thời gian thực game, mẹo giả nước khói lửa
---

# Fluid Simulation Basics

Water, smoke, and fire flow, swirl, and interact in ways too complex to keyframe — so we simulate them from physics. Fluid sim is one of the more math-heavy areas of graphics, but the core intuitions are graspable, and games mostly use clever approximations of the "real" thing.

## Two Worldviews

- **Eulerian (grid-based)** — divide space into a fixed **grid** and track fluid quantities (velocity, density, pressure) *at each cell*. Great for smoke/fire and detailed swirling; the standard for gas and film-quality water. You watch the fluid pass through stationary cells.
- **Lagrangian (particle-based, SPH)** — represent the fluid as **particles** that carry mass and move with the flow; each particle's properties are smoothed over its neighbors (**Smoothed Particle Hydrodynamics**). Natural for splashy liquids, easy to handle free surfaces and moving/spraying water. You follow blobs of fluid.

Hybrids (FLIP/PIC, MPM) combine both — particles for advection, a grid for pressure — and dominate modern high-end liquid sims.

## The Physics (Intuition)

Fluids obey the **Navier–Stokes equations**, which are really just Newton's laws for a continuum plus two ideas:
- **Momentum** — fluid accelerates due to pressure differences, viscosity (internal friction), and external forces (gravity, wind).
- **Incompressibility** — most liquids don't change volume, so the velocity field must have **zero divergence** (whatever flows into a region flows out). Enforcing this is the heart of the algorithm.

## The Simulation Loop (Grid)

A classic "stable fluids" step:
1. **Add forces** — gravity, buoyancy (hot smoke rises), user input.
2. **Advect** — move quantities along the velocity field (the fluid carries its own velocity and density downstream). Semi-Lagrangian advection (trace backward from each cell) is stable and popular.
3. **Pressure projection** — solve for a pressure field that, when subtracted, makes the velocity **divergence-free** (incompressible). This is the expensive part — a large linear solve — and it's what makes fluid swirl and conserve volume instead of collapsing.
4. **Boundary conditions** — no flow through walls; handle free surfaces.

Repeat per frame. Add **diffusion/viscosity** for thick fluids; add temperature for fire/smoke buoyancy.

## Real-Time & Games

Full Navier–Stokes is heavy, so games approximate heavily:
- **2D or shallow-water** models for game water surfaces (height fields with wave propagation) — cheap and convincing for oceans/ponds.
- **GPU grids** for smoke/fire in a bounded volume (fluid in a box).
- **SPH on the GPU** for interactive liquid with limited particle counts.
- **Fake it entirely** — most game "water" is a flat mesh with scrolling normal maps, foam textures, and shader tricks (reflection/refraction), *no simulation at all* — because it looks great and costs almost nothing. Splashes and ripples are often particles/decals. Knowing when to fake vs simulate is the real skill.

## Practical Notes

- **Stability** — advection and pressure solves must be stable; semi-Lagrangian + iterative pressure solvers (Jacobi/conjugate gradient) are the safe choices.
- **Cost scales fast** — grid resolution cubed for 3D; keep domains small and bounded.
- **Rendering** — grids need surface extraction (marching cubes) or volumetric rendering; particles need surfacing (metaballs). Rendering the fluid is often as hard as simulating it.

For most game work, the answer is a **shader-based fake for surfaces + particles for splashes + a small GPU grid for smoke/fire** — real simulation reserved for where it truly matters. Understanding the Eulerian/Lagrangian split and the incompressibility-via-pressure idea is enough to reason about all of it.
