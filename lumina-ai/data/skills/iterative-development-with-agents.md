---
name: iterative-development-with-agents
description: How to iterate productively with an AI coding agent — the instruct→review→refine loop, giving specific corrective feedback, converging on a solution, knowing when to redirect vs restart, and assessing progress against spec/plan. Use to iterate with an AI agent, give effective feedback to redirect it, converge on working code, or the converge step of spec-driven development.
category: engineering
keywords_vi: iterative development, lặp cùng agent, instruct review refine, phản hồi sửa cụ thể agent, hội tụ giải pháp, redirect vs restart, đánh giá tiến độ so với spec
---

# Iterative Development with Agents

Working with an AI coding agent is inherently **iterative** — the first output is a draft, and you converge on a good result through a loop of instruct → review → refine. Doing this loop *well* (specific feedback, knowing when to redirect vs restart, tracking progress) is what turns a fast-but-fallible agent into reliable delivery (see working-with-ai-coding-agents).

## The Loop

1. **Instruct** — give a clear, scoped task with intent, constraints, and done criteria (see prompting-coding-agents).
2. **Review** — examine and **verify** the output (see reviewing-ai-generated-code) against the intent — does it work, is it correct, does it fit?
3. **Refine** — give **specific corrective feedback** and redirect, or accept and move on.
4. **Repeat** until the increment meets its criteria.
Expect multiple passes. Trying to get everything in one shot leads to sprawling, hard-to-fix output; small loops converge faster and stay controllable (see incremental-implementation).

## Give Specific, Corrective Feedback

Vague feedback ("that's not right, try again") makes the agent guess again — often producing a *different* wrong thing, or thrashing. Effective feedback is **specific and actionable**:
- **What's wrong and why** — "this doesn't handle the empty list, which the spec requires."
- **The direction to fix** — "use the existing `parseUser` helper instead of reimplementing it," "simplify this — remove the abstraction, it's over-engineered."
- **Point to the standard** — the spec, the convention, the example.
Precise feedback converges; vague feedback thrashes. Treat it like coaching a capable junior (see mentoring-and-coaching).

## Redirect vs Restart

Know when to **steer** vs **start over**:
- **Redirect** (keep iterating) — the output is mostly on track with fixable issues.
- **Restart / reset context** — the agent has gone down a wrong path, tangled the code, or is thrashing (repeating mistakes, not converging). Sometimes a clean re-prompt with better intent/context beats trying to patch a mess. Recognize when you're in a doom-loop and reset rather than pouring effort into a bad direction.

## Track Progress Against Spec/Plan

Especially for larger work, periodically **assess where the implementation stands versus the spec, plan, and tasks** (spec-kit calls this converge): what's done, what's left, what drifted. This catches the agent quietly missing requirements or wandering off-scope (see spec-plan-consistency-analysis), and turns remaining gaps into concrete next tasks. Don't lose the big picture in the loop.

## Pitfalls (in understanding/using)

- Expecting **one-shot** perfection — it's iterative; the first output is a draft.
- **Vague feedback** ("wrong, try again") → the agent thrashes / produces different wrong output; be specific and directional.
- **Patching a doom-loop** — pouring effort into a tangled wrong path instead of resetting with better context.
- **Losing the big picture** — iterating on details while the implementation drifts from the spec/plan (assess against it).
- Not **verifying** each increment (accepting output that looks right — see reviewing-ai-generated-code).
- Letting scope **creep** across iterations (the agent adding things) — keep it bounded.
- Over-iterating on **trivialities** — know when it's good enough and move on.
- Not persisting decisions/corrections (repeating the same feedback — capture it in context/instructions).
