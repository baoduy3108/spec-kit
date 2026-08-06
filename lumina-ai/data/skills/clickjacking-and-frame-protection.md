---
name: clickjacking-and-frame-protection
description: How attackers trick users into clicking something they can't see — clickjacking (UI redressing) — by loading your site in an invisible iframe over decoy content, and the defenses: X-Frame-Options / CSP frame-ancestors and framebusting. Use to understand why sensitive actions need frame protection, why SameSite alone doesn't stop it, and how to decide what may be framed.
category: security
keywords_vi: cướp nhấp chuột clickjacking ui redressing lừa người dùng nhấp vào thứ họ không thấy, nhúng site vào iframe trong suốt đè lên nội dung mồi, phòng thủ x-frame-options và csp frame-ancestors, chặn nhúng khung framebusting, hành động nhạy cảm cần chống nhúng khung, samesite không ngăn được clickjacking
---

# Clickjacking & Frame Protection

**Clickjacking** (UI redressing) tricks a user into clicking a button or link on **your** site without realizing it. The attacker loads your page in an **invisible/transparent iframe** and overlays it on their own decoy content ("Click here to win!"). The user thinks they're clicking the decoy, but the click lands on your framed page — "Delete account", "Transfer funds", "Authorize app", "Like/Follow". Because it's the user's **real** authenticated session performing a **real** click, cookie- and CSRF-token-based defenses **don't help** — the request is genuine (see csrf-and-same-site-defenses, xss-and-output-encoding, how-content-security-policy-works).

## Why Normal Defenses Miss It

- **CSRF tokens** don't help — the framed page is your real page with valid tokens; the *user* really clicked.
- **SameSite cookies** don't help — it's a top-level interaction with your own site's session, just visually deceived.
- **Auth** doesn't help — the user is legitimately logged in.
The attack is about **deceiving the human**, so the defense must stop your page from being **framed** by other sites at all.

## The Defenses

**1. `Content-Security-Policy: frame-ancestors` (modern, preferred).** Declares who may embed your page in a frame:
- `frame-ancestors 'none'` — nobody can frame it (best for sensitive pages).
- `frame-ancestors 'self'` — only your own origin.
- `frame-ancestors https://trusted.example.com` — specific allowed embedders.
This is the current standard, supports multiple origins, and is enforced by all modern browsers.

**2. `X-Frame-Options` (legacy, still widely set).** Older header: `DENY` (never framed) or `SAMEORIGIN` (only same-origin). It doesn't support arbitrary allowlists (the old `ALLOW-FROM` is unreliable), so use it as a fallback alongside CSP `frame-ancestors`.

**3. Framebusting JavaScript (last resort).** Client-side script that breaks out of frames (`if (top !== self) top.location = self.location`). Weaker — can be defeated by sandboxed iframes and only runs if JS loads — so treat it as belt-and-suspenders, not the primary control.

## Decide What May Be Framed

Default to **not framable** for anything with a sensitive action or that reflects auth state. Only relax it for content you *intend* to be embeddable (public widgets, oEmbed content), and then scope `frame-ancestors` to the specific partners. "It's just a normal page" is exactly what attackers frame.

## Design Guidance (for understanding/using)

- **Set `Content-Security-Policy: frame-ancestors 'none'` (or `'self'`)** on app pages — especially anything performing actions.
- **Also send `X-Frame-Options: DENY`/`SAMEORIGIN`** for older-client fallback.
- **Explicitly allowlist** only the pages that are *meant* to be embedded, scoped to trusted origins.
- **Don't rely on framebusting JS alone** — headers are the real control.
- **Protect one-click actions** (authorize, delete, purchase) — pair with confirmation steps for high-value operations.

## Pitfalls (in understanding/using)

- Assuming **CSRF tokens / auth** stop clickjacking → they don't; the click is genuine. Use frame headers.
- Setting frame protection only on the login page → **every** page with a sensitive action needs it.
- Relying on **framebusting JS** → defeated by `sandbox` iframes; use `frame-ancestors`.
- Using only the legacy **`ALLOW-FROM`** → poorly supported; use CSP `frame-ancestors` for allowlisting.
- Leaving pages framable "for convenience" → invisible-overlay UI redressing on your real controls.
