---
name: options-and-derivatives-basics
description: The basics of options and derivatives — calls and puts, the payoff asymmetry, intrinsic vs time value, the greeks (delta/gamma/theta/vega), leverage, hedging vs speculation, and why options are risky. Educational, not financial advice. Use to understand options, calls/puts, the greeks, derivatives, leverage, or hedging.
category: engineering
keywords_vi: options derivatives basics, quyền chọn phái sinh cơ bản, call put, payoff bất đối xứng, intrinsic time value, greeks delta gamma theta vega, đòn bẩy leverage, hedging đầu cơ
---

# Options & Derivatives Basics

Derivatives are contracts whose value **derives** from an underlying asset (a stock, index, commodity, crypto). **Options** are the most common. They enable hedging, leverage, and complex strategies — but their non-linear payoffs and leverage make them **easy to lose money on fast**. *(Educational — not financial advice; options are high-risk.)*

## Calls and Puts

An **option** gives the **right, not the obligation**, to buy or sell the underlying at a set **strike price** by an **expiration date**:
- **Call** — right to **buy** at the strike. Value rises as the underlying rises (bullish).
- **Put** — right to **sell** at the strike. Value rises as the underlying falls (bearish, or as insurance).
You pay a **premium** for this right. As a **buyer**, your loss is limited to the premium, but your gain can be large — an **asymmetric payoff**. As a **seller (writer)**, you collect the premium but take on the obligation and potentially **large or unlimited** losses — the asymmetry is reversed.

## Intrinsic vs Time Value

An option's premium is:
- **Intrinsic value** — how much it's already "in the money" (a call is worth at least underlying − strike if positive).
- **Time value** — extra value from the **chance** the option moves further into the money before expiry. Time value **decays** as expiration approaches (fastest near the end) — you're paying for time and it erodes.

## The Greeks

The "greeks" measure how an option's price responds to different factors — essential for managing options positions:
- **Delta** — sensitivity to the **underlying's price** (how much the option moves per $1 move in the underlying).
- **Gamma** — how fast delta changes (curvature; risk accelerates).
- **Theta** — **time decay** — how much value the option loses per day as expiry nears (the enemy of option buyers).
- **Vega** — sensitivity to **volatility** — options gain value when expected volatility rises (implied volatility is a huge driver of option prices).
- (Rho — interest-rate sensitivity.)
Options are multi-dimensional bets: you can be right on direction but lose to time decay or falling volatility.

## Leverage — Power and Danger

Options give **leverage** — a small premium controls a large notional position, so gains and losses are magnified relative to the capital. This cuts both ways: leverage is why options can multiply returns **and** why they can go to **zero** (an option can expire worthless, a 100% loss). Leverage amplifies everything, including mistakes.

## Hedging vs Speculation

- **Hedging** — using derivatives to **reduce** risk (e.g. buying puts as insurance on a stock you own — you pay premium to cap downside). This is the prudent, original purpose.
- **Speculation** — using leverage to **amplify** directional bets. High risk; most retail option speculation loses money (time decay and getting direction+timing+volatility all right is hard).
Same instruments, opposite risk intent — know which you're doing.

## Pitfalls (in understanding/using)

- Underestimating **leverage** — options can go to **zero** (total loss of premium); size accordingly (see risk-management-in-trading).
- Ignoring **theta (time decay)** — buying options and watching them bleed value even when you're "right" but slow.
- Ignoring **volatility (vega)** — buying overpriced (high-IV) options that lose value when volatility drops, even if direction is right.
- **Selling options** naked → potentially **unlimited** losses for a small premium (asymmetric risk against you).
- Confusing **hedging** (reduce risk) with **speculation** (amplify risk).
- Treating options like lottery tickets — most expire worthless; the odds favor sellers on average.
- Trading complex derivatives without understanding the greeks and the full payoff/risk.
