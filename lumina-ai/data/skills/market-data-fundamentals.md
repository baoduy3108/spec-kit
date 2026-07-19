---
name: market-data-fundamentals
description: How market data works — tick data, OHLCV bars/candles, level 1 vs level 2 (order book) data, time frames, data quality issues (gaps, splits, survivorship), timestamps/timezones, and normalization. Educational, not financial advice. Use to understand market data, OHLCV/candles, tick data, order-book data, or preparing market data for analysis/trading.
category: engineering
keywords_vi: market data, ohlcv, tick data, candle nến, level 2 order book, dữ liệu thị trường, khung thời gian, split adjusted, timestamp timezone chuẩn hóa
---

# Market Data Fundamentals

Every trading decision rests on market data — and **bad data produces bad decisions and misleading backtests** (see backtesting-trading-strategies). Understanding what market data is, its granularities, and its many quality pitfalls is foundational for any trading or analysis system. *(Educational — not financial advice.)*

## Granularity: Ticks to Bars

- **Tick data** — every individual trade/quote, the rawest and highest-resolution data (huge volume). Needed for microstructure/HFT analysis (see market-microstructure); heavy to store/process (see how-time-series-databases-work).
- **OHLCV bars / candles** — data aggregated into time intervals (1-minute, 1-hour, daily), each bar summarizing: **O**pen, **H**igh, **L**ow, **C**lose prices and **V**olume for that period. The common format for charts and most strategies — a manageable summary of price action. "Candlesticks" are the visual form.
- **Time frames** — the same asset looks different at different intervals; strategies are tied to a time frame. Longer frames = less noise, slower signals; shorter = more noise, more opportunities and costs.

## Level 1 vs Level 2

- **Level 1** — best bid, best ask, and last trade — the top of the book. Enough for many strategies.
- **Level 2 (market depth / order book)** — the full **order book** (see market-microstructure): all price levels and quantities. Needed for microstructure analysis, execution, and depth-aware strategies. Much heavier data.

## Data Quality Issues (where beginners get burned)

Market data is messier than it looks, and these issues silently corrupt analysis:
- **Gaps / missing data** — feed outages, halts, illiquid periods leave holes; handle them (don't treat a gap as a real price move).
- **Splits & dividends / corporate actions** — a stock split makes the price drop 50% overnight — **not** a real loss. Use **adjusted** prices for historical analysis, or your signals see phantom crashes. A classic data bug.
- **Survivorship bias** — datasets of only currently-existing assets (see backtesting-trading-strategies) — inflates results.
- **Bad ticks / outliers** — erroneous prints (a fat-finger trade, a data glitch) can trigger false signals; filter outliers.
- **Timestamps & timezones** — mixing timezones or exchange vs local time misaligns data and causes lookahead bugs; **normalize to UTC** and know the exchange's session times (see datetime-and-timezones).
- **Point-in-time correctness** — use data as it was **known then** (not later-revised versions) to avoid lookahead bias.

## Normalization

Consolidate data from multiple sources/exchanges into a **consistent schema** (symbols, timestamps in UTC, adjusted prices, aligned bars), handling different formats, symbologies, and session times. Downstream analysis assumes clean, aligned data — garbage in, garbage out.

## Pitfalls (in understanding/using)

- **Unadjusted prices** for splits/dividends → phantom crashes/jumps that wreck signals and backtests.
- **Timezone/timestamp** mistakes → misaligned data and **lookahead bias** (see backtesting-trading-strategies).
- **Gaps/missing data** treated as real price moves.
- **Bad ticks/outliers** triggering false signals — filter them.
- **Survivorship bias** in historical datasets → over-optimistic results.
- Using **later-revised** data instead of point-in-time (lookahead).
- Underestimating **tick/level-2 data volume** — storage/processing costs (see how-time-series-databases-work).
- Assuming data from different sources is **comparable** without normalization (symbology, session, adjustment differences).
