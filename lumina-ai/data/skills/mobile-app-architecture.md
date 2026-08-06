---
name: mobile-app-architecture
description: Architecting mobile apps — separating UI from logic with patterns like MVVM/MVI, a unidirectional data flow, a repository layer over data sources, and handling the platform lifecycle, so apps stay testable and survive configuration changes. Use to structure a mobile app, choose MVVM/MVI, separate concerns, or design a testable mobile architecture.
category: engineering
keywords_vi: kiến trúc app di động, tách ui khỏi logic, mvvm mvi, luồng dữ liệu một chiều, repository trên nguồn dữ liệu, vòng đời platform, app testable sống qua config change
---

# Mobile App Architecture

Good mobile architecture keeps the **UI separate from business logic and data**, so the app is testable, maintainable, and survives the platform's quirks (configuration changes, process death, lifecycle events). The dominant patterns — **MVVM** and **MVI** — all serve the same goal: a clear, one-way flow of data and state that the UI just renders (see react-native-patterns, kotlin-android, mobile-state-restoration).

## Why Mobile Needs Deliberate Architecture

Mobile has forces that punish tangled code:
- **Lifecycle** — screens are created/destroyed on rotation, backgrounding, and low memory; UI state must live **outside** the fragile view.
- **Async everywhere** — network, disk, sensors; the UI must stay responsive.
- **Limited resources** — memory/battery constraints.
- **Testability** — UI is hard to test; logic must be extractable into plain, testable classes.
Putting logic in the view (Activity/ViewController/screen widget) leads to giant, untestable, crash-prone classes. Architecture pulls logic **out** of the view.

## The Layers

A common, sound layering:
- **UI layer** — renders state and forwards user events. Dumb: no business logic.
- **Presentation/state holder** — a **ViewModel** (or presenter/store) holds UI **state** and handles events, surviving configuration changes. It exposes observable state the UI subscribes to.
- **Domain** (optional) — use cases / business rules, platform-independent.
- **Data layer** — a **repository** that abstracts data sources (network, local DB, cache) behind one interface, deciding where data comes from (cache vs network) so the rest of the app doesn't care.

## The Patterns

- **MVVM (Model-View-ViewModel)** — the View observes a ViewModel that exposes state; the View updates reactively. The ViewModel survives rotation and is unit-testable without the UI. The most common modern pattern.
- **MVI (Model-View-Intent)** — a stricter **unidirectional** loop: user **intents** → reducer produces a **single immutable state** → View renders it. One source of truth for screen state; very predictable, great for complex screens (echoes the Redux/Elm model).
- **MVC/MVP** — older; MVC often bloats the controller; MVP adds a presenter but is more boilerplate.

The common thread: **unidirectional data flow** and **a single source of truth for state** the UI merely renders.

## Design Guidance

- **Keep the View dumb** — no business logic in Activities/ViewControllers/screens; they render state and emit events.
- **State survives the view** — hold UI state in a lifecycle-aware holder (ViewModel) so rotation/backgrounding doesn't lose it (see mobile-state-restoration).
- **Repository over data sources** — one interface hiding network/DB/cache; enables offline and testing (see offline-first-mobile-sync).
- **Immutable, observable state** — the UI reacts to state changes rather than being imperatively poked.
- **Depend on abstractions** (inject dependencies) so logic is unit-testable without the device.
- **Single source of truth** — usually the local database/cache, with the network updating it.

## Pitfalls (in understanding/using)

- **Fat views** — logic in the Activity/ViewController → untestable, crash-prone, unmaintainable.
- Losing state on **rotation/backgrounding** because it lived in the view, not a survivor (ViewModel).
- No **repository** abstraction → UI/logic coupled to network calls; no offline, hard to test.
- **Two sources of truth** (UI state and DB drifting apart) → inconsistent screens; pick one source.
- Over-engineering a **trivial** app with heavy layers — match architecture to complexity.
- Ignoring **lifecycle** (starting work that outlives the screen, leaking) → crashes and leaks.
