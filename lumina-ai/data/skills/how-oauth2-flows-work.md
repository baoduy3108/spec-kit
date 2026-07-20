---
name: how-oauth2-flows-work
description: How OAuth 2.0 authorization flows work — delegated access via access/refresh tokens without sharing passwords, the roles (resource owner, client, authorization server, resource server), the Authorization Code flow with PKCE, scopes and consent, and OpenID Connect for login. Use to understand OAuth2, the authorization code flow, PKCE, access vs refresh tokens, scopes, or "Sign in with Google".
category: engineering
keywords_vi: oauth2, authorization code pkce, access token, refresh token, ủy quyền truy cập, resource owner client, scope consent, openid connect đăng nhập
---

# How OAuth 2.0 Flows Work

OAuth 2.0 lets an application access a user's data on another service **without the user handing over their password** — "let this app read your Google Calendar" via a consent screen and revocable tokens. It's authorization *delegation*. (For security specifics see oauth-security; this covers the flow mechanics.)

## The Roles

- **Resource Owner** — the user who owns the data.
- **Client** — the app wanting access (your application).
- **Authorization Server** — issues tokens after authenticating the user and getting consent (e.g. Google's OAuth server).
- **Resource Server** — the API holding the data, which accepts tokens (e.g. the Calendar API).

## Tokens Instead of Passwords

The user authenticates **directly** with the authorization server (never giving the client their password). The client receives an **access token** — a credential it presents to the resource server to make API calls on the user's behalf. Tokens are:
- **Scoped** — grant only specific permissions (read calendar, not email).
- **Expiring** — short-lived, limiting damage if leaked.
- **Revocable** — the user can withdraw access anytime.
A **refresh token** (longer-lived) lets the client get new access tokens without re-prompting the user.

## The Authorization Code Flow (with PKCE)

The standard, secure flow for web/mobile apps:
1. The client **redirects** the user to the authorization server with the requested **scopes**.
2. The user **authenticates and consents** (the permission screen) — all on the auth server, so the client never sees credentials.
3. The auth server redirects back to the client with a short-lived **authorization code**.
4. The client **exchanges the code** (server-to-server, with its secret) for an **access token** (and refresh token).
5. The client calls the resource server's API with the access token.
The intermediate **code** (not the token) travels through the browser, so tokens aren't exposed in URLs. **PKCE** (Proof Key for Code Exchange) adds a one-time secret so that even a public client (mobile/SPA with no server secret) can't have its code stolen and exchanged by an attacker — PKCE is now recommended for **all** clients.

## Scopes & Consent

**Scopes** define granular permissions; the consent screen shows the user exactly what they're granting. Request the **minimum** scopes needed (least privilege — see security-and-hardening).

## OAuth vs OpenID Connect (a key distinction)

OAuth 2.0 is about **authorization** (access to resources), **not authentication** (proving *who* the user is). Using an access token as "proof of login" is a known mistake. **OpenID Connect (OIDC)** is a thin layer **on top of** OAuth2 that adds an **ID token** (a signed JWT — see how-jwt-works) asserting the user's identity — that's what "Sign in with Google" actually uses (see how-single-sign-on-works).

## Pitfalls (in understanding/using)

- Using OAuth (authorization) as **authentication** — use **OIDC** for login; an access token doesn't prove identity.
- Skipping **PKCE** on public clients (SPAs/mobile) → code interception attacks.
- Using the **implicit flow** (tokens in the URL fragment) — deprecated/insecure; use auth code + PKCE.
- Requesting **excessive scopes** — violates least privilege and scares users.
- Storing tokens insecurely (leaking access/refresh tokens = account access) — see secrets-management.
- Not validating token **audience/issuer/expiry** on the resource server.
