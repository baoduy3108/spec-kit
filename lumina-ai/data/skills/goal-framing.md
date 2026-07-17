---
name: goal-framing
description: A structured method for establishing task boundaries before execution — capture the requested outcome, explicit success criteria, stop conditions (done / blocked / needs-verification / scope-exceeded), non-goals, and constraints, then start work. Use for deliberate framing of a non-trivial task, or when the goal or "definition of done" is unclear before starting.
category: ai-agent
keywords_vi: xác định mục tiêu trước khi làm, điều kiện dừng, stop condition, khung mục tiêu, định nghĩa done trước khi bắt đầu, non-goal, làm rõ phạm vi trước khi bắt đầu
---

# Goal Framing

Establish task boundaries *before* execution so work has a clear target and a clear finish line. This is for deliberate framing of non-trivial work — not routine tasks.

## When to Frame

Use when the goal, success criteria, or stop condition is unclear before starting; when the user says "define the goal / stop condition before we start"; or when the task is multi-step and easy to over- or under-scope. Skip for simple, low-risk, clearly bounded tasks.

## The Frame

Capture a compact task-intent before doing the work:

- **Requested outcome** — what the user actually wants, in their words.
- **Success criteria** — observable conditions that mean the outcome is achieved.
- **Stop conditions** — the finish states the work can reach:
  - *done* — success criteria met;
  - *blocked* — cannot proceed without an external input/decision;
  - *needs-verification* — believed done but requires a check to confirm;
  - *scope-exceeded* — the work has grown beyond the original frame.
- **Non-goals** — things explicitly out of scope, to prevent scope creep.
- **Constraints** — hard limits (time, tools, compatibility, style) the work must respect.

The frame **initiates** work — it's a launch point, not a final deliverable. Proceed to implementation immediately after framing unless the user asked for the frame only.

## Routing After Framing

Route the work by its shape: simple/low-risk → do it directly; failures or unexpected behaviour → systematic debugging; unclear product/architecture decision → brainstorming; large multi-step effort → break into slices and continue across steps.

## Handling Drift

If the goal shifts during execution, **document the drift** explicitly (what changed, why, and the new frame) rather than silently altering the original goal. This keeps the finish line honest and lets the user re-approve if the target moved.

## Delegation

When handing part of the work to a sub-task or another agent, pass a compact context packet — essential facts, known unknowns, and file/reference pointers — not the full conversation transcript or unbounded logs.
