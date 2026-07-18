---
name: dotnet-csharp-patterns
description: Write idiomatic .NET / C# — async/await all the way (no blocking .Result), dependency injection, LINQ, IDisposable/using, records and pattern matching, nullable reference types, and ASP.NET Core basics (middleware, minimal APIs, EF Core). Use when building or reviewing a .NET/C# application.
category: engineering
keywords_vi: dotnet c#, asp.net core, async await task, dependency injection di, linq, ef core entity framework, nullable reference types, records pattern matching
---

# .NET / C# Patterns

Modern C# is expressive and fast. Write idiomatic .NET and avoid the classic async and resource pitfalls.

## Async All the Way

.NET is heavily async. **Use `async`/`await` end to end** — an async method awaits async calls up the chain. The cardinal sin: **blocking on async with `.Result` or `.Wait()`**, which can **deadlock** (especially in older sync contexts) and wastes threads. If a method is async, its callers should be too. Use `Task`/`Task<T>` return types; `ConfigureAwait(false)` in library code. Async is for I/O-bound scaling (see how-async-await-works).

## Dependency Injection

.NET has **built-in DI**. Register services in the container with the right lifetime — **singleton** (one for the app), **scoped** (one per request — the default for web work), **transient** (new each time) — and inject via constructors. Getting lifetimes wrong (e.g. injecting a scoped service into a singleton — "captive dependency") is a common bug. DI makes code testable and decoupled.

## LINQ

Use **LINQ** for querying collections declaratively (`Where`, `Select`, `GroupBy`, `OrderBy`). It's readable and composable. Note: LINQ is **lazy** (deferred execution) — the query runs when enumerated; be aware of multiple enumeration (materialize with `ToList()` when needed) and, with EF Core, of what runs in the DB vs in memory (`AsQueryable` vs `AsEnumerable`).

## Resource Management

Implement/use **`IDisposable`** with **`using`** statements/declarations for anything holding unmanaged resources (files, DB connections, HTTP clients). `using var stream = ...;` guarantees disposal. Don't create/dispose `HttpClient` per call — use `IHttpClientFactory`.

## Modern C# Features

- **Records** — concise immutable data types with value equality (great for DTOs).
- **Pattern matching** — `switch` expressions, `is` patterns for cleaner branching.
- **Nullable reference types** — enable them; let the compiler catch null-deref bugs at build time.
- **Expression-bodied members**, `async` streams (`IAsyncEnumerable`).

## ASP.NET Core

- **Middleware pipeline** — the request flows through ordered middleware (auth, logging, error handling); order matters.
- **Minimal APIs** (lightweight endpoints) or **controllers** (structured MVC/Web API).
- **EF Core** — the ORM; watch N+1 (use `Include`), and the same query-optimization rules as any ORM (see sql-query-optimization).

## Pitfalls

- **`.Result`/`.Wait()` on async** → deadlocks and thread starvation.
- **Wrong DI lifetimes** (captive dependencies, scoped-in-singleton).
- **`HttpClient` per request** → socket exhaustion (use factory).
- **Not disposing** IDisposables → resource leaks.
- **Multiple enumeration** of a lazy LINQ query hitting the DB repeatedly.
- Ignoring nullable warnings.
