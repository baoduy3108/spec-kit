---
name: collision-detection-and-response
description: How games detect when objects touch and resolve the overlap — collision detection (broad phase + narrow phase) and response. Covers AABB and circle tests, why O(N²) all-pairs fails and how spatial partitioning fixes it, swept/continuous collision to stop fast objects tunneling, and axis-separated resolution for sliding. Use to write platformer/voxel collision, avoid tunneling, and resolve penetrations cleanly.
category: game-dev
keywords_vi: phát hiện va chạm collision detection, phản hồi va chạm response, kiểm tra hộp bao aabb, broad phase narrow phase phân vùng không gian, va chạm quét liên tục swept chống xuyên tường tunneling, giải quyết tách trục axis-separated để trượt
---

# Collision Detection & Response

Two problems hide inside "the character hit the wall": **detection** (did these objects overlap, and by how much?) and **response** (what do we do about it — stop, slide, bounce, push apart?). Getting both right is what makes movement in a platformer, shooter, or voxel game feel solid instead of janky or buggy (see game-loop-and-fixed-timestep, spatial-indexing-quadtrees-and-r-trees, tail-latency-and-hedged-requests).

## Detection: Cheap Shape Tests

Most games approximate objects with simple shapes for fast tests:
- **AABB (axis-aligned bounding box)** — overlap if the boxes intersect on **every** axis (`a.min.x < b.max.x && a.max.x > b.min.x && ...`). Cheapest and most common for tiles/voxels/UI.
- **Circle/sphere** — overlap if distance between centers < sum of radii (compare **squared** distances to skip the sqrt).
- **Separating Axis Theorem (SAT)** — for rotated/convex polygons: if there exists an axis where their projections don't overlap, they're separate.
Use the simplest shape that's accurate enough; precise mesh collision is expensive and rarely needed.

## Broad Phase vs Narrow Phase (don't test everything)

Testing **every pair** of N objects is **O(N²)** — 1,000 objects = 500,000 tests per frame, hopeless. Split into two phases:
- **Broad phase** — quickly cull pairs that *can't* possibly collide, using **spatial partitioning** (uniform grid / spatial hash, quadtree, sweep-and-prune). Only objects in the same/adjacent cells become candidate pairs.
- **Narrow phase** — run the precise shape test only on those few candidates.
This turns O(N²) into roughly O(N) for evenly-spread objects (see spatial-hashing/quadtrees).

## The Tunneling Problem: Continuous Collision

Checking overlap **only at each frame's end position** misses fast objects: a bullet moving 40 units/frame can be *in front of* a 1-unit wall this frame and *behind* it next frame — it **tunneled** through without ever overlapping. Fixes:
- **Swept / continuous collision detection (CCD)** — test the object's **path** (a swept shape / ray) between old and new positions, not just endpoints; find the earliest time-of-impact.
- **Sub-stepping** — advance in smaller increments so the object can't skip past thin geometry (ties into fixed timestep).
Reserve CCD for genuinely fast/thin cases — it's more expensive.

## Response: Resolve Cleanly, Allow Sliding

Once you detect a penetration, you must **resolve** it — and *how* determines feel:
- **Push out by penetration depth** along the collision normal so objects no longer overlap.
- **Axis-separated resolution** — resolve movement **one axis at a time** (move X, resolve X collisions; move Y, resolve Y). This is the trick that lets a character **slide along a wall** instead of sticking, and walk up against a floor without jitter (exactly the pattern in the voxel-world demo).
- **Zero the velocity** along the collision normal (stop), or **reflect** it (bounce), depending on material.
- Set **grounded** state when resolving a downward collision (for jumping).

## Design Guidance (for understanding/using)

- **Approximate with AABB/circle** first — precise collision is rarely worth the cost.
- **Broad-phase with a grid/quadtree** before narrow tests — never do all-pairs at scale.
- **Resolve axis-by-axis** for responsive sliding movement; push out by penetration depth.
- **Use swept/CCD or sub-stepping only for fast, thin cases** to prevent tunneling.
- **Compare squared distances** for circle tests to avoid needless `sqrt`.

## Pitfalls (in understanding/using)

- All-pairs O(N²) detection → collapses with many objects; add a broad phase.
- Checking only **end positions** for fast objects → **tunneling** through thin walls; use swept/sub-stepping.
- Resolving **both axes together** → sticking to walls, jitter; separate the axes.
- Forgetting to push out by **penetration depth** → objects sink into each other and vibrate.
- Over-precise mesh collision everywhere → expensive for no perceptible benefit.
