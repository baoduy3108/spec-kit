---
name: how-single-sign-on-works
description: How Single Sign-On works — one login granting access to many apps via a trusted identity provider, using SAML or OpenID Connect (OAuth-based), tokens/assertions, and the redirect dance. Covers SSO vs OAuth vs OIDC and the trade-offs. Use to understand "Sign in with Google/Okta", enterprise SSO, and federated identity.
category: engineering
keywords_vi: single sign-on, sso, đăng nhập một lần, identity provider, saml, oidc, openid connect, đăng nhập bằng google, federated identity
---

# How Single Sign-On Works

SSO lets a user log in **once** with a central **Identity Provider (IdP)** and then access many applications **without logging in again** to each. "Sign in with Google", or an employee logging into dozens of company apps with one corporate account.

## The Players

- **Identity Provider (IdP)** — the trusted party that authenticates the user and vouches for them (Google, Okta, Azure AD, Auth0).
- **Service Provider (SP) / Relying Party** — the app the user wants to use, which **trusts** the IdP to confirm identity.
Instead of each app storing passwords and authenticating, they **delegate** authentication to the IdP.

## The Flow (the redirect dance)

1. You visit an app (SP) and click "log in."
2. The app **redirects** you to the IdP.
3. If you're not already logged into the IdP, you authenticate there (once); if you *are* (from an earlier app), it recognizes your existing session — that's the "single" in SSO.
4. The IdP **redirects you back** to the app with a signed **token/assertion** proving who you are.
5. The app verifies the signature (trusting the IdP) and logs you in — no password given to the app.
Because your session with the IdP persists, the next app you visit skips the login step entirely.

## SAML vs OIDC (the two standards)

- **SAML** — XML-based assertions; the long-standing **enterprise** SSO standard (Okta/AD → business apps).
- **OpenID Connect (OIDC)** — a modern identity layer built **on top of OAuth 2.0**, using JSON/JWT tokens (see how-jwt-works). Simpler, mobile/API-friendly; powers "Sign in with Google/Apple" and most new implementations.

## SSO vs OAuth vs OIDC (commonly confused)

- **OAuth 2.0** is about **authorization** — granting an app limited access to your resources (your Google contacts), not primarily "who you are."
- **OIDC** adds **authentication** (identity) on top of OAuth — it tells the app *who you are* (the ID token).
- **SSO** is the **experience** of one login across many apps, implemented via SAML or OIDC.
Using OAuth alone for login (a common mistake) is subtly wrong — OIDC is the identity-correct choice.

## Why It Matters

Explains: how "Sign in with Google" and enterprise SSO work (delegated auth + trusted IdP + signed tokens + redirects), why you don't re-enter passwords across apps, why apps don't store your password (reduced risk), and the standards (SAML for legacy enterprise, OIDC for modern). Benefits: fewer passwords, central control (disable one account → revoke all access), better security. Risk: the IdP is a **single point of failure/compromise** — if it's down, everything's locked out; if it's breached, everything's exposed (so protect the IdP with strong MFA).

## Pitfalls / Notes

- **IdP as single point of failure** — outage locks users out of everything; breach exposes everything (harden it, enforce MFA — see how-2fa-works).
- **Using OAuth for authentication** instead of OIDC → subtle security issues; use OIDC for login.
- **Misconfigured trust/signature validation** → token forgery.
- **Session/logout complexity** — logging out of one app vs the IdP (single logout is tricky).
- Over-trusting assertions without validating audience/issuer/expiry.
