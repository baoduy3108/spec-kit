---
name: prd-writing
description: Turn a rough product idea into a clear Product Requirements Document — gather context with a few focused clarifying questions, then produce a structured PRD with ruthless prioritization (P0 is only 30–40% of features), explicit goals/non-goals, user stories, success metrics, and scope boundaries. Use when writing a PRD or product spec.
category: ai-agent
keywords_vi: viết prd, product requirements document, tài liệu yêu cầu sản phẩm, ưu tiên tính năng p0, prd sản phẩm, viết spec tính năng, tài liệu sản phẩm
---

# PRD Writing

Take a rough idea to an AI-ready, buildable Product Requirements Document. The PRD's job is to make scope, priority, and success unambiguous *before* engineering starts.

## Process

1. **Extract initial context** from the idea as given.
2. **Ask a few focused clarifying questions** (batch them, ~5–7 max) — target the gaps that would change the design: who's the user, what problem, what's explicitly out of scope, how success is measured, any hard constraints.
3. **Draft the PRD** against a consistent section structure.
4. **Review** for the priority discipline below before calling it done.

## Ruthless Prioritization

**P0 should be only 30–40% of features.** If everything is P0, nothing is — forcing the trade-off is the whole point. Tier the rest P1/P2. A PRD where every feature is "must-have" hasn't made the hard decisions and will blow scope.

## Structure (adapt to the product)

- **Overview / problem** — what and why, the user pain in one paragraph.
- **Goals & non-goals** — non-goals are as important as goals; they set the scope boundary explicitly.
- **Target user & use cases** — specific persona and the jobs they're hiring the product for.
- **Requirements** — user stories or capabilities, each tagged P0/P1/P2.
- **Success metrics** — observable outcomes that define "this worked," not activity counts.
- **Scope & constraints** — what's in, what's deferred, hard limits (time, platform, dependencies).
- **Open questions / risks** — the unknowns that still need resolving.

## Principles

- **Non-goals prevent scope creep** — write them down explicitly.
- **Acceptance criteria describe observable behaviour**, not implementation steps.
- **Every requirement carries a priority** — an untagged requirement is a decision you haven't made.
- **Metrics are outcomes** — "reduce checkout drop-off" beats "ship a new checkout page."
- Keep it as short as the product allows; a PRD nobody reads doesn't align anyone.
