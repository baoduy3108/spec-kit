---
name: godot-engine-and-gdscript
description: Godot engine and GDScript game coding — nodes and scenes, the scene tree, signals, _ready/_process/_physics_process lifecycle, GDScript syntax, exports, resources, and 2D/3D coordinate systems. Use when building a game in Godot, writing GDScript, structuring scenes/nodes, wiring signals, or choosing Godot patterns.
category: game-dev
keywords_vi: godot engine làm game, gdscript viết game, node và scene trong godot, cây scene tree, tín hiệu signal godot, hàm _ready _process _physics_process, export biến ra inspector, resource tài nguyên godot, hệ toạ độ 2d 3d godot
---

# Godot Engine & GDScript

Godot is a free, open-source engine for 2D and 3D games. Its model is distinctive: everything is a **node**, nodes compose into **scenes**, and scenes nest into a running **scene tree**. GDScript (Python-like) is the primary language (see how-game-engines-work, entity-component-system-architecture — Godot is node/scene, not ECS).

## Nodes & Scenes (the core idea)

- **Node** — the building block. Each node does one thing: `Sprite2D` draws, `CollisionShape2D` collides, `CharacterBody2D` moves, `Timer` ticks, `AudioStreamPlayer` plays sound.
- **Scene** — a **tree of nodes** saved as a reusable unit (`.tscn`). A "Player" scene = a `CharacterBody2D` root with `Sprite2D`, `CollisionShape2D`, `AnimationPlayer` children. Scenes are Godot's *prefab*: instance them anywhere, nest them freely.
- **Scene tree** — at runtime all active scenes form one tree; the engine walks it each frame. `get_node("Path")` / `$Path` reaches nodes; `add_child()` / `queue_free()` add/remove them.
- **Composition over inheritance** — build behavior by composing child nodes (and small scripts), not deep class trees.

## Script Lifecycle

A script attached to a node hooks engine callbacks:
- **`_ready()`** — once, when the node enters the tree (setup, cache node refs).
- **`_process(delta)`** — every rendered frame (`delta` = seconds since last). Use for non-physics logic, visuals, input polling.
- **`_physics_process(delta)`** — fixed timestep (default 60 Hz) — put movement/physics here for frame-rate-independent motion (see game-loop-and-fixed-timestep). Use `move_and_slide()` on bodies.
- **`_input(event)` / `_unhandled_input(event)`** — event-driven input.

## Signals (Godot's events)

- **Signals** decouple nodes: a node **emits** a signal, others **connect** to react — no hard references. A `Button` emits `pressed`; a `HealthComponent` emits `died`.
- Declare with `signal died(amount)`, emit `died.emit(10)`, connect in code (`node.died.connect(_on_died)`) or in the editor. This is the idiomatic way to communicate *up* the tree, keeping nodes reusable.

## GDScript Essentials

- Python-like, **indentation-based**, typed-optional: `var speed: float = 200.0`, `func take_damage(amount: int) -> void:`.
- **`@export var speed := 200.0`** exposes a variable to the Inspector so designers tweak it without touching code — hugely useful.
- **`@onready var sprite := $Sprite2D`** caches a child reference at `_ready`.
- **Resources** (`Resource`) — data assets (stats, configs) saved as `.tres`, shared and edited in-editor; the data-driven half of Godot.
- 2D uses pixels with **+Y down**; 3D uses meters with **+Y up** — a common source of "why is it upside down" bugs.

## Common Patterns & Pitfalls

- **State machine** for player/enemy states (see game-ai-behavior); **`AnimationPlayer`/`AnimationTree`** for animation (see skeletal-animation-and-skinning).
- **Autoload/singletons** for global systems (game state, audio, save).
- Pitfalls: calling `get_node` on nodes not yet in the tree, doing movement in `_process` instead of `_physics_process`, and forgetting `queue_free()` (leaks) vs `free()` (immediate, can crash mid-frame).

Build Godot games around **nodes composed into scenes** in a live **scene tree**, script behavior via the **`_ready`/`_process`/`_physics_process`** lifecycle (movement in physics-process), communicate with **signals** instead of hard references, and expose tunables with **`@export`**. Favor composition (child nodes + small scripts) and data-driven **resources** — that's the idiomatic, maintainable Godot way.
