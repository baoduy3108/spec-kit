---
name: data-labeling-and-annotation
description: How data labeling works for supervised ML — creating ground-truth labels, ensuring label quality (guidelines, inter-annotator agreement, adjudication), the cost/quality trade-off, and active learning to label smartly. Use to understand data labeling, annotation quality, inter-annotator agreement, label noise, or reducing labeling cost with active learning.
category: ai-agent
keywords_vi: gán nhãn dữ liệu, active learning, đồng thuận giữa người gán, chú thích annotation ml, nhãn ground-truth chất lượng, inter-annotator agreement, giảm chi phí gán nhãn
---

# Data Labeling and Annotation

Supervised ML learns from **labeled examples** — inputs paired with the correct answer ("ground truth"). Those labels have to come from **somewhere** (usually humans), and their **quality directly bounds the model's quality**: garbage labels → garbage model, no matter how good the algorithm. Labeling is often the **most expensive and underestimated** part of an ML project (see mlops-basics, ml-model-evaluation-metrics).

## Why Labels Matter So Much

A supervised model can only be as good as the **labels it learns from** and is **evaluated against**. If 10% of labels are wrong:
- The model **learns** those errors (fitting noise) → lower accuracy.
- Your **evaluation is wrong too** — the test-set labels are noisy, so your reported metrics are unreliable (you might reject a good model or ship a bad one).
"Garbage in, garbage out" is acute in ML: **label quality is a ceiling on model quality**. Yet labeling is tedious, subjective, and costly, so it's often rushed — a false economy.

## Ensuring Label Quality

Getting **consistent, correct** labels from humans is harder than it looks (people disagree, get tired, misread guidelines):
- **Clear guidelines** — a precise annotation guide with definitions and edge-case examples. Ambiguous instructions → inconsistent labels. The single biggest lever.
- **Inter-annotator agreement (IAA)** — have **multiple annotators** label the same items and **measure agreement** (e.g. Cohen's/Fleiss' kappa). **Low agreement** signals ambiguous guidelines or a genuinely subjective task — a red flag that your labels (and thus the task) are shaky.
- **Adjudication / consensus** — resolve disagreements by majority vote or an expert **adjudicator**; use multiple labels per item for important data.
- **Quality control** — gold-standard check items, spot audits, annotator scoring.
- **Handle subjectivity** — some tasks have no single "right" answer; recognize when the disagreement is inherent, not fixable by guidelines.

## The Cost/Quality Trade-off

Labeling is **expensive** (human time), so there's constant tension:
- **More labels / more annotators per item / expert labelers** → higher quality but higher cost.
- **Fewer / cheaper / crowd labelers** → cheaper but noisier.
Techniques to get more from less:
- **Active learning** — instead of labeling data randomly, have the model **pick the most informative examples** to label next (the ones it's most uncertain about / that would most improve it). This concentrates labeling effort where it helps most, reaching good accuracy with **far fewer labels**.
- **Weak supervision / programmatic labeling** — generate noisy labels from heuristics/rules at scale, then denoise.
- **Pre-labeling** — a model proposes labels, humans **correct** them (faster than labeling from scratch), watching for automation bias.
- **Semi-supervised** — leverage abundant **unlabeled** data alongside a small labeled set.

## Design Guidance

- **Invest in clear guidelines** — the cheapest way to raise label quality.
- **Measure inter-annotator agreement** — low IAA means fix the guidelines or accept task subjectivity.
- **Multiple labels + adjudication** for important/ambiguous data.
- **Active learning** to label the most valuable examples first — big cost savings.
- **Audit label quality** (gold items, spot checks) — noisy test labels corrupt your metrics.
- **Watch automation bias** in pre-labeling — humans rubber-stamp model suggestions.
- **Treat labeling as a first-class part** of the ML project, budgeted and quality-controlled — not an afterthought.

## Pitfalls (in understanding/using)

- **Noisy labels** → the model learns errors **and** your evaluation is unreliable (test labels wrong too).
- **Vague guidelines** → inconsistent labels; annotators disagree.
- Not measuring **inter-annotator agreement** → you don't know your labels are shaky.
- **Cheapest labeling** without quality control → false economy; garbage in, garbage out.
- **Labeling randomly** when **active learning** would reach the same accuracy with far fewer labels.
- **Automation bias** — humans blindly accepting model-suggested labels in pre-labeling.
- Ignoring inherent **subjectivity** — forcing a single label on genuinely ambiguous tasks.
