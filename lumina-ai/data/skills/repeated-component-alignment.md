---
name: repeated-component-alignment
description: Any component rendered many times — cards, list rows, table cells, nav items, tiles, KPI widgets, feed entries — is a fixed slot model, not a free-form box. The same slots appear in the same place in every instance and stay aligned across siblings even when text and values vary in length. Reserve space for optional slots, pin anchor elements (CTA, price, value), clamp overflowing text, and give the full value back via title/tooltip. Use when building or reviewing any repeated component whose content length differs between instances.
category: design
keywords_vi: căn chỉnh card, khác chiều cao, cắt chữ ellipsis, so le nhau, card khác chiều dài, căn hàng loạt component, equal height card, read more cùng vị trí
---

# Repeated Component Alignment

## Summary

When a component repeats across a layout, establish a **fixed slot model** where each instance maintains identical positioning despite varying content lengths. The same slots appear in the same place in every instance and stay aligned across siblings even when text and values differ.

## The Fixed Slot Model

Any component rendered many times — cards, list rows, table cells, nav items, tiles, KPI widgets, feed entries — is a fixed slot model, not a free-form box:

- **Pin anchor elements** — calls-to-action, prices, status indicators — using flexbox utilities like `margin-top: auto` or `margin-left: auto` so they land in the same place on every instance regardless of the content above them.
- **Let a single flexible slot absorb length variance** while keeping all others constrained. If the description varies in length, let the description slot flex and keep the title, badge, and CTA fixed.
- **Reserve space for optional slots.** If some items have a badge and others don't, reserve the badge's space in every instance so the title doesn't shift down on the ones that have it.
- **Clamp overflowing text** with `line-clamp` / ellipsis, and **give the full value back** via a `title` attribute or tooltip so nothing is lost.

## Why This Matters

This approach maintains visual rhythm and scanability across siblings. When cards have different heights or the "read more" link sits at a different vertical position on each card, the eye cannot scan the row cleanly and the layout reads as broken — even though each individual card looks fine in isolation.

## Common Failure Modes

- Cards look different because the descriptions have different lengths → let the description flex, pin everything below it.
- The "read more" link is in a different place on every card → pin it to the bottom with `margin-top: auto`.
- A badge pushes the title down on some items → reserve the badge space on all items.
- Prices are misaligned across tiles → right-align or bottom-pin the price slot uniformly.
- Long titles break the layout → clamp to N lines and expose the full title via tooltip.
