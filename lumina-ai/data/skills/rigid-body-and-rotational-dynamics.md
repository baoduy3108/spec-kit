---
name: rigid-body-and-rotational-dynamics
description: Rigid-body and rotational dynamics (advanced/chuyên physics) — torque, moment of inertia, angular momentum and its conservation, rotational kinetic energy, rolling motion, the parallel-axis theorem, and combined translation-rotation. Use for advanced/gifted-exam physics rotation problems, rigid-body motion, angular momentum, or Olympiad mechanics.
category: knowledge
keywords_vi: động lực học vật rắn và chuyển động quay chuyên lý, mô men lực torque, mô men quán tính moment of inertia, mô men động lượng và bảo toàn, động năng quay, chuyển động lăn không trượt, định lý trục song song, kết hợp tịnh tiến và quay
---

# Rigid-Body & Rotational Dynamics (Advanced Physics)

Rotational dynamics extends Newton's mechanics to **spinning, rolling rigid bodies** — a demanding topic in gifted-exam (chuyên) and olympiad physics. The beauty is a deep parallel: every linear concept (force, mass, momentum, energy) has a rotational analog. Mastering both, and combining them, is key to top scores.

## The Linear-Rotational Analogy

The organizing insight — rotation mirrors translation:
| Linear | Rotational |
|---|---|
| displacement x | angle θ |
| velocity v | angular velocity ω |
| acceleration a | angular acceleration α |
| mass m | moment of inertia I |
| force F | torque τ |
| momentum p = mv | angular momentum L = Iω |
| F = ma | **τ = Iα** |
| KE = ½mv² | KE = ½Iω² |

Every rotational equation echoes a linear one. Internalizing this makes the whole topic coherent.

## Torque

**Torque τ = r × F = rF sin θ** — the rotational analog of force; it causes angular acceleration. Depends on force, lever arm (perpendicular distance to the axis), and angle. Net torque about an axis drives rotation (τ_net = Iα). For **rotational equilibrium**, Στ = 0 (used in statics/balance problems — see statics-and-mechanics-of-materials).

## Moment of Inertia

**I = Σmᵢrᵢ²** — rotational "mass": how mass is distributed relative to the axis. Mass farther from the axis contributes more (r²), so *distribution matters*, not just amount.
- Standard results: solid disk/cylinder ½MR², hoop MR², solid sphere ⅖MR², rod about center 1/12 ML². Worth memorizing common bodies.
- **Parallel-axis theorem** — I = I_cm + Md²: the moment of inertia about any axis equals that about the parallel axis through the center of mass, plus Md². Essential for shifting axes.

## Angular Momentum & Conservation

- **L = Iω** — angular momentum. **Conserved** when net external torque is zero — a powerful principle.
- **The spinning skater** — pulling arms in reduces I, so ω increases (L constant). Explains gyroscopes, orbits (Kepler's second law), collisions with rotation.
- Angular momentum conservation solves many problems energy/force analysis can't easily reach.

## Rotational Energy & Rolling

- **Rotational KE = ½Iω²**, adding to translational KE for moving-and-spinning bodies. Total KE = ½Mv² + ½Iω².
- **Rolling without slipping** — the key constraint **v = ωR** links translation and rotation. A rolling object's energy splits between translation and rotation, so (e.g.) a rolling ball accelerates down a ramp slower than a sliding one, and different shapes (hoop vs sphere) roll at different rates depending on I.
- **Friction** provides the torque for rolling (static friction, does no work in pure rolling).

## Combined Translation + Rotation

The hardest, most rewarding problems couple both:
- Analyze the **center of mass** with F = Ma (linear) *and* rotation about the CM with τ = Iα (rotational), linked by constraints (like v = ωR for rolling).
- Use **energy conservation** (½Mv² + ½Iω² + PE) as an often-simpler alternative, and **angular momentum conservation** for collisions/impulsive torques.
- Yo-yos, rolling on inclines, pivoting rods, ballistic-pendulum-with-rotation — all combine the two sets of equations.

Master advanced rotational dynamics via the **linear-rotational analogy** (θ, ω, α, I, τ, L mirroring x, v, a, m, F, p), **torque** (τ = rF sinθ) driving **τ = Iα**, **moment of inertia** (mass distribution, parallel-axis theorem), **angular momentum conservation** (the skater effect — a powerful shortcut), **rotational energy and rolling** (v = ωR constraint), and **combining translation and rotation** via linked F=Ma / τ=Iα equations or energy/momentum conservation. This depth — beyond basic mechanics — is what gifted-exam and Olympiad physics demands.
