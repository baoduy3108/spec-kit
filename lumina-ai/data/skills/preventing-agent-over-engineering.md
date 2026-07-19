---
name: preventing-agent-over-engineering
description: How to stop AI coding agents from over-engineering — why agents add unrequested complexity/abstraction/features, spotting it, and preventing it via clear scope, simplicity constraints, review, and YAGNI. Use to keep AI-generated code simple, stop an agent gold-plating or over-abstracting, or enforce simplicity in agent output.
category: engineering
keywords_vi: preventing agent over-engineering, over-engineering agent, ngăn agent làm quá phức tạp, thêm trừu tượng tính năng không yêu cầu, gold-plating, ràng buộc đơn giản, yagni
---

# Preventing Agent Over-Engineering

AI coding agents have a strong tendency to **over-engineer** — adding abstraction, configurability, features, and complexity nobody asked for. Left unchecked, this produces bloated, hard-to-maintain code that solves problems you don't have. Curbing it is a core skill of working with agents (see working-with-ai-coding-agents, anti-over-engineering).

## Why Agents Over-Engineer

Agents are trained on vast code that includes lots of "enterprise" patterns, and they aim to be **thorough and impressive** — so they default to adding:
- **Speculative abstraction** — interfaces, layers, and generalizations for flexibility you don't need ("just in case").
- **Unrequested features** — handling cases and options the spec never asked for (gold-plating).
- **Configurability** — knobs and settings for hypothetical future needs.
- **Premature optimization / patterns** — design patterns and optimizations that add complexity without payoff.
They're **eager** (helpful to a fault) and don't feel the maintenance cost. More code looks like more value to them; it isn't.

## Spot It

Over-engineering signs in agent output (see reviewing-ai-generated-code, code-smells):
- Abstractions/interfaces with a **single implementation** ("flexibility" with no second case).
- Configuration/options nothing uses.
- Handling requirements/cases the spec **doesn't** call for.
- Layers of indirection that don't earn their complexity.
- Generalized "framework" code where a simple function would do.
Ask of each piece: **"does an actual requirement justify this?"** If not, it's over-engineering (see spec-plan-consistency-analysis's backward traceability).

## Prevent It

- **Instruct for simplicity** — explicitly: "keep it as simple as possible, don't add features/abstraction/config I didn't ask for, prefer the straightforward solution" (see prompting-coding-agents). Say it up front; agents respond to it.
- **Invoke YAGNI** — "You Aren't Gonna Need It": build for **today's** requirements, not speculative futures (see anti-over-engineering). Tell the agent not to build for hypotheticals.
- **Tight scope & done criteria** — a precise task with clear boundaries leaves less room to gold-plate (see task-decomposition-for-implementation).
- **Constitution/principles** — a stated "simplicity over cleverness" principle the agent must follow (see writing-a-project-constitution).
- **Review and cut** — in review, actively **remove** unjustified complexity ("this abstraction has one use — inline it"). Ask the agent to simplify.
- **Cross-check plans too** — over-engineering starts at the plan stage; catch it there (see technical-planning-from-specs).

## The Principle

The best solution is the **simplest one that meets the requirements** (and the constitution) — no more. Complexity has a real cost (maintenance, bugs, cognitive load) that agents don't feel but you pay. Default to simple; add complexity only when a concrete requirement forces it. Simplicity is a feature.

## Pitfalls (in understanding/using)

- **Accepting** the agent's eager complexity because it "looks thorough" — more code ≠ more value; simpler is usually better.
- **Not instructing** for simplicity/YAGNI up front → the agent defaults to over-engineering.
- Keeping **single-use abstractions**, unused config, and unrequested features (gold-plating).
- **Premature optimization/patterns** the requirements don't justify.
- Not **cutting** over-engineering in review (letting it ship).
- Missing that over-engineering starts in the **plan** — catch it before implementation.
- Confusing **necessary** complexity (genuinely required) with speculative complexity — cut the latter, keep the former.
- Over-correcting into **under**-engineering (too simplistic to meet real requirements) — meet the requirements simply, don't skip them.
