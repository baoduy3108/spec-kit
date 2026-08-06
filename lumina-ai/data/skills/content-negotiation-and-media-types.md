---
name: content-negotiation-and-media-types
description: How one HTTP endpoint serves the right format/language/encoding to each client — content negotiation via Accept headers and media types (MIME). Covers the Accept/Accept-Language/Accept-Encoding request headers, quality values (q-weights), the server's Content-Type/Vary response, media-type versioning, and why Vary matters for caching. Use to understand serving JSON vs XML, API versioning via media types, and negotiation pitfalls.
category: systems-internals
keywords_vi: thương lượng nội dung content negotiation phục vụ đúng định dạng ngôn ngữ mã hoá, header accept và accept-language accept-encoding, kiểu media mime type content-type phản hồi, trọng số chất lượng q-value ưu tiên, header vary quan trọng cho cache, phiên bản api qua media type
---

# Content Negotiation & Media Types

One URL, many representations: the same resource might be served as JSON or XML, in English or Vietnamese, gzip-compressed or plain, as v1 or v2 of an API. **Content negotiation** is the HTTP mechanism that lets a **client state its preferences** and the **server pick the best match** — so a single endpoint serves everyone appropriately (see api-and-interface-design, how-http-caching-works, how-json-serialization-works).

## Media Types (MIME)

Every representation has a **media type** (MIME type): `application/json`, `text/html`, `image/png`, `application/pdf`. It tells the recipient **how to interpret the bytes**. The server declares what it sent via the **`Content-Type`** response header; a client declares what it can accept via **`Accept`**. Getting these right is fundamental — a JSON body labeled `text/html` confuses clients and can even be a security issue (hence `X-Content-Type-Options: nosniff`).

## The Negotiation Headers

The client sends preferences; the server chooses:
- **`Accept`** — acceptable media types (`Accept: application/json, text/html`).
- **`Accept-Language`** — preferred languages (`en-US, vi`).
- **`Accept-Encoding`** — supported compressions (`gzip, br`).
- **`Accept-Charset`** — character sets (largely legacy; UTF-8 now).

## Quality Values (q-weights)

Preferences are **ranked** with `q` values from 0 to 1 (default 1):
```
Accept: text/html;q=0.9, application/json;q=1.0, */*;q=0.1
Accept-Language: vi;q=1.0, en;q=0.8
```
This says "prefer JSON, then HTML, anything else as last resort" and "Vietnamese preferred, English acceptable." The server scores its available representations against these weights and serves the **best available** match — or returns **`406 Not Acceptable`** if it can satisfy none (many servers instead fall back to a default).

## The Response Side: Content-Type and Vary

The server responds with:
- **`Content-Type`** — the media type (and charset) it actually chose.
- **`Content-Language` / `Content-Encoding`** — chosen language/compression.
- **`Vary`** — *critical for caching*: it tells caches which **request headers** the response depended on. If a response varies by `Accept-Language`, you **must** send `Vary: Accept-Language`, or a cache will serve the Vietnamese version to an English client (or vice versa). **Forgetting `Vary` is the classic content-negotiation caching bug.**

## Media-Type API Versioning

Content negotiation also enables **versioning without changing URLs**: clients request a **custom/parametrized media type** like `Accept: application/vnd.myapi.v2+json`, and the server serves that version. This keeps URLs stable (`/users/1`) while letting representations evolve — an alternative to `/v2/` path versioning, favored in strict REST/HATEOAS designs.

## Design Guidance (for understanding/using)

- **Always set an accurate `Content-Type`** — clients and caches rely on it; label JSON as `application/json`.
- **Send `Vary` for every header you negotiate on** (`Accept`, `Accept-Language`, `Accept-Encoding`) — or caches serve the wrong variant.
- **Honor q-values and provide a sensible default** — return the best match; don't hard-406 if a reasonable default exists.
- **Consider media-type versioning** (`application/vnd.x.v2+json`) to evolve APIs without new URLs.
- **Add `nosniff`** and correct types to avoid MIME-sniffing security issues.

## Pitfalls (in understanding/using)

- Negotiating on a header but omitting **`Vary`** → caches serve the wrong language/format/encoding to the wrong client.
- Mislabeling `Content-Type` (JSON as `text/html`, etc.) → client parse errors and MIME-sniffing risks.
- Ignoring **q-values** and serving a fixed format → clients that can't handle it break.
- Returning **406** when a reasonable default representation exists → poor client experience.
- Assuming all caches respect negotiation automatically → they only do if `Vary` is correct.
