---
name: battery-and-network-efficiency
description: Making mobile apps battery- and data-efficient — batching and deferring background work, minimizing radio wake-ups, respecting OS background limits (Doze/background modes), caching to cut requests, and reducing payload sizes. Use to reduce battery drain, minimize mobile data usage, handle background work efficiently, or respect OS power limits.
category: engineering
keywords_vi: tiết kiệm pin và mạng, app di động hiệu quả năng lượng, gom và hoãn việc nền, giảm đánh thức radio, giới hạn nền doze, cache giảm request, giảm kích thước payload
---

# Battery and Network Efficiency

On mobile, **battery and data are scarce, user-visible resources** — an app that drains the battery or burns through a data plan gets uninstalled. Efficiency comes down to doing **less work, less often**, especially waking the **radio** (cellular/Wi-Fi) and the CPU in the background. Modern OSes also **enforce** limits, so cooperating with them is mandatory (see mobile-app-performance, how-push-notifications-work).

## Why the Radio Is the Enemy

The **cellular radio** is one of the biggest battery drains. Crucially, it doesn't just cost power **per byte** — after any transmission it stays in a **high-power state for seconds** (the "tail energy") before powering down. So **many small, spread-out requests** are far worse than the same data sent in **one batch**: each lone request wakes the radio and pays the full tail cost. The single most impactful efficiency principle: **batch network work** so the radio wakes rarely and does a lot at once, then sleeps.

## The Core Techniques

- **Batch** — group network calls together (send analytics/logs in batches, prefetch several things at once) instead of dribbling requests.
- **Defer** — postpone non-urgent background work until conditions are favorable: device **charging**, on **Wi-Fi**, or during a scheduled maintenance window. Use the OS's **job/work scheduler** (WorkManager, BackgroundTasks) which coalesces work across apps.
- **Coalesce wake-ups** — align your periodic work with other wake-ups rather than your own timer, so the device wakes fewer times.
- **Cache aggressively** — serve from local cache to **avoid requests entirely** (see how-http-caching-works); respect cache headers; don't refetch unchanged data (use ETags/conditional requests).
- **Shrink payloads** — compress (gzip/brotli), use efficient formats, request only needed fields (GraphQL / sparse fieldsets), and right-size images. Less data = less radio time.
- **Respect connectivity** — check network type; defer big downloads off cellular; back off when offline (don't spin retrying — see retries-and-resilience).

## Respect OS Background Limits

Mobile OSes aggressively **restrict background activity** to save battery:
- **Doze / App Standby (Android)** and iOS **background execution limits** batch or suspend background work when the device is idle or the app is unused. You **can't** just run whatever you want in the background.
- Use **push notifications** to trigger sync **on demand** (see how-push-notifications-work) instead of **polling** on a timer (polling is a battery killer and often throttled anyway).
- Use the **official background-work APIs**; work that fights the OS gets killed or throttled.

## Design Guidance

- **Batch and defer** — the golden rule; minimize radio/CPU wake-ups.
- **Push over poll** — server-triggered sync beats periodic polling.
- **Cache to avoid requests**; use conditional requests to skip unchanged data.
- **Compress and minimize** payloads; right-size images.
- **Schedule heavy work** for charging + Wi-Fi via the OS job scheduler.
- **Back off** on failure/offline instead of tight retry loops.
- **Measure** battery/data impact (platform profilers) on real devices.

## Pitfalls (in understanding/using)

- **Frequent small requests** → repeated radio wake-ups and tail energy; batch them.
- **Polling** on a timer for updates → constant wake-ups and battery drain; use push.
- **Tight retry loops** when offline/failing → hammering the radio; use backoff (see retries-and-resilience).
- Ignoring **OS background limits** → your background work gets throttled/killed anyway, unreliably.
- **No caching / refetching unchanged data** → wasted radio time; use conditional requests.
- **Oversized payloads/images** over cellular → burns the user's data plan and battery.
- Assuming background work runs **whenever you want** → it doesn't; cooperate with the scheduler.
