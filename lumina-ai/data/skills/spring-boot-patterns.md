---
name: spring-boot-patterns
description: Build Spring Boot (Java) apps idiomatically — dependency injection with constructor injection, layered architecture (controller/service/repository), Spring Data JPA (and N+1/lazy-loading traps), transactions, DTOs vs entities, configuration/profiles, and exception handling. Use when building or reviewing a Spring Boot backend.
category: engineering
keywords_vi: spring boot, java backend, dependency injection constructor, controller service repository, spring data jpa n+1, transaction transactional, dto entity, cấu hình profile
---

# Spring Boot Patterns

Spring Boot is the standard for Java backends — convention-over-configuration on top of the Spring DI container. Use its layers and DI idiomatically.

## Dependency Injection

Spring wires beans automatically. **Prefer constructor injection** (over field `@Autowired`) — it makes dependencies explicit, enables immutable `final` fields, and keeps classes testable (construct with mocks, no reflection needed). Annotate components (`@Service`, `@Repository`, `@Component`, `@RestController`) so Spring manages them.

## Layered Architecture

Standard separation:
- **Controller** (`@RestController`) — HTTP layer: parse requests, validate, return responses. Thin.
- **Service** (`@Service`) — business logic and orchestration. Where the work lives.
- **Repository** (`@Repository` / Spring Data JPA) — data access.
Keep each layer's job distinct; don't put business logic in controllers or SQL concerns in services.

## Spring Data JPA

Extend `JpaRepository` to get CRUD + derived query methods (`findByEmail`) for free. Traps:
- **N+1 queries** — lazy-loaded associations accessed in a loop fire a query each. Use **`@EntityGraph`** or **`JOIN FETCH`** in JPQL to fetch eagerly where needed (see sql-query-optimization). This is the #1 JPA performance bug.
- **LazyInitializationException** — accessing a lazy association outside a transaction/session. Fetch what you need within the transaction, or map to a DTO there.
- Understand `FetchType.LAZY` vs `EAGER` (prefer LAZY + explicit fetching).

## Transactions

Use **`@Transactional`** on service methods that must be atomic — Spring manages commit/rollback. Note: it works via proxies, so **self-invocation** (calling a `@Transactional` method from within the same class) bypasses it, and it rolls back on unchecked exceptions by default (configure for checked). Keep transactions focused; don't do slow external calls inside them.

## DTOs vs Entities

**Don't expose JPA entities directly** in your API — map to **DTOs**. Entities are tied to the DB and lazy-loading; serializing them leaks internals, causes lazy-loading exceptions, and couples your API to your schema. DTOs give a stable, intentional API contract.

## Config & Errors

- **`application.yml` + profiles** (dev/prod) for environment config; externalize secrets (env vars, not committed — see secrets-management).
- **Centralized exception handling** with `@ControllerAdvice`/`@ExceptionHandler` → consistent error responses (see error-handling-patterns).
- **Bean validation** (`@Valid` + annotations) on request DTOs.

## Pitfalls

- **N+1 / LazyInitializationException** — the JPA classics.
- **Field injection** instead of constructor injection.
- **Exposing entities** in the API (lazy-load + coupling issues).
- **`@Transactional` self-invocation** silently not applying.
- **Fat controllers**; business logic in the wrong layer.
- Committed secrets / no profiles.
