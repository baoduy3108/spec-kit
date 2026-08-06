---
name: news-aggregation-and-rss
description: How to aggregate news and content from many sources — RSS/Atom feeds, news APIs, polling and change detection, normalizing heterogeneous formats, deduplication, and ranking/filtering for relevance. Use to build a news aggregator, feed reader, or content-monitoring pipeline, or to understand RSS/feeds and pulling updates from many sources.
category: engineering
keywords_vi: news aggregation rss, tổng hợp tin tức, rss atom feed, news api, polling phát hiện thay đổi, chuẩn hóa định dạng, khử trùng lặp tin, xếp hạng lọc liên quan
---

# News Aggregation & RSS

News/content aggregation is pulling updates from **many sources** into one unified stream — the backbone of feed readers, monitoring dashboards, and news apps. The engineering challenges are ingesting heterogeneous sources, keeping fresh without hammering them, and turning a flood into something relevant.

## Sources: Feeds, APIs, Scraping

- **RSS / Atom feeds** — the classic mechanism: sites publish a standardized **XML feed** of recent items (title, link, summary, timestamp). Simple to parse, purpose-built for "what's new," and polite (you fetch one small file). The first choice when a source offers one.
- **News APIs** — structured JSON endpoints (news aggregator APIs, official APIs) with search/filtering. Richer, but rate-limited and often paid.
- **Scraping** — when there's no feed/API, extract from HTML (see web-scraping-fundamentals) — brittle and heavier; use as a last resort and respect the site.
Prefer feeds/APIs over scraping wherever possible.

## Ingestion: Polling & Change Detection

Most feeds are **pulled** on a schedule (polling), since sources rarely push. Key concerns:
- **Polling frequency** — often enough to be fresh, not so often you waste resources or get blocked. Match to how often the source updates (a breaking-news wire vs a weekly blog).
- **Conditional requests** — use HTTP `ETag`/`If-Modified-Since` (see how-http-caching-works) so you only download when something changed — efficient and polite.
- **Change detection** — track what you've already seen (by item ID/GUID/URL/hash) so you only process **new** items, not re-ingest the whole feed each poll.
- **Respect the source** — honor rate limits and `robots.txt`; back off on errors (see retries-and-resilience).

## Normalization

Sources come in different formats, fields, encodings, timezones, and HTML quality. **Normalize** everything into a **common schema** (title, canonical URL, published-at in UTC, source, author, clean text/summary) so downstream code treats all items uniformly. Handle character encoding (see encoding-and-unicode), relative→absolute URLs, and sanitize HTML.

## Deduplication

The same story appears across many sources and syndication — you must **dedupe** (see entity-resolution-and-deduplication) so users don't see ten copies: match by canonical URL, near-duplicate text (fuzzy/shingling/embeddings — see vector-embeddings), or clustering related articles into one "story." Essential for a clean aggregated feed.

## Ranking & Filtering

An unfiltered aggregate is overwhelming. Add **relevance**: filter by keywords/topics/sources the user cares about, rank by recency + source quality + relevance (see data-source-reliability), and group into topics/stories. This turns a firehose into signal (see event-detection-and-alerting for spotting what matters).

## Pitfalls (in understanding/using)

- **Polling too aggressively** → wasted resources, rate-limits/bans; use conditional requests and sensible intervals.
- **Re-ingesting duplicates** each poll (no change detection by item ID) → repeated processing/notifications.
- **No deduplication** → the same story shown many times from different sources.
- Not **normalizing** timezones/encodings/formats → messy, inconsistent data.
- **Scraping** when a feed/API exists (brittle, impolite) — check for RSS/API first.
- Ignoring feed **quality/reliability** (spam, low-trust sources) — weight/filter by source (see data-source-reliability).
- Storing full articles without regard to **copyright** — aggregate links/snippets appropriately.
