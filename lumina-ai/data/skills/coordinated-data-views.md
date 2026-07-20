---
name: coordinated-data-views
description: Designing UIs that display data in two synchronized representations, like a table paired with a map/chart/diagram — selection sync, color consistency, layout strategy. Use when designing a dual-view (table+map/chart) UI.
category: design
keywords_vi: coordinated views, table map sync, giao diện đồng bộ 2 view, dashboard table chart, nhiều view dữ liệu, đồng bộ liên kết với nhau
---

# Coordinated Data Views

How to design UIs that display data in two simultaneous representations — like a table paired with a map, chart, or diagram — while keeping them synchronized.

## Core Principle

Any selection or highlight made in one view is immediately reflected in the other. Selection state lives in a shared store, not in either view independently.

## Key Implementation Points

**Synchronization:** clicking a row highlights its corresponding visual element (and vice versa). When a visual element is selected, the table scrolls to bring that row into view. Hover states should be subtle and distinct from persistent click selections.

**Color Consistency:** use identical color assignments across both views, defined from a single central source. Display a shared legend once rather than duplicating it.

**Layout Strategy:** allocate 60–70% width to the primary view, with the secondary as a companion panel. Use equal 50/50 splits with draggable dividers when both carry equal weight. On mobile, show one view at a time with a toggle.

**Control Placement:** visual-specific controls (zoom, opacity, layer toggles) belong in the visual panel only. Shared data controls (filters, time ranges) should sit outside both views.

**Performance:** debounce hover events, use stable item IDs for rendering efficiency, virtualize large tables (1000+ items), update style properties on canvas elements rather than recreating them.
