---
name: css-animations-and-transitions
description: CSS animations and transitions — transition vs @keyframes, animating transform and opacity for GPU-accelerated 60fps, the compositor and avoiding layout/paint thrash, will-change, timing functions, staggering, the Web Animations API, and prefers-reduced-motion. Use when animating web UI in CSS/JS, fixing janky animations, or making smooth performant motion in the browser.
category: engineering
keywords_vi: css animation và transition, chuyển tiếp transition so với keyframes, animate transform và opacity mượt 60fps, compositor tránh reflow repaint giật, will-change gợi ý trình duyệt, hàm thời gian timing function stagger, web animations api, tôn trọng prefers-reduced-motion
---

# CSS Animations & Transitions

Animation in the browser is easy to write and easy to make janky. The difference between buttery-smooth 60fps motion and stuttering lag comes down to **which properties you animate** and how the browser's rendering pipeline handles them. Get that right and CSS animation is nearly free.

## Transitions vs Keyframes

- **`transition`** — animate a property between two states when it changes (hover, class toggle). Simple A→B: `transition: transform 0.3s ease`. Perfect for micro-interactions.
- **`@keyframes` + `animation`** — multi-step, looping, or self-running sequences (a spinner, a pulse, an entrance). Define stages (`0%`, `50%`, `100%`), control duration, iteration, direction, fill mode, delay.

Use transitions for state changes; keyframes for richer or continuous motion.

## The Golden Rule: Animate transform & opacity

The browser renders in stages: **layout → paint → composite**. Animating properties that trigger the earlier, expensive stages every frame causes jank:
- **`width`, `height`, `top`, `left`, `margin`** → trigger **layout (reflow)** — recompute geometry of the page. Expensive.
- **`color`, `background`, `box-shadow`** → trigger **paint** — repaint pixels. Moderate.
- **`transform` and `opacity`** → handled by the **compositor** on the GPU, skipping layout and paint entirely. **Cheap and smooth.**

So: move with `transform: translate()` not `top/left`; scale with `transform: scale()` not `width/height`; fade with `opacity`. This single rule is 90% of performant web animation. Nearly any motion can be expressed as transform + opacity.

## The Compositor & will-change

Elements animated on transform/opacity can be promoted to their own **compositor layer**, animated by the GPU independently of the main thread — so animation stays smooth even if JS is busy. Hint the browser with **`will-change: transform`** (or `opacity`) *just before* animating. But don't over-use it: too many layers eat memory. Add it before, remove after.

## Timing & Easing

- **Timing functions** — `ease`, `ease-in-out`, `cubic-bezier(...)` for custom curves, `steps()` for sprite-frame or typewriter effects. Real motion is never linear (see easing-and-animation-timing).
- **Duration** — UI motion is usually 150–400ms; too slow feels sluggish, too fast feels abrupt.
- **Stagger** — offset `animation-delay` across a list so items cascade in, which reads as intentional and lively.

## The Web Animations API (WAAPI)

For dynamic/JS-driven animation, `element.animate(keyframes, options)` gives CSS-quality performance with programmatic control (play, pause, reverse, seek, promises on finish) — better than hand-tweening in `requestAnimationFrame` for most UI. Libraries (GSAP) go further with timelines and sequencing (see gsap-animation).

## Accessibility: Respect reduced-motion

Some users get motion sickness from large/parallax motion. Always honor:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
Or provide gentler alternatives (fade instead of slide). This is a real accessibility requirement, not optional polish.

## Practical Checklist

- Animate **transform/opacity**; avoid layout-triggering properties in loops.
- Keep durations snappy; ease naturally; stagger lists.
- Promote with `will-change` sparingly, around the animation only.
- Prefer WAAPI/CSS over JS per-frame tweening.
- Honor `prefers-reduced-motion`.
- Profile jank in DevTools' Performance panel — watch for long paint/layout bars.

Follow these and web animation is smooth, cheap, and accessible — motion that enhances the UI instead of fighting the browser.
