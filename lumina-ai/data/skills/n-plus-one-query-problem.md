---
name: n-plus-one-query-problem
description: What the N+1 query problem is and how to fix it — how ORMs/lazy loading silently fire one query per item in a loop, why it destroys performance, and the fixes (eager loading/joins, batching/DataLoader, IN queries). Use to understand or diagnose N+1 queries, slow ORM code, why a page makes hundreds of queries, or eager vs lazy loading.
category: engineering
keywords_vi: n+1 query, vấn đề n cộng 1 truy vấn, orm lazy loading, một query mỗi phần tử trong vòng lặp, eager loading, eager join, dataloader batching, orm chậm nhiều query
---

# The N+1 Query Problem

The N+1 query problem is one of the most common performance killers in database-backed apps — code that looks innocent but silently fires **hundreds of queries** where a couple would do. It's especially insidious with ORMs, because the queries are hidden behind object access.

## What It Is

You fetch a list of N items with **1** query, then loop over them and access a related object on each — which lazily fires **1 query per item**. Total: **1 + N** queries.
```python
posts = Post.objects.all()          # 1 query: get 100 posts
for post in posts:
    print(post.author.name)          # 100 more queries: one per post's author!
```
That's 101 queries to render 100 posts. At scale (a list page, an API returning nested data) this means hundreds of round trips, each with latency — turning a fast page into a slow one. The queries are cheap individually but the **round-trip overhead** and sheer count destroy performance (see how-databases-work). This is exactly the trap in GraphQL resolvers too (see how-graphql-works).

## Why ORMs Hide It

**Lazy loading** — the ORM defers loading a relationship until you access it — is convenient but makes each `post.author` a silent database query. The code reads like plain object access, so the N+1 is invisible until you look at query logs or profiling. This convenience-vs-visibility trade is why N+1 is so common.

## The Fixes

- **Eager loading (the main fix)** — tell the ORM to fetch the related data **up front** in one (or a few) queries: `select_related`/`prefetch_related` (Django), `includes`/`eager_load` (Rails), `JOIN` or `.include`/`joinedload` (SQLAlchemy). Now it's **2 queries** (or 1 with a join) instead of N+1, regardless of N.
- **Batch with an `IN` query** — collect the IDs and fetch all related rows in one `WHERE id IN (...)` query, then map them in memory.
- **DataLoader (batching + caching)** — in GraphQL/async contexts, a DataLoader coalesces the individual per-item loads within a tick into **one batched query** and caches results (see how-graphql-works).
- **Denormalize / cache** — for read-heavy cases, precompute or cache the joined data.

## Diagnosing It

- **Watch the query count** — log/count queries per request; a request making N-proportional queries is the smell. Tools (Django Debug Toolbar, Bullet, ORM query logs, APM traces — see distributed-tracing) flag N+1s.
- **Look for queries in loops** — the classic pattern.

## Pitfalls (in understanding/using)

- Relying on **lazy loading** in loops without realizing each access hits the DB — the default N+1 trap.
- **Not looking at query counts** — the code looks fine; only the query log/profiler reveals it.
- **Over-eager loading** — the opposite mistake: fetching huge related datasets you don't need (or loading everything with deep joins) can be its own performance problem. Load what you need.
- Fixing N+1 with a giant **cartesian JOIN** that duplicates rows — sometimes two queries (prefetch) beat one bloated join.
- Assuming an ORM "just handles it" — you must explicitly eager-load relationships.
- Reintroducing N+1 when adding a new nested field (especially in GraphQL) — guard with DataLoader/tests.
