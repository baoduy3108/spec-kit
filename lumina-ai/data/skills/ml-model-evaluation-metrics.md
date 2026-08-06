---
name: ml-model-evaluation-metrics
description: How to evaluate ML models — accuracy's trap on imbalanced data, precision vs recall and the trade-off, F1, ROC-AUC, regression metrics (MAE/RMSE), calibration, and choosing the metric that matches the real-world cost of errors. Use to understand precision/recall/F1/AUC, why accuracy misleads, choosing an evaluation metric, or evaluating a classifier.
category: ai-agent
keywords_vi: precision recall, f1 score, roc-auc, bẫy accuracy mất cân bằng, đánh giá model chọn chỉ số, calibration xác suất, mae rmse hồi quy, chọn metric khớp chi phí lỗi
---

# ML Model Evaluation Metrics

Picking the **right evaluation metric** is one of the highest-leverage decisions in ML — the wrong metric makes a **bad model look good** and steers you to optimize the wrong thing. The core skill is matching the metric to the **real-world cost of different errors**, and knowing why **accuracy** is often a trap (see ml-model-monitoring-and-drift, data-labeling-and-annotation).

## The Accuracy Trap (imbalanced data)

**Accuracy** = fraction of predictions correct. It's intuitive but **dangerously misleading on imbalanced data**. Classic example: detecting a disease present in **1%** of patients — a model that **always predicts "healthy"** is **99% accurate** and completely useless (it never catches the disease). When classes are imbalanced (fraud, disease, spam), accuracy is dominated by the majority class and hides total failure on the minority class you actually care about. **Rarely trust accuracy alone.**

## Precision vs Recall (the key trade-off)

For classification, decompose errors:
- **Precision** — of the items the model flagged **positive**, how many **really are**? (Penalizes **false positives**.) "When it says fraud, is it right?"
- **Recall (sensitivity)** — of all the **actual** positives, how many did the model **catch**? (Penalizes **false negatives**.) "Of all the fraud, how much did we catch?"
There's a **trade-off**: pushing recall up (catch everything) usually **lowers precision** (more false alarms), and vice versa — tuned via the decision **threshold**. Which matters more depends on the **cost of each error type**:
- **Recall matters most** when **missing** a positive is costly — cancer screening, fraud, security (a false negative is a disaster; false alarms are tolerable).
- **Precision matters most** when a **false alarm** is costly — flagging content for removal, spam filters blocking real mail (a false positive harms users).
- **F1 score** — the harmonic mean of precision and recall, a single number when you want to **balance** both. Use F1 (not accuracy) on imbalanced classification.

## Threshold-Independent: ROC-AUC and PR-AUC

- **ROC-AUC** — measures how well the model **ranks** positives above negatives across **all thresholds** (1.0 = perfect, 0.5 = random). Good for overall discrimination, threshold-independent.
- **PR-AUC (precision-recall AUC)** — more informative than ROC-AUC on **highly imbalanced** data (focuses on the positive class).

## Regression, Calibration, and Beyond

- **Regression** — **MAE** (mean absolute error, robust, interpretable) vs **RMSE** (penalizes large errors more); **R²** (variance explained). Choose by whether **big errors** should be punished harder (RMSE) or not (MAE).
- **Calibration** — do predicted **probabilities** mean what they say? A model that outputs "80%" should be right ~80% of the time. Important when you **use the probability** (risk scoring, expected value), not just the class. A high-AUC model can be **poorly calibrated**.
- **Segment/slice metrics** — check performance **per subgroup** (fairness, edge cases); a good overall number can hide failure on an important slice.
- **Match to the business** — ultimately the metric should reflect the **real cost/value** of decisions, not just a technical score.

## Design Guidance

- **Never rely on accuracy** for imbalanced problems — use precision/recall/F1/PR-AUC.
- **Choose precision vs recall by error cost** — recall when misses are catastrophic, precision when false alarms are costly.
- **Tune the threshold** to the operating point you need (it trades precision for recall).
- **Use AUC** for threshold-independent ranking quality; **PR-AUC** on heavy imbalance.
- **Check calibration** if you use the predicted probabilities, not just the label.
- **Evaluate per-slice**, not just overall, to catch subgroup failures.
- **Tie the metric to real-world value** — optimize what actually matters.
- **Trust the metric only as much as the test labels** (see data-labeling-and-annotation).

## Pitfalls (in understanding/using)

- **Accuracy on imbalanced data** → a useless model looks great (the 99%-healthy trap).
- Optimizing **precision or recall alone** without weighing the **cost** of each error type.
- Ignoring the **threshold** — reporting one operating point when the trade-off curve matters.
- Assuming a high **AUC** means good **probabilities** → it may be poorly calibrated.
- **Overall metric** hiding **per-slice** failures (an important subgroup performs terribly).
- Wrong **regression** metric (RMSE vs MAE) for whether large errors should dominate.
- Trusting metrics computed on **noisy test labels** (see data-labeling-and-annotation).
- Optimizing a technical metric **disconnected** from the real business cost of decisions.
