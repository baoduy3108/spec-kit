---
name: dialogue-and-narrative-systems
description: Dialogue and narrative systems for games — dialogue trees vs graphs, branching and choices, conditions and flags, state tracking (variables, reputation), quest structure, and data-driven scripting so writers author content without code. Use when building conversations, branching story, quests, or a dialogue engine.
category: engineering
keywords_vi: hệ thống hội thoại dialogue game, cây hội thoại phân nhánh lựa chọn, điều kiện cờ flag biến trạng thái, theo dõi danh tiếng reputation nhân vật, cấu trúc nhiệm vụ quest, kịch bản hướng dữ liệu cho biên kịch, engine hội thoại story game
---

# Dialogue & Narrative Systems

A narrative system turns a story into interactive, stateful content: NPCs that respond to what you've done, choices that branch, quests that track progress. The engineering goal is to let **writers author rich branching content as data** — without touching code for every line.

## Trees vs Graphs

- **Dialogue tree** — a conversation as a tree: a node has text and **choices**, each leading to a child node. Simple, great for menus of options. But pure trees can't easily *rejoin* paths (they explode combinatorially).
- **Dialogue graph** — nodes linked freely, including back-references and merges. Branches can diverge and reconverge, avoiding duplicated content. Most real systems are graphs with a tree-like feel.

A node typically holds: speaker, text, an optional list of **choices**, and links to next nodes. Choices may be gated by conditions.

## Conditions & Flags: Making It Stateful

Static conversations are lifeless. The system reads and writes **game state**:
- **Flags/variables** — booleans and numbers in a central store (`metKing`, `goldStolen`, `chapter`). Nodes and choices carry **conditions** (`show this option only if hasKey`) and **effects** (`set questAccepted = true`, `give 100 gold`).
- **Reputation/relationship** — numeric tracks that choices nudge; dialogue and outcomes branch on thresholds. This is what makes the world feel like it *remembers* you.

The pattern: **guard** (should this node/choice appear?) → present → **apply effects**. Keep state in one queryable place so any system (shops, doors, endings) can react to the same flags.

## Quests as State Machines

A quest is a small **state machine**: `Unavailable → Available → Active → (steps) → Complete/Failed`. Steps advance on triggers (talk to X, collect N, reach place). Store quest state in the same flag system so dialogue can check and drive it. Journals, objective markers, and rewards all read this state. Model quests declaratively (data describing steps + conditions), not as tangled if-else in code.

## Data-Driven Authoring

The most important architectural choice: **content lives in data, not code**. Writers edit dialogue in a spreadsheet, JSON, a node editor (like Twine/Yarn/Ink-style tools), or a custom format — and the engine interprets it. This means:
- Writers iterate without recompiling or bugging engineers.
- **Localization** is a data pass, not a code change (keep text keyed and separate).
- Conditions/effects use a small **scripting mini-language** or expression system the engine evaluates, so logic is authorable too.

Established formats (Ink, Yarn Spinner) exist precisely because hardcoding dialogue doesn't scale past a few lines.

## Presentation Concerns

- **Text pacing** — typewriter reveal, skip/fast-forward, auto-advance timing.
- **Portraits & emotion** — swap expressions per line for life.
- **Choice UX** — clear, readable, indicate consequence weight without spoiling; sometimes a timer for pressure.
- **Voice/subtitle sync** if voiced.

A good narrative system is invisible tech: writers pour in a branching, reactive story, and players feel a world that listens and remembers — all because the engine cleanly separates content, state, and presentation.
