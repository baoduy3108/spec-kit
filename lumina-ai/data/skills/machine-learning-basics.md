---
name: machine-learning-basics
description: Core machine-learning concepts — supervised vs unsupervised vs reinforcement learning, features and labels, the train/validation/test split, overfitting vs underfitting and the bias-variance trade-off, evaluation metrics, and why more data and generalization matter. Use to understand ML terminology, model training, and why a model that memorizes fails on new data.
category: ai-agent
keywords_vi: machine learning cơ bản, học máy, supervised unsupervised, train test split, overfitting underfitting, bias variance, feature label, đánh giá model, khái niệm ml
---

# Machine Learning Basics

Machine learning builds models that **learn patterns from data** to make predictions on new, unseen data — instead of being explicitly programmed with rules.

## Types of Learning

- **Supervised** — learn from **labeled** examples (input → known output). Two kinds: **classification** (predict a category: spam/not-spam) and **regression** (predict a number: house price). The most common in practice.
- **Unsupervised** — find structure in **unlabeled** data: **clustering** (group similar items), dimensionality reduction, anomaly detection.
- **Reinforcement** — an agent learns by **trial and error** via rewards (game-playing, robotics, RLHF for LLMs).

## Features, Labels, and the Split

- **Features** — the input variables the model sees; **labels** — the answers (in supervised learning). Good features often matter more than the model choice ("feature engineering").
- **Train / validation / test split** — train on one portion, tune on a **validation** set, and measure final performance on a **held-out test** set the model never saw. This is non-negotiable: evaluating on training data tells you nothing about real performance. **Never let test data leak** into training (data leakage inflates scores and lies).

## Overfitting vs Underfitting (the central tension)

- **Overfitting** — the model **memorizes** the training data (including noise) and fails on new data: low training error, high test error. Too complex for the data.
- **Underfitting** — the model is too simple to capture the pattern: high error everywhere.
- **Bias-variance trade-off** — underfitting is high bias (too rigid); overfitting is high variance (too sensitive to the training sample). The goal is the sweet spot that **generalizes**.
Fight overfitting with more data, simpler models, regularization, dropout, cross-validation, and early stopping.

## Evaluating

The metric must fit the problem — **accuracy is misleading on imbalanced data** (99% "not fraud" accuracy by never predicting fraud). Use precision/recall/F1 for classification (especially imbalanced), confusion matrices, ROC-AUC; RMSE/MAE for regression. Always compare against a simple **baseline** (majority class, last value) — a model must beat that to be worth anything.

## Key Truths

- **Generalization is the whole point** — performance on *new* data, not training data.
- **Garbage in, garbage out** — data quality and representativeness dominate; a biased/unrepresentative training set gives a biased model.
- **More/better data usually beats a fancier model.**
- Correlation the model finds isn't causation — it predicts, it doesn't explain.
- An LLM is a (very large) ML model trained with these same principles at scale (see how-llms-work).

## Pitfalls

- **Data leakage** / evaluating on training data → false confidence.
- **Accuracy on imbalanced classes** → useless metric.
- **Overfitting** unnoticed (no held-out test) → great in dev, terrible in production.
- **Biased training data** → biased, unfair predictions.
- No baseline to compare against.
