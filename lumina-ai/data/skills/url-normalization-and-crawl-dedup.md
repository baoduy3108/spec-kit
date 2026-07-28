---
name: url-normalization-and-crawl-dedup
description: Why a crawler must recognize that different-looking URLs are the same page — URL normalization (canonicalization) and duplicate detection — or it re-downloads endlessly and falls into traps. Covers normalizing scheme/case/default-ports/trailing-slash/sorted-query/fragment removal, canonical-link and content-hash dedup, and avoiding crawler traps. Use to build an efficient crawler that visits each page once.
category: networking
keywords_vi: chuẩn hoá url canonicalization để nhận ra các url khác nhau trỏ cùng một trang, khử trùng lặp duplicate detection tránh tải lại vô tận và bẫy crawler, chuẩn hoá scheme chữ hoa thường cổng mặc định dấu gạch chéo cuối sắp xếp query bỏ fragment, thẻ canonical và băm nội dung, tránh crawler trap không gian url vô hạn
---

# URL Normalization & Crawl Dedup

A crawler's **visited set** is only useful if it can tell when two URLs are **the same page**. But the same content is reachable through many URL spellings: `HTTP://Example.com:80/a/?b=1&a=2` and `http://example.com/a?a=2&b=1#top` point at the same resource. Without **normalization** and **duplicate detection**, a crawler re-downloads the same pages forever, wastes bandwidth, and gets stuck in **crawler traps** — infinite URL spaces that never terminate (see website-mirroring-and-crawling, crawler-politeness-and-robots-txt, how-hashing-works).

## URL Normalization (Canonicalization)

Transform every discovered URL into a **canonical form** before checking/adding it to the visited set. Safe, standard normalizations:
- **Lowercase** the scheme and host (`HTTP`→`http`, `Example.com`→`example.com`) — but **not** the path (paths can be case-sensitive).
- **Remove default ports** (`:80` for http, `:443` for https).
- **Remove the fragment** (`#section`) — it's client-side only; same document.
- **Resolve `.`/`..`** and collapse duplicate slashes in the path.
- **Sort query parameters** (or normalize their order) so `?a=1&b=2` == `?b=2&a=1`; drop known **tracking params** (`utm_*`, `fbclid`, session ids) that don't change content.
- **Normalize trailing slash** consistently (decide `/a` vs `/a/` — often guided by redirects).
- **Percent-encoding** — decode unreserved chars, uppercase hex, consistent encoding.
Be careful: some normalizations are **risky** (a trailing slash or a query param *can* change content on some sites); follow the site's **redirects** and `rel="canonical"` as ground truth where possible.

## Duplicate Detection Beyond URLs

Even canonical URLs can serve **identical content** (mirror paths, print vs normal views, id vs slug). Two extra layers:
- **`<link rel="canonical">`** — many pages declare their canonical URL; treat duplicates that point to the same canonical as one page.
- **Content fingerprinting** — hash the (normalized) page content; if a new URL's content hash matches one already stored, it's a duplicate. **Near-duplicate** detection (MinHash/SimHash — see minhash-and-locality-sensitive-hashing) catches pages that differ only in boilerplate/timestamps.

## Crawler Traps (why this matters)

Some URL spaces are **infinite** and dedup is what saves you:
- **Calendars** — "next month" links forever into the future.
- **Faceted search / filters** — every combination of filters is a unique URL, exploding combinatorially.
- **Session ids / tracking params** in URLs — the same page gets infinite distinct URLs.
- **Circular relative links** / self-referential paths.
Normalization (dropping session/tracking params) plus content-hash dedup and depth/budget limits keep the crawl **finite**.

## Design Guidance (for understanding/using)

- **Canonicalize every URL** before the visited-set check — case/host/port/fragment/sorted-query/trailing-slash.
- **Strip tracking/session params** that don't affect content (utm_*, fbclid, session ids) — a top trap-avoider.
- **Honor redirects and `rel="canonical"`** as the authority on a page's true URL.
- **Add content-hash (and near-dup) dedup** for pages with identical/near-identical bodies under different URLs.
- **Combine with depth/budget limits and trap patterns** — normalization alone won't stop calendars/facets.

## Pitfalls (in understanding/using)

- No normalization → the same page under many URL spellings re-crawled endlessly; bloated visited set.
- **Over-normalizing** (dropping a query param that *does* change content) → you miss distinct pages; verify via redirects/canonical.
- Ignoring **session/tracking params** → infinite distinct URLs for one page (a classic trap).
- Relying on URL dedup alone → misses **content** duplicates; add canonical + content hashing.
- No **trap defenses** (calendars/facets) → crawl never terminates despite dedup; add budgets/pattern skips.
