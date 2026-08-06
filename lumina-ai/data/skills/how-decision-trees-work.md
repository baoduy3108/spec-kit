---
name: how-decision-trees-work
description: How decision trees work — splitting data by feature thresholds to reduce impurity (Gini/entropy), why single trees overfit, and how ensembles (random forests, gradient boosting) fix this. Covers interpretability and when trees beat neural nets on tabular data. Use to understand decision trees, random forests, gradient boosting (XGBoost), or tabular ML.
category: ai-agent
keywords_vi: decision tree, cây quyết định, chia dữ liệu theo ngưỡng, gini entropy impurity, overfit cây đơn, random forest gradient boosting xgboost, dữ liệu bảng tabular
---

# How Decision Trees Work

A decision tree makes predictions by asking a series of yes/no questions about the features — like a flowchart. They're intuitive, interpretable, and, in ensemble form, the go-to method for **tabular data** (spreadsheets of rows and columns), often beating neural networks there.

## The Core: Recursive Splitting

A tree learns by repeatedly **splitting** the data:
1. Find the feature and threshold that best separates the data toward the target (e.g. "age < 30?", "income > 50k?").
2. Split into two branches; recurse on each.
3. Stop when a node is pure enough or small enough; that leaf predicts the majority class (or average value).
"Best split" is chosen to reduce **impurity** — how mixed the classes are in a node:
- **Gini impurity** or **entropy** (information gain) for classification.
- **Variance reduction** for regression.
Each split makes the resulting groups more homogeneous. Prediction = follow the questions down to a leaf.

## Strengths

- **Interpretable** — you can read the rules ("approved because income > X and debt < Y"). Great for explainability.
- Handle **mixed feature types**, nonlinear relationships, and feature interactions naturally.
- Little preprocessing (no scaling needed).

## The Weakness: Single Trees Overfit

A deep tree can keep splitting until it memorizes the training data — carving out tiny leaves for noise. It becomes **high-variance**: great on training data, poor on new data (see how-overfitting-and-regularization-work). Pruning/limiting depth helps but a single tree is usually mediocre. The fix is **ensembles**.

## Ensembles (where trees get powerful)

Combine many trees so their errors cancel:
- **Random Forests (bagging)** — train many trees on **random subsets** of data and features, then **average** their predictions. Each tree overfits differently; averaging cancels the noise → much lower variance, robust, hard to misuse. A strong default.
- **Gradient Boosting** (XGBoost, LightGBM, CatBoost) — train trees **sequentially**, each new tree correcting the **residual errors** of the ensemble so far (gradient descent in function space, see how-gradient-descent-works). Extremely accurate on tabular data — dominant in ML competitions and industry — but more tuning-sensitive and easier to overfit than forests.

## Why Trees Beat Neural Nets on Tabular Data

Neural nets shine on unstructured data (images, text) but tree ensembles often **win on structured/tabular** data: they handle heterogeneous features, need less data and tuning, are faster, and are more interpretable. For a CSV of business data, start with gradient boosting, not deep learning.

## Pitfalls (in understanding/using)

- Using a **single deep tree** — it overfits; use an ensemble (forest/boosting).
- **Overfitting with boosting** — tune depth, learning rate, and use early stopping/regularization.
- Trusting feature importances naively — they can be biased (correlated features, high-cardinality); validate.
- Reaching for **deep learning** on tabular data by default — tree ensembles usually win with less effort.
- Assuming interpretability of a **forest/boosting** ensemble equals a single tree's — ensembles need tools (SHAP) to explain.
- Data leakage inflating tree accuracy (a feature that encodes the target).
