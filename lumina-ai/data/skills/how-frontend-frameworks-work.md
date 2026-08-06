---
name: how-frontend-frameworks-work
description: How front-end frameworks (React/Vue/Svelte) work under the hood — declarative UI as a function of state, the virtual DOM and diffing/reconciliation, reactivity systems (signals/dependency tracking), the component tree, and compile-time vs runtime approaches. Use to understand why re-renders happen, what the virtual DOM buys you, and how reactivity updates the page.
category: engineering
keywords_vi: frontend framework hoạt động thế nào, virtual dom, reactivity signal, diffing reconciliation, react vue svelte cơ chế, ui theo state, hiểu framework frontend
---

# How Front-End Frameworks Work

They all solve one problem: keep the DOM in sync with your data without you manually touching it. The core idea is **UI = f(state)** — you declare what the UI should look like for a given state, and the framework makes the DOM match.

## The Problem They Solve

Manually mutating the DOM (`element.textContent = …`) for every state change is error-prone and doesn't scale — you must find every place the DOM depends on that data. Frameworks let you write the view declaratively and re-derive the DOM from state automatically.

## Virtual DOM + Diffing (React-style)

- On a state change, the component re-runs and produces a **virtual DOM** — a lightweight in-memory tree describing the desired UI.
- The framework **diffs** the new virtual tree against the previous one (**reconciliation**) to compute the minimal set of real DOM mutations, then applies only those.
- Direct DOM manipulation is slow; diffing in memory and batching real changes is the optimization.
- **Keys** in lists let the diff match elements across renders correctly (why unstable keys cause bugs). This is also why "the whole component re-runs on state change, but the DOM only updates where it actually changed."

## Reactivity / Signals (Vue/Svelte/Solid-style)

An alternative: track *which* pieces of state each piece of UI depends on. When a **signal** (reactive value) changes, only the exact DOM bindings that read it update — no diffing a whole tree. **Fine-grained reactivity** can be faster and is why Svelte/Solid feel lightweight. Svelte pushes work to **compile time**, generating imperative DOM updates directly (little/no runtime framework).

## The Component Tree

UIs are trees of **components** — reusable units with their own state and props flowing down. State changes propagate re-rendering down the affected subtree. Managing *where* state lives (local vs lifted vs global) is the main design skill (see react-patterns).

## The Trade-off

Virtual DOM (React): flexible, huge ecosystem, some overhead diffing. Fine-grained reactivity (Solid/Svelte): less overhead, updates precisely. Compile-time (Svelte): smallest runtime. All achieve the same goal — declarative UI kept in sync — differing in *when* and *how* they compute the DOM updates. Knowing this explains re-render behavior, performance characteristics, and why "memoization" exists (to skip re-running/diffing subtrees that didn't change).
