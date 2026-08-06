---
name: tower-defense-and-wave-design
description: Tower defense and wave-based design — pathing and maze mechanics, tower roles and upgrade trees, enemy types and counters, wave pacing and escalation, economy and placement decisions, damage types/resistances, and the risk-reward of spending vs saving. Use when designing a tower defense game, wave survival mode, or enemy-wave encounter pacing.
category: design
keywords_vi: thiết kế tower defense và đợt tấn công wave, đường đi và mê cung pathing maze, vai trò tháp và cây nâng cấp tower upgrade, loại kẻ địch và khắc chế counter, nhịp đợt và leo thang escalation, kinh tế và quyết định đặt tháp placement, loại sát thương kháng, tiêu hay để dành risk reward
---

# Tower Defense & Wave Design

Tower defense (TD) is a strategy genre of **spatial planning under escalating pressure**: place defenses along a path to stop waves of advancing enemies. Its depth comes from the interplay of positioning, economy, and enemy variety — and its pacing lives in how **waves** escalate. The same wave-design craft applies to any wave-survival mode.

## Pathing: The Spatial Puzzle

The path enemies travel is the board:
- **Fixed-path TD** — enemies follow a set route; you place towers along it to maximize coverage. Design is about which chokepoints and corners are valuable.
- **Maze/open TD** — players *build the path* by placing towers as walls, routing enemies through a maze of their own making — deep optimization (longest path = most exposure), but needs pathfinding that can't fully block the exit (see how-pathfinding-in-games-works).
- **Coverage & chokepoints** — corners and long straights are prime tower real estate; the core decision is where each tower's range does the most work.

## Towers: Roles & Upgrades

Variety of towers creates strategy through **specialization**:
- **Roles** — single-target snipers, area/splash (for groups), slow/support (crowd control, buffs), chip/DoT. No one tower does everything; you compose a defense.
- **Upgrade trees** — invest in a few towers vs spread out (tall vs wide); branching upgrades let one tower specialize (range vs damage vs utility). This is a recurring economic decision.
- **Synergy** — slow towers make damage towers land more; buffs multiply nearby towers. Positioning for synergy is expert play.

## Enemies: Types & Counters

Waves mix enemy types that **demand different answers**, so no single defense wins:
- **Fast** (rush past slow towers), **tanky** (soak single-target), **swarm** (punish non-AoE), **flying** (bypass ground-only), **armored/shielded** (resist certain damage), **healers/regen**, **bosses**.
- **Damage types & resistances** — physical/magic/etc. with resistances create a rock-paper-scissors: the wave composition tells the player what to build. This counter-play is what keeps players adapting rather than building one optimal setup.

## Wave Pacing & Escalation

Waves are the game's **rhythm and difficulty curve**:
- **Escalation** — each wave is harder (more/tougher/new enemies), pressuring the player to keep upgrading. The curve should rise steadily with spikes (boss waves) and brief breathers.
- **Introduce → combine** — a new enemy type appears in isolation (learn its counter), then returns mixed with others (apply it under pressure).
- **Telegraph** — show the next wave's composition so players can prepare (build the right counters) — informed planning is the fun; blind surprise is frustrating.
- **Prep phases** — downtime between waves to build/upgrade, or continuous pressure for tension. Optional early-call ("start next wave now") rewards confident play with bonus economy.

## Economy: The Core Tension

TD is a constant **spend-now vs save-for-later** decision:
- **Income** — from kills, interest, or per-wave. Enough to grow, scarce enough that every purchase is a real choice.
- **Risk-reward** — save to afford a powerful tower/upgrade (but risk leaking this wave), or spend now for safety (but scale slower). This tension is the heart of TD strategy.
- **Placement is permanent-ish** — towers cost to sell/move, so commitment matters; misplacement is a real setback.
- **Lives/leak budget** — letting a few enemies through may be acceptable; total defense isn't always optimal, adding decisions about *how much* to defend.

## Balancing

Tune the triangle of **enemy stats ↔ tower power ↔ economy** so that: skilled placement beats brute spending, multiple strategies are viable, no single tower dominates, and difficulty ramps to a satisfying knife's-edge by the final waves. Playtest for leak rates per wave and flag waves that are trivial or impossible.

Design TD around **meaningful spatial placement, specialized towers countered by varied enemies, telegraphed escalating waves, and a tight economy of spend-vs-save** — and simple "place towers, stop enemies" becomes a rich optimization players replay endlessly.
