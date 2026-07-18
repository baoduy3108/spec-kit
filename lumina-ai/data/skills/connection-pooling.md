---
name: connection-pooling
description: How connection pooling works — reusing a pool of open database (or other) connections instead of opening one per request, why connections are expensive, pool sizing, and pitfalls (exhaustion, leaks, serverless). Use to understand connection pools, database connection limits, "too many connections" errors, or tuning pool size.
category: engineering
keywords_vi: connection pooling, gộp kết nối, tái sử dụng kết nối database, kết nối tốn kém, kích thước pool, cạn kiệt connection leak, too many connections, serverless
---

# Connection Pooling

A connection pool keeps a set of **open, reusable connections** (usually to a database) that requests borrow and return, instead of opening a fresh connection every time. It's essential for performance and for not overwhelming the database — a small detail that causes big production incidents when misconfigured.

## Why Connections Are Expensive

Opening a database connection is **costly**: a TCP handshake (see how-tcp-works), often a TLS handshake (see how-https-tls-works), authentication, and server-side session setup — tens of milliseconds and real memory on the DB server. Doing this per request (thousands/second) would add huge latency and crush the database, which has a **hard limit** on concurrent connections (e.g. Postgres defaults to ~100). Each connection also consumes server memory. So you can't just open one per request.

## How Pooling Works

The pool maintains N already-open connections. When a request needs the database:
1. It **borrows** an idle connection from the pool.
2. Uses it for its queries.
3. **Returns** it to the pool (not closing it) for the next request to reuse.
If all connections are busy, the request **waits** (up to a timeout) for one to free up. This amortizes the expensive setup across many requests and caps the total connections hitting the DB. Every serious DB library/framework has a pooler (HikariCP, pgbouncer, SQLAlchemy pool, etc.).

## Sizing the Pool (counterintuitive)

Bigger is **not** better. The pool size caps concurrency against the DB, and there's an optimal point:
- **Too small** → requests queue waiting for a connection (latency, timeouts) even when the DB is idle.
- **Too large** → too many concurrent connections overwhelm the DB (context switching, memory, lock contention), *reducing* total throughput, and can exceed the DB's connection limit.
The right size is often surprisingly **small** — bounded by the database's cores/capacity, not your request rate (a classic finding: a pool of ~10–20 can outperform 100). Size the pool to what the DB can *usefully* do concurrently, not to your peak request count. Total connections across **all** app instances must stay under the DB's limit.

## Pitfalls (in understanding/using)

- **Pool exhaustion** — all connections busy, requests time out. Caused by too-small a pool, slow queries holding connections, or **connection leaks**.
- **Connection leaks** — borrowing a connection and never returning it (missing `finally`/`close`, an exception path) → the pool drains and everything hangs. Always return connections (use context managers / try-finally).
- **Oversizing** the pool → overwhelms the DB, hitting `too many connections` and *lowering* throughput.
- Forgetting **total** connections = pool size × number of app instances/replicas — many instances each with a big pool blows the DB limit.
- **Serverless** (lambda) + traditional pooling → each invocation opens connections, exhausting the DB; use an external pooler (pgbouncer, RDS Proxy) or a serverless-aware driver.
- Long-held connections from **slow queries/transactions** starving the pool — keep transactions short (see how-database-transactions-work).
- Not validating idle connections (stale/dropped connections handed to requests) — enable health checks.
