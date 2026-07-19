---
name: writing-a-project-constitution
description: How to write a project "constitution" — the foundational, durable principles and constraints that guide every decision (especially for AI coding agents) across specs, plans, and implementation; what belongs in it, and keeping it authoritative. Use to set project principles/guardrails, write a constitution or AGENTS.md-style governing doc, or establish standards an AI agent must follow.
category: engineering
keywords_vi: writing a project constitution, hiến pháp dự án nguyên tắc nền tảng, ràng buộc guardrail cho agent, chuẩn xuyên suốt spec plan implement, tài liệu quản trị, giữ tính thẩm quyền
---

# Writing a Project Constitution

A project "constitution" is a short, **authoritative document of foundational principles and constraints** that governs every decision on a project — architecture, tech choices, quality bars, conventions. In spec-driven development (see spec-driven-development), it's the top of the hierarchy: specs, plans, and implementation must all **conform to it**, and an AI coding agent references it throughout (see context-for-coding-agents).

## Why Have One

Without stated principles, decisions drift: different features use different patterns, quality varies, and an AI agent (or a new teammate) has no anchor and makes inconsistent or over-engineered choices. A constitution provides a **single source of truth for "how we do things here"** — durable rules that keep everything coherent as the project (and many contributors, human or AI) evolve. It's the constraint that prevents drift.

## What Belongs In It

Foundational, **durable** principles — not transient details:
- **Core values / priorities** — e.g. "simplicity over cleverness," "user privacy is non-negotiable," "prefer boring, proven technology" (see anti-over-engineering).
- **Architectural principles** — key patterns, boundaries, and constraints to honor (see codebase-design, clean-architecture).
- **Technology constraints** — required/forbidden stacks, dependencies policy, platform limits.
- **Quality standards** — testing expectations, security requirements (see security-and-hardening), performance bars, accessibility.
- **Conventions** — coding style, naming, structure (or pointers to them).
- **Non-negotiables** — the hard constraints that must never be violated.
Keep it **concise and principled** — a constitution states *principles and constraints*, not a detailed spec of features (those live in specs). If it's too long/detailed, nobody (and no agent) internalizes it.

## Keep It Authoritative

- **It outranks convenience** — when a spec, plan, or implementation conflicts with the constitution, the constitution wins (or you consciously amend it). This is what makes it a constitution, not a suggestion.
- **Agents must adhere to it** — explicitly instruct AI agents to follow it during specification, planning, and coding; check their output against it (a common failure is an agent over-engineering or violating a principle — see preventing-agent-over-engineering).
- **Amend deliberately** — it's durable but not frozen; change it intentionally (with reasoning) when principles genuinely evolve, not casually.
- **Reference it everywhere** — reviews, plans, and agent context should point back to it (see context-for-coding-agents).

## Pitfalls (in understanding/using)

- **Too detailed** — cramming feature specs/implementation into it → nobody internalizes it; keep it principled and short.
- **Too vague** — platitudes ("write good code") give no actual guidance; state concrete, decidable principles.
- **Not enforced** — a constitution nobody (or no agent) checks against is decoration; make it authoritative in reviews and agent instructions.
- **Never referenced by agents** → they make inconsistent/over-engineered choices with no anchor.
- **Frozen or ignored** — never amending it as the project genuinely evolves (or, opposite, changing it casually).
- Confusing it with a **spec** (what to build) — a constitution is *how/principles*, specs are *what*.
- Contradictory principles that give no clear priority when they conflict.
