---
name: how-stablecoins-work
description: How stablecoins work — crypto tokens pegged to a stable value (usually USD) via fiat reserves, crypto over-collateralization, or algorithmic mechanisms, plus why the peg can break and the risks of each type. Use to understand stablecoins, USDC/USDT/DAI, how a peg is maintained, algorithmic stablecoin collapse, or reserve/depeg risk.
category: engineering
keywords_vi: stablecoin, depeg mất neo, token neo giá usd, dự trữ fiat, thế chấp vượt mức crypto, stablecoin thuật toán, usdc usdt dai, rủi ro từng loại stablecoin
---

# How Stablecoins Work

A stablecoin is a crypto token designed to hold a **stable value** — almost always pegged to **$1 USD** — combining crypto's programmability/portability with the stability of fiat. They're the backbone of DeFi and crypto trading (a stable unit to price and settle in). The key question for any stablecoin is: **what actually backs the peg, and can it break?** (see how-nfts-and-tokens-work, how-defi-primitives-work).

## Why Stablecoins Exist

Regular cryptocurrencies are **volatile** — useless as everyday money or a stable store of value. Stablecoins provide a **crypto-native dollar**: you can hold, send, and use it in smart contracts (DeFi lending, trading pairs, payments) without price swings, while keeping crypto's speed and composability. But "stable" depends entirely on the **peg mechanism**.

## The Three Types (by what backs the peg)

**1. Fiat-collateralized (off-chain reserves)** — e.g. **USDC, USDT**.
- A company holds **real dollars/assets** in reserve (bank accounts, T-bills) and issues 1 token per $1 held; you can (in principle) redeem 1 token for $1.
- **Peg mechanism:** redeemability + arbitrage. If the token trades below $1, arbitrageurs buy it cheap and redeem for $1; above $1, they mint new tokens.
- **Risk:** you **trust the issuer** — that reserves are real, fully-backing, liquid, and redeemable. Centralized: the issuer can **freeze** addresses, and reserves can be mismanaged or become illiquid. Requires trust/audits/regulation.

**2. Crypto-collateralized (on-chain, over-collateralized)** — e.g. **DAI**.
- Backed by **crypto** locked in smart contracts, but **over-collateralized** (e.g. $150+ of ETH locked per $100 of stablecoin) because the collateral itself is volatile.
- **Peg mechanism:** if collateral value falls near the threshold, positions are **liquidated** automatically to keep the system solvent.
- **Risk:** decentralized and transparent, but **capital-inefficient** (locks more than it issues), and a **sharp crash** in collateral (or liquidation failure during congestion) can undercollateralize it.

**3. Algorithmic (little or no collateral)** — e.g. the failed **UST/Terra**.
- Tries to hold the peg via **algorithms and incentives** (minting/burning a paired token to expand/contract supply), with minimal hard collateral.
- **Risk:** the most fragile. The peg depends on **market confidence** and arbitrage incentives that can enter a **death spiral** — if confidence breaks, the mechanism accelerates the collapse instead of correcting it. **UST/Luna's ~$40B collapse (2022)** is the cautionary tale. Purely algorithmic stablecoins have a poor track record.

## Why Pegs Break (depeg)

- **Reserve doubt** (fiat-backed) — fear that reserves aren't fully there → a run, redemptions overwhelm liquidity (USDC briefly depegged when reserves were stuck at a failed bank).
- **Collateral crash** (crypto-backed) — collateral falls faster than liquidations can cover.
- **Confidence/death spiral** (algorithmic) — the self-reinforcing collapse.
- **Liquidity/redemption friction** — even sound backing depegs if you can't redeem fast during panic.
A stablecoin is only as stable as its **weakest link under stress** — the peg holds in calm markets and is **tested** in crises.

## Design Guidance / Implications

- **Know what backs it** — fiat reserves (trust the issuer), crypto over-collateral (trust the mechanism), or algorithm (highest risk).
- **Fiat-backed** = counterparty/centralization/freeze risk but simplest peg.
- **Crypto-backed** = transparent but capital-inefficient and crash-sensitive.
- **Algorithmic** = treat with deep skepticism; historically fragile.
- **Diversify** stablecoin exposure; don't assume "stable" = risk-free.
- **Watch redeemability and reserves**, not just the current price.

## Pitfalls (in understanding/using)

- Assuming "stablecoin" = **risk-free / always $1** → pegs can and do break under stress.
- Trusting **fiat-backed** without verifying reserves/redeemability → issuer/reserve risk.
- Underestimating **algorithmic** fragility → death spirals (UST) can wipe out value fast.
- Ignoring **centralization/freeze** power of fiat-backed issuers.
- Overlooking **liquidation risk** in crypto-backed models during sharp crashes.
- Confusing the on-screen **price** (temporarily $1) with underlying **solvency/backing**.
