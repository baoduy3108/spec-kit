---
name: performance-web-vitals
description: Auditing UI performance with Lighthouse and optimizing Core Web Vitals — LCP/CLS/INP targets, image/font/JS optimization strategies. Use when optimizing a website's loading performance.
category: engineering
keywords_vi: core web vitals, lighthouse audit, tối ưu tốc độ web, lcp cls inp, tối ưu performance web
---

# Performance and Web Vitals Guide

Auditing UI performance using Lighthouse and optimizing Core Web Vitals metrics.

## Key Metrics & Targets

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** ≤ 2.5s — measures when main content appears
- **CLS (Cumulative Layout Shift):** ≤ 0.1 — tracks unexpected content movement
- **INP (Interaction to Next Paint):** ≤ 200ms — measures responsiveness to user input

## Main Optimization Strategies

**Images** (biggest performance lever):
- Always include `width` and `height` to prevent layout shifts
- Serve modern formats (WebP/AVIF) instead of JPEG
- Use `loading="lazy"` below the fold only
- Size images appropriately for their display context

**Fonts:**
- Apply `font-display: swap` for headings or `optional` for body text
- Preconnect to font origins and preload critical font files
- Subset fonts to reduce file size by 60–80%

**JavaScript:**
- Use `defer` for non-critical scripts (executes after HTML parsing)
- Apply `async` for independent scripts like analytics
- Avoid blocking the main thread with synchronous scripts

**LCP Image Specifics:** never use `loading="lazy"` on the LCP image — preload it with `fetchpriority="high"` instead.

## Testing & Monitoring

Run Lighthouse audits targeting performance ≥90, accessibility = 100, best practices ≥95, and SEO ≥95. Implement Lighthouse CI in deployment pipelines to catch performance regressions automatically.
