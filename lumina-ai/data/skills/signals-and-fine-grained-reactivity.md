---
name: signals-and-fine-grained-reactivity
description: Fine-grained reactivity with signals (SolidJS, Preact Signals, Angular signals, Vue refs) — reactive values that track exactly which computations read them, so a change updates only the precise DOM nodes/derived values that depend on it, without diffing a virtual DOM or re-running whole components. Covers signals vs computed vs effects, the dependency-tracking model, and vs the VDOM re-render approach. Use to understand signals, fine-grained reactivity, or why some frameworks skip the virtual DOM.
category: frontend
keywords_vi: signals phản ứng mịn fine-grained, solidjs preact signal, cập nhật đúng ô phụ thuộc không re-render cả cây, theo dõi phụ thuộc tự động, computed và effect, khác với virtual dom diffing
---

# Signals & Fine-Grained Reactivity

React's model re-runs a **whole component** on state change and **diffs a virtual DOM** to find what actually changed — simple, but it does work proportional to the component tree, not to what truly changed. **Signals** (SolidJS, Preact Signals, Angular signals, Vue refs) take a different path: a reactive value **knows exactly which computations read it**, so when it changes it updates **only those** — often a single DOM text node — with **no VDOM and no component re-run** (see frontend-ui-engineering, state-management-patterns, how-react-rendering-works if present).

## The Three Primitives

- **Signal** — a reactive container: `const [count, setCount] = createSignal(0)`. Reading it **inside a reactive context registers a dependency**; writing it **notifies** dependents.
- **Computed / memo** — a derived signal: `const doubled = () => count() * 2`. Recomputes **only when its inputs change**, and is itself a signal others can depend on.
- **Effect** — a side effect that **re-runs when the signals it reads change**: `createEffect(() => console.log(count()))`. This is how the DOM gets updated — an effect writes one value into one node.

## The Key Mechanism: Automatic Dependency Tracking

When a computed/effect runs, the runtime **records every signal it reads** (by intercepting the read). That builds a precise dependency graph: signal → exactly the computations that use it. On write, only those are re-run. You **don't declare dependency arrays** (no React `useEffect` deps to get wrong) — it's tracked automatically and always correct.

## Signals vs Virtual DOM

- **VDOM (React)** — state change → re-render component subtree → diff → patch. Work ∝ tree size; needs memoization (`useMemo`, `React.memo`) to avoid waste.
- **Signals (Solid)** — state change → run only the effects that read that signal → patch exact nodes. Work ∝ what changed; **no diffing, no re-render**, usually no manual memoization.
Result: signals give **surgical updates** and often better performance for fine-grained interactivity, at the cost of a different mental model (the component runs **once** to set up the graph, not on every change).

## Design Guidance

- **Read signals inside reactive contexts** (JSX, computed, effect) so dependencies are tracked; reading outside won't react.
- **Derive with computed/memo**, don't recompute manually — let the graph cache.
- **Keep effects for side effects** (DOM, network), not for deriving state (use computed).
- **Components run once** (Solid) — don't put per-render logic expecting re-execution.
- **Fine-grained ≠ always faster** for coarse updates, but shines on many small independent updates.
- **Avoid over-splitting** into thousands of tiny signals when one object suffices.

## Pitfalls (in understanding/using)

- Reading a signal **outside a reactive scope** → no dependency tracked, UI won't update.
- Bringing **React habits** to Solid (expecting the component body to re-run) → bugs.
- Using an **effect to compute derived state** → extra passes/glitches; use computed.
- Assuming signals **replace** all state management → still need patterns for large/shared state.
- Destructuring reactive values too early (losing reactivity) in Vue/Solid.
- Believing "no VDOM = always faster" → depends on workload; it's about *granularity*.
