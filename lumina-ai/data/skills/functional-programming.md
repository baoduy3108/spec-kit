---
name: functional-programming
description: Apply functional programming ideas in any language — pure functions, immutability, higher-order functions (map/filter/reduce), composition, avoiding side effects, and pushing effects to the edges. Use when structuring logic for testability and predictability, or refactoring tangled stateful code.
category: engineering
keywords_vi: functional programming, lập trình hàm, pure function, bất biến immutable, map filter reduce, hàm thuần, tránh side effect, composition hàm
---

# Functional Programming

FP is a style, not a language — most of its benefits apply anywhere. The core idea: build behavior from small, predictable, composable functions and keep side effects at the edges.

## Pure Functions

A pure function's output depends only on its inputs and it has no side effects (no mutation of external state, no I/O, no clock/random). Benefits: trivially testable (same input → same output), cacheable, safe to parallelize, easy to reason about. **Push impurity to the boundary** — read inputs and write outputs at the edges of the system; keep the core logic pure.

## Immutability

Prefer creating new values over mutating existing ones (`{...obj, x: 1}`, `[...arr, item]`). Immutable data can't be changed under you by another part of the code — it eliminates a whole class of "who mutated this?" bugs and makes change-tracking (undo, diffing, React re-render) cheap. Mutation isn't forbidden, but make it local and deliberate.

## Higher-Order Functions

Functions that take or return functions. The workhorses over collections:
- **map** — transform each element (n in → n out).
- **filter** — keep elements matching a predicate.
- **reduce/fold** — collapse a collection to a single value (sum, group, build).
- **find/some/every** — search and test.

These replace most manual index loops with declarative, intention-revealing pipelines: `orders.filter(paid).map(total).reduce(sum, 0)`. Chain small transformations instead of one big loop with mutable accumulators.

## Composition

Build complex behavior by composing small functions: the output of one is the input of the next. Prefer many tiny, named, single-purpose functions over one large one — they're testable and reusable. `compose(f, g)(x) = f(g(x))`.

## Practical Guidance

- Don't go dogmatic — a little local mutation inside a pure function (a loop building a result then returned) is fine.
- Separate **decisions** (pure logic) from **effects** (I/O, DB, network) — this is what makes code testable without mocks.
- Avoid shared mutable state across functions; pass data explicitly.
- Use immutability + pure functions especially for concurrent code (no data races) and for anything you want to unit-test cheaply.
