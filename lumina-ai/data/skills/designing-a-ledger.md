---
name: designing-a-ledger
description: Designing a financial ledger for software — immutable append-only entries, double-entry accounts, deriving balances from entries, idempotency, and why you never mutate a balance column directly. Use to design a wallet/ledger system, track money in software correctly, model balances and transactions, or build a fintech ledger.
category: engineering
keywords_vi: thiết kế ledger sổ cái, ví tiền trong phần mềm, entry bất biến append-only, số dư suy ra từ entry, không sửa cột balance trực tiếp, idempotency ledger, mô hình hóa tiền
---

# Designing a Financial Ledger

A ledger is the system of record for **money movement** in a financial application (a wallet, marketplace payouts, credits/points, a payments platform). Getting its design right is critical — money bugs are the worst kind. The core principles: **immutable append-only entries**, **double-entry** balance, and **balances derived from entries** rather than mutated directly (see how-double-entry-accounting-works, money-and-currency-handling, idempotency).

## The Naive Design (and why it fails)

The tempting approach: a `balance` column you `UPDATE ... SET balance = balance + amount`. This is **wrong** for money:
- **No history** — you can't answer "why is the balance this?" or audit what happened.
- **Race conditions** — concurrent updates lose money without careful locking.
- **No error detection** — a bug silently corrupts the balance; nothing catches it.
- **No idempotency** — a retried request double-applies.
Money demands a design where every change is **recorded, immutable, and verifiable**.

## The Core Design: Immutable Entries + Double-Entry

- **Append-only entries** — every money movement is a new, **immutable** row (an entry). You **never update or delete** an entry. Corrections are new **reversing** entries. This gives a complete, auditable history — the ledger is the truth, forever.
- **Double-entry** — each transaction posts **balanced debit/credit entries** across accounts, so money is conserved and the books always balance (see how-double-entry-accounting-works). A "transfer" is two entries; a "payment with fee" is several — all summing to zero.
- **Balances are derived** — an account's balance is the **sum of its entries**, not a stored mutable number. For performance, keep a **cached/materialized** balance updated transactionally alongside entries (or via snapshots), but the entries remain the source of truth.

## Idempotency (essential)

Payment operations get **retried** (network blips, webhooks fire twice — see how-payment-processing-works). Without protection, a retry posts the transaction **twice** → lost/duplicated money. Every money-moving operation needs an **idempotency key** (see idempotency): store it, and if the same key arrives again, return the original result instead of posting again. This is non-negotiable in a ledger.

## Consistency and Concurrency

- **Atomic transactions** — post all entries of a transaction in one DB transaction; either all commit or none (never a half-recorded transfer).
- **Handle concurrency** — derive-and-check or row-level locks / optimistic concurrency so two concurrent operations can't corrupt a balance or overspend.
- **Sufficient-funds checks** inside the transaction (against the derived balance), not on stale reads.

## Design Guidance

- **Money as integer minor units** (cents), never floats (see money-and-currency-handling); store the currency.
- **Every entry links** to its transaction, account, amount, currency, timestamp, and a reference/idempotency key.
- **Reversals, not edits** — fix mistakes with compensating entries; history is immutable.
- **Reconcile** regularly against external sources (bank/PSP) — the ledger should match reality (see payment-reconciliation).
- **Model account types** clearly (user wallet = liability you owe; your cash = asset).

## Pitfalls (in understanding/using)

- A mutable **`balance` column** as source of truth → no history, races, silent corruption. Derive from immutable entries.
- **Editing/deleting** entries → destroys auditability; use reversing entries.
- **No idempotency key** → retried operations double-post money.
- **Floats** for money → rounding errors that accumulate into real losses.
- Posting entries **non-atomically** → half-applied transfers on failure.
- Never **reconciling** with the bank/PSP → the ledger silently drifts from reality.
- Ignoring **multi-currency** — mixing currencies in one balance without tracking each is a data-integrity disaster.
