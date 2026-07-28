---
name: input-and-controller-support
description: Game input and controller support — polling vs events, action mapping/rebinding abstraction, gamepad handling, analog dead zones and response curves, multiple simultaneous input devices, and hot-swapping keyboard/gamepad. Use when building an input system, adding controller support, or handling rebindable controls in a game.
category: engineering
keywords_vi: nhập liệu game và hỗ trợ tay cầm controller, lấy trạng thái polling so với sự kiện event, ánh xạ hành động gán lại phím rebinding, xử lý gamepad, vùng chết analog dead zone đường phản hồi, nhiều thiết bị nhập cùng lúc, chuyển bàn phím tay cầm nóng
---

# Game Input & Controller Support

Input is the player's only channel into the game, and it must feel instant, fair, and flexible across keyboards, mice, and gamepads. A good input system decouples *physical buttons* from *game actions* so everything downstream — rebinding, controllers, accessibility — falls out cleanly.

## Polling vs Events

- **Polling** — each frame, ask "is Jump held?". Ideal for continuous/held input (movement, aiming) and keeps input in lock-step with the game loop.
- **Events** — react to a discrete press/release as it happens. Better for menus, one-shot actions, and text entry.

Games usually **poll** current device state each frame and derive edges (`pressedThisFrame`, `releasedThisFrame`, `held`) from it, so gameplay code can ask any of the three cleanly.

## The Action Abstraction

The single most important design: **never read physical keys directly in gameplay code.** Instead map devices → **abstract actions**:
```
"Jump"   ← Space, Gamepad-A, ...
"MoveX"  ← A/D, Left-Stick-X, D-pad
```
Gameplay asks `input.pressed("Jump")`, not `key == Space`. This one indirection gives you, for free:
- **Rebinding** — change the map, not the code.
- **Multi-device** — keyboard and gamepad both feed the same actions.
- **Contexts** — swap the whole map for menus vs gameplay vs driving.
- **Accessibility** — remap for one-handed play, hold-vs-toggle.

Actions come in types: **buttons** (digital), **axes** (1D, like MoveX), and **vectors** (2D, like a stick or WASD combined). Normalize all of them so gameplay treats a stick and WASD identically.

## Gamepads & Analog

- **Dead zones** — sticks never rest exactly at zero; ignore small magnitudes or the character drifts. Prefer a **radial** dead zone (on the vector magnitude) over per-axis, and **rescale** the remaining range so you don't lose precision near the edge.
- **Response curves** — map raw stick input through a curve (e.g. squared) so small movements are fine-grained and full tilt is fast. Tunes aiming/steering feel.
- **Analog triggers** — 0..1, not just pressed; useful for variable acceleration/braking.
- **Rumble/haptics** — feedback channel; use for impacts, tension.
- **Button conventions** — respect platform norms (confirm/cancel button placement differs across regions/platforms).

## Multiple Devices & Hot-Swap

- **Detect and adapt** — a player switching from keyboard to gamepad mid-session should see prompts/glyphs update automatically ("Press A" vs "Press Space"). Track the "last used device".
- **Local multiplayer** — assign devices to players; handle connect/disconnect gracefully (pause on controller unplug).
- **Simultaneous input** — decide precedence when multiple devices feed the same action.

## Feel & Fairness

Input feeds directly into game feel: minimize latency, and pair with forgiveness tricks (buffering, coyote time — see character-controller-and-platformer-movement) at the gameplay layer. Always show a **remap UI** with conflict detection, and never trap a player with an unrebindable critical control.

A clean input layer is invisible: players use whatever device they like, remap to taste, and the game just responds — because gameplay was written against *actions*, not against hardware.
