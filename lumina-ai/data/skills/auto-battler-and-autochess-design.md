---
name: auto-battler-and-autochess-design
description: Auto-battler and auto-chess design — the shop/economy/positioning loop, auto-resolving combat, synergies and traits, gold and interest economy, the reroll gamble, board positioning, and the round-robin/health tournament structure. Use when designing an auto-battler, auto-chess, or drafting-and-synergy round-based game.
category: design
keywords_vi: thiết kế auto battler và auto chess, vòng lặp mua sắm kinh tế đặt quân shop economy positioning, chiến đấu tự động auto resolve combat, cộng hưởng và tộc hệ synergy trait, vàng và lãi suất kinh tế interest, đánh bạc reroll làm mới, đặt vị trí quân trên bàn board positioning, cấu trúc vòng tròn và máu tournament
---

# Auto-Battler & Auto-Chess Design

Auto-battlers (auto-chess) are a genre where you **build a team, then watch it fight automatically**. The player's skill is entirely in *preparation* — drafting units, building synergies, managing economy, and positioning — not in controlling the battle. It distilled the pre-combat strategy of MOBAs/RTS into its own deeply strategic, low-APM form.

## The Core Loop

Each round repeats a **prepare → auto-fight → adapt** cycle:
1. **Shop phase** — a randomized shop offers units to buy with gold. Draft your team, upgrade units (combining copies), and position them on your board.
2. **Combat phase** — your team **auto-battles** an opponent's team with no player input. You watch the result of your preparation.
3. **Aftermath** — win or lose (losing costs health); adapt your build for next round based on what you saw and what's available.

All the strategy is front-loaded into the shop phase; combat is the *test* of your decisions, not a skill in itself.

## Synergies & Traits

The heart of team-building is **synergies** — units share **traits/classes**, and fielding enough of a trait unlocks powerful bonuses:
- Combining units for overlapping synergies creates emergent power spikes ("3 mages + 2 knights" activating both bonuses).
- **Drafting toward synergies** while staying flexible to what the shop offers is the core puzzle. Committing early vs staying open is a key tension.
- The combinatorial space of trait combinations gives enormous strategic depth and repl*ability* from simple parts.

## The Economy: Gold & Interest

A deep **economic minigame** underpins everything:
- **Gold** from rounds buys units and rerolls.
- **Interest** — often you earn bonus gold for *saving* (e.g. +1 per 10 held), creating a **greed vs need** tension: hoard for compounding interest and a big future spike, or spend now to stay alive/strong.
- **Win/loss streaks** grant bonus gold — so *deliberately* losing (loss-streaking) to build economy can be a viable strategy.
- **Leveling** (buying XP to field more units) competes with saving and rerolling for gold. Managing this economy is often what separates good players from great.

## The Reroll Gamble

Spending gold to **reroll** the shop is a core gamble — pay to fish for specific units/upgrades. Since the shop is a shared, probabilistic pool (units are limited in supply — contested with opponents), rerolling involves odds, timing, and reading what others are drafting. It's a risk-reward decision every round.

## Board Positioning

Because you can't control combat, **where you place units** before the fight is your only "in-battle" input:
- Front-line tanks, back-line carries, spreading vs clumping (against area damage), countering the opponent's positioning.
- Positioning is a lighter but real skill layer — a well-positioned team beats a mispositioned equal one.

## Tournament Structure

Auto-battlers are usually **multiplayer free-for-alls** (e.g. 8 players):
- **Round-robin** — you face different opponents each round; you see their builds and adapt.
- **Health/elimination** — losing rounds drains your health; last player standing wins. This creates a **placement** goal (survive to top ranks) rather than binary win/lose, keeping weaker positions meaningful.
- **Shared unit pool** — the finite supply means players contest units, adding an indirect-competition layer.

## Balancing

- **Many viable comps** — the goal is diversity so no single team is dominant; buff/nerf toward a rich meta.
- **Synergy power vs flexibility**, **cost curves**, and **RNG mitigation** (bad shop luck shouldn't doom you) are the key dials.
- **Accessibility of depth** — easy to grasp (buy, place, watch), a very high strategic ceiling.

Design auto-battlers around the **shop-economy-positioning loop feeding auto-resolved combat**, deep **synergy/trait team-building**, a rich **gold-and-interest economy** with greed-vs-need tension, the **reroll gamble** over a contested unit pool, and a **placement-based tournament** structure — putting *all* the skill into preparation so strategy, not reflexes, decides the winner.
