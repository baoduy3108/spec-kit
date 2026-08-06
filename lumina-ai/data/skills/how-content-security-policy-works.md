---
name: how-content-security-policy-works
description: How Content Security Policy (CSP) works — an HTTP header that whitelists which sources of scripts, styles, images, etc. a page may load, providing defense-in-depth against XSS by blocking unauthorized/inline scripts. Use to understand CSP, mitigate XSS with a policy, control allowed resource sources, or configure a Content-Security-Policy header.
category: engineering
keywords_vi: content security policy, chính sách bảo mật nội dung, csp nonce, csp header, chặn script nội tuyến, report-only, whitelist nguồn script, script-src default-src
---

# How Content Security Policy (CSP) Works

Content Security Policy is an HTTP response header that tells the browser **which sources of content a page is allowed to load and execute** — scripts, styles, images, fonts, frames, connections. Its main job is **defense-in-depth against XSS** (cross-site scripting): even if an attacker injects a malicious script, CSP can **block it from running** because it doesn't come from an allowed source (see security-and-hardening, how-cors-works).

## The Problem: XSS Executes Injected Scripts

In an XSS attack, an attacker gets **malicious JavaScript** to run in a victim's page (via unsanitized input, a third-party script, etc.), letting them steal cookies/tokens, hijack sessions, or deface the page. Input sanitization is the first defense, but it's easy to miss a spot. CSP is a **second layer**: instruct the browser to only run scripts from **trusted sources**, so an injected inline or foreign script simply **won't execute** — turning a would-be XSS into a blocked resource.

## The Core Idea: A Whitelist of Sources

CSP is a policy delivered in the `Content-Security-Policy` header, made of **directives**, each naming allowed sources for a resource type:
- `script-src` — where scripts may load from (e.g. `'self'`, specific domains).
- `style-src`, `img-src`, `font-src`, `connect-src` (fetch/XHR/WebSocket targets), `frame-src`, etc.
- `default-src` — the fallback for any directive you don't specify.
The browser **enforces** it: any resource from a source **not** on the list is **blocked**. So `script-src 'self'` means only same-origin scripts run — an injected `<script src="evil.com">` or inline `<script>` is refused.

## The Big Win: Blocking Inline Scripts

XSS payloads are usually **inline** (`<script>...</script>` or `onclick="..."`) or from an attacker's domain. A strong CSP **disallows inline scripts by default** — this alone defeats most XSS. To allow the **legitimate** inline scripts you control, you use:
- **Nonces** — a random per-response token (`script-src 'nonce-abc123'`); only `<script nonce="abc123">` tags run. The attacker can't guess the nonce, so injected inline scripts are blocked.
- **Hashes** — allow a specific inline script by the hash of its content (`'sha256-...'`).
Avoid `'unsafe-inline'` (which permits all inline scripts and **defeats** CSP's XSS protection) — nonces/hashes are the safe way to allow the inline scripts you need.

## Report-Only Mode and Rollout

CSP can be **too strict** and break legitimate resources. Roll it out safely:
- `Content-Security-Policy-Report-Only` — the browser **reports** violations (to a `report-uri`/`report-to` endpoint) **without blocking** anything. Deploy in report-only first, watch what *would* break, refine the policy, then enforce.
- Start permissive, tighten gradually; a policy that blocks your own app is worse than none (people disable it).

## Design Guidance

- **`default-src 'self'`** as a base, then open up specific directives as needed.
- **No `'unsafe-inline'` for scripts** — use **nonces or hashes** for legitimate inline scripts.
- **Avoid `'unsafe-eval'`** — it re-enables dangerous dynamic code execution.
- **Roll out in report-only** first to find breakage without blocking users.
- **Be specific** — list exact trusted domains rather than broad wildcards.
- Treat CSP as **defense-in-depth**, not a replacement for input sanitization/output encoding.

## Pitfalls (in understanding/using)

- Using **`'unsafe-inline'`** in `script-src` → defeats CSP's main XSS protection; use nonces/hashes.
- Enforcing a **too-strict** policy without report-only testing → breaks your own scripts/styles/images.
- Overly **broad wildcards** (`*` or `https:`) → weakens the whitelist to near-uselessness.
- Forgetting **`connect-src`** → blocking your own API/WebSocket calls (or leaving them wide open).
- Treating CSP as **complete** XSS protection → it's a layer; still sanitize/encode inputs.
- Not monitoring **violation reports** → missing both real attacks and legitimate breakage.
