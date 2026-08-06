---
name: sticky-and-fixed-elements
description: Positioning strategies for persistent UI — position:fixed vs position:sticky, header design, mobile bottom toolbars, z-index token management. Use when implementing sticky headers, toolbars, or fixed elements.
category: design
keywords_vi: sticky header, position fixed, z-index, thanh điều hướng cố định, header dính, cố định khi cuộn, dính cố định
---

# Sticky and Fixed Elements

Two positioning strategies for persistent UI.

**position: fixed** removes elements from document flow, keeping them at a fixed viewport position. Best for global navigation headers, bottom toolbars, and floating action buttons.

**position: sticky** maintains document flow until a scroll threshold, then locks temporarily. Ideal for table headers, section headings, and in-page toolbars within scroll containers.

## Key Recommendations

Prefer `sticky` over `fixed` when the element belongs to a specific section or scroll context.

**Header design** should be 48–64px tall with background and shadow to prevent content bleed-through, paired with matching body padding.

**Mobile bottom toolbars** should contain 3–5 items maximum and respect safe-area insets: `padding-bottom: env(safe-area-inset-bottom)`.

**Sticky table headers** use `position: sticky; top: 0;` to maintain column context during scrolling.

## Z-Index Management

Use named tokens (base: 0, dropdown: 100, sticky: 200, header: 300, modal: 400, toast: 500) to avoid stacking conflicts rather than arbitrary values.

**Restraint principle:** a page should rarely need more than 1 fixed header + 1 fixed bottom element + 1 floating action button. Excessive layers create visual noise and reduce usable content space.
