---
name: react-patterns
description: Build correct, performant React — hooks rules, state colocation and lifting, the useEffect dependency/cleanup trap, keys in lists, derived vs stored state, memoization (when it actually helps), controlled inputs, and data-fetching patterns. Use when writing or debugging React components (stale state, infinite re-renders, effect misuse).
category: engineering
keywords_vi: react, react hooks, useeffect, usestate, component re-render, react bị render lại nhiều, key trong list react, quản lý state react
---

# React Patterns

React re-renders when state/props change; most bugs are about *what* is state, *where* it lives, and *when* effects run.

## State

- **Colocate state** — keep it in the lowest component that needs it; **lift it up** only to the nearest common ancestor when siblings must share. Global state (context/store) is a last resort, not a default.
- **Derived state shouldn't be stored** — if a value can be computed from props/state during render, compute it; don't mirror it into `useState` and sync with an effect (a classic bug source).
- **State updates are async and batched** — don't read state right after `setState`. Use the **functional updater** (`setCount(c => c + 1)`) when the new value depends on the old, especially in loops/handlers.
- Treat state as **immutable** — create new objects/arrays (`{...obj, x}`, `[...arr]`); mutating in place won't re-render.

## Hooks Rules

- Call hooks **only at the top level**, same order every render — never in conditionals/loops.
- **`useEffect` is for synchronizing with outside systems** (subscriptions, timers, non-React widgets, fetching), not for reacting to state to set other state.
  - **Dependency array**: include every value from the render scope the effect uses. Missing deps → stale closures; wrong deps → infinite loops. An empty `[]` means "run once on mount."
  - **Return a cleanup** for anything that needs teardown (unsubscribe, clearInterval, abort fetch) — it runs before re-run and on unmount.

## Rendering & Performance

- **Keys in lists** must be stable, unique IDs — never the array index for dynamic lists (causes state/DOM mismatches on reorder/delete).
- **Don't memoize prematurely** — `useMemo`/`useCallback`/`React.memo` have a cost. Reach for them for genuinely expensive computes or to stabilize props to memoized children; measure first.
- Avoid creating new object/array/function props inline when they feed memoized children (they break memoization).

## Common Bugs

- **Infinite re-render** — setting state unconditionally in render, or an effect whose deps it also updates.
- **Stale value in a callback** — a closure captured an old state; use the functional updater or a ref.
- **Controlled input not updating** — value bound to state but no `onChange` writing it back.
- **Fetch race conditions** — a slow earlier request resolves after a newer one; abort on cleanup or ignore stale responses. Prefer a data-fetching library for caching/dedup in real apps.
