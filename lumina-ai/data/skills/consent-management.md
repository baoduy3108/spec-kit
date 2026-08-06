---
name: consent-management
description: Managing user consent for data processing — granular opt-in vs opt-out, recording consent with proof (what/when/version), cookie consent, honoring withdrawal, and not blocking service on non-essential consent. Use to design consent flows, record and prove consent, handle cookie banners, or let users withdraw consent.
category: engineering
keywords_vi: quản lý đồng ý consent, opt-in opt-out chi tiết, ghi lại bằng chứng đồng ý phiên bản, cookie consent, tôn trọng rút lại, không chặn dịch vụ vì đồng ý không thiết yếu
---

# Consent Management

When your lawful basis for processing personal data is **consent** (see gdpr-and-data-privacy), you must **obtain it properly, record it, and honor its withdrawal**. Consent isn't a checkbox you set and forget — it's an ongoing, provable state per user per purpose. Getting it wrong (pre-ticked boxes, bundled consent, ignoring withdrawal) is a common compliance failure (see pii-handling-and-minimization).

## What Valid Consent Requires

Under GDPR-style rules, consent must be:
- **Freely given** — not a condition of using the core service for **non-essential** processing (you can't force marketing consent to let someone sign up).
- **Specific and granular** — separate consent for separate purposes (analytics vs marketing vs personalization), not one bundled "I agree to everything."
- **Informed** — the user knows **who**, **what data**, **why**, and how to withdraw.
- **Unambiguous, affirmative action** — an **active opt-in** (ticking an **unchecked** box, clicking accept). **Pre-ticked boxes** and "silence = consent" are **invalid**.
- **Withdrawable** — as easy to withdraw as to give.

## Opt-In vs Opt-Out

- **Opt-in** — nothing happens until the user **actively agrees**. Required for consent-based processing under GDPR (and for sensitive data).
- **Opt-out** — processing happens **unless** the user objects. Weaker; acceptable in some jurisdictions/bases but **not** valid GDPR consent for non-essential processing.
Default to **opt-in, unchecked** for anything consent-based.

## Recording Consent (proof)

Accountability means you must be able to **prove** a user consented. Record, per consent:
- **Who** (user/identifier), **what** they consented to (which purpose), **when** (timestamp), and the **version** of the policy/terms they agreed to.
- The **method** (how it was obtained).
Store these as an **immutable, auditable** record. When policies change materially, you may need **fresh** consent (hence versioning). "We think they agreed" isn't good enough.

## Cookie Consent

Non-essential cookies/trackers (analytics, advertising) generally require consent **before** they're set:
- **Don't fire** non-essential trackers until the user opts in.
- **Essential** cookies (needed for the site to function) don't need consent.
- Provide **granular** choices, not just "accept all," and make **reject** as easy as accept.
- Respect signals like Global Privacy Control where required.

## Honoring Withdrawal

- Withdrawal must be **easy** and take **effect** — stop the processing, and propagate the change to downstream systems/third parties.
- Withdrawal isn't retroactive on lawful past processing, but must stop **future** processing promptly.

## Design Guidance

- **Opt-in, unchecked, granular** for consent-based purposes.
- **Don't gate core service** on non-essential consent (freely given).
- **Record who/what/when/version/method** as an auditable log.
- **Re-consent** when policies materially change (version your consents).
- **Cookie consent before non-essential trackers**; easy reject.
- **Make withdrawal easy** and actually **enforce** it downstream.
- **Separate purposes** — don't bundle unrelated consents.

## Pitfalls (in understanding/using)

- **Pre-ticked boxes** or "continuing = consent" → invalid consent.
- **Bundling** all purposes into one agreement → not specific/granular.
- **Forcing** non-essential consent to use the service → not freely given.
- Not **recording** consent (no proof of who/what/when/version) → can't demonstrate compliance.
- Firing analytics/ad **trackers before** consent → violates cookie rules.
- Making withdrawal **hard** or not **propagating** it downstream → consent isn't truly withdrawable.
- Never **re-consenting** after major policy changes → stale, possibly invalid consent.
