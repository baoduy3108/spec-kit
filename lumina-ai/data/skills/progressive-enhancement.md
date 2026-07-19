---
name: progressive-enhancement
description: How progressive enhancement works — building a working baseline with HTML first, layering CSS and JavaScript as enhancements so the core experience works everywhere, versus graceful degradation. Use to understand progressive enhancement, resilient web apps, why HTML-first matters, or building for unreliable networks/older browsers.
category: engineering
keywords_vi: progressive enhancement, nâng cấp tăng tiến, html trước rồi css js, baseline hoạt động mọi nơi, graceful degradation, web bền vững, mạng yếu trình duyệt cũ
---

# Progressive Enhancement

Progressive enhancement is a strategy for building web experiences that **work for everyone**, then get **better** for those with more capable browsers/devices/networks. You start from a solid, functional baseline and **layer on** enhancements — so nothing is all-or-nothing.

## The Layered Approach

Build in three layers, each optional on top of the last:
1. **Content/structure (HTML)** — semantic HTML that **works on its own**: readable content, working links, forms that submit. This is the baseline everyone gets — even with no CSS, no JS, a slow network, a screen reader, or an old browser (see semantic-html-and-seo).
2. **Presentation (CSS)** — style layered on top. If CSS fails, content still works (just unstyled).
3. **Behavior (JavaScript)** — interactivity as an enhancement. If JS fails or hasn't loaded, the core task still works via the HTML baseline (a form still POSTs; a link still navigates).
Each layer enhances but never *breaks* the one below.

## Progressive Enhancement vs Graceful Degradation

- **Progressive enhancement** — start with the **baseline** and build **up**. The floor is guaranteed to work; enhancements are additive.
- **Graceful degradation** — start with the **full-featured** version and add **fallbacks** for when things aren't supported. The full experience is the target; you patch the gaps.
PE is generally more robust because the working baseline is the *foundation*, not an afterthought — you can't forget a fallback you started from. Both aim at resilience; PE bakes it in from the start.

## Why It Matters

- **Resilience** — networks fail, JS doesn't load, scripts error, CDNs go down. A PE app still lets users do the core task when the enhancement layer breaks. (A JS-only app shows a blank page if one script fails.)
- **Accessibility** — semantic HTML baselines work with assistive tech and keyboards by default (see wcag-accessibility).
- **Reach** — works on old/limited browsers, low-power devices, and bad connections (much of the world).
- **Performance** — content is usable before all the JS loads (better perceived speed — see performance-web-vitals).
- **SEO** — crawlable content in the HTML (see semantic-html-and-seo).

## In a JS-Framework World

Modern SPAs often invert this (JS-first, blank without it). PE principles still apply via **server-side rendering / SSR** (send working HTML first, then hydrate — see nextjs-patterns) and **forms/links that work before hydration**. The spirit: don't make the **core** experience depend on everything going right. Enhance the happy path; don't require it.

## Pitfalls (in understanding/using)

- **JS-only** experiences that show nothing if a script fails/doesn't load — no baseline to fall back to.
- Building the flashy version first and **bolting on** fallbacks later (they get forgotten) — start from the baseline.
- Non-semantic markup (div soup) that has no working baseline for assistive tech/no-JS.
- Assuming every user has fast, reliable JS/network — a large fraction don't, sometimes.
- Forms/links that **only** work via JS handlers (break without JS) — make them work natively, enhance with JS.
- Over-applying to genuinely app-like experiences where a baseline is impractical — use judgment (a rich editor differs from a content site), but still handle load/error states.
