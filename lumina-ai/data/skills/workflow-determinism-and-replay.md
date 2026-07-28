---
name: workflow-determinism-and-replay
description: Why durable-execution workflows must be DETERMINISTIC, and how event-sourced replay reconstructs their state after a crash. The engine re-runs the workflow code against a saved event history; any non-determinism (random, clocks, direct I/O, map iteration order, new code paths) makes replay diverge and corrupt the workflow. Use to understand replay, why side effects go in activities, workflow versioning/patching, and the classic non-determinism bugs.
category: distributed-systems
keywords_vi: tính tất định determinism của workflow trong durable execution, phát lại replay dựng lại trạng thái từ lịch sử sự kiện event-sourced, mọi ngẫu nhiên đồng hồ i/o trực tiếp thứ tự lặp map phá vỡ replay, side effect phải nằm trong activity, phiên bản hoá workflow versioning patching, lỗi non-determinism kinh điển
---

# Workflow Determinism & Replay

Durable execution's magic — a function that resumes exactly where it crashed, weeks later, with all variables intact — rests on one mechanism: **replay**. The engine doesn't snapshot memory; it **records every result** the workflow observed into an **event history**, and to restore state it **re-executes the workflow code from the top**, feeding back those recorded results instead of doing the work again. This only works if the code is **deterministic** — the same history must always drive the code down the same path. Violate that and replay diverges, corrupting the workflow. Understanding this explains *all* the "weird rules" of workflow code (see durable-execution-and-workflow-engines, event-sourcing-cqrs, retries-timeouts-and-heartbeats).

## How Replay Works

Every time a workflow calls an activity, starts a timer, or receives a signal, the engine appends the **result** to the workflow's persisted **event history** (`ActivityCompleted(result=...)`, `TimerFired`, `SignalReceived(...)`). After a crash or on a fresh worker, the engine **replays** the workflow function: it runs your code again, but when the code "calls an activity," the engine **doesn't re-run it** — it returns the recorded result from history. Line by line, the workflow re-derives its exact prior state (local variables, position in loops) until it catches up to where it left off, then continues live. So the code is the *program*, the history is the *input tape*, and replay must be **reproducible**.

## Why Non-Determinism Is Fatal

If the code takes a **different path** during replay than it did originally, the "commands" it issues won't match the recorded history — the engine detects a **non-determinism error** and the workflow is stuck/corrupt. Sources of non-determinism to avoid **inside workflow code**:
- **Direct I/O / network / DB** — results differ each run; must go in **activities**.
- **`random()`** and **UUID generation** — different every replay; use the engine's deterministic random/side-effect API.
- **System clock / `now()`** — use the engine's workflow-time, not wall-clock.
- **Iterating a hash map/set** whose order isn't guaranteed — use ordered collections.
- **Threads / concurrency** with unpredictable scheduling.
- **Global mutable state** outside the workflow.

The rule of thumb: a workflow may only get "outside information" through **activities, signals, timers, and the engine's deterministic helpers** — never directly.

## Versioning: Changing Code Under Running Workflows

A subtle trap: you deploy **new workflow code**, but there are **in-flight** workflows whose histories were produced by the **old** code. Replaying old histories against new code can diverge (you added a step, changed a branch). Engines provide **versioning/patching** APIs (`getVersion`/`patched`) so the workflow can branch: "if this history predates the change, do the old thing; else the new thing." This lets you evolve long-lived workflows without breaking the ones already running — a discipline unique to durable execution.

## Design Guidance (for understanding/using)

- **Keep workflow code pure and deterministic** — no I/O, no `random`, no wall-clock; those live in activities or engine helpers.
- **Route all external/non-deterministic work through activities** — that's the sanctioned non-deterministic boundary.
- **Use the engine's time/random/side-effect APIs** when you need "now", randomness, or a one-off side effect inside a workflow.
- **Version/patch changes** to workflow logic so in-flight histories still replay correctly.
- **Test with replay** — replay old histories against new code in CI to catch non-determinism before deploy.

## Pitfalls (in understanding/using)

- Calling an API / DB / `now()` / `random()` **directly in a workflow** → replay diverges; non-determinism error.
- Iterating an **unordered** map/set in workflow code → order changes between replays → corruption.
- Deploying changed workflow logic **without versioning** → breaks in-flight workflows on replay.
- Assuming replay **re-runs** activities → it returns their **recorded** results; activities run once (plus retries), not on every replay.
- Sharing mutable global state into a workflow → hidden non-determinism.
