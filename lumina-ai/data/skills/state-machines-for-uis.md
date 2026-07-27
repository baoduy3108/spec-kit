---
name: state-machines-for-uis
description: Modeling UI/app logic as an explicit finite state machine / statechart (à la XState) — enumerated states and allowed transitions on events — instead of a tangle of boolean flags (isLoading/isError/isOpen). Covers why explicit states make impossible states unrepresentable, guards/actions/context, hierarchical & parallel states, and when a machine is overkill. Use to tame complex UI logic, model flows/wizards, or understand statecharts/XState.
category: frontend
keywords_vi: máy trạng thái cho giao diện, statechart xstate, trạng thái tường minh và chuyển tiếp theo sự kiện, tránh mớ boolean cờ isloading iserror, loại bỏ trạng thái bất khả thi, guard action context
---

# State Machines for UIs

Complex UI logic tends to rot into a pile of booleans: `isLoading`, `isError`, `isSuccess`, `isOpen`, `isEditing`… With N booleans you have **2ᴺ combinations**, most of them **impossible or meaningless** (`isLoading && isError && isSuccess`?), yet your code has to defend against all of them. A **finite state machine / statechart** replaces that with a small set of **named states** and **explicit transitions**, so the impossible states literally **can't be represented** (see state-management-patterns, frontend-ui-engineering, agent-planning-patterns).

## The Model

- **States** — a finite, enumerated set the UI can be in: `idle → loading → success | failure`. It's in **exactly one** at a time (no contradictory booleans).
- **Events** — what can happen: `FETCH`, `RESOLVE`, `REJECT`, `RETRY`. The machine reacts to events.
- **Transitions** — for each state, which events are allowed and where they lead. An event that isn't valid in the current state is simply **ignored** (e.g. `RESOLVE` while `idle` does nothing) — killing a whole class of race-condition bugs.
- **Context** — the "extended state": quantitative data (input value, retry count) alongside the finite state.
- **Actions** — side effects fired on transitions (log, call API, focus input).
- **Guards** — conditions that must hold for a transition (`RETRY` only if `retries < 3`).

Statecharts (Harel / XState) add **hierarchy** (nested states) and **parallel** regions so big UIs stay manageable.

## Why It Wins

- **Impossible states unrepresentable** — you can't be loading *and* errored; the model forbids it.
- **Explicit, visualizable logic** — a statechart can be drawn/diagrammed; the whole behavior is inspectable, not scattered across handlers.
- **Race-safe** — stray/late events in the wrong state are ignored by design (no "resolved after it was cancelled" bugs).
- **Predictable & testable** — behavior = (state, event) → state; easy to unit-test and reason about.
- **Great for flows** — wizards, auth flows, media players, form submission, drag-and-drop.

## When It's Overkill

A button with one `isOpen` boolean doesn't need a machine. Reach for one when logic has **several interacting modes**, **async with cancel/retry**, or **"how did we get into this weird state?" bugs**. For trivial toggles, a boolean is fine.

## Design Guidance

- **Enumerate states first** — name the modes; if you're adding a 3rd boolean, consider a machine.
- **Model events, not setters** — think "what happened" (`SUBMIT`) not "set isSubmitting=true".
- **Let invalid events be no-ops** — don't handle every event in every state.
- **Keep finite state small; put data in context** — don't encode a counter as many states.
- **Use hierarchy/parallel** (statecharts) to avoid state explosion in big flows.
- **Visualize** the machine to review logic with the team.

## Pitfalls (in understanding/using)

- **Boolean soup** (`isLoading/isError/…`) → contradictory combos you must guard everywhere.
- Handling events **imperatively** across scattered callbacks → race conditions; centralize in the machine.
- Encoding **data** (counts, text) as extra **states** → state explosion; use context.
- Reaching for a machine on a **trivial toggle** → unnecessary ceremony.
- Forgetting **guards** → transitions fire when they shouldn't (retry forever).
- Not modeling the **cancelled/late** paths → "resolved after unmount" bugs.
