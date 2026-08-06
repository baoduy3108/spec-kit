---
name: css-cascade-and-specificity
description: How CSS decides which rule wins — the cascade (origin, specificity, source order), how specificity is calculated (inline/id/class/element), !important, inheritance, and modern tools (layers, :where). Use to understand why a CSS rule isn't applying, specificity conflicts, the cascade, or !important overuse.
category: engineering
keywords_vi: css cascade specificity, độ ưu tiên css, quy tắc nào thắng, tính specificity id class element, important, kế thừa inheritance, tại sao css không áp dụng, cascade layers
---

# CSS Cascade & Specificity

When multiple CSS rules target the same element, the browser must decide **which wins**. That decision is the **cascade** — and the most common CSS frustration ("why isn't my style applying?") is almost always a cascade/specificity issue. Understanding it turns guesswork into control.

## The Cascade: How the Winner Is Chosen

For each property on each element, the browser picks the winning declaration by these factors, **in order**:
1. **Origin & importance** — author styles beat browser defaults; `!important` overrides normal declarations.
2. **Specificity** — a more *specific* selector wins (below).
3. **Source order** — if specificity ties, the **last** declared rule wins.
So "later in the file" only matters when specificity is equal. Most surprises come from a more-specific rule elsewhere silently winning.

## Specificity (how it's calculated)

Specificity is scored by counting selector components, roughly as a tuple (A, B, C):
- **A — inline styles** (`style="..."`) — highest.
- **B — IDs** (`#header`).
- **C — classes, attributes, pseudo-classes** (`.btn`, `[type]`, `:hover`).
- **D — elements and pseudo-elements** (`div`, `::before`).
Compare left to right: any ID beats any number of classes; any class beats any number of elements. `#nav .item a` (1 id, 1 class, 1 element) beats `.menu .item a.link` (3 classes, 1 element) because the ID dominates. This is why an ID selector is so hard to override.

## Inheritance

Some properties (color, font, text properties) **inherit** from parent to child by default; others (margin, border, background) don't. `inherit`, `initial`, `unset`, and `revert` let you control this explicitly. Inherited values are weak — any direct rule on the element overrides them.

## !important (the escape hatch to avoid)

`!important` overrides normal specificity entirely. It's tempting but leads to **specificity wars** — the only way to override an `!important` is another `!important` with higher specificity, escalating until your CSS is unmaintainable. Reserve it for genuine overrides (utility classes, third-party overrides); don't use it to "just make it work."

## Modern Tools

- **Cascade layers (`@layer`)** — explicitly order groups of styles regardless of specificity, taming large codebases and third-party CSS.
- **`:where()`** — has **zero** specificity, letting you write low-specificity selectors that are easy to override on purpose.
- **`:is()`** — takes the specificity of its most specific argument.
These give control over specificity intentionally rather than fighting it.

## Pitfalls (in understanding/using)

- **Overusing IDs** in selectors → nearly impossible to override; prefer classes for stylable hooks.
- Reaching for **`!important`** to win → specificity wars and unmaintainable CSS.
- Assuming **source order** decides — specificity comes first; a more specific rule elsewhere wins regardless of order.
- Ever-increasing specificity to override previous overrides (an arms race) — flatten specificity (BEM, `:where`, layers — see css-architecture).
- Forgetting **inheritance** (or expecting non-inherited properties to inherit).
- Not using **`@layer`/`:where`** in large codebases to control the cascade deliberately.
