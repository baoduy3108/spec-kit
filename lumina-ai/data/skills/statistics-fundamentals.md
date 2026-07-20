---
name: statistics-fundamentals
description: Practical statistics for reasoning about data — mean/median/mode and when each lies, variance/standard deviation, distributions and skew, percentiles, correlation vs causation, sampling bias, and confidence intervals vs point estimates. Use when interpreting data, metrics, or experiment results, or spotting misleading statistics.
category: engineering
keywords_vi: thống kê cơ bản, mean median mode, độ lệch chuẩn variance, phân phối skew, percentile, tương quan nhân quả correlation causation, sai lệch mẫu, đọc số liệu
---

# Statistics Fundamentals

Enough statistics to reason honestly about data and not be fooled by (or accidentally produce) misleading numbers.

## Center: Mean vs Median vs Mode

- **Mean** (average) — sensitive to outliers. One billionaire raises the "average" net worth of a room dramatically.
- **Median** (middle value) — robust to outliers; usually the honest "typical" value for skewed data (incomes, latencies, house prices). When mean ≫ median, the data is right-skewed.
- **Mode** — most frequent value; useful for categories.
Report the **median** (and percentiles) for skewed data; the mean alone hides the tail.

## Spread: Variance & Standard Deviation

The **standard deviation** measures how spread out values are around the mean. Two datasets with the same mean can be wildly different (all-near-average vs bimodal). Always look at spread, not just center — "average response time 100ms" means little without knowing if it's 100±5 or 100±400.

## Distributions & Percentiles

- **Normal (bell curve)** — symmetric; mean = median; ~68/95/99.7% within 1/2/3 SD. Many natural measures approximate it, but **don't assume it** — lots of real data is skewed or heavy-tailed.
- **Percentiles** — p50 (median), p95, p99 describe the distribution directly and are the right tool for latencies/SLAs (the tail is what hurts — see load-testing). Averages hide tails.
- **Skew / long tails** — income, wealth, request latency, file sizes are typically right-skewed; use median + percentiles, not mean.

## The Big Traps

- **Correlation ≠ causation** — two things moving together doesn't mean one causes the other; a lurking **confounder** may drive both (ice cream sales and drownings both rise in summer). Only a controlled experiment (see ab-testing) establishes causation.
- **Sampling bias** — a non-representative sample gives confident wrong conclusions (surveying only your happy users; survivorship bias — analyzing only the survivors). Ask "who/what is missing from this data?"
- **Small samples** — high variance; a "50% improvement" from 4 data points is noise. Bigger n, and report uncertainty.
- **Point estimate vs uncertainty** — "conversion is 4.2%" pretends precision; a **confidence interval** ("4.2% ± 0.8%") tells you how sure you are. Prefer ranges for decisions.
- **Simpson's paradox** — a trend in aggregate can reverse within subgroups; slice the data.
- **Base rates** — a "99% accurate" test for a rare condition still produces mostly false positives (see probability-and-bayes).

## Practical Habit

Before trusting a number: What's the sample, and is it representative? Center *and* spread? Skewed (use median/percentiles)? Correlation being sold as causation? How big is n, and what's the uncertainty? Most misleading statistics fail one of these.
