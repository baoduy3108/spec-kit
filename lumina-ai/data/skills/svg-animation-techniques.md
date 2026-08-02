---
name: svg-animation-techniques
description: SVG animation techniques — animating SVG with CSS and JS, path drawing (stroke-dasharray), morphing, SMIL vs CSS vs JS, transforms and motion along a path, and performance. Use for SVG animation, animated icons/illustrations, line-drawing effects, path morphing, or scalable vector motion on the web.
category: frontend
keywords_vi: kỹ thuật hoạt ảnh svg, hoạt ảnh svg bằng css và js, vẽ nét theo stroke dasharray, biến hình morphing đường path, so sánh smil css js, biến đổi và chuyển động theo đường path, hiệu năng svg
---

# SVG Animation Techniques

SVG (Scalable Vector Graphics) is XML-based vector art that's **infinitely scalable and fully animatable** — every shape, path, and property can be animated by CSS, JavaScript, or SMIL. It's ideal for crisp animated icons, illustrations, logos, and data visualizations that stay sharp at any size.

## Why Animate SVG

- **Scalable and sharp** — vectors look perfect at any resolution (unlike raster/GIF).
- **DOM-accessible** — SVG elements are real DOM nodes; you can target and animate their attributes/styles with CSS and JS, add interactivity, and keep them small and accessible.
- **Great for** — icon transitions, line-drawing logos, morphing shapes, animated charts, and decorative motion.

## Three Ways to Animate

- **CSS** — animate SVG properties (transform, opacity, fill, stroke) with `@keyframes`/transitions. Simple, performant, declarative. Best for straightforward animations.
- **JavaScript** — full control via libraries (**GSAP** is the gold standard for SVG — see gsap-animation; also anime.js, Snap.svg). Needed for complex sequencing, morphing, physics, and interactivity.
- **SMIL** (`<animate>`, `<animateTransform>`) — SVG's native animation elements. Declarative and self-contained, but less favored now (patchy support, superseded by CSS/JS).

## Path Drawing (Line Animation)

The signature SVG effect — a line/logo "drawing itself":
- Use **stroke-dasharray** and **stroke-dashoffset** — set the dash to the path's total length (getTotalLength()), then animate the dashoffset from full length to 0, revealing the stroke progressively.
- Creates the popular self-drawing signature/logo/illustration effect. GSAP's DrawSVG plugin simplifies it.

## Morphing

- **Shape morphing** — smoothly transform one path into another by interpolating path data (`d` attribute). Requires paths with compatible point counts.
- **Tools** — GSAP MorphSVG, Flubber (handles differing point counts). Used for icon transitions (menu ↔ close) and organic shape changes.

## Transforms & Motion Along a Path

- **Transforms** — translate, rotate, scale, skew SVG elements (prefer CSS transform or GSAP for smoothness; watch the transform-origin, which differs in SVG).
- **Motion along a path** — animate an element following an arbitrary path (CSS `offset-path`/`offset-distance`, or GSAP MotionPath) — e.g. a dot tracing a route, orbiting elements.

## Interactivity & Data

- **Interactive SVG** — hover/click/scroll-triggered animations (see gsap-scrolltrigger), state changes, animated data visualizations (animate bars/lines as data updates — see data-visualization-principles).

## Performance & Accessibility

- **Performance** — animate **transform and opacity** (GPU-friendly) over layout properties; simplify paths (fewer points); avoid animating huge/complex SVGs excessively. SMIL and heavy filters can be costly.
- **Accessibility** — respect `prefers-reduced-motion`; provide titles/ARIA for meaningful SVGs; ensure animations don't harm usability.

Master SVG animation via the **three approaches** (CSS for simple, JS/GSAP for complex, SMIL as legacy native), the classic **path-drawing effect** (stroke-dasharray/dashoffset for self-drawing lines), **morphing** (interpolating path data for shape transitions), **transforms and motion-along-a-path**, **interactivity** (triggered, data-driven animation), and **performance/accessibility** (animate transform/opacity, simplify paths, respect reduced-motion). SVG delivers crisp, lightweight, fully-controllable vector motion — from self-drawing logos to morphing icons — at any scale.
