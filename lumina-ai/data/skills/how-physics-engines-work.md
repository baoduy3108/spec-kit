---
name: how-physics-engines-work
description: How a physics engine simulates motion — numerical integration (Euler/Verlet) of velocity and position, forces and gravity, collision detection (broad + narrow phase) and collision response (impulses, restitution, friction), and constraints. Use to understand real-time physics simulation, why fixed timesteps matter, and how collisions are resolved.
category: engineering
keywords_vi: physics engine, mô phỏng vật lý, tích phân euler verlet, va chạm collision, collision response impulse, lực trọng lực, ràng buộc constraint, mô phỏng chuyển động
---

# How Physics Engines Work

A physics engine advances a world of bodies forward in small time steps, applying forces and resolving collisions so motion looks physically plausible.

## Integration: Turning Forces Into Motion

Each step (`dt`): sum the **forces** on a body (gravity, applied forces) → acceleration `a = F/m` → update **velocity** `v += a·dt` → update **position** `p += v·dt`. This is **numerical integration**:
- **Explicit Euler** — simplest, but gains energy and grows unstable with large steps.
- **Semi-implicit (symplectic) Euler / Verlet** — far more stable for games; Verlet stores previous position instead of velocity and is popular for cloth/particles.
Because integration error grows with step size, physics runs on a **fixed timestep** (e.g. 1/60s) for determinism and stability — the same reason game loops separate simulation from rendering.

## Collision Detection (two phases)

Testing every pair of objects is O(n²), so:
- **Broad phase** — cheaply cull pairs that can't possibly collide using spatial structures (grids, quadtrees/octrees, sweep-and-prune, bounding volumes). Reduces candidates drastically.
- **Narrow phase** — precise shape-vs-shape tests on the survivors (sphere-sphere, box overlap via the Separating Axis Theorem, GJK for convex shapes), producing contact points and penetration depth.

## Collision Response

Once a collision is found, resolve it so objects don't interpenetrate and bounce realistically:
- **Positional correction** — push overlapping bodies apart.
- **Impulses** — apply an instantaneous change in velocity along the contact normal; **restitution** controls bounciness (0 = no bounce, 1 = perfectly elastic), **friction** resists sliding along the surface.
- Conserve momentum between the two bodies (heavier objects move less).

## Constraints & Stability

**Constraints** keep relationships true (a joint holding two bodies, a rope's max length, a hinge). Engines solve many contacts/constraints together each step, usually with **iterative solvers** (relax the system over several iterations per frame) — more iterations = more accuracy, more cost. Stacking, resting contact, and tunneling (fast objects passing through thin walls — fixed with continuous collision detection) are the classic hard cases.

The takeaway: physics = integrate motion on a fixed timestep + detect collisions in two phases for efficiency + resolve them with impulses and constraints. The same broad/narrow-phase and fixed-step ideas power game engines and robotics simulation.
