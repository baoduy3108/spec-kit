---
name: last-30-days-briefing
description: Last-N-days briefing — compiling a "what changed in the last 30 days" digest for a topic from dated sources, with a time window, recency weighting, deduplication, change detection, and clear dating of every item. Use when building a recent-activity summary, a 30-day roundup, a "what's new since" digest, or a time-windowed news/change report.
category: research
keywords_vi: bản tin 30 ngày qua, tổng hợp thay đổi gần đây theo chủ đề, cửa sổ thời gian lọc tin mới, xếp hạng theo độ mới, khử trùng lặp tin, phát hiện điều gì mới kể từ mốc, ghi rõ ngày cho từng mục, tóm tắt hoạt động gần đây
---

# Last-N-Days Briefing ("What changed recently")

A **last-30-days briefing** answers "what's new / what changed on X since a month ago" — not a general summary, but a **time-windowed digest** of recent activity, every item dated. It turns a stream of dated sources into a compact "since last month" roundup (see news-aggregation-and-rss, engagement-and-recency-ranking).

## The Time Window Is Everything

- **Anchor to *now*** — the window is `[today − N days, today]` (default 30). Compute it at run time; never hardcode dates.
- **Every source needs a date** — published/updated timestamp. Items without a reliable date are suspect: flag them, don't silently include them as "recent."
- **Filter first, then rank** — drop anything outside the window before summarizing, so old material can't leak in as "new."
- **State the window explicitly** in the output ("changes from 3 Jul–2 Aug 2026") so the reader knows exactly what's covered.

## Gathering Dated Sources

- **RSS/Atom feeds, changelogs, release notes, commit logs, dated news** — sources that carry timestamps are ideal (see news-aggregation-and-rss).
- **Search with recency operators** where available (date-restricted queries), then re-verify each result's actual date — search engines lie about freshness.
- **Normalize timestamps** to one timezone/format before comparing (see layout... no — see date/time handling); an off-by-one-day bug drops or admits the wrong items.

## Dedupe, Cluster, Detect Change

- **Deduplicate** near-identical items (the same story from many outlets) — cluster by title/URL similarity, keep the most authoritative or earliest (see url-normalization-and-crawl-dedup).
- **Change detection** — for a tracked entity (a repo, a product, a policy), diff the current state against the snapshot from N days ago and report *what actually changed*, not the whole state.
- **Group by sub-topic or date** so the digest reads as a structured roundup, not a flat list.

## Recency Weighting & Honesty

- **Weight by recency** within the window — this week matters more than three weeks ago — but keep everything in-window (see engagement-and-recency-ranking).
- **Date each line** in the output; link the source. A briefing whose items aren't individually dated can't be trusted or checked.
- **Recency ≠ reliability** — fresh items are the *least* verified. Mark unconfirmed/breaking items and cross-check important claims against multiple sources before stating them as fact.
- **Say when nothing happened** — an honest "no significant changes in the window" beats padding with stale or off-topic filler.

Build a last-N-days briefing by **anchoring a time window to now**, gathering **dated** sources, **filtering to the window before ranking**, then **deduping, detecting real changes, and recency-weighting** what remains — with **every item dated and linked**, the window stated, and fresh-but-unverified claims flagged. The deliverable is a trustworthy "what changed since last month," not a timeless summary.
