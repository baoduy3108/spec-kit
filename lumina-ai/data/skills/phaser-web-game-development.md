---
name: phaser-web-game-development
description: Phaser 3 web game development — the Scene lifecycle (preload/create/update), the game config, loading assets, sprites and the display list, Arcade Physics, input, tweens, and shipping HTML5 games that run in the browser and mobile. Use when building a 2D web game in Phaser/JavaScript/TypeScript, structuring scenes, loading assets, or using Arcade physics and tweens.
category: game-dev
keywords_vi: phaser, phaser 3, game phaser, arcade physics, game html5, html5 game, preload create update, sprite phaser, display list phaser, scene phaser
---

# Phaser 3 Web Game Development

Phaser is the most popular framework for **2D HTML5 games** that run in any browser (and wrap to mobile). You write JavaScript/TypeScript; Phaser handles the canvas/WebGL renderer, asset loading, input, physics, and audio (see game-loop-and-fixed-timestep, webgl-and-shader-fundamentals).

## Game Config & Scenes

- A game is created from a **config**: `new Phaser.Game({ type: Phaser.AUTO, width, height, physics, scene })`. `AUTO` picks WebGL, falls back to Canvas.
- The unit of structure is a **Scene** (menu, level, HUD). A Scene has three lifecycle hooks:
  - **`preload()`** — queue asset loads (`this.load.image('player', 'p.png')`, spritesheets, audio). Phaser loads them before `create`.
  - **`create()`** — build the world: add sprites, set up physics, input, colliders. Runs once.
  - **`update(time, delta)`** — the game loop, every frame. Move things, read input, check state. Use `delta` for frame-rate independence.
- Scenes can run in **parallel** (a `UIScene` over a `GameScene`) and be started/stopped/switched (`this.scene.start('Level2')`).

## Sprites & the Display List

- **`this.add.sprite(x, y, 'key')`** creates a game object on the **display list** (draw order = creation order; use `depth` to reorder).
- **Spritesheets / texture atlases** — load a sheet, define frames, drive animations with `this.anims.create({ key, frames, frameRate, repeat })` and `sprite.play('run')` (see sprite-atlas-and-texture-packing).
- **Containers** group objects; **cameras** (`this.cameras.main`) scroll, zoom, and follow (`startFollow(player)`).

## Arcade Physics

- Phaser's lightweight **Arcade Physics** (AABB, no rotation) covers most 2D games: `this.physics.add.sprite(...)` gives a body with `velocity`, `gravity`, `bounce`.
- **Collisions/overlaps**: `this.physics.add.collider(player, walls)` (blocks), `this.physics.add.overlap(player, coins, collect)` (triggers a callback). For rotation/joints, use **Matter.js** physics instead.

## Input, Tweens, State

- **Input** — `this.input.keyboard.createCursorKeys()` (poll in `update`), `this.input.on('pointerdown', ...)` for mouse/touch.
- **Tweens** — `this.tweens.add({ targets: sprite, x: 400, duration: 500, ease: 'Sine.easeInOut' })` for smooth motion/UI (see easing-and-animation-timing).
- **State between scenes** — a **Registry** (`this.registry`) or a global object; pass data via `this.scene.start('key', data)`.

## Shipping to Web & Mobile

- Output is plain **HTML/JS** — host on any static site (free), no install for players. Bundle with Vite/Webpack; TypeScript is well-supported.
- Wrap to **mobile** via Capacitor/Cordova for app-store builds. Optimize with texture atlases, object reuse, and `roundPixels` for crisp pixel art.
- Pitfalls: heavy per-frame allocations (GC hitches), forgetting `delta`, and loading assets outside `preload`.

Build Phaser web games from a **config + Scenes**, using each scene's **`preload`/`create`/`update`** lifecycle: queue assets in preload, build the world in create, run the loop in update. Add **sprites to the display list**, drive motion with **Arcade Physics** (colliders/overlaps) and **tweens**, poll **input** each frame, and ship the result as **static HTML5** — instantly playable in a browser and wrappable to mobile.
