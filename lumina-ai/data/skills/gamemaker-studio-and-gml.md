---
name: gamemaker-studio-and-gml
description: GameMaker Studio and GML (GameMaker Language) — objects and instances, the event/action model (Create/Step/Draw/Alarm/Collision), rooms, sprites, GML scripting, built-in variables, and fast 2D game making with drag-and-drop or code. Use when building a 2D game in GameMaker, writing GML, structuring objects/events/rooms, or using alarms/collision events.
category: game-dev
keywords_vi: gamemaker, gml, gamemaker studio, instance gamemaker, create step draw event, alarm hẹn giờ, collision event gml, room màn chơi, sprite gamemaker, game 2d gamemaker
---

# GameMaker Studio & GML

GameMaker is a beginner-friendly, fast engine for **2D games** (many hit indie titles shipped on it). Its model is **objects driven by events**: you place instances in **rooms**, and each object reacts to events with **drag-and-drop actions or GML** (GameMaker Language) code (see how-game-engines-work, tilemap-and-level-design).

## Objects, Instances & Rooms

- **Object** — a template with events and behavior (e.g. `obj_player`, `obj_enemy`). It usually has a **sprite** for its look.
- **Instance** — a live copy of an object placed in a room. Code refers to instances by their **id**; `instance_create_layer(x, y, "Instances", obj_bullet)` spawns one, `instance_destroy()` removes it.
- **Room** — a level/screen (also used for menus). Rooms hold instances, tile layers, backgrounds, and a camera/viewport.
- **Sprite** — the image/animation; set `image_speed`, `image_index` to control animation frames.

## The Event Model (the heart of GameMaker)

Each object responds to **events**; you put code/actions in the ones you need:
- **Create** — runs once when the instance is made. Initialize variables (`hp = 3; spd = 4;`).
- **Step** — runs **every frame** (the main update). Read input, move, check state. (`Begin Step`/`End Step` for ordering.)
- **Draw** — runs every frame to render. By default it draws the sprite; override to draw custom graphics, HUD, health bars (`draw_self()`, `draw_text`, `draw_sprite`).
- **Alarm[0..11]** — countdown timers: set `alarm[0] = 60;` (60 steps), and the **Alarm event** fires when it hits 0 — great for cooldowns/spawns.
- **Collision** — fires when this instance overlaps another object; handle damage/pickups here.
- **Key/Mouse** input events, plus **Destroy**, **Room Start/End**, and more.

## GML Essentials

- C-like syntax: `if (hp <= 0) instance_destroy();` `for (var i = 0; i < 10; i++) {}`.
- **Built-in instance variables** — `x, y, hspeed, vspeed, speed, direction, image_angle, sprite_index, depth`. Setting `x`/`y` moves the instance; `depth` controls draw order (lower = in front).
- **Local vars** with `var`; instance vars persist on the instance; **global** with `global.score`.
- Movement: set `x += spd` in Step, or use built-in `move_toward_point`, `place_meeting(x, y, obj_wall)` for collision checks before moving.
- **Scripts/functions** and structs organize reusable GML; **data structures** (ds_list/ds_map) or arrays hold collections.

## Why GameMaker & Pitfalls

- **Fast to prototype 2D** — drag-and-drop for beginners, GML when you outgrow it; quick path from idea to playable.
- Exports to Windows/Mac/Linux/HTML5/mobile/console.
- Pitfalls: heavy logic in **Draw** (should be in Step), forgetting `image_speed` (animations frozen or too fast), and per-step `instance_create`/`destroy` churn — pool or reuse where possible.

Build GameMaker 2D games from **objects placed as instances in rooms**, driving behavior through the **event model** — **Create** to init, **Step** each frame for logic, **Draw** for rendering, **Alarm** for timers, **Collision** for overlaps — written in **GML** using built-in variables like `x/y/speed/sprite_index`. It's the fastest path from idea to a playable 2D game; keep logic in Step (not Draw) and reuse instances for performance.
