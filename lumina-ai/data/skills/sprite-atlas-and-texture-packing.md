---
name: sprite-atlas-and-texture-packing
description: Sprite atlases and texture packing — combining many images into one texture to cut draw calls, bin-packing algorithms, padding/bleeding to avoid seams, mipmap and power-of-two concerns, UV coordinates, and why batching matters for 2D performance. Use when optimizing 2D rendering, packing sprites, or asking how texture atlases and draw-call batching work.
category: engineering
keywords_vi: atlas sprite, đóng gói texture packing, gộp nhiều ảnh vào một texture, giảm draw call, thuật toán xếp thùng bin packing, đệm chống rỉ màu bleeding, mipmap lũy thừa 2, tọa độ uv sprite, gộp lô batching 2d
---

# Sprite Atlas & Texture Packing

A **sprite atlas** (or texture atlas) packs many small images into one big texture. It's the single most important 2D rendering optimization, because the real cost isn't pixels — it's **draw calls and texture switches**.

## Why: Draw Calls Are the Bottleneck

Every time the GPU switches to a different texture, it breaks **batching** — the ability to draw many sprites in one command. Rendering 1,000 sprites from 1,000 separate images = 1,000 draw calls = slow. Rendering them from **one atlas** lets the engine submit them as a handful of batched draws. On mobile especially, draw-call count often dominates 2D performance far more than fill-rate. Atlasing is how you go from stuttering to smooth.

## Packing: The Bin-Packing Problem

Fitting arbitrary rectangles into the smallest texture is the **2D bin-packing** problem (NP-hard, so heuristics are used):
- **MaxRects**, **Guillotine**, **Skyline (shelf)** — common algorithms that place sprites to minimize wasted space.
- Sort inputs by size (largest first) for better fills.
- **Rotate** sprites 90° if it packs tighter (store the rotation flag).
- **Trim** transparent margins before packing; store the offset so the sprite still positions correctly.

Tools (TexturePacker, engine importers) do this offline and emit the atlas image + a data file mapping each sprite name → its rectangle.

## UVs

Each packed sprite is addressed by **UV coordinates** — the rectangle `(u0,v0)-(u1,v1)` within the atlas. The mesh/quad for a sprite samples just its sub-rectangle. The atlas metadata is essentially a name → UV-rect table.

## Avoiding Seams: Padding & Bleeding

Two classic artifacts:
- **Bleeding** — bilinear filtering samples neighboring pixels at a sprite's edge, pulling in the *adjacent* sprite's color → thin wrong-colored seams. Fix with **padding** (a gap between sprites) plus **extrude/bleed** (duplicate edge pixels outward into the gap).
- **Mipmap bleeding** — at small mip levels, distant sprites blend together. Add more padding, or don't mipmap tightly-packed 2D UI atlases.

Always leave a few px of padding; it's the difference between clean sprites and mysterious edge lines.

## Sizing Concerns

- **Power-of-two** dimensions (256, 512, 1024, 2048) are friendliest for mipmaps and older/mobile GPUs; some hardware requires them for certain features.
- **Atlas size limits** — GPUs cap max texture size (commonly 4096 or 8192); split into multiple atlases if you exceed it, grouping by usage so things drawn together share an atlas (minimizing switches).
- **Group by draw order / scene** — sprites rendered together belong in the same atlas so batching actually kicks in.

## Beyond Static Sprites

- **Animation frames** pack into one atlas (or a sprite sheet grid) so an animation is UV-scrolling, not texture swaps.
- **Font atlases** (glyphs) and **UI atlases** use the exact same technique.
- **Runtime dynamic atlases** pack generated/streamed content on the fly.

The payoff is simple and large: one atlas + batching turns thousands of individual sprite draws into a few, which is often the difference between a 2D game that runs everywhere and one that chugs on mid-range phones.
