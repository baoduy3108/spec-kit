---
name: scroll-areas
description: When and how to use inner scroll containers — single-axis rule, user control, justified use cases vs preferable alternatives (pagination, accordions). Use when designing scrollable UI regions.
category: design
keywords_vi: scroll area, vùng cuộn, cuộn nội dung, inner scroll, thiết kế vùng cuộn, overflow scroll
---

# Scroll Areas: Design Guidance

## Core Principle

Avoid inner scroll containers by default. A single page-level scroll is universally understood and requires no user discovery.

## Key Constraints When Scroll Areas Are Necessary

**One axis only:** never create a scroll container that scrolls on both axes simultaneously.

**User control always:** prohibit automatic scrolling without user intent. Exceptions: restoring previous scroll position or responding to user actions like form submissions.

**Scroll affordance:** make scrollability obvious through clipped content, visible scrollbars, or partial items at edges.

## Justified Use Cases

Fixed-height sidebars with lengthy navigation, data tables (preserving visible headers), chat/log panels with continuous streams, embedded code editors or terminals.

## Preferable Alternatives

Pagination or load-more, collapsible sections (accordions), separate routes/pages, progressive disclosure.

## Implementation Notes

Use single-axis CSS (`overflow-y: auto; overflow-x: hidden`) and avoid `overflow: auto`. On touch devices, ensure native scrolling behavior. On chat panels, auto-scroll only if users remain at the bottom; show "new messages" indicators if they've scrolled up.
