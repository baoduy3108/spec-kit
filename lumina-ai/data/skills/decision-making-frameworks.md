---
name: decision-making-frameworks
description: Make better decisions — reversible vs irreversible (one-way vs two-way doors), decide with the right amount of information, expected value and cost of delay, pre-mortems, weighted criteria, and avoiding analysis paralysis and common biases. Use when facing a hard choice, stuck deciding, or designing a decision process.
category: ai-agent
keywords_vi: ra quyết định, decision making, framework quyết định, reversible irreversible one-way door, phân tích tê liệt, pre-mortem, chọn giữa nhiều phương án, quyết định khó
---

# Decision-Making Frameworks

Better decisions come from matching the process to the decision — not agonizing over everything equally.

## Reversible vs Irreversible (the most useful distinction)

- **Two-way doors (reversible)** — if it's wrong, you can undo it cheaply. **Decide fast** with limited info; the cost of being wrong is small, and speed/learning matter more than certainty. Most decisions are these.
- **One-way doors (irreversible / expensive to undo)** — hard to reverse (a major architecture choice, a hire, a public launch, deleting data). **Slow down**, gather more information, get more input.
The classic mistake is treating reversible decisions like irreversible ones (agonizing over what you could just try and undo), and irreversible ones like reversible ones (rushing what you can't take back).

## Decide With the Right Amount of Information

Waiting for certainty is usually a mistake — you rarely get it, and delay has a cost. A useful heuristic: **act once you have ~70% of the information** you wish you had; more than that and you're likely over-deliberating. Pair it with the reversibility lens: reversible + 70% info → go.

## Frameworks for Weighing Options

- **Expected value** — for quantifiable choices, weigh outcomes by probability (see probability-and-bayes). Include the downside/variance, not just the average.
- **Cost of delay** — what does *not* deciding cost per day/week? Often the cost of a slightly-wrong-but-fast decision is less than the cost of delay.
- **Weighted criteria** — list the factors that matter, weight them, score each option. Turns a vague "gut feel" into something explicit you can inspect (and reveals when the gut disagrees — worth examining).
- **Pre-mortem** — imagine it's six months later and the decision failed; ask "why did it fail?" Surfaces risks you can mitigate *now*, and is far more effective than optimistic planning.
- **Opportunity cost** — every choice forecloses others; what are you giving up?

## Avoid the Traps

- **Analysis paralysis** — over-researching reversible decisions. Set a deadline; decide; move.
- **Sunk cost fallacy** — don't keep investing because of what you already spent; decide from here forward.
- **Confirmation bias** — actively seek evidence *against* your preferred option; consider the opposite.
- **Anchoring** — the first number/option unduly frames the rest.
- **Decision fatigue** — quality drops with volume; batch or delegate small decisions, save energy for big ones.

## Practical Loop

Frame the real decision → is it reversible? → gather *appropriate* info (more for one-way doors) → weigh options (EV / weighted criteria) → run a pre-mortem on the leading option → decide, set a review date, and commit. Then judge the decision by the **process and information you had**, not just the outcome (a good decision can have a bad result — luck is real).
