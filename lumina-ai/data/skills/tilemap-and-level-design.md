---
name: tilemap-and-level-design
description: Tilemaps and level design for 2D games — grids of reusable tiles, autotiling/bitmasking for seamless edges, layered maps (background/collision/decoration), chunking for large worlds, and level-design principles (pacing, teaching, sight lines). Use when building a 2D game world, a level editor, or asking how tile-based maps and level layouts work.
category: design
keywords_vi: tilemap bản đồ ô lưới, thiết kế màn chơi level design, ghép tile tự động autotiling bitmask, lớp bản đồ va chạm trang trí, chia chunk bản đồ lớn, đặt ô tile game 2d, nhịp độ dạy người chơi qua màn
---

# Tilemaps & Level Design

A **tilemap** builds a 2D world from a grid of small reusable images (**tiles**). Instead of one huge hand-painted image, you store a 2D array of tile indices — memory-cheap, fast to render, and easy to edit. This is how most 2D platformers, RPGs, and roguelikes represent their worlds.

## The Grid

The map is `int[rows][cols]` where each cell holds a tile ID (0 = empty). Render by looping visible cells and blitting `atlas[id]` at `(col*TILE, row*TILE)`. World→tile is just `floor(x / TILE)`; tile→world is `col * TILE`. This integer grid makes collision, pathfinding, and lookups trivial — a huge reason tile games are approachable.

## Autotiling (Bitmasking)

Hand-placing every edge/corner tile is tedious and error-prone. **Autotiling** picks the correct tile automatically from its neighbors. Compute a **bitmask**: for each of the 4 (or 8) neighbors that are "same terrain", set a bit → a number 0–15 (or 0–255). Map that number to the tile variant (inner corner, edge, T-junction…). A 4-bit blob needs 16 tiles; the 8-bit "47-tile" set handles every corner case seamlessly. Now the artist paints *terrain regions* and edges resolve themselves.

## Layers

Real maps use **multiple stacked layers**:
- **Background** — non-interactive scenery (parallax for depth).
- **Collision** — which cells are solid (often a separate boolean grid, not drawn).
- **Decoration/foreground** — details, and tiles drawn *over* the player for depth.
- **Object/entity layer** — spawn points, triggers, items (positions, not tiles).

Keeping collision separate from visuals means a "spike" tile and a "grass" tile can share one collision rule, and you can retheme art without touching gameplay.

## Big Worlds: Chunking

For large/infinite maps, split into **chunks** (e.g. 32×32 tiles). Only keep chunks near the camera loaded and meshed; generate or stream the rest on demand. Rebuild a chunk's render batch only when a tile in it changes (dirty flag) — never per frame.

## Level Design Craft

Layout is not just geometry — it teaches and paces:
- **Introduce → test → twist** — show a mechanic safely, then demand it, then combine it.
- **Teach without text** — a pit before a moving platform teaches "jump on it" by consequence.
- **Sight lines & framing** — guide the eye toward the goal or the next threat; use light, contrast, leading lines.
- **Pacing** — alternate tension and rest; don't stack every hard idea back-to-back.
- **Readable danger** — hazards must look dangerous; safe ground must look safe. Consistent visual language is a contract with the player.

Good levels feel authored even when built from a small tile vocabulary — the constraint is the point.
