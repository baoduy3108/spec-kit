---
name: how-http-works
description: How HTTP works — the request/response model, methods (GET/POST/PUT/DELETE), status codes (2xx/3xx/4xx/5xx), headers, statelessness and cookies, and the evolution from HTTP/1.1 to HTTP/2 (multiplexing) and HTTP/3 (QUIC). Use to understand web requests, REST APIs, status codes, and HTTP behavior.
category: engineering
keywords_vi: http hoạt động thế nào, giao thức http, request response, method get post, status code 404 500, header http, http/2 http/3, hiểu http
---

# How HTTP Works

HTTP is the request/response protocol of the web: a client sends a request, the server sends back a response. It's simple, text-based (until HTTP/2), and stateless.

## Request & Response

A **request** has a **method**, a path/URL, **headers**, and an optional **body**. A **response** has a **status code**, headers, and a body. Each is independent — the server doesn't remember previous requests (see statelessness).

## Methods (verbs)

- **GET** — read a resource (no body, idempotent, cacheable).
- **POST** — create/submit (has a body, not idempotent).
- **PUT** — replace a resource (idempotent).
- **PATCH** — partial update.
- **DELETE** — remove (idempotent).
Using the right method matters for caching, retries (idempotency), and REST semantics.

## Status Codes (the response's summary)

- **2xx success** — 200 OK, 201 Created, 204 No Content.
- **3xx redirect** — 301 permanent, 302/307 temporary, 304 Not Modified (use your cache).
- **4xx client error** — 400 Bad Request, 401 Unauthorized (not logged in), 403 Forbidden (logged in, not allowed), 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Too Many Requests.
- **5xx server error** — 500 Internal, 502 Bad Gateway, 503 Service Unavailable, 504 Timeout.
Knowing these lets you read what went wrong instantly (401 vs 403 is a common confusion — auth vs permission).

## Headers

Metadata for the message: `Content-Type` (what the body is), `Authorization` (credentials), `Accept` (what the client wants), `Cache-Control` (caching), `Cookie`/`Set-Cookie` (state), `User-Agent`, CORS headers, etc. Much of HTTP's behavior (caching, auth, content negotiation) is driven by headers.

## Statelessness & Cookies

Each request is **independent** — HTTP itself keeps no session. State (who you are) is carried by **cookies** or tokens sent with each request (see how-cookies-and-sessions-work). This statelessness is what lets any server handle any request (horizontal scaling).

## Evolution

- **HTTP/1.1** — text-based, one request at a time per connection (with keep-alive); **head-of-line blocking**.
- **HTTP/2** — binary, **multiplexes** many requests over one connection, header compression — much faster for many resources.
- **HTTP/3** — runs over **QUIC (on UDP)** to eliminate TCP's head-of-line blocking and speed up connection setup.

## Pitfalls

- Confusing **401 (not authenticated)** with **403 (authenticated, not authorized)**.
- Using **GET with side effects** (should be POST) — breaks caching/retries and is unsafe.
- Ignoring **idempotency** on retries (POST isn't idempotent).
- Forgetting HTTP is **stateless** — state must be carried explicitly (cookie/token).
- Not setting/reading `Content-Type` correctly.
