---
name: market-microstructure
description: How markets work at the mechanical level — the order book, bid/ask spread, market vs limit orders and liquidity provision, price formation, market makers, and depth/liquidity. Educational, not financial advice. Use to understand the order book, bid-ask spread, liquidity, how prices form, or market makers.
category: engineering
keywords_vi: market microstructure, cấu trúc vi mô thị trường, order book sổ lệnh, bid ask spread, thanh khoản liquidity, price formation, market maker, độ sâu depth
---

# Market Microstructure

Market microstructure is how trading **actually works** at the mechanical level — how buyers and sellers meet, how prices form, and where costs come from. Understanding it explains the bid-ask spread, slippage, and why liquidity matters (see order-types-and-execution). *(Educational — not financial advice.)*

## The Order Book

Most modern markets are **continuous limit order books (CLOB)**: a live, sorted list of all outstanding **limit orders** (see order-types-and-execution):
- **Bids** — buy orders, sorted highest price first (the best bid = the most anyone will currently pay).
- **Asks (offers)** — sell orders, sorted lowest price first (the best ask = the cheapest anyone will currently sell).
The book shows **price levels** and the **quantity** available at each. A trade happens when a buyer and seller agree — a **market order** matches against the best available limit orders on the opposite side.

## The Bid-Ask Spread

The **spread** is the gap between the best bid and best ask — the difference between what you can immediately sell for (bid) and buy for (ask). It's a fundamental **cost**: cross the spread to trade immediately, and you instantly "lose" the spread. Why it exists:
- It **compensates liquidity providers** (market makers) for the risk and service of always being willing to trade.
- It reflects **uncertainty and risk** — wider in volatile, thin, or information-heavy conditions.
**Tight spreads** = liquid, cheap to trade; **wide spreads** = illiquid, expensive. The spread is your baseline transaction cost.

## Liquidity & Depth

**Liquidity** is how easily you can trade **without moving the price**. **Depth** is how much quantity sits in the book near the current price. A **deep, liquid** market absorbs large orders with little price movement; a **thin** market moves sharply when you trade (market impact — see order-types-and-execution). Liquidity varies by asset, time of day, and conditions — and can **vanish** in stress (everyone pulls their orders exactly when you need to trade).

## Takers vs Makers

- **Liquidity takers** — submit market orders (or aggressive limits) that **remove** orders from the book — immediacy, pay the spread.
- **Liquidity makers / market makers** — post limit orders that **add** to the book, waiting to be filled — earn the spread, provide the liquidity everyone else uses (see algorithmic-trading-strategies' market-making). Many exchanges charge takers and rebate makers.

## Price Formation

Price emerges from the continuous interaction of orders: as buyers lift offers and sellers hit bids, the "price" (last trade / mid-price) moves. New information causes participants to adjust their orders, shifting the book. So price is the real-time equilibrium of supply and demand in the book — not a number handed down, but the result of everyone's orders meeting.

## Pitfalls (in understanding/using)

- Ignoring the **spread** as a cost — you pay it every round trip; it dominates on thin/high-frequency trades.
- Assuming the **quoted price** is what you'll get — you trade against the **book**, and large orders walk it (impact).
- Trading **illiquid** instruments (wide spread, thin depth) where every order moves the price against you.
- Assuming **liquidity is stable** — it evaporates in stress/volatility exactly when you most need to exit.
- Confusing **volume** with **liquidity/depth** — high volume can still have thin depth at any instant.
- Not distinguishing **maker vs taker** costs/rebates when they matter to a strategy's economics.
- Forgetting that in fast markets the book changes in milliseconds (see high-frequency-trading-concepts).
