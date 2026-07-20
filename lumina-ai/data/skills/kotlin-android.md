---
name: kotlin-android
description: Build Android apps in Kotlin — Jetpack Compose (declarative UI) vs Views, lifecycle awareness, coroutines/Flow for async, ViewModel + state hoisting, avoiding memory leaks (context/lifecycle), and Android architecture (unidirectional data flow). Use when building or reviewing a native Android app in Kotlin.
category: engineering
keywords_vi: kotlin android, jetpack compose, viewmodel lifecycle, coroutines flow android, ứng dụng android, state hoisting, memory leak context android, native android
---

# Kotlin & Android

Kotlin is the standard language for native Android. Modern Android favors **Jetpack Compose** (declarative UI) and coroutines for async.

## Jetpack Compose (modern UI)

Compose builds UI **declaratively** — you describe UI as a function of state (`@Composable` functions), and it recomposes when state changes (like React/Flutter). Key ideas:
- **State hoisting** — keep composables stateless where possible; lift state up to the caller (or ViewModel), passing value down and events up (unidirectional data flow). Stateless composables are reusable and testable.
- **`remember` / `mutableStateOf`** — hold state that survives recomposition; `remember` caches across recompositions.
- **Recomposition is frequent and can be skipped** — keep composables cheap, avoid side effects in composition (use `LaunchedEffect`/`rememberCoroutineScope` for effects). Compose skips recomposing parts whose inputs didn't change (with stable/immutable types).
The older **View/XML** system still exists; new apps generally use Compose.

## Lifecycle & Leaks

Android components (Activities/Fragments) have a **lifecycle** (created/started/resumed/paused/destroyed) — the source of Android's trickiest bugs:
- **Configuration changes** (rotation) destroy and recreate Activities → hold UI state in a **ViewModel** (survives config changes), not in the Activity.
- **Memory leaks** — the classic: holding a reference to an **Activity/Context** past its lifecycle (a static field, a long-lived callback, a leaked coroutine) prevents it being garbage-collected. Use lifecycle-aware scopes and application context where appropriate; cancel work when the lifecycle ends.

## Async: Coroutines & Flow

- **Coroutines** — structured async without callback hell (`suspend` functions, `viewModelScope.launch`). Do I/O on `Dispatchers.IO`, UI on `Main`.
- **Flow** — reactive streams of values (like RxJS observables) for data that changes over time; `StateFlow`/`SharedFlow` for UI state.
- **Structured concurrency** — tie coroutines to a lifecycle scope (`viewModelScope`, `lifecycleScope`) so they're **cancelled automatically** when the scope dies — prevents leaks and work continuing after the screen is gone.

## Architecture

Standard: **UI (Compose) → ViewModel (state + logic) → Repository (data)**, with **unidirectional data flow** (state down, events up). ViewModel exposes state (StateFlow), UI observes it and sends events. Keep business logic out of composables/Activities.

## Pitfalls

- **Holding Activity/Context references** past lifecycle → memory leaks.
- **State in the Activity** lost on rotation → use ViewModel.
- **Side effects in composition** instead of `LaunchedEffect`.
- **Unscoped coroutines** that outlive the screen (use lifecycle scopes).
- **Blocking the main thread** (do I/O on IO dispatcher).
- Heavy/unstable recomposition (unstable types, no state hoisting).
