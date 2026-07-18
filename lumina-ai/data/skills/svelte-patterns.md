---
name: svelte-patterns
description: Build Svelte/SvelteKit apps well — reactivity (runes $state/$derived/$effect in Svelte 5, or reactive $: in 4), components and props, stores for shared state, SvelteKit routing/load functions/form actions, and SSR. Use when building or reviewing a Svelte or SvelteKit application.
category: engineering
keywords_vi: svelte, sveltekit, runes state derived effect, reactivity svelte, store svelte, load function form action, ssr sveltekit
---

# Svelte / SvelteKit Patterns

Svelte is a compiler-based UI framework — it compiles components to efficient imperative JS at build time (no virtual DOM runtime), so bundles are small and updates are surgical. SvelteKit is its full-stack app framework (routing, SSR, endpoints).

## Reactivity (the core idea)

Svelte's reactivity is its defining feature — assignments update the UI automatically.
- **Svelte 5 (runes)** — explicit, works everywhere: `let count = $state(0)` (reactive state), `let doubled = $derived(count * 2)` (computed), `$effect(() => {...})` (side effects reacting to dependencies). Runes are the modern model — clearer than the old magic.
- **Svelte 4** — `let count = 0` is reactive in a component; `$:` marks reactive statements (`$: doubled = count * 2`). Reassign to trigger updates (`arr = [...arr, x]`, not `arr.push()` alone).

## Components & Props

Components are `.svelte` files (script + markup + scoped styles). Props flow in (`export let x` in v4 / `let { x } = $props()` in v5). Styles are **scoped by default** (no leaking). Keep components focused; lift shared state to stores or parent.

## Stores / Shared State

For state shared across components: **stores** (`writable(0)`, subscribe with `$store` auto-subscription in markup) in v4, or `$state` in a module / context in v5. Don't overuse global stores — pass props where the tree is shallow; reserve stores for genuinely cross-cutting state (user, theme).

## SvelteKit

- **File-based routing** — `src/routes/blog/[slug]/+page.svelte` maps to URLs.
- **`load` functions** (`+page.js`/`+page.server.js`) fetch data for a route before render — `.server.js` runs only on the server (DB, secrets); universal runs both places.
- **Form actions** (`+page.server.js` `actions`) handle form POSTs with progressive enhancement (`use:enhance`) — works without JS, better with it.
- **Endpoints** (`+server.js`) build API routes.
- **SSR by default** (crawlable, fast first paint); configure prerendering/CSR per route.

## Pitfalls

- **Mutating without reassigning** (v4) — `arr.push(x)` alone won't update; reassign or use runes.
- **Overusing stores** for local state — prop-drill or context where simpler.
- **Putting secrets in universal `load`** — use `+page.server.js` for anything sensitive (secrets leak to the client otherwise).
- **`$effect` for derived values** (v5) — use `$derived` instead; effects are for side effects, not computation.
- Fighting SSR (accessing `window` at module top level breaks server render — guard with `onMount`/`browser`).
- Mixing Svelte 4 and 5 mental models in one codebase.
