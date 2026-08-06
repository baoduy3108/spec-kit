---
name: responsive-paradigms
description: Mobile, tablet, and desktop require fundamentally different design approaches, not just scaled layouts — interaction contexts, navigation transformation, sticky positioning per breakpoint, mobile-first. Use when designing a responsive layout across device sizes.
category: design
keywords_vi: responsive design, responsive design paradigm, mobile first, breakpoint design, thiết kế đa thiết bị, layout responsive, mobile với desktop
---

# Responsive Paradigms

Mobile, tablet, and desktop require fundamentally different design approaches, not just scaled layouts.

## Three Distinct Interaction Contexts

- **Mobile (<768px):** Touch input, bottom navigation, single-column vertical scrolling, task-focused sessions
- **Tablet (768–1024px):** Hybrid touch/keyboard, persistent or collapsible sidebars, two-column layouts
- **Desktop (>1024px):** Mouse with hover states, persistent navigation, multi-column dense information

## Key Practices

**Section behavior:** Secondary content can be hidden on mobile; stacking is the default reflow. Repositioning is acceptable only within the same container region — avoid moving elements into different scopes entirely.

**Sticky positioning:** Should adapt per breakpoint. An element sticky on desktop might become a fixed bottom bar on mobile or lose sticky positioning altogether.

**Navigation transformation:** Desktop uses persistent top nav or sidebar; mobile uses bottom tab bars or hamburger drawers with no hover states.

**Mobile-first approach:** Build for mobile constraints first, then progressively enhance for larger screens.

**Ultra-wide protection:** Content should cap at a max-width (typically 1280–1600px) for readability and ergonomic comfort on 4K/ultra-wide displays.

**Header scaling:** Brand marks and menu controls should scale with breakpoints while maintaining consistent edge insets.

## Review Checklist

Touch targets (≥44×44px), reachability, hidden secondary sections, accessibility for icon-only controls.
