---
name: web-scraping-fundamentals
description: How to scrape web data responsibly — parsing HTML, handling dynamic/JS-rendered pages, pagination, rate limiting and politeness (robots.txt, delays), avoiding blocks, and the legal/ethical boundaries. Use to understand web scraping, extracting data from websites, handling JavaScript-rendered content, or scraping ethically and legally.
category: engineering
keywords_vi: web scraping, cào dữ liệu web, parse html, trang động javascript render, phân trang, rate limit lịch sự robots.txt, tránh bị chặn, pháp lý đạo đức scraping
---

# Web Scraping Fundamentals

Web scraping extracts data from websites that don't offer a convenient API or feed. It's powerful for monitoring and data collection — but brittle, easy to do impolitely, and legally/ethically fraught. Do it as a **last resort** (prefer APIs/feeds — see news-aggregation-and-rss) and responsibly.

## The Basic Mechanics

1. **Fetch** the page (an HTTP GET — see how-http-works).
2. **Parse** the HTML into a structure and **extract** the data you want using selectors — CSS selectors or XPath targeting elements (`.article-title`, `//div[@class='price']`). Libraries: BeautifulSoup, lxml, Cheerio, Scrapy.
3. **Structure & store** the extracted data (normalize it — see news-aggregation-and-rss).
4. **Follow pagination/links** to get more pages, tracking what you've visited.

## Static vs Dynamic (JS-Rendered) Pages

- **Static HTML** — the data is in the initial HTML response; simple to parse.
- **Dynamic / JS-rendered** — the page loads a skeleton, then **JavaScript fetches and renders** the content (see rendering-patterns/CSR). Your simple HTTP fetch sees an empty shell. Options: (a) find the **underlying API/XHR** the page's JS calls (inspect network requests) and hit that directly — cleaner and lighter; (b) use a **headless browser** (Playwright, Puppeteer, Selenium) that runs the JS and gives you the rendered DOM — heavier but works for anything. Prefer finding the API when you can.

## Politeness (don't be a jerk / don't get blocked)

Aggressive scraping harms sites and gets you blocked:
- **Respect `robots.txt`** — the site's stated crawling rules.
- **Rate limit** — add delays between requests; don't hammer the server (see rate-limiting-algorithms). Scrape at a human-ish pace.
- **Identify honestly** — a real User-Agent; don't impersonate to deceive.
- **Cache and be incremental** — only fetch what changed (conditional requests — see how-http-caching-works); don't re-scrape everything constantly.
- **Handle errors gracefully** — back off on 429/5xx (see retries-and-resilience).
Politeness is both ethical and practical (it keeps you unblocked).

## Robustness

Scrapers **break** when sites change their HTML — they're inherently fragile. Write resilient selectors (prefer stable attributes over brittle nth-child chains), fail loudly when structure changes (so you notice), and monitor for breakage. Expect maintenance.

## Legal & Ethical Boundaries

This is critical and nuanced:
- **Terms of Service** — many sites prohibit scraping; violating ToS can have legal/contractual consequences.
- **Copyright** — scraped content is often copyrighted; collecting ≠ right to republish.
- **Privacy laws** (GDPR etc.) — scraping personal data has legal obligations regardless of public availability.
- **Computer-misuse laws** — circumventing access controls (logins, paywalls, anti-bot) can be illegal.
- **No deception/harm** — don't evade blocks through deception, and don't overload sites (a DoS).
"It's on the public web" is **not** a blanket permission. When in doubt, prefer official APIs, seek permission, and scrape conservatively (see osint-fundamentals ethics).

## Pitfalls (in understanding/using)

- **Scraping when an API/feed exists** — brittle and impolite; check first.
- **Ignoring robots.txt / rate limits** → harming the site and getting IP-banned.
- Expecting a plain fetch to work on **JS-rendered** pages (empty shell) — find the API or use a headless browser.
- **Brittle selectors** breaking silently on site changes — write resilient extractors and monitor.
- Assuming public = legal to scrape/store/republish — mind ToS, copyright, privacy, and access-control laws.
- Circumventing anti-bot/paywalls/logins — legally risky; don't.
- Not handling anti-scraping (CAPTCHAs, blocks) ethically — evasion via deception crosses lines.
