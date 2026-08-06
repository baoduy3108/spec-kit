---
name: task-decomposition-for-implementation
description: How to break a technical plan into implementable tasks — right-sized, independently verifiable, correctly ordered by dependency, each with clear done criteria; vertical slices, and enabling incremental delivery (and AI-agent execution). Use to break a plan into tasks, create an implementation task list, size tasks well, or the /tasks step of spec-driven development.
category: engineering
keywords_vi: task decomposition for implementation, chia kế hoạch thành task, task đúng cỡ kiểm chứng độc lập, thứ tự theo phụ thuộc, tiêu chí hoàn thành, vertical slice, giao tăng dần agent thực thi
---

# Task Decomposition for Implementation

Once you have a technical plan (see technical-planning-from-specs), you break it into **concrete, implementable tasks** — the actual units of work to build the thing (spec-kit's `/tasks`). Good decomposition makes implementation orderly, verifiable, and incremental — and is essential for handing work to an AI agent, which executes best on well-scoped, clear tasks (see working-with-ai-coding-agents).

## What Makes a Good Task

- **Right-sized** — small enough to be understood and completed in one focused effort, big enough to be meaningful. Too big → unwieldy, hard to verify; too small → overhead and fragmentation. (See planning-and-task-breakdown, vertical-slice-tickets.)
- **Independently verifiable** — each task has clear **done criteria** you can check (ideally testable — tied to the spec's acceptance criteria — see writing-executable-specifications). You should know unambiguously when it's complete and correct.
- **Clear scope** — what's in and out; what it touches. No vague "improve the thing."
- **Traceable** — each task maps back to a plan element / spec requirement (and collectively the tasks cover the whole plan — nothing missed, nothing extra).

## Order by Dependency

Tasks have **dependencies** — some must precede others (build the data model before the code that uses it; the API before the client). Sequence them so each task's prerequisites are done first (a dependency order — see topological-sort). Identify what's **independent** (can be done in parallel / in any order) vs **blocking**. Correct ordering prevents "can't start this because that isn't ready" churn and enables parallel work.

## Prefer Vertical Slices

Where possible, decompose into **vertical slices** — tasks that deliver a thin end-to-end piece of working functionality (see user-story-mapping, vertical-slice-tickets) — rather than purely horizontal layers (all the DB, then all the API, then all the UI). Vertical slices let you **integrate and verify continuously** and deliver value incrementally (see incremental-implementation), catching integration problems early instead of at the end.

## Enable Incremental Delivery

The decomposition should support building the system **incrementally** — each task (or small group) leaves the system in a working, verifiable state (see incremental-implementation). This is safer than a big-bang integration and lets you course-correct as you learn. For AI-agent execution, well-scoped independent tasks with clear done criteria are exactly what agents handle reliably — and let you review each increment (see reviewing-ai-generated-code).

## Pitfalls (in understanding/using)

- **Tasks too big/vague** ("build the backend") → hard to scope, verify, or hand off; break them down.
- **Tasks too small/fragmented** → coordination overhead exceeds the work.
- **No clear done criteria** → can't tell when a task is complete/correct (tie to acceptance criteria).
- **Wrong ordering** — starting tasks whose prerequisites aren't ready → churn and blocking.
- **Purely horizontal layers** — no working slice until the end; prefer vertical slices for continuous integration/verification.
- **Gaps or overlaps** — tasks that don't fully cover the plan, or duplicate/conflict.
- **Untraceable** tasks not tied to plan/spec (scope creep or missing coverage).
- Decomposing so the system is **never in a working state** mid-way (big-bang integration risk).
