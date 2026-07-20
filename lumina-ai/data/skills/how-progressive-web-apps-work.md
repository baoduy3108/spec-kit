---
name: how-progressive-web-apps-work
description: How Progressive Web Apps (PWAs) work — web apps that install to the home screen, work offline, and behave app-like using a web app manifest and a service worker for caching, plus their trade-offs vs native apps. Use to understand PWAs, making a web app installable/offline, the web app manifest, or web vs native app trade-offs.
category: engineering
keywords_vi: progressive web app pwa, ứng dụng web cài được, chạy offline, web app manifest, service worker cache, giống app native, đánh đổi web vs native
---

# How Progressive Web Apps (PWAs) Work

A Progressive Web App is a **website that behaves like an installed app** — it can be added to the home screen, launch full-screen without browser chrome, work **offline**, and receive push notifications — all built with standard web technology and delivered through a URL (no app store). The magic rests on two pieces: the **web app manifest** and a **service worker** (see how-service-workers-work, how-web-workers-work).

## The Idea: Bridge Web and Native

Web apps are instantly accessible (a URL, no install, cross-platform) but historically couldn't do "app" things: work offline, install to the home screen, run full-screen, send notifications. Native apps can, but require app-store distribution and separate codebases per platform. PWAs close much of that gap — one web codebase that's **progressively** enhanced with app-like capabilities where the browser supports them (hence "progressive": it still works as a normal site everywhere, gaining features where available).

## The Two Core Pieces

- **Web App Manifest** — a JSON file describing the app: **name, icons, theme color, start URL, and display mode** (`standalone`/`fullscreen` to hide the browser UI). This is what lets the browser offer **"Add to Home Screen"** and launch the app in its own window with an icon, like a native app.
- **Service Worker** — a background script (a special web worker — see how-service-workers-work) that sits between the app and the network as a **programmable proxy**. It can **intercept network requests** and serve responses from a **cache**, which is what enables:
  - **Offline / flaky-network operation** — serve cached assets/data when the network is down.
  - **Instant loads** — serve the app shell from cache immediately.
  - **Background sync** and **push notifications**.

Together: the manifest makes it **installable and app-like**; the service worker makes it **fast and offline-capable**.

## Caching Strategies (via the service worker)

The service worker chooses how to respond to each request:
- **Cache-first** — serve from cache, fall back to network (great for static assets; instant, works offline).
- **Network-first** — try network, fall back to cache (for fresh data, degrades to stale when offline).
- **Stale-while-revalidate** — serve cache immediately, update it from the network in the background (fast + eventually fresh).
Choosing per resource type is the heart of PWA offline design.

## Requirements

- **HTTPS** — service workers require a secure origin (they're powerful; a MITM could hijack them otherwise).
- **Manifest + registered service worker** — plus icons and meeting installability criteria for the "install" prompt.

## Trade-offs vs Native

- **PWA pros** — one codebase, no app store, instant access via URL, easy updates (just deploy), cross-platform.
- **PWA cons** — **limited access** to some device features (varies by browser/OS), historically weaker on iOS (Apple limits PWA capabilities), no app-store discovery, and performance/integration ceilings below native.
- **Native pros** — full device API access, best performance, store discovery — at the cost of per-platform code and store gatekeeping.
Choose PWA when reach, low friction, and a single codebase matter; native when you need deep device integration or maximum performance.

## Pitfalls (in understanding/using)

- Forgetting **HTTPS** → service workers won't register; no offline/installability.
- **Cache invalidation bugs** — a cache-first service worker serving **stale** assets forever after a deploy; version your caches and update the service worker correctly.
- Assuming full **native parity** — device-API support varies, and iOS restricts PWAs; test on target platforms.
- Not designing an **offline fallback** → the "offline" capability is only as good as your caching strategy.
- Confusing the **service worker** (network/offline) with a plain **web worker** (background compute — see how-web-workers-work).
- Over-caching **dynamic/auth** responses → serving one user's cached data to another; be careful what you cache.
