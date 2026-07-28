---
name: retries-timeouts-and-heartbeats
description: How durable-execution engines make individual steps (activities) reliable — retry policies with backoff, the family of timeouts (schedule-to-start, start-to-close, schedule-to-close), and heartbeats that detect a stuck long-running step and enable resumable progress. Use to understand why idempotency is mandatory with retries, how to pick timeouts, detecting hung workers, and configuring reliable steps in Temporal-style systems.
category: distributed-systems
keywords_vi: chính sách thử lại retry với backoff cho từng bước activity, họ timeout schedule-to-start start-to-close schedule-to-close, heartbeat phát hiện bước chạy dài bị treo và cho tiến trình phục hồi, idempotency bắt buộc khi có retry, chọn timeout hợp lý, phát hiện worker treo trong temporal
---

# Retries, Timeouts & Heartbeats

In durable execution, the **workflow** decides the plan; the **activities** do the real, failure-prone work (API calls, DB writes, file processing). Making those activities reliable is the engine's job, and it does it with three tools: **retry policies**, a family of **timeouts**, and **heartbeats**. Configuring them correctly is most of what "operating" a workflow system is about (see durable-execution-and-workflow-engines, workflow-determinism-and-replay, idempotency).

## Retry Policies

When an activity fails (throws, times out, the worker dies), the engine **automatically retries** it per a **retry policy**: initial interval, backoff coefficient (exponential), maximum interval, maximum attempts, and which errors are **non-retryable** (e.g. "invalid input" should fail fast, "network blip" should retry). This deletes hand-rolled retry loops from your code — but it makes **idempotency mandatory**: a "failure" might be a lost *response* after the work succeeded, so the retry re-runs an activity that already had an effect. **Every activity must be safe to run more than once** (idempotency keys, upserts, dedup) or retries cause double charges/emails/rows.

## The Timeout Family (each catches a different failure)

Temporal-style systems distinguish several timeouts because "it took too long" has different causes:
- **Schedule-to-start** — how long the task may wait in the queue **before a worker picks it up**. Firing means **no available/healthy workers** (capacity/backlog problem), not slow work.
- **Start-to-close** — how long a **single attempt** may run once started. Firing means the work itself is too slow or hung → triggers a retry.
- **Schedule-to-close** — total budget across **all attempts** (queue + runs). Caps the end-to-end time.
- **Heartbeat timeout** — max gap between heartbeats for a long activity (below).

Picking these deliberately is key: a too-short start-to-close kills legitimately slow work and thrashes retries; a too-long one lets a hung activity block for ages. Match each to the real distribution of that phase.

## Heartbeats: Detecting Stuck Long Work

For a **long-running activity** (process 10,000 records, transcode a video), a single start-to-close timeout is a blunt instrument — set it long enough for the whole job and you can't tell a *working* activity from a *hung* one. **Heartbeats** fix this: the activity periodically calls `heartbeat()` to say "still alive, here's my progress." If heartbeats stop for longer than the **heartbeat timeout**, the engine knows the worker **died or hung** and retries — quickly, without waiting for the full job budget. Heartbeats can also carry **progress/checkpoint data**, so a retried activity **resumes from the last checkpoint** (record 7,000) instead of restarting from zero. That makes long activities both **failure-detectable** and **resumable**.

## Design Guidance (for understanding/using)

- **Make every activity idempotent** — retries *will* re-run it after partial success; use idempotency keys/upserts.
- **Set start-to-close from the real per-attempt duration** — long enough for slow-but-valid runs, short enough to catch hangs.
- **Heartbeat long activities** and carry progress, so failures are caught fast and work resumes from a checkpoint.
- **Mark truly fatal errors non-retryable** — don't retry "invalid argument"; fail fast and surface it.
- **Tune schedule-to-start to detect capacity problems** — a firing schedule-to-start says "add workers", not "the work is slow."

## Pitfalls (in understanding/using)

- Non-idempotent activities under automatic retry → **double effects** (charges, emails, duplicate rows).
- One giant **start-to-close** for a long job → can't distinguish working from hung; use **heartbeats**.
- Retrying **non-retryable** errors (bad input, auth failure) → wasted attempts, delayed failure surfacing.
- Confusing the timeouts → e.g. blaming slow work when a firing **schedule-to-start** actually means no workers.
- Not carrying **checkpoint data** in heartbeats → a retried long activity restarts from zero.
