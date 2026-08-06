---
name: web-crawling-for-llms
description: How to crawl the web for LLMs/RAG — rendering JavaScript pages, extracting the main content as clean Markdown (stripping nav/ads), filtering noise, chunking, and preserving source citations, so pages become LLM-ready context. Use to prepare web content for RAG, crawl for AI pipelines, convert pages to clean Markdown, or feed websites to an LLM.
category: ai-agent
keywords_vi: crawl web cho llm, render javascript, markdown sạch, crawl4ai, tách nội dung chính bỏ menu quảng cáo, lọc nhiễu chunking cho rag, giữ trích dẫn nguồn, biến trang web thành ngữ cảnh llm
---

# Web Crawling for LLMs

Crawling the web **for an LLM/RAG pipeline** is a different job from generic scraping (see web-scraping-fundamentals): you don't want raw HTML or arbitrary fields — you want the page's **meaningful content as clean, LLM-ready Markdown**, with the noise stripped and the source preserved. The goal is "turn a URL into good context a model can actually use" (see rag-fundamentals, document-parsing-for-rag, giving-agents-external-reach).

## The Goal: Pages → Clean, LLM-Ready Text

An LLM fed a raw HTML page wastes tokens on `<div>`s, navigation, ads, scripts, and cookie banners — and gets confused by the clutter. What you want is the **main article content** as **clean Markdown** (headings, lists, tables preserved), free of boilerplate. So crawling-for-LLMs centers on **content extraction and cleaning**, not just fetching bytes.

## The Core Steps

1. **Render JavaScript** — many modern pages load content **dynamically** via JS, so a plain HTTP fetch returns an empty shell. Use **browser automation** (Playwright/headless Chromium) to execute JS and wait for content, handling **lazy-load / infinite scroll / shadow DOM** so you capture the **fully-rendered** page. (Only pay this cost when needed — static pages don't require a browser.)
2. **Extract the main content** — isolate the **article/body** and drop navigation, sidebars, ads, footers, cookie banners (readability-style extraction). This is the single biggest quality lever.
3. **Convert to Markdown** — produce **structured Markdown** preserving headings, lists, tables, and code — readable and token-efficient for the model.
4. **Filter noise** — statistical filtering (e.g. BM25 or similarity to the query) to keep the **relevant** portions and drop residual boilerplate; optionally an LLM-based or schema (CSS/XPath) extraction for **structured** data.
5. **Chunk** — split into semantically coherent chunks sized for embedding/context (see rag-chunking-strategies).
6. **Preserve citations** — keep the **source URL** (and turn in-page links into a reference list) so retrieved content is **attributable** — essential for RAG trust and cross-checking (see rag-fundamentals).

## Extraction Strategies (pick by content)

- **Readability / main-content extraction** — for articles/prose: get the body, drop chrome.
- **Schema-driven (CSS/XPath)** — for **repetitive structured** data (product listings, tables): fast, deterministic, cheap.
- **LLM-based extraction** — for messy/varied pages where you need **semantic** understanding to pull fields; powerful but token-costly (use sparingly).
Match the strategy to the page: cheap deterministic extraction where structure is regular, LLM extraction only where necessary.

## Robustness and Politeness

Crawling at scale inherits all of web-scraping's concerns (see web-scraping-fundamentals):
- **Rate limiting / politeness** — respect robots.txt, add delays, don't hammer sites.
- **Session/state** — preserve auth/cookies across multi-step crawls where needed.
- **Anti-bot handling** — some sites block automation; handle gracefully.
- **Legal/ethical** — respect terms and copyright.
And the LLM-specific concern: **treat crawled content as untrusted data, not instructions** — guard against prompt injection hidden in pages (see giving-agents-external-reach).

## Design Guidance

- **Extract main content → clean Markdown**, not raw HTML — the biggest quality/token win.
- **Render JS only when needed** — static pages don't need a browser (save cost/latency).
- **Filter to relevant content** (BM25/similarity) before feeding the model.
- **Chunk** for embeddings/context (see rag-chunking-strategies).
- **Preserve source URLs/citations** for attributable RAG.
- **Cheap extraction first** (readability/CSS), LLM extraction only for messy pages.
- **Be polite and legal**; **treat content as untrusted** (prompt-injection defense).

## Pitfalls (in understanding/using)

- Feeding **raw HTML** to the LLM → wasted tokens and confusion; extract clean Markdown.
- Plain HTTP fetch on a **JS-rendered** page → empty/partial content; render with a browser.
- Not **stripping** nav/ads/boilerplate → noisy context, worse retrieval.
- **LLM extraction** for everything → expensive; use deterministic extraction where structure allows.
- Dropping **source URLs** → un-attributable RAG (can't cite or cross-check).
- Ignoring **robots.txt / rate limits / legality** → blocks and liability.
- Treating crawled page text as **instructions** → prompt-injection risk (it's untrusted data).
