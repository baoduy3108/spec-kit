---
name: state-management-patterns
description: How to manage state in frontend apps — local vs global state, server state vs client state, the flux/unidirectional-data-flow pattern (Redux), signals/observables, context, and choosing the right tool (avoiding over-engineering global stores). Use to understand frontend state management, Redux, when to use global state, server vs client state, or signals.
category: engineering
keywords_vi: state management, quản lý trạng thái frontend, redux, signals, server state, local vs global state, flux luồng dữ liệu một chiều, context, chọn công cụ state
---

# State Management Patterns

State — the data that changes over time — is the hardest part of frontend apps. Managing it well means putting each piece of state in the **right place** with the **right tool**, and keeping data flow predictable. Most state-management pain comes from over-centralizing or mixing up kinds of state.

## Kinds of State (the key distinction)

Not all state is the same; treat each differently:
- **Local/UI state** — belongs to one component (a dropdown open/closed, form input, a toggle). Keep it **local** (component state) — don't hoist it to a global store.
- **Shared/global client state** — needed across many components (current user, theme, cart). This is what a global store is for.
- **Server state** — data that lives on the server and is fetched (a list of products, a profile). It's **not really your state** — it's a cached copy of the server's, with concerns like caching, refetching, staleness, and invalidation. Managing it like local state (dumping it in Redux manually) is a common mistake; **server-state libraries** (React Query/TanStack Query, SWR, RTK Query) handle fetching/caching/revalidation far better (see how-http-caching-works).
- **URL state** — some state belongs in the URL (filters, current page) for shareability/back-button.
Putting state in the right category is 80% of good state management.

## Unidirectional Data Flow (Flux/Redux)

The dominant pattern for predictable shared state: data flows in **one direction**. State lives in a central **store**; the UI reads from it; to change it, you dispatch an **action** describing what happened, and a pure **reducer** computes the new state. Because changes go through this single, explicit path, the app is **predictable and debuggable** (you can trace every state change, time-travel debug). Redux popularized this; the *pattern* (single source of truth, explicit updates, immutable state) matters more than the specific library.

## Signals & Observables

A newer model (SolidJS, Vue, Svelte 5, Angular signals): **fine-grained reactive** state. A **signal** holds a value; anything that reads it **automatically re-runs** when it changes — no manual subscriptions, and only the exact things that depend on it update (efficient, see svelte-patterns). Great ergonomics and performance for reactive UIs.

## Choosing the Right Tool

- Start with **local state**; lift it up only when genuinely shared.
- Use **context** (or props) for light shared state; a **store** (Redux/Zustand/etc.) for complex global client state.
- Use a **server-state library** for anything fetched — don't hand-roll caching in a global store.
- Don't reach for a heavy global store by default — over-centralized state is a common over-engineering trap (see anti-over-engineering).

## Pitfalls (in understanding/using)

- **Putting everything in a global store** — local UI state doesn't belong there; over-centralizing adds boilerplate and coupling.
- **Managing server state as client state** — reinventing caching/refetching poorly; use React Query/SWR.
- **Prop drilling** deeply instead of context/store for genuinely shared state (or the reverse — global store for one component's state).
- **Mutating state directly** — breaks change detection and predictability; keep updates immutable/explicit.
- Duplicating the **same state** in multiple places → they drift out of sync (single source of truth).
- Over-engineering with a heavy store before you need it — match the tool to the actual state's scope.
