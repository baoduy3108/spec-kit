---
name: mobile-navigation-patterns
description: Mobile navigation patterns — stack (push/pop), tabs, and drawers; managing the navigation back stack; predictable back-button behavior; and choosing the right structure for an app's information hierarchy. Use to design mobile navigation, choose tabs vs drawer vs stack, manage the back stack, or fix confusing back-button behavior.
category: design
keywords_vi: điều hướng di động, navigation pattern, stack push pop, tab bar, drawer ngăn kéo, quản lý back stack, nút back dễ đoán, chọn cấu trúc điều hướng
---

# Mobile Navigation Patterns

Navigation is how users move between screens and understand **where they are** in an app. The main patterns — **stack**, **tabs**, and **drawer** — combine to express an app's structure, and getting the **back stack** and **back-button** behavior right is what makes an app feel predictable rather than confusing (see how-deep-linking-works, mobile-app-architecture).

## The Core Patterns

- **Stack navigation (push/pop)** — screens are stacked like cards: tapping into detail **pushes** a new screen; **back** pops it off. This is the fundamental drill-down model (list → detail → sub-detail). The **back stack** is the history of pushed screens.
- **Tab navigation (bottom tab bar)** — a small set (3–5) of **top-level, equally-important** destinations, always visible for one-tap switching. Best for the app's primary sections. Each tab often has its **own** navigation stack.
- **Drawer (side menu / hamburger)** — a slide-out menu for **many** or **secondary** destinations. Hides navigation behind a tap, so it's less discoverable than tabs — good for numerous or infrequent destinations, less good for primary ones.

## Choosing

- **Bottom tabs** — for **2–5 primary** sections users switch between often (Home, Search, Profile...). Most discoverable; the modern default for primary navigation.
- **Drawer** — when there are **too many** top-level destinations for tabs, or they're **secondary** (settings, help, account switching). Trades discoverability for space.
- **Stack** — used **within** tabs/sections for drill-down detail.
- Combine them: bottom tabs for primary sections, a stack inside each, and maybe a drawer for overflow/secondary items.

## The Back Stack (the tricky part)

Predictable **back** behavior is crucial and easy to get wrong:
- Back should take the user to the **previous logical screen**, matching their mental model.
- With **tabs**, decide: does back within a tab pop that tab's stack, and does back at a tab root switch tabs or exit? (Common: back pops the current tab's stack, then goes to the first tab or exits.)
- **Deep links** (see how-deep-linking-works) must build a **synthetic back stack** so back goes to a sensible parent, not straight out of the app.
- Android has a **hardware/gesture back**; iOS uses edge-swipe and in-screen back — respect each platform's expectation.
- Avoid **loops** and **dead ends** (back that does nothing or exits unexpectedly).

## Design Guidance

- **Match structure to hierarchy** — tabs for parallel primary sections, stack for drill-down, drawer for overflow.
- **Keep primary destinations visible** (tabs) rather than buried in a drawer.
- **Preserve state per tab** — switching tabs and returning should restore scroll/position, not reset.
- **Predictable back** — always the previous logical screen; build proper back stacks for deep links.
- **Show where you are** — highlight the active tab; use clear titles.
- **Respect platform conventions** — iOS and Android users expect different back/navigation behavior.
- **Don't nest too deep** — endless drill-downs get users lost; keep hierarchies shallow.

## Pitfalls (in understanding/using)

- **Primary destinations in a drawer** → poor discoverability; users miss key features. Use tabs.
- **Broken back stack** — back exits the app or jumps somewhere illogical, especially after deep links.
- **Losing tab state** on switch → users lose their place; preserve each tab's stack/scroll.
- Too many **bottom tabs** (>5) → cramped and unusable; move overflow to a drawer/"More".
- Ignoring **platform** back conventions (Android gesture/hardware back, iOS edge-swipe).
- **Deep hierarchies** with no sense of location → users get lost; provide clear titles and shallow structure.
- Modals that **trap** the user (no clear dismiss) or over-using them for primary navigation.
