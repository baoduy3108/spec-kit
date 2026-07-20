---
name: how-jwt-works
description: How JSON Web Tokens work — the header.payload.signature structure, base64url encoding (readable, not encrypted), signing with HMAC or public key, verifying the signature and claims (exp, iss, aud), and the security pitfalls (alg confusion, no revocation, storing secrets in the payload). Use to understand JWTs, stateless auth tokens, and their gotchas.
category: engineering
keywords_vi: jwt hoạt động thế nào, json web token, header payload signature, ký hmac jwt, xác thực token, alg none confusion, claim exp iss aud, hiểu jwt
---

# How JWTs Work

A JSON Web Token is a compact, self-contained, signed token that carries claims — used for stateless authentication and passing verified data between parties.

## Structure: three base64url parts

`header.payload.signature`:
- **Header** — the token type and signing algorithm (`{"alg":"HS256","typ":"JWT"}`).
- **Payload** — the **claims**: standard ones like `sub` (subject/user id), `exp` (expiry), `iat` (issued-at), `iss` (issuer), `aud` (audience), plus custom data.
- **Signature** — signs `base64(header) + "." + base64(payload)` so tampering is detectable.

**Critical**: the header and payload are only **base64url-encoded, NOT encrypted** — anyone can decode and read them. A JWT provides **integrity and authenticity, not confidentiality**. Never put secrets/passwords in the payload.

## Signing & Verifying

- **HMAC (HS256)** — signed and verified with the same **shared secret**. Simple; both sides must hold the secret.
- **Asymmetric (RS256/ES256)** — signed with a **private** key, verified with the **public** key. Lets many services verify without holding the signing secret (good for distributed systems / third-party verification).
On receipt, the server **recomputes the signature** and compares; if it matches, the payload is trusted (it was issued by the key holder and unmodified). Then it checks claims — **`exp` not passed**, correct `iss`/`aud` — before honoring it.

## Stateless Auth Trade-off

JWTs enable **stateless** auth: the server doesn't store sessions — it just verifies the signature and reads the claims. This scales horizontally (any server can verify). The cost: **you can't easily revoke a JWT before it expires** (nothing to delete server-side). Mitigations: keep access tokens **short-lived** (minutes) + a revocable refresh token; or maintain a small denylist of revoked token ids. Long-lived JWTs are a security smell.

## Security Pitfalls

- **`alg: none` / algorithm confusion** — historically, attackers set `alg` to `none` (no signature) or tricked RS256 verifiers into treating the public key as an HMAC secret. Always **pin the expected algorithm** server-side; never trust the token's own `alg` header to choose verification.
- **Not verifying the signature** (decoding without verifying) — then any forged token is accepted. Always verify.
- **Secrets in the payload** — it's readable; don't.
- **Weak HMAC secret** — brute-forceable; use a long random secret.
- **Ignoring `exp`/`aud`/`iss`** — a valid signature isn't enough; check the claims match your service and aren't expired.
- **Storing JWTs in localStorage** — exposed to XSS; prefer HttpOnly cookies (see authentication-and-authorization).
