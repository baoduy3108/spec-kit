---
name: text-adventure-and-interactive-fiction
description: Text adventure and interactive fiction design — parser vs choice-based IF, world modeling and the command language, puzzle design in text, prose as the interface, guiding the player, and managing state/branching. Use when designing interactive fiction, a text adventure, a parser game, or choice-based narrative in prose.
category: design
keywords_vi: phiêu lưu văn bản và tiểu thuyết tương tác text adventure interactive fiction, parser so với lựa chọn parser vs choice based, mô hình thế giới và ngôn ngữ lệnh world model command, thiết kế câu đố bằng chữ text puzzle, văn xuôi là giao diện prose as interface, dẫn dắt người chơi guiding, quản lý trạng thái và phân nhánh state branching
---

# Text Adventure & Interactive Fiction

Interactive fiction (IF) — text adventures — tells stories through **prose the player reads and text/choices they input**, with no (or minimal) graphics. From classic parser games (Zork) to modern choice-based works (Twine, Ink), the medium is where *writing* and *game design* fully merge. The words are both the world and the interface.

## Parser vs Choice-Based

Two major forms:
- **Parser IF** — the player types commands ("go north", "take lamp", "open door with key") and the game interprets them. Powerful and immersive (the world feels manipulable) but demands a robust **world model** and the challenge of players guessing the right verbs.
- **Choice-based IF** — the player picks from presented options (hyperlinks/menus — Twine, Ink, choice games). More accessible, no guessing verbs, easier to author; focuses on narrative branching over world-simulation. The dominant modern form.

The choice defines the experience and the authoring effort. Parser = simulation depth; choice = narrative focus and accessibility.

## World Modeling & the Command Language (Parser)

Parser IF requires **simulating a world in text**:
- **Objects, rooms, and their properties/relationships** — a model the parser reasons over (this lamp is takeable, lit, in this room).
- **The command language** — a vocabulary of verbs/nouns the game understands. The design challenge: **guessing the verb** — players trying reasonable commands the game doesn't recognize is the classic frustration. Mitigate with synonyms, forgiving parsing, and hints about available actions.
- Balancing simulation richness against parser comprehensibility is the core parser-IF craft.

## Puzzles in Text

- **Puzzles** — often environmental/inventory puzzles (see point-and-click-adventure-design), solved by examining, combining, and using objects described in prose.
- **Fair, logical, deducible** — the solution must be reasonable from the described world (no moon-logic — text makes unfair puzzles *especially* infuriating since players can't even *see* the options).
- **Description as clue** — what you *examine* and how it's described telegraphs solutions. Rich, purposeful description is both atmosphere and gameplay.

## Prose as the Interface

In IF, **writing IS the game** — there's nothing else:
- **Quality prose** — evocative, clear, well-paced writing carries atmosphere, character, and information. The genre lives or dies on writing craft (see creative-writing skills).
- **Description** must convey the space, mood, and interactive possibilities. Second-person present tense ("You are in a dark room…") is the traditional voice.
- **Economy and clarity** — enough to immerse and inform, not so much it buries the interactive elements or exhausts the reader.

## Guiding the Player

Since there are no visuals, **communicating what's possible** is critical:
- **Telegraph interactivity** — mention examinable/usable objects in description so players know what to try.
- **Feedback** — responses to actions (including failed ones) that guide without breaking immersion; unhelpful "you can't do that" walls frustrate.
- **Pacing and structure** — guide the player through the story/space; avoid getting them hopelessly stuck or lost in a maze of text.

## State & Branching

- **State tracking** — flags, variables, inventory, and world-changes (see dialogue-and-narrative-systems). Choice-based IF especially runs on branching narrative and reactive state (see visual-novel-and-branching-narrative).
- **Branching vs bottleneck** — managing the combinatorial explosion of choices (see branching-narrative); reconverge to keep content feasible while honoring choices.
- **Tools** — Inform 7 (parser), Twine, Ink (choice) — each shapes what's easy to build.

Design interactive fiction by **choosing parser (world-simulation, verb-guessing challenge) or choice-based (narrative focus, accessibility)**, modeling a **consistent world / branching state**, crafting **fair, deducible text puzzles**, writing **excellent evocative prose** (the entire interface), **guiding the player** by telegraphing possibilities, and **managing branching state** — because in IF, the words are the world, the mechanics, and the story all at once: great writing *is* great design.
