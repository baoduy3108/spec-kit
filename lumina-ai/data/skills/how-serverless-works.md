---
name: how-serverless-works
description: How serverless / Functions-as-a-Service works — event-triggered functions that the platform runs and scales automatically, statelessness, cold starts, pay-per-execution, and the trade-offs vs always-on servers. Use to understand serverless (Lambda/Cloud Functions/edge functions), cold starts, and when serverless fits vs when it doesn't.
category: engineering
keywords_vi: serverless hoạt động thế nào, faas function as a service, lambda cloud functions, cold start, tự scale trả theo lần chạy, edge function, khi nào dùng serverless, hiểu serverless
---

# How Serverless Works

"Serverless" doesn't mean no servers — it means **you don't manage them**. You upload a **function**; the platform runs it on demand, scales it automatically, and bills you only for actual execution.

## The Model

You write a small **function** triggered by an **event** — an HTTP request, a file upload, a queue message, a schedule (cron), a database change. The platform (AWS Lambda, Cloud Functions, Vercel/Cloudflare edge functions):
1. Receives the event.
2. **Spins up an instance** of your function (in a container/microVM), runs it, returns the result.
3. **Scales automatically** — 1 request or 10,000 concurrent, it launches as many instances as needed, then tears them down when idle.
4. **Bills per execution** (invocations × duration × memory) — **zero cost when idle**, no always-on server to pay for.

## Statelessness (a hard requirement)

Function instances are **ephemeral** — created and destroyed at will, and you don't know which instance handles which request. So functions must be **stateless**: keep no in-memory state between invocations; store all state externally (a database, object storage, cache). Anything written to the local disk/memory can vanish. This is what lets the platform scale instances freely.

## Cold Starts (the main gotcha)

When a function hasn't run recently (or needs a new instance to scale), the platform must **initialize** a fresh environment — load the runtime, your code, dependencies, connect to resources. This first-invocation delay is a **cold start** (tens of ms to several seconds, worse for big dependencies/heavy runtimes). Subsequent calls to a **warm** instance are fast. Cold starts hurt latency-sensitive, spiky, or rarely-called functions. Mitigations: keep functions small/light, minimize dependencies, use lighter runtimes, provisioned concurrency (keep some warm), or edge runtimes with near-zero cold start.

## When Serverless Fits (and doesn't)

**Good for**: event-driven and spiky/unpredictable workloads, APIs with variable traffic, background jobs, webhooks, scheduled tasks, glue between services, and getting to zero-cost-when-idle. Great for scaling to zero and to huge bursts without capacity planning.

**Poor for**: long-running or heavy-compute tasks (execution time limits, e.g. ~15 min), latency-critical paths sensitive to cold starts, workloads needing persistent connections/state, very high sustained traffic (an always-on server can be cheaper than millions of invocations), and apps needing lots of local state or special runtimes.

## Why It Matters

Explains: why serverless costs nothing when idle but functions must be stateless, why the first/scaling request is slow (cold start), the execution-time and connection limits, and why it's ideal for spiky event-driven work but not for everything. Understand the trade-off: you trade control and steady-state cost for zero-ops auto-scaling.

## Pitfalls

- **Statefulness** — assuming in-memory/local disk persists (it doesn't).
- **Cold starts** on latency-sensitive paths (or bloated functions).
- **Execution/timeout limits** — long jobs get killed; use queues/step functions.
- **Database connection storms** — thousands of function instances each opening DB connections; use a connection pooler/proxy.
- **Cost surprises** at very high volume (per-invocation adds up) — model it.
- **Vendor lock-in** and local-testing friction.
