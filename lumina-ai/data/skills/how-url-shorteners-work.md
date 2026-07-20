---
name: how-url-shorteners-work
description: How URL shorteners work — mapping a short code to a long URL in a store, generating short unique codes (counter+base62 vs random vs hash), the redirect (301 vs 302), and scaling reads with caching; a classic system-design problem. Use to understand URL shorteners (bit.ly), short-code generation, redirects, or the design of a read-heavy key-value service.
category: engineering
keywords_vi: how url shorteners work, url shortener hoạt động thế nào, map mã ngắn sang url dài, sinh mã base62 counter random hash, redirect 301 302, cache đọc nhiều, system design
---

# How URL Shorteners Work

A URL shortener (bit.ly, tinyurl) turns a long URL into a short one that redirects to it. It looks trivial but is a classic **system-design** exercise that touches unique-ID generation, key-value storage, redirects, and scaling a read-heavy service (see how-key-value-stores-work, how-http-works).

## The Core: a Short Code → Long URL Mapping

At heart it's a **key-value store** (see how-key-value-stores-work): a short **code** (`abc123`) maps to a **long URL**. Two operations:
- **Create** — given a long URL, generate a unique short code, store `code → long URL`, return `short.ly/abc123`.
- **Redirect** — when someone visits `short.ly/abc123`, look up the code, and **redirect** them to the long URL.
Everything else is about generating good codes and serving redirects fast.

## Generating Short Codes

The interesting part: how to make short, unique codes. Options:
- **Counter + base62 encoding** — keep an incrementing ID and encode it in **base62** (a–z, A–Z, 0–9). Base62 packs a lot into few characters (62⁷ ≈ 3.5 trillion in 7 chars), so IDs become short codes. Guarantees uniqueness (each ID is unique — see how-uuids-work for the coordination angle) and is compact. Downside: codes are **sequential/guessable** (someone can enumerate them) — mitigate by scrambling the counter or starting high.
- **Random codes** — generate a random base62 string of fixed length; check for collision (rare in a big space) and retry if taken. Unpredictable, but needs a uniqueness check.
- **Hash of the URL** — hash the long URL (see how-cryptographic-hashing-works) and take the first few characters. Same URL → same code (dedup), but risks collisions (truncated hashes collide) needing handling.
Counter+base62 (or a distributed ID + base62) is the common, clean choice.

## The Redirect (301 vs 302 — a real decision)

On visiting a short URL, the server returns an **HTTP redirect** (see how-http-works) to the long URL:
- **301 (Permanent)** — tells browsers/proxies the mapping is permanent; they **cache** it and may skip your server next time. Faster for users, less load — **but** you **lose analytics** (cached redirects don't hit you) and can't easily change the target.
- **302 (Temporary/Found)** — not cached the same way; **every** click hits your server → you get **click analytics** and control, at higher load.
Most shorteners use **302** (or 307) to keep tracking clicks — a deliberate trade of load for analytics.

## Scaling: Read-Heavy

URL shorteners are **massively read-heavy** (far more redirects than creations). So the design optimizes reads:
- **Caching** — cache popular `code → URL` mappings in memory/Redis (see caching-strategies, semantic-caching's caching idea) so hot links redirect without a DB hit. This is the biggest lever.
- **Fast key-value lookup** — the store just needs `O(1)` get-by-code (a KV store or a simple indexed table — see how-key-value-stores-work).
- **CDN/edge** — redirects can be served near users (see how-cdns-work, edge-computing).
- **Sharding** by code for huge scale (see how-database-sharding-works).
The write path (creation) is comparatively rare and simple.

## Pitfalls (in understanding/using)

- **Sequential codes** (counter+base62) being **guessable/enumerable** — scramble or randomize if URLs are sensitive.
- Choosing **301** and then wanting **analytics** or to change targets — 301s get cached; use 302 to keep clicks hitting you.
- **Truncated-hash** codes colliding without collision handling.
- Not **caching** the read path → the DB becomes the bottleneck under redirect load.
- Ignoring **abuse** — shorteners hide destinations, enabling phishing/malware; add safety checks (see threat-modeling, information-verification).
- Not handling **expiry/deletion** or very long URLs / custom aliases if required.
- Forgetting it's **read-heavy** and optimizing writes instead of reads/caching.
