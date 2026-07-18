---
name: angular-patterns
description: Build Angular apps well — components and modules/standalone, services and dependency injection, RxJS observables and the async pipe, smart vs presentational components, change detection (OnPush), reactive forms, and signals. Use when building or reviewing an Angular application.
category: engineering
keywords_vi: angular, angular patterns, rxjs observable async pipe, dependency injection service, change detection onpush, reactive forms, signals angular, component module
---

# Angular Patterns

Angular is an opinionated, full-featured TypeScript framework. Its structure (DI, RxJS, modules) is powerful but has a learning curve — use it idiomatically.

## Components & Structure

- **Components** — UI building blocks; keep them focused. Use **standalone components** (modern Angular) or NgModules to organize.
- **Smart vs presentational** — "smart"/container components fetch data and hold state; "presentational"/dumb components just take `@Input()`s and emit `@Output()`s. This separation keeps UI reusable and logic testable.
- Keep templates declarative; move logic to the component class or services.

## Services & Dependency Injection

Put shared logic, state, and data access in **injectable services**, provided via Angular's **DI** system (`@Injectable`, injected via the constructor). DI makes code testable (swap in mocks) and decoupled — the backbone of Angular architecture. Scope services appropriately (root singleton vs component-scoped).

## RxJS & the async pipe

Angular is RxJS-heavy — data often flows as **observables** (HTTP, forms, router, state). Key discipline:
- **Use the `async` pipe** in templates to subscribe/unsubscribe automatically — it prevents the **memory leaks** from manual subscriptions you forget to unsubscribe. Manual `subscribe()` in components must be cleaned up (`takeUntilDestroyed`/`ngOnDestroy`), which people forget.
- Compose streams with operators (`map`, `switchMap`, `combineLatest`) rather than nesting subscriptions.
- **Signals** (modern Angular) offer a simpler reactive primitive for local state — increasingly preferred over RxJS for component state; use signals for state, RxJS for async streams/events.

## Change Detection

Angular checks the component tree for changes. For performance in large apps, use **`ChangeDetectionStrategy.OnPush`** — the component re-renders only when its `@Input()` references change or an observable (via async pipe) emits, not on every tick. Combined with immutable data, this dramatically cuts unnecessary checks. Signals also integrate with fine-grained updates.

## Forms

Prefer **reactive forms** (`FormGroup`/`FormControl`, typed) over template-driven for anything non-trivial — explicit, testable, and powerful validation. Template-driven forms are fine for simple cases.

## Pitfalls

- **Manual subscriptions without unsubscribing** → memory leaks (use `async` pipe / `takeUntilDestroyed`).
- **Nested subscriptions** instead of RxJS operators (`switchMap`).
- **Not using OnPush** in large apps → change-detection performance issues.
- **Fat components** — logic that belongs in services.
- Mutating data with OnPush (breaks change detection — use immutable updates).
- Over-engineering small apps with heavy RxJS where signals/simple state suffice.
