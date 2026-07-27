---
name: image-to-procedural-3d
description: Reconstructing an object from a reference image as an animation-ready procedural three.js model (not a scanned mesh) — first authoring a JSON sculpt spec of components/materials/hierarchy, then building through gated passes (blockout → structure → form → material → surface → lighting → interaction → optimization) with visual comparison at each gate, generating primitives/procedural shaders in code and never downloading assets. Use to turn a picture into 3D code, build procedural three.js from a reference image, or a staged image-to-3D pipeline.
category: design-system
keywords_vi: mô hình 3d thủ tục, ảnh tham chiếu, three.js từ ảnh, sculpt spec json, các pass dựng có kiểm duyệt, blockout tinh chỉnh hình khối, mô hình 3d không tải asset
---

# Image → Procedural 3D

There are two ways to get a 3D object from a picture. **Photogrammetry / mesh extraction** scans geometry into a dense, static mesh — accurate but heavy, hard to animate, and opaque to edit. The alternative, covered here, is **procedural reconstruction**: generate **code** (e.g. a three.js factory) that *builds* the object from primitives, procedural shaders, and generated geometry — producing a clean, **animation-ready, editable** model that captures the object's *identity* rather than a point-perfect scan (see 3d-scene-representation, procedural-generation-in-games, how-3d-rendering-works, image-to-code).

## The Goal: A Model That Captures Identity, Not a Scan

The output is a **procedural factory** (say, a function returning a `THREE.Group`) — no downloaded assets, no baked mesh. That means the result is **parametric and animatable**, small, and human-readable. The tradeoff: you're not reproducing every pixel; you're reconstructing the object's **defining structure and character** well enough to be recognizable and useful.

## Step 1: Author a Spec Before Any Code

Start by **analyzing the image**, not generating geometry: classify the subject (object / character / hybrid) and **inventory the identity-defining details** — silhouette, bevels, fasteners, materials, finishes, proportions. Write this into a structured **sculpt spec** (JSON): the **components**, their **materials**, and the **runtime hierarchy**. Authoring the spec first forces understanding and gives every later pass a target to check against — the same discipline as writing an interface before an implementation.

## Step 2: Build Through Gated Passes

Construct the model **sequentially**, each pass a focused concern, each ending in a **gate** — a visual comparison of the render against the reference before continuing:
1. **Blockout** — rough masses and proportions (get the silhouette right first).
2. **Structural** — major parts, correct hierarchy and pivots.
3. **Form refinement** — bevels, curves, the details that carry identity.
4. **Material** — base materials/PBR properties per component.
5. **Surface** — procedural shaders, texture detail, wear.
6. **Lighting** — light the scene to match/read well.
7. **Interaction** — hooks for animation/interactivity (the payoff of being procedural).
8. **Optimization** — reduce draw calls / geometry cost for runtime.
At each gate you **self-correct**: continue, refine the spec, refine the code, or stop — driven by how the render compares to the image.

## Why This Structure Wins (esp. for an LLM/agent)

- **Token/effort efficiency** — deterministic scripts handle validation, gating, and spec bookkeeping; the model spends its effort on **visual judgment and code review**, not busywork.
- **Bounded errors** — one concern per pass; a gate catches drift early instead of compounding into an unfixable model.
- **Editable result** — because it's code from a spec, you can tweak a parameter, not re-sculpt.

## Design Guidance

- **Analyze → spec → build** — never jump straight to geometry; the spec is the contract.
- **Silhouette/blockout first** — proportions before details; fix big shapes before bevels.
- **One concern per pass, gate each** — compare render vs reference before moving on.
- **Generate procedurally** — primitives + shaders + generated geometry; **no downloaded assets**.
- **Reserve judgment for what matters** — automate validation; spend model effort on visual review.
- **Build for animation** — hierarchy/pivots/interaction hooks are the reason to go procedural.

## Pitfalls (in understanding/using)

- Expecting a **pixel-perfect** copy → procedural reconstruction captures identity, not a scan.
- **Skipping the spec** → the model has no target to check passes against; drift.
- **Detailing before blockout** → bevels on wrong proportions; fix silhouette first.
- **No gates** → errors compound into an unrecoverable mess; compare every pass.
- **Downloading assets** → defeats the point (procedural, editable, animation-ready).
- Optimizing **too early** → you optimize geometry that later passes will change.
