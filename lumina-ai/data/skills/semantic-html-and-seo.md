---
name: semantic-html-and-seo
description: Building resilient, accessible, and SEO-optimized web interfaces — semantic HTML5, alt text, metadata, structured data (JSON-LD), progressive enhancement, SPA considerations. Use when writing HTML for SEO/accessibility.
category: design
keywords_vi: semantic html, seo web, structured data, thẻ meta, tối ưu seo html, html ngữ nghĩa, chuẩn seo
---

# Semantic HTML and SEO Guide

Building resilient, accessible, and search-optimized web interfaces through semantic markup and SEO best practices.

## Core Principles

**Semantic HTML5** requires using elements that match content meaning — `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` — rather than generic divs. Structure with one `<h1>` per page and logical heading hierarchy.

**Alt text** should describe content for informative images, function for interactive elements, and be empty (`alt=""`) for purely decorative images.

**Essential metadata** includes a 50–60 character title (keyword-first), a 120–160 character description, canonical URLs for duplicate content, and Open Graph tags for social sharing (1200×630px images).

**Structured data** using JSON-LD enables rich search results for products, articles, FAQs, and organizations.

## Progressive Enhancement

Build in layers: HTML (content readable without JS), CSS (visual design), JavaScript (interactivity). Forms must work natively; navigation should use real links.

## SPA Considerations

Single-page applications must explicitly: update `document.title` and meta tags on route changes, move keyboard focus to new content for screen readers, restore scroll position appropriately, use History API for bookmarking and back-button support.

## Device Adaptation

Use media queries for input method (`@media (hover: hover)`), pointer precision, and user preferences (`prefers-reduced-motion`, `prefers-color-scheme`). Implement lazy loading, responsive images, and 44px minimum touch targets.
