---
name: how-double-entry-accounting-works
description: How double-entry accounting works — every transaction records equal debits and credits across accounts so the books always balance, the accounting equation, and why it's the foundation of any financial ledger or fintech system. Use to understand double-entry bookkeeping, debits and credits, why every transaction has two sides, or the basis for a financial ledger.
category: engineering
keywords_vi: double entry accounting, kế toán kép, ghi nợ ghi có bằng nhau, sổ sách luôn cân, phương trình kế toán, hai vế mỗi giao dịch, nền tảng sổ cái tài chính
---

# How Double-Entry Accounting Works

Double-entry accounting is a 500-year-old method where **every transaction is recorded in at least two accounts** — equal **debits** and **credits** — so the books **always balance**. It's not just for accountants: it's the correct foundation for any system that tracks money (wallets, ledgers, payment platforms), because it makes errors detectable and money **conserved** (see designing-a-ledger, how-payment-processing-works).

## The Core Idea: Two Sides to Every Transaction

Money never appears or disappears — it **moves** from somewhere to somewhere. Double-entry captures both sides: every transaction has a **debit** (an entry to one account) and an equal, opposite **credit** (an entry to another). The total debits **always equal** the total credits. If they don't, something is wrong — which is exactly the built-in error check.

Example: a customer pays you $100.
- **Debit** Cash +$100 (an asset increases)
- **Credit** Revenue +$100 (income increases)
Both sides recorded, and they balance.

## Debits and Credits (the confusing part)

"Debit" and "credit" are **not** "add" and "subtract" — they're the **two sides** of an entry, and their effect depends on the **account type**:
- **Assets** (cash, receivables) and **expenses** — increase with a **debit**, decrease with a credit.
- **Liabilities** (payables, customer balances you owe), **equity**, and **revenue** — increase with a **credit**, decrease with a debit.
That's why a customer's wallet balance (money you owe them — a liability) goes **up** with a **credit**. The rule to internalize: every entry has matching debits and credits, and each account type has a "normal" side.

## The Accounting Equation

Underlying it all: **Assets = Liabilities + Equity**. Because every transaction posts equal debits and credits, this equation **always stays balanced**. This invariant is the system's self-check: at any moment the books must balance, so a discrepancy immediately signals a bug or missing entry.

## Why It Matters for Software (fintech)

For any system moving money — a wallet, a marketplace, a payments ledger — double-entry is the right model because:
- **Money is conserved** — you can't accidentally create or destroy funds; every credit has a matching debit.
- **Auditability** — every movement is traceable to both accounts, giving a complete history.
- **Error detection** — imbalanced books = a bug you catch immediately.
- **It composes** — complex flows (fees, splits, refunds, escrow) are just more balanced entries.
A single "balance" column that you increment/decrement is the naive approach that leads to lost money and un-auditable state. Model it as double-entry instead (see designing-a-ledger).

## Pitfalls (in understanding/using)

- Thinking **debit = minus, credit = plus** — wrong; their effect depends on account type (asset vs liability).
- Using a **single mutable balance field** instead of immutable balanced entries → un-auditable, prone to lost/duplicated money.
- Forgetting a transaction has **two sides** → unbalanced books, undetectable errors.
- Storing money as **floats** — never (see money-and-currency-handling); use integer minor units.
- Not treating entries as **immutable** — you correct with a reversing entry, you don't edit history.
- Confusing **cash** (an asset you hold) with a customer's **balance** (a liability you owe them) — opposite normal sides.
