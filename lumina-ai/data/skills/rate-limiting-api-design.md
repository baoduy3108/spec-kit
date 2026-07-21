---
name: rate-limiting-api-design
description: How to design API rate limiting from the client's perspective — 429 responses, Retry-After and rate-limit headers (limit/remaining/reset), quota tiers, per-key/per-user scoping, and communicating limits clearly. Use to design API rate limits, return 429/Retry-After, expose rate-limit headers, or design fair usage quotas. (For the algorithms see rate-limiting-algorithms.)
category: engineering
keywords_vi: thiết kế rate limit api, phản hồi 429, header retry-after và rate-limit limit remaining reset, hạn mức theo gói tier, giới hạn theo key user, truyền đạt giới hạn rõ ràng
---

# Rate Limiting API Design

Rate limiting protects an API from overload and abuse and enforces fair usage — but from a **client developer's** perspective, what matters is *how the limits are communicated and handled*. Good rate-limit **design** (correct status codes, informative headers, clear quotas) lets well-behaved clients **cooperate**; bad design causes confusing failures and retry storms. This is the API-design side; for the counting algorithms (token bucket, sliding window) see **rate-limiting-algorithms**.

## Why (and What to Limit)

Rate limits exist to: prevent **overload/DoS**, ensure **fair usage** across clients, control **cost**, and enforce **plan tiers**. Typical scoping:
- **Per API key / per user / per IP** — so one client can't starve others (like the bulkhead idea — see bulkhead-isolation).
- **Per endpoint** — expensive endpoints get tighter limits.
- **Tiered quotas** — free vs paid plans get different limits.
Decide the **scope** and **window** (requests per second/minute/hour/day) deliberately.

## Communicate Limits: 429 + Retry-After

When a client exceeds the limit, the response design is what makes clients behave well:
- **Return `429 Too Many Requests`** — the correct status code (not 403, not 503, not a silent drop). Clients recognize 429 and know to back off.
- **`Retry-After` header** — tell the client **when** it can try again (seconds or a date). A cooperative client waits exactly that long instead of hammering (see retries-and-resilience). This single header prevents retry storms.
- **A clear error body** — explain the limit was hit and point to docs (see api-error-handling-design).

## Expose Rate-Limit Headers (proactive)

Even on **successful** responses, tell clients where they stand so they can self-throttle **before** hitting the wall:
- **`X-RateLimit-Limit`** — the cap for the window.
- **`X-RateLimit-Remaining`** — how many requests are left.
- **`X-RateLimit-Reset`** — when the window resets.
(The `RateLimit` standard headers formalize this.) With these, a good client **paces itself** — slowing as `Remaining` drops — instead of blindly hitting 429s. Proactive visibility beats reactive rejection.

## Fairness and Tiers

- **Per-key isolation** so one abusive client can't degrade others.
- **Plan tiers** — different quotas per subscription level; return quota info so users understand their tier.
- **Burst vs sustained** — often allow short bursts (token bucket) over a lower sustained rate (see rate-limiting-algorithms).
- **Graceful degradation** — consider soft limits (throttle/queue) vs hard rejects depending on the endpoint.

## Design Guidance

- **Return 429** (not 403/500) when limited; make it unambiguous.
- **Always include `Retry-After`** on 429 — the key to preventing retry storms.
- **Expose `RateLimit-*` headers** on normal responses so clients self-throttle proactively.
- **Scope per key/user** for fairness; tighter limits on expensive endpoints.
- **Document limits and tiers** clearly so clients design for them.
- **Consistent error body** for 429 (see api-error-handling-design).
- **Be lenient at the edges** — small bursts allowed; don't punish clients that respect `Retry-After`.

## Pitfalls (in understanding/using)

- Using the **wrong status** (403/500/silent drop) instead of **429** → clients can't tell they're rate-limited.
- **No `Retry-After`** → clients retry immediately and cause a retry storm (defeating the limit).
- **No rate-limit headers** on success → clients only learn the limit by hitting 429 (reactive, wasteful).
- **Undocumented/opaque** limits → developers can't design for them; surprise failures in production.
- **Global** limits (not per-key) → one abusive client rate-limits everyone (no fairness).
- Limits **too aggressive** or with no burst allowance → legitimate clients throttled needlessly.
- Confusing rate-limit **design** (this) with the **algorithm** that counts (rate-limiting-algorithms).
