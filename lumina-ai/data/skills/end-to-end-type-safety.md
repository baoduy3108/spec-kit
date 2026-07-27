---
name: end-to-end-type-safety
description: Making types flow unbroken from database → server → API → client so a change on one side becomes a compile error on the other — via a shared schema (Zod), inferred API contracts (tRPC), or generated types (GraphQL/OpenAPI codegen) — plus runtime validation at trust boundaries because compile-time types vanish at runtime. Use to understand end-to-end type safety, tRPC/Zod, parse-don't-validate, or eliminating client/server drift.
category: software-architecture
keywords_vi: an toàn kiểu đầu cuối end-to-end, trpc chia sẻ kiểu client server, zod validate ranh giới runtime, suy luận kiểu tự động không viết type thủ công, parse dont validate, tránh lệch hợp đồng api
---

# End-to-End Type Safety

A classic bug source: the server changes a field (`name` → `fullName`), the client still reads `name`, everything **compiles and ships**, and it breaks at runtime for users. **End-to-end type safety** closes this gap: the **same types flow from DB → server → API → client**, so that mismatch becomes a **compile-time error** the moment you make it — the compiler is your integration test (see api-and-interface-design, typescript-advanced-types if present, runtime-schema-validation if present).

## Two Halves: Static Types AND Runtime Validation

Crucially it's **both**:
1. **Static (compile-time)** — shared/inferred types so client and server agree at build time.
2. **Runtime validation at the boundary** — TypeScript types are **erased at runtime**; data crossing a trust boundary (HTTP body, query params, env vars, third-party JSON) is `any` in reality and **must be validated** before you trust its shape. A schema library (**Zod**) does both: it's the runtime validator *and* the static type is **inferred from the schema** (`z.infer`), so schema = single source of truth.

## Three Ways to Get It

- **Shared schema (Zod + monorepo)** — define the schema once, `infer` the TS type, validate at the edge, import the type on both sides. Framework-agnostic.
- **Inferred RPC (tRPC)** — the client **infers** the API's input/output types directly from the server's router **with no codegen and no schema duplication** — call `trpc.user.get.query()` and get full autocomplete + type-checking; change the server, the client fails to compile. Best for TS-fullstack (same repo).
- **Generated types (GraphQL / OpenAPI codegen)** — a schema/spec is the contract; a codegen step produces typed clients. Works **across languages** (the schema is the interop layer), at the cost of a build step.

## "Parse, Don't Validate"

The principle behind boundary validation: instead of *checking* raw input and passing the same loose type along, **parse** it into a **precise typed value** once at the edge. After parsing, the rest of the code holds a trustworthy type and never re-checks. Invalid input is rejected at the door with a clear error, not deep in business logic.

## Design Guidance

- **One source of truth** for each contract — a schema or the server router — not hand-copied types on both sides.
- **Validate every trust boundary** at runtime (request bodies, params, env, external APIs) — types alone don't protect you at runtime.
- **Infer types from schemas** (`z.infer`) so validation and types can't drift apart.
- **Prefer tRPC** for TS end-to-end monorepos; **codegen** (GraphQL/OpenAPI) when crossing languages.
- **Fail fast at the edge** with actionable validation errors (parse, don't validate).
- **Type env vars & config** too — a missing var is a boundary error.

## Pitfalls (in understanding/using)

- Believing **TS types validate at runtime** → they're erased; unvalidated input is `any` in disguise.
- **Hand-duplicating types** on client and server → they drift silently.
- Casting external JSON `as SomeType` **without validating** → lies to the compiler, crashes later.
- Skipping validation on **env/config/params** → boundary bugs in prod.
- Over-adopting **codegen** for a small TS-only app where tRPC would be simpler.
- Validating the **same data repeatedly** deep in code instead of parsing once at the edge.
