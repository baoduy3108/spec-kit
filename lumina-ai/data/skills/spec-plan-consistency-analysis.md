---
name: spec-plan-consistency-analysis
description: How to cross-check a spec, plan, and tasks for consistency before implementing — verifying complete coverage (every requirement planned and tasked), no contradictions, conformance to principles, and no gold-plating. Use to validate a spec/plan/tasks set, catch gaps or inconsistencies before building, or the /analyze step of spec-driven development.
category: engineering
keywords_vi: spec plan consistency analysis, đối chiếu spec plan tasks, phủ sóng đầy đủ mọi yêu cầu, không mâu thuẫn, tuân nguyên tắc, không thừa gold-plating, kiểm tra trước khi build
---

# Spec / Plan / Tasks Consistency Analysis

Before committing to implementation, **cross-check the spec, plan, and tasks against each other** for consistency, completeness, and conformance. In spec-driven development (spec-kit's `/analyze`), this catch-problems-early step ensures the artifacts that drive the build actually agree — because building from an inconsistent set produces a broken or wrong result (see writing-executable-specifications, technical-planning-from-specs, task-decomposition-for-implementation).

## Why Analyze Before Building

Each artifact was created in a step; drift and gaps creep in between them. A requirement in the spec might have **no** corresponding plan element or task (it won't get built). The plan might add something the spec never asked for (scope creep). Tasks might contradict the plan or each other. Catching these on paper is **vastly cheaper** than discovering — after implementation — that a requirement was silently dropped or something unnecessary was built. It's a review of the *plan of work*, not the work.

## What to Check

- **Complete coverage (spec → plan → tasks)** — trace **every** spec requirement forward: is it addressed in the plan, and broken into tasks? A requirement with no plan/task **won't be built** (a silent gap — the most dangerous finding).
- **No orphans / gold-plating** — trace **backward**: does every plan component and task map to a real requirement? Anything without a requirement is **unrequested scope** (over-engineering — see preventing-agent-over-engineering, anti-over-engineering) — cut it.
- **No contradictions** — the plan doesn't conflict with the spec; tasks don't conflict with the plan or each other; nothing is internally inconsistent.
- **Conformance to the constitution** — the plan/decisions honor the project's principles and constraints (see writing-a-project-constitution).
- **Consistency of detail** — terms, data models, and interfaces are used consistently across the artifacts (the same thing isn't named/modeled two ways).
- **Ambiguities resolved** — no unresolved unknowns that should have been clarified (see spec-clarification-and-ambiguity-resolution).
- **Feasibility & risk** — the tasks realistically deliver the plan; risks are acknowledged.

## The Traceability Mindset

The core technique is **bidirectional traceability**: spec ⇄ plan ⇄ tasks. Forward (every requirement is realized) catches **gaps**; backward (everything realized traces to a requirement) catches **scope creep**. A clean, traceable set means you can build with confidence that you'll get exactly what the spec asked for — no more, no less.

## Fix, Then Build

The output is a **reconciled** set: fill gaps (add missing plan/tasks), cut over-engineering, resolve contradictions, and align terminology — updating the artifacts so they agree. Only then implement (see incremental-implementation). This is especially valuable before handing tasks to an AI agent (see working-with-ai-coding-agents), which will faithfully build whatever the (possibly flawed) tasks say.

## Pitfalls (in understanding/using)

- **Skipping the analysis** and building from inconsistent artifacts → dropped requirements or wrong/extra features found late.
- **Missing coverage** — a spec requirement with no plan/task (silently won't be built) — the top thing to catch.
- **Gold-plating** — plan/tasks with no requirement behind them (unrequested scope); cut it.
- **Contradictions** between artifacts (plan vs spec, task vs task) left unresolved.
- **Constitution violations** in the plan not caught.
- **Inconsistent terminology/models** across artifacts causing implementation confusion.
- Treating it as a rubber-stamp instead of genuine **bidirectional traceability**.
- Doing it **after** building (the expensive order) rather than before.
