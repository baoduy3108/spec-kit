---
name: metroidvania-design
description: Metroidvania design — an interconnected explorable map, ability-gated progression (locks and keys), backtracking made rewarding, guiding non-linear exploration, map/navigation UX, sequence breaking, and pacing power growth. Use when designing a metroidvania, exploration-platformer, or any game built around ability-gated interconnected world progression.
category: design
keywords_vi: metroidvania, bản đồ liên thông interconnected, mở khóa bằng năng lực ability gate, khóa và chìa lock and key, quay lại vùng cũ backtracking, dẫn dắt khám phá phi tuyến, bản đồ điều hướng map ux, phá trình tự sequence break, năng lực mở rộng bản đồ
---

# Metroidvania Design

A metroidvania (Metroid + Castlevania) is built around a single **interconnected world** that the player gradually unlocks by gaining **new abilities**. The signature loop: reach a barrier you can't pass, find the ability elsewhere, return and progress. It's exploration gated by capability rather than linear levels — and designing that web of locks and keys is the whole art.

## The Interconnected Map

Unlike level-based games, a metroidvania is **one continuous, looping world**. Areas connect back to each other with shortcuts, creating a sense of a real place you're learning. Good map design:
- **Loops back** — paths reconnect so exploration feels efficient, not like dead-end trekking.
- **Shows you the future** — you glimpse inaccessible areas/items (behind a locked door, across a gap) that plant curiosity and mental to-do notes.
- **Hub-and-spoke or web** — a central area branching to regions you revisit as you gain power.

The map itself is a puzzle the player mentally assembles.

## Ability-Gated Progression (Locks & Keys)

The core mechanic: **abilities are keys** that open **environmental locks**.
- Double-jump reaches high ledges; a dash crosses gaps; a morph-ball fits tunnels; fire melts ice; a grapple crosses chasms.
- Each new ability retroactively **opens up the whole map** — places you passed earlier now beckon. This is the dopamine of the genre: gaining power *expands your world*.
- Gates must be **readable** — the player should recognize "I'll need something for this" and, on getting the ability, *remember where to use it*.

## Backtracking Made Rewarding

Returning to old areas is central — but pointless backtracking is tedious. Make it pay:
- **New abilities reveal new content** in old areas (that ledge you eyed, now reachable) — so revisiting is *discovery*, not chore.
- **Traversal upgrades** (fast-travel, movement abilities) reduce friction as the map grows.
- **Layered rewards** — an area gives something on first visit and more on return.

The feeling should be "oh, *now* I can get that!" not "ugh, walking back again."

## Guiding Non-Linear Exploration

Freedom without direction frustrates; the craft is **soft guidance**:
- **Environmental breadcrumbs** — lighting, layout, and enemy placement nudge toward the intended next ability without a quest marker.
- **Gating that channels** — only one path is currently passable, funneling gently while *feeling* open.
- **Curiosity hooks** — visible rewards pull players forward.
- **Optional depth** — hidden upgrades reward thorough explorers; the critical path stays findable for everyone.

Balancing "player feels free" with "player isn't lost" is the perennial tension.

## Map & Navigation UX

A good **in-game map** is essential (see game-ui-and-hud-design): mark explored/unexplored, doors/locks, item locations, and let players set markers ("come back here"). Poor map UX turns exploration into aimless wandering; great map UX makes the world legible and backtracking painless.

## Sequence Breaking

Advanced players may use mechanics in unintended ways to **break sequence** (reach abilities early, skip gates). Rather than fight it, many designers *embrace* it as expert-level depth and replay value — while ensuring the game doesn't fully break (soft-locks). Deciding how rigid vs permissive your gating is shapes the game's speedrun/replay culture.

## Pacing Power Growth

Space out ability gains so each feels momentous and gets time to shine before the next. The **difficulty and complexity curve** rises with the player's toolkit — new enemies/challenges demand the new abilities. End-game: the player, now hyper-mobile, traverses the once-daunting world with mastery — a deliberate power fantasy payoff.

Design a metroidvania as a **web of locks and keys in one interconnected world**, where every ability reopens the map, backtracking rewards, and soft guidance keeps a non-linear space navigable. Nail that, and exploration itself becomes the game.
