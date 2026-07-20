---
name: vertical-slice-tickets
description: Breaking a large body of work into vertical-slice tickets with explicit blocking dependencies — each slice cuts through all layers (schema, API, UI, tests) and is independently demoable, sized to one work session. Covers expand–contract sequencing for wide refactors and acceptance-criteria authoring. Use when planning how to split a feature or refactor into deliverable units.
category: engineering
keywords_vi: chia nhỏ công việc thành ticket, vertical slice, cắt lát dọc tính năng, expand contract refactor, chia task theo lát dọc, acceptance criteria ticket, chia nhỏ tính năng
---

# Vertical-Slice Tickets

Break work into **vertical slices** with explicit blocking dependencies, ready to publish to an issue tracker or local files.

## Vertical Slicing

Each ticket cuts through **all layers** (schema → API → UI → tests) rather than tackling one layer horizontally. The test: *"A completed slice is demoable or verifiable on its own."* Size each slice to fit a single work/context window — if it won't fit, split it further.

Horizontal slicing ("do all the schema, then all the API, then all the UI") is an anti-pattern: nothing is demoable until the end, and integration risk piles up at the finish. Vertical slices de-risk continuously.

## Wide Refactors: Expand–Contract

Refactors that touch many call sites get **expand–contract** (a.k.a. parallel-change) sequencing:
1. **Expand** — add the new form alongside the old one; both work.
2. **Migrate** — move call sites to the new form in batches (each batch its own slice/ticket).
3. **Contract** — remove the old form once adoption is complete.

This keeps every intermediate state shippable and lets the migration pause safely between batches.

## Process

1. **Gather context** from the conversation or referenced specs/issues.
2. **Explore the codebase** to understand current state and spot *prefactoring* opportunities (small refactors that make the real change easier).
3. **Draft vertical slices** following the rules above.
4. **Check granularity and blocking edges** — confirm each slice is independently valuable and the dependency order is correct.
5. **Publish** as tickets with blocking relationships, then work them one at a time, clearing context between items.

## Ticket Format

Each ticket carries:
- A short, descriptive title.
- A **Blocked by** clause — other tickets, or "None — can start immediately".
- End-to-end behaviour from the user's perspective.
- Acceptance criteria as checkboxes.

Acceptance criteria describe observable behaviour ("user sees X when Y"), not implementation steps — they define *done*, not *how*.
