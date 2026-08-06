---
name: payment-reconciliation
description: Payment reconciliation — matching your internal ledger against external sources (bank statements, PSP settlement reports) to catch discrepancies, missing/duplicate transactions, fees, and timing differences. Use to reconcile payments, verify your ledger matches the bank/processor, or design a reconciliation process.
category: engineering
keywords_vi: payment reconciliation, đối soát thanh toán, khớp sổ nội bộ với sao kê ngân hàng, báo cáo settlement psp, phát hiện chênh lệch thiếu trùng phí, chênh lệch thời gian
---

# Payment Reconciliation

Reconciliation is the process of **matching your internal records against an external source of truth** — your ledger vs the **bank statement** or the payment processor's **settlement report** — to confirm they agree, and to catch **discrepancies** (missing money, duplicates, unexpected fees, timing gaps). No matter how good your ledger is, reconciliation is what proves the money you *think* you have matches the money that *actually* moved (see designing-a-ledger, how-payment-processing-works).

## Why It's Necessary

Your system records what it *believes* happened, but the real money lives at the **bank and the payment processor (PSP)**. Things drift:
- A payment your system marked "paid" that **never actually settled** (or vice versa).
- **Duplicate** charges or payouts.
- **Fees** the PSP deducted that your ledger didn't record.
- **Timing** differences — a payment authorized today settles days later.
- **Chargebacks/refunds** processed externally.
Without reconciliation, these silently accumulate into **wrong balances**, missing money, and failed audits. Reconciliation is the safety net that surfaces them.

## The Core Process: Match, Then Investigate

1. **Ingest the external record** — the bank statement, PSP settlement/transaction report (usually a daily file or API export).
2. **Match** each external line to an internal ledger entry — by a shared **reference** (transaction ID, order ID, idempotency key), amount, and date. A good matching key is essential.
3. **Classify the result** of each item:
   - **Matched** — external and internal agree. 
   - **Unmatched internal** — you recorded it, the bank/PSP didn't (or not yet — timing, or a real problem).
   - **Unmatched external** — money moved that your system doesn't know about (missing entry, a fee, a manual bank action).
   - **Mismatch** — matched by reference but the **amount differs** (a fee deducted, partial capture, FX).
4. **Investigate and resolve** exceptions — record fees, add missing entries, flag genuine discrepancies for humans.

The goal is that **every** external movement is explained by an internal entry, and vice versa.

## Handling Common Differences

- **Fees** — PSPs deduct processing fees before payout; record them as ledger entries so gross vs net reconciles.
- **Timing** — auth vs capture vs settlement span days; reconcile on **settled** amounts and allow for in-flight items.
- **Rounding / FX** — small differences from currency conversion; account for them explicitly.
- **Batching** — a single payout may bundle many transactions; match the batch to its constituent items.

## Design Guidance

- **Shared reference keys** — put your order/transaction ID into the payment metadata so external records can be matched back automatically.
- **Automate the match**, escalate only **exceptions** to humans (don't manually match thousands of rows).
- **Reconcile regularly** (daily) — small daily discrepancies are tractable; months of drift are a nightmare.
- **Immutable ledger + fees as entries** so gross/net/fees all tie out (see designing-a-ledger).
- **Alert** on unexplained discrepancies — unmatched money is an incident, not a footnote.

## Pitfalls (in understanding/using)

- **No shared reference** between your record and the payment → matching becomes fuzzy amount/date guessing.
- Not recording **fees** as ledger entries → gross never reconciles with the net payout.
- Reconciling on **authorization** instead of **settlement** → timing mismatches look like errors.
- **Ignoring** small/persistent discrepancies → they compound into large unexplained gaps.
- Purely **manual** reconciliation → doesn't scale and is error-prone; automate matching, review exceptions.
- Assuming your ledger is right because it's internally consistent → only the **external** source proves real money moved.
