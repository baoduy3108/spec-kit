---
name: bandwidth-throttling-and-download-scheduling
description: How a download manager stays a good citizen and stays usable — bandwidth throttling (rate limiting your own transfers with a token bucket) and download scheduling (queue with concurrency limits, priorities, pause/resume). Covers why you'd cap your own speed, sharing a global budget across parallel connections, and scheduling policies. Use to build a download queue that doesn't saturate the link or hammer servers.
category: networking
keywords_vi: giới hạn băng thông throttling tự giới hạn tốc độ tải bằng token bucket, lập lịch tải hàng đợi giới hạn số tải đồng thời ưu tiên tạm dừng tiếp tục, vì sao tự giảm tốc độ để không nghẽn mạng, chia ngân sách băng thông chung cho nhiều kết nối song song, chính sách lập lịch download queue lịch sự với máy chủ
---

# Bandwidth Throttling & Download Scheduling

A download manager that grabs everything at once, at full speed, is a **bad citizen** and a **bad experience**: it saturates the user's uplink/downlink (making video calls stutter and web browsing crawl — see bufferbloat-and-active-queue-management), hammers servers, and can trip rate limits or bans. Two controls make it well-behaved: **throttling** (cap your own transfer rate) and **scheduling** (control how many downloads run and in what order) (see download-manager-reliability, rate-limiting-algorithms, segmented-parallel-downloading).

## Bandwidth Throttling: Rate-Limit Yourself

Sometimes you *want* to download **slower** — to leave bandwidth for other apps, avoid bufferbloat-induced lag, or stay under a metered cap. Implement it with a **token bucket** (the same primitive as API rate limiting): tokens (bytes) refill at the target rate (e.g. 2 MB/s); before writing a chunk you must "spend" that many tokens, sleeping/awaiting when the bucket is empty. Key subtlety with **parallel connections**: the limit must be a **shared global budget** across all N segments/connections, not per-connection — otherwise 8 connections at "2 MB/s each" = 16 MB/s. Enforce the cap at a **central rate limiter** all connections draw from.

## Download Scheduling: The Queue

Beyond a single file, a manager runs a **queue** of downloads and decides what runs when:
- **Concurrency limit** — cap how many downloads run **simultaneously** (e.g. 3 at a time); the rest **wait**. Prevents thrashing the link/disk and overwhelming servers.
- **Per-host limits** — cap concurrent connections **to the same server** (politeness; avoids bans). Distinct from the global concurrency cap.
- **Priorities** — let the user/queue promote urgent downloads ahead of background ones.
- **Pause / resume / cancel** — first-class states; pausing frees a slot for queued items, resume picks up from the saved offset (see resumable downloads).
- **Scheduling policies** — FIFO, priority, or time-based (e.g. "download large files overnight / off-peak").

## Why It Matters

- **Coexistence** — the machine stays usable while downloading; you don't monopolize the pipe (and bufferbloat means "full speed" often *raises latency* for everything, so throttling can improve overall experience).
- **Server politeness** — bounded per-host concurrency and rate avoid triggering `429`/bans and are the ethical baseline (especially for crawlers — see crawler-politeness-and-robots-txt).
- **Predictability** — a queue with limits behaves; unbounded parallelism causes disk thrash, connection storms, and failures.

## Design Guidance (for understanding/using)

- **Throttle with a shared global token bucket** across all connections — cap total, not per-connection.
- **Bound total concurrency AND per-host connections** — protect your link and the servers.
- **Make pause/resume/cancel and priority first-class** in the queue; resume from saved offsets.
- **Offer off-peak/scheduled downloads** for large or metered transfers.
- **Prefer throttling to "max speed" when latency matters** — saturating the link hurts everything else (bufferbloat).

## Pitfalls (in understanding/using)

- Applying the rate limit **per connection** → N connections multiply past the intended cap; use one shared budget.
- **Unbounded** concurrency → link/disk thrash, connection storms, server bans.
- No **per-host** limit → hammering one server (and getting `429`/blocked) even under a global cap.
- Treating pause as "kill + restart" → wastes progress; pause should keep the offset for resume.
- Downloading at "full speed" always → bufferbloat spikes latency for calls/browsing; throttling can feel *faster* overall.
