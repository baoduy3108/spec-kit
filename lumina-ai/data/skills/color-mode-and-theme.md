---
name: color-mode-and-theme
description: Choosing and implementing light/dark/combined color modes — theme selector guidelines, dark mode implementation rules. Use when designing a theme system or dark mode.
category: design
keywords_vi: dark mode, light mode, theme selector, chuyển đổi giao diện sáng tối, thiết kế theme
---

# Color Mode and Theme

## Core Decision Framework

Color mode reflects brand identity and user context, not personal preference.

**Light mode** conveys openness and professionalism — ideal for marketing, e-commerce, and content-focused platforms. It performs better in bright environments.

**Dark mode** projects premium, technical qualities and suits trading platforms, developer tools, and data dashboards. It demands careful execution to avoid contrast failures.

**Combined mode** respects the operating system's `prefers-color-scheme` setting while allowing manual override — the modern standard for products with returning users.

## Theme Selector Guidelines

Include a theme toggle only when user control meaningfully serves the product. High-investment users (developers, traders, enterprise workers) benefit from control. Transactional or occasional-use products should commit to one mode matching the brand. Place toggles in the header's top-right area or user settings, not primary navigation.

## Dark Mode Implementation

- Avoid pure black (#000000); use very dark neutrals like #0A0A0F instead
- Create surface hierarchy through lightness progression, not shadow depth
- Slightly desaturate brand colors to prevent visual aggression
- Increase font weight by one step for light text on dark backgrounds to maintain legibility
- Verify all text/background contrast ratios against WCAG 2.2 AA standards

A theme switcher is a second palette, not a toggle. Every semantic color requires distinct values in each mode — no algorithmic inversions.
