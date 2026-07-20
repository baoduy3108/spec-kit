---
name: how-defi-primitives-work
description: How DeFi building blocks work — lending/borrowing with over-collateralization and liquidations, yield, and composability ("money legos") where protocols stack together, plus the systemic risks that composability creates. Use to understand DeFi lending/borrowing, over-collateralization, liquidations, yield farming, composability, or DeFi systemic risk.
category: engineering
keywords_vi: defi primitives hoạt động thế nào, cho vay vay mượn thế chấp vượt mức, thanh lý liquidation, lợi suất yield, khả năng ghép nối money legos, rủi ro hệ thống từ composability
---

# How DeFi Primitives Work

DeFi (Decentralized Finance) rebuilds financial services — lending, borrowing, trading, earning yield — as **smart contracts** anyone can use permissionlessly, without banks or intermediaries. Beyond trading and AMMs (see crypto-and-defi-trading), the core building blocks are **lending/borrowing** and the property that makes DeFi powerful *and* dangerous: **composability** (see how-smart-contracts-work, how-stablecoins-work, how-oracles-work).

## Lending and Borrowing (over-collateralized)

DeFi lending protocols (Aave, Compound) let users **deposit** assets to earn interest and **borrow** against collateral — with no credit checks or identity, because there's no way to enforce repayment on an anonymous borrower. The solution: **over-collateralization**.
- To borrow $100, you must lock **more** than $100 of collateral (e.g. $150 of ETH). You'd only do this to get liquidity without selling, to short, or to leverage.
- **Interest rates** are algorithmic — they rise as more of the pool is borrowed (high utilization → higher rates), balancing supply and demand automatically.
- **Liquidation** — if your collateral's value falls so your loan is **under-collateralized** (below a threshold), anyone can **liquidate** you: repay part of your debt and seize your collateral at a discount. This keeps the protocol solvent (no bad debt) but means a **price drop can wipe out your position** — often triggered fast during volatility. Liquidations depend on accurate **oracle** prices (see how-oracles-work).

## Yield (where returns come from)

"Yield" in DeFi comes from real sources — **lending interest**, **trading fees** (providing liquidity to AMMs — see crypto-and-defi-trading), and **protocol token incentives** ("yield farming," often temporary emissions to bootstrap usage). Critical to ask: **where does the yield actually come from?** Sustainable yield is fee/interest-based; unsustainable "yield" is often just token inflation or, at worst, a Ponzi-like structure. High advertised APYs usually carry high risk (impermanent loss, token dilution, protocol/smart-contract risk, or unsustainability).

## Composability: "Money Legos"

The defining property of DeFi: protocols are **open smart contracts that freely call each other**, so they **stack** into new products. You can deposit into protocol A, take the receipt token, use it as collateral in protocol B, borrow, and deploy that elsewhere — permissionlessly, without asking anyone. This composability enables rapid innovation ("money legos") and capital efficiency.

**But composability is double-edged:** it also **composes risk**. Because protocols are interdependent:
- A bug or exploit in one protocol can **cascade** into every protocol built on top of it.
- A **depegged stablecoin** or **manipulated oracle** propagates through everything using it.
- **Flash loans** (borrow huge amounts with no collateral if repaid in the same transaction) supercharge attacks by giving anyone temporary capital to manipulate prices/exploit logic (see blockchain-security-pitfalls).
So a failure anywhere in the stack can trigger **systemic, cascading** losses — DeFi's interconnectedness is both its strength and its fragility.

## Design Guidance / Implications

- **Over-collateralize and monitor** — borrowing means liquidation risk; watch your collateral ratio, especially in volatility.
- **Understand where yield comes from** — sustainable (fees/interest) vs unsustainable (inflationary emissions); high APY = high risk.
- **Composability = inherited risk** — using a protocol exposes you to every protocol *it* depends on (oracles, stablecoins, underlying pools).
- **Smart-contract risk is ever-present** — even "blue-chip" DeFi has been exploited; contracts can have bugs (see blockchain-security-pitfalls).
- **Oracle and stablecoin dependencies** are common failure points — know what a protocol relies on.

## Pitfalls (in understanding/using)

- Ignoring **liquidation risk** → a price drop wipes out an over-leveraged position, fast.
- Chasing **high APY** without asking where yield comes from → unsustainable emissions or outright scams.
- Underestimating **composability risk** → one protocol's exploit/depeg cascades into yours.
- Forgetting **oracle dependence** → manipulated prices trigger wrongful liquidations or drains.
- Treating DeFi as **risk-free "high-yield savings"** → it stacks smart-contract, oracle, liquidation, and systemic risks.
- Assuming **audited = safe** → audits reduce but don't eliminate risk; exploits still happen.
