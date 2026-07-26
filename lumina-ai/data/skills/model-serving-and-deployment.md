---
name: model-serving-and-deployment
description: How ML models are served in production — batch vs online (real-time) vs streaming inference, the model server, latency/throughput trade-offs, scaling, and safe rollout (shadow, canary, champion/challenger). Use to understand model serving, batch vs real-time inference, deploying ML models, model servers, or safely rolling out a new model.
category: ai-agent
keywords_vi: phục vụ model, triển khai model, batch vs online inference, real-time streaming inference, model server, shadow canary champion challenger, đánh đổi độ trễ throughput serving
---

# Model Serving and Deployment

Training a model is only half the job — to deliver value it must be **served** in production, turning inputs into predictions reliably, fast enough, at the needed scale. Serving has its own architecture decisions (**batch vs online vs streaming**), performance trade-offs, and **safe-rollout** strategies distinct to ML (a new model can be *worse* in ways tests don't catch) — see mlops-basics, ml-model-monitoring-and-drift.

## The Three Serving Patterns

Choose based on **when** predictions are needed:
- **Batch (offline) inference** — periodically score a **large set** of inputs and store the results (e.g. nightly compute recommendations for all users). High throughput, no latency pressure, simple. But predictions are **stale** (as old as the last batch) — fine when inputs change slowly.
- **Online (real-time) inference** — score a **single** input **on demand**, synchronously, in **milliseconds** (e.g. fraud check at checkout). Fresh and responsive, but you must meet a **latency budget** and handle load/scaling. The demanding case.
- **Streaming inference** — score events from a continuous stream in near-real-time (e.g. per event in a Kafka pipeline). For event-driven systems.
Many systems combine them (batch for the heavy stuff, online for fresh requests).

## The Model Server and Performance

Online serving usually runs the model behind a **model server** (TorchServe, Triton, BentoML, or a custom service) exposing an API. Key concerns:
- **Latency vs throughput** — real-time needs **low latency** (fast single predictions); batch needs **high throughput** (many predictions/sec). **Batching** requests (grouping inputs) boosts throughput but adds latency — a core trade-off (see how-gpus-work, how-kv-cache-works for the LLM analog).
- **Hardware** — CPU vs GPU; GPUs help large models but cost more and want batching.
- **Optimization** — quantization/distillation (see how-model-quantization-works) to hit latency/cost targets.
- **Scaling** — autoscale replicas to demand (see autoscaling-strategies); handle spikes.
- **Preprocessing parity** — apply the **same** feature/preprocessing at serving as training (see training-serving-skew).

## Safe Rollout: A New Model Can Be Silently Worse

Unlike code (where tests catch regressions), a new model can pass all tests yet **perform worse on real traffic** in ways you can't fully predict offline. So ML rollout uses careful strategies (beyond normal blue-green/canary — see blue-green-canary-deploys):
- **Shadow deployment (dark launch)** — run the new model **alongside** the old on **real traffic**, but **don't use** its predictions (log them). Compare its outputs to the live model with zero user risk — the safest way to validate a new model on production data.
- **Canary** — route a **small %** of real traffic to the new model, watch metrics, expand if healthy.
- **Champion/challenger (A/B)** — run the new "challenger" against the current "champion" on split traffic and **measure real outcomes** (business metrics, not just offline accuracy) to decide (see ab-testing).
- **Rollback plan** — keep the old model ready to switch back instantly.

## Design Guidance

- **Pick the pattern by latency need** — batch for slow-changing/bulk, online for real-time, streaming for event-driven.
- **Meet the latency budget** — optimize (quantize/distill), batch where acceptable, use the right hardware.
- **Ensure preprocessing parity** with training (anti-skew).
- **Shadow, then canary, then champion/challenger** — validate new models on real traffic before full rollout.
- **Measure real outcomes** on rollout, not just offline metrics (a better offline score can be worse live).
- **Autoscale** and plan for spikes; keep a fast **rollback**.
- **Monitor** the served model for drift/decay (see ml-model-monitoring-and-drift).

## Pitfalls (in understanding/using)

- Deploying a new model straight to **100%** based on offline metrics → it can be silently worse live; shadow/canary first.
- **Online serving** without a latency budget/optimization → too slow under load.
- **Preprocessing mismatch** at serving vs training → training-serving skew.
- Using **batch** (stale) predictions where **real-time** freshness is required (or vice versa — over-engineering online when batch suffices).
- No **rollback** path → a bad model change is hard to undo.
- Judging rollout by **offline accuracy** alone → measure real business outcomes.
- Ignoring **scaling** → the model server falls over at peak traffic.
