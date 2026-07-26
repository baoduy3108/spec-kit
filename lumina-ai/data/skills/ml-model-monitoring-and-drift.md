---
name: ml-model-monitoring-and-drift
description: How to monitor ML models in production — detecting data drift (inputs change), concept drift (input-output relationship changes), and prediction drift, plus the ground-truth delay problem, proxy metrics, and retraining triggers. Use to understand ML monitoring, data vs concept drift, why models decay, detecting model degradation, or when to retrain.
category: ai-agent
keywords_vi: giám sát model ml và drift, phát hiện data drift đầu vào đổi concept drift quan hệ đổi prediction drift, vấn đề nhãn thật đến chậm, proxy metric, khi nào retrain, model suy giảm âm thầm
---

# ML Model Monitoring and Drift

Unlike normal software, an ML model **silently decays** in production — it keeps returning predictions, but they get **wronger over time** as the world drifts away from its training data. No exception is thrown; accuracy just erodes. Monitoring for **drift** (and knowing when to **retrain**) is essential, and it's complicated by the fact that you often **don't know the right answer** until much later (see mlops-basics, training-serving-skew).

## Why Models Decay: The World Changes

A model learns patterns from **past** data. But the world **keeps changing** — user behavior shifts, new products appear, seasons change, an economic event alters everything. The model's learned patterns grow **stale**, and its accuracy drifts down. This decay is **gradual and silent**: the model doesn't error, it just becomes less right. So you must **monitor** the model's health, not assume "it worked at launch = it works now."

## The Types of Drift

- **Data drift (covariate shift)** — the **input distribution** changes: features look different than in training (a new user demographic, a sensor recalibrated, an input that used to be rare becomes common). The model now sees inputs unlike its training data. Detectable by comparing **live feature distributions** to training distributions (statistical tests, PSI, KL divergence).
- **Concept drift** — the **relationship between inputs and outputs** changes: the same input should now map to a **different** output (fraud tactics evolve, so patterns that meant "safe" now mean "fraud"). More dangerous and subtler — the inputs may look the same but the *right answer* changed. Requires **ground truth** to detect fully.
- **Prediction drift** — the model's **output distribution** shifts (e.g. it suddenly predicts "positive" far more often) — an early warning you can watch **without** ground truth.
- **Label drift** — the distribution of the target changes.

## The Hard Part: Ground Truth Comes Late (or Never)

To measure **actual accuracy**, you need the **true label** — but in production it often **arrives much later** (did the loan default? — known months later) or **never** (you can't know the counterfactual). So you frequently **can't compute real accuracy in real time**. Workarounds:
- **Monitor inputs/outputs** (data drift, prediction drift) as **early proxies** — you can watch these immediately, before labels exist.
- **Proxy/business metrics** — downstream signals that correlate with model quality (click-through, complaint rate).
- **Delayed evaluation** — compute true accuracy once labels arrive, accepting the lag.
- **Sampling + human labeling** — spot-check a sample to get ground truth.

## Retraining Triggers

Monitoring feeds the **retraining** decision:
- **Scheduled** — retrain periodically (simple, may retrain unnecessarily or too late).
- **Triggered by drift/decay** — retrain when drift crosses a threshold or metrics degrade (responsive, needs good monitoring).
- Watch for **feedback loops** — the model's own predictions can influence future data (recommendations shape what users see), biasing retraining.

## Design Guidance

- **Monitor drift, not just uptime** — compare live feature/prediction distributions to training; alert on divergence.
- **Use input/output drift as early proxies** for quality when ground truth is delayed.
- **Capture ground truth** when it arrives (log predictions + join later labels) to measure real accuracy over time.
- **Track business/proxy metrics** alongside model metrics.
- **Set retraining triggers** (drift thresholds / metric decay), not just a fixed schedule.
- **Distinguish data drift vs concept drift** — data drift may just need recalibration; concept drift needs relabeled retraining.
- **Beware feedback loops** biasing the data the model retrains on.

## Pitfalls (in understanding/using)

- Assuming a model that **launched well stays well** → it decays silently; monitor continuously.
- Waiting for **ground-truth accuracy** to notice problems → it arrives too late; use input/prediction drift as early signals.
- Only monitoring **system health** (latency/uptime) → misses model **quality** decay (the real risk).
- Confusing **data drift** (inputs changed) with **concept drift** (the mapping changed) — different fixes.
- **Retraining on a blind schedule** → wastes effort or reacts too slowly; trigger on drift/decay.
- Ignoring **feedback loops** → retraining on data the model itself biased.
- Not logging **predictions + inputs** → can't diagnose drift or join labels later.
