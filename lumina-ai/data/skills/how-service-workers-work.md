---
name: how-service-workers-work
description: How service workers work — a browser-managed background script that intercepts network requests as a programmable proxy, enabling offline support, caching strategies, and push notifications, plus their lifecycle (install/activate/update) and constraints. Use to understand service workers, PWAs, offline web apps, background caching, or web push.
category: engineering
keywords_vi: service worker hoạt động thế nào, proxy chặn request nền, offline pwa, chiến lược cache, push notification, lifecycle install activate update, progressive web app
---

# How Service Workers Work

A service worker is a script the browser runs **in the background**, separate from your web page, that can **intercept and control network requests** the page makes. It's the engine behind Progressive Web Apps (PWAs) — enabling offline use, custom caching, and push notifications.

## The Core Idea: a Programmable Network Proxy

Once registered, a service worker sits **between your web app and the network**. Every fetch the page makes (pages, API calls, images) can pass through the service worker's **`fetch` event handler**, where your code decides: serve from a cache, go to the network, or synthesize a response. This programmable proxy is what makes offline and advanced caching possible — you control the responses.

## Offline & Caching Strategies

Using the **Cache API**, a service worker stores responses and serves them without the network. Common strategies:
- **Cache-first** — serve from cache, fall back to network (fast, offline-capable; for static assets).
- **Network-first** — try network, fall back to cache (fresh when online, works offline; for dynamic content).
- **Stale-while-revalidate** — serve cache immediately, update it from the network in the background (fast + eventually fresh).
This is app-controlled caching layered on top of (and distinct from) HTTP caching (see how-http-caching-works) — you script the exact behavior per request.

## The Lifecycle

Service workers have a deliberate lifecycle to update safely:
1. **Register** — the page registers the SW script.
2. **Install** — first run; typically pre-cache the app shell (core assets).
3. **Activate** — take control; clean up old caches.
4. **Fetch/idle** — handles requests; the browser can **stop and restart** it anytime to save resources (so it's **event-driven and stateless** between events — you can't keep in-memory state).
5. **Update** — when the SW file changes, a new version installs in the background and activates on next load (or immediately via `skipWaiting`). This staged update avoids breaking an app mid-session — but is also why users sometimes need a reload to get new versions.

## Push Notifications & Background

Because it runs independently of any open page, a service worker can receive **push messages** (via the Push API) and show notifications even when the site isn't open, and do limited **background sync** (retry failed requests when connectivity returns). This is what gives PWAs app-like re-engagement.

## Constraints (important)

- **HTTPS only** — service workers require a secure context (a powerful proxy over your requests must not be MITM-able); `localhost` is exempt for dev.
- **Scoped** — a SW controls only pages under its path scope.
- **No DOM access** — it's a separate worker thread; it communicates with pages via messaging.
- **Stateless between events** — don't rely on in-memory variables persisting; use the Cache API / IndexedDB.

## Pitfalls (in understanding/using)

- **Caching too aggressively** → users stuck on stale assets; pair with a cache-versioning/update strategy (and fingerprinted URLs — see how-http-caching-works).
- Forgetting the **update lifecycle** — a new SW waits until old pages close; users may not see updates without a reload (use `skipWaiting`/prompts carefully).
- Assuming persistent in-memory state — the browser kills/restarts the SW; persist to Cache/IndexedDB.
- Not clearing **old caches** on activate → storage bloat and serving outdated files.
- Expecting it without **HTTPS** (won't register) or outside its **scope**.
- Debugging confusion — a stale service worker serving old content; use "update on reload"/bypass during dev.
