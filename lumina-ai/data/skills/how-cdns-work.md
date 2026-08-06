---
name: how-cdns-work
description: How a Content Delivery Network works — edge servers cache content geographically close to users, cutting latency; cache keys, TTLs, and cache-control headers; origin shielding; cache invalidation/purging; and what to cache (static vs dynamic). Use to understand CDNs, caching headers, and why static assets load fast globally.
category: engineering
keywords_vi: cdn hoạt động thế nào, content delivery network, edge server cache, tăng tốc tải trang, cache-control ttl, purge invalidate cdn, phục vụ tĩnh toàn cầu, hiểu cdn
---

# How CDNs Work

A CDN is a global network of **edge servers** that cache your content close to users, so a request is served from a nearby city instead of crossing the world to your origin.

## Why It Speeds Things Up

Latency is bound by distance/round-trips. If your server is in the US and a user is in Vietnam, every asset pays that round-trip. A CDN caches copies at **edge locations** worldwide; the user's request is routed (usually via **anycast** DNS) to the **nearest edge**. On a cache hit, the edge serves it immediately — no trip to origin. This slashes latency, offloads your origin, and absorbs traffic spikes (and DDoS).

## Cache Hit / Miss & Keys

- **Hit** — the edge has a fresh copy → serve it.
- **Miss** — the edge fetches from **origin** (or a mid-tier **shield** cache), stores it, and serves it; the next user in that region hits.
The **cache key** is usually the URL (± some headers/query params). Getting the key right matters — including a varying param (like a tracking token) in the key fragments the cache and kills hit rates; ignoring a param that changes the response serves wrong content.

## Controlling Caching (headers)

The origin tells the CDN (and browsers) how to cache via **`Cache-Control`**: `max-age` (how long it's fresh / the TTL), `public`/`private`, `no-store`, `immutable`, and `stale-while-revalidate`. **ETag/Last-Modified** enable revalidation (304 Not Modified) so unchanged content isn't re-downloaded. Long TTLs + **content-hashed filenames** (`app.a1b2c3.js`) give you "cache forever, bust by renaming" — the standard for static assets.

## Invalidation

The hard part (cache invalidation again). Options: **TTL expiry** (wait it out), **purge/invalidate** (tell the CDN to drop a URL now — for an urgent change), or **versioned URLs** (change the filename so it's a new key — no purge needed, the best default). Purges take seconds-to-minutes to reach all edges.

## What to Cache

- **Static assets** (JS/CSS/images/fonts/video) — ideal, cache aggressively with hashed names.
- **Cacheable dynamic** (a public API response, a rendered page for anonymous users) — cache with short TTLs / stale-while-revalidate.
- **Personalized/authenticated content** — usually don't cache at the edge (or cache per-user carefully / at a private layer) to avoid serving one user's data to another.

## Pitfalls

- **Cache key including a varying param** → near-zero hit rate.
- **Caching personalized content publicly** → data leak (one user sees another's page).
- **No versioning + long TTL** → users stuck on stale assets after a deploy.
- Forgetting the **origin still needs to be fast** for misses and uncacheable requests.
