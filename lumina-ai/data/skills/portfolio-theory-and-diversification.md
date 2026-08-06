---
name: portfolio-theory-and-diversification
description: The fundamentals of portfolio construction — diversification and correlation, the risk-return trade-off, Modern Portfolio Theory and the efficient frontier, the Sharpe ratio, and why diversification is "the only free lunch." Educational, not financial advice. Use to understand diversification, correlation, portfolio risk, Sharpe ratio, or Modern Portfolio Theory.
category: engineering
keywords_vi: portfolio theory, diversification đa dạng hóa, correlation, sharpe ratio, efficient frontier, lý thuyết danh mục, đánh đổi rủi ro lợi nhuận, free lunch
---

# Portfolio Theory & Diversification

Portfolio theory studies how to combine assets to get the **best return for a given level of risk**. Its central insight — that combining imperfectly-correlated assets reduces risk without proportionally reducing return — is one of the most important ideas in finance. *(Educational — not financial advice.)*

## Risk-Return Trade-off

The foundational principle: **higher expected return comes with higher risk** (volatility/uncertainty). There's no free return without risk. Rational investing is about getting **the most return per unit of risk** you take — not maximizing return (which just means max risk) or minimizing risk (which means cash and no growth). Everything below is about optimizing that ratio.

## Diversification & Correlation (the free lunch)

Combining assets that **don't move together** reduces portfolio risk: when one falls, another may hold or rise, smoothing the whole. The key is **correlation** — how assets move relative to each other (−1 = opposite, 0 = unrelated, +1 = identical):
- **Low/negative correlation** assets diversify well — their ups and downs partly cancel, cutting overall volatility **more than** they cut return.
- **Highly correlated** assets (or "diversifying" across ten tech stocks) don't diversify — they all crash together.
This is famously called **"the only free lunch in investing"** — genuine risk reduction without giving up expected return, purely from combining uncorrelated things. Diversify across assets, sectors, geographies, and strategies.

## Modern Portfolio Theory & the Efficient Frontier

**MPT** (Markowitz) formalizes this: for any set of assets, there's an **efficient frontier** — the set of portfolios giving the **maximum return for each level of risk**. Portfolios below the frontier are inefficient (you could get more return for the same risk, or less risk for the same return). The optimal mix depends on the assets' expected returns, volatilities, and **correlations**. You choose a point on the frontier matching your risk tolerance.

## The Sharpe Ratio

The standard measure of **risk-adjusted return**: (return − risk-free rate) ÷ volatility. It answers "how much return am I getting per unit of risk?" A strategy/portfolio with higher return but proportionally higher risk isn't better — Sharpe normalizes for that. Compare investments by Sharpe (and related measures like Sortino, which counts only downside risk), not raw returns. Risk-adjusted return is what matters.

## Limitations (important caveats)

- **Correlations aren't stable** — they **rise toward 1 in crises**, so diversification fails exactly when you need it most (everything crashes together). Don't over-trust historical correlations.
- **Inputs are uncertain** — MPT needs expected returns/correlations you can't know precisely; small errors give very different "optimal" portfolios.
- **Volatility ≠ all risk** — tail risks, illiquidity, and fat tails aren't captured by standard-deviation-based models.
Use the ideas as a framework, not a precise machine.

## Pitfalls (in understanding/using)

- **Fake diversification** — holding many highly-correlated assets (ten similar stocks) thinking you're diversified.
- Chasing **raw returns** instead of **risk-adjusted** returns (Sharpe) — high return via high risk isn't skill.
- Trusting **historical correlations** — they spike to 1 in crises; diversification fails in crashes.
- Over-optimizing MPT on **noisy inputs** → fragile "optimal" portfolios (garbage in).
- Equating **volatility** with all risk — ignoring tail/liquidity/fat-tail risk.
- Concentrating (no diversification) and calling luck skill — until one event wipes you out.
- Forgetting that diversification reduces **specific** risk but not **market-wide** (systematic) risk.
