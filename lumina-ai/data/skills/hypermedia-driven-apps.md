---
name: hypermedia-driven-apps
description: Building interactive web apps where the server returns HTML fragments instead of JSON and the client swaps them into the page (htmx, Hotwire/Turbo, Unpoly) — keeping state and logic on the server, drastically cutting client JavaScript. Covers the hypermedia/HATEOAS idea, request→HTML-fragment→swap loop, when it beats a SPA+JSON API, and its limits (rich offline/complex client state). Use to understand htmx/hypermedia-driven apps, HTML-over-the-wire, or the SPA alternative.
category: frontend
keywords_vi: ứng dụng hướng hypermedia htmx, trả html fragment thay vì json, html over the wire hotwire turbo, giữ trạng thái logic ở server giảm javascript, hoán đổi phần tử theo phản hồi, khi nào thay cho spa
---

# Hypermedia-Driven Apps

The dominant modern pattern is **SPA + JSON API**: the browser runs a big JS app that fetches JSON and renders it client-side. **Hypermedia-driven** apps (htmx, Hotwire/Turbo, Unpoly) revive the original web model with a twist: the server returns **HTML fragments**, and a tiny generic library **swaps them into the page** — so interactivity comes **without** shipping and maintaining a large client-side application (see frontend-ui-engineering, api-and-interface-design, how-the-browser-renders-a-page if present).

## The Loop

1. An element declares a request: e.g. htmx's `hx-get="/todos" hx-target="#list" hx-swap="innerHTML"`.
2. On the trigger (click, input, load), the browser sends a normal HTTP request.
3. The server responds with an **HTML fragment** (not JSON) — rendered by the same server templates that render full pages.
4. The library **swaps** that fragment into the target element.
No JSON parsing, no client-side rendering of that data, no duplicated view logic. The **HTML is the API** (HATEOAS: the response carries the next possible actions as links/forms).

## Why It Can Beat a SPA

- **Far less JavaScript** — no framework app, no client router, no client state store for server data; often just the small hypermedia lib.
- **One source of view logic** — rendering lives on the server; you don't rebuild the UI twice (server + client).
- **No client/server type drift for data** — the server sends ready HTML; there's no JSON contract to keep in sync (contrast end-to-end-type-safety, which solves that for JSON APIs).
- **Simple mental model** — request → HTML → swap; back to "hypermedia as the engine of application state."
- **Great fit** for content/CRUD/dashboards: forms, lists, filters, pagination, inline edits.

## The Limits (be honest)

- **Rich client state / offline** — highly interactive, offline-first, or heavily stateful UIs (canvas editors, real-time games, complex optimistic flows) are where a real client app (or signals/SPA) still wins.
- **Chatty on complex screens** — many small fragment requests; needs sensible endpoints.
- **Server does the rendering work** — more server load/round-trips than a cached client render.
- **Not a JSON API** — if you *also* need a public/mobile JSON API, you maintain that separately.

## Design Guidance

- **Return HTML fragments** from endpoints; reuse server templates for full-page and partial renders.
- **Let HTML carry actions** (links/forms) — the response tells the client what's possible next.
- **Sprinkle interactivity** with attributes (`hx-*`) instead of writing imperative fetch+render JS.
- **Progressive enhancement** — it degrades to normal links/forms if JS fails.
- **Add a little client JS only where needed** (a dropdown, a chart) — hypermedia + islands.
- **Pick SPA/signals instead** when the UI is genuinely app-like (offline, rich local state).

## Pitfalls (in understanding/using)

- Forcing hypermedia onto an **app-like** UI (offline, complex client state) → fights the model.
- Returning **JSON then rendering client-side** — that's the SPA pattern, not hypermedia.
- **Over-fragmenting** into dozens of chatty requests → latency; design coherent endpoints.
- Forgetting **progressive enhancement** → broken UX when JS fails.
- Duplicating view logic on client anyway → you lost the main benefit.
- Assuming it **replaces** all SPAs → it's a better default for content/CRUD, not for every app.
