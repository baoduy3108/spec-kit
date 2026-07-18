---
name: vue-patterns
description: Build Vue apps well — the Composition API (ref/reactive/computed/watch), single-file components, props down / events up, composables for reusable logic, and reactivity gotchas. Use when building or reviewing a Vue 3 application.
category: engineering
keywords_vi: vue, vue 3, composition api ref reactive computed, single file component, props emit, composable, reactivity vue, framework frontend vue
---

# Vue Patterns

Vue is an approachable, reactive frontend framework. Vue 3's **Composition API** is the modern default for organizing component logic.

## Composition API

Inside `<script setup>`:
- **`ref(value)`** — reactive primitive; access/mutate via `.value` in JS (auto-unwrapped in templates).
- **`reactive(obj)`** — reactive object (don't destructure it — that breaks reactivity; use `toRefs` if you must).
- **`computed(() => ...)`** — derived, cached reactive value; recomputes only when dependencies change. Use it for derived state instead of methods that recompute every render.
- **`watch` / `watchEffect`** — run side effects when reactive sources change.
Composition API groups logic by *feature* (all the code for one concern together) rather than scattering it across Options API sections — better for complex components and reuse.

## Single-File Components

`.vue` files bundle `<template>`, `<script setup>`, and `<style scoped>`. **Scoped styles** keep CSS local to the component. Keep components focused; extract sub-components when they grow.

## Data Flow: Props Down, Events Up

- **Props** flow **down** (parent → child), and are **one-way / read-only** — a child must not mutate a prop (mutate a local copy or emit an event). Define props with types/defaults.
- **Events** flow **up** — a child `emit`s; the parent handles. This one-way data flow keeps state predictable (the same principle as React).
- For deep sharing, use `provide`/`inject` or a store (Pinia) rather than prop-drilling.

## Composables (reusable logic)

Extract reusable stateful logic into **composables** — functions named `useSomething()` that use Composition API internals and return reactive state/methods (`useMouse()`, `useFetch()`). This is Vue's answer to sharing logic across components (cleaner than mixins, which have naming collisions). The equivalent of React hooks.

## Reactivity Gotchas

- **Destructuring `reactive`** loses reactivity → use `toRefs`.
- **Forgetting `.value`** on refs in JS (templates auto-unwrap, script doesn't).
- Replacing a whole reactive object reference vs mutating it.
- Mutating props directly (won't propagate correctly and warns).

## Pitfalls

- **Mutating props** in a child.
- **Losing reactivity** by destructuring reactive objects.
- **Methods instead of `computed`** for derived state (no caching).
- **Prop drilling** deep trees instead of provide/inject or a store.
- **Fat components** — extract composables and sub-components.
- Overusing `watch` where `computed` would be cleaner.
