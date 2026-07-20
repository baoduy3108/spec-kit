---
name: how-ach-and-wire-transfers-work
description: How bank transfers work — ACH (batched, cheap, slow, reversible) vs wires (real-time, expensive, irreversible), plus SEPA and the trade-offs of speed, cost, and finality versus card payments. Use to understand ACH vs wire, bank transfers, why some payments are slow/reversible, or choosing a bank payment rail.
category: engineering
keywords_vi: ach wire transfer, chuyển khoản ngân hàng, ach gom lô rẻ chậm có thể đảo, wire tức thì đắt không đảo, sepa, đánh đổi tốc độ chi phí tính chung cuộc, so với thẻ
---

# How ACH and Wire Transfers Work

Bank transfers move money **directly between bank accounts** — distinct from card payments (see how-payment-processing-works). The two main US rails, **ACH** and **wire**, sit at opposite ends of a **speed / cost / finality** trade-off, and understanding that trade-off is key to choosing the right rail (and to reasoning about fraud, reversibility, and payout timing).

## ACH (Automated Clearing House)

ACH is the **batched, low-cost, slower** rail for everyday transfers (payroll, bills, payouts, subscription debits):
- **Batched** — transactions are collected and processed in **batches** a few times a day, not instantly. Settlement takes **1–3 business days**.
- **Cheap** — cents per transaction (or free), which is why it's used for high-volume, cost-sensitive flows.
- **Reversible** — ACH debits can be **returned/reversed** (insufficient funds, unauthorized, disputes) for a period after the fact. This is a double-edged sword: convenient for errors, but it means an ACH payment is **not final** immediately — a risk for the recipient (someone can pay you via ACH, you ship, then they reverse it).
- **Push or pull** — you can **credit** (push money out) or **debit** (pull money, e.g. subscription — needs authorization).

## Wire Transfers

Wires are the **real-time, high-value, irreversible** rail:
- **Fast / near-real-time** — settles same day, often within hours.
- **Expensive** — typically $10–$50 per wire, so used for **large** or urgent transfers (real estate, B2B, large settlements).
- **Irreversible / final** — once sent, a wire is **final**; there's no built-in reversal. This makes wires a **fraud target** (scammers love irreversible payments) — verify the recipient carefully.
- **Individually processed** — not batched; each wire is handled directly bank-to-bank.

## Other Rails

- **SEPA** (Europe) — the euro-area equivalent for bank transfers; SEPA Credit Transfer and SEPA Instant (near-real-time).
- **RTP / FedNow** (US) — newer **instant** rails: real-time and typically irreversible, aiming to combine speed with lower cost.
- **Faster Payments** (UK), and various national instant schemes.

## ACH/Wire vs Cards

- **Cost** — bank transfers (especially ACH) are much cheaper than card fees (~2.9% + fixed), so preferred for large amounts and payouts.
- **Speed** — cards authorize instantly; ACH is slow; wires/instant rails are fast.
- **Finality** — cards have chargebacks (reversible for months); ACH is reversible for a window; wires are final.
- **Use cases** — cards for consumer checkout; ACH for payouts, payroll, recurring debits; wires for large/urgent B2B.

## Pitfalls (in understanding/using)

- Treating an **ACH** payment as final immediately → it can be **returned** days later (ship-then-reversed fraud risk).
- Assuming ACH is **instant** → it's batched, 1–3 business days; design flows around the delay.
- Underestimating **wire fraud** — wires are irreversible; a mistaken or scammed wire is usually gone for good. Verify recipients.
- Using **wires** for small/frequent transfers → the per-wire fee makes it uneconomical; use ACH/instant rails.
- Forgetting **authorization** requirements for ACH **debits** (pulling money needs the payer's mandate).
- Assuming every country has the same rails → SEPA, Faster Payments, UPI, etc. differ in speed/cost/finality.
