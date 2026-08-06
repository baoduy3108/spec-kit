---
name: real-time-tactics-design
description: Real-time tactics (RTT) design — combat without base-building or economy, positioning and cover, unit abilities and micro, flanking and line-of-sight, small squads, and the pause-and-plan option. Distinct from RTS (no macro/economy). Use when designing a real-time tactics game (Company of Heroes, Commandos), squad tactical combat, or micro-focused real-time battles.
category: design
keywords_vi: chiến thuật thời gian thực real time tactics rtt, không xây căn cứ không kinh tế, vị trí và vật che positioning cover, kỹ năng đơn vị và điều khiển micro, đánh sườn và tầm nhìn flanking line of sight, tổ đội nhỏ small squad, tạm dừng để lên kế hoạch pause and plan
---

# Real-Time Tactics (RTT) Design

Real-time tactics is the **combat half of strategy** without the economy: you command a small force in real time, and winning is purely about **positioning, abilities, and micro** — not gathering resources or building bases. It's the tactical intensity of an RTS battle, distilled into its own genre (Company of Heroes, Commandos, Desperados).

## RTT vs RTS: The Key Distinction

Unlike RTS (see rts-and-strategy-design), real-time tactics **removes base-building and resource-gathering**:
- **No macro economy** — you don't harvest, build production, or grow an army mid-battle. You're given a **fixed or slowly-reinforced force** and must win with it.
- All focus goes to **tactical execution** — every unit matters, every decision is combat-relevant. Losing a unit is a real, often permanent, blow (no cheap reproduction).
- This makes RTT more deliberate and chess-like in battle, less about spinning economic plates.

The genre trades RTS breadth for tactical depth.

## Positioning & Cover

Because forces are small and precious, **where units stand is everything**:
- **Cover** (Company of Heroes' iconic system) — terrain that reduces incoming damage; moving cover-to-cover, suppressing enemies out of cover, and denying good positions is core play.
- **Flanking & line-of-sight** — hitting enemies from the side/rear negates cover and boosts damage; controlling sightlines and using terrain/elevation wins engagements before shots trade.
- **High ground, chokepoints, concealment** — the battlefield's geometry drives tactics.

Positioning skill, not unit quantity, decides RTT fights.

## Micro & Abilities

- **Micro-management** — actively controlling units in combat: kiting, focus-firing, retreating damaged units, using terrain. High-APM tactical control is the skill expression.
- **Unit abilities** — grenades, suppression, smoke, special weapons, stealth (Commandos-style) — a toolkit to solve tactical problems. Combining abilities across a squad is the depth.
- **Reinforcement/reactive systems** — some RTT lets you call limited reinforcements or use off-map support, adding resource-lite decisions.

## Small Squads & Stakes

- **Small, specialized forces** — a handful of distinct units (each with a role), so each is individually valuable and micromanageable. You *know* your units.
- **High stakes per unit** — losses hurt and often persist; caution and clever play are rewarded over zerg-rushing. This makes every engagement tense and deliberate.
- **Mission-based** — usually structured as tactical scenarios/objectives rather than endless skirmish, emphasizing puzzle-like problem-solving.

## Pause-and-Plan

Many RTT games (and the related **RTwP** — real-time-with-pause of tactical RPGs) offer an **active pause** to issue orders, queue abilities, and plan:
- This lets players handle the complexity of micromanaging a squad without twitch pressure — think, then execute.
- It bridges real-time intensity with turn-based deliberation, letting positioning and ability-combos be planned carefully. A defining accessibility/depth feature for the genre.

Design real-time tactics by **stripping economy/base-building to focus purely on combat**, making **positioning and cover** decisive, rewarding **micro and ability combos** with **small, high-stakes squads**, and offering **pause-and-plan** to manage tactical complexity — creating deliberate, chess-like real-time battles where skillful maneuvering, not economic buildup, wins.
