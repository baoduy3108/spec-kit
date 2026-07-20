---
name: sprite-and-animation-systems
description: How 2D sprite animation works in games — sprite sheets/atlases, frame-based animation, animation state machines (idle/run/jump) driven by game state, and blending, plus why atlases matter for performance. Use to build a sprite animation system, design animation state machines, use sprite sheets/atlases, or animate 2D game characters.
category: engineering
keywords_vi: sprite animation game, sprite sheet atlas, animation dựa trên khung frame, máy trạng thái animation idle run jump, blend chuyển động, atlas cho hiệu năng, hoạt hình nhân vật 2d
---

# Sprite and Animation Systems

In 2D games, characters and effects are animated with **sprites** — images cycled through frames to create motion. A good animation system organizes these frames efficiently (**sprite sheets/atlases**) and drives which animation plays via an **animation state machine** tied to the game's logic. Understanding it explains both the visuals and the performance (see how-game-engines-work, keyframe-animation-and-interpolation).

## Sprites and Sprite Sheets

- A **sprite** is a 2D image (or region of one) drawn to the screen.
- **Frame-based animation** — play a **sequence of frames** in order at some frames-per-second to create motion (a run cycle = several poses shown in succession).
- **Sprite sheet / texture atlas** — instead of many separate image files, pack **all** frames (and often all a game's sprites) into **one big image**, with coordinates telling the engine where each frame is. This is important for **performance**: the GPU can draw many sprites from one texture in a single **draw call** (batching), avoiding the cost of binding a different texture per sprite. Atlases also reduce memory waste and load time. This is the 2D analog of why batching matters everywhere.

## The Animation State Machine

Rather than manually choosing frames, drive animation with a **state machine** that mirrors the character's logical state:
- States: `idle`, `run`, `jump`, `fall`, `attack`, `hurt`, ...
- **Transitions** are triggered by **game logic / conditions**: velocity > 0 → `run`; not grounded → `jump`/`fall`; attack pressed → `attack`.
- Each state plays its **animation clip** (its frame sequence, loop or one-shot).
This decouples "what the character is doing" (game logic) from "which frames to show" (animation), so the visuals automatically follow gameplay. It's the same FSM idea as game-state-management, applied to animation.

## Timing, Looping, and Blending

- **Frame timing** — advance frames based on **delta time**, not the frame rate, so animations play at the right speed regardless of FPS (see how-game-engines-work).
- **Loop vs one-shot** — running loops; an attack or death plays once, then transitions out (often signaling "animation finished" to the logic).
- **Blending / transitions** — snapping between animations looks jarring; smoother systems **blend** or use quick transition frames. In 2D this may be transition clips; in skeletal/2D-rig animation, actual interpolation between poses.
- **Pivot/anchor** and **flipping** — consistent anchor points and horizontal flipping (face left/right) avoid the sprite "jumping."

## Skeletal / Rigged Animation (alternative)

Beyond frame-by-frame, **skeletal animation** (Spine, DragonBones) rigs a character with bones and animates the bones, **interpolating** between keyframes (see keyframe-animation-and-interpolation). Smaller assets, smooth blending, and runtime flexibility (mix animations, procedural aiming) — at the cost of a rigging pipeline.

## Pitfalls (in understanding/using)

- **Separate image per frame/sprite** → many texture binds, many draw calls, poor performance; pack into an **atlas**.
- Advancing frames by **frame count** instead of **delta time** → animation speed varies with FPS.
- **Hard-coding** frame selection instead of a state machine → tangled, unmaintainable animation logic.
- **Snapping** between animations with no transition/blend → jarring visuals.
- Inconsistent **pivot/anchor** points → the sprite jumps when switching animations.
- Not signaling **one-shot animation completion** → logic and visuals desync (e.g. attack hitbox timing).
- Atlas **bleeding** (adjacent frames leaking in) → add padding between packed frames.
