---
name: how-cors-works
description: How CORS (Cross-Origin Resource Sharing) works — the same-origin policy it relaxes, preflight OPTIONS requests, the Access-Control-* headers, credentials and wildcards, and common misconceptions. Use to understand CORS errors, cross-origin requests, preflight, why the browser blocks a fetch, or configuring CORS on an API.
category: engineering
keywords_vi: cors hoạt động thế nào, cross-origin resource sharing, same-origin policy, preflight options request, access-control-allow-origin, lỗi cors trình duyệt chặn, credentials wildcard
---

# How CORS Works

CORS (Cross-Origin Resource Sharing) is the mechanism that lets a web page on one origin safely make requests to a **different** origin's API. It's the source of endless "blocked by CORS policy" errors — which make sense once you understand what it protects against.

## The Same-Origin Policy (what CORS relaxes)

Browsers enforce the **same-origin policy**: by default, JavaScript on `https://app.example.com` **cannot read** responses from a different **origin** (different scheme, host, or port), like `https://api.other.com`. This protects users: without it, a malicious site could use your logged-in browser to read your bank/email data via JS. CORS is the **controlled way to allow** specific cross-origin access — it *relaxes* the policy, it doesn't add restrictions (the restriction is the default).

## Key insight: it's browser-enforced, server-authorized

CORS is enforced by the **browser**, based on **headers the target server sends**. The server declares "I permit this origin to read my responses" via `Access-Control-Allow-Origin`. The browser checks and either exposes the response to JS or **blocks** it. Two consequences often confuse people:
- CORS only affects **browser JavaScript**. `curl`, servers, and mobile apps ignore it entirely (it's not a server-side firewall).
- A "CORS error" means the **server didn't send the right headers** — the fix is on the **server**, not the client.

## Simple Requests vs Preflight

- **Simple requests** (GET/POST with basic headers/content-types) — the browser sends the request, then checks `Access-Control-Allow-Origin` on the response before revealing it to JS.
- **Preflighted requests** — for anything "non-simple" (methods like PUT/DELETE, custom headers, JSON content-type), the browser first sends an **`OPTIONS` preflight** asking "may I send this?" The server must respond with `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, etc. Only if approved does the browser send the real request. This prevents unexpected cross-origin state-changing calls.

## Credentials & Wildcards

- To send **cookies/credentials** cross-origin, the client sets `credentials: 'include'` **and** the server must send `Access-Control-Allow-Credentials: true` **and** an explicit origin — you **cannot** use `Access-Control-Allow-Origin: *` with credentials (browsers forbid it, to avoid leaking authenticated data broadly).
- Reflecting the request's origin dynamically is common but must be done against an **allowlist** — blindly reflecting any origin defeats the protection.

## Pitfalls (in understanding/using)

- Thinking CORS **secures your API** — it only restricts **browser JS**; anyone can still call your API directly (use real auth/authorization — see authentication-and-authorization).
- "Fixing" CORS on the **frontend** — the fix is **server** headers (or a proxy); the client can't grant itself access.
- Using `Allow-Origin: *` **with credentials** — forbidden; use an explicit allowlisted origin.
- Reflecting **any** origin (`Allow-Origin` = request origin, unchecked) → effectively disables the protection; use an allowlist.
- Forgetting the **preflight** — the API must handle `OPTIONS` and return the right `Allow-*` headers.
- Confusing CORS with CSRF — related but different; CORS governs reading responses, CSRF is about unwanted state-changing requests (see security-headers for SameSite cookies).
