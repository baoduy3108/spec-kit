---
name: how-load-balancers-work
description: How load balancers distribute traffic — L4 vs L7, balancing algorithms (round-robin, least-connections, hashing), health checks and automatic failover, session persistence (sticky sessions), and their role in scaling and zero-downtime deploys. Use to understand load balancing, high availability, and why app servers should be stateless.
category: engineering
keywords_vi: load balancer hoạt động thế nào, cân bằng tải, phân phối request, round-robin least-connections, health check failover, sticky session, l4 l7, mở rộng ngang, hiểu load balancer
---

# How Load Balancers Work

A load balancer sits in front of multiple servers and spreads incoming requests across them, so no single server is overwhelmed — the foundation of horizontal scaling and high availability.

## L4 vs L7

- **L4 (transport)** — balances by IP/port, forwarding TCP/UDP connections without looking inside. Very fast, protocol-agnostic; can't route by URL or read headers.
- **L7 (application)** — understands HTTP: can route by path/host/header (`/api` → API pool, `/img` → image pool), terminate TLS, add caching/compression, and do content-based routing. More features, slightly more overhead. Most web setups use an L7 balancer (nginx, Envoy, ALB).

## Balancing Algorithms

- **Round-robin** — each server in turn. Simple; assumes servers are equal and requests are uniform.
- **Weighted round-robin** — give bigger servers more traffic.
- **Least connections** — send to the server with the fewest active connections; better when request durations vary.
- **Least response time** — factor in latency.
- **IP/consistent hashing** — route by a hash of the client/key so the same client (or cache key) lands on the same server — useful for cache affinity, and consistent hashing minimizes reshuffling when servers are added/removed.

## Health Checks & Failover

The balancer continuously **health-checks** each server (ping an endpoint). If a server fails, it's **removed from rotation** automatically, and traffic goes only to healthy ones — instant failover, no user-visible outage (if you have spare capacity). When it recovers, it's added back. This is how you get high availability and how **zero-downtime deploys** work: drain a server, update it, health-check, return it, repeat (rolling deploy).

## Sticky Sessions (and why to avoid needing them)

**Session persistence** pins a client to one server (via cookie or IP hash) — needed if the server holds per-user state in memory. But sticky sessions undermine balancing (load can skew, a dead server loses its users' sessions) and complicate scaling. The better design: keep app servers **stateless** (session/state in a shared store like Redis or a signed cookie) so *any* server can handle *any* request — then the balancer is free to route optimally and add/remove servers freely.

## Why It Matters

Load balancers enable horizontal scaling (add servers behind one), high availability (route around failures), and zero-downtime deploys. They're also a natural place for TLS termination, rate limiting, and routing. The key design implication: **build stateless services** so balancing and scaling stay simple. Note the balancer itself must be redundant (it's a potential single point of failure).
