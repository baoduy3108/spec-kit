---
name: cloth-and-soft-body-simulation
description: Cloth and soft-body simulation — mass-spring systems, Verlet integration, distance/bending constraints, position-based dynamics (PBD), self-collision, tearing, and pinning. Covers stability and stiffness trade-offs. Use when simulating cloth, rope, jelly, hair, or deformable objects in a game or graphics app.
category: engineering
keywords_vi: mô phỏng vải và vật thể mềm soft body, hệ khối lượng lò xo mass-spring, tích phân verlet integration, ràng buộc khoảng cách và uốn constraint, động lực dựa vị trí position based dynamics pbd, tự va chạm self collision xé rách tearing, ghim điểm pinning độ cứng stiffness
---

# Cloth & Soft-Body Simulation

Cloth, rope, hair, and jelly are **deformable** — they have no fixed shape, bending and stretching in response to forces. Simulating them convincingly and stably is a distinct craft from rigid-body physics, built on particles connected by constraints.

## Mass-Spring Model

The classic representation: a **grid of point masses** (particles) connected by **springs**. For cloth:
- **Structural springs** connect adjacent particles (resist stretching).
- **Shear springs** connect diagonals (resist shearing).
- **Bending springs** connect particles two apart (resist folding too sharply).

Each spring applies a force proportional to how far it's stretched from its rest length (Hooke's law). Sum forces, integrate, repeat. Simple, but stiff springs need tiny time steps or they **explode** — the core stability headache.

## Verlet Integration

Cloth is usually integrated with **Verlet** rather than Euler:
```
next = pos + (pos - prevPos) * damping + accel * dt²
```
It stores the *previous* position instead of explicit velocity (velocity is implied by `pos - prevPos`). This is more **stable** for constraint systems and makes constraint-satisfaction trivial: just move a particle and its velocity updates automatically next frame. It's the backbone of most real-time cloth.

## Position-Based Dynamics (PBD)

The dominant modern approach for real-time. Instead of computing spring *forces* (unstable when stiff), PBD works directly on **positions** by iteratively satisfying **constraints**:
1. Predict positions from velocity + gravity.
2. **Project constraints** — for each distance constraint, move the two particles so their distance returns to rest length; repeat several **iterations** per frame.
3. Derive new velocity from the corrected positions.

The magic: **stiffness = iteration count**, and it's *unconditionally stable* (constraints only ever shorten the error). More iterations = stiffer, tighter cloth; fewer = stretchy. This stability is why PBD (and its successor XPBD) powers most game cloth and soft bodies.

## Constraints Toolbox

- **Distance** — keep two particles at rest length (stretch resistance).
- **Bending** — resist creasing (dihedral angle or extra distance constraints).
- **Pinning / attachment** — fix certain particles to the world or a bone (a flag's edge, a cape's collar) — just skip updating them.
- **Collision** — push particles out of colliders (sphere/capsule approximations of the body are cheap and effective).
- **Self-collision** — stop cloth passing through itself; expensive (needs spatial hashing), often approximated or limited.
- **Tearing** — remove/split constraints past a stretch threshold to rip cloth.

## Soft Bodies

The same idea extends to volumetric jelly/flesh: particles throughout a volume with constraints preserving distances and **volume** (a volume constraint stops it collapsing). Pressure models inflate closed meshes (balloons). Rope is a 1D chain of distance constraints; hair is many such strands.

## Practical Trade-offs

- **Stability vs stiffness** — real cloth barely stretches, but perfectly stiff is numerically hard; PBD's iteration knob manages this gracefully.
- **Resolution** — more particles = better drape but more cost; often simulate a coarse cloth and render a smoother mesh on top.
- **Damping** — prevents jittery, never-settling motion; too much looks like it's underwater.
- **Fixed timestep** — deformable sims are timestep-sensitive; substep for fast motion (see game-loop-and-fixed-timestep).

The winning recipe for games is **PBD/XPBD with Verlet-style position updates and a few constraint iterations** — stable, fast, and tunable, turning a grid of points and simple rules into believable flowing fabric.
