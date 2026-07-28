---
name: game-ui-and-hud-design
description: Game UI and HUD design — heads-up displays, diegetic vs non-diegetic UI, showing health/ammo/score/minimap without clutter, feedback and game-state communication, controller/gamepad navigation, and readability under motion. Use when designing a game's HUD, menus, or in-game interface (distinct from web/app UX).
category: design
keywords_vi: giao diện game hud, thanh máu đạn điểm số minimap, ui diegetic hòa vào thế giới game, phản hồi truyền đạt trạng thái game, điều hướng tay cầm gamepad menu, dễ đọc khi đang chuyển động, thiết kế hud không rối mắt
---

# Game UI & HUD Design

Game UI is a different discipline from web/app UX. It must communicate fast-changing state **during** action, stay readable over a moving colorful scene, work with a **gamepad** (no cursor), and ideally reinforce the game's fiction. The **HUD** (heads-up display) is the persistent overlay showing what the player needs at a glance.

## Diegetic vs Non-Diegetic

- **Non-diegetic** — overlay elements that exist only for the player, not the character (a corner health bar, floating score). Simple and clear; the default.
- **Diegetic** — UI that exists *inside the game world*: ammo on the gun model, health as the character's posture/screen-reddening, a physical wrist device. More immersive, harder to read precisely.
- **Spatial/meta** — in the world but not physically part of it (waypoint markers, enemy outlines).

Immersive games push UI *into* the world (removing the HUD entirely where possible); fast competitive games keep it explicit and instantly legible. Match the choice to the experience — immersion vs information density is the core trade-off.

## What the HUD Must Convey

Only what the player needs **right now**, prioritized:
- **Survival-critical** (health, ammo) — most prominent, often with escalating alerts (low-health pulse, red vignette, heartbeat sound) so the player feels danger without staring at a number.
- **Objective/context** (score, timer, minimap, current goal).
- **Transient feedback** (damage numbers, pickups, hit markers) — appear on the action, then fade.

Everything else belongs in a menu, not the HUD. Clutter is the enemy — every persistent element costs attention that belongs on the game.

## Readability Under Motion

The HUD sits over an unpredictable, animated background:
- **Contrast that survives any backdrop** — outlines, drop shadows, or subtle scrims behind text/icons so white text never vanishes on a bright scene.
- **Icons over text** where possible — recognized faster, language-independent.
- **Stable positioning** — anchor to corners/edges; don't let critical info move or overlap the action.
- **Safe zones** — keep essential UI away from screen edges (TV overscan, notches, curved corners).

## Feedback: The Game Talking Back

UI is how the game confirms the player's actions and telegraphs threats. Hit markers, cooldown sweeps, reload indicators, "objective updated" toasts — each closes a feedback loop. Juice applies here too: a health bar that shakes and flashes on damage communicates *and* feels good. Missing or delayed feedback makes a game feel unresponsive even when the mechanics are fine.

## Gamepad & Accessibility

- **Directional navigation** — every menu must be traversable by d-pad/stick with a clear focus highlight; no mouse assumed. Design the focus order deliberately.
- **Reachability** — group actions for thumb comfort; support remapping.
- **Accessibility** — scalable HUD size, colorblind-safe status colors (never color alone — pair with shape/icon), subtitle and no-flashing options. These widen your audience and are increasingly expected.

Great game UI disappears into the experience: the player always knows their state and never thinks about the interface showing it.
