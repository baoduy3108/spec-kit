---
name: browser-storage
description: The browser storage options and when to use each — cookies, localStorage, sessionStorage, IndexedDB, and the Cache API — their size limits, persistence, sync/async access, and security implications (XSS, tokens). Use to understand where to store data in the browser, localStorage vs cookies, IndexedDB, or storing auth tokens safely client-side.
category: engineering
keywords_vi: browser storage, lưu trữ trình duyệt, cookie localstorage sessionstorage, indexeddb, cache api, giới hạn kích thước, lưu token an toàn, xss client-side
---

# Browser Storage

Browsers offer several ways to store data on the client, each with different size limits, lifetimes, access patterns, and security properties. Choosing the right one — and understanding the security implications — matters, especially for auth tokens.

## The Options

- **Cookies** — small (~4KB), sent with **every HTTP request** to the domain automatically. Designed for server-readable data (sessions). Can be **`HttpOnly`** (invisible to JavaScript → protected from XSS theft), **`Secure`** (HTTPS only), and **`SameSite`** (CSRF protection — see security-headers). Because they're sent on every request, don't overuse them (bandwidth).
- **localStorage** — ~5–10MB, **persists** until explicitly cleared (survives browser restarts), key/value **strings**, **synchronous** JS-only access. Good for non-sensitive client preferences, cached data.
- **sessionStorage** — like localStorage but scoped to the **tab/session** — cleared when the tab closes. For transient per-session data.
- **IndexedDB** — a **large** (hundreds of MB+), **asynchronous**, transactional **database** in the browser for structured data and blobs. For offline apps, large datasets, complex client-side data (see how-service-workers-work for offline patterns).
- **Cache API** — stores HTTP request/response pairs, used with service workers for offline/asset caching (see how-http-caching-works).

## Choosing

- **Small server-needed data / sessions** → cookies (HttpOnly for auth).
- **Client-only preferences / small cached values** → localStorage (persistent) or sessionStorage (per-tab).
- **Large / structured / offline data** → IndexedDB.
- **Cached network responses / offline assets** → Cache API (+ service worker).
- Sync (localStorage) blocks the main thread — use async (IndexedDB) for large data.

## The Security Question: Where to Store Auth Tokens

A critical, debated topic. The two options each have a trade-off:
- **localStorage** — convenient (JS reads it), but **any XSS** (injected script — see owasp-top-10) can **read and steal** the token. localStorage is **not** XSS-safe.
- **HttpOnly cookies** — JavaScript **cannot** read them, so XSS can't directly steal the token — but cookies are auto-sent, so you must defend against **CSRF** (`SameSite`, CSRF tokens).
The common guidance: store session/auth tokens in **HttpOnly, Secure, SameSite cookies** (XSS can't exfiltrate them) rather than localStorage, and defend CSRF. Never store sensitive tokens where XSS can read them if you can avoid it. Regardless, the real fix is **preventing XSS** (see security-headers CSP).

## Pitfalls (in understanding/using)

- **Storing auth tokens in localStorage** → XSS steals them; prefer HttpOnly cookies + CSRF defense.
- Storing **sensitive data** client-side at all — the client is untrusted; minimize what lives there.
- Using **synchronous localStorage** for large data → blocks the main thread (jank); use IndexedDB (async).
- Assuming client storage is **reliable/permanent** — users/browsers can clear it; it's a cache, not a source of truth.
- Overloading **cookies** with data (sent on every request → bandwidth waste).
- Ignoring **size limits** (localStorage quota, cookie size) — writes fail silently or truncate.
- Forgetting storage is **per-origin** and not shared across domains/subdomains by default.
