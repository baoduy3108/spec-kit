---
name: how-browser-rendering-works
description: How a browser renders a page — the critical rendering path from HTML/CSS to DOM/CSSOM, render tree, layout (reflow), paint, and compositing, plus what causes jank and how to render fast. Use to understand the critical rendering path, why layout thrashing hurts, browser paint/composite, or optimizing render performance.
category: engineering
keywords_vi: browser rendering, trình duyệt vẽ trang thế nào, critical rendering path, dom cssom render tree, layout reflow paint composite, gây jank giật, tối ưu hiệu năng render
---

# How Browser Rendering Works

Understanding how a browser turns HTML and CSS into pixels on screen — the **critical rendering path** — explains why some UI changes are cheap and others cause janky, sluggish pages. It's essential for front-end performance (see how-cnns... no; see how-http-caching-works, rendering-patterns).

## The Pipeline: From Markup to Pixels

The browser transforms your code into pixels in stages:
1. **Parse HTML → DOM** — the HTML is parsed into the **DOM tree** (the document's structure).
2. **Parse CSS → CSSOM** — the CSS is parsed into the **CSSOM** (all the style rules).
3. **Render tree** — DOM + CSSOM are combined into the **render tree**: only the **visible** elements with their computed styles (things like `display:none` are excluded).
4. **Layout (reflow)** — the browser computes the **geometry** — the exact size and position of every element on the page. This is expensive because moving one element can shift many others.
5. **Paint** — fill in the pixels: text, colors, borders, shadows, images — into layers.
6. **Composite** — combine the painted layers in the right order onto the screen (the GPU can do this efficiently).

Each stage feeds the next; a change can force re-running from wherever it invalidates.

## Why It Matters: Layout, Paint, Composite Have Different Costs

The key performance insight is that **different changes trigger different amounts of the pipeline**:
- Changing something that affects **geometry** (width, height, position, adding/removing elements) triggers **layout → paint → composite** — the **most expensive**, because the whole page's positions may need recomputing.
- Changing something that only affects **appearance** (color, background) triggers **paint → composite** — cheaper (no layout).
- Changing **transform** and **opacity** can be handled by the **compositor alone** (just composite) — the **cheapest**, often GPU-accelerated, and can run off the main thread. This is why smooth animations use `transform`/`opacity` instead of animating `top`/`left`/`width`.

## Jank and Layout Thrashing

The browser aims for **60fps** (~16ms per frame). If work on the **main thread** (JS, layout, paint) overruns the frame budget, frames drop and the page **janks** (stutters). A classic cause is **layout thrashing**: JavaScript that **reads** a layout property (like `offsetHeight`, forcing the browser to compute layout *now*) then **writes** a style, then reads again — repeatedly forcing **synchronous** layout in a loop. Batch reads and writes separately to avoid it.

## Render-Blocking Resources

- **CSS is render-blocking** — the browser won't paint until the CSSOM is ready (to avoid a flash of unstyled content), so large/slow CSS delays first paint.
- **Synchronous JS is parser-blocking** — a `<script>` without `async`/`defer` pauses HTML parsing. Use `defer`/`async` and load critical CSS inline to speed first render.

## Design Guidance

- **Animate `transform`/`opacity`**, not layout-triggering properties, for smooth 60fps.
- **Avoid layout thrashing** — batch DOM reads, then batch writes; don't interleave.
- **Minimize render-blocking** — inline critical CSS, defer non-critical CSS/JS.
- **Reduce layout scope** — huge, deeply nested DOMs make layout expensive; keep it lean (`content-visibility` can help).
- **Keep the main thread free** — heavy JS blocks rendering; offload to web workers (see how-web-workers-work).

## Pitfalls (in understanding/using)

- Animating `top`/`left`/`width`/`height` → forces layout every frame → jank; use `transform` instead.
- **Layout thrashing** — read-write-read-write of layout properties forcing repeated synchronous layout.
- Assuming all style changes cost the same — geometry changes (layout) are far pricier than paint-only or composite-only ones.
- Large **render-blocking CSS/JS** delaying first paint.
- A **massive DOM** making every layout/paint slow.
- Blocking the **main thread** with heavy JS so the browser can't hit its frame budget.
