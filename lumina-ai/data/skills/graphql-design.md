---
name: graphql-design
description: Design and operate GraphQL APIs well — schema-first modeling, nullability, pagination (connections/cursors), the N+1 problem and DataLoader batching, error handling, avoiding over-fetching, query cost/depth limiting, and versioning by evolution. Use when designing a GraphQL schema or fixing GraphQL performance/design issues.
category: engineering
keywords_vi: graphql, thiết kế schema graphql, n+1 dataloader, phân trang cursor connection, query graphql, api graphql, resolver
---

# GraphQL Design

GraphQL lets clients ask for exactly the data they need in one request. The power (arbitrary client queries) is also the main operational risk (unbounded, expensive queries).

## Schema Design

- **Schema-first, domain-driven** — model types around the domain, not the database tables. The schema is the contract.
- **Nullability is meaningful** — mark a field non-null (`!`) only if it truly can never be null; a non-null field that errors nulls out its whole parent. Be deliberate.
- **Design types for the client's needs**, exposing relationships as fields (`user.posts`), not foreign keys.
- **Mutations** — one clear mutation per action with an input type and a payload type (returning the affected object + errors), not generic CRUD.

## The N+1 Problem (the #1 GraphQL trap)

A query for 100 users each resolving `.posts` naively fires 1 + 100 queries. Fix with **DataLoader**-style batching + caching: collect the ids requested within a tick, fetch them in one batched query, and cache per-request. Every resolver that loads a related entity by id should go through a loader. This is essential, not optional, for any non-trivial GraphQL server.

## Pagination

Prefer **cursor-based connections** (the Relay pattern: `edges { node cursor } pageInfo { hasNextPage endCursor }`) over offset — stable under inserts and scalable. Return a cursor, not a page number.

## Guarding the Endpoint

Because clients write the queries, you must bound cost server-side:
- **Depth limiting** — reject deeply nested queries (a malicious `user.friends.friends…` bomb).
- **Query cost/complexity analysis** — assign costs to fields and cap total per request.
- **Pagination limits** — enforce a max page size; never allow "give me all".
- **Timeouts** and persisted queries (allowlist known queries in production) for extra safety.

## Errors & Evolution

- Return partial data + a structured `errors` array; distinguish expected domain errors (put them in the mutation payload) from unexpected ones.
- **Evolve, don't version** — GraphQL avoids `/v2` by adding new fields/types and **deprecating** old ones (`@deprecated(reason:)`); remove only after clients migrate. Never change a field's type/meaning in place.
- Avoid over-exposing: don't ship internal fields; the schema is a security surface.
