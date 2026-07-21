---
name: rest-api-design-principles
description: REST API design principles — modeling resources with nouns, using HTTP methods (GET/POST/PUT/PATCH/DELETE) and status codes correctly, statelessness, consistent naming, and leveraging HTTP semantics instead of reinventing them. Use to design a REST API, choose HTTP methods/status codes, model resources, or follow RESTful conventions.
category: engineering
keywords_vi: nguyên tắc thiết kế rest api, mô hình hóa resource bằng danh từ, dùng http method get post put patch delete và status code đúng, không trạng thái stateless, đặt tên nhất quán, tận dụng ngữ nghĩa http
---

# REST API Design Principles

REST is an architectural style for web APIs that **leverages HTTP's built-in semantics** — resources, methods, and status codes — instead of inventing your own. A well-designed REST API is **predictable and self-consistent**: developers can guess how it works because it follows conventions. Getting the core principles right (resources, methods, status codes, statelessness) is what makes an API pleasant rather than confusing (see api-and-interface-design, api-error-handling-design).

## Resources: Model Nouns, Not Actions

The central REST idea: your API exposes **resources** (things/nouns), identified by URLs, that you act on with **HTTP methods** (verbs). Design the URLs around **nouns**, not actions:
- **Good:** `/users`, `/users/123`, `/users/123/orders` — resources and sub-resources.
- **Bad:** `/getUser`, `/createUserAction`, `/deleteOrderNow` — verbs in the URL (that's RPC-style, not REST; the HTTP method should be the verb).
Use **plural nouns** for collections (`/users`), an ID for a specific item (`/users/123`), and nesting for relationships (`/users/123/orders`). Keep naming **consistent** (casing, pluralization) across the whole API.

## HTTP Methods: The Verbs

Use the standard methods for their defined meaning:
- **GET** — retrieve a resource. **Safe** (no side effects) and **idempotent**. Never mutate on GET.
- **POST** — create a resource (or a non-idempotent action). **Not** idempotent.
- **PUT** — replace a resource entirely. **Idempotent** (same request twice = same result).
- **PATCH** — partially update a resource.
- **DELETE** — remove a resource. Idempotent.
Respecting **safe** (GET) and **idempotent** (GET/PUT/DELETE) semantics matters: caches, proxies, and clients rely on them (e.g. it's safe to retry idempotent methods — see idempotency).

## Status Codes: Communicate Outcomes

Return the **right HTTP status code** so clients know what happened without parsing the body:
- **2xx success** — 200 OK, 201 Created (with a `Location`), 204 No Content.
- **3xx redirection** — 301/304 (caching).
- **4xx client error** — 400 (bad request), 401 (unauthenticated), 403 (forbidden), 404 (not found), 409 (conflict), 422 (validation), 429 (rate limited).
- **5xx server error** — 500, 503.
Don't return **200 with an error inside** — that breaks tooling and clients that rely on status codes. Use codes correctly (see api-error-handling-design).

## Statelessness

Each request must contain **everything needed** to process it (auth, parameters) — the server keeps **no client session state** between requests. This makes the API **scalable** (any server can handle any request — see how-load-balancers-work) and **reliable**. State lives in the client (tokens) or in resources, not in server memory between calls.

## Other Conventions

- **Filtering/sorting/pagination** via query params (see api-pagination-and-filtering).
- **Versioning** the API (see api-versioning-strategies).
- **Consistent** response shapes and error format across endpoints.
- **Content negotiation** (JSON by default via `Accept`/`Content-Type`).
- **Use HTTP features** — caching headers, ETags, `Location`, `Retry-After` — rather than reinventing them.

## Pitfalls (in understanding/using)

- **Verbs in URLs** (`/getUser`, `/doThing`) → RPC-style, not REST; the method is the verb.
- **Wrong methods** — mutating on **GET**, or using POST for everything (losing idempotency/caching benefits).
- **200 for errors** → clients/tools can't detect failures; use correct 4xx/5xx codes.
- **Inconsistent naming** (mixed casing/pluralization/shapes) → an unpredictable, hard-to-learn API.
- **Stateful** servers (session in memory) → breaks scaling and reliability; keep it stateless.
- Ignoring **HTTP semantics** (caching, status codes, idempotency) and reinventing them poorly.
- Deeply **nested** URLs beyond ~2 levels → unwieldy; flatten where sensible.
