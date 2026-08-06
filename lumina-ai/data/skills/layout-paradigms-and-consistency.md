---
name: layout-paradigms-and-consistency
description: Choosing and maintaining layout paradigms across an app — macro/meso/micro consistency scales, matching content nature to paradigm (feed vs board vs dashboard). Use when choosing an overall page layout paradigm or auditing app-wide consistency.
category: design
keywords_vi: layout paradigm, tính nhất quán giao diện, page skeleton, chọn layout ứng dụng, bố cục trang, nhất quán xuyên suốt
---

# Layout Paradigms and Consistency

## Core Concept

Layout choices operate at the macro scale of design consistency. A layout paradigm isn't neutral — it shapes how users understand and interact with content. The same paradigm and page skeleton must be reused consistently so users develop a single mental model across the application.

## Three Scales of Consistency

- **Macro**: layout paradigm and page skeleton across screens
- **Meso**: component families sharing design DNA
- **Micro**: states, tokens, type scales, and semantic colors

## How to Choose a Paradigm

Layout decisions flow downstream from earlier choices:

1. **Information architecture** largely determines candidate paradigms
2. **Brand and story** inform which paradigm conveys the right tone
3. **User task and context** ultimately determine what works best

Match content nature to paradigm: a stream of recent, homogeneous items suits a feed, while items moving through workflow stages fit a board/Kanban structure.

## Implementation: Consistency Rules

- Use identical page templates for all screens of the same kind
- Keep navigation, primary actions, and status feedback in consistent locations
- Balance feature weight across sibling pages (split over-heavy pages; consolidate over-thin ones)
- Deviate only for clear task-driven reasons — and make deviations obvious rather than subtle

The ultimate test: does the product feel like *one* application?
