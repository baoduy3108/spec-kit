---
name: sop-writing
description: Write a Standard Operating Procedure anyone can follow — plain language at a low reading level, short sentences, one action per numbered step, calibrated to the audience's skill level, with prerequisites, decision points, and a verification checklist. Use when documenting a repeatable process or writing an SOP/runbook.
category: engineering
keywords_vi: viết sop, quy trình chuẩn, standard operating procedure, tài liệu quy trình, hướng dẫn từng bước, viết quy trình vận hành, runbook, quy trình lặp lại
---

# SOP Writing

A good Standard Operating Procedure lets someone unfamiliar complete the task correctly without asking questions. Optimize for *followability*, not completeness.

## Writing Rules

- **Low reading level** — write so a non-expert (aim ~5th-grade reading level) can follow; simple words over jargon.
- **Short sentences** — 10–15 words max. One idea per sentence.
- **One action per step** — numbered steps, each a single concrete action. If a step has an "and", it's probably two steps.
- **Imperative voice** — "Click Save", not "The user should click Save".
- **Name things exactly** — exact button labels, menu names, file paths, values. No "the usual place."

## Structure

1. **Title & purpose** — what this SOP accomplishes and when to use it.
2. **Audience & skill level** — who runs this; calibrate detail accordingly (a junior needs more, an expert less).
3. **Prerequisites** — access, tools, inputs, and state required before starting.
4. **Steps** — numbered, one action each, in execution order.
5. **Decision points** — where the path forks: "If X, go to step 7; otherwise continue."
6. **Verification** — how to confirm each critical step (and the whole task) succeeded — the observable signal, not "make sure it worked."
7. **Rollback / what-if** — what to do if a step fails.

## Calibrate to the Audience

Match detail to reader skill: for a first-timer, spell out every click and expected result; for an expert, collapse routine steps and keep only the non-obvious ones. Writing an expert-level SOP for a beginner (or vice-versa) is the most common failure.

## Quality Checklist

- [ ] Could someone who's never done this follow it without asking?
- [ ] Is every step a single action with an exact target?
- [ ] Are prerequisites listed before step 1?
- [ ] Does each critical step have a verification signal?
- [ ] Are decision points explicit ("if…then…")?
- [ ] Is there a path for when a step fails?
