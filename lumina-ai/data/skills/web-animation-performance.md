---
name: web-animation-performance
description: Web animation performance and motion design guidance — the 60fps/120fps frame budget, main thread vs compositor, avoiding layout/paint thrash, batching reads/writes, requestAnimationFrame, jank profiling, and purposeful-motion principles (duration, easing, orchestration, restraint). Use when animations feel janky, choppy, or when deciding how and when UI motion should move.
category: design
keywords_vi: hiệu năng animation web, ngân sách khung hình 60fps, luồng chính compositor, tránh giật reflow repaint, gom đọc ghi layout thrash, requestanimationframe đo giật jank, chuyển động có mục đích, thời lượng easing tiết chế
---

# Web Animation Performance & Motion Guidance

Great UI motion is both a **performance** problem (it must stay smooth) and a **design** problem (it must be purposeful). This covers both: how to hit a rock-solid frame rate, and how to decide what should move and how much.

## The Frame Budget

The browser aims for **60fps** — one frame every **~16.7ms** (or ~8.3ms on 120Hz displays). Everything for a frame — JavaScript, style, layout, paint, composite — must fit in that budget. Blow it and frames drop → **jank** (visible stutter). The whole performance game is staying under budget every frame.

## Main Thread vs Compositor

- The **main thread** runs your JS, style calc, layout, and paint. If it's busy, animation driven there stutters.
- The **compositor thread** can animate `transform`/`opacity` on the GPU **independently**, so those stay smooth even while the main thread is busy.

This is why (as in css-animations-and-transitions) you animate **transform and opacity** — they run on the compositor, off the main thread. Animating layout properties forces main-thread work every frame and janks under load.

## Avoiding Thrash

- **Layout thrash** — interleaving DOM *reads* (`offsetWidth`, `getBoundingClientRect`) and *writes* (style changes) forces the browser to recompute layout repeatedly ("forced synchronous layout"). **Batch all reads, then all writes.**
- **Do measurement/DOM work outside the animation** — precompute; don't query layout every frame.
- **Keep per-frame JS tiny** — offload heavy work (Web Workers, precomputation, `requestIdleCallback`).

## Driving Animation

- **CSS / Web Animations API** — prefer these; the browser optimizes and can run them off-main-thread.
- **`requestAnimationFrame`** — for JS-driven motion, sync to the display refresh (never `setInterval` for animation — it drifts and tears). Scale by delta time so speed is framerate-independent.
- **Avoid animating hundreds of elements** on the main thread; use transforms, canvas, or fewer composited layers.

## Profiling Jank

Use DevTools **Performance** panel: record, look for frames exceeding budget, long **Layout**/**Paint** bars (should be minimal during animation), and main-thread congestion. The FPS meter and "Layer" tools show what's composited. Measure before optimizing — jank causes are often surprising.

## Motion Design Principles (the "should it move?" half)

Performance is necessary but not sufficient — motion must earn its place:
- **Purposeful, not decorative** — motion should *communicate*: show cause/effect, spatial relationships, state changes, where attention should go. Animation for its own sake distracts.
- **Duration** — UI transitions ~150–400ms; small elements faster, large/entering elements a touch slower. Instant feels broken; slow feels sluggish.
- **Easing** — natural motion accelerates/decelerates; ease-out for entrances (arrives quickly, settles), ease-in for exits. Never linear for UI (see easing-and-animation-timing).
- **Orchestration** — stagger related elements so they cascade; sequence cause before effect; don't animate everything at once.
- **Continuity** — connect states (see shared-element-and-hero-transitions); things should move *from* somewhere *to* somewhere, not pop.
- **Restraint** — the best motion is felt, not noticed. When in doubt, less and faster.
- **Reduced motion** — always honor `prefers-reduced-motion`; motion is an accessibility concern.

## The Combined Rule

Animate **transform/opacity** on the compositor, keep per-frame main-thread work minimal, drive with CSS/WAAPI/rAF, profile real jank — and only animate what helps the user understand the interface, briefly and with natural easing. That's motion that's both smooth *and* meaningful.
