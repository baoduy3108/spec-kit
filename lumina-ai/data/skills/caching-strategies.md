---
name: caching-strategies
description: Cache correctly for speed without serving stale or wrong data — cache layers (client/CDN/app/DB), patterns (cache-aside, write-through, write-behind), invalidation and TTLs, the hard problems (stampede/thundering herd, cache penetration), and knowing what NOT to cache. Use when adding caching or debugging stale/inconsistent cached data.
category: engineering
keywords_vi: caching, bộ nhớ đệm, cache aside, invalidate cache, ttl cache, dữ liệu cũ stale, cache stampede, redis cache, tối ưu bằng cache
---

# Caching Strategies

Caching is the highest-leverage speedup and the easiest way to serve wrong data. "There are only two hard things: cache invalidation and naming things."

## Layers (cache close to the reader)

Client/browser → CDN (static + cacheable responses at the edge) → application cache (in-memory / Redis / Memcached for hot computed data) → database cache/buffer pool. Each layer that hits saves all the work below it.

## Patterns

- **Cache-aside (lazy)** — app checks cache; on miss, load from DB, populate cache, return. Most common. Risk: first request is slow; stale until TTL or explicit invalidation.
- **Write-through** — write to cache and DB together; cache always fresh, writes slower.
- **Write-behind (write-back)** — write to cache, flush to DB async; fast writes, risk of loss on crash.
- **Read-through** — the cache library loads on miss transparently.

## Invalidation (the hard part)

- **TTL** — expire after N seconds; simplest, accepts bounded staleness. Pick TTL from how fresh the data must be.
- **Explicit invalidation** — delete/update the key on write. Correct but you must find *every* write path; a missed one serves stale data forever.
- **Versioned keys** — embed a version/updated-at in the key so old entries are naturally abandoned.
- Prefer TTL + explicit invalidation together for hot, must-be-fresh data.

## Hard Problems

- **Stampede / thundering herd** — a popular key expires and thousands of requests hit the DB at once. Mitigate with a lock/single-flight (one request recomputes, others wait), staggered TTLs (jitter), or serving stale-while-revalidate.
- **Cache penetration** — repeated misses for keys that don't exist hammer the DB; cache the "not found" result (short TTL) or use a bloom filter.
- **Consistency** — cached data is a copy; accept eventual consistency, or don't cache data that must be exact (balances, permissions) unless you invalidate synchronously on write.

## Don't Cache

Highly personalized/one-off data, rapidly changing values, anything security-sensitive without a per-user key, or data where staleness is unacceptable. A cache key must include everything that varies the result (user, locale, params) — a missing dimension serves one user's data to another.
