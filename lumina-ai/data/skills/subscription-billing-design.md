---
name: subscription-billing-design
description: Designing subscription/recurring billing — billing cycles, proration on plan changes, trials, dunning for failed payments, invoicing, and handling upgrades/downgrades/cancellations correctly. Use to design recurring billing, handle proration and plan changes, manage failed-payment dunning, or build a subscription system.
category: engineering
keywords_vi: subscription billing, thanh toán định kỳ thuê bao, chu kỳ billing cycle, proration khi đổi gói, trial dùng thử, dunning retry thanh toán lỗi, nâng hạ hủy gói
---

# Designing Subscription / Recurring Billing

Subscription billing looks simple ("charge $20/month") but is full of edge cases: **proration** when plans change mid-cycle, **trials**, **dunning** when a card fails, **upgrades/downgrades**, cancellations, and keeping the **invoice** correct. Getting these right determines revenue accuracy and customer trust (see how-payment-processing-works, designing-a-ledger, money-and-currency-handling).

## Billing Cycles

A subscription bills on a **recurring cycle** (monthly, annual). Core decisions:
- **Anchor date** — does everyone bill on the 1st, or on their signup anniversary? Anniversary billing spreads load and is common.
- **Advance vs arrears** — SaaS usually bills **in advance** (pay for the coming month up front). Usage-based bills **in arrears** (after consumption).
- **Renewal** — at cycle end, generate an invoice and charge the saved payment method; on success, extend the period.

## Proration (the tricky part)

When a customer **changes plans mid-cycle**, you must fairly account for the unused/used portion:
- **Upgrade mid-cycle** — they've paid for the cheaper plan but now want more. Charge the **prorated difference** for the remaining days (or credit the unused portion and bill the new plan).
- **Downgrade** — usually **credit** the unused amount (or apply the change at the **next cycle** to avoid refunds).
- The math: (unused days / days in cycle) × amount. Round carefully (see money-and-currency-handling) — proration is a classic penny-loss spot.
Decide a clear policy: prorate immediately, or defer changes to the next cycle (simpler, fewer refunds).

## Trials and Discounts

- **Free trials** — no charge until the trial ends; then convert to paid. Handle "trial ends" as a scheduled event; remind before charging.
- **Coupons/discounts** — percentage or fixed, one-time or recurring; apply to the invoice, keep the math auditable.

## Dunning (failed payments)

Cards fail constantly (expiry, insufficient funds, fraud blocks). **Dunning** is the retry-and-notify process:
- **Retry** the charge on a schedule (e.g. day 1, 3, 5, 7) — with backoff (see retries-and-resilience). "Smart retries" time attempts for when funds are likely present.
- **Notify** the customer to update their card (email sequence).
- **Grace period** — keep access during dunning; **suspend/cancel** only after retries are exhausted.
- Handle **involuntary churn** (failed payments) distinctly from **voluntary** cancellation — recovering failed payments is major revenue.

## Design Guidance

- **Idempotency** on every charge (see idempotency) — never double-bill on a retry.
- **Immutable invoices/ledger** — an invoice, once issued, isn't edited; corrections are credit notes (see designing-a-ledger).
- **Webhooks from the PSP** drive state (payment succeeded/failed) — process them idempotently.
- **Store the subscription state machine** clearly: trialing → active → past_due → canceled/unpaid.
- **Reconcile** billing against the PSP (see payment-reconciliation).
- **Handle timezones / month-length** edge cases (billing on the 31st in February).

## Pitfalls (in understanding/using)

- **Proration rounding** losing pennies or overcharging → unhappy customers and mismatched books.
- **No dunning** → failed payments = silent revenue loss and abrupt access cutoff.
- **Double-billing** on webhook/charge retries (no idempotency).
- Editing issued **invoices** instead of using credit notes → un-auditable.
- Billing-date edge cases (**Jan 31 → Feb**, DST, leap years) handled naively → wrong charge dates.
- Treating involuntary churn (card failed) the same as a **cancellation** → losing recoverable revenue.
- Applying downgrades with **immediate refunds** when a next-cycle change would be simpler and safer.
