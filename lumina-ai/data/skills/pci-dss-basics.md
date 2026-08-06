---
name: pci-dss-basics
description: PCI DSS basics — the security standard for handling card data, why you should never store raw card numbers, how tokenization and hosted fields (SAQ A) shrink your compliance scope, and the core requirements. Use to understand PCI compliance, handle card data safely, reduce PCI scope with tokenization, or avoid storing card numbers.
category: engineering
keywords_vi: pci dss, chuẩn bảo mật dữ liệu thẻ, không lưu số thẻ thô, tokenization hosted field giảm phạm vi, saq a, yêu cầu cốt lõi tuân thủ thẻ
---

# PCI DSS Basics

PCI DSS (Payment Card Industry Data Security Standard) is the security standard that **anyone handling card data must follow**. The single most important takeaway for developers: **don't handle raw card numbers yourself** — use tokenization and hosted fields so the sensitive data never touches your servers, which both protects customers and dramatically **reduces your compliance burden** (see how-payment-processing-works, security-and-hardening).

## What PCI DSS Protects

Card data — especially the **PAN** (Primary Account Number, the 16-digit card number), plus expiry, cardholder name, and above all the **CVV/security code** — is extremely sensitive. If leaked, it enables fraud. PCI DSS defines requirements for how this data is **stored, transmitted, and processed** to keep it safe. It applies to any organization that touches cardholder data; failing it risks fines, liability, and losing the ability to accept cards.

## The Golden Rule: Don't Store Card Data

The safest card data is data you **never possess**:
- **Never store the CVV** — PCI **prohibits** storing the security code after authorization, full stop.
- **Never store raw PANs** if you can avoid it — storing card numbers puts you in the highest-scope, most-audited category.
- **Tokenization** — instead of the real card number, store a **token** (a meaningless reference) provided by your payment processor. The processor holds the real card in their vault; you hold a token you can use for future charges. If your DB leaks, the tokens are useless to attackers.

## Reducing Scope: Hosted Fields / SAQ A

Your **PCI scope** is everything that touches card data — and audits scale with scope. The trick is to keep card data **entirely off your systems**:
- **Hosted fields / redirect / iframe** — the card input is rendered by the **processor** (Stripe Elements, a hosted checkout). The card number goes **directly from the browser to the processor**, never through your backend. Your server only ever sees a **token**.
- This qualifies you for **SAQ A** — the **simplest** PCI self-assessment (a short questionnaire) — because you never handle card data. Building your own card form and posting it to your server pushes you into far stricter, more expensive compliance (SAQ D).
The design lesson: **let the processor handle the card; you handle tokens.**

## Core Requirements (the spirit)

PCI DSS's requirements boil down to standard strong security, applied rigorously to card data:
- **Encrypt** cardholder data in transit (TLS) and at rest (if you store any).
- **Restrict access** — least privilege; only those who need it.
- **Network security** — firewalls, segmentation, no default passwords.
- **Monitoring & logging** — track access to card data.
- **Regular testing** — vulnerability scans, patching.
- **Security policies** — documented, maintained.

## Design Guidance

- **Use hosted fields / tokenization** — aim for SAQ A; never let a raw PAN hit your backend.
- **Never log** card numbers or CVVs (scrub them from logs/errors).
- **Never store the CVV**, ever.
- **Delegate** to a PCI-compliant processor (Stripe, Adyen, etc.) rather than building card handling.
- **Segment** any environment that does touch card data.
- Treat PCI as a **floor**, not the ceiling, of your security (see security-and-hardening).

## Pitfalls (in understanding/using)

- **Storing the CVV** — explicitly forbidden; a common serious violation.
- Building your **own card form** posting to your server → maximum PCI scope (SAQ D) and risk; use hosted fields.
- **Logging** card data in request logs, error traces, or analytics → a breach waiting to happen.
- Storing **raw PANs** when a **token** would do → huge liability if breached.
- Thinking PCI is **only about storage** — it also covers transmission and processing (data flowing *through* you counts).
- Assuming a processor makes you **automatically** compliant — you still must scope correctly and follow the requirements for whatever you touch.
