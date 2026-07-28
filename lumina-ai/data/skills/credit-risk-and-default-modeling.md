---
name: credit-risk-and-default-modeling
description: Credit risk and default modeling — probability of default (PD), loss given default (LGD), exposure at default (EAD), expected vs unexpected loss, credit scoring, structural vs reduced-form models, credit spreads and ratings, and portfolio credit risk/concentration. Use when modeling default risk, lending decisions, credit scoring, or pricing credit-risky instruments.
category: engineering
keywords_vi: rủi ro tín dụng credit risk, mô hình vỡ nợ default, xác suất vỡ nợ pd, tổn thất khi vỡ nợ lgd, dư nợ khi vỡ nợ ead, tổn thất kỳ vọng expected loss, chấm điểm tín dụng credit scoring, chênh lệch tín dụng spread xếp hạng, rủi ro danh mục tập trung concentration
---

# Credit Risk & Default Modeling

Credit risk is the risk that a borrower **fails to repay** — the core risk of all lending, bonds, and counterparty exposure. Quantifying and pricing it is fundamental to banks, lenders, and bond investors. The discipline decomposes "will they pay, and if not how much do I lose?" into measurable components.

## The Three Components of Expected Loss

Credit loss is modeled as a product of three quantities:
- **PD (Probability of Default)** — how likely the borrower defaults over a horizon (e.g. 1 year). Estimated from credit scores, financials, ratings, or market data.
- **LGD (Loss Given Default)** — the fraction *not* recovered if default happens (1 − recovery rate). A secured loan with collateral has low LGD; unsecured debt high.
- **EAD (Exposure at Default)** — how much is owed at the moment of default (matters for credit lines/revolving credit that may be drawn down).

**Expected Loss (EL) = PD × LGD × EAD.** This decomposition (from Basel regulation) is the backbone of credit risk measurement — price loans/bonds to cover EL plus a margin.

## Expected vs Unexpected Loss

- **Expected loss** — the average loss you *anticipate*; it's a cost of doing business, priced into interest rates and covered by provisions/reserves.
- **Unexpected loss** — the *variability* around the average (a bad year, correlated defaults). This is the real danger, covered by **capital** (a buffer against surprises), and measured by the tail of the loss distribution (credit VaR). The distinction is central: you *plan* for expected loss and *hold capital* against unexpected loss.

## Credit Scoring

For retail/consumer lending, **credit scoring** estimates PD from borrower attributes:
- Statistical/ML models (logistic regression classically, gradient boosting now) trained on historical defaults, using features like payment history, debt levels, income, utilization.
- Output: a score → PD → approve/decline/price decision.
- Concerns: **interpretability** (explain adverse decisions — often legally required), **fairness/bias** (avoid discriminatory proxies), and stability over time. A powerful but opaque model can be a regulatory/ethical liability here (see model interpretability, fairness).

## Models of Default

- **Structural models** (Merton) — treat equity as an option on the firm's assets; default happens when asset value falls below debt. Ties default to a firm's balance sheet and market data. Elegant, links credit to equity markets.
- **Reduced-form models** — treat default as a random event with an intensity/hazard rate calibrated to market prices (credit spreads). Pragmatic for pricing credit instruments.
- **Statistical/scorecard** — data-driven PD estimation (retail).

Each suits different contexts (corporate vs retail, pricing vs risk management).

## Credit Spreads & Ratings

The market prices credit risk as a **spread** — extra yield over the risk-free rate to compensate for default risk (see fixed-income-and-bond-pricing). Riskier borrowers pay more. **Ratings** (AAA down to junk/CCC, from agencies) summarize creditworthiness and map roughly to PD; spreads widen as ratings fall. **CDS (credit default swaps)** are instruments that trade credit risk directly, and their prices imply market-view PDs.

## Portfolio Credit Risk

The hardest part isn't one loan — it's a **portfolio**, where the danger is **correlation and concentration**:
- **Diversification** reduces idiosyncratic risk, but **systematic risk** (a recession causing many defaults *together*) can't be diversified away — this correlation drives the fat tail of losses.
- **Concentration risk** — too much exposure to one borrower, sector, or region amplifies unexpected loss.
- The 2008 crisis was fundamentally a failure to model correlated mortgage defaults — assuming independence when defaults were deeply correlated. A key lesson: **default correlation is the crucial, hard-to-estimate driver of portfolio risk.**

## Regulation

Basel accords frame bank credit-risk capital around PD/LGD/EAD and stress testing, requiring capital sized to unexpected loss. Regulatory frameworks heavily shape how credit risk is measured in practice.

Credit-risk modeling **decomposes default into PD × LGD × EAD for expected loss**, holds capital against unexpected (tail) loss, estimates PD via scoring/structural/reduced-form models, prices it as spreads over risk-free — and treats **default correlation and concentration** as the critical, dangerous driver of portfolio losses.
