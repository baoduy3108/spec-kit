---
name: data-display-and-selection
description: Designing interfaces for complex data collections (products, files, users, orders) — view modes (grid/list/table), selection UX, mass actions, search/autocomplete, data visualization. Use when designing a data table/list/collection UI.
category: design
keywords_vi: thiết kế bảng dữ liệu, data table ui, mass action, chọn nhiều item, giao diện danh sách dữ liệu
---

# Data Display and Selection

Designing interfaces for complex data collections (products, files, users, orders).

## View Modes

Offer **grid** (visual browsing), **list** (moderate detail), or **table** (dense comparison) views. Default depends on the data's primary purpose. Persist user preference in localStorage.

## Selection & Hit Areas

Make the entire row or card the clickable selection target — not just a small checkbox. Selected items show a subtle background colour shift (brand primary at ~5–8% opacity). An optional left border in the primary color reinforces state.

## Mass Actions

When items are selected, a contextual toolbar appears showing the selection count: "3 selected [Delete] [Archive] ...". Destructive actions require confirmation dialogs. "Select all" operates per-page, with an option to extend to the full dataset.

## Search & Autocomplete

Return suggestions after 1–2 characters. Make results recognisable at a glance using thumbnails, category labels, icons, and highlighted matching text. Always offer a "See all results" link to a full results page with filters.

## Data Visualization

Give numbers context: "48.900.000đ (+12% so với tháng trước)" rather than bare values. Use graphs for trends, distributions, and comparisons. Favour familiar chart types (bar, line, area, pie, sparkline) over exotic ones. Limit palettes to 2–3 semantic colours.
