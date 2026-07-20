---
name: how-lazy-loading-works
description: How lazy loading works — deferring the loading of resources (images, components, routes, data) until they're actually needed, to speed up initial load, plus code splitting and the trade-offs. Use to understand lazy loading, code splitting, deferring offscreen images, speeding up initial page load, or on-demand loading.
category: engineering
keywords_vi: lazy loading, tải lười, hoãn tải tài nguyên đến khi cần, tăng tốc tải trang đầu, code splitting chia nhỏ bundle, ảnh ngoài màn hình, tải theo yêu cầu
---

# How Lazy Loading Works

Lazy loading is the technique of **deferring the loading of a resource until it's actually needed**, rather than loading everything up front. The payoff: a **much faster initial load**, because the user only downloads what they need to see the first screen, and the rest streams in on demand. It applies to images, JavaScript, components, routes, and data (see how-browser-rendering-works, web-build-tools-and-bundlers).

## The Problem: Loading Everything Up Front Is Slow

The naive approach loads **all** assets when the page opens — every image (including ones far below the fold the user may never scroll to), all JavaScript for every feature, all routes. This bloats the **initial payload**, delaying the moment the page is usable (first paint, time-to-interactive). Most of that eagerly-loaded content isn't needed **yet** — often not at all. Lazy loading only pays the cost when the benefit is imminent.

## The Core Idea: Load On Demand

Defer each resource until a **trigger** indicates it's needed:
- **Images / iframes** — load when they're about to **scroll into view**. Native support: `<img loading="lazy">`; more control via the **Intersection Observer** API (fire a callback when an element enters the viewport). Offscreen images don't download until you approach them.
- **JavaScript (code splitting)** — split the bundle into **chunks** and load a chunk only when its feature/route is used. Dynamic `import()` loads a module on demand. So the code for a settings page or a heavy chart loads only when the user goes there — not in the initial bundle.
- **Routes** — in SPAs, each route's code is a separate chunk loaded when you navigate to it (route-based code splitting).
- **Data** — fetch data as needed (on scroll, on tab open, pagination/infinite scroll) rather than all at once.
- **Components** — render/load heavy components only when visible or interacted with.

## Code Splitting (the JS side)

Bundlers (webpack, Vite, esbuild) turn dynamic `import()` calls into separate chunks automatically. Instead of one huge `bundle.js`, you ship a small **initial** bundle plus **on-demand** chunks. This is the single biggest lever for reducing initial JS payload in large apps. Pair with a loading state (spinner/skeleton) while a chunk loads.

## The Trade-offs

- **Faster initial load** (less up front) **vs a delay when the deferred resource is needed** (a chunk/image loads at use time — a brief wait or layout shift).
- **Mitigations**: **prefetch/preload** likely-next resources during idle time (so they're ready just before needed), and **reserve space** for lazy images (width/height or aspect-ratio) to avoid **layout shift** (CLS) when they pop in.
- Don't lazy-load **above-the-fold** critical content — deferring what's immediately visible *hurts* perceived performance (and LCP).

## Design Guidance

- **Lazy-load below-the-fold** images and non-critical components; **eager-load** what's immediately visible.
- **Code-split by route** and around heavy/rarely-used features.
- **Reserve space** for lazy images/embeds to prevent layout shift.
- **Prefetch** probable next resources during idle time for a seamless feel.
- **Show loading states** for deferred chunks/data.
- **Measure** — lazy loading helps initial metrics (LCP, TTI) but watch for jank/shift when content loads in.

## Pitfalls (in understanding/using)

- Lazy-loading **above-the-fold / LCP** content → delays what the user sees first; eager-load critical content.
- **No reserved space** for lazy images → layout shift (CLS) as they pop in.
- Over-splitting into **too many tiny chunks** → many round-trips and request overhead can outweigh the savings.
- No **loading state** for deferred content → the UI looks broken/blank while a chunk loads.
- Forgetting **prefetch** for predictable next steps → an avoidable wait at the moment of need.
- Assuming lazy loading is always better — it trades initial speed for a **later** cost; place that cost where it won't hurt.
