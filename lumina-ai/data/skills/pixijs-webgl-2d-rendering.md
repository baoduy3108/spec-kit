---
name: pixijs-webgl-2d-rendering
description: PixiJS 2D WebGL rendering for games and rich graphics — the Application, stage and scene graph (Container/Sprite), the ticker loop, texture/asset loading, sprite batching for performance, filters/shaders, and when to pick Pixi (2D renderer) vs Phaser (full framework) vs Three.js (3D). Use when rendering fast 2D graphics/games in the browser with PixiJS, building a custom 2D WebGL scene, or optimizing draw calls.
category: game-dev
keywords_vi: pixi, pixijs, render 2d webgl, scene graph pixi, ticker pixi, batching draw call, filter shader pixi, game 2d webgl, sprite pixi, đồ hoạ 2d nhanh trình duyệt
---

# PixiJS — Fast 2D WebGL Rendering

PixiJS is a **2D rendering engine** (WebGL/WebGPU with Canvas fallback), not a full game framework. It's the fastest way to draw lots of 2D graphics in a browser — games, interactive art, data-heavy visuals. You bring the game logic; Pixi draws (see webgl-and-shader-fundamentals, three-js-and-web-3d for 3D, phaser-web-game-development for a full framework built on similar ideas).

## Application, Stage & Scene Graph

- **`new Application()`** creates the renderer + canvas + ticker. `await app.init({ width, height })`, then append `app.canvas` to the page.
- **`app.stage`** is the root **Container**. The **scene graph** is a tree of `Container`s and `Sprite`s; a child's transform is relative to its parent (move a container, everything under it moves).
- **`Sprite`** — a positioned, rotatable, tintable image. `Graphics` draws vector shapes; `Text`/`BitmapText` draws text; `Container` groups.
- Draw order = child order (and `zIndex` with `sortableChildren`).

## The Ticker (your loop)

- **`app.ticker.add((time) => { ... })`** runs every frame. Update positions/logic here; Pixi renders the stage automatically after. `time.deltaTime` keeps motion frame-rate independent.
- Pixi doesn't impose a game structure — you add your own state machine, entities, and fixed-timestep for physics (see game-loop-and-fixed-timestep).

## Textures, Assets & Performance

- **`Assets.load('img.png')`** → a `Texture`; make sprites from it. Load a **spritesheet/atlas** (`Assets.load('sheet.json')`) to draw many sprites from one texture (see sprite-atlas-and-texture-packing).
- **Batching is the key perf win** — sprites sharing the same base texture are drawn in **one draw call**. So: pack art into atlases, minimize texture swaps, and avoid mixing many small textures. Thousands of batched sprites run smoothly.
- **ParticleContainer** for huge numbers of simple sprites (extra fast, fewer features).
- Reuse objects/textures; destroy (`sprite.destroy()`) what you stop using to free GPU memory.

## Filters & Effects

- **Filters** are fragment shaders applied to a container/sprite: blur, color-adjust, displacement, or your own GLSL (see shader-effects-and-post-processing). Powerful but cost fill-rate — apply sparingly and to bounded areas.
- **Blend modes**, masks, and render textures enable glow, lighting, and off-screen compositing.

## Pixi vs Phaser vs Three.js

- **PixiJS** — a **2D renderer only**; maximum drawing performance and control, you build the game around it. Best for custom 2D engines, viz, and graphics-heavy apps.
- **Phaser** — a **full 2D game framework** (physics, input, scenes) — faster to make a whole game (it renders via a Pixi-like layer).
- **Three.js** — for **3D** in the browser. Use it (not Pixi) when you need 3D.

Render fast 2D in the browser with PixiJS by building a **scene graph of Containers/Sprites** under `app.stage`, driving updates from the **ticker**, and — crucially — **batching draw calls** via texture atlases for performance. Add **filters** for effects sparingly. Pick **Pixi** when you want a lean 2D renderer and full control, **Phaser** for a ready-made game framework, and **Three.js** for 3D.
