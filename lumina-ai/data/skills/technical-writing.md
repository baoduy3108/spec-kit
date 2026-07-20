---
name: technical-writing
description: Write clear technical documentation — READMEs, API docs, tutorials, how-to guides, reference, and explanations. Covers the Diátaxis framework (tutorial/how-to/reference/explanation), audience-first structure, task-orientation, examples, and editing for clarity. Use when writing or reviewing docs, a README, or any technical explanation.
category: engineering
keywords_vi: viết tài liệu kỹ thuật, technical writing, readme, api docs, hướng dẫn tutorial, tài liệu rõ ràng, diataxis, viết docs
---

# Technical Writing

Good documentation is a force multiplier — it's how software gets adopted, used correctly, and maintained. The craft is *serving the reader's goal*, not describing the system for its own sake.

## Start With Audience & Purpose

Before writing, answer: **who is reading, and what are they trying to do?** A beginner following a tutorial, an expert looking up a parameter, and someone debugging all need different things. Write for a specific reader at a specific moment. **Task-orientation** beats feature-orientation — readers come with a goal ("deploy the app"), not to admire your API.

## The Four Kinds of Docs (Diátaxis)

A powerful framework: most docs failure comes from **mixing four distinct types** that serve different needs. Keep them separate:
1. **Tutorial** — *learning-oriented*. A guided, guaranteed-to-succeed lesson for a newcomer. Hold their hand; don't explain everything; ensure it *works*.
2. **How-to guide** — *task-oriented*. Steps to solve a specific real-world problem for someone who already knows the basics ("How to configure TLS"). A recipe.
3. **Reference** — *information-oriented*. Dry, complete, accurate description (API params, config options, CLI flags). Structured for lookup, not reading through.
4. **Explanation** — *understanding-oriented*. The "why" — background, concepts, design rationale, trade-offs.
A page trying to be all four confuses everyone. Know which one you're writing.

## Structure for Scanning

Readers **scan**, they don't read linearly. Serve that:
- **Descriptive headings** and short sections; put the most important thing first (inverted pyramid).
- **Lists and tables** over dense paragraphs for steps/options.
- **Working code examples** — the single most valued thing in technical docs. Show, don't just tell; make examples copy-pasteable and correct.
- A good **README** answers fast: what is this, why use it, how to install, a minimal working example, where to go next.

## Write Clearly

- **Plain, direct language** — short sentences, active voice ("Run the command," not "The command should be run"), present tense.
- **Define terms** and be consistent (don't call the same thing three names).
- **Concrete over abstract** — examples, specific values.
- **Cut ruthlessly** — every unnecessary word is friction. Edit in a second pass: remove, tighten, clarify.
- Prefer "you" (the reader) and imperative for instructions.

## Keep It True

Docs that lie are worse than none. **Test your instructions** (follow them fresh, or automate). Docs **rot** — update them with the code (docs-as-code: in the repo, reviewed in PRs). Note versions/dates where things change.

## Pitfalls

- **Mixing doc types** — a tutorial buried in reference detail, or reference cluttered with tutorials.
- **Describing the system instead of the reader's task** (feature-oriented, not task-oriented).
- **No examples**, or examples that don't run.
- **Curse of knowledge** — assuming the reader knows what you know; skipping the step that's "obvious" to you.
- **Walls of text** with no headings/structure — unscannable.
- **Stale docs** that no longer match the software (trust, once lost, is gone).
- Vague language, inconsistent terms, passive constructions that hide who does what.
