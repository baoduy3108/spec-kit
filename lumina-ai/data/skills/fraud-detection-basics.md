---
name: fraud-detection-basics
description: Basics of payment/account fraud detection — signals (velocity, device, geolocation, mismatch), rules vs machine-learning scoring, the false-positive vs false-negative trade-off, and review queues. Use to design fraud detection, understand fraud signals and scoring, balance blocking fraud vs blocking good customers, or reduce chargebacks.
category: engineering
keywords_vi: fraud detection, phát hiện gian lận thanh toán, tín hiệu velocity thiết bị vị trí, luật vs machine learning chấm điểm, đánh đổi false positive false negative, hàng đợi review, giảm chargeback
---

# Fraud Detection Basics

Fraud detection is about spotting **malicious transactions or accounts** (stolen cards, account takeover, fake signups) before they cause loss — while **not blocking legitimate customers**. That tension — catching fraud without rejecting good users — is the whole game. This is a practical overview of the signals, methods, and trade-offs (see how-3d-secure-works, how-payment-processing-works).

## The Core Trade-off: False Positives vs False Negatives

Every fraud system makes two kinds of mistakes:
- **False negative** — fraud you **miss** → chargebacks, financial loss, abuse.
- **False positive** — a **legitimate** customer you wrongly block → lost sale, angry customer, churn.
You can't minimize both at once — tightening rules catches more fraud **and** blocks more good users. The right operating point depends on your **margins and risk**: high-value/high-fraud businesses tolerate more false positives; low-margin ones can't afford to reject good customers. Blocking a good customer often costs more (lifetime value) than the occasional fraud. This trade-off drives every decision.

## The Signals

Fraud detection combines many **signals**, none decisive alone:
- **Velocity** — how fast/often: many transactions in a short time, many cards from one account, many accounts from one device. Sudden bursts are suspicious.
- **Device / fingerprint** — device ID, browser fingerprint; one device tied to many accounts/cards is a red flag.
- **Geolocation / IP** — mismatch between billing country, IP location, card country; known-bad IPs, VPN/proxy/Tor.
- **Mismatch** — billing vs shipping address, name vs card, email domain age.
- **Behavioral** — typing/navigation patterns, time on page, copy-paste of card numbers.
- **History / reputation** — is this email/device/card seen before, good or bad? Known-fraud lists.
- **Amount / pattern** — unusually large orders, testing patterns (many small auths = "card testing").

## Rules vs Machine Learning

- **Rules** — explicit `if` conditions ("block if >5 cards in an hour," "review if IP country ≠ card country"). Transparent, easy to reason about and adjust, good for known patterns — but rigid and gamed over time.
- **ML scoring** — a model trained on labeled fraud/legit data outputs a **risk score**; you act on thresholds. Catches subtle/evolving patterns and combines many signals — but is opaque, needs good labeled data, and can drift.
Most real systems **combine** both: rules for hard blocks and known abuse, ML for nuanced scoring, feeding a risk score.

## Act on the Score: Block / Review / Allow

Rather than binary allow/block, use **tiers**:
- **Low risk** → allow.
- **Medium risk** → **step up** (trigger 3DS — see how-3d-secure-works — or a manual **review queue**).
- **High risk** → block/decline.
A **review queue** (humans check borderline cases) recovers good customers that rules would falsely reject.

## Design Guidance

- **Layer signals** — no single signal is reliable; combine many into a score.
- **Tune to your economics** — set thresholds by the cost of a false positive vs false negative for *your* business.
- **Step-up, don't just block** — 3DS/verification recovers uncertain-but-legit customers.
- **Feedback loop** — feed chargeback/confirmed-fraud outcomes back to improve rules/models.
- **Watch card testing** — bursts of tiny auths signal someone validating stolen cards; rate-limit/block.
- **Explainability** — keep reasons for decisions (for disputes, tuning, and fairness).

## Pitfalls (in understanding/using)

- Optimizing only to **catch fraud** → blocking many good customers (false positives often cost more than the fraud).
- Relying on a **single signal** → easily evaded and error-prone; layer them.
- **Binary block/allow** with no review/step-up → no recovery path for borderline legit users.
- No **feedback loop** from actual outcomes → rules/models go stale as fraud evolves.
- Ignoring **card testing** (many micro-auths) → your endpoint becomes a stolen-card validator.
- Fraud rules that encode **bias** (e.g. blanket-blocking a country) → unfairly reject legitimate customers; be careful and explainable.
- Treating fraud detection as **set-and-forget** → fraudsters adapt continuously; it needs ongoing tuning.
