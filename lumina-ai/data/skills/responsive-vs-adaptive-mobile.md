---
name: responsive-vs-adaptive-mobile
description: Designing for many screen sizes — responsive layouts that fluidly adapt vs adaptive layouts with distinct breakpoint designs, handling phones/tablets/foldables, orientation, safe areas/notches, and density-independent sizing. Use to support multiple device sizes, design for tablets and foldables, handle orientation and notches, or choose responsive vs adaptive.
category: design
keywords_vi: responsive vs adaptive, tablet foldable, safe area notch, nhiều kích thước màn hình, layout co giãn linh hoạt, breakpoint bố cục riêng, size class, kích thước theo mật độ dp
---

# Responsive vs Adaptive (Mobile Screens)

Modern apps run on a huge range of screens — small phones, large phones, tablets, foldables, in portrait and landscape. Designing so the UI **works well on all of them** comes down to two complementary approaches: **responsive** (fluidly stretch/reflow) and **adaptive** (distinct layouts at breakpoints) — plus handling density, orientation, and hardware quirks like notches (see mobile-navigation-patterns, layout-paradigms-and-consistency).

## Responsive vs Adaptive

- **Responsive** — the layout **fluidly adjusts** to the available space: elements resize, wrap, and reflow continuously. One flexible layout that stretches to fit. Simple and handles unknown sizes gracefully — but a design that merely stretches can look awkward at extremes (a phone layout stretched across a tablet wastes space).
- **Adaptive** — you design **distinct layouts** for different size **classes** (breakpoints), and the app **switches** between them. E.g. a **single-column** list on a phone becomes a **two-pane list-detail** (master-detail) on a tablet. More work, but each size gets a layout that actually fits it.
- In practice, **combine**: responsive within a size class, adaptive across size classes. Use **size classes/breakpoints** (compact/medium/expanded) rather than checking specific device models.

## Tablets and Foldables

- **Tablets** — don't just stretch the phone UI; use the extra space (multi-pane, list-detail, side navigation). A stretched phone layout on a tablet is a common lazy failure.
- **Foldables** — the screen size/aspect **changes at runtime** when folding/unfolding; treat it like a configuration change and reflow (phone-like folded, tablet-like unfolded). Handle the hinge/fold posture.
- **Multi-window / split-screen** — your app may run in a partial-width window; don't assume full screen.

## Orientation, Safe Areas, and Density

- **Orientation** — support portrait and landscape (or deliberately lock, with reason); landscape often warrants a different layout, not just a rotated one.
- **Safe areas / notches / cutouts** — modern phones have notches, punch-holes, rounded corners, and gesture bars. Respect **safe-area insets** so content isn't hidden behind them or the home indicator.
- **Density-independent sizing** — never size in raw pixels; use **density-independent units** (dp/pt) so elements are the same physical size across low- and high-density screens. Provide assets at multiple densities (or vectors).
- **Dynamic type** — respect the user's system font-size setting (accessibility); layouts must handle larger text without clipping.

## Design Guidance

- **Think in size classes/breakpoints**, not device models — future devices you've never seen must work.
- **Reflow, don't just scale** — reorganize (columns, panes) for big screens, not merely stretch.
- **List-detail** on large screens; single-column drill-down on small.
- **Respect safe areas** and handle notches/gesture bars.
- **Use dp/pt and scalable assets**; support dynamic type for accessibility.
- **Test across sizes/orientations/foldables**, including split-screen.
- **Handle configuration changes** (rotate, fold, resize) without losing state (see mobile-state-restoration).

## Pitfalls (in understanding/using)

- **Stretching the phone layout** onto a tablet/foldable → wasted space and awkward proportions; reflow instead.
- Sizing in **raw pixels** → elements too big/small across densities; use density-independent units.
- Ignoring **safe-area insets** → content hidden behind notches, rounded corners, or the home indicator.
- Assuming a **fixed** screen size/orientation → breaks on rotation, foldables, and split-screen.
- Branching on **specific device models** instead of size classes → fails on new devices.
- Ignoring **dynamic type** → text clipping and inaccessible UI when users enlarge fonts.
- Losing **state** on rotation/fold (treated as a fresh start) — see mobile-state-restoration.
