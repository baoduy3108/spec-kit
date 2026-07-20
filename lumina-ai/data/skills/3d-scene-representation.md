---
name: 3d-scene-representation
description: How modern 3D scene representations work — meshes vs point clouds vs implicit fields, NeRF (neural radiance fields) reconstructing 3D from photos, Gaussian splatting for fast realistic rendering, and their use in capture, novel-view synthesis, and generative 3D. Use to understand NeRF, Gaussian splatting, 3D reconstruction from images, novel view synthesis, or representing 3D scenes.
category: engineering
keywords_vi: 3d scene representation, biểu diễn cảnh 3d, mesh point cloud implicit field, nerf neural radiance field, gaussian splatting, dựng 3d từ ảnh, novel view synthesis, 3d sinh tạo
---

# 3D Scene Representation

How you **represent a 3D scene** determines how you capture, render, and generate it. Beyond traditional meshes, recent AI methods (**NeRF**, **Gaussian splatting**) reconstruct photorealistic 3D from ordinary photos, transforming 3D capture and enabling new generative-media and video capabilities (see how-3d-rendering-works).

## Traditional Representations

- **Polygon meshes** — surfaces made of triangles/vertices (the standard for games/film — see how-3d-rendering-works). Efficient to render, editable, but hard to reconstruct accurately from photos and to represent complex/fuzzy things (hair, smoke).
- **Point clouds** — sets of 3D points (from LiDAR/photogrammetry). Raw capture data; no surfaces/connectivity.
- **Voxels** — a 3D grid (like 3D pixels); simple but memory-heavy at high resolution.
Each trades detail, memory, editability, and reconstruction ease.

## NeRF (Neural Radiance Fields)

A breakthrough: instead of explicit geometry, **NeRF represents a scene as a neural network** — a function that, given a 3D point and viewing direction, outputs the **color and density** there (an **implicit** representation). Trained on a set of photos from different angles, it learns the whole scene's appearance. Then you can render **novel views** — synthesize the scene from **camera angles never photographed** — with photorealistic quality, including view-dependent effects (reflections, transparency) meshes struggle with. The magic: reconstruct a full 3D scene from a handful of 2D photos. Downside: original NeRFs are **slow** to train and render.

## Gaussian Splatting (the fast successor)

**3D Gaussian Splatting** represents a scene as millions of tiny **3D Gaussians** (fuzzy colored blobs) instead of a neural field. It achieves NeRF-like photorealism but renders in **real time** (much faster) and trains faster, making the technology practical. It's rapidly become popular for photorealistic capture because you get both **quality and speed**. Each Gaussian has position, size, orientation, color, and opacity, optimized to reconstruct the input photos.

## What These Enable

- **3D capture from photos/video** — reconstruct a real object/place/person in 3D from ordinary images (no special scanner). Democratizes 3D scanning.
- **Novel-view synthesis** — generate new camera viewpoints of a scene (virtual camera moves, VR/AR, bullet-time effects).
- **Generative 3D** — text-to-3D and image-to-3D models increasingly use these representations to generate 3D assets/scenes (bridging generative AI and 3D — see how-diffusion-models-work).
- **Video/film** — set reconstruction, virtual production, consistent 3D scenes for camera moves.

## Choosing / Trade-offs

- **Meshes** — for editing, games, standard pipelines, and where you need clean geometry.
- **NeRF/Gaussian splatting** — for photorealistic capture and novel views from photos; less directly editable (converting to meshes is an active area).
- Splatting generally beats NeRF on **speed**; the field evolves fast.

## Pitfalls (in understanding/using)

- Expecting NeRF/splatting to give clean **editable geometry** — they're great for viewing/rendering, harder to edit like meshes.
- **Poor input photos** (too few angles, motion blur, inconsistent lighting) → bad reconstruction; capture matters.
- Assuming NeRF is **real-time** — original NeRFs are slow; Gaussian splatting is the fast option.
- Reconstructing **moving/changing** scenes (dynamic NeRF is harder than static).
- Confusing an **implicit** representation (NeRF) with explicit geometry (mesh) — different strengths.
- Expecting **generative 3D** to match generative-2D maturity — 3D generation is younger and harder.
- Ignoring compute/memory costs for high-quality captures.
