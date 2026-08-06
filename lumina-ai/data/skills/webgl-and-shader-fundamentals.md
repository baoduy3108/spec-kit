---
name: webgl-and-shader-fundamentals
description: How the GPU draws everything on the web — the WebGL/OpenGL pipeline and shaders. Covers vertex shaders (position each vertex), fragment shaders (color each pixel), buffers/attributes/uniforms/varyings, the MVP matrix chain, and why you batch draw calls. Use to understand GPU rendering, write GLSL for effects, reason about performance (draw calls, overdraw), and build 3D/2D graphics from scratch without a framework.
category: game-dev
keywords_vi: gpu vẽ mọi thứ trên web pipeline webgl opengl và shader, vertex shader định vị mỗi đỉnh fragment shader tô màu mỗi điểm ảnh, buffer attribute uniform varying, chuỗi ma trận model view projection mvp, gộp lời gọi vẽ draw call giảm overdraw, viết glsl cho hiệu ứng dựng đồ hoạ 3d 2d từ đầu
---

# WebGL & Shader Fundamentals

Everything a GPU draws — a 3D voxel world, a 2D sprite, a fancy background effect — goes through the same **rendering pipeline**, and you program two stages of it with **shaders** written in **GLSL**. WebGL exposes this pipeline in the browser (OpenGL ES under the hood). Understanding the pipeline demystifies both how graphics work and why some things are fast and others slow (see game-loop-and-fixed-timestep, how-cpu-caches-work, high-end-visual-design).

## The Pipeline: Vertices → Pixels

At a high level, to draw a triangle mesh the GPU:
1. Reads **vertex data** (positions, colors, texture coords) from **buffers** in GPU memory.
2. Runs your **vertex shader** once per vertex — it transforms each vertex's position into clip space (`gl_Position`) and passes data down.
3. **Rasterizes** — figures out which pixels each triangle covers and **interpolates** the vertex outputs across them.
4. Runs your **fragment (pixel) shader** once per covered pixel — it computes the final color (`gl_FragColor`), sampling textures, applying light/fog, etc.
5. Runs **depth/blend tests** and writes the pixel.
You write steps 2 and 4; the GPU does the rest, massively in parallel (thousands of vertices/pixels at once).

## The Data Plumbing (attributes, uniforms, varyings)

Shaders get data three ways — knowing which is which is half of WebGL:
- **Attributes** — **per-vertex** inputs from buffers (position, uv, normal). Read in the vertex shader.
- **Uniforms** — **per-draw-call** constants shared by all vertices/pixels (the MVP matrix, time, a texture sampler, fog color). Set from JS before drawing.
- **Varyings** — values the vertex shader **outputs** that get **interpolated** across the triangle and read by the fragment shader (interpolated color, uv, world position).

## The MVP Matrix Chain

3D positions reach the screen through a chain of matrix multiplies, applied in the vertex shader:
- **Model** — object's local space → world space (position/rotate/scale the object).
- **View** — world space → camera space (where the camera is / looks).
- **Projection** — camera space → clip space (perspective: far things smaller; or orthographic).
`gl_Position = Projection * View * Model * vec4(pos, 1.0)`. Understanding this chain is essential to placing a camera, moving objects, and debugging "nothing shows up" bugs (usually a bad matrix).

## Performance: Draw Calls and Overdraw

GPU rendering is fast **per pixel/vertex** but each **draw call** has CPU overhead. So:
- **Batch** — merge many objects into few buffers/draw calls (one big mesh beats thousands of tiny ones — exactly why the voxel demo builds one mesh per world).
- **Cull** — don't draw faces/objects you can't see (back-face culling, frustanum culling, occluded faces).
- **Watch overdraw** — pixels drawn multiple times (many transparent layers) waste fragment-shader work; sort/limit transparency.
- Keep textures reasonable and **minimize state changes** (program/texture switches).

## Design Guidance (for understanding/using)

- **Think "vertex shader positions, fragment shader colors"** — that split organizes all GPU work.
- **Attributes = per-vertex, uniforms = per-draw, varyings = interpolated** — pick the right channel for each value.
- **Batch into few draw calls** and cull hidden geometry — draw-call count and overdraw dominate performance.
- **Get the MVP chain right** — most "black screen" bugs are matrix/order mistakes; verify projection·view·model.
- **Use a library (Three.js) for big projects**, but knowing the raw pipeline is what lets you write custom shaders and debug performance.

## Pitfalls (in understanding/using)

- Thousands of tiny **draw calls** → CPU-bound; batch into shared buffers.
- Confusing **attribute vs uniform vs varying** → shader compile/data errors or wrong values.
- Wrong **matrix order** (or missing projection) → nothing renders or looks distorted.
- Heavy **overdraw** from stacked transparency → fragment shader runs many times per pixel; slow.
- Assuming the GPU is slow because pixels are "expensive" → it's usually **draw calls / overdraw / state changes**, not raw shading.
