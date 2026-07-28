---
name: character-controller-and-platformer-movement
description: Character controllers and platformer movement — acceleration/friction curves, variable jump height, gravity tuning, ground detection, and forgiveness tricks (coyote time, jump buffering, corner correction). Covers why movement feels tight or floaty and how to tune it. Use when building a player controller, platformer jump physics, or making movement feel good.
category: engineering
keywords_vi: điều khiển nhân vật character controller, di chuyển platformer nhảy, độ cao nhảy thay đổi variable jump, gia tốc ma sát friction, coyote time đệm nhảy jump buffer, chỉnh trọng lực game nhảy, nhân vật chạy nhảy đã tay không bị trôi floaty
---

# Character Controller & Platformer Movement

The player controller is the thing players touch every single frame — if it feels wrong, nothing else matters. Great platformer movement is mostly *not* physically realistic; it's carefully tuned, forgiving, and responsive. This is the craft of making a jump feel *right*.

## Horizontal Movement

Don't set velocity directly to max on key-press (feels robotic and slippery). Model **acceleration and friction**:
- Holding a direction: `vel.x` accelerates toward `±maxSpeed`.
- Releasing: friction decelerates toward 0.
- Different **air vs ground** acceleration/friction gives you control over air-steering (tight = precise, loose = drifty).

Tuning `maxSpeed`, `accel`, and `friction` independently lets you dial anything from icy momentum to snappy arcade control.

## The Jump

The jump is the heart of feel. Instead of copying real gravity:
- **Derive gravity and impulse from design intent**: pick desired **jump height** `h` and **time to apex** `t`. Then `gravity = 2h/t²` and `jumpVelocity = -2h/t`. Now you tune in meaningful units, not magic numbers.
- **Variable jump height** — a short tap = small hop, holding = full jump. Implement by cutting upward velocity when the button is released early, or applying stronger gravity on the way up after release.
- **Asymmetric gravity** — higher gravity while falling than rising makes jumps feel snappy and weighty (the classic "fast fall") rather than floaty.

## Ground Detection

Reliable "am I on the ground?" is essential and surprisingly fiddly:
- Cast a short ray/box just below the feet, not a single point.
- Track `wasGrounded` to detect landing (trigger dust/sound) and leaving.
- Beware slopes, moving platforms (inherit their velocity), and one-way platforms (only collide from above).

## Forgiveness: The Secret Sauce

Real inputs are imprecise; good games bend the rules **in the player's favor** so it feels fair, not cheap:
- **Coyote time** — allow a jump for a few frames *after* walking off a ledge. Players press jump slightly late constantly; without this it feels broken.
- **Jump buffering** — if the player presses jump a few frames *before* landing, queue it and fire on touchdown. Handles pressing slightly early.
- **Corner correction** — if a jump clips a ceiling corner by a pixel or two, nudge them around it instead of stopping dead.
- **Apex hang** — slightly reduced gravity near the top of the arc gives a satisfying moment of air control.

These tricks are individually tiny (a few frames) and collectively the difference between a controller that feels *tight* and one that feels *janky*. Players never notice them — they just feel that the game "gets" them.

## Tuning Loop

Movement is tuned by feel, not math: expose the constants, playtest constantly, and adjust one variable at a time. The numbers that feel good are rarely the physically correct ones.
