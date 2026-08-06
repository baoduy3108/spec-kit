---
name: spec-clarification-and-ambiguity-resolution
description: How to find and resolve ambiguity/underspecification in a spec before planning or building — systematically identifying gaps, asking targeted clarifying questions, avoiding silent assumptions, and locking decisions. Use to clarify requirements before implementation, resolve spec ambiguity, catch underspecification, or the /clarify step of spec-driven development.
category: engineering
keywords_vi: spec clarification, ambiguity mơ hồ, làm rõ đặc tả, câu hỏi làm rõ, underspecification lỗ hổng, tránh giả định ngầm, chốt quyết định trước khi build
---

# Spec Clarification & Ambiguity Resolution

Before planning or building from a spec, you must **find and resolve its ambiguities and gaps** — because underspecification is where wrong software comes from. In spec-driven development this is an explicit step (spec-kit's `/clarify`) done **before** planning: better to surface unknowns cheaply now than discover them after building the wrong thing (see writing-executable-specifications).

## Why This Step Matters

Specs are almost never complete on the first pass — there are always edge cases, undefined behaviors, and ambiguous requirements the author didn't notice (curse of knowledge — they know what they meant). A human implementer fills these gaps with **assumptions**, often wrong; an AI agent does too, silently and sometimes worse. Every unresolved ambiguity is a coin-flip on building the right thing. Clarifying **before** planning/building is the cheapest place to fix it — a question now vs a rebuild later.

## Systematically Find the Gaps

Don't just read the spec approvingly — **interrogate** it for underspecification:
- **Edge cases** — what happens with empty/invalid/extreme/concurrent input? What if the external thing fails?
- **Undefined behaviors** — states, transitions, or scenarios the spec doesn't mention.
- **Ambiguous terms** — words that could mean multiple things ("fast," "recent," "user" — which user?), vague quantities ("large," "some").
- **Implicit assumptions** — things the author took for granted that a builder wouldn't know.
- **Conflicts** — requirements that contradict each other or the constitution (see writing-a-project-constitution).
- **Missing non-functionals** — performance, security, scale, error handling.
Go through the spec category by category hunting for "what's not decided here?"

## Ask Targeted Clarifying Questions

For each gap, ask a **specific, decidable** question — not "is this clear?" (which gets a reflexive "yes") but "when a user submits a duplicate, should we reject, merge, or overwrite?" Present the **options** where helpful (see AskUserQuestion-style choices). Good clarifying questions:
- Are **concrete** and answerable (pinpoint the exact decision).
- Surface the **trade-offs** so the decision-maker can choose well.
- Prioritize **high-impact** ambiguities (the ones that most change what gets built).

## Resolve and Lock

Once answered, **record the decisions in the spec** (don't leave them in chat/memory) so they're durable and drive planning/implementation. The spec becomes more complete and authoritative. Unresolved-but-known ambiguities should be **flagged explicitly** rather than silently assumed. The output: a spec you can plan and build from without guessing.

## Pitfalls (in understanding/using)

- **Skipping clarification** and letting the builder/agent **silently assume** → wrong software discovered late.
- Asking **vague** questions ("is this clear?") that get unhelpful reflexive answers — ask specific, decidable ones.
- **Not recording** resolutions in the spec (they live in someone's head/chat, then get lost).
- Clarifying **trivial** points while missing the **high-impact** ambiguities — prioritize.
- **Analysis paralysis** — trying to resolve every conceivable unknown before starting (some are fine to defer/flag); balance.
- Assuming the spec author caught everything (curse of knowledge) — actively hunt for gaps.
- Doing it **after** building instead of before (the expensive order).
