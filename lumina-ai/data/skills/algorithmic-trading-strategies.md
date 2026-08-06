---
name: algorithmic-trading-strategies
description: The main families of algorithmic/systematic trading strategies — trend-following/momentum, mean-reversion, arbitrage/pairs, market-making, and event-driven — the market conditions each suits, and why edges decay. Educational, not financial advice. Use to understand algo trading strategy types, momentum vs mean-reversion, arbitrage, or designing a systematic strategy.
category: engineering
keywords_vi: algorithmic trading strategies, chiến lược giao dịch thuật toán, trend following momentum, mean reversion hồi quy trung bình, arbitrage pairs, market making, event-driven, edge suy giảm
---

# Algorithmic Trading Strategies

Systematic (algorithmic) trading executes rules-based strategies automatically. Most strategies fall into a few **families**, each exploiting a different market behavior and suited to different conditions. *(Educational — not financial advice; trading is risky and most retail algo strategies lose money.)*

## Trend-Following / Momentum

**Bet that trends persist** — buy what's going up, sell what's going down. Based on the empirical tendency of prices to continue in a direction (momentum). Uses trend indicators (moving-average crossovers, breakouts — see technical-analysis-indicators). 
- **Works in** — strongly trending markets; a few big wins pay for many small losses (positive skew, low win rate).
- **Fails in** — choppy/ranging markets → repeated whipsaw losses ("death by a thousand cuts"). Requires discipline to sit through drawdowns and let winners run.

## Mean-Reversion

**Bet that prices return to an average** — buy when unusually low, sell when unusually high, expecting a snap back. Uses oscillators/bands (RSI, Bollinger, z-scores). The opposite worldview to momentum.
- **Works in** — range-bound, stable markets; high win rate, small wins.
- **Fails catastrophically in** — trends/regime breaks → you keep buying a falling market ("catching a falling knife"), and one big move wipes out many small gains (negative skew). Needs strict stops.
Momentum and mean-reversion are **opposites** — the same market can't reward both; matching strategy to regime is key.

## Arbitrage / Pairs / Statistical Arbitrage

**Exploit price discrepancies** between related instruments. **Pure arbitrage** (same asset, two prices) is near-riskless but rare and fiercely competed. **Statistical arbitrage / pairs trading** — trade the spread between historically-correlated assets when it diverges, betting it re-converges. Market-neutral (profits regardless of overall direction), but the relationship can **break** (correlation isn't guaranteed).

## Market-Making

**Provide liquidity** — continuously quote buy and sell prices, earning the **bid-ask spread** (see market-microstructure). Profits from volume, not direction. Requires managing **inventory risk** (getting stuck holding a position) and adverse selection (trading against better-informed players). Dominated by fast, sophisticated firms (see high-frequency-trading-concepts).

## Event-Driven

**Trade around events** — earnings, news, economic releases, mergers (see sentiment-driven-trading). React faster/smarter than others to new information. Requires reliable, fast data and careful handling of volatility spikes.

## Why Edges Decay (the hard truth)

Markets are **adaptive and competitive**: when a profitable pattern is discovered, others exploit it until it disappears (**alpha decay**). Public/simple strategies are largely arbitraged away. Any real edge is usually small, temporary, and requires constant research to maintain. The **efficient market** tendency means most "obvious" strategies don't work by the time you find them.

## Pitfalls (in understanding/using)

- **Regime mismatch** — running mean-reversion in a trend (or vice versa) → blowups; know the regime.
- Confusing a strategy that worked in **backtest** with one that works live (overfitting — see backtesting-trading-strategies).
- Ignoring **costs** (spread, commissions, slippage — see order-types-and-execution) that erase thin edges.
- Assuming **correlations/relationships hold** (pairs trading) — they break, often at the worst time.
- **No risk management** — even a good strategy needs position sizing/stops (see risk-management-in-trading); one bad trade can ruin it.
- Believing you have an **edge** you don't — most patterns are noise or already arbitraged (alpha decay).
- Underestimating competition — you're trading against professionals and machines.
