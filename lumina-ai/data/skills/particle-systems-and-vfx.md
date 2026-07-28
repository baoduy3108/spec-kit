---
name: particle-systems-and-vfx
description: Particle systems and visual effects for games — emitters, per-particle lifetime/velocity/color/size curves, forces (gravity, drag, turbulence), pooling for thousands of particles, GPU instancing, and common effects (fire, smoke, explosions, sparks, trails). Use when adding VFX, juice, or explosion/smoke/magic effects to a game.
category: engineering
keywords_vi: hệ thống hạt, particle system, hiệu ứng hình ảnh vfx, emitter phát hạt, gpu instancing, làm lửa khói nổ, tia lửa trail, đường curve màu kích thước hạt, vòng đời hạt lifetime
---

# Particle Systems & VFX

Fire, smoke, explosions, sparks, magic, dust, rain — nearly every juicy game effect is a **particle system**: many tiny sprites, each with a short independent life, that together read as a fluid phenomenon. Understanding the anatomy lets you build any effect from the same parts.

## Anatomy

- **Emitter** — spawns particles: a rate (per second) or a one-shot **burst**, from a shape (point, line, circle, cone). Position it on the muzzle, the impact, the exhaust.
- **Particle** — a lightweight struct: position, velocity, `age`, `lifetime`, plus visual params. Cheap and numerous (thousands).
- **Update** — each frame: `age += dt`; if `age > lifetime`, kill it; else integrate `pos += vel*dt`, apply forces, and evaluate curves.
- **Render** — draw as textured quads, usually with **additive blending** for glowy things (fire, sparks) or alpha blending for smoke/dust.

## Curves Over Lifetime

The trick that makes particles look *alive* is animating properties over a particle's normalized age `t = age/lifetime` (0→1):
- **Size** — sparks shrink to nothing; smoke expands.
- **Color/alpha** — fire goes white→yellow→orange→red→transparent; fade out at the end so nothing pops off abruptly.
- **Velocity/drag** — fast burst that slows down (drag), or accelerates (gravity on debris).

Use easing curves, not linear, for organic motion. Add **randomization** per particle (jitter lifetime, initial speed, angle, start size) so they don't look like a machine — variance is what sells it.

## Forces

- **Gravity** — debris/embers fall; smoke has negative gravity (rises).
- **Drag** — `vel *= (1 - drag*dt)`; air resistance, dust settling.
- **Turbulence/noise** — sample curl/Perlin noise into velocity for swirling smoke and flames. This single addition is the difference between "dead" and "flowing".
- **Attractors/vortices** — pull toward a point for magic swirls.

## Recipes

- **Explosion** — burst of 50–200: fast outward sparks (additive, shrink), a smoke puff (alpha, expand, rise), a flash quad, plus screen shake and a low sound. Layering multiple sub-emitters is how pros build "one" effect.
- **Fire** — steady upward emit, turbulence, color ramp, additive.
- **Trail** — emit from a moving object each frame; short lifetime; fades behind it.
- **Impact** — small directional spark burst aligned to the surface normal.

## Performance

Thousands of particles demand care:
- **Pool** particles in a fixed array; never allocate per spawn (see object-pooling-in-games).
- **GPU instancing / batching** — one draw call for all particles of an emitter; put per-particle data in a buffer. CPU particles cap out around low tens of thousands; GPU particle systems reach millions by simulating in a compute/vertex shader.
- **Cap and cull** — a global budget; stop emitting off-screen; use soft caps so a busy scene degrades gracefully instead of tanking framerate.

VFX is pure juice — cheap to add, huge on feel. Restraint matters: readable, motivated effects beat constant confetti.
