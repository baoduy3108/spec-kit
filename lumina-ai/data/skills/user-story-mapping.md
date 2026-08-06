---
name: user-story-mapping
description: How to use story mapping to plan a product — arranging user activities left-to-right as a backbone and details top-to-bottom, then slicing releases horizontally to ship a thin end-to-end experience first. Use when planning a product/feature backlog, scoping an MVP, prioritizing releases, or aligning a team on the user's journey.
category: engineering
keywords_vi: user story mapping, bản đồ câu chuyện người dùng, backbone, slice cắt lát release, mvp thin vertical slice, ưu tiên backlog, sắp xếp tính năng theo luồng
---

# User Story Mapping

Story mapping is a technique for planning what to build by organizing work around the **user's journey** rather than a flat, prioritized list. It keeps the team focused on delivering a **coherent end-to-end experience** and makes slicing releases (especially the MVP) far clearer.

## The Problem With Flat Backlogs

A flat, ranked backlog loses the **big picture** — you can't see how items relate to the user's journey, and "top priority" items might deliver isolated pieces that don't add up to anything usable. Story maps restore the narrative: they show the whole product as a story the user lives through.

## The Structure

A story map is a 2D grid:
- **The backbone (horizontal, top row)** — the sequence of **user activities/steps** in the order the user does them, left to right (e.g. for email: "browse inbox → read → compose → send → organize"). This is the skeleton of the experience.
- **Details (vertical, under each step)** — the specific **tasks/stories** that fulfill each activity, stacked by priority (most essential at top).
Reading left-to-right tells the **story** of using the product; reading top-to-bottom under a step shows options from must-have to nice-to-have.

## Slicing Releases (the key payoff)

You plan releases with **horizontal slices** across the map:
- The **first slice** takes the **minimum** story under each backbone step needed to make the **whole journey work end-to-end** — a thin but complete "walking skeleton." The user can actually complete the journey, even if crudely.
- Later slices add depth/richness to each step.
This is the right way to scope an **MVP** (see mvp-and-validation): a thin *vertical* slice through the whole flow, not a fully-polished *first step* that goes nowhere. It avoids the classic trap of building one feature perfectly while the user still can't complete their task.

## Why It Works

- **Shared understanding** — the whole team sees the user's journey and how pieces fit; great for alignment (see effective-meetings).
- **Better prioritization** — you prioritize within the context of the full experience, not in a vacuum.
- **Sensible releases** — each release delivers a usable end-to-end improvement, not disconnected fragments.

## Pitfalls (in understanding/using)

- **Slicing vertically by feature** (build step 1 fully, then step 2…) → the user can't complete the journey until the end; slice **horizontally** for a working end-to-end MVP first.
- Building the map and never **maintaining/using** it — it's a living planning tool.
- Too much detail up front — the backbone and near-term slice matter; deep detail on far-future work is waste.
- Confusing the map with a Gantt chart — it's about the **user's flow and release slices**, not dates.
- Doing it solo — its main value is **collaborative** shared understanding.
- Forgetting to ground the backbone in real **user activities** (see product-discovery, user-flows-and-guided-paths).
