---
name: model-registry-and-versioning
description: How a model registry works — a central catalog that versions trained models, tracks their lineage (data/code/experiment), manages lifecycle stages (staging/production/archived), and enables safe promotion and rollback. Use to understand model registries, model versioning, model lineage, promoting models to production, or rolling back a model.
category: ai-agent
keywords_vi: model registry, staging production archived, promote rollback, lineage model, versioning model đã train, danh mục model, provenance model, đăng ký model
---

# Model Registry and Versioning

A model registry is the **central catalog of trained models** — it versions each model, records **where it came from** (which data, code, and experiment produced it), tracks its **lifecycle stage** (staging → production → archived), and enables **safe promotion and rollback**. It's the "source of truth" bridging experimentation and deployment, so you always know **what's running in production and how to reproduce or revert it** (see experiment-tracking-and-reproducibility, model-serving-and-deployment).

## The Problem: Which Model Is in Production, and Where Did It Come From?

After many experiments you have **many trained models**, and questions pile up: Which version is **live** right now? What **data and code** produced it? Is the new one better? How do I **roll back** if it misbehaves? Storing model files in ad-hoc folders (`model_final_v2_really_final.pkl`) loses all this. A registry makes models **first-class, versioned, governed artifacts**.

## What a Registry Provides

- **Versioning** — every trained model gets a **version**; you can list, compare, and retrieve any version (not overwrite).
- **Lineage / provenance** — each version links to the **experiment** that produced it: the **data version**, **code commit**, hyperparameters, and metrics (see experiment-tracking-and-reproducibility). So a production model traces back to an exactly-reproducible recipe — critical for debugging and audits/compliance.
- **Lifecycle stages** — models move through stages: **staging** (candidate, under validation), **production** (serving live), **archived** (retired). The registry knows which version is in each stage.
- **Promotion & rollback** — **promote** a validated model from staging to production, and **roll back** to a previous production version instantly if the new one degrades (a one-step revert, like a deploy rollback — see model-serving-and-deployment).
- **Governance** — approvals, metadata, tags, and an audit trail of who deployed what, when.

## How It Fits the MLOps Loop

1. **Train** → experiment tracker logs the run (see experiment-tracking-and-reproducibility).
2. **Register** the resulting model as a new version, linked to that run.
3. **Validate** in **staging** (shadow/canary — see model-serving-and-deployment).
4. **Promote** to **production**; the serving system pulls the production version from the registry.
5. **Monitor**; if it decays/misbehaves (see ml-model-monitoring-and-drift), **roll back** to the prior version or promote a retrained one.
The registry **decouples** "which model is deployed" from the serving code — you change the production model by promoting a version, not redeploying code.

## Design Guidance

- **Register every candidate model** with a version — never overwrite; keep history.
- **Link each version to its lineage** — data version, code commit, experiment, metrics (reproducibility + audit).
- **Use lifecycle stages** (staging/production/archived) to govern what's live.
- **Promote via validation**, not straight from training — stage → shadow/canary → production.
- **Keep the previous production version** ready for instant **rollback**.
- **Decouple serving from a specific version** — serve "the production model" and swap by promotion.
- **Tag/approve** for governance and compliance (who deployed what).

## Pitfalls (in understanding/using)

- **Ad-hoc model files** with no versioning → can't tell what's live or reproduce it.
- **No lineage** — a production model with unknown data/code origin → un-debuggable, un-auditable, irreproducible.
- **Overwriting** models instead of versioning → no rollback, lost history.
- Promoting **straight from training** to production without staging/validation → risky (see model-serving-and-deployment).
- No **rollback** version kept → a bad model is hard to revert.
- Coupling the **production model to code** (redeploy to change models) instead of registry promotion.
- Treating the registry as just **file storage** → its value is versioning + lineage + lifecycle, not blobs.
