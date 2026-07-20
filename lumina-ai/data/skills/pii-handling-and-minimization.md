---
name: pii-handling-and-minimization
description: Handling personally identifiable information (PII) safely — classifying data sensitivity, minimizing collection, isolating and encrypting PII, tokenizing, scrubbing it from logs/analytics, and controlling access. Use to protect PII, minimize sensitive data collection, keep PII out of logs, or classify and isolate personal data.
category: engineering
keywords_vi: xử lý pii, thông tin định danh cá nhân, phân loại độ nhạy dữ liệu, tối thiểu hóa thu thập, cô lập mã hóa pii, tokenize, loại pii khỏi log analytics, kiểm soát truy cập
---

# PII Handling and Minimization

PII (Personally Identifiable Information) — names, emails, phone numbers, addresses, government IDs, financial and health data — is the data that hurts most when leaked. Handling it well is about **collecting less, isolating what you keep, encrypting it, and keeping it out of the places it leaks from** (logs, analytics, error traces). This is the practical engineering side of privacy (see gdpr-and-data-privacy, how-encryption-at-rest-works, pci-dss-basics).

## Principle 1: Minimize (the best protection is not having it)

The data you **don't collect** can't be breached, subpoenaed, or misused. Before storing any PII, ask: **do we actually need it?** Minimization:
- Collect only fields required for the current purpose.
- Prefer **derived/aggregate** values over raw PII where possible (store an age range, not a birthdate; a region, not a precise address) — see data-anonymization-and-pseudonymization.
- Delete PII when its purpose ends (see data-retention-and-deletion).
Every piece of PII is a **liability**; minimization shrinks your attack surface and compliance burden.

## Principle 2: Classify by Sensitivity

Not all data is equal. **Classify** it (e.g. public / internal / confidential / restricted) so protection matches risk:
- **Highly sensitive** — government IDs, financial, health, credentials, biometrics → strongest controls.
- **Moderately sensitive** — name, email, address.
- Classification drives **who can access it, how it's encrypted, where it can go, and how long it's kept**.

## Principle 3: Isolate and Encrypt

- **Isolate** PII — keep it in a **dedicated, tightly-controlled** store/table rather than smeared across every table and service. Isolation shrinks the blast radius and makes access control and deletion feasible.
- **Encrypt** at rest (see how-encryption-at-rest-works) and in transit.
- **Tokenize** — replace PII with a **token** in most systems; only a small vault holds the real value (like card tokenization — see pci-dss-basics). Downstream systems handle tokens, not raw PII.

## Principle 4: Keep It Out of Logs and Analytics (the #1 leak)

PII **leaks most commonly through logs, error traces, and analytics** — developers log a whole request/object and accidentally capture emails, tokens, or card numbers. These logs are widely accessible, shipped to third parties, and retained long. Rules:
- **Never log** PII/secrets — scrub or redact before logging.
- **Sanitize error reports** (Sentry etc.) so they don't capture PII in payloads/variables.
- **Don't send PII to analytics** or third-party trackers without basis/consent.
- **Mask in UI** where appropriate (show last 4 digits).

## Principle 5: Access Control and Audit

- **Least privilege** — only people/services that need PII can access it.
- **Audit access** — log who accessed PII (see security-audit-logging), so misuse is detectable.

## Design Guidance

- **Don't collect it if you don't need it** — the cheapest, strongest control.
- **Classify** data and apply controls by sensitivity.
- **Isolate PII** in a dedicated store; **tokenize** for downstream use.
- **Encrypt** at rest and in transit.
- **Redact PII from logs/errors/analytics** — automate scrubbing.
- **Least-privilege access** + audit logging.
- **Have a deletion path** so PII can actually be removed (see data-retention-and-deletion).

## Pitfalls (in understanding/using)

- **Logging** full requests/objects → PII and secrets leak into widely-read, long-retained logs (the most common real leak).
- **Over-collecting** PII "just in case" → needless liability.
- PII **scattered** across many tables/services → can't secure, delete, or audit it.
- Sending PII to **analytics/third parties** without basis/consent.
- **No tokenization/isolation** → every system touching data handles raw PII.
- **Everyone** can read the PII table → no least privilege; one compromised account exposes everything.
- Forgetting **error trackers** capture variables/payloads → PII ends up in crash reports.
