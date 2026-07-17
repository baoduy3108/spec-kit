---
name: code-smells
description: Recognize code smells — surface signs of deeper design problems (long method, large class/god object, long parameter list, duplicated code, feature envy, primitive obsession, shotgun surgery, deep nesting) and the refactoring each suggests. Use when reviewing code for maintainability or deciding what to refactor.
category: engineering
keywords_vi: code smell, mùi code, dấu hiệu code xấu, hàm quá dài, god class, trùng lặp code, tham số quá nhiều, nested lồng sâu, khi nào refactor
---

# Code Smells

A code smell is a surface symptom that hints at a deeper design problem. Smells aren't bugs — the code works — but they make it harder to change. Learn to spot them and the refactoring each points to.

## The Common Smells

- **Long method / function** — does too much; hard to name and test. → Extract smaller, well-named functions; one job each.
- **Large class / God object** — a class with too many responsibilities and fields. → Split by responsibility (Single Responsibility); extract collaborators.
- **Long parameter list** — 4+ params, easy to mis-order. → Group related params into an object/struct; or the method is doing too much.
- **Duplicated code** — the same logic in several places; a fix must be applied N times (and one gets missed). → Extract a shared function/module (DRY) — but don't over-abstract coincidental duplication.
- **Feature envy** — a method that mostly uses another object's data. → Move it to where the data lives.
- **Primitive obsession** — modeling concepts as bare strings/ints (an email as `str`, money as `float`). → Introduce small value types that carry validation and meaning.
- **Shotgun surgery** — one conceptual change forces edits across many files. → The concept is scattered; consolidate it into one place (single source of truth).
- **Divergent change** — one class changes for many unrelated reasons. → Split it (opposite of shotgun surgery).
- **Deep nesting / arrow code** — many nested ifs/loops. → Guard clauses / early returns; extract inner blocks.
- **Magic numbers/strings** — unexplained literals. → Named constants.
- **Comments explaining bad code** — a comment apologizing for confusing code. → Refactor so the code is self-explanatory; keep comments for *why*, not *what*.
- **Dead code / speculative generality** — unused code or abstraction "for the future." → Delete it; add it when actually needed (YAGNI).

## Using Smells Well

- Smells are **heuristics, not rules** — a long method might be fine; a "duplicate" might be coincidental and should stay separate. Judgment matters.
- Fix a smell when it's **in your way** — refactor the code you're about to change (leave it cleaner than you found it), not in a giant separate "cleanup" that risks regressions.
- **Tests first** — refactor behind passing tests so you can restructure safely.
- The underlying goals smells point to: **high cohesion, low coupling, single responsibility, DRY, clear naming** — the same principles as good OO/functional design.

## Pitfalls

- **Over-refactoring / premature abstraction** — chasing smells into needless indirection (DRYing coincidental duplication, generalizing for imagined futures) is its own smell.
- Refactoring without tests → introducing bugs.
- Treating smells as absolute violations rather than prompts to look closer.
