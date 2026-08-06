---
name: typescript-advanced-types
description: TypeScript's type system in depth — unions/intersections, generics, literal and template literal types, discriminated unions, utility types (Partial/Pick/Omit/Record), conditional and mapped types, type narrowing, unknown vs any, and typing for safety without fighting the compiler. Use when writing complex TypeScript types or improving type safety.
category: engineering
keywords_vi: typescript nâng cao, generic, union intersection type, discriminated union, utility type partial pick omit, conditional mapped type, type narrowing, unknown any, an toàn kiểu
---

# TypeScript Advanced Types

TypeScript's type system is a powerful tool for correctness — used well, it catches bugs at compile time and documents intent. The goal is *safety with good ergonomics*, not maximally clever types.

## Building Blocks

- **Union `A | B`** — a value is one of several types (narrow it before use). **Intersection `A & B`** — has all properties of both.
- **Generics `<T>`** — reusable, type-preserving functions/types (`function first<T>(arr: T[]): T`). The way to write flexible code that keeps its types.
- **Literal types** — exact values (`"GET" | "POST"`, `200 | 404`); **template literal types** build strings at the type level (`` `on${Capitalize<E>}` ``).

## Discriminated Unions (the workhorse)

A union of object types sharing a **literal "tag" field** lets TypeScript narrow exhaustively:
```ts
type Result = { status: "ok"; data: string } | { status: "error"; message: string };
if (r.status === "ok") { r.data }   // narrowed, TS knows data exists
```
This models "one of these shapes" safely and enables exhaustiveness checking (a `never` in the default case flags unhandled variants). Use it for state, API responses, events.

## Utility & Derived Types

Don't hand-write related types — **derive** them:
- **`Partial<T>`** (all optional), **`Required<T>`**, **`Readonly<T>`**.
- **`Pick<T, K>`** / **`Omit<T, K>`** — a subset / everything-but.
- **`Record<K, V>`** — an object type with keys K and values V.
- **`ReturnType<F>`**, **`Parameters<F>`**, `Awaited<T>` — extract from functions/promises.
Deriving keeps types in sync (change the source, dependents update).

## Conditional & Mapped Types (advanced)

- **Mapped types** transform each property: `{ [K in keyof T]: ... }` (how utility types are built).
- **Conditional types** `T extends U ? X : Y` compute types from types; with `infer` you extract parts. Powerful for library authors; use sparingly in app code — clever type gymnastics hurt readability and compile time.

## Safety Practices

- **`unknown` over `any`** — `any` disables checking (defeats the point); `unknown` forces you to narrow before use. Reserve `any` for genuine escape hatches, and prefer `unknown` + validation at boundaries.
- **Type narrowing** — TS refines types via `typeof`, `instanceof`, `in`, and discriminants; write code that lets it narrow.
- **`strict` mode on** — including `strictNullChecks` (the single biggest bug-catcher).
- **Validate external data at runtime** (zod, etc.) — types are erased at runtime; a `JSON.parse` typed as `User` is a lie until validated.

## Pitfalls

- **`any` everywhere** → no safety; use `unknown` + narrowing.
- **Over-clever conditional/mapped types** → unreadable, slow compiles.
- **Trusting types for runtime data** (API/JSON) without validation — types don't exist at runtime.
- **Not enabling `strict`** — missing null-safety.
- Fighting the compiler with casts (`as`) instead of modeling the type correctly (a cast is you overriding TS — often hiding a real bug).
