---
name: how-payment-processing-works
description: How card payments work — the players (cardholder, merchant, gateway, acquirer, card network, issuer), authorization vs capture vs settlement, why you never store raw card numbers (PCI, tokenization), and concepts like holds, refunds, chargebacks, and idempotency. Use to understand online payments, integrating a payment gateway, or reasoning about payment flows.
category: engineering
keywords_vi: thanh toán thẻ hoạt động thế nào, xử lý payment, cổng thanh toán gateway, authorization capture settlement, pci tokenization, chargeback hoàn tiền, tích hợp thanh toán, hiểu payment
---

# How Payment Processing Works

An online card payment moves through several parties in seconds. Understanding them explains why integrations look the way they do and why you must never touch raw card data.

## The Players

- **Cardholder** — the customer.
- **Merchant** — you (the store).
- **Payment gateway** (Stripe, etc.) — the API you integrate; encrypts and routes the transaction.
- **Acquirer / merchant bank** — the merchant's bank that receives the funds.
- **Card network** — Visa/Mastercard; routes between acquirer and issuer, sets rules.
- **Issuer** — the customer's bank that issued the card and approves/declines.

## The Flow: Authorization → Capture → Settlement

1. **Authorization** — the gateway sends the payment details through the network to the **issuer**, which checks funds/fraud and **approves or declines**, placing a **hold** on the amount (no money moves yet). This is the real-time yes/no.
2. **Capture** — the merchant confirms the sale, telling the issuer to actually move the held funds. Often immediate (auth+capture together), but can be delayed (charge only when you ship).
3. **Settlement** — later (batched, often next day), the funds actually transfer from issuer to acquirer to the merchant's account, minus fees. This is why money "arrives" a day or two after the sale.

## Never Store Raw Card Numbers (PCI)

Handling raw card numbers puts you under strict **PCI-DSS** compliance and huge liability. The standard solution: **tokenization** — the gateway collects the card (via their hosted form/SDK) and returns a **token** representing it; you store and charge the *token*, never the actual number. The card data never touches your server. This is why Stripe/PayPal give you a token, not the PAN.

## Other Concepts

- **Holds/authorizations** expire if not captured (why a pending charge vanishes).
- **Refunds** return captured funds (a separate transaction, may take days to appear).
- **Chargebacks** — the customer disputes with their bank; the merchant can lose the funds + a fee. Fraud/dispute management matters.
- **Idempotency keys** — payment APIs use them so a retried "charge" request doesn't double-charge (see idempotency) — essential given network uncertainty.
- **3-D Secure / SCA** — an extra cardholder auth step (like 2FA for payments), required in some regions, shifting fraud liability.
- **Webhooks** — the gateway notifies you asynchronously of events (payment succeeded, disputed) — verify their signatures (see webhooks-design).

## Pitfalls

- **Storing raw card data** → PCI nightmare and liability; always tokenize.
- **Not using idempotency keys** → double charges on retry.
- **Relying on the client** to confirm payment (verify server-side via the gateway/webhook — a client can be tampered with).
- Confusing **authorization with settlement** (approved ≠ money in your account yet).
- Ignoring **chargebacks/fraud** in the business model.
