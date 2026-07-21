---
name: backend-for-frontend-pattern
description: The Backend-for-Frontend (BFF) pattern — a dedicated backend API per frontend (web, mobile, etc.) that tailors and aggregates data for that client's needs, instead of one generic API serving all, plus the trade-offs. Use to understand the BFF pattern, tailoring APIs per client, aggregating microservices for a UI, or web vs mobile API needs.
category: engineering
keywords_vi: backend for frontend, bff, backend riêng cho mỗi frontend, may đo api theo client web mobile, gộp dữ liệu theo nhu cầu client, thay vì một api chung cho tất cả
---

# The Backend-for-Frontend (BFF) Pattern

The Backend-for-Frontend pattern puts a **dedicated backend API in front of each frontend** — one for the web app, one for mobile, etc. — instead of forcing every client to share a single **general-purpose** API. Each BFF **tailors and aggregates** data exactly for its client, so the frontend gets what it needs in one call, in the right shape (see rest-api-design-principles, api-gateway-patterns, microservices).

## The Problem: One Generic API Doesn't Fit All Clients

Different frontends have **different needs**:
- **Mobile** wants **small, aggregated** payloads (limited bandwidth, battery — see battery-and-network-efficiency): one call returning just the fields for a screen.
- **Web** may want **richer** data and different fields.
- Different clients need different **aggregations** of the same underlying services.
A single generic API tends to become a compromise: either **over-fetching** (mobile downloads data it doesn't need) or **chatty** (the client makes many calls and aggregates itself), plus client-specific logic leaking into a shared API that then serves no one well. Worse, in a **microservices** backend, a UI screen may need data from **many** services — should the client orchestrate all those calls?

## The Core Idea: One Backend Per Frontend

A **BFF** is a thin backend layer **owned by (and shaped for) a specific frontend**:
- The web app talks to the **Web BFF**; the mobile app talks to the **Mobile BFF**.
- Each BFF **calls the underlying services** (or the generic APIs), **aggregates** the results, and returns a response **tailored** to its frontend's screens — exactly the fields, exactly the shape, in one round trip.
- Client-specific concerns (which fields, how to aggregate, formatting) live in **that client's BFF**, not polluting shared services or the client.
So the mobile team can optimize the Mobile BFF for small payloads and few calls, while the web team shapes the Web BFF differently — each **without stepping on the other**.

## Benefits and Trade-offs

**Benefits:**
- **Tailored payloads** — each client gets exactly what it needs (no over-fetching / under-fetching).
- **Aggregation at the backend** — one call to the BFF instead of many calls to microservices from a constrained device.
- **Team autonomy** — the frontend team owns its BFF and iterates without coordinating changes to a shared API.
- **Client-specific logic isolated** — doesn't leak into shared services.

**Trade-offs:**
- **More services to build/maintain** — one BFF per frontend (some logic **duplicated** across BFFs).
- **Potential duplication** — shared logic may be repeated; factor common pieces into shared libraries/services.
- **Another network hop** and more moving parts.
- Overkill for a **single client** — if you only have one frontend, a generic API is simpler.

**Alternatives:** an **API gateway** (see api-gateway-patterns) for cross-cutting concerns without per-client tailoring; **GraphQL** (see how-graphql-works) lets each client **query exactly the fields it needs** from one endpoint, addressing over/under-fetching differently (sometimes reducing the need for BFFs).

## Design Guidance

- **Use a BFF when clients diverge** meaningfully (web vs mobile needs, payload/aggregation differences) — especially over microservices.
- **Own each BFF with its frontend team** for autonomy.
- **Keep BFFs thin** — orchestration/aggregation/shaping, not core business logic (that belongs in the services).
- **Factor shared logic** into libraries/services to limit duplication across BFFs.
- **Consider GraphQL or an API gateway** as alternatives before adding BFFs, especially with one client.
- **Don't over-adopt** — one frontend rarely needs a BFF.

## Pitfalls (in understanding/using)

- Building BFFs for a **single client** → needless complexity; a generic API suffices.
- **Business logic** creeping into BFFs → they should aggregate/shape, not own domain rules (duplication + drift).
- **Duplicated logic** across multiple BFFs with no shared code → maintenance burden.
- Treating the BFF as just another **generic** API → it defeats the purpose (it must be client-specific).
- Ignoring **GraphQL / gateway** alternatives that might solve over-fetching more simply.
- Too many hops/layers → latency and operational overhead; keep BFFs thin and few.
