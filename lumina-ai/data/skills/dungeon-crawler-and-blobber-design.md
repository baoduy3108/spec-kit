---
name: dungeon-crawler-and-blobber-design
description: Dungeon crawler and grid-based "blobber" design — grid/tile movement, mapping and navigation, party as a single unit, encounter and trap design, loot and progression, and the tension of exploration into the unknown. Use when designing a dungeon crawler, grid-based RPG (blobber), or exploration-and-loot dungeon game.
category: design
keywords_vi: dungeon crawler và blobber ô lưới, di chuyển theo ô grid tile movement, lập bản đồ và điều hướng mapping navigation, cả tổ đội là một khối party blob, thiết kế trận và bẫy encounter trap, chiến lợi phẩm và tiến trình loot progression, căng thẳng khám phá vào chỗ chưa biết
---

# Dungeon Crawler & Blobber Design

Dungeon crawlers focus on **exploring dungeons, fighting monsters, and gathering loot**. The classic "blobber" subgenre (Wizardry, Etrian Odyssey, Legend of Grimrock) moves a whole party as a single unit through a **grid-based** maze in first-person. The appeal is methodical exploration, mapping, and the tension of descending deeper into danger for reward.

## Grid-Based Movement

The traditional structure is **tile-by-tile, 90-degree-turn movement** through a grid:
- Movement is discrete and deliberate — step forward one tile, turn, step. This methodical pace suits careful exploration and (in turn-based blobbers) tactical thinking.
- The grid makes **spatial puzzles** natural (pressure plates, teleporters, hidden passages, one-way doors) and makes navigation itself a challenge.
- Real-time blobbers (Grimrock) add timing/reflex to the grid; turn-based ones (Etrian) make each step a considered move.

## Mapping & Navigation

A signature pleasure: **making sense of a maze**:
- **Mapping** — classic crawlers had players *draw their own maps* (Etrian made this a core mechanic on a second screen). Even with auto-maps, spatial orientation and discovery are central.
- **Navigation challenges** — twisting layouts, dark areas, tricks (spinners that turn you, teleport traps, invisible walls) test the player's mental model of the space.
- The joy is turning a confusing unknown into a understood, mapped, conquered space.

## The Party as a Blob

In blobbers, the whole **party occupies one tile and moves as a unit** ("the blob"), facing one direction:
- **Formation** — front-row melee, back-row ranged/casters; positioning within the party matters for who takes hits and who can attack.
- The party is built and managed as a team (classes, roles — see rpg-systems-and-progression), but moves and is threatened as a single entity.
- This abstraction keeps focus on party composition and encounters rather than individual unit movement (unlike tactics games).

## Encounters & Traps

- **Combat encounters** — often turn-based against monster groups; positioning, resource management (spells, healing), and party synergy. Random or fixed encounters pace the danger.
- **Traps and hazards** — dungeons are dangerous: damage tiles, ambushes, puzzle-locks. Careful, cautious play is rewarded; recklessness is punished.
- **Difficulty and attrition** — resource depletion (HP, spell points) over a dungeon delve creates the "how deep dare I go before retreating?" tension.

## Loot & Progression

The reward engine:
- **Loot** — treasure, gear, and gold as the payoff for delving; better equipment enables deeper exploration (see inventory-and-item-systems, loot loops).
- **Character/party progression** — leveling, skills, class advancement over the crawl.
- **The delve loop** — descend, risk, gather, return to town to resupply/upgrade, delve deeper. Risk-reward of pushing further vs retreating with your haul is the core rhythm.

## Exploration Tension

The overarching feeling is **venturing into the unknown**:
- Descending into deeper, more dangerous levels; the dread and excitement of what's around the next corner.
- Resource scarcity and the threat of a party wipe (losing progress) raise stakes — pushing your luck vs playing it safe.
- Discovery — secrets, shortcuts, powerful items — rewards thorough exploration.

Design dungeon crawlers/blobbers around **methodical grid exploration** with satisfying **mapping and navigation puzzles**, a **party managed as a positioned blob**, tense **encounters and traps** punishing carelessness, a rewarding **loot-and-progression delve loop**, and the **risk-reward tension of descending deeper** into the unknown — turning the conquest of a maze into a rewarding, methodical adventure.
