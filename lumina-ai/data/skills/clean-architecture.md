---
name: clean-architecture
description: Structure an application in layers with the dependency rule — domain/business logic at the core, depending on nothing; frameworks, databases, and UI at the edges depending inward via interfaces (ports & adapters / hexagonal). Use when organizing a codebase for testability and to keep business logic independent of frameworks and infrastructure.
category: engineering
keywords_vi: clean architecture, kiến trúc sạch, phân tầng layer, dependency rule, hexagonal ports adapters, tách business logic khỏi framework, domain core, kiến trúc ứng dụng
---

# Clean Architecture

Clean/hexagonal architecture organizes code so the **business logic is independent of frameworks, databases, and UI**. The payoff: you can test the core without spinning up a DB or web server, and swap infrastructure without rewriting business rules.

## The Dependency Rule (the one thing to get right)

Dependencies point **inward, toward the domain**. Inner layers know nothing about outer layers:
- **Core / domain / entities** — pure business rules and models. Depends on **nothing** (no framework, no DB, no HTTP). The most stable, most valuable code.
- **Use cases / application** — orchestrates the domain to fulfill a specific operation ("place order"). Depends only on the domain.
- **Adapters / infrastructure** (outer) — the database, web framework, external APIs, UI. These depend inward and implement interfaces the inner layers define.

Source code dependencies never point outward. The web framework and the database are **details** at the edge, not the center.

## Ports & Adapters (how the core stays clean)

The core defines **interfaces (ports)** for what it needs — `OrderRepository`, `PaymentGateway`, `Clock`. Infrastructure provides **adapters** that implement them (a Postgres `OrderRepository`, a Stripe `PaymentGateway`). This is **dependency inversion**: the core depends on an abstraction it owns, and the concrete DB/HTTP code plugs into it from outside. Result: the domain doesn't import your ORM or web framework — they import it.

## Why It Pays Off

- **Testability** — test business logic with in-memory/fake adapters, no DB or network. Fast, reliable unit tests.
- **Swappable infrastructure** — change database, web framework, or a third-party API by writing a new adapter; the core is untouched.
- **Framework independence** — the framework is a delivery mechanism at the edge, not the thing your business logic is entangled with (frameworks come and go).
- **Clear boundaries** — new devs find business rules in one place, not scattered through controllers and models.

## Applying It Pragmatically

Match the ceremony to the app. A small CRUD app doesn't need full hexagonal layering — a modular structure with the business logic not stuck inside controllers is enough. Reach for stricter layering as domain complexity and lifespan grow. The **spirit** — keep business logic free of framework/DB details, depend on interfaces — matters more than the exact number of layers.

## Pitfalls

- **Over-engineering** — full layering + interfaces for everything in a trivial app adds indirection with no payoff.
- **Leaking infrastructure into the core** — importing the ORM entity or framework request object into domain code breaks the whole benefit.
- **Anemic domain** — putting all logic in "services" and none in the domain model (a different failure, but common with layering).
- Interfaces owned by the outer layer instead of the core (inverts the dependency the wrong way).
