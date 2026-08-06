---
name: how-graphql-works
description: How GraphQL works as a protocol — a single endpoint with a typed schema, clients requesting exactly the fields they need, resolvers fetching each field, queries/mutations/subscriptions, and the N+1 problem with dataloaders. Use to understand how GraphQL works under the hood, resolvers, the N+1 problem, or GraphQL vs REST at the protocol level.
category: engineering
keywords_vi: graphql hoạt động thế nào, single endpoint, resolver, n+1, dataloader, client chọn field cần, query mutation subscription, graphql vs rest
---

# How GraphQL Works

GraphQL is a query language and runtime for APIs where the **client specifies exactly what data it wants**, and the server returns precisely that — no more, no less. Understanding its machinery clarifies its strengths (flexible fetching) and its main gotcha (the N+1 problem). For API design guidance see graphql-design; this covers the mechanics.

## One Endpoint, a Typed Schema

Unlike REST's many endpoints, GraphQL exposes a **single endpoint** and a strongly-typed **schema** describing all available data — types, their fields, and how they relate:
```graphql
type User { id: ID!  name: String!  posts: [Post!]! }
type Post { id: ID!  title: String! }
type Query { user(id: ID!): User }
```
The schema is the contract; clients and tools introspect it (self-documenting, enabling great tooling/autocomplete).

## Clients Ask for Exactly What They Need

A client sends a **query** shaped like the data it wants:
```graphql
{ user(id: "1") { name  posts { title } } }
```
The server returns matching JSON with just those fields. This solves REST's **over-fetching** (getting fields you don't need) and **under-fetching** (needing multiple round trips to assemble a view) — one request fetches exactly the shape the UI needs, across related objects. Great for complex/mobile UIs with varied data needs.

## Resolvers (how fields get filled)

For each field in a query, the server runs a **resolver** — a function that knows how to fetch that field's value (from a database, another service, etc.). GraphQL walks the query tree, calling resolvers to build the response. Fields can resolve from **different sources**, so GraphQL naturally aggregates multiple backends behind one graph.

## Operations: Query, Mutation, Subscription

- **Query** — read data.
- **Mutation** — write/change data (create/update/delete).
- **Subscription** — real-time updates pushed to the client (often over WebSockets — see websockets-and-realtime).

## The N+1 Problem (the big gotcha)

Because each field resolves independently, a query like "10 users, each with their posts" can trigger **1 query for users + 1 query per user for posts = N+1 database queries** — a performance killer. The standard fix is **batching with a DataLoader**: collect all the individual `posts(userId)` requests within a tick and issue **one** batched query, caching results. Anyone building a GraphQL server must handle N+1, or performance collapses under nesting.

## GraphQL vs REST (mechanics)

- **GraphQL** — one endpoint, client-shaped responses, strong schema/introspection, great for diverse/nested data needs; but caching is harder (POST to one URL vs REST's URL-based HTTP caching — see how-http-caching-works), and you must guard against expensive/deep queries and N+1.
- **REST** — many resource endpoints, simple HTTP caching, ubiquitous, but over/under-fetching.
Neither is strictly better; match to needs.

## Pitfalls (in understanding/using)

- **N+1 queries** — the #1 GraphQL performance trap; use DataLoader/batching.
- **Unbounded/deep queries** — a malicious or careless deeply-nested query can be very expensive; enforce depth/complexity limits, pagination, timeouts.
- Losing **HTTP caching** — a single POST endpoint bypasses URL-based caches; use persisted queries/response caching.
- Exposing too much in the schema (security) — authorize per field/resolver, don't rely on the client's query.
- Treating GraphQL as a database query language — resolvers still enforce access control and shape data.
- Over-adopting GraphQL for simple APIs where REST is simpler.
