---
name: feature-stores
description: How feature stores work in ML — a central system to define, store, share, and serve features consistently for both training (offline, historical) and serving (online, low-latency), preventing training-serving skew and enabling feature reuse. Use to understand feature stores, online vs offline features, feature reuse, or serving ML features consistently.
category: ai-agent
keywords_vi: feature store trong ml, hệ thống trung tâm định nghĩa lưu chia sẻ phục vụ feature, cho training offline lịch sử và serving online độ trễ thấp, chống training-serving skew, tái dùng feature
---

# Feature Stores

A feature store is a central system for **managing the features** (the input signals) that ML models use — defining them once and serving them **consistently** for both **training** (offline, over historical data) and **serving** (online, at low latency in production). Its two big jobs: **prevent training-serving skew** and enable **feature reuse** across teams and models (see mlops-basics, training-serving-skew).

## The Problem: Features Are Computed Twice (and Diverge)

A model needs the same feature during **training** and **serving** — but these happen in very different places:
- **Training** — compute features over a **large historical batch** (offline, in a data warehouse), for millions of past examples.
- **Serving** — compute the **same** feature for a single request in **milliseconds** (online, in production).
Teams often implement the feature **twice** (a batch SQL job for training, some app code for serving) — and the two **drift apart** (different logic, timing, data). The model then sees **different feature values** in production than it trained on → **training-serving skew**, silently degrading accuracy (see training-serving-skew). Also, every team **re-derives** the same common features ("user's 30-day spend") independently — wasteful and inconsistent.

## The Core Idea: Define Once, Serve Consistently

A feature store centralizes feature management:
- **Feature definitions** — features are **defined once** (transformation logic), registered, discoverable, and reusable across models/teams.
- **Offline store** — holds **historical** feature values (for training and batch scoring), supporting **point-in-time correct** lookups (get the feature value **as it was** at each training example's timestamp — crucial to avoid leakage).
- **Online store** — a low-latency store (Redis/DynamoDB-like) serving the **latest** feature values for **real-time** inference in milliseconds.
- **Consistency** — the **same definition** feeds both stores, so training and serving see the **same** feature logic → skew eliminated.

So the feature store is the bridge that keeps offline (training) and online (serving) features **in sync** and makes features a **shared, governed asset**.

## What It Provides

- **Consistency (anti-skew)** — one definition, used for training and serving.
- **Reuse & discovery** — a catalog of features teams share, instead of reinventing them.
- **Point-in-time correctness** — historical lookups that avoid **data leakage** (never use future data for a past label).
- **Low-latency serving** — online store for real-time features.
- **Freshness** — pipelines keep the online store updated (batch and/or streaming features).
- **Governance/lineage** — know what features exist, who uses them, how they're computed.

## When You Need One (and When You Don't)

- **Need it** — multiple models/teams, real-time serving, many shared features, recurring training-serving skew. Larger ML orgs.
- **Overkill** — a single model, batch-only scoring, a small team. A feature store adds real infrastructure; don't adopt it for a simple project (over-engineering).

## Design Guidance

- **Define features once**; serve the same definition to training and serving (kill skew).
- **Point-in-time joins** for training data — never leak future information into past examples.
- **Online store** for low-latency serving; keep it fresh via batch/streaming pipelines.
- **Reuse** shared features via the catalog; avoid re-deriving common signals.
- **Track lineage/freshness** — stale online features silently hurt predictions.
- **Adopt only when the scale justifies it** — it's infrastructure, not a default.

## Pitfalls (in understanding/using)

- Computing features **twice** (training vs serving) with divergent logic → training-serving skew (see training-serving-skew).
- **No point-in-time correctness** → data leakage (using future data), inflating offline metrics that collapse in production.
- **Stale online features** → the model serves on outdated inputs; monitor freshness.
- Adopting a feature store for a **single simple model** → needless infrastructure.
- Treating it as just a **cache** → its value is *consistency* and reuse, not only speed.
- Ignoring **feature drift** — feature distributions change over time (see ml-model-monitoring-and-drift).
