---
name: gsap-scrolltrigger
description: Build scroll-driven animations with GSAP ScrollTrigger — trigger/scrub animations to scroll position, pinning sections, start/end markers, snapping, and refreshing after layout changes. Use for scroll-linked effects (reveal-on-scroll, parallax, pinned sections, scroll-scrubbed timelines).
category: engineering
keywords_vi: scrolltrigger, gsap scroll, hoạt hình theo cuộn, scroll animation, pin section ghim, scrub cuộn, reveal on scroll parallax, hiệu ứng cuộn trang
---

# GSAP ScrollTrigger

ScrollTrigger (a GSAP plugin) links animations to the scroll position — reveal-on-scroll, parallax, pinned sections, and timelines that "scrub" as you scroll. Register it once: `gsap.registerPlugin(ScrollTrigger)`.

## The Two Modes

- **Trigger** — play an animation once (or on enter/leave) when an element scrolls into view:
```js
gsap.from(".card", {
  y: 60, opacity: 0,
  scrollTrigger: { trigger: ".card", start: "top 80%" }  // when card's top hits 80% down the viewport
});
```
- **Scrub** — tie the animation's *progress directly to scroll position*, so scrolling scrubs it forward/back:
```js
gsap.to(".bg", {
  y: -200,
  scrollTrigger: { trigger: ".section", start: "top bottom", end: "bottom top", scrub: true }
});
```
`scrub: true` snaps to scroll; `scrub: 1` adds a 1s smoothing lag. Attach a **timeline** to ScrollTrigger to scrub a whole sequence.

## start / end

`start` and `end` define when the trigger is active, as `"[trigger position] [viewport position]"`: `start: "top center"` = when the trigger's top reaches the viewport's center. This is the most important concept to get right — it controls exactly where effects fire.

## Pinning

`pin: true` **fixes an element in place** while the page scrolls past its ScrollTrigger range — the basis of "sticky section that animates as you scroll through it." ScrollTrigger handles the spacer so layout doesn't jump. Use for storytelling sections and scroll-scrubbed reveals.

## Snapping

`snap: 1 / (sections - 1)` (or an array of progress values) makes scrolling **snap** to defined points — for section-by-section scroll experiences.

## Refresh After Layout Changes

ScrollTrigger measures positions once. If the layout changes after setup (images load, content expands, fonts swap, a resize), its calculated start/end points go stale → animations fire at the wrong scroll positions. **Call `ScrollTrigger.refresh()`** after such changes (it auto-refreshes on resize, but not on arbitrary DOM/content changes). This is the #1 ScrollTrigger bug.

## Cleanup (frameworks)

In React/Vue/Svelte components, create ScrollTriggers inside `gsap.context()` (or the framework hook) and revert on unmount, or they persist after the component is gone and misfire. Kill triggers you create dynamically.

## Pitfalls

- **Not calling `refresh()`** after images/fonts/content load → wrong trigger positions (the classic bug).
- **No cleanup** in components → orphaned triggers.
- **Overusing pinning/scrub** → heavy, janky scrolling and motion sickness; respect `prefers-reduced-motion`.
- Misunderstanding `start`/`end` syntax → effects firing at the wrong place.
- Pinning without accounting for the layout spacer on complex pages.
