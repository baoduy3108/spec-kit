---
name: first-principles-review
description: A lightweight first-principles / Occam's-razor decision review to run before committing to a direction — strip inherited assumptions, name the irreducible outcome, and pick the smallest sufficient path. Use when a design/plan/fix has multiple plausible paths with unclear selection criteria, or debugging is drifting into repeated fixes, fallback growth, and "just add another branch" reasoning.
category: ai-agent
keywords_vi: first principles, tư duy từ nguyên lý gốc, occam razor, nhiều hướng giải chưa rõ chọn cái nào, review quyết định hướng đi, đơn giản hóa quyết định, bản chất vấn đề
---

# First-Principles Review

A lightweight decision review to clean the decision surface *before* committing to a direction. It does not replace brainstorming, systematic debugging, planning, or code review — it sharpens the choice those will act on.

## Use When

- The user asks for first-principles thinking or Occam's razor.
- A design, plan, or fix has multiple plausible paths and unclear selection criteria.
- Goals are ambiguous, constraints compete, or there's product/architecture direction risk.
- Debugging is drifting into repeated fixes, fallback growth, duplicate owners, consumer-side patches, or "just add another branch."
- An implementation may be locally correct but directionally wrong.

**Don't use** for simple Q&A, tiny edits, clearly bounded single-owner changes, or as a required step on every task.

## The Five-Line Review

Answer only what's needed, usually five short lines:

```
First Principle:          What irreducible outcome must this satisfy?
Non-negotiables:          What constraints cannot be broken?
Assumptions to Drop:      What is habit, inherited shape, or unproven preference?
Smallest Sufficient Path: The least complex path that satisfies the first principle?
Escalation Signal:        What finding would require spec/design/architecture review?
```

For repair choices, "smallest" means the **smallest sufficient stable repair**, not the smallest textual diff:

```
Minimality Check:
- Smallest textual diff:
- Correct owner:
- Bug class fixed:
- New branch/fallback added:
- Old path retired or scheduled:
- Verdict: sufficient repair | local patch | needs first-principles review
```

## Escalate to Decision Hygiene

Escalate from the five-line review when: multiple plausible paths with no selection criteria; a new/duplicate owner, fallback, adapter, or compat-only carrier appears; an old path may need delete-first handling; an unverified assumption the proposal depends on; or a plan could encode the wrong owner/abstraction/compatibility boundary. Then make explicit: the non-negotiable goal & constraints, historical assumptions to delete, the canonical owner vs old owner vs compat carrier, a retirement/delete-first trigger, and a falsification test (what would disprove the judgment) — ending in a verdict: adopt / revise / reject / needs evidence.

## Architecture Integrity Lens

When a proposal is executable but may still encode the wrong owner or contract boundary, ask: what invariant must remain true for the system to stay coherent? Which owner/contract/source-of-truth should carry the behaviour? What duplicate owner or stale path might still carry real logic? Can the problem be solved at the owner/contract layer instead of by another local branch? What old path retires, or what evidence would disprove this?

## Boundaries

Prefer evidence from current project files, docs, tests, logs, and user requirements. If evidence is missing, mark the line **unknown** rather than inventing a principle. Keep the result advisory — recommend escalation, don't grant completion authority. If the review doesn't change the decision surface, return to the active work immediately.
