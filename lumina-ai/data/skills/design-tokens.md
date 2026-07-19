---
name: design-tokens
description: How design tokens work — naming and storing design decisions (colors, spacing, typography, radii) as named variables shared across design and code, semantic vs primitive tokens, theming/dark mode, and keeping design and implementation in sync. Use to understand design tokens, design-system variables, theming, or a single source of truth for styling decisions.
category: design
keywords_vi: design tokens, biến quyết định thiết kế, màu spacing typography radius, semantic vs primitive token, theming dark mode, đồng bộ thiết kế và code, single source of truth styling
---

# Design Tokens

Design tokens are **named variables that store design decisions** — a color, a spacing value, a font size, a border radius — used consistently across design tools and code. They're the shared vocabulary that keeps a product visually consistent and makes theming (like dark mode) trivial. They're the atomic layer beneath a design system (see design-system).

## The Problem They Solve

Without tokens, design values are **magic numbers** scattered everywhere: `#3B82F6` hardcoded in 50 places, `16px` here and `15px` there, subtly inconsistent. Changing the brand color or spacing scale means hunting through the codebase and hoping. And design (Figma) and code drift apart. Tokens fix this by making each decision a **single named source of truth**: `color.primary`, `space.4`, `font.size.body`. Change the token, and everywhere it's used updates.

## Primitive vs Semantic Tokens (the key layering)

Good token systems have **two layers**:
- **Primitive (global) tokens** — raw values: `blue.500 = #3B82F6`, `space.4 = 16px`. The palette/scale.
- **Semantic (alias) tokens** — map *meaning* to primitives: `color.text.primary → gray.900`, `color.background.surface → white`, `color.action → blue.500`. You use **semantic** tokens in components ("this is the action color"), not raw values.
This indirection is powerful: components reference *intent* (`color.action`), and you can **re-map** what that means (rebrand, or switch to dark mode) by pointing the semantic token at a different primitive — without touching any component. It's the difference between "use blue" and "use the action color, which happens to be blue."

## Theming & Dark Mode

Because components use **semantic** tokens, theming is just **swapping the token values**. Dark mode = the same semantic tokens (`color.text.primary`, `color.background.surface`) resolving to different primitives. No component changes — flip the theme and everything adapts (see color-mode-and-theme). This is why token-based systems make multi-theme/white-label products manageable.

## Keeping Design & Code in Sync

Tokens can be defined once (often in a JSON format like the W3C Design Tokens spec / Style Dictionary) and **transformed** into every platform's format — CSS variables, iOS/Android values, JS constants — and imported into Figma. So designers and engineers reference the **same tokens**, and a change propagates to design and all codebases. This single source of truth is what keeps large products consistent (see component-family-consistency).

## Good Practices

- **Name by role/intent, not appearance** — `color.action`, not `color.blue` (so re-theming makes sense). Primitives can be appearance-named; semantics should be role-named.
- **Consistent scales** — spacing/type on a defined scale (see modular-scale-typography) rather than arbitrary values.
- Keep the token set **manageable** — too many tokens is as bad as none (decision paralysis).

## Pitfalls (in understanding/using)

- **Hardcoding raw values** instead of tokens → inconsistency and painful changes.
- **Only primitive tokens** (using `blue.500` directly in components) → can't re-theme cleanly; add a semantic layer.
- **Naming semantic tokens by appearance** (`color.blue`) → nonsensical after a rebrand/dark mode; name by role.
- **Token sprawl** — hundreds of overlapping tokens nobody understands; keep it curated.
- Design and code defining tokens **separately** → they drift; use one source that transforms to both.
- Tokens without a **design system**/components to apply them consistently (tokens are the foundation, not the whole house).
