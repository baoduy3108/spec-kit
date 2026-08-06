---
name: fixed-income-and-bond-pricing
description: Fixed income and bond pricing — bond mechanics (coupon, face value, maturity), present-value pricing, yield to maturity, the price-yield inverse relationship, duration and convexity (interest-rate risk), the yield curve, and credit vs interest-rate risk. Use when working with bonds, interest-rate risk, fixed-income valuation, or the yield curve.
category: engineering
keywords_vi: thu nhập cố định và định giá trái phiếu fixed income bond, cơ chế trái phiếu coupon mệnh giá kỳ hạn, định giá theo giá trị hiện tại present value, lợi suất đáo hạn yield to maturity, quan hệ nghịch giá và lợi suất, duration và convexity rủi ro lãi suất, đường cong lợi suất yield curve, rủi ro tín dụng và lãi suất
---

# Fixed Income & Bond Pricing

Fixed income — chiefly **bonds** — is lending money for scheduled payments. It's the largest financial market in the world (bigger than equities) and the backbone of how governments and companies fund themselves. Its math is cleaner than equities (cash flows are contractual), centering on present value, yield, and interest-rate sensitivity.

## Bond Mechanics

A standard bond is a loan with fixed terms:
- **Face/par value** — the amount repaid at the end (e.g. $1,000).
- **Coupon** — periodic interest payments (e.g. 5%/year), fixed at issuance.
- **Maturity** — when the face value is repaid.
- **Issuer** — government (treasuries), municipality, or corporation.

You buy the bond (lend), receive coupons, and get face value back at maturity. Bonds also trade on secondary markets, where their *price* moves.

## Pricing = Present Value of Cash Flows

A bond's fair price is the **present value of all its future cash flows** (coupons + face value), discounted at an appropriate rate:
`Price = Σ [coupon / (1+r)^t] + face / (1+r)^N`
A dollar tomorrow is worth less than today (time value of money), so future payments are discounted. The **discount rate r** reflects prevailing interest rates and the bond's risk. This PV framework is the foundation of all fixed-income valuation.

## Yield to Maturity

**Yield to maturity (YTM)** is the single discount rate that makes the bond's price equal the PV of its cash flows — the total return if held to maturity (reinvesting coupons at that rate). It's the standard way to quote a bond's return and compare bonds. Related yields: current yield (coupon/price), yield curve rates.

## The Price-Yield Inverse Relationship

The single most important fixed-income fact: **bond prices and yields move oppositely.**
- Market interest rates **rise** → existing bonds (with fixed lower coupons) become less attractive → their **price falls** (so their yield rises to match new rates).
- Rates **fall** → existing higher-coupon bonds are more attractive → **price rises**.

This inverse relationship is why bonds carry **interest-rate risk** even when the issuer never defaults — the *market value* swings with rates.

## Duration & Convexity

How *much* a bond's price moves when rates change:
- **Duration** — the sensitivity of price to interest-rate changes (roughly, % price change per 1% rate change), also interpretable as the weighted-average time to receive cash flows. **Longer maturity / lower coupon = higher duration = more rate-sensitive.** A 30-year bond swings far more than a 2-year for the same rate move. Duration is *the* measure of interest-rate risk and the key lever in bond portfolio management (matching, immunization, hedging).
- **Convexity** — duration itself changes as rates move; convexity is the second-order correction, capturing the *curvature* of the price-yield relationship. It refines duration's linear estimate for large rate moves and is generally favorable to bondholders.

## The Yield Curve

Plotting yield vs maturity gives the **yield curve** — normally upward-sloping (longer bonds yield more, compensating for time/uncertainty). Its shape is a powerful economic signal:
- **Normal (upward)** — healthy expectations.
- **Inverted (long < short)** — a classic **recession** warning; markets expect rates (and growth) to fall.
- **Flat** — transition/uncertainty.

Central-bank policy sets short rates; the market sets longer ones based on growth/inflation expectations. The curve drives pricing across all fixed income.

## Risks

- **Interest-rate risk** — price swings with rates (measured by duration), the core risk even for "safe" government bonds.
- **Credit/default risk** — the issuer may not pay; riskier issuers offer higher yields (a **credit spread** over risk-free) to compensate. Ratings (AAA→junk) gauge it (see credit-risk topics).
- **Inflation risk** — fixed payments lose real value if inflation rises.
- **Liquidity, call, reinvestment risks** — additional considerations.

Fixed income is **valuing contractual cash flows via present value**, quoted as yield, with prices moving inversely to rates — and the central risk is interest-rate sensitivity, measured by duration and convexity, read against the signal-rich yield curve.
