---
name: spaced-repetition-systems
description: How spaced repetition works — combating the forgetting curve by reviewing material at expanding intervals timed to just before you'd forget, the algorithms (Leitner, SM-2/FSRS), desirable difficulty, and building/using flashcard systems well. Use to understand spaced repetition, Anki/SRS, memorizing durably, the forgetting curve, or designing a review-scheduling system.
category: engineering
keywords_vi: spaced repetition systems srs, lặp lại ngắt quãng, đường cong quên forgetting curve, khoảng cách tăng dần, leitner sm-2 fsrs, desirable difficulty, flashcard anki, ghi nhớ bền
---

# Spaced Repetition Systems

Spaced repetition is a scientifically-validated technique for **remembering things long-term** with minimal total effort — by reviewing material at **increasing intervals**, timed to just before you'd forget. It's the engine behind Anki and effective memorization, and a key component of learning systems (see learning-how-to-learn, retrieval-practice-and-testing-effect).

## The Forgetting Curve

Memory **decays** predictably — the "forgetting curve": you forget most of what you learn within days unless you revisit it. But each time you **successfully recall** something, the memory strengthens and the decay slows — you forget it more slowly next time. Spaced repetition exploits this: review right as forgetting is about to happen, and each review pushes the next forgetting point further out.

## The Spacing Effect & Expanding Intervals

The core insight (the **spacing effect**): information reviewed at **spaced-out intervals** is remembered far better than the same time spent **cramming** (massed practice). So instead of studying something 10 times today (which you'll forget), you review it today, in 2 days, in 5 days, in 2 weeks, in a month — **expanding intervals**. Each successful recall earns a longer gap. This spaces reviews out just enough that each one is effortful (which strengthens memory) but not so long that you've fully forgotten.

## The Algorithms

- **Leitner system** — physical/simple: cards move through boxes; a correct answer promotes a card to a longer-interval box, a wrong answer demotes it. Intuitive spaced repetition.
- **SM-2** (SuperMemo, used by Anki) — computes each card's next interval from your recall performance and an "ease factor"; harder cards come back sooner, easy cards get longer gaps.
- **FSRS** and modern algorithms — use models of memory to schedule more optimally.
The scheduler's job: for each item, predict when you're about to forget it and schedule the review then.

## Desirable Difficulty

A crucial principle: reviews should be **effortful but successful**. Recall that's too easy (reviewing too soon) barely strengthens memory and wastes time; recall that's too hard (reviewing too late, already forgotten) means re-learning. The sweet spot — **"desirable difficulty"** — is recall that takes effort but succeeds. Spaced repetition tunes intervals toward this. (This is why re-reading feels productive but isn't — no retrieval effort.)

## Using It Well

- **Active recall** — SRS works because it's **testing** yourself (retrieve the answer), not re-reading (see retrieval-practice-and-testing-effect). The retrieval effort is the point.
- **Good cards** — atomic (one fact per card), clear, in your own words; avoid huge/ambiguous cards.
- **Trust the schedule** — review when due; consistency matters more than volume.
- Best for **discrete facts** (vocabulary, definitions, formulas); less suited to skills/understanding (which need practice/application).

## Pitfalls (in understanding/using)

- **Cramming** instead of spacing — feels efficient, forgotten fast; space reviews out.
- **Re-reading** instead of **active recall** — recognition ≠ retrieval; SRS must test you.
- Reviewing **too soon** (too easy, no benefit) — trust the expanding schedule (desirable difficulty).
- **Overloaded/ambiguous cards** — hard to recall, hard to schedule; keep cards atomic and clear.
- Not being **consistent** — skipping reviews lets the schedule and memory collapse.
- Using SRS for **skills/deep understanding** that need application, not just memorized facts.
- Making thousands of cards you can't sustain — quality and consistency over quantity.
