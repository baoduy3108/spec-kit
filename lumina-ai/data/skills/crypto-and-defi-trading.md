---
name: crypto-and-defi-trading
description: How crypto and DeFi trading differs from traditional markets — 24/7 markets, CEXs vs DEXs, automated market makers (AMMs) and liquidity pools, impermanent loss, on-chain mechanics (gas, MEV, slippage), and the elevated risks. Educational, not financial advice. Use to understand crypto/DeFi trading, AMMs/DEXs, liquidity pools, impermanent loss, or on-chain trading mechanics.
category: engineering
keywords_vi: crypto defi trading, giao dịch tiền mã hóa phi tập trung, cex vs dex, amm liquidity pool, impermanent loss tổn thất tạm thời, on-chain gas mev slippage, rủi ro cao
---

# Crypto & DeFi Trading

Crypto and decentralized finance (DeFi) trading shares concepts with traditional markets (see market-microstructure, algorithmic-trading-strategies) but has **distinct mechanics and elevated risks**. Understanding what's different — especially DeFi's automated market makers and on-chain reality — is essential. *(Educational — not financial advice; crypto is highly volatile and risky.)*

## What's Different

- **24/7 markets** — no market close; volatility and events happen anytime (bots run around the clock).
- **Extreme volatility** — far larger price swings than traditional assets.
- **Custody** — "not your keys, not your coins"; self-custody vs exchange risk (exchanges have failed/frozen — counterparty risk is real).
- **Nascent, less-regulated** — more manipulation, scams, and thin liquidity on many assets.

## CEX vs DEX

- **Centralized exchanges (CEX)** — traditional **order books** (see market-microstructure) run by a company; familiar UX, deep liquidity, but you trust the exchange with custody and it can fail/freeze.
- **Decentralized exchanges (DEX)** — trade **on-chain** via smart contracts, non-custodial (you keep your keys), but with different mechanics (AMMs) and on-chain costs/risks (below).

## Automated Market Makers (AMMs) & Liquidity Pools

The core DeFi innovation. Instead of an order book, a DEX like Uniswap uses an **AMM**: a **liquidity pool** of two tokens, with prices set by a formula (classically **constant product**, x·y = k). Traders swap against the pool; the ratio of tokens in the pool determines the price, which shifts as trades occur. **Liquidity providers (LPs)** deposit token pairs into the pool to earn fees. This lets anyone trade or provide liquidity permissionlessly, no order book needed.

## Impermanent Loss (the LP trap)

A crucial, misunderstood risk for liquidity providers: because the AMM rebalances the pool as prices move, an LP ends up holding **more of the token that fell and less of the one that rose** compared to just holding the tokens. If one token's price diverges significantly from the other, the LP's value is **less than if they'd simply held** — that gap is **impermanent loss** (permanent if you withdraw at the divergence). Fees may or may not offset it. Providing liquidity is not "free yield" — it carries this real risk.

## On-Chain Mechanics

Trading on-chain has costs/risks traditional trading doesn't:
- **Gas fees** — every transaction costs gas (see how-blockchain-works); can exceed small trades' value, and spikes under congestion.
- **Slippage** — AMM prices move with trade size against thin pools (see order-types-and-execution); set slippage tolerance carefully.
- **MEV (Maximal Extractable Value)** — bots reorder/insert transactions to profit at your expense (front-running, sandwich attacks) — a real cost/risk on public mempools.
- **Smart-contract risk** — bugs/exploits can drain funds; you trust the code (see security-and-hardening, threat-modeling).
- **Scams** — rug pulls, fake tokens, malicious contracts abound.

## Pitfalls (in understanding/using)

- Providing liquidity for "yield" without understanding **impermanent loss** — you can end up worse than holding.
- Ignoring **gas + slippage + MEV** costs — they can dwarf your edge or the trade itself.
- **Custody mistakes** — leaving funds on a failing exchange, or losing keys (irreversible — see how-public-key-crypto-works).
- **Smart-contract / rug-pull** risk — trusting unaudited contracts or fake tokens.
- Treating crypto like a stable asset — extreme volatility can wipe out positions fast (risk management is vital — see risk-management-in-trading).
- Assuming DEX prices/liquidity are deep — many pools are thin (huge slippage).
- Falling for scams, hype, and manipulation in a lightly-regulated space.
