---
name: order-types-and-execution
description: How order types and trade execution work — market vs limit vs stop orders, slippage and market impact, execution algorithms (TWAP/VWAP), the trade-off between speed and price, and why execution quality matters. Educational, not financial advice. Use to understand order types, slippage, limit vs market orders, execution algorithms, or minimizing trading costs.
category: engineering
keywords_vi: order types execution, loại lệnh và khớp lệnh, market limit stop order, slippage market impact, twap vwap execution algo, đánh đổi tốc độ vs giá, chi phí giao dịch
---

# Order Types & Execution

How you **place and execute** orders directly affects your trading costs — often more than people realize. Even a good strategy bleeds money with poor execution (slippage, bad order choices). Execution is where a strategy meets the messy reality of the market (see market-microstructure). *(Educational — not financial advice.)*

## Core Order Types

- **Market order** — buy/sell **immediately** at the best available price. Guarantees **execution** but **not price** — you get filled now, but possibly at a worse price than you saw, especially in fast/thin markets (**slippage**). Use when getting in/out matters more than a few cents.
- **Limit order** — buy/sell only at a **specified price or better**. Guarantees **price** but **not execution** — you might not get filled if the market never reaches your limit (or moves past it). Use when price matters more than certainty of a fill. This is the fundamental trade-off: market = certain fill/uncertain price; limit = certain price/uncertain fill.
- **Stop order** — becomes a market order once price hits a **trigger** (used for stop-losses — see risk-management-in-trading — and breakouts). Note: a stop **market** can slip badly in a gap; a **stop-limit** avoids bad fills but risks not filling at all.
- Others: **stop-limit**, **trailing stop** (stop that follows price), **fill-or-kill**, **iceberg** (hide size).

## Slippage & Market Impact

- **Slippage** — the difference between the price you expected and the price you got. Caused by the **bid-ask spread** (see market-microstructure), price moving before your fill, and thin liquidity. It's a real, recurring cost that quietly erodes returns — and a top reason backtests overstate performance (see backtesting-trading-strategies).
- **Market impact** — **your own** order moving the price against you. Buying a large amount pushes the price up as you consume available sell orders (walking up the order book). The bigger your order relative to liquidity, the worse the impact.

## Execution Algorithms

To trade large size without heavy impact, orders are **broken up** and executed over time by algorithms:
- **TWAP** (Time-Weighted Average Price) — spread the order evenly over a time window.
- **VWAP** (Volume-Weighted Average Price) — execute in proportion to market volume (trade more when the market is liquid), aiming to match the day's average price.
- **Implementation shortfall / adaptive** — balance impact vs the risk of price moving while you wait.
The goal: get filled at a good average price without signaling your intent or moving the market.

## Speed vs Price Trade-off

Every execution choice balances **immediacy** against **price**: take liquidity now (market order, pay the spread/impact) vs provide liquidity and wait (limit order, risk missing the move). Aggressive = certain but costly; passive = cheaper but uncertain. Match the choice to how urgent the trade is and how much the edge depends on price.

## Pitfalls (in understanding/using)

- **Market orders in thin/fast markets** → nasty slippage; use limits when price matters.
- **Limit orders that never fill** → missing trades your strategy depended on (and chasing them worse).
- Ignoring **slippage/spread/impact** in strategy design and backtests → real returns far below paper.
- **Large orders** dumped at once → self-inflicted market impact; break them up (TWAP/VWAP).
- **Stop-market orders** slipping through gaps (or stop-limits not filling in a crash) — understand the trade-off.
- Trading **illiquid** instruments where any order moves the price (wide spreads, thin books).
- Forgetting that execution cost can **exceed the edge** on high-frequency/thin-margin strategies.
