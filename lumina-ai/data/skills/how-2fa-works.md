---
name: how-2fa-works
description: How two-factor authentication works — combining something you know (password) with something you have (a device) or are (biometric); TOTP authenticator apps, SMS codes (and their weakness), push approval, and hardware security keys (FIDO2/WebAuthn, phishing-resistant). Use to understand 2FA/MFA, why it stops password theft, and which factor is strongest.
category: engineering
keywords_vi: 2fa mfa hoạt động thế nào, xác thực hai yếu tố, totp authenticator app, mã otp, security key fido webauthn, sms code yếu, bảo mật đăng nhập, hiểu 2fa
---

# How Two-Factor Authentication Works

2FA (a form of MFA) requires **two different types** of proof to log in, so a stolen password alone isn't enough. The factor categories:
- **Something you know** — a password/PIN.
- **Something you have** — a phone, authenticator app, or hardware key.
- **Something you are** — a fingerprint/face (biometric).
Two factors must come from **different categories** (a password + a security question is still one category — both "know").

## The Common Second Factors (weakest → strongest)

- **SMS codes** — a code texted to your phone. Better than nothing, but **weak**: vulnerable to SIM-swapping (attacker ports your number), SS7 interception, and phishing. Avoid for high-value accounts.
- **TOTP authenticator apps** (Google Authenticator, Authy) — the app and server **share a secret** at setup (the QR code); both compute the same 6-digit code from that secret + the current time (a **Time-based One-Time Password**), rotating every 30 seconds. No network needed, not interceptable in transit like SMS. A solid default. Still phishable (a fake site can relay the code in real time).
- **Push approval** — the app shows "Approve this login?"; you tap yes. Convenient, but beware **MFA fatigue** (spamming prompts until you tap yes) — use number-matching variants.
- **Hardware security keys / passkeys (FIDO2/WebAuthn)** — a physical key or platform authenticator does a **public-key challenge-response** bound to the site's real domain. This makes it **phishing-resistant**: a fake site can't get a valid response because the key checks the origin. The strongest factor; the direction the industry is moving (passkeys).

## Why It Works

Passwords get **phished, leaked, and reused** — most account takeovers start with a stolen password. Requiring a second factor from a *different* category means the attacker also needs your physical device (or biometric), which they usually don't have. 2FA blocks the vast majority of automated credential-stuffing and phishing attacks.

## Recovery & Practical Notes

- **Backup codes** — save the one-time recovery codes when enabling 2FA; losing your only second factor can lock you out.
- **Multiple factors** — register more than one (app + a security key) so a lost phone isn't a lockout.
- **Prefer TOTP/security keys over SMS** where offered; use **passkeys/FIDO2** for the most sensitive accounts.

## Pitfalls

- Relying on **SMS** for critical accounts (SIM-swap risk).
- No **backup codes** → locked out when the device is lost.
- **MFA fatigue** — approving a push you didn't initiate.
- Thinking 2FA makes you unphishable — TOTP/SMS can be relayed by a real-time phishing proxy; only FIDO2/passkeys resist that.
- Using a weak/reused password *and* 2FA and assuming you're fully safe — 2FA complements a strong unique password, doesn't replace it.
