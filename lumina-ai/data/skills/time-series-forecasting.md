---
name: time-series-forecasting
description: Time-series forecasting — trend, seasonality and decomposition, stationarity and differencing, classical models (moving average, exponential smoothing, ARIMA), ML/prophet approaches, backtesting with time-aware splits, and forecasting pitfalls (leakage, drift). Use when predicting future values from historical data — demand, traffic, metrics, prices.
category: engineering
keywords_vi: dự báo chuỗi thời gian, time series forecasting, xu hướng và mùa vụ, phân rã decomposition, tính dừng stationarity, sai phân differencing, mô hình arima làm mượt mũ, cách tiếp cận prophet, backtesting rolling origin, rò rỉ dữ liệu leakage trôi drift
---

# Time-Series Forecasting

Forecasting predicts future values of a quantity that evolves over time — demand, web traffic, revenue, sensor readings, prices. What makes it different from ordinary ML is that **order matters** and observations are correlated with their own past, which changes how you model *and* how you validate.

## Anatomy of a Time Series

Decompose a series into components — it clarifies both understanding and modeling:
- **Trend** — long-term direction (growth, decline).
- **Seasonality** — repeating cycles at fixed periods (daily traffic peaks, weekly patterns, yearly retail spikes). Often multiple seasonalities at once.
- **Cyclic** — longer, irregular swings (business cycles) not tied to a fixed period.
- **Residual/noise** — what's left.

Decomposition can be **additive** (components sum) or **multiplicative** (seasonality scales with level). Seeing these first tells you what a model must capture.

## Stationarity

Many classical methods assume the series is **stationary** — its statistical properties (mean, variance) don't change over time. Real series usually aren't (they trend and have seasonality). **Differencing** (modeling change from step to step) and seasonal differencing remove trend/seasonality to induce stationarity; log transforms stabilize variance. Testing (e.g. ADF test) and transforming for stationarity is a standard first step for ARIMA-family models.

## Classical Models

- **Moving average / naïve** — baselines (last value, seasonal-naïve = "same as last week"). Always compare against these; a fancy model that can't beat "same as last week" is worthless.
- **Exponential smoothing (ETS / Holt-Winters)** — weighted average favoring recent data, with terms for level, trend, and seasonality. Simple, robust, strong on seasonal data.
- **ARIMA** — AutoRegressive (depends on past values) + Integrated (differencing) + Moving Average (depends on past errors). **SARIMA** adds seasonality. The classic statistical workhorse; needs stationarity and order selection (p,d,q).

## ML & Modern Approaches

- **Prophet** — decomposable trend+seasonality+holidays; easy, robust to missing data, good default for business series.
- **Gradient-boosted trees** on engineered features (lags, rolling stats, calendar features) — often win on tabular multi-series problems.
- **Deep learning** (LSTMs, temporal CNNs, transformers like TFT) — shine with lots of data and many related series, overkill for a single short series.

Feature engineering (lags, rolling means, time-of-day/week/year, holidays, external regressors) is where much of the accuracy comes from.

## Validation: The Part People Get Wrong

You **cannot** use random train/test splits — that leaks the future into training. Use **time-aware validation**:
- **Backtesting / rolling-origin** — train on the past, predict the next window, roll forward, repeat. This mimics real deployment.
- Never let any feature use information from after the prediction time (**leakage** — the #1 cause of great backtests that fail in production).
- Evaluate with horizon-appropriate metrics (MAE, RMSE, MAPE, and scaled metrics like MASE that compare against naïve).

## Pitfalls

- **Leakage** — future-derived features, target in the inputs, or improper scaling across the split.
- **Concept drift** — the process changes (a pandemic, a product launch); models trained on old regimes fail. Monitor and retrain.
- **Over-differencing / overfitting seasonality** on short data.
- **Prediction intervals** — a point forecast without uncertainty is dangerous; forecast *ranges*, and widen them with horizon.
- **Outliers & missing data / irregular sampling** — handle deliberately.

The disciplined path: visualize and decompose first, beat a naïve baseline, respect time in validation, quantify uncertainty, and watch for drift after deployment. A humble seasonal-naïve done honestly often beats a fancy model validated wrong.
