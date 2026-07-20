---
name: how-anomaly-detection-works
description: How anomaly/outlier detection works — modeling "normal" and flagging deviations, statistical thresholds, distance/density methods (k-NN, LOF), isolation forests, autoencoder reconstruction error, the class-imbalance challenge, and precision/recall trade-offs. Use to understand anomaly detection, outlier detection, fraud/intrusion/monitoring detection, or finding rare abnormal events.
category: ai-agent
keywords_vi: anomaly detection, phát hiện bất thường, outlier ngoại lệ, mô hình bình thường, isolation forest, autoencoder reconstruction error, mất cân bằng lớp, phát hiện gian lận
---

# How Anomaly Detection Works

Anomaly (outlier) detection finds data points that **deviate significantly from normal** — fraud, intrusions, equipment failures, defects, system-health issues. The defining challenge: anomalies are **rare** and often unknown in advance, so you usually can't just train a normal classifier on labeled "anomaly" examples.

## The Core Idea: Model Normal, Flag Deviations

Since abnormal cases are few and varied, most methods **learn what "normal" looks like** (from the abundant normal data) and flag anything that doesn't fit. This is largely **unsupervised** or semi-supervised — you have lots of normal examples and few/no labeled anomalies. An anomaly = a point with low probability / high distance / hard-to-reconstruct under the "normal" model.

## Statistical Methods

The simplest: model the distribution of normal values and flag points far in the tails — e.g. beyond **3 standard deviations** (z-score), or outside the IQR whiskers. Works for simple, roughly-Gaussian, low-dimensional data. Fails on multimodal, correlated, or high-dimensional data.

## Distance & Density Methods

- **k-NN distance** — a point far from its nearest neighbors is anomalous.
- **LOF (Local Outlier Factor)** — compares a point's local **density** to its neighbors'; catches anomalies in regions of varying density that global distance misses.
These reason geometrically about "isolation" in feature space (mind scaling — see how-clustering-works).

## Isolation Forest (a clever favorite)

**Isolation Forest** builds random trees that split data on random features/thresholds. Anomalies, being **few and different**, get **isolated in fewer splits** (they're easy to separate), so their average path length is short. Efficient, scalable, works well in higher dimensions — a strong default.

## Autoencoder Reconstruction Error (deep learning)

Train an **autoencoder** (a network that compresses then reconstructs input) on **normal** data only. It learns to reconstruct normal patterns well. Feed it an anomaly and it reconstructs poorly → high **reconstruction error** flags the outlier. Powerful for complex, high-dimensional data (images, sensor streams). Same idea underlies some sequence/time-series anomaly detection.

## The Hard Parts

- **Class imbalance** — anomalies may be <1% of data, so **accuracy is a useless metric** (predict "all normal" → 99% accurate, 0 anomalies caught). Use **precision, recall, F1, PR-AUC** (see how-overfitting-and-regularization-work for evaluation discipline).
- **Precision vs recall trade-off** — a sensitive detector catches more anomalies but floods you with **false alarms** (alert fatigue); a strict one misses real events. Tune the threshold to the **cost** of each error type for your use case.
- **Defining "normal"** — normal drifts over time (concept drift); models need updating, or yesterday's normal flags today's legitimate behavior.

## Pitfalls (in understanding/using)

- Judging by **accuracy** on imbalanced data — use precision/recall/PR-AUC.
- Ignoring the **false-positive cost** — too many alerts get ignored (alert fatigue); calibrate the threshold.
- Not **scaling features** for distance/density methods.
- Assuming static "normal" — retrain as behavior drifts (fraud/attackers also adapt).
- Training the "normal" model on data **contaminated** with anomalies (poisons the baseline).
- Expecting it to explain *why* something is anomalous — most methods flag, they don't diagnose (add explainability separately).
