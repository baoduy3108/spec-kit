---
name: xss-and-output-encoding
description: How attacker-controlled data becomes executable script in a victim's browser — Cross-Site Scripting (XSS) — and the defense: context-aware output encoding, not input filtering. Covers stored/reflected/DOM XSS, why the browser can't tell your script from injected script, why escaping depends on context (HTML/attribute/JS/URL), CSP as defense-in-depth, and safe framework rendering. Use to prevent XSS in any web UI.
category: security
keywords_vi: chèn mã kịch bản liên trang xss dữ liệu kẻ tấn công thành script chạy trong trình duyệt nạn nhân, mã hoá đầu ra output encoding theo ngữ cảnh không phải lọc đầu vào, xss lưu trữ phản chiếu và dom, trình duyệt không phân biệt script của bạn với script chèn vào, escape khác nhau theo ngữ cảnh html attribute js url, csp phòng thủ nhiều lớp
---

# XSS & Output Encoding

**Cross-Site Scripting (XSS)** happens when attacker-controlled data is placed into a web page such that the browser executes it as **script**. If an attacker can run JavaScript in your users' browsers, they can steal session cookies/tokens, perform actions as the user, keylog, rewrite the page, or pivot to full account takeover. The root cause is always the same: **data is treated as code**. The fix is **context-aware output encoding** — and understanding why *input filtering* is the wrong mental model (see prompt-injection-defense, csrf-and-same-site-defenses, how-content-security-policy-works).

## The Three Types

- **Stored (persistent)** — the malicious script is **saved** (a comment, profile bio, product review) and served to everyone who views it. Most dangerous (mass impact).
- **Reflected** — the script comes from the **request** (a search term echoed into the results page) and executes for whoever clicks the crafted link.
- **DOM-based** — the vulnerability is in **client-side JS** that takes untrusted input (URL fragment, `location`, `postMessage`) and writes it into the DOM unsafely (`innerHTML`, `eval`), never touching the server.

## The Core Problem: Browsers Can't Tell Your Script from Theirs

When you concatenate user input into HTML, the browser parses the result and runs **any** `<script>`, `onerror=`, `javascript:` it finds — it has no idea which parts you intended and which the attacker injected. So you must ensure untrusted data is rendered as **inert text/values**, never as markup or code.

## The Fix: Encode on OUTPUT, by CONTEXT

The correct defense is **output encoding at the point of insertion**, and crucially it depends on **where** the data goes — the same string is safe in one context and dangerous in another:
- **HTML body** → HTML-entity-encode (`<`→`&lt;`, `&`→`&amp;`).
- **HTML attribute** → attribute-encode and always quote attributes.
- **JavaScript context** → JS-string-escape (or better: don't put data in JS; pass via `data-` attributes / JSON in a safe channel).
- **URL context** → URL-encode, and validate the scheme (block `javascript:`).
- **CSS context** → CSS-escape.
Putting HTML-encoded data into a `<script>` block is still XSS — **context is everything**.

## Why Input Filtering Is the Wrong Model

"Strip `<script>` on input" fails: there are countless vectors (`<img onerror>`, `<svg>`, event handlers, encoded payloads, `javascript:` URLs), input is used in many contexts you can't predict at input time, and legitimate content may contain `<`. **Validate/sanitize inputs for correctness, but rely on output encoding for XSS safety.** When you must accept **rich HTML** (a WYSIWYG editor), use a vetted **HTML sanitizer** (DOMPurify) with an allowlist — never a hand-rolled regex.

## Defense in Depth

- **Modern frameworks auto-escape** (React `{}`, Angular, Vue, template engines) — this is why they're safe *by default*. Danger returns when you use escape hatches: `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `eval`, `bypassSecurityTrust*`.
- **Content Security Policy (CSP)** — a strong second layer: restrict which scripts can run (nonce/hash-based, no inline), so even an injected script is blocked from executing.
- **HttpOnly cookies** — keep session cookies out of `document.cookie`, limiting what stolen-via-XSS can grab (not a fix, a mitigation).

## Design Guidance (for understanding/using)

- **Encode on output, per context** — HTML/attribute/JS/URL/CSS each need their own escaping.
- **Trust framework auto-escaping; audit every escape hatch** (`dangerouslySetInnerHTML`, `innerHTML`, `v-html`, `eval`).
- **Sanitize rich HTML with a vetted library** (DOMPurify + allowlist), never regex.
- **Add CSP** (nonce/hash, disallow inline) as defense-in-depth so injected scripts can't run.
- **Set HttpOnly + Secure + SameSite** on session cookies to limit XSS blast radius.

## Pitfalls (in understanding/using)

- **Input filtering** as the primary defense → bypassable; encode on **output** instead.
- Encoding for the **wrong context** (HTML-encoding data placed inside a `<script>`/URL) → still XSS.
- Using `innerHTML`/`dangerouslySetInnerHTML`/`v-html` with untrusted data → direct DOM XSS.
- Forgetting **DOM XSS** because "the server escapes" → client-side sinks bypass the server entirely.
- Treating CSP as a substitute for encoding → CSP is defense-in-depth; correct encoding is the primary fix.
