---
name: css-layout
description: Lay out and style pages reliably with modern CSS — flexbox vs grid (and when to use each), the box model, responsive design with relative units and container/media queries, centering, spacing systems, z-index/stacking, and avoiding fixed pixel traps. Use when building layouts, making a page responsive, or debugging why elements won't align/size correctly.
category: engineering
keywords_vi: css layout, flexbox grid, bố cục css, responsive css, căn giữa css, box model, media query, z-index, dàn trang css
---

# CSS Layout

Modern CSS makes most layouts a few lines with flexbox or grid. Reach for those before floats, absolute positioning, or hacks.

## Flexbox vs Grid

- **Flexbox** — one dimension (a row *or* a column). Distribute space along an axis, align items, handle variable content. Use for toolbars, nav bars, card rows, centering, "push this to the right" (`margin-left: auto`).
  - Container: `display:flex; justify-content` (main axis), `align-items` (cross axis), `gap`, `flex-wrap`.
  - Items: `flex: 1` to grow/share space.
- **Grid** — two dimensions (rows *and* columns at once). Use for page layouts, dashboards, image galleries.
  - `display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:…` gives a responsive card grid with no media queries.

Rule of thumb: content flow in one direction → flex; a true 2D structure → grid. They compose (grid areas containing flex rows).

## Box Model

Every element is content + padding + border + margin. Set **`box-sizing: border-box`** globally so `width` includes padding/border (far more predictable). Margins collapse vertically between blocks — a frequent "why is there extra space" surprise; `gap` avoids it.

## Responsive

- **Relative units** — `rem`/`em` for type and spacing, `%`/`fr`/`vw`/`vh` for layout, `max-width:100%` on media. Avoid fixed `px` widths that overflow small screens.
- **Mobile-first** — base styles for small screens, add `min-width` media queries upward.
- **`clamp(min, preferred, max)`** for fluid type/spacing without breakpoints.
- **`gap`** for spacing between flex/grid children instead of margins.
- Container queries when a component must adapt to *its container's* size, not the viewport.

## Centering (solved problem)

Flex: `display:flex; justify-content:center; align-items:center`. Grid: `display:grid; place-items:center`. Both axes, any content size.

## Stacking & Common Traps

- **z-index only works on positioned elements** (`position` not `static`) and is scoped by stacking contexts — a child can't escape a parent's context. If z-index "doesn't work," check positioning and the stacking context.
- Prefer a consistent **spacing scale** (4/8px steps) over arbitrary values.
- Overflowing layout on mobile → a fixed-width element or missing `max-width:100%`; wide content (tables, code) should scroll inside its own `overflow-x:auto` container, never the body.
