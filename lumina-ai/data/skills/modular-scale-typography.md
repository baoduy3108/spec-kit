---
name: modular-scale-typography
description: Typography cohesion via mathematical ratio-based size sequences (modular scale), accessibility rules, type rendering, and responsive strategy. Use when designing a typography system/scale for a UI.
category: design
keywords_vi: modular scale, hệ thống typography, thang chữ, font size scale, typography system
---

# Modular Scale Typography

## Core Concept

Typography achieves cohesion when font sizes follow a mathematical ratio-based sequence. Without structure, sizes feel arbitrary and visually chaotic.

**Formula:** `size(n) = base × ratio^n`

## Recommended Ratio

**1.25 (Major Third)** balances clear hierarchy with restraint. Ratios range from 1.067 (tight, data-dense) to 1.500 (dramatic, use sparingly).

## Implementation

- **Base:** 16px minimum for body text
- **Generate scale:** apply ratio multipliers to create a stepped ladder of sizes
- **Use tokens:** define sizes as CSS custom properties (`--text-base`, `--text-h1`, etc.), not raw pixels

## Critical Accessibility Rules

- Never use text below **14px** for reading content
- Body text: **16px floor** (browser default for readability)
- Sub-16px roles (captions, labels, timestamps): rare exceptions only (~1% of page)
- Line-height for body: **1.4–1.7** depending on measure width

## Type Rendering

- **Letter-spacing:** zero on body text; cap at 0.04em for uppercase labels only
- **Dark mode:** increase weight (e.g. semibold instead of regular) to compensate for halation
- **Monospace:** scope to code/IDs/tables, never as default UI font

## Editorial Structure

- Pair heading size with color, case, and spacing for visual distinction
- Limit hierarchy to H1–H3 per view (H4+ signals over-complexity)
- Use pre-titles and lead text to guide scanning

## Responsive Strategy

Compress the scale's ceiling on mobile (tighten ratio) while keeping body/base fixed. Use CSS `clamp()` to interpolate top-end sizes; always include a `rem` term for zoom accessibility.
