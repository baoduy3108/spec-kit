---
name: nextjs-patterns
description: Build Next.js apps well — the App Router, Server vs Client Components, rendering strategies (SSR/SSG/ISR), data fetching and caching, server actions, route handlers, and metadata/SEO. Use when building or reviewing a Next.js (React) application or choosing a rendering strategy.
category: engineering
keywords_vi: nextjs, next.js app router, server client component, ssr ssg isr rendering, data fetching caching next, server actions, seo metadata, react framework
---

# Next.js Patterns

Next.js is a React framework that adds server rendering, routing, and full-stack capabilities. Modern Next.js centers on the **App Router** and React Server Components.

## Server vs Client Components (the key mental model)

In the App Router, components are **Server Components by default** — they render on the server, can directly fetch data and access backend resources, ship **no JS to the client**, and keep secrets server-side. Add **`"use client"`** to make a component a Client Component — needed for interactivity (state, effects, event handlers, browser APIs).
- **Keep components Server by default**; push `"use client"` to the **leaves** that truly need interactivity (a button, a form), not the whole tree — this minimizes client JS (better performance).
- Server Components can't use hooks/state; Client Components can't directly access the DB/secrets.

## Rendering Strategies

Choose per route/data:
- **Static (SSG)** — pre-render at build time; fastest, cacheable on a CDN. For content that doesn't change per request (marketing, docs).
- **Server-rendered (SSR/dynamic)** — render on each request; for personalized/always-fresh pages.
- **ISR** — static + periodic revalidation (`revalidate`), getting static speed with eventual freshness.
Next.js infers/lets you configure this via fetch caching and route config. Static where possible; dynamic where necessary.

## Data Fetching & Caching

- **Fetch directly in Server Components** (`async` components, `await fetch(...)`) — no separate API layer needed for your own data.
- Next.js **caches `fetch`** by default and dedupes requests; control with `{ cache: 'no-store' }` (dynamic) or `{ next: { revalidate: N } }` (ISR). Understand the caching or you'll serve stale (or needlessly dynamic) data — a common source of confusion.

## Server Actions & Route Handlers

- **Server Actions** — run server code from a form/client without building an API endpoint (mutations, form submissions). Validate inputs (they're callable) and treat as untrusted.
- **Route Handlers** (`app/api/.../route.ts`) — build API endpoints (webhooks, external clients).

## SEO & Metadata

Server rendering makes content crawlable (see semantic-html-and-seo). Use the **Metadata API** (`generateMetadata`) for titles/OG tags per route. Optimize with `next/image` (see performance-web-vitals), `next/font`, and streaming/Suspense for perceived speed.

## Pitfalls

- **`"use client"` too high** in the tree → shipping unnecessary JS (push it to leaves).
- **Fetching secrets/DB in a Client Component** → exposed or impossible (do it in Server Components/actions).
- **Caching confusion** — unexpectedly stale or unexpectedly dynamic data; know the fetch cache defaults.
- **Using the wrong rendering strategy** (SSR for static content → slow; static for personalized → wrong).
- Treating Server Actions as trusted (validate inputs, check auth).
- Mixing Pages Router and App Router mental models.
