---
name: rate-limiting-algorithms
description: Design rate limiting — the algorithms (fixed window, sliding window log/counter, token bucket, leaky bucket), where to enforce it, per-key strategies, distributed rate limiting, and returning 429 with Retry-After. Use when protecting an API/service from abuse or overload, or choosing a rate-limit algorithm.
category: engineering
keywords_vi: rate limiting, giới hạn tần suất, token bucket leaky bucket, sliding window, chống spam api, 429 too many requests, throttle, bảo vệ api quá tải
---

# Rate Limiting Algorithms

Rate limiting protects a service from abuse, accidental floods, and overload, and enforces fair usage/quotas. Pick the algorithm by how bursty and precise you need to be.

## The Algorithms

- **Fixed window** — count requests per calendar window (e.g. 100/minute), reset at the boundary. Simplest, but allows a **burst at the edges**: 100 at 0:59 + 100 at 1:00 = 200 in ~1 second.
- **Sliding window log** — store timestamps of recent requests, count those within the trailing window. Accurate, but memory-heavy (one entry per request).
- **Sliding window counter** — approximate the sliding window by weighting the current + previous fixed windows. Good accuracy, cheap — a common production choice.
- **Token bucket** — a bucket refills tokens at a steady rate up to a capacity; each request consumes a token; empty → reject. **Allows bursts** up to the bucket size while capping the long-run rate. Great for APIs that should tolerate short spikes. (This is what LUMINA's per-user limiter uses.)
- **Leaky bucket** — requests queue and drain at a fixed rate; **smooths** bursts into a steady output. Good when the downstream needs a constant rate.

**Token bucket** (burst-tolerant) and **sliding window counter** (accurate, cheap) are the usual picks.

## Design Choices

- **Per what key?** — per user/API key (fairness, quotas), per IP (anonymous abuse — but shared NAT/IPv6 caveats), per endpoint (protect expensive routes), or global (protect the whole service). Often several layers.
- **Where?** — at the edge/gateway (cheapest, before work), and/or in the app for user-aware limits.
- **Distributed** — with multiple servers, the counter must be **shared** (Redis with atomic increments/Lua, or a token-bucket in Redis) so limits are global, not per-instance. Beware race conditions — use atomic operations.

## Responding

Return **HTTP 429 Too Many Requests** with a **`Retry-After`** header (and often `X-RateLimit-Limit/Remaining/Reset`) so clients back off correctly instead of hammering. Fail **closed** for abuse protection, but consider failing **open** if the limiter itself is down and availability matters more.

## Pitfalls

- **Fixed-window edge bursts** allowing 2× the intended rate momentarily.
- **Per-instance counters** that don't add up to the global limit across a fleet.
- **Race conditions** on read-modify-write of the counter (use atomic increments).
- No `Retry-After` → clients retry immediately and worsen the load.
- Rate-limiting by IP alone (breaks behind proxies/NAT; spoofable).
