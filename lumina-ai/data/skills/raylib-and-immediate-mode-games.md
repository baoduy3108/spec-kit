---
name: raylib-and-immediate-mode-games
description: Code-first game programming with raylib and immediate-mode rendering — writing your own game loop from scratch (InitWindow/BeginDrawing/EndDrawing), immediate vs retained mode, input polling, drawing shapes/textures/text, and the minimal-framework approach (raylib, libGDX, SDL). Use when coding a game without a full engine, using raylib/SDL/libGDX, writing a manual game loop, or building-your-own-engine.
category: game-dev
keywords_vi: raylib, viết game raylib, immediate mode game, tự viết game loop, initwindow begindrawing, framework game tối giản, sdl libgdx làm game, tự làm engine game nhỏ, code game không cần engine lớn, build your own engine
---

# raylib & Immediate-Mode Game Programming

Not every game needs a full editor engine. **Code-first frameworks** (raylib, SDL, libGDX, sokol) give you a window, input, drawing, and audio — and *you* write the game loop. This is the "build your own game/engine" path: maximum control, minimal magic, great for learning how games actually work (see game-loop-and-fixed-timestep, how-game-engines-work).

## Immediate Mode vs Retained Mode

- **Immediate mode** (raylib, Dear ImGui) — **every frame you redraw everything** from scratch. There is no persistent scene graph; the screen is a blank canvas each frame and you issue draw calls (`DrawCircle`, `DrawTexture`) directly. Simple mental model, no hidden state.
- **Retained mode** (Godot/Unity scene trees) — you build a **persistent tree of objects** once; the engine redraws it for you. More structure, more machinery.
- Immediate mode shines for **small games, tools, and prototypes**: what you see is exactly the code that ran this frame.

## The raylib Loop (the whole program)

```c
InitWindow(800, 600, "game");
SetTargetFPS(60);
while (!WindowShouldClose()) {      // until Esc/close
    // 1) UPDATE — read input, move state
    if (IsKeyDown(KEY_RIGHT)) x += speed * GetFrameTime();
    // 2) DRAW — clear, then draw this frame's world
    BeginDrawing();
      ClearBackground(RAYWHITE);
      DrawCircle(x, y, 20, BLUE);
      DrawText("score", 10, 10, 20, BLACK);
    EndDrawing();
}
CloseWindow();
```

Every frame is **input → update → draw**. `GetFrameTime()` (delta) keeps motion frame-rate independent (see game-loop-and-fixed-timestep — add a fixed-timestep accumulator for physics).

## Core Building Blocks

- **Input polling** — ask the state each frame: `IsKeyDown`, `IsKeyPressed` (edge), `GetMousePosition`, gamepad queries. (Immediate mode = poll, vs engines' event callbacks.)
- **Drawing** — shapes (`DrawRectangle`), textures (`DrawTexturePro` for source/dest rects — the basis of **sprite atlases**, see sprite-atlas-and-texture-packing), and text. Order matters: later calls draw on top.
- **Textures & atlases** — load once (`LoadTexture`), draw many; pack sprites into one atlas to cut draw calls.
- **Audio, camera2D, collision helpers** — raylib bundles simple ones (`CheckCollisionRecs`, `Camera2D` for scrolling/zoom).
- **Resource lifetime** — you `Load*` and must `Unload*`; no GC. Free textures/sounds you stop using.

## Structuring a Larger Game

- Split into **update()** and **draw()**; keep a simple **game-state enum** (menu/play/pause/gameover) and switch on it.
- Roll your own **entity list** (arrays/structs) or a light **ECS** (see entity-component-system-architecture) as it grows.
- libGDX (Java) and SDL (C) follow the same shape — manual loop, poll input, draw each frame — with more cross-platform plumbing (Web/Android export for libGDX).

Code games directly with raylib/SDL/libGDX by owning the **game loop** — `input → update → draw`, redrawing everything each frame in **immediate mode** — polling input, drawing shapes/textures/text in order, and managing resource lifetimes yourself. It's the transparent, build-your-own path: maximum control and the best way to understand engines, scaling up with a state machine and a light entity system as needed.
