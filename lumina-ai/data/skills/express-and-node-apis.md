---
name: express-and-node-apis
description: Build HTTP APIs in Node.js (Express/Fastify) well — routing, middleware, request validation, error handling, async patterns, structured project layout, and production concerns (graceful shutdown, security middleware, logging). Use when building or reviewing a Node.js backend/API.
category: engineering
keywords_vi: node.js api, express fastify, middleware, xây dựng api node, validate request, xử lý lỗi express, backend node, graceful shutdown
---

# Express / Node.js APIs

Node.js runs JS on the server on a single-threaded event loop (see how-async-works). Express (minimal, ubiquitous) and Fastify (faster, schema-first) are the common HTTP frameworks. The patterns are similar.

## Routing & Middleware

- **Routes** map method+path to handlers (`app.get('/users/:id', handler)`).
- **Middleware** are functions `(req, res, next)` that run in order — parsing bodies, auth, logging, error handling. This is Express's core abstraction: a pipeline. Order matters (auth before the protected route; error handler last).
- Group routes with `Router()` and keep handlers thin — delegate logic to a service layer.

## Validation at the Boundary

**Validate and type every input** (body, query, params) at the edge with a schema library (zod, Joi, Fastify's JSON schema). Never trust client input — it's the #1 source of bugs and vulnerabilities (see security-and-hardening, threat-modeling). Reject early with a 400 and a clear message.

## Async & Error Handling

- Handlers are usually **`async`** — `await` your DB/HTTP calls.
- **Catch async errors** — in Express 4, an unhandled promise rejection in a handler won't reach your error middleware unless you catch it (wrap with a helper or use `express-async-errors`; Express 5 / Fastify handle this). Centralize error handling in one error-middleware that maps errors → status codes + safe messages (don't leak stack traces to clients).
- Distinguish **operational errors** (bad input, not found — expected, handle gracefully) from **programmer errors** (bugs — let them crash/restart) (see error-handling-patterns).

## Structure

Layer it: **routes/controllers** (HTTP concerns) → **services** (business logic) → **data access** (DB). Keep HTTP out of your business logic so it's testable and reusable. Config from environment (see twelve-factor-app). One responsibility per module.

## Production Concerns

- **Security middleware** — `helmet` (security headers, see security-headers), CORS configured deliberately (not `*` with credentials), rate limiting (see rate-limiting), body-size limits.
- **Structured logging** (pino/winston) with request IDs (see logging-and-observability); never `console.log` in production.
- **Graceful shutdown** — on SIGTERM, stop accepting new connections, finish in-flight requests, close DB pools, then exit (critical for zero-downtime deploys).
- **Don't block the event loop** — offload CPU-heavy work (see how-async-works); one slow synchronous loop stalls all requests.

## Pitfalls

- **Trusting input** — always validate.
- **Unhandled async errors** crashing the process or hanging requests.
- **Leaking error details / stack traces** to clients.
- **Blocking the event loop** with sync CPU work → all requests stall.
- **CORS `*` with credentials**, missing security headers, no rate limiting.
- Business logic tangled into route handlers (untestable).
- No graceful shutdown → dropped requests on deploy.
