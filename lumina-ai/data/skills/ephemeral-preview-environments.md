---
name: ephemeral-preview-environments
description: How ephemeral/preview environments work — spinning up a full, isolated, disposable copy of the app per pull request (or branch) for testing/review, then tearing it down automatically, plus the data-seeding and cost challenges. Use to understand preview environments, per-PR environments, ephemeral test environments, or reviewing changes in a live deployment.
category: engineering
keywords_vi: môi trường preview tạm thời, dựng bản sao app đầy đủ cô lập cho mỗi pull request, kiểm thử review rồi tự hủy, thách thức seed dữ liệu và chi phí, per-pr environment
---

# Ephemeral / Preview Environments

An ephemeral (preview) environment is a **full, isolated, disposable copy of your application** spun up automatically **per pull request** (or branch), so reviewers and stakeholders can **test the change in a live running app** — not just read the diff — then torn down when the PR merges/closes. It shortens feedback loops and catches issues static review misses (see ci-cd-and-automation, blue-green-canary-deploys, infrastructure-as-code).

## The Problem: Diffs and Shared Staging Aren't Enough

Reviewing code by reading a diff misses how it **actually behaves** — UI changes, integration bugs, real interactions. A **shared staging** environment helps, but it's a **bottleneck**: one environment, many PRs queuing, changes stepping on each other, "works on staging" ambiguity about *whose* change. What you want is: **each change gets its own live environment** to validate in isolation.

## The Core Idea: One Disposable Environment Per Change

On opening a PR, CI **automatically provisions a complete, isolated instance** of the app (frontend, backend, dependencies) — usually at a unique URL — reflecting **that PR's code**. Reviewers click the link and **use the real app** with the change. When the PR merges or closes, the environment is **automatically destroyed**. Key properties:
- **Isolated** — each PR's environment is separate; changes don't interfere.
- **Ephemeral** — created on demand, destroyed after; nothing lingers.
- **Automated** — provisioned/torn down by CI, no manual setup.
- **Reproducible** — built from **infrastructure-as-code** so every environment is consistent (see infrastructure-as-code).

This turns "review the code" into "**try the change**", and gives PMs/designers a live link.

## What Makes It Work

- **IaC + containers** — the whole environment defined as code (Kubernetes namespace, Terraform, Docker Compose) so it's spun up identically per PR.
- **Automation in CI** — provision on PR open/update, tear down on close (this lifecycle automation is the crux).
- **Unique routing** — a URL per environment (`pr-1234.preview.app`).

## The Hard Parts

- **Data seeding** — a fresh environment needs realistic **test data**. Options: seed a fixture dataset, clone/anonymize a snapshot (careful with PII — see data-anonymization-and-pseudonymization), or point at shared test data. Getting representative-but-safe data is often the hardest part.
- **External dependencies** — third-party APIs, payment gateways, email — use **sandboxes/mocks**, not production services.
- **Cost** — dozens of live environments cost money; **auto-teardown**, **scale-to-zero** when idle, and TTLs are essential to control spend.
- **Statefulness / migrations** — databases and schema migrations per environment add complexity.
- **Build time** — slow provisioning hurts the fast-feedback goal; optimize (caching, lightweight environments).

## Design Guidance

- **Define environments as code** (IaC + containers) for reproducibility and easy teardown.
- **Automate the full lifecycle** in CI — create on PR, destroy on merge/close (never leave orphans).
- **Seed safe, representative data** — fixtures or anonymized snapshots; never real PII/production data.
- **Sandbox external services** — mocks/test modes, not production integrations.
- **Control cost** — auto-teardown, TTLs, scale-to-zero when idle; alert on orphaned environments.
- **Keep provisioning fast** — cache builds; make environments lightweight.
- **Namespace/isolate** so environments can't affect each other or production.

## Pitfalls (in understanding/using)

- **Orphaned environments** (teardown fails/forgotten) → runaway cost; automate + TTL + alert.
- Using **production** data/services in previews → PII exposure and real side effects (charges, emails).
- **No/poor test data** → the environment looks empty/broken, defeating the review value.
- **Slow provisioning** → kills the fast-feedback benefit.
- Environments **not truly isolated** → PRs interfere, or a preview touches production.
- Ignoring **cost** at scale → many live environments add up fast.
- Forgetting **DB migrations/state** per environment → broken or inconsistent previews.
