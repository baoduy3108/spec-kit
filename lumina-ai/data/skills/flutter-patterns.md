---
name: flutter-patterns
description: Build Flutter (Dart) apps well — everything is a widget, composition over inheritance, stateless vs stateful widgets, state management (setState/Provider/Riverpod/Bloc), the build method purity, keys, and const widgets for performance. Use when building or reviewing a Flutter mobile app.
category: engineering
keywords_vi: flutter dart, widget stateless stateful, state management provider riverpod bloc, setState, build method, const widget performance, ứng dụng di động flutter
---

# Flutter Patterns

Flutter builds cross-platform apps from a single Dart codebase. Its core idea: **everything is a widget**, and you build UIs by **composing** widgets, not extending them.

## Widgets & Composition

The UI is a tree of widgets. Build complex UI by **nesting/composing** small widgets (composition over inheritance — a padded, centered button is `Padding(child: Center(child: ElevatedButton(...)))`). Extract reusable pieces into your own widget classes/methods. Deeply nested build methods are a smell — break them into named widgets for readability and rebuild performance.

- **StatelessWidget** — immutable, renders purely from its inputs. Use when the widget has no internal changing state.
- **StatefulWidget** — has mutable `State`; call **`setState()`** to trigger a rebuild when local state changes.

## The build Method Is Pure

`build()` can be called **often** (every frame during animations, on every state change). So it must be **fast and side-effect-free** — no network calls, no heavy work, no starting timers in `build`. Do side effects in `initState`/lifecycle methods or via state management. Use **`const` constructors** for widgets that don't change — Flutter skips rebuilding const subtrees, a major performance win.

## State Management

`setState` is fine for **local** widget state, but doesn't scale to shared/app state (prop-drilling `State` up the tree is painful). For app-wide/shared state, use a solution:
- **Provider** — simple InheritedWidget-based DI/state; a good default.
- **Riverpod** — Provider's successor: compile-safe, testable, no BuildContext needed.
- **Bloc/Cubit** — event-driven, structured for larger apps (streams of states).
Choose based on app size; don't over-engineer a small app with Bloc, and don't `setState` your way through a large one.

## Keys & Lists

Use **`Key`s** when Flutter needs to preserve widget state across reorders/removals in a list (like React keys) — without them, state can attach to the wrong item. Use `ListView.builder` for long/infinite lists (lazy building) rather than building all children.

## Pitfalls

- **Side effects / heavy work in `build()`** → jank and bugs (build runs constantly).
- **Not using `const`** widgets → unnecessary rebuilds.
- **`setState` for shared state** → prop-drilling and rebuild storms; use proper state management.
- **Deeply nested build methods** → unreadable, poor rebuild granularity; extract widgets.
- **Missing keys** in dynamic lists → state attaching to the wrong item.
- Rebuilding whole subtrees when only a small part changed (scope rebuilds).
