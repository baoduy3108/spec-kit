---
name: inverse-kinematics-for-animation
description: Inverse kinematics (IK) for animation and rigging — solving joint angles to place an end effector (hand/foot) at a target, FK vs IK, two-bone analytic solvers, iterative solvers (CCD, FABRIK), constraints and pole vectors, and foot/hand IK for games. Use when rigging characters, doing procedural animation, foot placement, or asking how IK works.
category: engineering
keywords_vi: động học ngược inverse kinematics ik, giải góc khớp đặt đầu cuối end effector, thuận fk so với ngược ik, giải hai khớp analytic two-bone, giải lặp ccd fabrik, ràng buộc pole vector, đặt chân tay theo địa hình foot ik game
---

# Inverse Kinematics (IK) for Animation

Inverse kinematics computes the **joint angles needed to place an end effector** (a hand, foot, or tool tip) at a desired target position. It's the math that lets a character's foot land exactly on uneven ground or a hand reach precisely for a doorknob — without an animator hand-posing every joint.

## FK vs IK

- **Forward kinematics (FK)** — you set each joint's rotation, and the end effector's position *falls out* of the chain. Intuitive, direct, but placing a hand at an exact point means fiddling every joint by trial.
- **Inverse kinematics (IK)** — you set the **target** for the end effector, and the solver *works backward* to find joint angles that reach it. This is the hard direction (often no unique solution, or none) but it's what you want for targets: "put the foot here."

Rigs mix both: FK for expressive arcs (a waving arm), IK for contact (feet on floor, hand on wall).

## Two-Bone Analytic Solver

The common case — arm or leg (two bones, one middle joint) — has a **closed-form** solution using the law of cosines. Given the target distance and the two bone lengths, compute the elbow/knee bend angle directly, then aim the whole chain at the target. Fast, exact, no iteration — the workhorse for limb IK. A **pole vector** resolves the remaining ambiguity (which way the elbow points).

## Iterative Solvers

For longer chains (spine, tail, tentacle) there's no clean formula, so iterate:
- **CCD (Cyclic Coordinate Descent)** — from the tip inward, rotate each joint to point the end effector at the target; repeat until close. Simple, but can look erratic.
- **FABRIK** — treat the chain as points, drag them toward target then back toward the root, alternating. Fast, stable, natural-looking; popular for real-time.
- **Jacobian methods** — linearize and solve; robust and general (multiple targets), heavier compute.

All iterate to a tolerance or max-iterations budget.

## Constraints & Quality

Raw IK produces valid-but-unnatural poses (knees bending backward, over-twist). Constrain it:
- **Joint limits** — clamp each joint's angle range (a knee doesn't hyperextend).
- **Pole vectors / hints** — bias the bend direction (elbows out, knees forward).
- **Preferred pose** — pull toward a rest pose when the target is ambiguous.
- **Smoothing/damping** — avoid jitter and popping between frames as the target moves.

## Game Uses

- **Foot IK** — snap feet to ground height/normal on slopes and stairs so they don't float or clip. The signature "grounded" feel.
- **Hand IK** — align hands to weapons, ledges, steering wheels, buttons.
- **Look-at / aim** — head and spine track a target.
- **Procedural animation** — spider/robot legs step toward reachable footholds entirely by IK, no keyframes.

IK is often **layered on top** of keyframed animation: the base motion plays, then IK corrects contact points to the actual world. That blend — authored motion + IK grounding — is how modern characters feel physically present in their environment rather than sliding over it.
