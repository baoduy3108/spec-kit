---
name: tax-and-invoicing-basics
description: Sales tax, VAT/GST, and invoicing basics for software — tax-inclusive vs exclusive pricing, where tax is owed (nexus/place of supply), immutable sequential invoices, credit notes, and why you never edit an issued invoice. Use to handle sales tax/VAT, design invoicing, understand tax-inclusive pricing, or issue compliant invoices.
category: engineering
keywords_vi: thuế và hóa đơn, sales tax vat gst, giá gồm thuế hay chưa thuế, nơi phải nộp thuế nexus, hóa đơn tuần tự bất biến, credit note, không sửa hóa đơn đã phát hành
---

# Tax and Invoicing Basics

Any product that sells to customers eventually has to handle **tax** and **invoices** correctly. This is a compliance area where mistakes have legal/financial consequences, so the goal here is to understand the concepts well enough to design correctly and know when to defer to a tax service or accountant (see subscription-billing-design, money-and-currency-handling, designing-a-ledger).

## Sales Tax vs VAT/GST

Two broad systems:
- **Sales tax** (US) — applied **once**, at the final sale to the consumer. Rates vary by **state/county/city** (thousands of jurisdictions). The seller collects and remits it.
- **VAT / GST** (Europe, much of the world) — a **value-added tax** charged at each stage, with businesses reclaiming the VAT they paid (input) and remitting the difference. Consumers ultimately bear it. Rates are per-country.

The practical upshot: **tax rate depends on *where the customer is*** (and sometimes what you're selling — digital goods have special rules). You can't hardcode one rate.

## Where Tax Is Owed (nexus / place of supply)

- **Nexus** (US) — you owe sales tax in a state where you have a sufficient connection (physical presence, or **economic nexus**: exceeding a sales threshold). You must register and collect there.
- **Place of supply** (VAT) — for digital services, VAT is often due in the **customer's** country (e.g. EU rules require charging the customer's local VAT rate; schemes like VAT MOSS/OSS simplify remitting it).
- **B2B vs B2C** — B2B cross-border often uses **reverse charge** (the buyer accounts for VAT); you validate the buyer's VAT number. B2C charges the local rate.
This complexity is why most teams use a **tax-calculation service** (Stripe Tax, Avalara, TaxJar) rather than building it.

## Tax-Inclusive vs Exclusive Pricing

- **Tax-exclusive** — the listed price is pre-tax; tax is **added** at checkout ("$100 + tax"). Common in the US.
- **Tax-inclusive** — the listed price **already contains** tax ("€100 incl. VAT"). Common in the EU/consumer contexts; you **back out** the tax from the gross. Getting inclusive/exclusive math and rounding right (see money-and-currency-handling) matters.

## Invoicing: Immutable and Sequential

An **invoice** is a formal legal document. Key rules:
- **Sequential numbering** — invoices usually need **gapless sequential** numbers (a legal requirement in many countries) — don't reuse or skip.
- **Immutable once issued** — you **never edit or delete** an issued invoice. To correct it, issue a **credit note** (a negative/reversing document) and a new invoice. This preserves the audit trail (like an immutable ledger — see designing-a-ledger).
- **Required fields** — seller/buyer details, tax IDs, line items, tax rate/amount, totals, date, invoice number (requirements vary by jurisdiction).
- **Retention** — invoices must be **kept** for years for tax audits.

## Design Guidance

- **Use a tax service** for rate determination and nexus tracking — don't hand-maintain thousands of jurisdictions.
- **Store the customer's location** and tax status; compute tax at time of sale and **record the rate used**.
- **Never mutate invoices** — credit note + reissue for corrections.
- **Gapless invoice sequence** per legal entity.
- **Handle tax-inclusive rounding** deliberately.
- **Defer real compliance** decisions to an accountant/tax pro — this is a "know enough to build it right" area, not "wing it."

## Pitfalls (in understanding/using)

- **Hardcoding one tax rate** → wrong for the customer's jurisdiction; tax depends on location (and product type).
- **Editing an issued invoice** → breaks legal/audit requirements; use credit notes.
- **Gaps in invoice numbering** → non-compliant in many countries.
- Confusing **tax-inclusive** and **exclusive** pricing → over/undercharging and rounding errors.
- Ignoring **nexus / place-of-supply** → failing to collect tax you're liable for (or collecting where you shouldn't).
- Building tax logic **from scratch** for global sales → a maintenance nightmare; use a tax provider.
- Not **retaining** invoices → failing an audit.
