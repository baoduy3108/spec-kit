---
name: load-shedding-and-graceful-degradation
description: How a system stays alive under overload instead of collapsing — load shedding (deliberately rejecting/dropping work) and graceful degradation (serving a reduced but useful experience). Covers admission control, queue bounding, priority classes, brownout, and why "try to serve everything" causes total meltdown. Use to design overload behavior, avoid retry storms and cascading failure, and pick what to sacrifice first.
category: distributed-systems
keywords_vi: giảm tải chủ động load shedding từ chối bớt việc, suy giảm nhẹ nhàng graceful degradation phục vụ bản rút gọn, kiểm soát nạp vào admission control giới hạn hàng đợi, ưu tiên theo lớp và brownout, tránh bão retry và sụp đổ dây chuyền, chọn thứ hi sinh trước khi quá tải
---

# Load Shedding & Graceful Degradation

Every system has a capacity. When demand exceeds it, there are two outcomes. The naive one: **try to serve everything** — queues grow, latency climbs, timeouts fire, clients **retry** (multiplying load), memory fills, and the whole system **melts down**, serving *nobody*. The engineered one: **shed load** — deliberately reject or shrink some work so the rest completes. A system that serves 80% of traffic well beats one that serves 0% because it tried to serve 100% (see tail-latency-and-hedged-requests, rate-limiting-algorithms, circuit-breaker-pattern).

## Why Overload Cascades

Overload is a **positive feedback loop**:
1. Load exceeds capacity → latency rises.
2. Rising latency trips client **timeouts**.
3. Clients **retry** → even more load.
4. Work already timed-out is still being processed → wasted capacity ("**dead work**").
5. Go to 1, faster.

Without a brake, this converges to total failure. Load shedding is the brake.

## Load Shedding — reject early, reject cheap

**Admission control**: decide *at the front door*, before expensive work, whether to accept a request. Techniques:
- **Bounded queues** — a full queue means "reject now" (fast 503) instead of accepting work you can't finish in time.
- **Concurrency limits** — cap in-flight requests (e.g. adaptive limits à la TCP congestion control); reject beyond it.
- **Drop dead work** — if a request has already exceeded its deadline while queued, **don't run it** — the client is gone.
- **Priority classes** — shed low-value traffic first (batch, prefetch, non-critical) so paying/critical users still succeed.
- **Reject cheaply** — shedding must cost far less than serving, or shedding itself overloads you.

## Graceful Degradation — serve less, not nothing

When you can't do the full thing, do a **useful subset**:
- Serve **stale cache** instead of a fresh (expensive) computation.
- Return **fewer/approximate** results (skip the expensive re-rank, personalization, or a slow enrichment).
- Turn off non-essential features (**brownout**) — recommendations, thumbnails, analytics — to protect the core path.
- Show a **degraded but honest** UI ("live data unavailable, showing cached") rather than an error page.

## Play Well With Clients

- **Return `429`/`503` with `Retry-After`** so clients back off instead of hammering.
- Assume clients use **exponential backoff + jitter**; a fleet that retries instantly will re-create the overload.
- Combine with **circuit breakers** so callers stop sending to a failing dependency.

## Design Guidance

- **Decide overload behavior *before* the incident** — pick what to shed and what to degrade in advance.
- **Prioritize** — classify traffic so you can sacrifice the least valuable first.
- **Bound everything** — unbounded queues/threads convert overload into OOM crashes.
- **Kill dead work** — never spend capacity on requests whose deadline already passed.
- **Test it** — load-test to the breaking point and confirm you degrade, not collapse.

## Pitfalls (in understanding/using)

- "Just add a bigger queue" → deeper queues raise latency and hide overload until collapse; bound them.
- Retrying aggressively on 503 → a **retry storm** turns a blip into an outage.
- Shedding **after** the expensive work → you've already paid the cost; reject at admission.
- Treating all traffic equally → you drop critical requests alongside junk.
- No degraded mode → the only options become "perfect" or "down".
