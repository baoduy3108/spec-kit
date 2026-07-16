---
name: visual-emphasis-and-hierarchy
description: Making important UI elements stand out through deliberate visual hierarchy — hierarchy ladder (primary/secondary/tertiary/disabled), emphasis techniques, whitespace, position signaling. Use when reviewing or designing visual hierarchy/emphasis in a UI.
category: design
keywords_vi: visual hierarchy, phân cấp thị giác, nút chính nút phụ, emphasis ui, thứ tự ưu tiên giao diện
---

# Visual Emphasis and Hierarchy

How to make important UI elements stand out through deliberate use of visual tools.

## The Hierarchy Ladder

- **Primary:** filled, brand colour, largest button in the group
- **Secondary:** outlined or ghost style, neutral colour
- **Tertiary:** text link or subtle ghost, smaller and recessive
- **Disabled:** low contrast, no hover state

Key constraint: at most one primary action per view — multiple filled buttons cancel each other's emphasis.

## Emphasis Techniques

Size, colour, weight, contrast, and position create hierarchy through relative difference. Brand colour is the strongest signal and should be reserved for one role per view — either as a large background area *or* on interactive elements, never both simultaneously.

Whitespace amplifies focus: to create a powerful focal point, combine a high-contrast element with generous whitespace around it.

Typography weight supports scannability — bold headings and labels and key data anchors, but avoid bolding isolated words.

## Practical Guidance

- Text over images requires legibility support: soft text-shadows, subtle tints, or gradient overlays
- Position signals priority — primary actions go bottom-right on forms or top-right on headers
- Data-heavy views should surface one key metric prominently; demote or hide secondary data
- All interactive elements must use `cursor: pointer`

Anti-patterns: same-sized "Cancel" and "Confirm" buttons, brand colour overuse across multiple roles.
