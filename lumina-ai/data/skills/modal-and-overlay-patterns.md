---
name: modal-and-overlay-patterns
description: Hierarchy of overlay types from lightweight to blocking — tooltip, popover, dropdown, bottom sheet, drawer, modal, full-screen overlay. Use when choosing/designing modal, dialog, or overlay UI.
category: design
keywords_vi: modal design, overlay pattern, dialog ui, popup thiết kế, thiết kế modal dialog, dùng modal hay drawer, modal hay drawer
---

# Modal and Overlay Patterns

Hierarchy of overlay types, from lightweight to blocking, to choose the most appropriate interaction pattern.

## Overlay Types (Lightest to Heaviest)

1. **Tooltip** — non-blocking, hover-triggered explanatory text
2. **Popover** — non-blocking, anchored interactive content (280–360px max)
3. **Dropdown/Menu** — non-blocking list of actions or selections
4. **Bottom Sheet** — mobile-friendly, partially blocking, swipeable
5. **Drawer/Side Panel** — partially blocking secondary task panel (320–480px)
6. **Modal/Dialog** — fully blocking, requires user response
7. **Full-screen Overlay** — complete immersion, explicit close only

## Key Decision Rule

If the user can continue using the rest of the app while the overlay is open, use a non-blocking type (drawer, popover). If the app must wait for the user's response, use a modal.

## Critical Guidelines

**Modal use cases:** destructive action confirmation, required forms before proceeding, errors requiring acknowledgement.

**Modal sizing:** 360px (small), 480px (medium), 640px (large), or full-screen.

**Accessibility:** trap focus within overlay, return to trigger on close; `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; disable Escape and click-outside dismiss for destructive actions.

**Destructive confirmations:** name the specific item and state irreversible consequences — avoid generic "Are you sure?" language.
