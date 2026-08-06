---
name: diagnosing-bugs
description: Six-phase methodology for systematically resolving difficult bugs and performance issues: build a feedback loop, reproduce and minimise, hypothesise, instrument, fix and regression test, cleanup. Use when facing a hard-to-reproduce bug or performance issue.
category: engineering
keywords_vi: chẩn đoán bug, debug khó, feedback loop, hypothesis testing, khó tìm nguyên nhân, bug khó tái hiện, bug khó reproduce
---

# Diagnosing Bugs — Structured Debugging Discipline

This guide presents a six-phase methodology for systematically resolving difficult bugs and performance issues.

## Core Philosophy

The approach prioritizes building a **tight feedback loop** as the foundational skill. If you have a tight pass/fail signal for the bug — one that goes red on this bug — you will find the cause; bisection, hypothesis-testing, and instrumentation all just consume it.

## The Six Phases

**Phase 1: Build a Feedback Loop**
Construct a red-capable test or script that triggers the bug reliably. Try approaches in order: failing tests, curl scripts, CLI invocations, browser automation, trace replay, throwaway harnesses, fuzzing, bisection, differential testing, and human-in-the-loop scripts.

**Phase 2: Reproduce & Minimise**
Confirm the loop reproduces the user's exact symptom, then progressively eliminate non-essential elements until only load-bearing components remain.

**Phase 3: Hypothesise**
Generate 3–5 ranked, falsifiable hypotheses before testing. Each should predict specific outcomes.

**Phase 4: Instrument**
Use debuggers or targeted logging (with unique tags like `[DEBUG-a4f2]`) to test predictions. For performance bugs, establish baseline measurements before investigating.

**Phase 5: Fix & Regression Test**
Write regression tests at appropriate architectural seams, apply fixes, and verify against the original scenario.

**Phase 6: Cleanup & Post-Mortem**
Remove debug instrumentation, document findings in commit messages, and identify architectural improvements for future prevention.
