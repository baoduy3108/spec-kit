---
name: skeletal-animation-and-skinning
description: Skeletal animation and skinning — bones/skeletons and bind poses, vertex skinning (weights, linear blend skinning), animation clips and keyframe sampling, blending and crossfades, blend trees and state machines, additive layers, and root motion. Use when animating 3D characters, rigging, blending animations, or asking how skinned mesh animation works.
category: engineering
keywords_vi: hoạt hình xương, bọc da skeletal skinning, bind pose, linear blend skinning, trộn crossfade, blend tree, animation state machine, lớp cộng additive, root motion, clip keyframe nhân vật 3d
---

# Skeletal Animation & Skinning

Skeletal animation is how nearly every 3D character moves — a hierarchy of **bones** (a skeleton) deforms a **mesh** (the skin). Instead of animating thousands of vertices directly, animators pose a few dozen bones, and the mesh follows. It's the backbone of characters in games, film, and web 3D (see three-js-and-web-3d).

## Bones & Bind Pose

- A **skeleton** is a tree of **bones (joints)**, each with a transform relative to its parent (spine → shoulder → elbow → wrist). Posing a bone moves everything below it.
- The **bind pose** (rest pose, usually a T- or A-pose) is the neutral configuration where the skeleton matches the mesh. Every animation is expressed as offsets from this reference.

## Skinning: Binding Mesh to Bones

**Skinning** attaches mesh vertices to bones so the skin deforms as bones move:
- Each vertex has a set of **bone weights** — how much each influencing bone affects it (usually up to 4 bones, weights summing to 1). A vertex on the elbow is influenced by both upper and lower arm bones.
- **Linear Blend Skinning (LBS)** — each vertex's final position = weighted blend of its position transformed by each influencing bone. Fast, GPU-friendly, the default everywhere. Its flaw: the "candy-wrapper" collapse on strong twists; **dual-quaternion skinning** fixes that at higher cost.

Skinning runs in the **vertex shader** each frame using the current bone matrices (a "bone palette"), so it's cheap even for detailed characters.

## Animation Clips

An **animation clip** ("run", "jump", "wave") is a set of **keyframe tracks** — per-bone rotation/position/scale sampled over time. Playing a clip means, each frame:
1. Find the current time in the clip.
2. **Interpolate** between surrounding keyframes (rotations via **slerp** on quaternions; positions via lerp).
3. Compute each bone's transform → build the bone matrices → skin the mesh.

Clips are authored in Blender/Maya and exported (GLTF/FBX), or captured via motion capture (see motion-capture-and-pose-estimation).

## Blending: The Real Craft

Static clips look robotic; smooth characters **blend** multiple animations:
- **Crossfade** — smoothly transition idle → run over a fraction of a second (weighted mix of both clips), avoiding snapping.
- **Blend trees / blend spaces** — mix clips by a parameter: blend walk↔run by speed, or a 2D blend of directional strafes by movement vector. The character's motion becomes a continuous function of gameplay state.
- **Additive layers** — layer a motion *on top* of a base (a breathing or aiming offset added over a run), computed as a difference from a reference pose.
- **Bone masks** — play different clips on different body parts (wave the upper body while the legs keep running).

## State Machines

An **animation state machine** organizes it all: states (idle, run, jump, attack) with transition conditions and blend times, driven by gameplay parameters (speed, grounded, isAttacking). This decouples "what the character is doing" from "which clips blend how" — the standard architecture in every engine.

## Root Motion & IK

- **Root motion** — bake movement into the animation's root bone so the *animation* drives locomotion (foot-planted, no sliding), instead of code moving the character while feet skate.
- **IK on top** — after playing/blending clips, correct contact with inverse kinematics (feet to ground, hands to targets — see inverse-kinematics-for-animation). Authored motion + IK grounding is the modern combo.

The pipeline: rig a skeleton, skin the mesh with weights, author clips, then at runtime blend clips via a state machine, apply root motion, and finish with IK. That stack turns a few dozen bones into a character that moves like it belongs in the world.
