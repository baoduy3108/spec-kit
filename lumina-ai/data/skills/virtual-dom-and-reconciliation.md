---
name: virtual-dom-and-reconciliation
description: How the virtual DOM and reconciliation work — describing UI as a lightweight tree, diffing new vs old to compute minimal real-DOM updates, the role of keys in lists, and why direct DOM manipulation is slow. Also covers the fine-grained-reactivity alternative. Use to understand the virtual DOM, React reconciliation, why keys matter, or why DOM updates are batched.
category: engineering
keywords_vi: virtual dom, reconciliation, dom ảo, diff so sánh, key trong list, mô tả ui dạng cây nhẹ, tại sao thao tác dom chậm, fine-grained reactivity
---

# Virtual DOM & Reconciliation

The virtual DOM is a technique (popularized by React) for updating the UI efficiently: instead of manually manipulating the slow real DOM, you describe **what** the UI should look like, and the framework figures out the **minimal changes** to make it so. Understanding it explains keys, re-renders, and performance. (See how-frontend-frameworks-work for the broader picture.)

## Why the Real DOM Is Slow

The browser DOM is a large, complex tree, and mutating it triggers **layout (reflow) and paint** (see how-browsers-work) — expensive operations. Doing many small, uncoordinated DOM changes (or rebuilding whole sections) causes jank. Directly, imperatively updating the DOM as data changes is error-prone and slow. The virtual DOM abstracts this away.

## The Core Idea

- Your components produce a **virtual DOM** — a lightweight JavaScript **tree of objects** describing the desired UI (cheap to create and manipulate in memory).
- When state changes, the framework builds a **new** virtual tree representing the new desired UI.
- **Reconciliation (diffing)** — it **compares** the new tree to the previous one and computes the **minimal set of real-DOM operations** needed to make the actual DOM match.
- It applies just those changes to the real DOM, **batched**.
So you write declarative "UI = f(state)" and the framework handles efficient updates — you never touch the DOM directly.

## Reconciliation & Keys

Diffing must be fast, so frameworks use heuristics: compare nodes by type and position, and assume same-type nodes in the same place are "the same" (update in place) rather than recreating. For **lists**, this is where **keys** matter: a stable, unique **`key`** per list item tells the diff algorithm which item is which across renders. Without keys (or with index keys on a reorderable list), the framework can't track identity — it may **rebuild** DOM nodes unnecessarily, lose input/focus state, or mis-associate data with elements. **Always give list items stable keys** (from data IDs, not array indices for dynamic lists).

## The Alternative: Fine-Grained Reactivity

The virtual DOM has overhead (building and diffing whole trees). Newer frameworks (SolidJS, Svelte, Vue's reactivity) skip it with **fine-grained reactivity/signals** (see state-management-patterns, svelte-patterns): they track *exactly* which pieces of DOM depend on which state, and update **only those** directly when the state changes — no diffing a whole tree. Often faster and lighter. The virtual DOM's advantage remains its simple mental model and ecosystem (React).

## Pitfalls (in understanding/using)

- **Missing or index-based keys** on dynamic lists → wrong updates, lost input/focus, subtle bugs, wasted DOM work. Use stable IDs.
- Assuming the virtual DOM makes everything fast — **unnecessary re-renders** (whole subtrees rebuilding on every state change) still hurt; memoize and structure state to limit re-render scope.
- Manually manipulating the real DOM behind the framework's back → it fights your changes.
- Creating new object/array/function references every render, defeating memoization → constant re-renders.
- Thinking the virtual DOM is inherently fastest — fine-grained reactivity often beats it; it's a trade-off.
- Huge lists without virtualization (rendering thousands of nodes) — diffing/DOM still can't be free; windowing helps.
