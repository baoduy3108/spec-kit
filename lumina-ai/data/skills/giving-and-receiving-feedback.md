---
name: giving-and-receiving-feedback
description: Give and receive feedback well — be specific and behavior-focused (SBI: situation-behavior-impact), timely and kind-but-direct, separate the person from the work, and when receiving it, listen without defensiveness and extract the signal. Use when giving feedback, doing a review, or processing criticism.
category: design
keywords_vi: phản hồi feedback, góp ý cho người khác, nhận phê bình, sbi situation behavior impact, đánh giá công việc, phản hồi mang tính xây dựng, tiếp nhận góp ý
---

# Giving & Receiving Feedback

Feedback is how people and work improve — but done badly it wounds and gets ignored. The skill is making it specific, kind, and actionable.

## Giving Feedback

- **Be specific and behavior-focused, not personal** — describe the observable action and its effect, not a character judgment. "You are careless" is an attack and untrue; "This PR shipped without tests, and it broke checkout" is actionable. Use **SBI**: **Situation** (when/where) → **Behavior** (what specifically was done) → **Impact** (the effect it had). Concrete, hard to argue with, easy to act on.
- **Kind but direct** — vague, softened feedback ("looks good, maybe tweak a few things") helps no one; brutal feedback shuts people down. Aim for **candid + caring**: say the real thing, clearly, because you want them to succeed.
- **Timely** — soon after the event, while it's fresh and fixable — not saved up for a review six months later.
- **Praise specifically too** — "great job" is forgettable; "the way you broke that migration into reversible steps made the deploy safe" reinforces the exact behavior to repeat.
- **Separate the work from the person** — critique the code/design/output, never the worth of the person. In code review especially, review the code, not the coder.
- **Make it a dialogue** — ask for their view; you might be missing context.

## Receiving Feedback

- **Assume good intent and listen** — the instinct is to defend/explain; resist it. Let them finish; you can't hear the signal while rebutting.
- **Extract the signal, discard the delivery** — even clumsily-delivered feedback often contains something true. Separate *how* it was said from *what* is useful in it.
- **Ask clarifying questions** — "can you give me a specific example?" turns vague criticism into something you can act on.
- **Say thank you** — feedback is a gift and takes courage to give; reacting defensively teaches people to stop giving it (and then you stop improving).
- **Decide, then act** — you don't have to accept all of it; weigh it, decide what's valid, and change what should change.

## In Code Review Specifically

Frame comments as observations/questions ("what happens if this is null?") not commands; distinguish blocking issues from nits/preferences; explain the *why*; praise good parts. When receiving review, don't take it personally — the reviewer is protecting the codebase, not attacking you (see the requesting/receiving-code-review skills).

## Pitfalls

- **Vague feedback** ("be better") — no one can act on it.
- **Personal attacks** instead of behavior — triggers defensiveness, teaches nothing.
- **Saving it up** for a formal review instead of addressing it in the moment.
- **Only negative** — no reinforcement of what to keep doing.
- **Defensiveness** when receiving — kills the source of future improvement.
