---
name: how-ntp-time-sync-works
description: How clocks are synchronized over networks (NTP) — stratum hierarchy, the four-timestamp round-trip that estimates offset and delay, gradual slewing vs stepping, and why distributed systems can't fully trust clocks (clock skew, logical clocks). Use to understand NTP, time synchronization, clock skew, or why timestamps are unreliable in distributed systems.
category: engineering
keywords_vi: ntp, đồng bộ thời gian, đồng bộ đồng hồ, stratum, clock skew, lệch giờ đồng hồ, logical clock, timestamp phân tán không tin cậy
---

# How Network Time Synchronization (NTP) Works

Computer clocks drift (a cheap crystal loses/gains seconds per day). NTP (Network Time Protocol) keeps machines' clocks close to true time (UTC) over unreliable networks — important for logs, TLS certs, distributed ordering, and scheduled jobs.

## The Stratum Hierarchy

NTP organizes time sources in layers:
- **Stratum 0** — reference clocks (atomic clocks, GPS receivers) — the ground truth.
- **Stratum 1** — servers directly attached to stratum-0 sources.
- **Stratum 2, 3, …** — servers that sync from the layer above, fanning out.
Higher stratum = more hops from the source (slightly less accurate). Your machine typically syncs from a few stratum-2/3 servers and cross-checks them.

## The Four-Timestamp Trick

The clever part: over a network with **variable, asymmetric delay**, how do you learn the true time? NTP records four timestamps for a request/response:
- `t1` — client sends (client clock)
- `t2` — server receives (server clock)
- `t3` — server replies (server clock)
- `t4` — client receives (client clock)

From these:
- **Round-trip delay** = `(t4 − t1) − (t3 − t2)` (total elapsed minus server processing).
- **Offset** (how far the client clock is off) = `((t2 − t1) + (t3 − t4)) / 2`.
Assuming symmetric network delay, the offset cancels out the travel time. The client samples many times, filters outliers, and applies the best estimate.

## Adjusting the Clock: Slew vs Step

- **Slewing** — speed up or slow down the clock slightly to *gradually* converge, so time never jumps backward (critical — many programs break if time goes backward). Used for small offsets.
- **Stepping** — jump the clock directly. Only for large offsets (e.g. at boot); disruptive, avoided at runtime.

## Why Distributed Systems Distrust Clocks

Even with NTP, clocks are only synchronized to within **milliseconds** (worse across WANs), and can jump (leap seconds, VM pauses, bad sync). So you **cannot** reliably order events across machines by wall-clock timestamp — two events milliseconds apart on different servers may be timestamped out of order. Distributed systems therefore use **logical clocks** (Lamport timestamps, vector clocks) or hybrid clocks (Google TrueTime uses bounded uncertainty) to order events, treating wall-clock time as approximate (see how-distributed-consensus-works).

## Pitfalls (in understanding/using)

- **Trusting wall-clock timestamps to order events across machines** — clock skew makes this wrong; use logical clocks/sequence numbers.
- Assuming time never goes backward — it can (step corrections, leap seconds); write code that tolerates it (use monotonic clocks for measuring durations).
- Using the system clock for **elapsed time** — use a **monotonic** clock instead (unaffected by NTP adjustments).
- Ignoring clock sync entirely → expired-cert errors, broken TOTP 2FA, misordered logs.
- Relying on a single time source (no cross-check → a bad server skews you).
