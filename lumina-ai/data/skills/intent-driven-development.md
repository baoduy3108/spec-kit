---
name: intent-driven-development
description: The principle of separating intent (what/why) from implementation (how) — expressing the desired outcome and letting the how be derived/generated, why this decoupling matters for AI-assisted development, and the shift from code-as-source-of-truth to intent-as-source-of-truth. Use to understand intent-driven or spec-first development, separating what from how, or why intent should drive implementation.
category: engineering
keywords_vi: intent-driven development, phát triển theo ý định, tách intent what why khỏi implementation how, biểu đạt kết quả mong muốn, decouple, intent là nguồn sự thật thay vì code
---

# Intent-Driven Development

Intent-driven development is the principle of expressing **what** you want and **why** (the intent) separately from **how** it's implemented — and treating the intent as the primary artifact that drives the implementation. It's the philosophy underneath spec-driven development (see spec-driven-development, writing-executable-specifications) and it becomes especially powerful as AI generates the "how" from the "what."

## The Core Separation: What/Why vs How

Traditionally, **code** is the source of truth — the implementation *is* the specification, and the intent behind it lives only in people's heads (and stale docs). Intent-driven development inverts this: capture the **intent** (the desired outcome, behavior, and reasoning) as the durable, authoritative thing, and let the **implementation** be derived from it. The "how" is a means to realize the "what," and should be **decoupled** so it can change without changing the intent.
- **Intent (what/why)** — the problem, the required behavior and outcomes, the reasons and constraints. Stable; changes only when the goal changes.
- **Implementation (how)** — the code, architecture, and tech that realize it. A detail that can be re-derived, refactored, or regenerated to meet the same intent.

## Why the Decoupling Matters

- **The how can change freely** — refactor, re-architect, switch tech, or **regenerate** the implementation, and as long as it still satisfies the intent, nothing important is lost. The intent is invariant.
- **Intent is more durable than code** — requirements outlive implementations; capturing intent explicitly preserves the *why* that code alone loses.
- **Better communication** — stating intent clearly aligns humans (and agents) on the goal before arguing about implementation.
- **Enables generation** — if intent is precise enough, an implementation can be **generated** from it (the executable-spec idea — see writing-executable-specifications). The clearer the what, the more the how can be automated.

## The Shift for AI-Assisted Development

This is why intent-driven development matters *now*: AI can increasingly produce the implementation from a well-expressed intent. That elevates the human's job to **articulating intent precisely** (and reviewing/deciding) rather than writing every line of "how" (see working-with-ai-coding-agents, prompting-coding-agents). The source of truth shifts from code to intent — and the skill of **expressing intent clearly and completely** (specs, constraints, acceptance criteria) becomes central. Vague intent → wrong implementation, whoever (or whatever) builds it.

## Keeping Intent Authoritative

For this to work, intent must be **kept current and honored**: when goals change, change the intent first, then propagate to implementation; when code drifts from intent, reconcile (the intent governs). If intent is captured once and abandoned while code evolves separately, you're back to code-as-truth with a misleading doc (see writing-executable-specifications, living-documentation).

## Pitfalls (in understanding/using)

- **Conflating what with how** — baking implementation decisions into the intent (over-constrains, couples them) — keep them separate.
- **Vague intent** — imprecise "what" → wrong "how" no matter who builds it; express intent completely (behavior, edge cases, constraints, acceptance criteria).
- **Letting intent go stale** while code evolves → intent-as-truth becomes a lie; keep it current.
- Treating **code as the only truth** and leaving intent implicit (in heads / stale docs) — the *why* gets lost.
- Assuming a **once-captured** intent needs no maintenance as goals change.
- Over-formalizing intent for trivial work (match rigor to stakes) — or under-specifying complex work.
- Forgetting the human still owns **judgment and decisions** even as the how is generated (see human-in-the-loop-development).
