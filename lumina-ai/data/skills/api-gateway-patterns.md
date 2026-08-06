---
name: api-gateway-patterns
description: How an API gateway works — a single entry point in front of backend services handling routing, authentication, rate limiting, TLS termination, and aggregation, plus the backend-for-frontend (BFF) pattern and gateway vs service mesh. Use to understand API gateways, a single entry point for microservices, BFF, or edge concerns like auth/rate limiting.
category: engineering
keywords_vi: api gateway, cổng api, điểm vào duy nhất, routing xác thực rate limiting, tls termination, aggregation tổng hợp, backend for frontend bff, gateway vs service mesh
---

# API Gateway Patterns

An API gateway is a **single entry point** that sits in front of your backend services, handling the cross-cutting concerns of client-facing traffic — routing, authentication, rate limiting, and more — so individual services don't each reimplement them. It's the "front door" (north-south, edge) of a system (see how-proxies-work for the reverse-proxy basis).

## The Problem It Solves

Without a gateway, clients must know about and call many backend services directly, and **every service** must handle authentication, rate limiting, TLS, CORS, logging, etc. That's duplicative, inconsistent, and exposes your internal topology. A gateway **centralizes** these concerns at the edge and gives clients one stable entry point.

## What a Gateway Does

- **Routing** — direct incoming requests to the right backend service based on path/host (`/orders` → order service).
- **Authentication & authorization** — verify tokens/API keys **once** at the edge, so backends can trust incoming requests (see authentication-and-authorization, how-jwt-works).
- **Rate limiting & throttling** — protect backends from abuse/overload (see rate-limiting-algorithms).
- **TLS termination** — handle HTTPS centrally (see how-https-tls-works).
- **Request/response transformation** — reshape, add headers, protocol translation (REST↔gRPC).
- **Aggregation** — combine calls to several services into one client response (reducing client round trips).
- **Observability** — central logging, metrics, tracing of all API traffic.
- **Caching** — cache responses at the edge (see how-http-caching-works).
It's a natural **choke point** for security and control, and hides the internal service structure from clients.

## Backend-for-Frontend (BFF)

A refinement: instead of one gateway for all clients, build a **separate gateway per client type** — a **BFF** for the web app, one for mobile, one for third parties. Each BFF tailors aggregation and payloads to its client's needs (mobile wants less data, fewer round trips). This avoids a bloated one-size-fits-all gateway and lets each frontend evolve independently. Great when different clients need very different API shapes.

## Gateway vs Service Mesh (a key distinction)

- **API gateway** — **north-south** traffic: **client-to-system**, at the **edge**. Handles external concerns (auth, public rate limiting, client-facing routing).
- **Service mesh** (see service-mesh) — **east-west** traffic: **service-to-service**, **internal**. Handles inter-service mTLS, retries, internal observability.
They're **complementary**, not alternatives — a gateway at the edge, a mesh inside. Many systems use both.

## Pitfalls (in understanding/using)

- Making the gateway a **single point of failure** — it must be highly available/redundant (everything flows through it).
- Putting **business logic** in the gateway — keep it to cross-cutting/edge concerns; logic belongs in services (a bloated gateway becomes a new monolith).
- The gateway becoming a **bottleneck** — size and scale it; it's on every request's path.
- Confusing it with a **service mesh** (edge/north-south vs internal/east-west).
- One giant gateway for wildly different clients → consider **BFFs**.
- Over-aggregating in the gateway (tight coupling to many services) — balance convenience against coupling.
- Not securing the gateway itself (it holds auth/keys and sees all traffic) — a prime target (see threat-modeling).
