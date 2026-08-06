---
name: statics-and-mechanics-of-materials
description: Statics and mechanics of materials — force equilibrium, free-body diagrams, moments and torque, stress and strain, tension/compression/shear, bending and beams, factor of safety, and material properties. Use when analyzing structures, forces, loads, or the strength of mechanical/structural components.
category: knowledge
keywords_vi: tĩnh học và sức bền vật liệu statics mechanics of materials, cân bằng lực và biểu đồ vật thể tự do force equilibrium free body diagram, mô men và mô men xoắn moment torque, ứng suất và biến dạng stress strain, kéo nén cắt tension compression shear, uốn và dầm bending beam, hệ số an toàn factor of safety, tính chất vật liệu
---

# Statics & Mechanics of Materials

Statics analyzes **forces on bodies in equilibrium** (not accelerating); mechanics of materials extends this to how those forces create **internal stresses and deformations**, and whether a part will hold or fail. Together they're the foundation of structural and mechanical engineering — how we know a bridge, beam, or bracket is strong enough.

## Statics: Equilibrium

A body in **static equilibrium** has zero net force and zero net moment:
- **ΣF = 0** — forces balance in every direction (ΣFx = 0, ΣFy = 0, ΣFz = 0).
- **ΣM = 0** — moments (rotational effects) balance about any point.

These equations let you solve for unknown forces (support reactions, internal member forces). They're the core tool of statics.

## Free-Body Diagrams (The Essential Skill)

The **free-body diagram (FBD)** — isolating a body and drawing *all* external forces and moments acting on it — is the single most important technique. Nearly every statics problem starts with a correct FBD; get it right (all loads, reactions, and directions) and the equilibrium equations follow. Sloppy FBDs are the #1 source of errors.

## Moments & Torque

- **Moment** — a force's tendency to cause rotation about a point: **M = F × d** (force × perpendicular distance/lever arm). Longer lever arm = more moment (why wrenches have long handles).
- **Torque** — moment causing twisting about an axis (shafts, fasteners).
- Balancing moments (not just forces) is essential — a body can have balanced forces but still rotate.

## Stress & Strain

Moving from external forces to internal effects:
- **Stress (σ)** — internal force per unit area: **σ = F/A** (units: Pa, psi). How concentrated the load is — the same force on a thinner part means higher stress.
- **Strain (ε)** — deformation per unit length (ΔL/L), a dimensionless measure of how much material stretches/compresses.
- **Hooke's Law** — in the elastic region, stress ∝ strain: **σ = E × ε**, where **E (Young's modulus)** is the material's stiffness. Stiffer materials (higher E) deform less under load.

## Types of Loading

- **Tension** — pulling apart (stretches; e.g. cables). **Compression** — pushing together (columns, can buckle).
- **Shear** — forces sliding parallel surfaces past each other (bolts, rivets, τ = F/A).
- **Bending** — beams under transverse loads develop tension on one face, compression on the other (analyzed via bending moment and section modulus).
- **Torsion** — twisting (shafts).
Real components often combine these.

## Beams & Bending

Beams (loaded transversely) are ubiquitous:
- **Shear and bending-moment diagrams** map internal shear and moment along the beam — locating the maximum moment (where bending stress peaks and failure is likely).
- **Bending stress** σ = M×c/I — depends on the moment (M), distance from neutral axis (c), and the cross-section's **moment of inertia (I)** (shape efficiency — why I-beams put material far from the center).
- Deflection matters too (stiffness/serviceability), not just strength.

## Failure, Safety & Materials

- **Material properties** — yield strength (onset of permanent deformation), ultimate strength (fracture), stiffness (E), ductile vs brittle behavior. Read from stress-strain curves.
- **Factor of safety** — design so working stress is well below the material's strength (FoS = strength/actual stress, e.g. 2–4×), accounting for uncertainty, variability, and consequences of failure.
- **Failure modes** — yielding, fracture, fatigue (repeated loading), buckling (slender compression members). Good design anticipates the relevant mode.

Analyze structures and components using **static equilibrium (ΣF=0, ΣM=0)** solved via careful **free-body diagrams**, **moments** for rotational effects, and **stress/strain with Hooke's law** to find internal effects — accounting for **tension/compression/shear/bending/torsion**, using **shear and bending-moment diagrams** for beams, and ensuring strength with an adequate **factor of safety** against the relevant **failure mode** and material limits. This is how engineers know a structure will safely bear its loads.
