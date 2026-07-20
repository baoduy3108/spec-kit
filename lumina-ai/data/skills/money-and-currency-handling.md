---
name: money-and-currency-handling
description: Handling money correctly in code — never using floats, storing integer minor units (cents), tracking currency explicitly, safe rounding, and pitfalls of multi-currency and foreign exchange. Use to represent money in software, avoid floating-point money bugs, handle currencies and rounding, or store amounts correctly.
category: engineering
keywords_vi: xử lý tiền tệ, không dùng float, số nguyên cents, đa tiền tệ, lưu tiền trong code, theo dõi loại tiền, làm tròn an toàn, tỉ giá, lỗi dấu phẩy động
---

# Handling Money and Currency in Code

Representing money in software is a classic source of subtle, expensive bugs. The rules are simple but frequently violated: **never use floating-point for money**, store amounts as **integer minor units**, always track the **currency**, and be deliberate about **rounding**. Get this wrong and you lose fractions of cents that add up to real money and failed audits (see designing-a-ledger, how-double-entry-accounting-works).

## Rule 1: Never Use Floats

`0.1 + 0.2 != 0.3` in floating point. Floats (`float`/`double`) **cannot exactly represent** most decimal fractions, so money arithmetic accumulates **rounding errors**. Summing thousands of float amounts drifts from the true total; comparisons fail; balances don't reconcile. **Never store or compute money as a float.** This is the single most important rule.

## Rule 2: Integer Minor Units (or Decimal)

Store money as an **integer number of the smallest unit** — cents, not dollars: `$19.99` → `1999`. Integer arithmetic is **exact**; no rounding drift. Alternatively use an arbitrary-precision **decimal** type (Python `Decimal`, Java `BigDecimal`, SQL `DECIMAL`) — also exact. Both are correct; **integer minor units** are common and simple. Note that not all currencies have 2 decimal places: **JPY** has 0 (¥100 = 100 units), some have 3 — so "cents" isn't universal; store the currency's actual **exponent**.

## Rule 3: Always Track the Currency

An amount **without a currency is meaningless** — `1000` is $10 or ¥1000 depending on currency. Always store the **currency code** (ISO 4217: USD, EUR, JPY) alongside every amount. Never mix currencies in arithmetic, and never store a "total" that blends currencies. A money value is the **pair** (amount, currency).

## Rule 4: Round Deliberately

Division (splitting a bill, computing a percentage fee, tax, interest) produces fractions that must be **rounded** to a whole minor unit. Decide **when** and **how**:
- Round only at the **final step**, keeping full precision in intermediate calculations where possible.
- Choose a **rounding mode** (banker's rounding / round-half-even is common in finance to avoid bias).
- **Account for the remainder** — splitting $10 three ways is 3.33 + 3.33 + 3.34 (the leftover penny must go somewhere; don't lose it). This is the "penny allocation" problem.

## Foreign Exchange (multi-currency)

- Store amounts in their **original currency**; convert only when needed, recording the **exchange rate and timestamp** used.
- Rates change constantly — a conversion is a point-in-time fact; persist it.
- Converting back and forth **loses money** to rounding/spread; minimize round-trips.
- Keep per-currency balances separate (see designing-a-ledger).

## Pitfalls (in understanding/using)

- **Floats for money** — the cardinal sin; guaranteed rounding drift and reconciliation failures.
- Storing amounts **without a currency** → ambiguous, un-summable values.
- Assuming **2 decimal places** everywhere → wrong for JPY (0), and others; store the currency's exponent.
- **Rounding too early** or with an inconsistent mode → accumulated errors and mismatched totals.
- **Losing the remainder** when splitting/allocating → pennies vanish; totals don't add up.
- **Mixing currencies** in one field or arithmetic → data-integrity disaster.
- Not recording the **FX rate + time** of a conversion → un-auditable, unreproducible amounts.
