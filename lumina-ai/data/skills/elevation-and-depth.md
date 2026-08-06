---
name: elevation-and-depth
description: Using shadows and layering to create visual hierarchy — elevation scale, shadow + border rule, border-radius consistency, dark mode shadow adjustment. Use when designing shadows/elevation for UI components.
category: design
keywords_vi: elevation ui, shadow design, độ nổi giao diện, box-shadow, thiết kế bóng đổ, đổ bóng, dùng shadow
---

# Elevation and Depth

How to use shadows and layering to create visual hierarchy and tactile UI elements.

## Key Concepts

**Elevation Scale**: six levels (0–5) map shadows to specific UI roles, from flat surfaces to full-screen overlays. Shadows should be subtle and diffuse; heavy black shadows feel dated.

**Shadow + Border Rule**: white cards on light backgrounds need both shadow *and* a 1px darker border to prevent the edge from "washing out" and maintain clarity.

**Border-Radius Consistency**: all buttons — primary, secondary, destructive, ghost — use the same radius token to maintain visual cohesion and avoid implying false semantic differences.

**Text Shadow**: use sparingly (opacity below 0.30, blur 2–4px max) only to refine contrast on complex backgrounds — never as a substitute for proper color contrast.

**Dark Mode Adjustment**: shadows are less visible on dark surfaces, so compensate with higher opacity, subtle borders, or increased elevation levels.

## Anti-Patterns

Varying border-radius across button types, heavy/aggressive shadows, applying shadow to every element (dilutes meaning), flat cards with no visual boundary on white backgrounds.
