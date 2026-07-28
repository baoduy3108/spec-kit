---
name: session-fixation-and-secure-sessions
description: How attackers hijack logins by controlling the session id — session fixation — and the broader rules for secure session management: regenerate the id on privilege change, secure cookie flags, absolute/idle timeouts, and server-side invalidation on logout. Use to understand why you must rotate session ids at login, why session ids must be unguessable, and how to build a session lifecycle that resists hijacking.
category: security
keywords_vi: cố định phiên session fixation kẻ tấn công kiểm soát session id trước rồi chiếm đăng nhập, tái tạo session id khi đổi quyền đăng nhập, cờ cookie an toàn httponly secure samesite, hết hạn tuyệt đối và theo thời gian nhàn rỗi, vô hiệu hoá phiên phía máy chủ khi đăng xuất, session id phải khó đoán ngẫu nhiên
---

# Session Fixation & Secure Sessions

Once a user logs in, a **session** keeps them authenticated across requests — usually via a **session id** stored in a cookie. If an attacker can **learn, set, or guess** that session id, they *become* the user without a password. **Session fixation** is a specific, subtle attack in this family, and defending against it is part of a broader discipline of secure session lifecycle management (see how-cookies-and-sessions-work, csrf-and-same-site-defenses, authentication-and-authorization).

## Session Fixation: The Attack

The insight: what if the attacker **fixes** the session id **before** the victim logs in?
1. The attacker obtains a valid session id from the app (or the app accepts an id the attacker supplies, e.g. via URL).
2. The attacker **tricks the victim** into using that **known** session id (a crafted link that sets it, or an app that accepts an id from the query string).
3. The victim **logs in** — and if the app **keeps the same session id** after login, that id is now an **authenticated** session.
4. The attacker, who knew the id all along, is now logged in as the victim.

The attacker never had to *steal* an id after login — they **planted** it beforehand.

## The Primary Fix: Regenerate on Privilege Change

**Always issue a brand-new session id at any privilege boundary — especially at login** (and at logout, and on role/permission elevation). If the id the victim logs in with is **replaced** by a fresh, random one the attacker doesn't know, the fixed id becomes worthless. This single rule (`session.regenerate()` on authentication) defeats fixation. Most frameworks provide it — but it's easy to forget, and forgetting is the vulnerability.

## The Broader Rules of Secure Sessions

- **Unguessable ids** — session ids must be **long, cryptographically random** (128+ bits). Guessable/sequential ids invite brute force (a form of hijacking).
- **Never accept session ids from the URL** or let clients choose them — cookies only; URL ids leak via Referer, logs, and history and enable fixation.
- **Secure cookie flags**: `HttpOnly` (JS can't read it → limits XSS theft), `Secure` (HTTPS only → no plaintext leak), `SameSite=Lax/Strict` (limits CSRF).
- **Timeouts** — both an **idle timeout** (log out after inactivity) and an **absolute timeout** (max session lifetime regardless of activity); expire aggressively for sensitive apps.
- **Server-side invalidation on logout** — logout must **destroy the session on the server**, not just clear the cookie; otherwise a captured id still works. Support "log out everywhere."
- **Bind/monitor** — optionally tie sessions to signals and re-authenticate for high-value actions (step-up auth).

## Design Guidance (for understanding/using)

- **Regenerate the session id at login** (and logout / privilege change) — the core fixation defense.
- **Use long, random session ids**; store sessions server-side (or use signed, expiring tokens) — never trust a client-set id.
- **Set `HttpOnly` + `Secure` + `SameSite`** on the session cookie; never carry the id in the URL.
- **Enforce idle *and* absolute timeouts** and **invalidate server-side on logout**.
- **Re-authenticate (step-up)** for sensitive operations; support session revocation across devices.

## Pitfalls (in understanding/using)

- **Keeping the same session id** across login → session fixation; always regenerate.
- Accepting session ids from the **URL/query** or letting clients set them → fixation + leakage.
- Only clearing the **cookie** on logout while the server session lives on → a captured id still works.
- Missing `HttpOnly`/`Secure`/`SameSite` → XSS theft, plaintext leak, CSRF exposure.
- No **absolute timeout** → a stolen/fixed session stays valid indefinitely.
