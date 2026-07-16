---
name: color-expert
description: Comprehensive color science knowledge base for design, generative art, and accessibility — OKLCH/OKLAB color spaces, palette generation, WCAG/APCA contrast, design tokens, pigment mixing. Use when discussing color systems, palettes, or color accessibility.
category: design
keywords_vi: oklch, color palette, bảng màu, contrast màu, wcag color, thiết kế màu sắc, color science
---

# Color Expert

Comprehensive knowledge base for color work across design, generative art, accessibility, and theory.

## Key Usage Modes

Matches five contexts: **concrete projects** (ask about medium, mood, audience, accessibility), **design systems** (OKLCH-based perceptually uniform scales with semantic token graphs), **generative/creative code** (tight constraints + probability weighting, spectral mixing, cosine palettes, harmony-aware generation), **general questions** (answered directly), and **tool building** (recommend existing libraries before hand-rolling).

## Color Space Guidance

OKLCH handles most perceptual manipulation (scales, gradients, palettes). HSL works for quick picking but lacks perceptual uniformity — yellows and blues at HSL(50%) have wildly different perceived brightness. Use OKHSL for gamut-aware picking, CIELAB D50 for print workflows, Kubelka-Munk (via Spectral.js) for pigment mixing, and APCA vs WCAG for contrast metrics.

## Implementation Pattern

Separate **reference tokens** (concrete colors: `ref.red = #f00`) from **semantic tokens** (roles: `semantic.warning = ref.red`) from **component usage** (consume semantic, not literals). This decouples decisions from frozen hex values and enables theme regeneration.

## Key Accessibility Numbers

Of ~281 trillion possible color pairs, roughly **1 in 4** pass WCAG 3:1, **1 in 8** pass AA (4.5:1), and **1 in 1,250** pass APCA 90 (fluent reading). APCA is far more restrictive than WCAG.

## Recommended Tools

Generators (actual algorithms): RampenSau, CuspHanger, Poline, pro-color-harmonies. Libraries: Culori (30 color spaces), Spectral.js (Kubelka-Munk mixing). Online: oklch.com, Huetone, Leonardo, Components.ai Color Scale.
