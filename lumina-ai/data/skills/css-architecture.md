---
name: css-architecture
description: How to structure CSS so it scales — the specificity/global-scope problems, and the methodologies that solve them: BEM naming, utility-first (Tailwind), CSS Modules and scoped styles, and CSS-in-JS. Use to understand organizing CSS at scale, BEM, Tailwind/utility-first, CSS Modules, or avoiding CSS that breaks when you change it.
category: engineering
keywords_vi: css architecture, tổ chức css quy mô lớn, bem naming, utility-first tailwind, css modules scoped, css-in-js, phạm vi toàn cục global scope, tránh css vỡ khi sửa
---

# CSS Architecture

CSS doesn't scale by default: every rule is **global**, the cascade and specificity make overrides tricky (see css-cascade-and-specificity), and there's no built-in scoping — so on a big codebase, changing one style can break something unrelated, and nobody dares delete "dead" CSS. Architecture methodologies exist to tame this.

## The Core Problems

- **Global scope** — all selectors live in one namespace; a `.button` here affects `.button` everywhere. Collisions and unintended overrides.
- **Specificity wars** — overriding a too-specific rule requires an even more specific one, escalating to `!important` chaos.
- **No dead-code confidence** — you can't tell what CSS is still used, so it accumulates ("append-only stylesheets").
The methodologies below each attack these.

## BEM (naming convention)

**Block-Element-Modifier** — a disciplined **naming** scheme: `.card` (block), `.card__title` (element), `.card--featured` (modifier). By giving every component a unique, flat class name, you **simulate scoping** and keep specificity **low and flat** (all single classes, no nesting wars). Pure convention, no tooling. Verbose, but predictable and framework-agnostic.

## Utility-First (Tailwind)

Instead of writing custom CSS per component, compose UIs from tiny **single-purpose utility classes** (`flex`, `pt-4`, `text-center`) directly in the markup. Benefits: no naming, no growing stylesheet (a fixed utility set), no dead CSS, consistent spacing/scale from design tokens, and you rarely leave the HTML. Trade-offs: verbose class lists, a learning curve, and a shift in where "styling" lives. Very popular for its scalability and consistency.

## CSS Modules & Scoped Styles

**Tooling-based scoping**: CSS Modules (and Vue/Svelte scoped styles) automatically **rename class names to be unique per component** at build time, so `.button` in one component **can't** collide with another's. You write normal CSS; the tool guarantees isolation. Solves the global-scope problem directly with local-by-default styles.

## CSS-in-JS

Write styles **in JavaScript**, co-located with components (styled-components, Emotion) or compiled to atomic CSS. Gives scoping, dynamic/prop-based styling, and dead-code elimination — at the cost of runtime overhead (for runtime libraries) and coupling styles to JS. Zero-runtime variants (compiled) address the perf concern.

## Choosing

- **BEM** — no tooling, framework-agnostic, disciplined teams.
- **Utility-first (Tailwind)** — fast, consistent, scalable; great for product teams.
- **CSS Modules / scoped** — normal CSS with guaranteed isolation (common in React/Vue/Svelte).
- **CSS-in-JS** — dynamic, component-coupled styling in JS-heavy apps.
Any consistent approach beats ad-hoc global CSS. The goal is the same: **local reasoning, low specificity, no collisions, confident deletion** (see design-system for the component-consistency layer).

## Pitfalls (in understanding/using)

- **Ad-hoc global CSS** with deep selectors and nesting → specificity wars, collisions, fear of deletion.
- **Mixing methodologies** inconsistently across a codebase → the worst of all worlds; pick one and be consistent.
- Deep **nesting** (especially with preprocessors) inflating specificity — keep selectors flat.
- Fighting a chosen approach (writing custom CSS everywhere in a utility-first project, or `!important` in scoped styles).
- Not connecting styles to **design tokens** → inconsistent spacing/color (see design-system).
- Assuming a methodology alone fixes design consistency — it fixes *organization*; consistency needs a design system.
