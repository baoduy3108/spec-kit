---
name: how-3d-secure-works
description: How 3-D Secure (3DS) and Strong Customer Authentication work — the extra cardholder verification step that shifts fraud liability to the issuer, frictionless vs challenge flows, and the trade-off between security and checkout conversion. Use to understand 3D Secure, SCA, liability shift, or why some payments require extra verification.
category: engineering
keywords_vi: 3d secure, 3ds, strong customer authentication, xác thực mạnh, bước xác minh chủ thẻ, chuyển trách nhiệm gian lận sang ngân hàng phát hành, frictionless challenge, liability shift
---

# How 3-D Secure (3DS) Works

3-D Secure is an **extra authentication step** in online card payments — the moment where your bank asks you to confirm a purchase (a push notification, an app approval, or an SMS code). Its two purposes: **reduce fraud** and **shift fraud liability** from the merchant to the card issuer. It's also the mechanism behind Europe's **Strong Customer Authentication (SCA)** requirement (see how-payment-processing-works, fraud-detection-basics).

## The Problem: Card-Not-Present Fraud

For online ("card-not-present") payments, anyone with a stolen card number can attempt a purchase — the merchant can't check a physical card or signature. Historically, if such a fraudulent charge was disputed, the **merchant** ate the loss (chargeback). 3DS adds a verification step to prove the **actual cardholder** is present, and — crucially — changes who's liable when fraud slips through.

## The Core Idea: Verify With the Issuer

The "3 domains" are the **merchant/acquirer**, the **card network**, and the **issuer** (your bank). During checkout, 3DS loops in the **issuer** to authenticate the cardholder:
1. At payment, the merchant's processor initiates a 3DS check with the issuer.
2. The issuer decides how much verification is needed based on **risk**.
3. The cardholder may be asked to authenticate (approve in their banking app, enter a one-time code, biometrics).
4. On success, the issuer confirms the cardholder is genuine, and the payment proceeds.

## Frictionless vs Challenge

Modern 3DS (version 2) is **risk-based** to minimize checkout friction:
- **Frictionless flow** — the issuer evaluates rich data (device, history, amount) and, if it looks low-risk, **approves silently** with no user interaction. Most transactions go this way — the customer isn't bothered.
- **Challenge flow** — if risk is elevated or regulation requires it, the customer gets an **explicit challenge** (app approval / OTP). More secure but adds friction (and drop-off).
The system tries to challenge **only when necessary**, balancing security against conversion.

## The Liability Shift (why merchants care)

The key business incentive: when a payment is authenticated with 3DS, **fraud liability shifts to the issuer**. If an authenticated transaction later turns out fraudulent, the **issuer** (not the merchant) bears the chargeback. Without 3DS, the merchant is liable. So 3DS both prevents fraud *and* protects the merchant from the fraud that gets through.

## SCA (regulation)

In the EU/UK, **PSD2's Strong Customer Authentication** legally **requires** two-factor verification for many online payments — typically satisfied by 3DS. There are **exemptions** (low-value, low-risk, recurring/merchant-initiated, trusted beneficiaries) to reduce friction where allowed. This is why European checkouts often trigger a bank approval step.

## The Trade-off

- **More security & liability protection** vs **more checkout friction & abandonment**. Every extra step loses some customers.
- Risk-based 3DS 2.x exists precisely to get the security/liability benefits while keeping most transactions frictionless.
- Merchants tune when to request 3DS (always, or only on risky/regulated transactions) to balance fraud, liability, and conversion.

## Pitfalls (in understanding/using)

- Assuming 3DS is **always a challenge** → modern 3DS is mostly frictionless; don't design as if every payment interrupts the user.
- Forgetting the **liability shift** — skipping 3DS means the **merchant** eats fraud chargebacks.
- Ignoring **SCA** requirements for EU/UK customers → declined payments for non-compliant flows.
- Adding 3DS **everywhere** without risk-basing it → needless friction and lost conversions.
- Treating 3DS as **complete** fraud protection — it addresses card-not-present authentication, not all fraud (see fraud-detection-basics).
- Not handling the **challenge redirect/callback** correctly in the integration → stuck or failed checkouts.
