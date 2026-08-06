---
name: signals-queries-and-workflow-interaction
description: How the outside world interacts with a running durable workflow — signals (send it an async event/input), queries (read its current state without changing it), and the wait-for-condition pattern for human-in-the-loop and long-lived processes. Use to understand asynchronous input to workflows, reading progress safely, timers vs signals for waiting, and building approval/coordination flows in Temporal-style engines.
category: distributed-systems
keywords_vi: tương tác với workflow đang chạy signal query, signal gửi sự kiện đầu vào bất đồng bộ vào workflow, query đọc trạng thái hiện tại mà không thay đổi, mẫu chờ điều kiện wait-for-condition cho người tham gia human-in-the-loop, chờ tín hiệu hay hết giờ timer, luồng phê duyệt và điều phối
---

# Signals, Queries & Workflow Interaction

A durable workflow can run for days or months, so it needs to **communicate with the outside world while running** — receive new input, report progress, wait for a human to approve something. Durable-execution engines expose three primitives for this: **signals** (push data in), **queries** (read state out), and **wait-for-condition** (block until something happens). Together they turn workflows into interactive, long-lived coordinators rather than fire-and-forget scripts (see durable-execution-and-workflow-engines, workflow-determinism-and-replay, retries-timeouts-and-heartbeats).

## Signals — Asynchronous Input

A **signal** delivers an **asynchronous message into a running workflow**: "the user clicked approve", "add this item to the order", "cancel", "price updated." The workflow has a signal handler that updates its internal state or unblocks a waiting step. Key properties:
- **Durable and buffered** — signals are recorded in the workflow's event history (part of replay), so they're not lost across crashes and arrive exactly as sent.
- **One-way** — the sender doesn't get a return value; it's a notification, not a call.
- Signals are the standard way to feed **external events** into an otherwise-deterministic workflow (remember: the workflow can't poll an API itself — see determinism).

## Queries — Read State Without Mutating

A **query** reads the workflow's **current in-memory state** — "what step are we on?", "how many items processed?", "what's the order status?" — **without changing anything**. Properties:
- **Read-only and side-effect-free** — a query handler must not mutate state or call activities (it runs against replayed state and must be deterministic/pure).
- **Synchronous** — returns a value immediately, great for dashboards and status endpoints.
- Contrast with heartbeats (progress *of an activity*): queries expose the *workflow's* state.

## Wait-for-Condition — The Human-in-the-Loop Pattern

The pattern that ties it together: a workflow reaches a point where it must **wait for something external**, so it **blocks on a condition** (`await condition(() => approved || cancelled)`), optionally with a **timer** as a deadline. A signal flips the flag and the workflow proceeds; if the timer fires first, it takes the timeout path (e.g. auto-reject after 3 days). This is how you build:
- **Approval flows** — wait for a manager's signal, or escalate after a timeout.
- **Long coordination** — wait for N sub-tasks to signal completion.
- **Interactive/agentic processes** — pause for user input, resume on signal.
It's a clean, race-free way to combine *waiting for humans* with *waiting for time*, all durably.

## Design Guidance (for understanding/using)

- **Use signals for external events/input**, not polling — the workflow can't call out; the outside world signals in.
- **Keep query handlers pure** — read state only; never mutate or do I/O in a query.
- **Combine wait-for-condition with a timer** for human-in-the-loop — proceed on signal, fall back on timeout.
- **Model status via queries** — expose workflow progress to UIs/dashboards without touching the process.
- **Design signal handlers to be replay-safe** — they update deterministic workflow state; heavy work still belongs in activities.

## Pitfalls (in understanding/using)

- Trying to **poll** an external system from inside a workflow → non-deterministic; receive events via **signals** instead.
- Mutating state or calling activities **in a query handler** → queries must be read-only/pure.
- Waiting on a condition **without a timeout** → a workflow can hang forever if the signal never comes; add a timer deadline.
- Expecting a **return value** from a signal → signals are one-way; use a query or another signal for the response.
- Assuming signals can be lost like a raw message → they're durably recorded in history (unlike a fire-and-forget queue message without persistence).
