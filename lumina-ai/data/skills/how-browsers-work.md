---
name: how-browsers-work
description: How a web browser renders a page — parsing HTML into the DOM and CSS into the CSSOM, building the render tree, layout (reflow), paint and compositing, the JavaScript engine and single-threaded event loop, and what causes jank. Use to understand rendering performance, why layout thrashing is slow, and how JS/rendering interleave.
category: engineering
keywords_vi: trình duyệt, browser render, dom cssom, render trang, layout reflow, repaint, event loop javascript, cơ chế browser
---

# How Browsers Work

A browser turns bytes into pixels through a pipeline; knowing it explains rendering performance.

## The Rendering Pipeline

1. **Parse HTML → DOM** — a tree of nodes. Parsing is incremental; a synchronous `<script>` blocks parsing (which is why scripts go at the bottom or use `defer`/`async`).
2. **Parse CSS → CSSOM** — the style rules as a tree. CSS is render-blocking (the browser won't paint until it has the styles).
3. **Render tree** — DOM + CSSOM combined, containing only visible nodes with computed styles.
4. **Layout (reflow)** — compute the geometry (position + size) of every box. Expensive; depends on the whole tree.
5. **Paint** — fill in pixels (text, colors, borders, shadows) into layers.
6. **Composite** — the GPU assembles layers into the final frame. Some properties (`transform`, `opacity`) can be composited without re-layout/repaint — which is why animating those is cheap and animating `top`/`width` is not.

## The JavaScript Engine & Event Loop

JS runs on a **single main thread** shared with rendering. The **event loop** processes the call stack, then microtasks (promises), then a macrotask (timer, event, I/O callback), then lets the browser render. Consequences:
- **Long-running JS blocks rendering** — the page freezes (no paint, no input) until the task yields. Break up heavy work (chunking, web workers for CPU).
- **`requestAnimationFrame`** runs your callback right before the next paint — the correct place for visual updates.

## What Causes Jank

- **Layout thrashing** — reading a layout property (`offsetHeight`) after writing one forces a synchronous reflow; doing this in a loop is `O(n)` reflows. Batch reads then writes.
- **Large/complex layouts** re-flowing on every change; too many layers; painting big areas.
- Aim for 60fps → ~16ms per frame; JS + layout + paint must fit. Animate compositor-friendly properties (`transform`/`opacity`), avoid forced reflows, and move CPU work off the main thread.

The same event-loop model underlies why a heavy computation makes a page unresponsive and why async I/O keeps it smooth.
