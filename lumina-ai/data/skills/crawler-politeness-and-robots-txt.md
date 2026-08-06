---
name: crawler-politeness-and-robots-txt
description: How a well-behaved crawler avoids harming sites and getting banned — politeness — via robots.txt compliance, crawl-delay/rate limiting, per-host concurrency limits, honest User-Agent identification, and respecting 429/Retry-After. Use to build an ethical, sustainable crawler that site owners tolerate, and to understand what robots.txt does and doesn't do.
category: networking
keywords_vi: crawler lịch sự tránh gây hại và bị chặn, tuân thủ robots.txt allow disallow crawl-delay, giới hạn tốc độ và số kết nối đồng thời mỗi máy chủ, khai báo user-agent trung thực, tôn trọng 429 và retry-after, đạo đức thu thập bền vững site owner chấp nhận, robots.txt làm gì và không làm gì
---

# Crawler Politeness & robots.txt

A crawler that hits a site as fast as it can is indistinguishable from a **denial-of-service attack** — it can overload small servers, run up someone's bandwidth bill, and will get your IP **blocked** fast. **Politeness** is the discipline of crawling in a way site owners tolerate: obey the rules they publish, go slow, identify yourself, and back off when told. It's both **ethics** and **self-interest** (impolite crawlers get banned) (see website-mirroring-and-crawling, bandwidth-throttling-and-download-scheduling, rate-limiting-algorithms).

## robots.txt: The Rules Sites Publish

`https://example.com/robots.txt` is a plain-text file where a site declares crawling rules per **User-Agent**:
```
User-agent: *
Disallow: /admin/
Disallow: /search
Crawl-delay: 10
Sitemap: https://example.com/sitemap.xml
```
- **`Disallow` / `Allow`** — path prefixes a crawler should/shouldn't fetch. **Fetch and parse robots.txt first**, cache it, and **skip disallowed paths**.
- **`Crawl-delay`** — a requested minimum seconds between requests (not honored by all, but respect it).
- **`Sitemap`** — points to a sitemap listing URLs (a **polite** way to discover pages without hammering).
What robots.txt is **not**: it's **advisory**, **not** access control or security — a malicious client can ignore it, and disallowed URLs are still publicly reachable. It expresses the owner's **wishes**; a good crawler honors them, and it's often part of the site's terms.

## The Politeness Rules

- **Rate-limit per host** — a delay between requests to the *same* server (`Crawl-delay` or a sensible default like 1 req/sec); don't burst.
- **Limit per-host concurrency** — few (often 1–2) simultaneous connections to a single origin, even if you crawl many sites in parallel.
- **Identify honestly** — set a descriptive **`User-Agent`** with a contact URL/email so owners can reach you (and you're not pretending to be a browser to evade rules).
- **Honor `429 Too Many Requests` / `503` + `Retry-After`** — back off exponentially; a `429` is an explicit "slow down."
- **Crawl off-peak** where possible, and **cache**/conditional-GET (`If-Modified-Since`/`ETag`) to avoid re-fetching unchanged pages.
- **Respect `noindex`/`nofollow`** meta directives and the site's terms of service.

## Why This Is Non-Negotiable

Impolite crawling gets you **IP-banned, legally warned, or blocklisted**, and harms real users of the target site. Sustainable crawling — the kind that keeps working over time — is *always* polite. Aggressive scraping that ignores these norms is also increasingly a **legal and ToS** risk.

## Design Guidance (for understanding/using)

- **Fetch, cache, and obey robots.txt** before crawling a host; skip `Disallow` paths.
- **Rate-limit and cap concurrency per host** (default conservative, honor `Crawl-delay`).
- **Send an honest, identifying `User-Agent`** with contact info; don't impersonate a browser to dodge rules.
- **Back off on `429`/`503`, honor `Retry-After`**, and use conditional requests to avoid needless refetches.
- **Prefer sitemaps** for discovery and **crawl off-peak** — lighter on the site.

## Pitfalls (in understanding/using)

- Ignoring **robots.txt** → banned, and often a ToS violation.
- Treating robots.txt as **security** → it's advisory; it doesn't protect or hide anything.
- **Bursting** requests to one host / high per-host concurrency → looks like a DoS, gets blocked.
- Faking a **browser User-Agent** to evade rules → dishonest and detectable; sets you up for a ban.
- Ignoring **`429`/`Retry-After`** → escalating blocks; always back off when told.
