---
name: micro-frontends
description: How micro-frontends work — splitting a large frontend into independently developed and deployed pieces owned by different teams, integration approaches (build-time, run-time/module federation, iframes, web components), and the trade-offs vs a monolithic frontend. Use to understand micro-frontends, scaling frontend teams, module federation, or whether to split a frontend.
category: engineering
keywords_vi: micro-frontends, chia nhỏ frontend, đội độc lập deploy riêng, module federation, iframe web component tích hợp, monolith frontend, mở rộng đội frontend
---

# Micro-Frontends

Micro-frontends apply the **microservices** idea (see microservices-and-boundaries) to the frontend: split one large frontend into **independently developed, tested, and deployed** pieces, each owned by a different team. The goal is team autonomy at scale — but it adds real complexity, so it's for specific situations.

## The Problem It Addresses

As an organization grows, a single monolithic frontend codebase becomes a bottleneck: many teams commit to it, releases are coupled (everyone waits for one deploy), the build slows, and ownership blurs. Micro-frontends let each team own a **vertical slice** of the UI (e.g. the "search" team, the "checkout" team) and ship on their own cadence, in their own repo, potentially with their own stack — mirroring how the backend is split into services.

## Integration Approaches

The core challenge: how do independently-built pieces combine into one app the user experiences as seamless?
- **Build-time integration** — pieces published as packages, composed at build. Simple, but couples deploys (rebuild to update a piece) — arguably not truly independent.
- **Run-time via Module Federation** (Webpack) — apps load each other's code **at runtime**, so a team deploys independently and the change appears without rebuilding the host. The popular modern approach; enables true independent deploys with shared dependencies.
- **iframes** — strong isolation (separate CSS/JS/globals), but awkward (routing, sizing, communication, UX seams). Fine for strongly-isolated embeds.
- **Web Components** — wrap each micro-frontend as a custom element; framework-agnostic, encapsulated. A clean standards-based option.
- **Server-side composition / edge** — assemble fragments on the server/edge (see edge-computing).

## The Hard Parts (why it's not free)

Micro-frontends solve an **organizational** scaling problem but introduce **technical** costs:
- **Shared dependencies & bundle size** — each piece may ship its own framework copy → bloat unless you share dependencies carefully (a real challenge).
- **Consistent UX/design** — independent teams can drift into inconsistent look/feel; needs a **shared design system** and tokens (see design-system, design-tokens) enforced across pieces.
- **Cross-app communication & shared state** — pieces need to coordinate (auth, cart) without tight coupling — via events, a shared store, or URL.
- **Operational complexity** — many builds, deploys, versioning, and integration testing (see contract-testing for boundaries).
- **Performance** — loading multiple apps can be slower than one optimized bundle.

## When to Use (and Not)

- **Use** — large organizations with **many teams** stepping on each other in one frontend, needing independent deploys and clear ownership. The autonomy justifies the overhead.
- **Don't** — small teams/apps. For most projects, a **well-modularized monolithic frontend** is simpler, faster, and more consistent. Micro-frontends are an organizational-scaling tool, not a default; adopting them prematurely adds huge complexity for no benefit (see anti-over-engineering).

## Pitfalls (in understanding/using)

- **Adopting them without the organizational need** (many teams) → massive complexity for a small team; use a modular monolith.
- **Framework duplication / bloated bundles** — each piece shipping its own React → poor performance; share dependencies.
- **Inconsistent UX** across independently-built pieces — enforce a shared design system/tokens.
- **Tight coupling** sneaking back in (shared global state, synchronous cross-app calls) — defeats independence; use loose coupling (events).
- Underestimating **integration/testing** overhead across many deployables.
- Splitting by **technical layer** instead of **vertical feature/team ownership** (the whole point).
