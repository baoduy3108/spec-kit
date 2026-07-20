---
name: tab-navigation
description: Tab component design — when to use tabs vs sidebar/stepper, tab types (underline/contained/pill), keyboard navigation, overflow handling. Use when designing tab-based navigation.
category: design
keywords_vi: tab navigation, thiết kế tab, tab component, chuyển tab giao diện, thanh tab, tab điều hướng
---

# Tab Navigation Component Guide

## Purpose

Tabs organize related content under a shared context, letting users switch between views without leaving the page. They work best when 2–7 views share a common header, action set, or subject matter.

## When to Use

✓ Multiple views share common context (same record/settings)
✓ Users frequently switch between views
✓ All tabs are equally valid starting points

✗ More than 7–8 tabs (use sidebar nav instead)
✗ Sequential content (use a stepper/wizard)
✗ Each tab needs different layout/header (use separate pages)

## Tab Types

- **Underline/Indicator:** horizontal strip with bottom border; lightest treatment for page-level tabs
- **Contained/Boxed:** distinct boxes appearing connected to panel; higher visual weight
- **Pill/Button:** rounded capsules for secondary content switches or view toggles

## Key Implementation Details

**Structure:** tab strip fixed height (40–48px), typically sticky. Tab panel scrolls when content overflows. Active indicator: 2–3px border in primary color.

**Overflow handling:** use horizontal scrolling with fade gradient or a "More ▾" dropdown — never wrap tabs onto multiple lines.

**Keyboard navigation:** follow ARIA roving tabindex pattern (←/→ moves between tabs, Tab enters panel).

**Accessibility:** `aria-selected="true"` on active tab; `tabindex="0"` for active, `-1` for inactive; hide inactive panels with `hidden` attribute; persist active tab via URL parameter for deep-linking.

**Avoid:** nested tabs, disabled active tabs, wrapping tab strips.
