---
name: game-ai-behavior
description: How game AI drives NPC behavior — finite state machines, behavior trees, and utility AI for decision-making, plus why game AI optimizes for being fun/believable rather than optimal. Use to design NPC/enemy AI, choose FSM vs behavior tree vs utility AI, or make believable game agents.
category: engineering
keywords_vi: game ai npc behavior, hành vi npc kẻ địch, finite state machine fsm, behavior tree cây hành vi, utility ai ra quyết định, ai vui và đáng tin thay vì tối ưu, đáng tin believable
---

# Game AI and NPC Behavior

Game AI makes NPCs and enemies **act believably** — patrolling, chasing, fleeing, taking cover, making decisions. Crucially, unlike academic AI, game AI's goal is **fun and believability, not optimality**: an enemy that plays perfectly is frustrating and unfun. The main tools for structuring behavior are **finite state machines**, **behavior trees**, and **utility AI** (see how-pathfinding-in-games-works, game-design-fundamentals).

## The Goal: Fun, Not Optimal

A key mindset shift: a "perfect" AI (never misses, always makes the best move) usually makes a **worse game** — it's unfair and no fun. Good game AI is **tuned to be beatable, readable, and interesting**: enemies telegraph attacks, make deliberate "mistakes," and behave predictably enough that players can learn and outsmart them. Believability (does it *look* smart?) matters more than actual optimality. Sometimes the AI even **cheats subtly** (extra info) — that's fine if it makes the game better and isn't obvious.

## Finite State Machines (FSM)

The classic approach: the NPC is in one **state** (Patrol, Chase, Attack, Flee, Search) with **transitions** triggered by conditions (see player → Chase; lost player → Search; low health → Flee).
- **Pros** — simple, intuitive, easy to debug for **simple** agents.
- **Cons** — **state explosion**: as behaviors grow, the transitions between many states become a tangled, unmaintainable web (N states → up to N² transitions). Great for a handful of states, painful beyond that.

## Behavior Trees (BT)

The modern industry standard for complex AI. A **tree** of nodes evaluated each tick:
- **Composite nodes** — **Sequence** (do children in order until one fails — "AND") and **Selector/Fallback** (try children until one succeeds — "OR").
- **Leaf nodes** — **conditions** (is player visible?) and **actions** (move to cover, shoot).
- The tree is **re-evaluated** regularly, flowing down to pick the current action.
- **Pros** — **modular, reusable, scalable**: subtrees compose, priorities are clear (order in a Selector), and adding behavior doesn't explode transitions like an FSM. Much easier to author complex, layered behavior.
- **Cons** — more upfront structure; can be less obvious for trivial agents.

## Utility AI

Instead of hard rules, **score** each possible action with a **utility function** (based on the situation — health, distance, ammo, threat) and pick the **highest-scoring** one.
- **Pros** — smooth, emergent, context-sensitive decisions; easy to add new considerations; great for agents balancing many competing goals (The Sims-style).
- **Cons** — tuning the scoring curves is fiddly, and behavior can be **harder to predict/debug** (why did it choose that?).

## Choosing

- **FSM** — few, distinct states; simple enemies.
- **Behavior tree** — complex, layered behavior needing modularity (most action-game enemies, the default at scale).
- **Utility AI** — agents weighing many competing factors, wanting emergent/nuanced choices.
- Often **combined** (a BT whose leaves use utility scoring; states that contain BTs).

## Design Guidance

- **Tune for fun, not optimal** — telegraphs, reaction delays, deliberate imperfection; make it beatable and readable.
- **Behavior trees** for anything beyond a few states (avoid FSM state explosion).
- **Make behavior readable** — players should sense the AI's "intent" to feel smart for countering it.
- **Combine with pathfinding/steering** (see how-pathfinding-in-games-works) for movement.
- **Debug-visualize** the AI's current state/decision — invaluable for tuning.
- **Cheat sparingly and invisibly** if it improves the experience.

## Pitfalls (in understanding/using)

- Making AI **optimal/unbeatable** → frustrating and unfun; tune for a good challenge.
- **FSM state explosion** for complex behavior → unmaintainable transition tangle; use a behavior tree.
- **Unreadable** AI (no telegraphs) → players feel cheated rather than outplayed.
- **Obvious cheating** → players notice and feel it's unfair (subtle is fine, blatant isn't).
- Utility curves left **untuned** → erratic or dithering behavior; tune and add hysteresis.
- No way to **visualize/debug** decisions → AI bugs are miserable to diagnose.
- Forgetting AI must **cooperate with pathfinding** → smart decisions but dumb movement.
