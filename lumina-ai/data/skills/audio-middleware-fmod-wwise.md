---
name: audio-middleware-fmod-wwise
description: Game audio middleware integration with FMOD and Wwise — events and banks, parameters/RTPCs driving sound from game state, buses and mixing/snapshots, spatial/3D audio, streaming vs in-memory, and wiring middleware into Unity/Unreal. Use when integrating FMOD or Wwise, exposing audio parameters, structuring events/banks, or implementing adaptive audio via middleware.
category: game-dev
keywords_vi: fmod, wwise, audio middleware, event và bank âm thanh, parameter rtpc điều khiển âm thanh, bus mixing snapshot, âm thanh 3d spatial game, streaming vs in-memory audio, tích hợp fmod unity unreal, middleware âm thanh game
---

# Audio Middleware: FMOD & Wwise

For anything beyond basic `PlaySound`, studios use **audio middleware** — **FMOD** or **Wwise** — to author complex, reactive audio outside code, then drive it from the game. The engine sends **events and parameters**; the middleware decides exactly what plays and how (see game-audio-and-adaptive-music for the design side).

## Events & Banks (the core unit)

- **Event** — the thing you trigger from code (`footstep`, `explosion`, `music`). An event can contain many sounds, randomization, layers, and logic — all authored in the FMOD/Wwise tool, not in code. Code just says "post event `explosion`".
- **Bank** — a packaged bundle of events + audio data you **load/unload** at runtime (per-level banks keep memory bounded). Load the bank, then play its events.
- Code is thin: `RuntimeManager.PlayOneShot("event:/explosion", position)` (FMOD) or `AkSoundEngine.PostEvent("Explosion", gameObject)` (Wwise). The audio designer owns the content.

## Parameters / RTPCs (make audio react to gameplay)

- **Parameters** (FMOD) / **RTPCs** — Real-Time Parameter Controls (Wwise) — are numbers the game feeds in that **modulate sound**: `speed` → engine pitch, `health` → music intensity, `depth` → underwater filter.
- Set them each frame: `instance.setParameterByName("rpm", rpm)`. The designer maps the curve; you just send state. This is how audio *reacts* without code changes.
- **Distance/occlusion** parameters drive 3D falloff and muffling.

## Buses, Mixing & Snapshots

- **Buses** — a mixing hierarchy (SFX / Music / Voice / Master). Adjust group volumes, apply effects per bus.
- **Snapshots** — saved mixer states you blend to (e.g. "paused" ducks SFX and lowpasses music; "low health" boosts heartbeat). Trigger a snapshot on game state.
- **Ducking/sidechain** — auto-lower music/SFX under dialogue (see game-audio-and-adaptive-music).

## Spatial Audio & Memory

- **3D events** attach to an emitter; the middleware handles attenuation, panning, Doppler, and reverb zones — set the listener (usually the camera/player) and emitter positions.
- **Streaming vs in-memory** — stream long assets (music, ambience) from disk; keep short, frequent SFX in memory. Balances RAM vs disk I/O.
- Unload banks you don't need; watch voice counts (cap simultaneous instances).

## Integration & Adaptive Music

- Both ship **Unity and Unreal** integrations: import the plugin, build banks from the authoring tool, reference events by path/name.
- **Adaptive music** is authored in the middleware (layered stems, transition markers, tempo-synced stingers) and driven by a parameter like `intensity` — the middleware handles beat-synced transitions the engine couldn't easily do.
- Pitfalls: forgetting to load a bank (silent events), leaking event instances (release one-shots), and driving parameters from the wrong thread.

Integrate FMOD/Wwise by triggering **events** (authored in the tool) and loading their **banks**, driving sound reactively with **parameters/RTPCs** fed from game state, structuring output through **buses and snapshots** for mixing/ducking, and using **3D events** for spatial audio. Keep code thin — post events, set parameters, load/unload banks — and let the audio designer own the content in the middleware, including beat-synced adaptive music.
