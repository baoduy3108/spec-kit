---
name: gsap-animation
description: Animate the web with GSAP (GreenSock) — tweens (to/from/fromTo), timelines for sequencing, easing, stagger, animating transforms/autoAlpha for performance, and framework cleanup (gsap.context). Use when building web animations with GSAP or choosing how to sequence complex motion.
category: engineering
keywords_vi: gsap animation, greensock, tween timeline, animate web, easing stagger, gsap.to gsap.timeline, hoạt hình web, chuyển động javascript
---

# GSAP Animation

GSAP (GreenSock Animation Platform) is a robust JS library for high-performance web animation — smoother and more controllable than CSS transitions for complex motion.

## Tweens (the basic unit)

A tween animates properties over time:
- **`gsap.to(target, {...})`** — animate *to* these values from the current state.
- **`gsap.from(target, {...})`** — animate *from* these values to the current state (great for entrances).
- **`gsap.fromTo(target, {from}, {to})`** — define both ends explicitly.
Key params: `duration`, `ease`, `delay`, `stagger`, and any animatable property.

```js
gsap.to(".box", { x: 300, rotation: 360, duration: 1, ease: "power2.inOut" });
```

## Animate for Performance

- **Animate transforms** (`x`, `y`, `scale`, `rotation`) not layout properties (`left`, `top`, `width`) — transforms are GPU-composited and don't trigger layout/reflow (see how-browsers-work). GSAP exposes `x`/`y` as transform shortcuts.
- **Use `autoAlpha`** instead of `opacity` — it also toggles `visibility` at 0 (hidden elements skip rendering).
- Batch DOM operations; avoid animating hundreds of elements' layout.

## Timelines (sequencing)

Don't chain `delay`s to sequence animations — use a **timeline**:
```js
const tl = gsap.timeline();
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "-=0.5")   // position parameter: overlap by 0.5s
  .add("mid")                      // a label
  .to(".c", { opacity: 1 }, "mid");
```
Timelines give you **position parameters** (`"+=0.2"`, `"-=0.5"`, labels) to overlap/offset precisely, **nesting** (timelines inside timelines), and control over the whole sequence (`play/pause/reverse/timeScale/seek`) — far more maintainable than juggling delays.

## Easing & Stagger

- **Easing** shapes the motion — `"power2.inOut"`, `"back.out"`, `"elastic"`, `"none"` (linear). Good easing is what makes motion feel natural (see motion-and-storytelling); default `power1` is fine, tune per feel.
- **Stagger** animates a group with a cascading offset: `gsap.to(".item", { y: 0, stagger: 0.1 })` — each item starts 0.1s after the last. Great for lists/grids.

## Setup & Cleanup

- **Register plugins once** per app (`gsap.registerPlugin(ScrollTrigger)`).
- In **React/Vue/Svelte**, scope selectors and clean up on unmount — use **`gsap.context()`** (or the framework's GSAP hook) so animations are scoped to the component and reverted when it unmounts, preventing leaks and stray animations.

## Pitfalls

- **Animating layout props** (`left`/`top`/`width`) → janky; use transforms.
- **Chaining `delay`s** to sequence → brittle; use a timeline.
- **Unscoped selectors + no cleanup** in components → leaks and animations hitting the wrong/removed elements.
- Forgetting to register plugins.
- Overusing heavy animation → performance and accessibility issues (respect `prefers-reduced-motion`).
