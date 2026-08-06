---
name: technical-analysis-indicators
description: How common technical-analysis indicators work — moving averages, RSI, MACD, Bollinger Bands, volume — what each measures (trend, momentum, volatility), how they're combined, and their limitations (lagging, false signals). Educational, not financial advice. Use to understand technical indicators, chart analysis, RSI/MACD/moving averages, or building indicator-based trading logic.
category: engineering
keywords_vi: technical analysis indicators, chỉ báo kỹ thuật, moving average, rsi macd bollinger, trung bình động, momentum volatility trend, tín hiệu sai lagging, phân tích biểu đồ
---

# Technical Analysis Indicators

Technical indicators are mathematical transforms of price/volume data used to gauge **trend, momentum, and volatility** in markets. They're the building blocks of chart-based and algorithmic trading logic. *(Educational overview — not financial advice; markets are risky and no indicator predicts the future.)*

## What Indicators Measure

Indicators fall into a few families by what they capture:
- **Trend** — direction and strength (moving averages, MACD).
- **Momentum / oscillators** — speed of change, overbought/oversold (RSI, stochastics).
- **Volatility** — how much price is moving (Bollinger Bands, ATR).
- **Volume** — participation/conviction behind a move (OBV, volume profile).
No single indicator tells the whole story; traders combine complementary ones.

## Key Indicators

- **Moving Averages (MA)** — the average price over N periods, smoothing noise to reveal trend. **SMA** (simple) weights all periods equally; **EMA** (exponential) weights recent prices more (reacts faster). **Crossovers** (a fast MA crossing a slow MA) are classic trend signals. MAs are **lagging** — they confirm trends, not predict them.
- **RSI (Relative Strength Index)** — a 0–100 momentum oscillator; conventionally >70 = "overbought," <30 = "oversold." Useful for spotting exhaustion/reversals — but in strong trends it can stay extreme for a long time (a common trap).
- **MACD** — the difference between two EMAs plus a signal line; captures trend + momentum via crossovers and the histogram. Popular for trend-following momentum.
- **Bollinger Bands** — a moving average with bands at ±N standard deviations (volatility). Price near the upper/lower band and band width signal volatility and potential mean-reversion (see algorithmic-trading-strategies).
- **ATR (Average True Range)** — pure volatility measure; used for position sizing and stop placement (see risk-management-in-trading).

## Combining & Confirming

Indicators are strongest as **confirmation**, not standalone signals: e.g. a trend indicator (MA) plus a momentum indicator (RSI) plus volume agreeing gives more confidence than any alone. But beware **redundancy** — stacking five momentum indicators isn't diversification (they all say the same thing). Use complementary types.

## Limitations (crucial)

- **Lagging** — most indicators are derived from **past** prices, so they confirm what already happened, not what will. They don't predict.
- **False signals / whipsaws** — in choppy/ranging markets, crossovers and oscillators fire constantly and wrongly.
- **Curve-fitting** — tuning indicator parameters to look great on past data rarely holds up (see backtesting-trading-strategies).
- **Not causal** — indicators describe price patterns; markets are driven by real factors indicators can't see.
Indicators are a lens, not a crystal ball.

## Pitfalls (in understanding/using)

- Treating indicators as **predictive** — they're lagging/descriptive; they confirm, not foretell.
- **Overbought/oversold** (RSI) as automatic reversal signals — strong trends stay extreme; you get run over shorting a rally.
- **Indicator soup** — stacking many redundant momentum indicators mistaken for confirmation.
- **Curve-fitting** parameters to historical data (looks perfect, fails live — see backtesting-trading-strategies).
- Ignoring **regime** — an indicator that works in trends fails in ranges and vice versa.
- Using indicators **without risk management** — the edge is small and probabilistic; position sizing/stops matter more (see risk-management-in-trading).
- Forgetting these describe **price**, not value/fundamentals — and past patterns don't guarantee future results.
