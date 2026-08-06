---
name: game-state-management
description: Managing game state — scenes/screens as a state machine (menu, playing, paused, game over), transitions, a game state stack for overlays, and separating persistent save data from runtime state. Use to structure game screens/scenes, manage menu/pause/gameplay states, design transitions, or organize a game's state stack.
category: engineering
keywords_vi: quản lý trạng thái game, scene screen máy trạng thái, menu chơi tạm dừng game over, chuyển cảnh transition, stack trạng thái overlay, tách save data khỏi runtime
---

# Game State Management

Every game moves between high-level **states** — main menu, playing, paused, game over, loading, cutscene — and managing these cleanly (rather than with a tangle of boolean flags) keeps a game maintainable. The standard tool is a **state machine**, often a **state stack** for overlays (see how-game-engines-work, game-design-fundamentals).

## The Problem: Boolean Soup

Naively, you track the game with flags: `isPaused`, `inMenu`, `isGameOver`, `isLoading`... These interact badly — invalid combinations (`isPaused && inMenu`?), forgotten resets, and update/render code littered with `if (isPaused) return;` everywhere. As the game grows, this becomes unmanageable. A state machine replaces the flag soup with **one explicit current state**.

## The Core Idea: A State Machine of Scenes

Model the game as a **finite state machine**: it's in exactly **one** state at a time, with defined **transitions** between them. Each state (menu, gameplay, pause, game-over) encapsulates its own:
- **update** logic (what runs each frame in this state),
- **render** logic (what's drawn),
- **input** handling,
- **enter/exit** hooks (setup on entering, cleanup on leaving).
The main loop just calls the **current** state's update/render — no scattered flags. Transitions (`menu → playing`, `playing → paused`) are explicit and centralized.

## The State Stack (for overlays)

A plain single-state machine struggles with **overlays** — pausing should show a pause menu **over** the frozen game, not replace it. A **state stack** solves this: **push** the pause state on top of the gameplay state. The top state gets input; you can choose to still **render** the states beneath (so the paused game shows behind the menu) but not update them. **Pop** to resume exactly where you were. This elegantly handles pause menus, dialogs, and nested screens.

## Runtime State vs Save Data

Separate two very different things:
- **Runtime/transient state** — the live game (entity positions, current velocities, which state you're in). Lives in memory, rebuilt each session.
- **Persistent save data** — what must survive quitting (progress, unlocks, settings, inventory). Serialized to disk deliberately.
Don't conflate them: save data should be a **clean, versioned** representation you can load, not a dump of live runtime objects. **Version** your save format so future updates can migrate old saves.

## Design Guidance

- **State machine over flags** — one current state; explicit transitions; per-state update/render/input.
- **State stack** for overlays (pause, dialogs) — push/pop, render-beneath as needed.
- **Enter/exit hooks** for setup/teardown (load menu assets on enter, free on exit).
- **Separate save data** from runtime state; serialize a clean, **versioned** model.
- **Handle transitions** (fades, loading screens) as part of the state flow, not ad hoc.
- **Centralize** the state logic so adding a new screen is localized.

## Pitfalls (in understanding/using)

- **Boolean flag soup** → invalid state combinations and `if` checks scattered everywhere; use a state machine.
- No **state stack** → pause/overlay screens are awkward (can't cleanly resume underneath).
- Forgetting **exit cleanup** → leaked assets/listeners when leaving a state.
- **Dumping runtime objects** as the save format → brittle, unversioned saves that break on updates.
- **Unversioned saves** → a game update can't load or migrate old save files.
- Updating states **beneath** an overlay when they should be frozen (or vice versa) → paused game keeps running.
