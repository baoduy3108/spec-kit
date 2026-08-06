---
name: data-cleaning
description: Clean messy data before analysis — profiling first, handling missing values (drop/impute/flag), fixing types and formats, detecting and deciding on outliers, deduplication, validation against rules, and documenting every transformation for reproducibility. Use when preparing a raw dataset for analysis, a model, or a report.
category: engineering
keywords_vi: làm sạch dữ liệu, data cleaning, xử lý missing, dữ liệu thiếu, outlier, ngoại lệ, trùng lặp dedup, chuẩn hóa, dữ liệu bẩn, tiền xử lý data
---

# Data Cleaning

Real data is messy, and analysis on dirty data produces confident wrong conclusions ("garbage in, garbage out"). Cleaning is usually the biggest part of any data task — do it deliberately.

## Profile First

Before changing anything, **understand the data**: row/column counts, types, ranges, distributions, unique values, and where the nulls are. Look at actual rows. Most cleaning decisions come from spotting what's wrong (wrong types, impossible values, inconsistent categories, unexpected nulls).

## Missing Values (decide per column)

Don't blanket-fill. Options, chosen by why it's missing and what it feeds:
- **Drop** rows/columns if missingness is rare or the column is mostly empty.
- **Impute** — fill with median/mean (numeric), mode/"Unknown" (categorical), or forward-fill (time series) — but know this fabricates data and can bias results. Never blindly `fillna(0)` (a zero is a real value that skews sums/means).
- **Flag** — add an "is_missing" indicator when the fact of missingness is itself informative.
Missing-not-at-random (missing *because* of the value) is a trap — imputing it biases everything.

## Types, Formats, Consistency

- **Fix types** — numbers stored as strings, dates as text; parse to real types (wrong dtypes silently break sorting, math, joins).
- **Standardize** — trim whitespace, unify case, normalize categories ("USA"/"U.S."/"United States" → one), consistent date formats (UTC), units, and encodings (UTF-8).
- **Parse/split** compound fields; normalize phone/email/IDs.

## Outliers

Detect (values far outside the plausible range — IQR/z-score, or just domain limits like a negative age). Then **decide with judgment**: is it a **data error** (a typo, a sensor glitch — fix or remove) or a **real extreme** (a genuine whale customer — keep, it's signal)? Don't auto-delete outliers; some are the most important data points. Winsorize/cap only when justified.

## Deduplicate & Validate

- **Dedup** — exact and near-duplicate rows (same entity, slightly different spelling); pick the record to keep by a rule.
- **Validate against rules** — ranges (age 0–120), formats (email regex), referential integrity (foreign keys exist), cross-field logic (end ≥ start). Reject or quarantine violations rather than silently letting them through.

## Document & Reproduce

Record **every transformation** (what and why) as a script/pipeline, not manual one-off edits — so the cleaning is **reproducible** and auditable, and you can rerun it when the raw data updates. Keep the raw data immutable; clean into a derived copy.

## Pitfalls

- Cleaning without profiling → missing the real problems.
- `fillna(0)` / mean-imputing blindly → biased stats.
- Deleting outliers that were real signal.
- Manual, undocumented edits → unreproducible, unauditable.
- Overwriting raw data (keep the source of truth intact).
- Inconsistent categories/encoding causing failed joins and split groups.
