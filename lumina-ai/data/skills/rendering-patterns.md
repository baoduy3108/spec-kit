---
name: rendering-patterns
description: The web rendering strategies and their trade-offs — CSR, SSR, SSG, ISR, streaming SSR, and islands/partial hydration — how each affects performance, SEO, and freshness, and how to choose per page. Use to understand CSR vs SSR vs SSG, hydration, streaming, islands architecture, or choosing a rendering strategy.
category: engineering
keywords_vi: rendering patterns, chiến lược render web, csr ssr ssg isr, streaming hydration, islands partial hydration, seo hiệu năng độ tươi, chọn cách render theo trang
---

# Rendering Patterns

*Where* and *when* your HTML is generated — on the server, at build time, or in the browser — profoundly affects performance, SEO, and freshness. Modern frameworks (see nextjs-patterns) let you choose per page. Understanding the spectrum lets you pick the right one instead of defaulting to one strategy for everything.

## The Strategies

- **CSR (Client-Side Rendering)** — the server sends a near-empty HTML shell + JS; the **browser** fetches data and builds the UI. Great for highly interactive, private app screens (dashboards). **But**: slow first paint (blank until JS loads/runs), poor SEO (crawlers see empty HTML), heavy on the client. The classic SPA model.
- **SSR (Server-Side Rendering)** — the **server** renders full HTML per request, then the browser **hydrates** it (attaches JS interactivity). Fast first paint, crawlable, and **fresh/personalized** per request. Cost: server compute per request, and a hydration step. For dynamic, personalized, SEO-important pages.
- **SSG (Static Site Generation)** — HTML is rendered **at build time** and served as static files (from a CDN — see how-cdns-work). **Fastest and cheapest**, highly cacheable, crawlable. But content is fixed until the next build. For content that rarely changes (marketing, docs, blogs).
- **ISR (Incremental Static Regeneration)** — SSG + periodic background **revalidation**: static speed, but pages refresh every N seconds/on demand without a full rebuild. Static performance with eventual freshness. For large mostly-static sites with occasionally-changing content.

## Hydration & Its Cost

SSR/SSG send HTML the user sees quickly — but to make it interactive, the browser must **hydrate**: download the JS, rebuild the component tree, and attach event handlers. Until hydration finishes, the page looks ready but isn't fully interactive (a UX gap). Hydration is expensive for large pages — the motivation for the newer patterns below.

## Streaming & Islands (modern refinements)

- **Streaming SSR** — the server sends HTML in **chunks** as it's ready (with Suspense boundaries), so the user sees content progressively instead of waiting for the whole page. Better perceived performance for slow data.
- **Islands architecture / partial hydration** — most of the page is **static HTML**, and only the interactive "islands" (a search box, a cart widget) ship JS and hydrate. Drastically less client JS than hydrating the whole page. (Astro, and the direction React Server Components push.)
- **Server Components** — components that render **only on the server** and ship **no JS**, mixed with client components for interactivity (see nextjs-patterns) — minimizing client bundle.

## Choosing Per Page

There's no one best strategy — pick per route by its needs:
- **Static content** (marketing/docs/blog) → **SSG/ISR** (fast, cheap, cacheable).
- **Dynamic/personalized + SEO** (product pages, feeds) → **SSR** (fresh + crawlable).
- **Private, highly interactive app** (dashboard behind login) → **CSR** (SEO irrelevant, interactivity-heavy) — or SSR for the first paint.
- Reduce client JS everywhere → **islands/server components**.
Match freshness, SEO, and interactivity needs to the strategy.

## Pitfalls (in understanding/using)

- **CSR for SEO-critical/content pages** → crawlers see blank HTML, slow first paint. Use SSR/SSG.
- **SSG for personalized or frequently-changing** content → stale/wrong data. Use SSR/ISR.
- Ignoring **hydration cost** — a fully-hydrated large SSR page ships a huge JS bundle; consider islands/server components.
- Using **one strategy for the whole app** instead of per-page — miss easy wins.
- **SSR without caching** → every request re-renders (server load); cache where possible.
- Assuming SSR/SSG means "no JS needed" — hydration still ships JS unless you use islands/RSC.
- Over-engineering a simple static site with SSR infrastructure it doesn't need.
