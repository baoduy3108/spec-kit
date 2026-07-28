---
name: durable-execution-and-workflow-engines
description: How to write long-running, failure-proof business processes as ordinary code that survives crashes, restarts, and deploys — durable execution (Temporal/Cadence/DBOS-style). The engine persists every step so a workflow resumes exactly where it left off, turning fragile chains of queues/cron/retries into a single readable function. Use to understand durable execution vs traditional orchestration, workflows vs activities, and when to reach for a workflow engine.
category: distributed-systems
keywords_vi: thực thi bền vững durable execution quy trình chạy dài chịu được sập máy khởi động lại, engine lưu từng bước để workflow tiếp tục đúng chỗ đã dừng, viết quy trình nghiệp vụ như hàm thường thay vì chuỗi queue cron retry mong manh, workflow và activity temporal cadence, khi nào cần workflow engine, trạng thái bền vững qua deploy
---

# Durable Execution & Workflow Engines

Real business processes are **long-running and failure-prone**: "charge the card, if it fails retry with backoff, then reserve inventory, wait up to 3 days for shipping confirmation, otherwise refund." Building that with queues, cron jobs, database status columns, and ad-hoc retry code is a nightmare — state scattered everywhere, impossible to reason about, and a crash mid-process leaves things half-done. **Durable execution** (Temporal, Cadence, DBOS, AWS Step Functions, Azure Durable Functions) solves this by making the *code itself* crash-proof (see saga-pattern, event-sourcing-cqrs, retries-timeouts-and-heartbeats).

## The Core Idea: Code That Survives Anything

You write a **workflow** as an ordinary function — with loops, `if`s, variables, and `await`s — and the engine **persists every step** it takes. If the process crashes, the machine dies, or you deploy new code, the workflow **resumes from exactly where it stopped**, with all its local variables intact, as if nothing happened. A `sleep("3 days")` in the middle is fine: the workflow isn't holding a thread for 3 days; its state is durably stored and rehydrated when the timer fires. This is "durable execution": **the illusion of a process that runs forever without ever losing its place**, even across failures spanning weeks.

## Workflows vs Activities (the key split)

Durable engines split code into two kinds:
- **Workflow** — the **orchestration logic** (the sequence, decisions, retries, waits). It must be **deterministic** (see workflow-determinism-and-replay) because the engine reconstructs its state by **replaying** its history. Workflows don't do I/O directly.
- **Activity** — a single **side-effecting step** (call an API, write a DB row, send an email). Activities *can* fail and are **automatically retried** by the engine per a retry policy; they don't need to be deterministic.

So: the workflow decides *what* to do and *in what order*; activities *do* the actual external work and are the unit of retry/timeout.

## What You Get for Free

- **Automatic retries** with backoff on activity failure — no hand-rolled retry loops.
- **Durable timers** — sleep for seconds or months reliably.
- **Exactly-once effect** on steps (via idempotency + replay), no lost or double-run steps.
- **Full visibility** — the entire history of every workflow (what ran, what's pending) is queryable; debugging becomes "read the event history."
- **Safe long-running state** — survives deploys; you can even patch running workflows.

## When to Use (and Not)

**Use** for multi-step, long-lived, failure-sensitive processes: order fulfillment, payment/refund sagas, user onboarding, data pipelines with human approvals, provisioning, subscription lifecycles, agentic multi-step AI tasks. **Don't** reach for it for simple request/response or a single stateless job — it adds a server/cluster and operational weight. It shines exactly where "a sequence of steps must reliably complete despite failures over time."

## Design Guidance (for understanding/using)

- **Model the process as one workflow function** — the readability win is the point; keep the saga logic in one place, not smeared across queues.
- **Put all side effects in activities** — they're the retryable, non-deterministic boundary; keep workflows pure/deterministic.
- **Lean on built-in retries/timers** — delete your custom retry loops, status columns, and reconciliation cron jobs.
- **Design activities to be idempotent** — retries mean an activity may run more than once; make repeats safe.
- **Reach for it when failure-recovery is the hard part** — that's where it pays for its operational cost.

## Pitfalls (in understanding/using)

- Doing I/O **directly in the workflow** → breaks determinism/replay; all side effects belong in activities.
- Non-idempotent activities → retries cause double charges/emails; make them idempotent.
- Using a workflow engine for **trivial** jobs → unnecessary infra and complexity.
- Treating it as a message queue → it's higher-level orchestration; queues are a building block, not the same thing.
- Assuming the workflow "holds a thread" during long sleeps → its state is persisted and rehydrated; it costs nothing to wait months.
