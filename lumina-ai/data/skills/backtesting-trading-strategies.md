---
name: backtesting-trading-strategies
description: How to backtest a trading strategy honestly — simulating a strategy on historical data, and the many biases that make backtests lie (lookahead, survivorship, overfitting, ignoring costs/slippage), plus out-of-sample testing and walk-forward. Educational, not financial advice. Use to understand backtesting, why backtests overstate returns, avoiding overfitting, or validating a trading strategy.
category: engineering
keywords_vi: backtesting trading, kiểm thử chiến lược trên dữ liệu lịch sử, lookahead bias, survivorship bias, overfitting quá khớp, bỏ qua chi phí slippage, out-of-sample walk-forward
---

# Backtesting Trading Strategies

Backtesting simulates a trading strategy on **historical data** to estimate how it would have performed. It's essential for validating an idea — but backtests are **notoriously easy to fool yourself with**, producing beautiful results that collapse in live trading. Understanding the biases is more important than running the test. *(Educational — not financial advice.)*

## What a Backtest Does

Replay history bar-by-bar, apply your strategy's rules as if trading in real time, and record the resulting trades and performance (returns, drawdown, Sharpe ratio — see portfolio-theory-and-diversification, risk-management-in-trading). Done honestly, it estimates the strategy's edge and risk. Done carelessly, it's a fantasy.

## The Biases That Make Backtests Lie

- **Lookahead bias** — using information that **wouldn't have been available** at decision time (e.g. using the day's closing price to decide a trade *during* the day, or using revised/restated data). The #1 subtle killer — it makes a strategy look prophetic. Ensure at each simulated moment you only use data known **then**.
- **Survivorship bias** — testing only on assets that **still exist** today, ignoring the ones that went bankrupt/delisted. This inflates returns (you "avoided" losers you couldn't have known to avoid). Use point-in-time universes including dead assets.
- **Overfitting / curve-fitting** — tuning parameters until the strategy looks perfect **on the historical data**. With enough knobs, you can fit any past — but you've fit **noise**, not a real edge, and it won't repeat. The more parameters and the more you optimize, the more the backtest lies (see how-overfitting-and-regularization-work).
- **Ignoring costs** — omitting commissions, the **bid-ask spread**, **slippage** (getting worse fills than assumed — see order-types-and-execution, market-microstructure), and market impact. These erase thin edges; a strategy profitable on paper is often unprofitable after realistic costs.
- **Data-snooping** — testing hundreds of strategies and picking the best-looking one; some will look great by pure chance. Multiple-testing inflates apparent performance.

## Honest Validation

- **Out-of-sample testing** — develop/tune on one period, then test on a **separate, untouched** period the strategy never saw. If it holds up out-of-sample, more credible (see how-overfitting-and-regularization-work's train/test discipline).
- **Walk-forward analysis** — repeatedly optimize on a window, test on the next, roll forward — simulating how you'd actually re-tune over time.
- **Model costs realistically** — include commissions, spread, slippage, and conservative fills.
- **Keep it simple** — fewer parameters = less overfitting; be suspicious of strategies that need precise tuning.
- **Paper-trade / small live** before committing — live results are the real test; backtests systematically overstate.

## Pitfalls (in understanding/using)

- **Lookahead bias** — using future/unavailable data → a fantasy backtest; use only point-in-time data.
- **Survivorship bias** — testing only surviving assets → inflated returns.
- **Overfitting** — optimizing parameters to historical noise; validate out-of-sample/walk-forward, keep it simple.
- **Ignoring costs/slippage** — the difference between a "profitable" backtest and losing money live.
- **Data-snooping** — cherry-picking the best of many tested strategies (some win by luck).
- Trusting a great backtest as a **prediction** — past performance doesn't guarantee future results; edges decay (see algorithmic-trading-strategies).
- No **out-of-sample** or live paper-trading before risking real money.
