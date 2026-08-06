---
name: platform-design-android
description: Material Design 3 guide for building compliant Android apps with Jetpack Compose or XML — theme/color, navigation, layout, typography, components, accessibility, gestures, permissions. Use when building or reviewing an Android app UI.
category: design
keywords_vi: material design 3, thiết kế android, jetpack compose, ui android chuẩn, quy tắc thiết kế android
---

# Android Design Guidelines (Material Design 3)

Comprehensive Material Design 3 guide covering building compliant Android apps with Jetpack Compose or XML.

## Core Principles

**Theme & Color**: Enable dynamic color (Android 12+) with static fallbacks. Always reference `MaterialTheme.colorScheme` roles rather than hardcoding hex values. Support both light and dark themes. Generate custom color palettes from seed colors using Material Theme Builder.

**Navigation**: Match navigation components to screen size and destination count. Use Navigation Bar (3-5 destinations on phones), Navigation Rail (tablets/medium screens), and drawers for complex hierarchies. Always include labels on navigation items.

**Layout**: Adopt window size classes (Compact/Medium/Expanded) for responsive design. Implement edge-to-edge display with proper inset handling. Respect foldable hinge areas and avoid full-width content on large screens.

## High-Priority Requirements

**Typography**: Use `sp` units only. Reference `MaterialTheme.typography` roles (15 predefined styles from displayLarge to labelSmall). Test at 200% font scale. Minimum 12sp for body text, 11sp for labels.

**Components**: Deploy at most one FAB per screen for the primary action. Connect top app bars to scroll behavior. Reserve dialogs for critical interruptions; use snackbars for feedback.

**Accessibility**: Every interactive element needs a `contentDescription`. Maintain 48×48dp minimum touch targets. Ensure 4.5:1 contrast ratio for normal text. Support TalkBack, Switch Access, and keyboard navigation.

## Critical Rules

- Opt in to predictive back gestures in the manifest and handle with `BackHandler` (Compose) or `OnBackInvokedCallback` (View-based)
- Request permissions in context with rationale, never at launch
- Use Photo Picker instead of requesting media permissions
- Avoid interactive elements in system gesture zones (bottom 20dp, left/right 24dp edges)
- Never use color alone to convey information

## Anti-Patterns to Avoid

Hardcoding colors, using `dp` for text, omitting navigation labels, blocking on permission denial, custom bottom bars, overriding `onBackPressed()`.
