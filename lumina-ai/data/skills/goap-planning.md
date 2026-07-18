---
name: goap-planning
description: Goal-Oriented Action Planning (GOAP) — a classic game-AI (and agent) technique where an agent is given a goal, a set of actions with preconditions and effects, and searches for a sequence of actions that reaches the goal, replanning when the world changes. Use to understand flexible AI agent behavior, NPC decision-making, or planning as an alternative to hardcoded logic.
category: ai-agent
keywords_vi: goap, goal oriented action planning, lập kế hoạch ai game, npc quyết định, action precondition effect, tìm chuỗi hành động đạt mục tiêu, replanning, planner
---

# Goal-Oriented Action Planning (GOAP)

GOAP is a decision-making architecture (from game AI, applicable to agents generally) where instead of scripting *what to do*, you define a **goal** and a toolbox of **actions**, and a **planner** figures out the sequence of actions to reach the goal. It produces flexible, emergent behavior without a giant hand-coded decision tree.

## The Pieces

- **World state** — a set of facts about the current situation (`hasWeapon=false`, `enemyVisible=true`, `atCover=false`).
- **Goal** — a desired world state (`enemyDefeated=true`).
- **Actions** — each has **preconditions** (facts that must be true to do it) and **effects** (how it changes the world state), plus a cost. E.g. `AttackEnemy` requires `hasWeapon=true` and `enemyInRange=true`, and its effect is `enemyDefeated=true`; `PickUpWeapon` has effect `hasWeapon=true`.
- **Planner** — searches (typically A*, see shortest-paths) through the space of action sequences to find the **cheapest chain of actions** whose preconditions/effects lead from the current state to the goal (e.g. `MoveToWeapon → PickUpWeapon → MoveToEnemy → AttackEnemy`).

## Why It's Powerful

- **Decoupled design** — you add a new action (with its preconditions/effects) and the planner automatically weaves it into plans where useful; you don't rewire a decision tree. Behavior *emerges* from the available actions.
- **Flexible & reactive** — the same goal produces different plans in different situations (no weapon → go get one first; already armed → attack directly).
- **Replanning** — when the world changes (the weapon is destroyed, a new threat appears), the agent **replans** from the new state rather than being stuck on a stale script. This adaptivity is the whole point.

## Where It's Used

Game NPC/enemy AI (the classic use — F.E.A.R. popularized it), robotics, and any **autonomous agent** that must choose action sequences toward goals in a changing environment. It's a form of **automated planning** — the same idea underlies AI agents that plan tool-use sequences toward a goal (relevant to LLM agents: goal + available actions/tools + a planner).

## GOAP vs Alternatives

- **Finite State Machines / behavior trees** — explicit, predictable, but rigid; you script every transition, and complexity explodes as behaviors grow.
- **GOAP** — you declare goals and actions; the planner composes behavior. More flexible and scalable for rich behavior, but harder to predict/debug and more compute (planning search) than a simple state machine.
Choose GOAP when you want emergent, adaptive behavior from composable actions; a state machine/behavior tree when behavior is simple and predictability matters.

## Pitfalls / Notes

- **Planning cost** — the search can be expensive with many actions; cache/limit plan depth, replan only when needed.
- **Precondition/effect design** — get these wrong and the planner produces nonsense or finds no plan; they're the contract the whole system rests on.
- **Unpredictability/debugging** — emergent behavior is harder to test than scripted; provide fallbacks when no plan is found.
- **Cost tuning** — action costs shape which plans win; tune them to get sensible behavior.
