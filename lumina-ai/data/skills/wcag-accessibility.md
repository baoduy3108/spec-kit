---
name: wcag-accessibility
description: WCAG 2.2 Level AA compliance guide — four core principles (perceivable, operable, understandable, robust), contrast ratios, keyboard access, semantic HTML, ARIA rules. Use when reviewing or building a UI for accessibility compliance.
category: design
keywords_vi: wcag, đạt chuẩn wcag, tuân thủ accessibility, chuẩn khả năng tiếp cận, aria rules, kiểm tra accessibility, contrast ratio
---

# WCAG Accessibility Guide

## Legal Context
Many jurisdictions require compliance with WCAG 2.2 Level AA for public-facing products.

## Four Core Principles

**Perceivable** — Users must see all content
- Normal text: 4.5:1 contrast minimum
- Large text (18pt+): 3:1 contrast minimum
- UI components: 3:1 contrast minimum
- Disabled elements are contrast-exempt (intentionally dimmed)
- Every image needs alt text; decorative images use `alt=""`

**Operable** — Users must navigate and control everything
- Keyboard access required for all interactive elements
- Visible focus indicators mandatory (never remove without replacement)
- Touch targets minimum 44×44px
- No keyboard traps; modals trap focus appropriately
- Skip-to-content link as first focusable element

**Understandable** — Users must comprehend content and UI
- Set `lang` attribute on `<html>`
- Form inputs require visible labels (not placeholders)
- Required fields clearly marked
- Error messages tied to fields via `aria-describedby`

**Robust** — Assistive tech must interpret content
- Use semantic HTML; ARIA supplements only where needed
- `aria-label` for unlabeled controls
- `aria-live` regions for dynamic updates
- `aria-expanded` for toggles; `aria-current="page"` for active nav

## Key Rule
No ARIA is better than incorrect ARIA. Incorrect ARIA actively breaks screen readers.
