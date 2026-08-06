---
name: security-headers
description: HTTP security headers that harden a web app in the browser — Content-Security-Policy (CSP), HSTS, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, and secure cookie flags. Use when hardening a website, setting up CSP, or fixing browser-side security issues.
category: engineering
keywords_vi: security header, csp, content security policy, hsts, x-frame-options clickjacking, cookie httponly secure samesite, referrer policy, header bảo mật http
---

# HTTP Security Headers

Security headers tell the browser to enforce protections on your behalf — cheap, high-value hardening. They mitigate XSS, clickjacking, protocol downgrade, and data leaks. Set them at the app or reverse-proxy layer (helmet in Node, secure defaults in most frameworks).

## The Key Headers

- **Content-Security-Policy (CSP)** — the most powerful. Controls which sources of scripts/styles/images/etc. the browser will load, blocking injected/inline scripts. A strong CSP is your best defense-in-depth against **XSS**: even if an attacker injects a `<script>`, the browser refuses to run it. Start with a restrictive policy (`default-src 'self'`), use nonces/hashes for legitimate inline scripts, avoid `unsafe-inline`/`unsafe-eval`. Roll out in `Content-Security-Policy-Report-Only` first to find breakage.

- **Strict-Transport-Security (HSTS)** — forces HTTPS for future visits (`max-age=63072000; includeSubDomains; preload`), preventing SSL-strip/downgrade attacks. Only send over HTTPS; be sure before enabling `preload` (hard to undo).

- **X-Content-Type-Options: nosniff** — stops the browser from MIME-sniffing responses (prevents some content-type confusion attacks). Always set it.

- **X-Frame-Options: DENY** / CSP **`frame-ancestors 'none'`** — prevents your site being embedded in an iframe elsewhere → stops **clickjacking**. Use `frame-ancestors` (CSP) as the modern form; allow specific origins if you legitimately need embedding.

- **Referrer-Policy** — controls how much URL info leaks in the `Referer` header (`strict-origin-when-cross-origin` is a good default) — avoid leaking paths/tokens to third parties.

- **Permissions-Policy** — disable browser features you don't use (camera, geolocation, etc.), reducing attack surface.

## Secure Cookies

For session/auth cookies (see authentication-and-authorization):
- **`HttpOnly`** — JS can't read it (mitigates XSS token theft).
- **`Secure`** — sent only over HTTPS.
- **`SameSite=Lax`** (or `Strict`) — mitigates CSRF by not sending the cookie on cross-site requests. Use `Lax` as a sane default; `Strict` for the most sensitive.
- Scope with `Path`/`Domain`; set a sensible expiry.

## Practical Approach

- Use a library (helmet/framework defaults) so you get sane values, then tighten CSP for your app.
- **CSP is the one that takes effort** — invest in it; the rest are mostly set-and-forget.
- Verify with a scanner (securityheaders.com, browser devtools) after deploy.
- Headers are **defense in depth**, not a substitute for fixing the underlying issue (still escape output, still validate).

## Pitfalls

- **No CSP, or a CSP with `unsafe-inline`** everywhere (defeats its purpose).
- **HSTS on a site not fully on HTTPS** → locks users out; or `preload` before you're sure.
- **Missing HttpOnly/Secure/SameSite** on session cookies → token theft / CSRF.
- Setting headers once and never re-checking as the app adds third-party scripts.
- Treating headers as the whole of security rather than one layer.
