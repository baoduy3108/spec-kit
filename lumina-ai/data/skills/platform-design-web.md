---
name: platform-design-web
description: 450+ actionable design rules for web platforms based on WCAG 2.2, MDN standards, and modern web APIs — accessibility, responsive design, forms, typography, performance, animation, dark mode, navigation, touch, i18n, PWA. Use when reviewing or building a web UI for accessibility/responsive/performance compliance.
category: design
keywords_vi: accessibility web, chuẩn accessibility, thiết kế web chuẩn, responsive design, quy tắc thiết kế web, dark mode web, form web chuẩn
---

# Web Platform Design Guidelines

Comprehensive framework covering accessible, performant, responsive web development based on WCAG 2.2, MDN standards, and modern web APIs.

## Core Sections

**1. Accessibility / WCAG [CRITICAL]**
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, etc.) for free accessibility and SEO
- Provide `aria-label` only when visible text is insufficient; prefer native elements over ARIA
- Ensure keyboard navigation; trap focus in modals; provide visible focus indicators (3:1 contrast minimum)
- Include skip-navigation links; write descriptive alt text for images
- Maintain 4.5:1 contrast for normal text, 3:1 for large text and UI components
- Associate form labels programmatically; identify errors via `aria-describedby`
- Announce dynamic changes with ARIA live regions (`aria-live="polite"` or `role="alert"`)

**2. Responsive Design [CRITICAL]**
- Mobile-first CSS with `min-width` media queries; use `clamp()` for fluid sizing
- Container queries size components by their container, not viewport
- Set breakpoints where content breaks, not device widths (~30rem, 48rem, 64rem, 80rem)
- Touch targets: minimum 44×44 CSS pixels; 24px spacing between targets
- Include viewport meta tag; never use `maximum-scale=1` or `user-scalable=no`
- Ensure content reflows at 320px without horizontal scrolling

**3. Forms [HIGH]**
- Label every input; use `autocomplete` attributes for autofill support
- Select correct input types (`email`, `tel`, `url`, `password`, etc.)
- Validate on blur; show success and error states inline
- Group related inputs with `<fieldset>` and `<legend>`
- Mark required fields visually and programmatically
- Never disable submit buttons; validate on submission instead

**4. Typography [HIGH]**
- Use system font stacks for performance; provide web font fallbacks with `font-display: swap`
- Size with `rem` units; respect user zoom settings (never `px` for font-size)
- Body line height ≥1.5; paragraph spacing ≥2× font size
- Limit line length to ~75 characters (40rem)
- Maintain heading hierarchy (h1–h6, no skips)

**5. Performance [HIGH]**
- Lazy-load below-fold images; always specify explicit `width` and `height`
- Use `preconnect` for critical third-party origins; `preload` critical resources
- Code-split JavaScript; virtualize lists exceeding hundreds of items
- Batch DOM reads before writes to avoid layout thrashing
- Apply `will-change` only temporarily to animating elements

**6. Animation and Motion [MEDIUM]**
- Respect `prefers-reduced-motion` by removing or shortening animations
- Animate only `transform` and `opacity` for GPU-accelerated 60fps performance
- Never flash content >3 times per second (seizure risk)

**7. Dark Mode and Theming [MEDIUM]**
- Detect system preference via `@media (prefers-color-scheme: dark)`
- Define all theme values as CSS custom properties
- Include `<meta name="color-scheme" content="light dark">`
- Verify contrast in both modes

**8. Navigation and State [MEDIUM]**
- URLs reflect every meaningful view; users can bookmark and share states
- Handle `popstate` for browser back/forward support
- Indicate current page with `aria-current="page"`

**9. Touch and Interaction [MEDIUM]**
- Control gesture behavior with `touch-action` (pan-y, pan-x, none)
- Pair `:hover` with `:focus-visible` for parity
- Never hide essential functionality behind hover alone

**10. Internationalization [MEDIUM]**
- Set `lang` on `<html>`; use `dir="auto"` for user-generated content
- Format dates, numbers, lists with `Intl` APIs — never hard-code
- Use CSS logical properties (`margin-inline-start`, `padding-block`, etc.) for RTL support

**11. Progressive Web Apps [MEDIUM]**
- Provide complete Web App Manifest with `name`, `icons`, `start_url`, `display`
- Register service worker with `fetch` handler for offline capability
- Serve over HTTPS to meet installability requirements

## Key Takeaways

- Accessibility is not optional: WCAG 2.2 compliance is the standard.
- Responsive and performant go together: mobile-first, lazy loading, explicit dimensions.
- Respect user preferences: `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`.
- Native elements first: use `<button>`, `<input>`, `<select>` instead of custom widgets.
