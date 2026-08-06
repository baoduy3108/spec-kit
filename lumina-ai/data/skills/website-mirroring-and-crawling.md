---
name: website-mirroring-and-crawling
description: How tools like wget/HTTrack save an entire website for offline use — recursive crawling plus link rewriting. Covers discovering pages by following links, downloading assets (CSS/JS/images), rewriting URLs to relative paths so the copy works offline, scoping the crawl (same-domain/depth), and handling JS-rendered sites. Use to build or understand a website downloader/archiver. Crawl only what you're permitted to; respect robots and terms.
category: networking
keywords_vi: sao lưu toàn bộ website để dùng offline mirror kiểu wget httrack, thu thập đệ quy theo liên kết crawling khám phá trang, tải tài nguyên css js ảnh, viết lại url thành đường dẫn tương đối để bản sao chạy offline, giới hạn phạm vi cùng tên miền và độ sâu, xử lý trang render bằng javascript, chỉ crawl khi được phép tôn trọng robots điều khoản
---

# Website Mirroring & Crawling

**Mirroring** a website — saving a whole site (or section) so it works **offline** — combines two jobs: **crawling** (discover and download all the pages/assets) and **link rewriting** (fix the URLs so the local copy is self-contained and browsable). This is what `wget -r`, HTTrack, and web archivers do (see web-scraping-fundamentals, crawler-politeness-and-robots-txt, url-normalization-and-crawl-dedup). *Only mirror content you're allowed to; honor `robots.txt`, copyright, and each site's terms.*

## Crawling: Discover by Following Links

Start from one or more **seed URLs** and traverse the site like a graph:
1. Fetch a page, parse its HTML.
2. **Extract references** — links (`<a href>`), and **assets** the page needs to render: stylesheets (`<link>`), scripts (`<script src>`), images (`<img>`, `srcset`), fonts, and URLs **inside CSS** (`url(...)`, `@import`).
3. **Enqueue** the new URLs (that are in scope and not already seen — see URL normalization/dedup) and repeat.
This is a breadth-/depth-first traversal of a **frontier** queue of URLs to visit, with a **visited set** to avoid loops.

## Link Rewriting: Make the Copy Work Offline

Downloading the bytes isn't enough — the saved pages still point at **absolute internet URLs**. To browse offline, **rewrite** every reference to a **local relative path**:
- `https://site.com/css/main.css` → `./css/main.css` on disk.
- Map each downloaded URL to a local file path (mirroring the URL structure), and rewrite all `href`/`src`/CSS `url()` to those relative paths.
- Handle index pages (`/about/` → `/about/index.html`) and query strings (encode into filenames).
Without rewriting, the offline copy either fails to load assets or "escapes" back to the live site.

## Scoping the Crawl (or it never ends)

An unbounded crawl can wander the entire web. **Constrain** it:
- **Domain scope** — usually same-domain (or an allowlist of hosts); don't follow off-site links (or download them but don't recurse).
- **Path/prefix scope** — mirror only `/docs/` if that's all you want.
- **Depth limit** — max link-hops from the seed.
- **Page/size budget** — stop after N pages or M bytes.
- **Skip patterns** — avoid infinite spaces (calendars, faceted-search URL explosions, session-id URLs).

## The JavaScript Problem

Many modern sites render content **client-side** (SPAs): the initial HTML is nearly empty and content appears after JS runs. A simple HTTP crawler sees the empty shell and misses everything. Options: use the site's **API/JSON endpoints** directly, render pages with a **headless browser** (Playwright/Puppeteer) to get the final DOM (slower, heavier), or use a prerender service. Know which kind of site you're mirroring before choosing a tool.

## Design Guidance (for understanding/using)

- **Model it as graph traversal** — frontier queue + visited set; extract links **and** assets.
- **Rewrite all references to relative local paths** — mirroring the URL→file structure — so the copy is self-contained.
- **Scope tightly** — domain, path prefix, depth, and a page/byte budget; avoid crawler traps.
- **Use a headless browser only for JS-rendered sites**; prefer static fetches / APIs where possible (far cheaper).
- **Be permitted and polite** — respect `robots.txt`, rate-limit, identify your crawler, honor terms/copyright.

## Pitfalls (in understanding/using)

- Downloading pages but **not rewriting URLs** → offline copy still hits the live site / breaks.
- **No scope/depth limit** → the crawl wanders the whole web or into infinite URL spaces (calendars, facets).
- Missing **CSS/JS/asset** references (especially `url()` inside CSS) → broken offline rendering.
- Crawling a **JS-rendered** site with a plain HTTP fetcher → you save empty shells.
- Ignoring **robots.txt / rate limits / terms** → getting blocked, or crawling content you shouldn't.
