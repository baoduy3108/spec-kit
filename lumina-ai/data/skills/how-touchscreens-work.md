---
name: how-touchscreens-work
description: How touchscreens work — capacitive sensing (the grid of electrodes detecting your finger's charge), why capacitive enables multi-touch, resistive touchscreens by contrast, palm rejection and gestures, and why gloves/water confuse them. Use to understand touchscreens, capacitive vs resistive, multi-touch, or why touch input behaves as it does.
category: engineering
keywords_vi: touchscreen hoạt động thế nào, màn hình cảm ứng, capacitive điện dung, điện cực grid, multi-touch đa điểm, resistive điện trở, cử chỉ gesture, tại sao đeo găng không cảm ứng
---

# How Touchscreens Work

A touchscreen detects **where** (and how) you touch a display. The dominant technology — **capacitive** sensing — explains why phones need bare fingers, support multi-touch, and get confused by water.

## Capacitive Touchscreens (modern phones/tablets)

Under the glass is a transparent **grid of electrodes** carrying a small electric charge, forming an electrostatic field. Your **finger is conductive** and slightly charged, so touching the screen **distorts the local capacitance** at that point. The controller scans the grid, detects where the field changed, and computes the touch coordinates — precisely and without any pressure needed (a light tap works).

Key consequences of *how* it senses:
- **Multi-touch** — because it reads the whole grid, it can detect **many simultaneous touches** independently → pinch-to-zoom, two-finger gestures. This is capacitive's big advantage.
- **Needs a conductive touch** — a plain **glove** or a plastic stylus doesn't disturb the field → no response. (Special conductive-tip styluses and "touchscreen gloves" work by conducting.)
- **Water/sweat** confuses it — water is conductive and creates false capacitance changes → ghost/erratic touches.
- Works through a thin non-conductive protector but not thick/metallic covers.

## Resistive Touchscreens (by contrast)

Older/industrial screens use **resistive** tech: two flexible conductive layers separated by a gap. **Pressing** pushes them together at that point, and the voltage change locates the touch. It responds to **any** object (gloved finger, stylus, pen — it senses pressure, not conductivity), works when wet, and is cheap — but is **single-touch**, less clear (extra layers), and needs actual pressure. Common in ATMs, car controls, rugged/industrial devices.

## Gestures, Palm Rejection & Sensitivity

The controller and OS turn raw touch points over time into **gestures** (tap, swipe, pinch, long-press) and apply **palm rejection** (ignoring the large low-precision contact of a resting palm while accepting a fingertip/stylus). Sensitivity/scan-rate affects responsiveness and how well fast swipes/drawing track (higher scan rates feel smoother).

## Other Types (briefly)

- **Infrared / optical** — a grid of IR beams across the surface; a touch breaks beams. Used in large displays/kiosks; works with any object.
- **Surface acoustic wave** — ultrasonic waves absorbed by touch. Niche.

## Pitfalls (in understanding/using)

- Expecting a **capacitive** screen to work with ordinary gloves or a plastic stylus (it needs conductivity).
- **Water on the screen** causing phantom/erratic touches — dry it; some phones have a wet-mode.
- Confusing capacitive (light, multi-touch, conductive) with resistive (pressure, single-touch, any object).
- Thick or metallic screen protectors/cases blocking the field → dead zones.
- Assuming all touchscreens support multi-touch — resistive typically doesn't.
- Blaming "lag" that's really low scan rate or a heavy UI, not the sensor.
