---
name: how-3d-rendering-works
description: How 3D graphics are rendered — the coordinate/transform pipeline (model→world→view→projection→screen), rasterization vs ray tracing, the depth buffer, shading and lighting, textures, and where the GPU fits. Use to understand how a 3D scene becomes a 2D image, and terms like vertex, shader, rasterize, and z-buffer.
category: engineering
keywords_vi: 3d rendering hoạt động thế nào, đồ họa 3d, rasterization ray tracing, shader vertex, ma trận biến đổi transform, z-buffer depth, gpu render, hiểu đồ họa 3d
---

# How 3D Rendering Works

Rendering turns a 3D scene (points, triangles, materials, lights, a camera) into a 2D grid of pixels. Two main approaches: rasterization (fast, real-time) and ray tracing (accurate, expensive).

## The Transform Pipeline

Every 3D object is a mesh of **vertices** forming triangles. To draw them, coordinates pass through a chain of matrix transforms:
- **Model** — place the object in the world (position/rotate/scale).
- **View** — transform the world relative to the **camera**.
- **Projection** — apply perspective (distant things smaller) → clip space.
- **Screen** — map to 2D pixel coordinates.

These are matrix multiplications; understanding them explains cameras, why order of transforms matters, and how objects are positioned.

## Rasterization (real-time / games)

For each triangle, figure out which pixels it covers (**rasterize**), and for each covered pixel run a **fragment/pixel shader** to compute its color. A **depth buffer (z-buffer)** stores the nearest depth per pixel so closer surfaces correctly hide farther ones (solving visibility cheaply). This runs massively in parallel on the **GPU**, which is built for exactly this — thousands of vertices/pixels at once. This is why real-time 3D needs a GPU and why "shaders" are small programs the GPU runs per vertex/pixel.

## Ray Tracing (realism / offline)

Cast a **ray** from the camera through each pixel into the scene; find what it hits; trace secondary rays for reflection, refraction, and shadows. This naturally produces accurate lighting, reflections, and soft shadows — but is far more expensive (why it's used offline for film, or with GPU acceleration/denoising for real-time).

## Shading, Lighting & Textures

- **Shading** computes a surface's color from light direction, surface normal, and material (diffuse + specular models; physically-based rendering for realism).
- **Textures** are images mapped onto surfaces (UV coordinates) for detail without more geometry; normal maps fake surface bumpiness.
- **Normals** (surface directions) drive lighting — bad normals = wrong shading.

The takeaway: 3D is linear algebra (transforms) + a visibility solution (z-buffer or rays) + per-pixel lighting, executed in parallel on the GPU.
