---
name: mlops-basics
description: Operating ML models in production — the lifecycle beyond training (data/model versioning, reproducible pipelines, deployment, monitoring for data/concept drift, retraining), why ML systems rot silently, and testing data + models. Use when deploying, maintaining, or reasoning about a machine-learning system in production.
category: ai-agent
keywords_vi: mlops cơ bản, đưa model lên production, drift dữ liệu, retrain model, versioning data model, monitor model, pipeline ml, model xuống cấp
---

# MLOps Basics

Training a model is a small part of an ML system; **operating** it in production is the hard part. MLOps applies software-engineering discipline (CI/CD, monitoring, versioning) to machine learning — plus the extra problems ML adds.

## Why ML Systems Are Different

Unlike normal software, an ML system depends on **data**, which changes over time. A model that's accurate today silently **degrades** as the world drifts from its training data — with no error, no crash, just quietly worse predictions. This "silent rot" is the central MLOps problem, and why "deploy and forget" fails for ML.

## The Lifecycle (beyond training)

- **Data versioning** — track *which data* a model was trained on; reproducibility requires versioning data, not just code.
- **Reproducible pipelines** — the path from raw data → features → trained model must be automatable and repeatable (not a notebook run once by hand).
- **Experiment tracking** — log parameters, metrics, and artifacts per run so you can compare and reproduce the best model.
- **Model versioning & registry** — version trained models; know exactly which one is in production and be able to **roll back** (like any deploy).
- **Deployment** — serve the model (real-time API vs batch predictions); consider latency, throughput, and cost (see llm-inference-optimization for LLM-specific serving).
- **Monitoring** — the piece people forget.

## Monitoring & Drift (the key ongoing job)

Watch not just uptime/latency but **prediction quality**:
- **Data drift** — the input distribution shifts (new user behavior, seasonality, a changed upstream source). The model sees inputs unlike its training data.
- **Concept drift** — the relationship between inputs and the right answer changes (fraud patterns evolve, preferences shift).
- Monitor input distributions, prediction distributions, and (when labels arrive) live accuracy against a baseline. Alert on drift.
When drift degrades performance → **retrain** on fresh data and redeploy. Many teams automate this into a retraining pipeline (continuous training).

## Testing ML

You must test the **data** (schema, ranges, nulls, distribution — see data-cleaning) *and* the **model** (does it beat the current one on a held-out set? no regression on key segments?) before promoting it. A model can pass unit tests and still be worse — evaluate it like a candidate (see machine-learning-basics, evaluation).

## Pitfalls

- **Deploy-and-forget** — no monitoring, so silent degradation goes unnoticed until it's costly.
- **No data/model versioning** → can't reproduce or roll back.
- **Training/serving skew** — features computed differently in training vs production → the model behaves worse live than in tests.
- **Manual, unreproducible pipelines** (the notebook someone ran once).
- Ignoring **drift** — the world moves; the frozen model doesn't.
- No rollback plan for a bad model.
