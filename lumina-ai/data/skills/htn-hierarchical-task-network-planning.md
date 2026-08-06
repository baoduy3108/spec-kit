---
name: htn-hierarchical-task-network-planning
description: Hierarchical Task Network (HTN) planning for game AI — decomposing high-level compound tasks into primitive actions via methods, preconditions, a running world state, and replanning. Covers HTN vs GOAP vs behavior trees, method selection, task decomposition, and why HTN gives authored, predictable yet flexible NPC plans. Use to design HTN AI, decompose goals into task hierarchies, or choose HTN vs GOAP for NPC decision-making.
category: game-dev
keywords_vi: htn, hierarchical task network, phân rã nhiệm vụ phân cấp, compound task và primitive task, method chọn cách phân rã, planner phân cấp game ai, htn so với goap, decompose mục tiêu thành hành động, npc lập kế hoạch phân cấp, world state trong htn
---

# HTN (Hierarchical Task Network) Planning for Game AI

HTN is a planning technique for NPC AI that builds a plan by **decomposing high-level tasks into smaller ones** until everything is a concrete action. Unlike GOAP (which searches action space toward a goal), HTN follows an **authored hierarchy** — giving designers more control while keeping flexibility (see goap-planning, game-ai-behavior).

## Tasks: Compound vs Primitive

- **Primitive task** — a concrete, executable action with **preconditions** and **effects** on the world state: `Attack(target)`, `MoveTo(pos)`, `Reload()`. The leaves of a plan.
- **Compound task** — a high-level task that can't run directly; it must be **decomposed**. `AttackEnemy`, `Patrol`, `TakeCover`.
- **Method** — one *way* to accomplish a compound task: a **precondition** + an ordered list of subtasks. A compound task has several methods, tried in priority order.

Example: `AttackEnemy` might have methods —
1. *(if has ammo)* → `[AimAt(enemy), Fire]`
2. *(if enemy close)* → `[MoveTo(enemy), Melee]`
3. *(else)* → `[MoveToCover, Reload]`

## The Planning Loop

1. Start with a **root task** (the NPC's current goal) and the **current world state** (a compact set of facts: `hasAmmo`, `enemyVisible`, `health`).
2. **Decompose**: pick the first method whose precondition holds; replace the compound task with its subtasks.
3. Recurse until the plan is a **flat list of primitive tasks**. Apply each primitive's *effects to a copy* of the world state as you plan, so later preconditions see the projected state.
4. If a method's subtasks can't be satisfied, **backtrack** and try the next method.
5. Output: an ordered **plan** of primitive actions. Execute them; **replan** when the world changes or a step fails.

## HTN vs GOAP vs Behavior Trees

- **HTN** — *authored decomposition*: designers encode **how** tasks break down. Predictable, debuggable, scales to complex layered behavior; less "emergent" than GOAP. Great when you want expert-authored plans (F.E.A.R.-style, many AAA NPCs use HTN).
- **GOAP** — *searches* action space from a goal; more emergent/flexible, but harder to predict/control (see goap-planning).
- **Behavior trees** — reactive, no lookahead planning; simpler but can't reason about action sequences toward a goal (see game-ai-behavior).
- Rule of thumb: **behavior trees** for reactive, **HTN** for authored multi-step plans, **GOAP** for emergent problem-solving.

## Practical Notes

- Keep the **world state small and cheap** to copy (planning applies effects speculatively).
- **Method order = priority** — put preferred/most-specific methods first.
- **Replan triggers** — plan invalidated when a precondition breaks mid-execution (enemy died, out of ammo); replanning is cheap because the hierarchy prunes the search.
- Partial-order/interleaving and sensors feeding the world state are common extensions.

Design HTN game AI by modeling behavior as **compound tasks decomposed via prioritized methods into primitive actions**, planning by **recursively decomposing** the root task against a projected **world state** (backtracking when a method fails) to produce an ordered plan, then **replanning** when the world changes. Choose HTN when you want **authored, predictable-yet-flexible** multi-step NPC plans — between reactive behavior trees and emergent GOAP.
