---
name: experiment-tracking-and-reproducibility
description: How ML experiment tracking works — logging every run's code version, data version, hyperparameters, metrics, and artifacts so experiments are comparable and reproducible, and why ML reproducibility is uniquely hard. Use to understand experiment tracking (MLflow/W&B), reproducible ML, comparing model runs, or versioning data and models together.
category: ai-agent
keywords_vi: theo dõi thí nghiệm ml, experiment tracking, mlflow, ghi param metric artifact, phiên bản dữ liệu tái lập, so sánh run, reproducibility ml khó, wandb
---

# Experiment Tracking and Reproducibility

ML development is **experimental** — you run hundreds of training variations (different data, features, hyperparameters, architectures). Without systematic tracking, you can't remember what produced the best model or **reproduce** it. Experiment tracking logs **every run's full context** so experiments are **comparable** and **reproducible** — which is much harder in ML than in normal software (see mlops-basics, reproducible-builds-and-caching).

## The Problem: "Which Run Was That? How Do I Reproduce It?"

Training a model involves many moving parts, and you try many combinations. Later you ask: *which* configuration gave that great result? Can I **reproduce** it? Without tracking, the answers are lost — the notebook was overwritten, the data changed, the hyperparameters weren't recorded. Worse, ML has **more sources of variation** than regular code, so "same code" doesn't mean "same result."

## Why ML Reproducibility Is Uniquely Hard

Reproducing an ML result requires pinning **more** than code:
- **Data** — the exact training dataset **and its version** (data changes over time; a different snapshot → a different model). This is the big one code-versioning alone misses.
- **Code** — model code, feature/preprocessing code (version-pinned — see reproducible-builds-and-caching).
- **Hyperparameters** — learning rate, batch size, epochs, seeds, architecture config.
- **Environment** — library versions (a different framework version changes results), hardware (GPU vs CPU numerics).
- **Randomness** — random seeds for initialization, shuffling, augmentation (unset → non-reproducible).
Miss any and you can't reproduce the model. So ML reproducibility = **code + data + params + environment + seeds**, all versioned together.

## The Core Idea: Log Every Run's Full Context

An experiment tracker (MLflow, Weights & Biases, etc.) records, for **each training run**:
- **Parameters** — hyperparameters, config.
- **Metrics** — accuracy, loss, and business metrics, over time (learning curves).
- **Code version** — the git commit.
- **Data version** — which dataset/version was used (data versioning, e.g. DVC).
- **Artifacts** — the trained model, plots, sample predictions.
- **Environment** — dependencies, hardware.
Then you can **compare** runs side by side ("run A beat run B — here's exactly what differed"), **reproduce** any run from its logged context, and build a searchable history instead of a graveyard of forgotten notebooks. This turns chaotic experimentation into a systematic, auditable process.

## Design Guidance

- **Track every run automatically** — params, metrics, code commit, data version, artifacts, environment.
- **Version data**, not just code — the dataset is part of the experiment (DVC or a data-versioning approach).
- **Set and log random seeds** — for reproducible runs (accepting hardware numerics may still vary slightly).
- **Log the environment** (dependency versions) — a library bump can change results.
- **Compare runs** to understand what drives performance, not just pick the best number.
- **Link runs to the model registry** (see model-registry-and-versioning) so a deployed model traces back to its exact experiment.
- **Accept "reproducible enough"** — exact bit-identical ML is often impractical (hardware/parallelism nondeterminism); aim for reproducible results within tolerance.

## Pitfalls (in understanding/using)

- **Not versioning data** → "same code" produces a different model; the run is irreproducible.
- **Unset random seeds** → runs aren't reproducible even with identical config.
- Tracking only **the final metric** → can't tell *why* a run was better; log params + curves.
- Ignoring **environment/library versions** → a dependency change silently alters results.
- **Overwriting notebooks / no logging** → the best model's recipe is lost forever.
- Expecting **bit-identical** reproducibility from GPU/parallel training → nondeterminism exists; aim for within-tolerance reproducibility.
- No link from a **deployed model** back to its experiment → can't audit or reproduce production models.
