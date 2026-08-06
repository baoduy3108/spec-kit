---
name: knowledge-tracing
description: How knowledge tracing models what a learner knows over time — estimating mastery of skills from their answer history, the classic approaches (Bayesian Knowledge Tracing, Deep Knowledge Tracing), and using the estimate to drive adaptivity. Use to understand knowledge tracing, modeling learner mastery, the student model in tutoring systems, or predicting what a learner knows.
category: engineering
keywords_vi: knowledge tracing, mô hình hóa kiến thức học viên theo thời gian, ước lượng thành thạo kỹ năng, lịch sử trả lời, bayesian knowledge tracing deep, mô hình học viên student model, dự đoán biết gì
---

# Knowledge Tracing

Knowledge tracing is the problem of **estimating what a learner knows** — their mastery of each skill/concept — from their history of correct and incorrect answers, and **updating** that estimate as they work. It's the "student model" that powers adaptive tutoring (see intelligent-tutoring-systems, adaptive-and-personalized-learning): you can't tailor teaching without knowing where the learner is.

## The Problem

You can't directly observe what's in a learner's head — you only see their **actions** (they got problem 5 right, problem 6 wrong). From these noisy observations, infer their **latent knowledge state**: how likely are they to know skill X? Then use it to decide what to teach next, when they've mastered something, and where they need help. The challenge is that answers are noisy — a correct answer might be a lucky guess; a wrong one might be a careless slip — so mastery must be **inferred probabilistically**, not read off directly.

## Bayesian Knowledge Tracing (BKT)

The classic approach models each skill's mastery as a **hidden probability** updated with each attempt, using four parameters:
- **P(know)** — current probability the learner has mastered the skill.
- **P(learn)** (transit) — chance of learning it on a given attempt.
- **P(guess)** — chance of answering correctly **without** knowing (lucky guess).
- **P(slip)** — chance of answering wrong **despite** knowing (careless error).
After each answer, **Bayesian updating** (see probability-and-bayes) revises P(know): a correct answer raises it (accounting for possible guessing), a wrong one lowers it (accounting for possible slips). Over several attempts, the estimate converges toward the learner's true state. Elegant and interpretable, but assumes skills are independent and mastery is binary.

## Deep Knowledge Tracing (DKT)

Modern approaches use neural networks (RNNs/transformers — see how-recurrent-networks-work, how-transformers-work) to model the learner's knowledge from their full sequence of interactions. **DKT** can capture relationships **between** skills (mastering A helps predict B) and more complex patterns than BKT — often more accurate at predicting the next answer — but is less interpretable (a black box vs BKT's clear parameters). A trade-off between accuracy and explainability.

## Using the Estimate

The knowledge estimate drives the adaptive loop:
- **When to advance** — high mastery probability → move on (mastery learning — see mastery-learning).
- **What to review** — low/decaying mastery → practice/remediate (see spaced-repetition-systems for the forgetting angle).
- **Difficulty/pacing** — target the ZPD based on estimated skills (see scaffolding-and-zpd).
- **Diagnose gaps** — persistently-wrong skills flag misconceptions (see misconception-diagnosis).

## Pitfalls (in understanding/using)

- Treating a **single answer** as certain evidence — model **guessing and slipping**; mastery is probabilistic.
- Ignoring **forgetting** — knowledge decays; a mastered skill isn't mastered forever (combine with spaced repetition — see spaced-repetition-systems).
- Assuming **skill independence** (BKT) when skills are related — richer models (DKT) capture transfer.
- **Over-trusting a black-box** (DKT) estimate you can't explain — interpretability matters for trust and remediation.
- Sparse data — a few answers give a shaky estimate; don't over-adapt to noise.
- Confusing "answered correctly" with "understands" (could be memorization/guessing) — assess validly.
- Not **acting** on the model — tracing knowledge is only useful if it drives teaching decisions.
