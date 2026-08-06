---
name: oauth-security
description: OAuth 2.0/2.1 implementation guidance — authorization code flow with PKCE, token validation, refresh rotation, route protection, and common security anti-patterns. Use when the user is implementing or reviewing OAuth/login authentication flows.
category: engineering
keywords_vi: oauth, pkce, jwt validation, xác thực đăng nhập, authorization code flow, bảo mật oauth
---

# OAuth 2.0/2.1 Implementation Guide

This skill guide covers setting up OAuth flows — authorization code with PKCE, token validation, refresh rotation, and route protection.

## Core Setup Steps

1. Register the OAuth plugin/library with PKCE enabled (RFC 7636)
2. Implement a callback handler that exchanges authorization codes
3. Add JWT validation middleware to protected routes
4. Rotate refresh tokens on each use

## Critical Security Points

- **State validation** — prevent CSRF attacks by checking session state matches the authorization response
- **Redirect URI allowlisting** — RFC 6749 requires exact matching; misconfigurations are a common vulnerability
- **JWT claim validation** — always verify `exp` (expiration), `iss` (issuer), and `aud` (audience) on every request
- **PKCE for public clients** — always use for public clients to prevent authorization code interception
- **HttpOnly cookies** — avoid localStorage for tokens; use secure, same-site cookies instead

## Anti-Patterns to Avoid

- Accepting implicit flow or URL-fragment token responses
- Skipping audience validation (enables token reuse across services)
- Using symmetric signing (HS256) for third-party tokens — use RS256/ES256 with JWKS endpoints instead
- Omitting HTTPS or accepting HTTP redirect URIs

## Additional Considerations

Device flow (RFC 8628) for input-constrained devices, JWKS caching strategies, client credentials flow for service-to-service auth, native app patterns (RFC 8252).
