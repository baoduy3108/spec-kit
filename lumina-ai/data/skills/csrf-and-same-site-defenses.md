---
name: csrf-and-same-site-defenses
description: How attackers make a logged-in user's browser perform unwanted actions — Cross-Site Request Forgery (CSRF) — and the layered defenses: SameSite cookies, anti-CSRF tokens (synchronizer/double-submit), and origin checks. Use to understand why cookies alone are dangerous for state-changing requests, why GET must be side-effect-free, and how SameSite=Lax changed the landscape.
category: security
keywords_vi: giả mạo yêu cầu liên trang csrf trình duyệt người đã đăng nhập thực hiện hành động ngoài ý muốn, cookie tự gửi kèm nên nguy hiểm cho request thay đổi trạng thái, token chống csrf synchronizer và double-submit, cookie samesite lax strict, kiểm tra origin và referer, get phải không có tác dụng phụ
---

# CSRF & SameSite Defenses

**Cross-Site Request Forgery (CSRF)** exploits a simple browser behavior: cookies are **automatically attached** to requests to their origin, *even when the request is triggered by a different site*. So if you're logged into your bank and visit a malicious page, that page can submit a hidden form to `bank.com/transfer` and your browser **helpfully includes your session cookie** — the bank sees an authenticated request and executes the transfer. The user never clicked anything meaningful. The fix is to ensure a state-changing request **proves it originated from your own app**, not just that a valid cookie exists (see how-cookies-and-sessions-work, how-cors-works, session-fixation-and-secure-sessions).

## Why Cookies Alone Are Not Enough

A session cookie proves *who* you are, not *where the request came from*. CSRF abuses exactly that gap: the attacker doesn't need to read anything (that's what CORS/same-origin policy prevents) — they just need the browser to **send** a request with your cookie. Any endpoint that performs a side effect based **solely** on a cookie is vulnerable.

## The Defenses (use in layers)

**1. SameSite cookies (first line, now default).** The `SameSite` cookie attribute tells the browser whether to send the cookie on cross-site requests:
- **`Strict`** — never sent cross-site (most secure; can break following external links into a logged-in area).
- **`Lax`** (modern browser default) — sent on top-level **navigations** (clicking a link) but **not** on cross-site subrequests (forms POSTing from another site, images, fetch). This blocks most classic CSRF automatically.
- **`None`** — always sent (requires `Secure`); needed for legitimate cross-site cookies but re-opens CSRF risk.
SameSite=Lax defaults dramatically reduced CSRF, but it's **not** a complete fix (some GET-based state changes, certain navigation cases), so combine with tokens.

**2. Anti-CSRF tokens.** Issue a secret, unpredictable token tied to the session and require it on every state-changing request:
- **Synchronizer token** — server stores the token, embeds it in forms; validates the submitted token matches. Strongest.
- **Double-submit cookie** — send the token both as a cookie and as a header/form field; server checks they match (stateless, but weaker if subdomains are compromised).
The attacker's cross-site page **cannot read** your token (same-origin policy), so it can't forge a valid request.

**3. Origin/Referer checks.** Verify the `Origin` (or `Referer`) header matches your site for state-changing requests — a cheap additional signal.

## Method Discipline

**GET (and other "safe" methods) must never cause side effects.** CSRF protections assume state changes go through POST/PUT/DELETE with tokens; a `GET /delete?id=5` is trivially forgeable (an `<img src>` triggers it). Keeping reads idempotent and side-effect-free is both REST-correct and a security requirement.

## Design Guidance (for understanding/using)

- **Set `SameSite=Lax` (or Strict) on session cookies** — the modern baseline; use `Strict` where cross-site entry isn't needed.
- **Add anti-CSRF tokens** for state-changing requests — don't rely on SameSite alone.
- **Never mutate state on GET** — side effects belong on POST/PUT/DELETE.
- **Check `Origin`/`Referer`** as a defense-in-depth signal.
- **Token-based auth in headers (Bearer)** isn't auto-sent cross-site, so pure header-token APIs are largely CSRF-immune — but cookie-based sessions need these protections.

## Pitfalls (in understanding/using)

- Relying **only on the cookie** for state changes → classic CSRF; require a token/SameSite too.
- **State-changing GET** endpoints → forgeable with an `<img>`/link; use unsafe methods with tokens.
- Assuming **SameSite=Lax fully fixes CSRF** → it blocks most, not all; keep tokens.
- **Double-submit** across shared subdomains → a compromised sibling subdomain can set the cookie; prefer synchronizer tokens for high-value actions.
- Confusing CSRF with XSS → CSRF forges requests (can't read responses); XSS runs script in your page (can read everything). Different defenses.
