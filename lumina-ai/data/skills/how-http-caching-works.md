---
name: how-http-caching-works
description: How HTTP caching works — Cache-Control directives (max-age, no-store, private/public), validation with ETag/Last-Modified and 304 Not Modified, browser vs shared/CDN caches, cache busting with fingerprinted URLs, and stale-while-revalidate. Use to understand HTTP caching, Cache-Control, ETags, why assets are cached, or cache-busting.
category: engineering
keywords_vi: http caching, cache-control, max-age, etag, 304 not modified, cache busting, stale while revalidate, bộ nhớ đệm web browser
---

# How HTTP Caching Works

HTTP caching lets browsers, proxies, and CDNs **reuse previously-fetched responses** instead of re-downloading them — making the web fast and cheap. It's controlled by HTTP headers the server sends. Getting it right dramatically speeds sites; getting it wrong serves stale content or wastes bandwidth.

## Two Kinds of Caching

- **Freshness (no request at all)** — if a response is still "fresh," the cache serves it directly without contacting the server. Fastest.
- **Validation (a cheap request)** — if freshness expired, the cache asks the server "has this changed?" and gets either a tiny **304 Not Modified** (reuse the cached copy) or a fresh response. Saves re-downloading the body when nothing changed.

## Freshness: Cache-Control

The **`Cache-Control`** header sets the policy:
- **`max-age=N`** — the response is fresh for N seconds; serve from cache without asking.
- **`no-cache`** — cache it, but **always revalidate** before using (not "don't cache").
- **`no-store`** — don't cache at all (sensitive data).
- **`private`** — only the user's browser may cache (personalized responses); **`public`** — shared caches (CDNs/proxies) may cache too.
- **`immutable`** — never revalidate during freshness (for fingerprinted assets).
Set long `max-age` for static assets, short/no-store for dynamic or private data.

## Validation: ETag & Last-Modified

When freshness expires, the cache **validates**:
- **`ETag`** — the server sends a fingerprint (hash/version) of the content. Next time, the browser sends `If-None-Match: <etag>`; if unchanged, the server replies **304** (no body). 
- **`Last-Modified`** — a timestamp; the browser sends `If-Modified-Since`.
A 304 is tiny, so validation is cheap even when it happens. ETags are more precise than timestamps.

## Where Caches Live

- **Browser (private) cache** — per user, on their device.
- **Shared caches** — CDNs (see how-cdns-work) and proxies serving many users. Only cache `public` responses here; **never** cache `private`/personalized data in a shared cache (a serious data-leak bug).

## Cache Busting (the fingerprint trick)

You want static assets cached **forever** (fast) but also to update instantly when you deploy. Solution: put a **content hash in the filename** — `app.9f3c2a.js`. Cache it with a huge `max-age` (immutable); when the content changes, the filename changes, so browsers fetch the **new URL** automatically. The HTML referencing it stays uncached/short-cached. This gives permanent caching **and** instant updates — the standard modern approach.

## stale-while-revalidate

`Cache-Control: stale-while-revalidate=N` lets a cache serve a **slightly stale** response immediately (fast) while **refreshing in the background** for next time — great perceived performance without blocking on revalidation.

## Pitfalls (in understanding/using)

- Caching **private/personalized** responses in a **shared/CDN** cache → one user sees another's data. Mark them `private`/`no-store`.
- Caching HTML aggressively → users stuck on old pages after a deploy. Cache **fingerprinted assets** long, HTML short.
- Misreading **`no-cache`** as "don't cache" (it means "revalidate every time"); `no-store` is "don't cache."
- No **cache-busting** strategy → either stale assets or no caching at all. Use content-hashed filenames.
- Forgetting to set caching headers → default/heuristic behavior that's often wrong.
- Caching authenticated API responses without care (leaks/staleness) — vary by auth or don't cache.
