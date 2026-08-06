---
name: rts-and-strategy-design
description: Real-time strategy (RTS) design — economy and resource gathering, macro vs micro, build orders and tech trees, unit roles and counters (rock-paper-scissors), fog of war and scouting, map control and expansions, APM and decision density, and balancing asymmetric factions. Use when designing an RTS, base-builder, or real-time tactical game.
category: design
keywords_vi: thiết kế rts chiến thuật thời gian thực, kinh tế thu thập tài nguyên economy, vĩ mô so với vi mô macro micro, thứ tự xây build order cây công nghệ tech tree, vai trò đơn vị và khắc chế counter, sương mù chiến tranh trinh sát fog of war, kiểm soát bản đồ mở rộng, cân bằng phe bất đối xứng
---

# RTS & Strategy Design

Real-time strategy games are about **managing an economy and army simultaneously, in real time, under incomplete information**. The genre's depth comes from the constant tension between building up (economy/tech) and acting now (army/aggression), with no pause to think. Designing one means balancing many interacting systems into a fair, deep contest.

## Economy: The Foundation

Everything flows from resource **gathering**: workers harvest, resources buy units/buildings/tech. The core strategic decision is **investment allocation** — spend on economy (more workers/expansions → stronger later) or army (units now → pressure/defense)? This **eco-vs-army** tension is the heart of RTS macro. Expansions (new resource bases) are high-value but vulnerable, creating map-control stakes.

## Macro vs Micro

- **Macro** — the big picture: economy, production, tech, when to expand, army composition. Good macro means never being "supply-blocked" or sitting on unspent resources; the economy hums.
- **Micro** — moment-to-moment unit control in battle: focus-fire, kiting, spellcasting, positioning. Skilled micro can win a fight against superior numbers.

Great RTS rewards *both*, and the challenge of doing them at once (attention as a resource) creates the skill ceiling. **Decision density** — meaningful choices per minute — defines how engaging it feels.

## Build Orders & Tech Trees

- **Tech tree** — buildings/upgrades unlock in a dependency graph, gating stronger units behind investment. It shapes pacing (rush cheap early units vs teching to powerful late ones).
- **Build orders** — optimized opening sequences (like chess openings) that players learn; the design should support *multiple* viable openings (aggressive, economic, tech) so the metagame isn't solved.

## Units: Counters & Composition

The combat backbone is **rock-paper-scissors**: unit types counter each other (anti-air beats fliers, cheap swarm beats expensive splash-vulnerable, etc.). No unit is universally best, so **army composition** must adapt to what the opponent builds. This counter web (informed by scouting) is what makes RTS a mind-game, not just a numbers race.

## Fog of War & Information

**Fog of war** hides the enemy, making **scouting** a core skill — you act on incomplete, inferred information. This creates bluffing, timing attacks, and the constant question "what are they doing?" Information is itself a resource; denying it (killing scouts) and gathering it are strategic acts. Without fog, RTS becomes solved calculation; with it, it's a psychological duel.

## Map & Positioning

- **Map control** — holding territory, chokepoints, high ground, and expansions. Terrain shapes engagements.
- **Timing & tempo** — attack when you have a momentary advantage (a tech/army spike before the opponent catches up); "timing pushes" are a core strategic weapon.

## Balancing

RTS balance is famously hard — many units, tech paths, and often **asymmetric factions** (different races that play distinctly but must be equally viable). Approaches:
- **Counters over raw power** — every strategy has an answer.
- **Cost/effectiveness curves**, soft counters, and diminishing returns to prevent a single dominant "deathball".
- **Data + high-level play** — win rates by faction/matchup/strategy; patch to preserve *diversity* and counterplay, chasing balance across skill levels (pro vs casual differ).

Design RTS around the **eco-vs-army tension, a counter-based unit web under fog of war, and macro+micro demands** — asymmetric-but-fair factions on maps that reward positioning. The result is a genre where economy, tactics, information, and psychology collide in real time.
