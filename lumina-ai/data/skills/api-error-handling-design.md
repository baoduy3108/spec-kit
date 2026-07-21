---
name: api-error-handling-design
description: How to design API errors — correct HTTP status codes, a consistent machine-readable error body (code, message, details) like Problem Details (RFC 7807), actionable messages, and not leaking internals. Use to design API error responses, structure error bodies, choose error status codes, or return helpful API errors.
category: engineering
keywords_vi: thiết kế xử lý lỗi api, status code http đúng, thân lỗi nhất quán máy đọc được code message details, problem details rfc 7807, thông báo hành động được, không lộ nội bộ
---

# API Error Handling Design

How an API reports **errors** is as important as how it reports success — good error design lets client developers **diagnose and handle failures** quickly, while bad error design causes confusion, wasted debugging, and brittle clients. The essentials: the **right status code**, a **consistent machine-readable body**, **actionable** messages, and **not leaking internals** (see rest-api-design-principles, api-and-interface-design).

## Use the Right Status Code (don't hide errors in 200)

The HTTP **status code** is the first, machine-readable signal of what happened. Return the correct class:
- **4xx** — the **client's** fault (fix the request): 400 bad request, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 422 validation error, 429 rate limited.
- **5xx** — the **server's** fault (retry later / not the client's problem): 500, 503.
The cardinal sin: returning **200 OK with an error inside the body**. It breaks every client and tool that relies on status codes, forces clients to parse bodies to detect failure, and hides errors from monitoring. **The status code must reflect the outcome.**

## Consistent, Machine-Readable Error Bodies

Beyond the status code, return a **structured, consistent** error body so clients can handle errors **programmatically** — the **same shape for every error** across the API. A good error body includes:
- **A stable error `code`** — a machine-readable identifier (`"insufficient_funds"`, `"invalid_email"`) clients can branch on. Codes are **stable**; human messages may change.
- **A human-readable `message`** — for developers/logs (not necessarily end-user-facing).
- **Details** — field-level validation errors (which field, what's wrong), a request/trace ID, links to docs.
The **Problem Details** standard (**RFC 7807**, `application/problem+json`, with `type`/`title`/`status`/`detail`/`instance`) is a good ready-made format. The point: **one predictable structure**, with a **stable code** clients can rely on rather than string-matching messages.

## Actionable, Safe Messages

- **Actionable** — say **what's wrong and how to fix it** ("email must be a valid address", "amount exceeds balance"), not vague "an error occurred" or "invalid input".
- **Field-level detail** for validation — which fields failed and why, so a form can highlight them.
- **Don't leak internals** — never expose stack traces, SQL, internal paths, framework details, or secrets in error responses (a security risk and confusing — see security-and-hardening). Log the internal detail server-side; return a safe, generic message + a **trace/request ID** the client can quote to support.
- **Consistent tone/format** across all errors.

## Design Guidance

- **Status code reflects outcome** — correct 4xx/5xx; never 200 for errors.
- **One consistent error schema** everywhere (consider RFC 7807 Problem Details).
- **Stable machine-readable `code`** clients branch on; human message may vary.
- **Actionable messages** + **field-level** validation detail.
- **Include a request/trace ID** to correlate client reports with server logs.
- **Never leak internals** (stack traces, SQL, secrets) — log them server-side instead.
- **Distinguish 4xx vs 5xx** correctly so clients know whether to retry (5xx/429) or fix the request (4xx).
- **Document** your error codes.

## Pitfalls (in understanding/using)

- **200 OK with an error body** → breaks clients/tools/monitoring; use real status codes.
- **Inconsistent error shapes** across endpoints → clients can't handle errors uniformly.
- **Vague** messages ("error", "invalid") → developers can't tell what to fix.
- **Leaking** stack traces/SQL/internal details → security risk and noise; return safe messages + trace ID.
- Relying on clients to **string-match messages** (no stable code) → breaks when you reword a message.
- Wrong **4xx vs 5xx** → clients retry unretryable errors or give up on transient ones.
- No **trace/request ID** → impossible to correlate a client's error report with server logs.
