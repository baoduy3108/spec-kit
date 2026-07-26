---
name: training-serving-skew
description: What training-serving skew is — when a model sees different feature values or distributions in production than during training (from divergent feature code, data leakage, different preprocessing, or time), silently degrading accuracy, and how to prevent it. Use to understand training-serving skew, why a model performs worse in production, feature parity, or data leakage.
category: ai-agent
keywords_vi: training-serving skew, model thấy feature khác lúc production so với lúc train, do code feature khác nhau rò rỉ dữ liệu tiền xử lý khác thời gian, âm thầm giảm độ chính xác, cách phòng
---

# Training-Serving Skew

Training-serving skew is one of the most common — and **silent** — reasons an ML model that looked great in training performs **worse in production**: the model receives **different feature values or distributions at serving time than it saw during training**. Because no error is thrown (predictions still come out, just worse), it's insidious. The fix is **parity**: the exact same features, computed the same way, at both times (see feature-stores, mlops-basics).

## The Problem: The Model Sees Something Different Than It Learned

A model learns a mapping from **features → output** based on the feature values in its **training data**. If, in production, those features are computed **differently** or come from a **different distribution**, the model is now being asked about inputs unlike what it learned → its predictions degrade. Crucially, the model **can't tell you** — it dutifully outputs predictions on the skewed inputs; accuracy just quietly drops. You only notice via monitoring or a business metric slipping.

## The Common Causes

- **Divergent feature code** — features implemented **twice** (a batch pipeline for training, separate app code for serving) that compute subtly different values (rounding, edge cases, defaults, time zones). The #1 cause — and exactly what feature stores solve (see feature-stores).
- **Different preprocessing** — normalization/encoding/imputation applied differently (or with different statistics) at train vs serve time. E.g. scaling with training-set mean/std but recomputing at serving.
- **Data leakage** — training used information **not available at serving time** (a future value, a label-derived feature, a post-outcome field). The model relies on a signal it won't have in production → looks great offline, fails live. A classic, damaging form.
- **Time / distribution shift** — the world changed between training and serving (related to **drift** — see ml-model-monitoring-and-drift); production data differs from the training snapshot.
- **Feature freshness** — serving uses stale or differently-timed feature values than training assumed.

## Prevention: Parity and Discipline

- **Compute features once, use everywhere** — share the **same** feature definitions/transformations for training and serving (feature stores enforce this — see feature-stores).
- **Reuse the same preprocessing code and statistics** — fit transformers on training data and **apply the identical fitted transform** at serving (a saved pipeline), never recompute stats at serve time.
- **Guard against leakage** — only use features **available at prediction time**; use **point-in-time correct** joins so a training example never sees future data.
- **Log serving features** and compare their distribution to training features (skew detection).
- **Train on data that resembles serving** — same sources, same timing, representative distribution.

## Design Guidance

- **Feature parity** is the goal — same features, same logic, same preprocessing at train and serve.
- **Serialize the preprocessing pipeline** and reuse it (don't reimplement at serving).
- **Point-in-time correctness** to avoid leakage.
- **Monitor for skew** — compare live feature distributions to training; alert on divergence.
- **Only use available-at-serving features** — audit every feature for leakage.
- Use a **feature store** at scale to structurally prevent divergent implementations.

## Pitfalls (in understanding/using)

- Implementing features **twice** (train vs serve) → subtle divergence → skew.
- **Data leakage** — training on info unavailable at serving → great offline, poor live (and hard to spot).
- Recomputing **preprocessing statistics** at serving instead of reusing the fitted transform → distribution mismatch.
- Assuming a **good offline metric** guarantees production performance → skew/leakage break that assumption.
- **Not monitoring** live feature distributions → skew goes undetected (no error is raised).
- Confusing **skew** (train vs serve mismatch, often a bug) with **drift** (the world changing over time) — related but different (see ml-model-monitoring-and-drift).
