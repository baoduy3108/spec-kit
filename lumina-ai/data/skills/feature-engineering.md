---
name: feature-engineering
description: Create good features for ML models — encoding categoricals, scaling/normalization, handling missing values, transforming skewed data, creating interaction/domain features, binning, date/time features, and avoiding data leakage. Use when preparing inputs for a machine-learning model, since features often matter more than the model choice.
category: ai-agent
keywords_vi: feature engineering, tạo đặc trưng cho model, encode categorical, chuẩn hóa scaling, xử lý missing feature, tránh data leakage, biến đổi dữ liệu ml, đặc trưng quan trọng hơn model
---

# Feature Engineering

Feature engineering is transforming raw data into inputs that help a model learn. It's often the highest-leverage part of classic ML — **good features frequently beat a fancier model** (see machine-learning-basics), because they encode domain knowledge the model can't discover on its own.

## Common Transformations

- **Categorical encoding** — models need numbers. **One-hot** encode low-cardinality categories (color → 3 columns); for high-cardinality (zip codes, user ids), use target/frequency encoding or embeddings instead of thousands of one-hot columns. Never encode categories as arbitrary integers (1,2,3) if there's no real order — it implies a false ordering.
- **Scaling/normalization** — put numeric features on comparable scales (standardize to mean 0/std 1, or min-max to [0,1]). Distance- and gradient-based models (kNN, SVM, linear, neural nets) need it or large-magnitude features dominate. Tree models don't care about scale.
- **Missing values** — impute (median/mode), and often add an "is_missing" flag when missingness is informative (see data-cleaning). Some models handle NaN natively; many don't.
- **Skewed distributions** — log/Box-Cox transform heavy-tailed features (income, counts) so they're less dominated by outliers.
- **Binning/discretization** — group a continuous variable into ranges (age → age-groups) when the relationship is non-linear or you want robustness.
- **Date/time features** — extract signal from timestamps: hour of day, day of week, month, is-weekend, is-holiday, time-since-event. A raw timestamp is nearly useless; its components are rich.
- **Interaction & domain features** — combine features (price × quantity = revenue; ratios; aggregates like "avg purchase per user"). Domain knowledge encoded here is where big wins come from — features the model couldn't derive from raw columns.
- **Text/image** → embeddings (see vector-embeddings, nlp-basics).

## The Cardinal Rule: No Data Leakage

**Never use information that wouldn't be available at prediction time** — the most dangerous feature-engineering bug. Examples: including a value derived from the target, or a field that's only filled in *after* the outcome, or computing scaling/imputation statistics over the *whole* dataset (including test) instead of fitting them on **train only** and applying to test. Leakage gives amazing offline scores and a model that fails in production. Fit all transformations on training data, apply the same to validation/test (and do it *inside* cross-validation folds).

## Practical Approach

Start simple, understand the data (see data-cleaning, statistics-fundamentals), use domain knowledge to craft features, and check feature importance to see what helps. Note that **deep learning reduces the need** for manual feature engineering (it learns features from raw data), but for tabular data and classic ML it remains crucial.

## Pitfalls

- **Data leakage** — the #1 killer; fit transforms on train only.
- **Encoding categories as fake-ordinal integers.**
- **Not scaling** for scale-sensitive models (or scaling tree models needlessly — harmless but pointless).
- **Blindly imputing** missing values, hiding informative missingness.
- **Ignoring date/time structure** (using raw timestamps).
- **Over-engineering** hundreds of features → overfitting and noise; prefer a few strong, meaningful ones.
