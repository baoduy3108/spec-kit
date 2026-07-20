---
name: data-analysis-pandas
description: Analyze tabular data with pandas — load and inspect, clean (missing values, types, duplicates), filter and transform with vectorized ops, group-by/aggregate, merge/join, reshape (pivot/melt), and avoid the common traps (SettingWithCopyWarning, chained indexing, iterating rows). Use when exploring, cleaning, or aggregating a dataset in Python.
category: engineering
keywords_vi: phân tích dữ liệu, pandas, dataframe, làm sạch dữ liệu, groupby aggregate, xử lý dữ liệu python, merge join dataframe, phân tích số liệu
---

# Data Analysis with pandas

Explore before you compute, vectorize instead of looping, and be explicit about copies vs views.

## Inspect First

`df.head()`, `df.info()` (types + nulls), `df.describe()` (numeric summary), `df.shape`, `df["col"].value_counts()`, `df.isna().sum()`. Understand the data's shape, types, and missingness before transforming — most bugs come from wrong dtypes or unexpected NaNs.

## Clean

- **Missing values** — decide per column: drop (`dropna`), fill (`fillna` with a sensible value/forward-fill), or flag. Don't blindly `fillna(0)` — a zero is a real number that skews stats.
- **Types** — `astype`, `pd.to_datetime`, `pd.to_numeric(errors="coerce")`. Wrong dtypes silently break sorting, math, and joins.
- **Duplicates** — `df.duplicated()`, `drop_duplicates(subset=…)`.
- **Strings** — `.str` accessor (`.str.strip()`, `.str.lower()`) vectorized, not a loop.

## Transform (vectorized)

- Filter with boolean masks: `df[df["age"] > 30]`; combine with `&`/`|` and parentheses.
- New columns from vectorized ops: `df["total"] = df["qty"] * df["price"]` — not a row loop.
- `assign` for chainable column creation; `map`/`replace` for value mapping; `np.where`/`.mask` for conditionals.
- **Avoid `iterrows`/`apply(axis=1)`** for anything vectorizable — they're 10–100× slower.

## Aggregate & Combine

- **group-by**: `df.groupby("category")["sales"].agg(["sum", "mean", "count"])` — the split-apply-combine workhorse. Use `transform` to broadcast a group stat back to rows.
- **merge/join**: `pd.merge(a, b, on="id", how="left")` — always check row counts before/after; an unexpected many-to-many join silently multiplies rows. Verify join keys are unique where you expect.
- **reshape**: `pivot_table` (long→wide, aggregating), `melt` (wide→long).

## Common Traps

- **SettingWithCopyWarning / chained indexing** — `df[df.a>0]["b"] = 1` may modify a copy, not the frame. Use `.loc[mask, "b"] = 1` in one step.
- **Silent NaN propagation** — NaN in arithmetic yields NaN; `sum` skips NaN but `mean` divides by non-NaN count — know which you want.
- **Index misalignment** — operations align on the index; a stray index mismatch produces NaNs. `reset_index(drop=True)` when needed.
- **Memory** — use categorical dtype for low-cardinality strings, downcast numerics, and read large files in chunks.
