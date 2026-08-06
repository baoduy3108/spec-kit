---
name: how-cookies-and-sessions-work
description: How cookies and sessions maintain state over stateless HTTP — Set-Cookie/Cookie, session IDs vs stateless tokens, cookie attributes (HttpOnly, Secure, SameSite, expiry/domain/path), and how login persists across requests. Use to understand web login/state, cookie security flags, and session management.
category: engineering
keywords_vi: cookie session hoạt động thế nào, duy trì trạng thái http, session id, httponly secure samesite, đăng nhập giữ phiên, cookie attribute, quản lý phiên, hiểu cookie
---

# How Cookies & Sessions Work

HTTP is stateless — each request stands alone — yet websites remember you're logged in. Cookies bridge that gap.

## The Mechanism

1. On login, the server sends a **`Set-Cookie`** header with a value (e.g. a session id).
2. The browser stores it and **automatically sends it back** in a **`Cookie`** header on every subsequent request to that site.
3. The server reads it and knows who you are — state, over a stateless protocol.

## Session-Based (server-side state)

The cookie holds a random, opaque **session ID**; the actual state (user id, cart, etc.) lives **on the server** (memory / Redis / DB) keyed by that id. Benefits: the cookie reveals nothing, and you can **revoke** a session instantly by deleting it server-side. Cost: the server must store and look up sessions (shared store needed across a fleet).

## Token-Based (stateless)

The cookie (or an Authorization header) holds a **signed token** (e.g. a JWT) carrying the claims themselves; the server verifies the signature and reads it — **no server-side lookup**. Scales horizontally; harder to revoke before expiry (see how-jwt-works). Trade-off is exactly the mirror of sessions.

## Cookie Attributes (mostly security)

- **HttpOnly** — JavaScript can't read the cookie → an XSS attack can't steal the session. **Set this on auth cookies.**
- **Secure** — only sent over HTTPS (never in plaintext).
- **SameSite** — `Strict`/`Lax` stops the cookie being sent on cross-site requests → **CSRF defense**. `None` (allows cross-site) requires `Secure`.
- **Expires / Max-Age** — session cookie (deleted on browser close) vs persistent (remember-me).
- **Domain / Path** — which URLs the cookie is sent to (scope it tightly).

## The Big Picture

Login = the server sets an identifying cookie; every request replays it; the server maps it to your identity. "Logged out" = the cookie is cleared/expired or the server session is deleted. This is why: clearing cookies logs you out, why cross-device login needs re-auth (different browser store), and why cookie flags are a security surface.

## Pitfalls

- **No `HttpOnly`** on auth cookies → XSS steals sessions.
- **No `SameSite`** → CSRF risk.
- **No `Secure`** → session sent over HTTP, sniffable.
- Storing sensitive data in a plain cookie (it's client-side and readable unless it's a server-side session id or a signed token).
- Session fixation (not rotating the session id on login).
- Over-broad `Domain` leaking the cookie to subdomains you don't control.
