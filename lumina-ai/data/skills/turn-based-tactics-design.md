---
name: turn-based-tactics-design
description: Turn-based tactics design — grid movement and positioning, action economy (move/action per unit), cover and flanking, hit chance and the RNG debate, unit classes and abilities, initiative/turn order, mission design, and permadeath tension. Use when designing a turn-based tactics game (XCOM-like), grid combat, or squad tactical systems.
category: design
keywords_vi: chiến thuật theo lượt, turn based tactics, di chuyển ô lưới, vật che đánh sườn, flanking, tỉ lệ trúng rng, action economy hành động mỗi lượt, lớp đơn vị kỹ năng, chết vĩnh viễn permadeath
---

# Turn-Based Tactics Design

Turn-based tactics (XCOM, Fire Emblem, Into the Breach) put players in command of a squad on a grid, taking turns to move and act. Without real-time pressure, the depth is **pure decision-making** — positioning, resource allocation, and reading the board. It's chess with classes, cover, and (often) permadeath stakes.

## Grid & Positioning

Combat plays out on a **grid** (square or hex) where **position is everything**:
- **Range, line-of-sight, and terrain** make *where* a unit stands a critical decision.
- **Cover** — tiles that reduce incoming hit chance/damage (full vs half cover). Moving cover-to-cover is core play; being caught in the open is deadly.
- **Flanking** — attacking from an angle that negates the target's cover, hugely increasing effectiveness. This makes positioning a two-way puzzle: protect your flanks while flanking them. **High ground** and elevation add bonuses.

The board is a spatial puzzle where good positioning wins fights before dice are rolled.

## Action Economy

Each unit gets limited actions per turn — the **action economy**:
- Typically **move + action** (shoot, ability, overwatch), or action points to spend. Deciding how to spend each unit's turn across the squad is the core optimization.
- **Tempo** — doing more with fewer actions (an ability that hits multiple enemies, a free move) is advantage. Action denial (stun, immobilize) is powerful.
- The scarcity of actions makes every turn a set of meaningful trade-offs.

## Hit Chance & the RNG Debate

Most tactics games use **percentage hit chances** (based on range, cover, aim):
- **Randomness** adds tension and drama (the missed 95% shot is infamous) but can feel *unfair* — a good decision punished by dice.
- **The design debate**: probabilistic (XCOM — tense, sometimes feels cheap) vs **deterministic** (Into the Breach — perfect information, pure puzzle, no bad-luck losses). Deterministic tactics shift the challenge entirely to *planning*; probabilistic ones test risk management.
- Mitigations: hidden "streak-breaker" fudging, showing true odds, guaranteed-damage abilities, or embracing determinism. Choose based on whether you want *drama* or *fairness*.

## Units, Classes & Abilities

- **Unit classes/archetypes** — each with distinct roles, stats, and **abilities** (sniper, heavy, medic, tech). Team composition and synergy matter (see rpg-systems for progression).
- **Abilities** create tactical richness — area effects, buffs, control, mobility — turning combat into a puzzle of combining tools.
- **Progression** — units level up, gain abilities/gear, and (with permadeath) become *invested-in* individuals.

## Turn Order & Initiative

- **Whole-side turns** (all your units, then all enemies) — the common structure, emphasizing squad-wide planning.
- **Initiative/interleaved** (units act in a speed order) — adds a timing/speed layer.
- **Overwatch/reaction** — reserving an action to fire on enemy movement adds interaction *during* the opponent's turn, creating tension in advances.

## Mission Design & Stakes

- **Objectives** beyond "kill all" — escort, defend, extract, timers — force different tactics and prevent turtling. **Turn limits** especially push aggression and prevent slow, safe play.
- **Permadeath** — losing a unit permanently (Fire Emblem, XCOM Ironman) makes every decision weighty; attachment to leveled units raises stakes enormously. It's the genre's signature tension (with optional relaxed modes for accessibility).
- **Fog of war / scouting** and enemy reinforcements add information tension.

## Difficulty & Depth

- Challenge from **smart enemy AI, meaningful objectives, and resource scarcity** — not just stat inflation.
- **Solvable-but-deep** — great tactics reward planning and reading the board; the best moments are clever multi-unit combos that turn a losing position around.

Design turn-based tactics around **positioning on a grid (cover, flanking, elevation)**, a tight **action economy** of meaningful choices, a deliberate stance on **hit-chance RNG vs determinism**, **distinct unit classes and abilities**, and **objective-driven missions with real stakes** (permadeath) — creating a pure decision-making puzzle where victory is earned by thinking, not reflexes.
