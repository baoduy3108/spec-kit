---
name: fastify-best-practices
description: Building Fastify Node.js backend servers and REST APIs in TypeScript or JavaScript — routes, plugins/encapsulation, JSON Schema validation, error handling, the request lifecycle (hooks, serialization, Pino logging), authentication, CORS/security headers, testing with inject(), performance, and production deployment. Use when building, configuring, or debugging a Fastify app.
category: engineering
keywords_vi: fastify, fastify server, rest api node, fastify plugin, fastify schema validation, backend node framework, fastify hook lifecycle
---

# Fastify Best Practices

## Quick Start

```ts
import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get('/health', async (request, reply) => {
  return { status: 'ok' }
})

await app.listen({ port: 3000, host: '0.0.0.0' })
```

## Core Principles

- **Encapsulation** — Fastify's plugin system provides automatic encapsulation; use plugins to scope decorators, hooks, and dependencies. A plugin registered with `fastify-plugin` breaks encapsulation deliberately to share across the app.
- **Schema-first** — define JSON Schemas for both request validation AND response serialization. Response schemas make serialization dramatically faster (fast-json-stringify) and prevent leaking fields.
- **Performance** — Fastify is optimized for speed; use its built-in features correctly rather than reaching for Express-style middleware.
- **Async/await** — all handlers and hooks support async functions; return the payload or use `reply.send()`, never both.
- **Minimal dependencies** — prefer built-in features and official plugins.

## Recommended Reading Order by Scenario

- **New to Fastify:** plugins → routes → schemas
- **Adding authentication:** plugins → hooks → authentication
- **Improving performance:** schemas → serialization → performance
- **Setting up testing:** routes → testing (use `app.inject()` for fast in-process HTTP tests, no real socket)
- **Going to production:** logging (Pino) → configuration → deployment

## Request Lifecycle

Requests flow through hooks: `onRequest → preParsing → preValidation → preHandler → handler → preSerialization → onSend → onResponse`. Use hooks for cross-cutting concerns (auth in `preHandler`, metrics in `onResponse`) rather than wrapping handlers.

## Key Patterns

- **Validation & serialization** — attach `schema: { body, querystring, params, response }` to each route.
- **Error handling** — set a `setErrorHandler`; return typed errors with proper status codes; never leak stack traces in production responses.
- **Auth** — decorate the request in a `preHandler` hook; encapsulate protected routes in a plugin.
- **CORS/security** — use `@fastify/cors` and `@fastify/helmet`; configure explicitly, don't allow `*` in production with credentials.
- **Testing** — `app.inject({ method, url, payload })` returns the response without binding a port.
