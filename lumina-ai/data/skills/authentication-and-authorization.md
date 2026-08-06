---
name: authentication-and-authorization
description: Build auth correctly — password hashing (bcrypt/argon2, never plain/MD5), sessions vs JWT trade-offs, secure cookie flags, token expiry and refresh, authorization models (RBAC/ABAC), and common holes (IDOR, missing server-side checks, JWT pitfalls). Use when implementing login, sessions, tokens, or access control. (For OAuth flows specifically, see oauth-security.)
category: engineering
keywords_vi: xác thực phân quyền, authentication authorization, hash mật khẩu, session vs jwt, phân quyền rbac, đăng nhập bảo mật, token hết hạn, kiểm soát truy cập
---

# Authentication & Authorization

**Authentication** = who you are; **authorization** = what you're allowed to do. They're distinct — verify identity, then check permission on every protected action.

## Passwords

- **Hash with a slow, salted algorithm**: bcrypt, scrypt, or **argon2** (preferred). Never store plaintext; never use fast/general hashes (MD5, SHA-256) for passwords — they're brute-forceable.
- Salting is built into these; never roll your own. Set a sensible work factor and raise it over time.
- Enforce length over arbitrary complexity rules; check against known-breached lists; rate-limit and lock out on repeated failures.
- Support MFA for sensitive accounts.

## Sessions vs Tokens

- **Server-side sessions** — a random session ID in a cookie, state on the server. Easy to revoke (delete server-side); great default for classic web apps.
- **JWT (stateless)** — signed token carrying claims; no server lookup, scales horizontally, but **hard to revoke before expiry**. Keep access tokens short-lived (minutes) + a revocable refresh token. Never put secrets in a JWT (it's readable), always verify the signature and `exp`, and pin the algorithm (reject `alg: none` and algorithm-confusion).
- **Cookie flags**: `HttpOnly` (no JS access → XSS can't steal it), `Secure` (HTTPS only), `SameSite=Lax/Strict` (CSRF defense). Store tokens in HttpOnly cookies rather than localStorage where possible.

## Authorization

- **Check on the server, every time** — never trust the client to hide a button; the API must enforce it. Hiding UI is not authorization.
- **RBAC** — roles grant permissions; simple and common. **ABAC** — decisions from attributes (owner, department, resource state) for finer control.
- **Default deny** — start with no access and grant explicitly.
- **Object-level checks (stop IDOR)** — verify the current user owns/may access *this specific* resource id, not just that they're logged in. `GET /orders/123` must confirm order 123 belongs to the caller.

## Common Holes

Missing server-side authz (client-only checks) · IDOR (no per-object ownership check) · long-lived non-revocable tokens · JWT `alg` confusion / unverified signatures · tokens in localStorage exposed to XSS · no rate limiting on login · leaking whether an email exists in error messages.
