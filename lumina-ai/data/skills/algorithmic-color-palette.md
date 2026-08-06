---
name: algorithmic-color-palette
description: Building a cohesive UI color system from 1-2 brand colors using HSL adjustments — interactive state variants, brand-tinted greys, semantic colors. Use when generating a color palette/system from a brand color.
category: design
keywords_vi: color palette từ brand color, hsl color system, tạo bảng màu, brand tinted grey
---

# Algorithmic Colour Palette

How to build a cohesive UI colour system from 1–2 brand colours using HSL adjustments.

## Key Methods

**Interactive State Variants:** from each brand colour, create darker shades for hover/active states by reducing lightness by 8–14%, and lighter tints for backgrounds by increasing lightness by 40%.

**Brand-Tinted Greys:** instead of generic greys, desaturate the brand hue while varying lightness across a 9-step scale (grey-50 to grey-900). This produces neutrals that feel intentional rather than disconnected.

**Semantic Colours:** assign standard semantic hues (0° for error, 38° for warning, 142° for success) but match the saturation and lightness of your brand primary for visual cohesion.

## Notable Recommendations

- Avoid pure black (#000000) on white; use near-black text (#222) on off-white backgrounds (#EEE) to reduce eye strain while maintaining WCAG contrast compliance
- Ensure warning colours are 5–10% darker than success/error if those hues feel brighter perceptually (yellow/orange vs. red/blue)
- Create dedicated tokens for focus states, selection, overlays, disabled states, and shadows — all derived from the brand hue

## Anti-Patterns

Generic greys, randomly selected semantic colours, pure black-on-white contrast, borders that don't relate to adjacent content.
