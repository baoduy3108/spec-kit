---
name: capability-abstraction-and-backend-routing
description: Designing a capability layer that abstracts WHAT a system does from HOW it's implemented — defining each capability against an ordered list of interchangeable backends with automatic health-based fallback, so switching providers means reordering a list, not rewriting code. Use to design provider-agnostic integrations, multi-backend fallback routing, abstraction over implementations, or a capability layer.
category: engineering
keywords_vi: lớp năng lực trừu tượng hóa, tách cái gì khỏi cách làm, danh sách backend thay thế được có thứ tự, fallback tự động theo health, đổi nhà cung cấp là đổi thứ tự danh sách không viết lại code, provider-agnostic
---

# Capability Abstraction and Backend Routing

A powerful integration pattern: define **what** a system needs to do (a *capability*) separately from **how** it's done (the *backend/provider*), and back each capability with an **ordered list of interchangeable implementations** plus **automatic fallback** when one fails. The payoff: switching or adding providers becomes **reordering a list, not rewriting code**. It's the pattern behind resilient multi-provider systems — LLM engine fallback chains, payment-gateway routing, "read any platform" agent layers (see tool-design, retries-and-resilience).

## The Problem: Locking Into One Implementation

Naively, code calls a specific provider directly (`callTwitterAPI()`, `useOpenAI()`). This couples your logic to that provider: if it goes down, changes pricing, gets rate-limited, or you want to add an alternative, you must **rewrite** call sites scattered through the code. Real systems need **multiple ways** to accomplish the same thing (redundancy, cost, coverage) and to **swap** them freely. Direct coupling makes that painful.

## The Core Idea: Capability ≠ Implementation

Separate the two layers:
- **Capability** (the *what*) — an abstract operation your system needs: "read a web page", "search the internet", "send a payment", "get a completion". Defined by a **stable interface**, independent of any provider.
- **Backends** (the *how*) — concrete implementations of that capability: different APIs, tools, or services, each conforming to the capability's interface (the **adapter** pattern — each backend adapts a provider to the common interface).
Your code calls the **capability**; the routing layer picks a backend. This is ports-and-adapters / strategy thinking applied to integrations.

## Ordered Backends + Automatic Fallback

Each capability holds an **ordered list** of backends (primary first, then fallbacks). The router tries them in order:
1. Call the **first** backend.
2. If it **fails** (error, timeout, unavailable, rate-limited), **fall through** to the next — automatically, without user intervention (see retries-and-resilience, circuit breaker in retries-and-resilience).
3. Return the first success; only surface an error if **all** backends fail.
The transformative property: **changing integration strategy = editing the ordered list** (add, remove, reorder backends) — **not rewriting code**. Add a new provider by writing one adapter and inserting it in the list.

## Health Monitoring (the "doctor")

Fallback works better when you **know** each backend's status. A **health-check / diagnostic** ("is each backend operational?") lets you:
- **Skip** known-down backends proactively instead of failing into them.
- **Surface** to operators which providers are healthy (a `doctor` command / status page).
- **Route** around degraded providers automatically.
Combine with a **circuit breaker** (stop hammering a failing backend) for resilience (see retries-and-resilience).

## Design Guidance

- **Define capabilities as stable interfaces**; keep provider specifics behind adapters.
- **Ordered list per capability** — primary + fallbacks; config-driven so ops can reorder without deploys.
- **Adapters normalize** each backend to the common interface (inputs, outputs, errors).
- **Automatic fallback** on failure; only error when all exhausted.
- **Health-check each backend**; skip known-down ones; expose a diagnostic.
- **Normalize errors** across backends so callers handle failures uniformly.
- **Keep credentials/config local** and per-backend (see secrets-management).
- Beware **semantic differences** — backends aren't always identical (quality, features, formats); the interface must paper over what matters and document what differs.

## Pitfalls (in understanding/using)

- **Direct coupling** to one provider → swapping/adding means rewriting scattered call sites.
- **Leaky abstraction** — the capability interface exposes provider-specific quirks, so callers still depend on the backend.
- Assuming backends are **identical** → they differ in quality/format/features; fallback can silently degrade results (label/monitor it).
- **No health checks** → repeatedly failing into a down backend, adding latency.
- **Inconsistent error handling** across backends → callers can't reason about failures.
- **Hardcoded** ordering → can't reroute without a deploy; make it config-driven.
- Over-abstracting **trivial** single-provider needs → needless indirection; use this where multiple backends/resilience genuinely matter.
