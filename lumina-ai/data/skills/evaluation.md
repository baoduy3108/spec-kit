---
name: evaluation
description: Building agent evaluation systems — deterministic checks, regression suites, multi-dimensional rubrics, quality gates, LLM-as-judge, production monitoring, baseline comparison, and outcome measurement for agent pipelines. Use when testing agent performance systematically or catching regressions before deployment.
category: ai-agent
keywords_vi: đánh giá agent, rubric nhiều chiều, llm as judge, quality gate, đo chất lượng agent, test set agent, kiểm thử agent, regression
---

# Evaluation Methods for Agent Systems

Evaluate agent systems differently from traditional software: agents make dynamic decisions, are non-deterministic between runs, and often lack a single correct answer.

## Core Principles

- **Evaluate outcomes, not execution paths** — agents find alternative valid routes. Judge whether the right outcome was reached via a reasonable process, not whether a specific step sequence was followed.
- **Multi-dimensional rubrics, not single scores** — one number hides dimension-specific failures. Score factual accuracy, completeness, citation accuracy, source quality, and tool efficiency separately, then weight per use case.
- **Deterministic checks before LLM judgment** — schema validity, duplicate keys, rubric math, required evidence paths should fail fast before an evaluator spends tokens. Never let a favorable LLM score launder an invalid artifact.
- **LLM-as-judge only after deterministic checks are stable** — and use a different model family than the agent to avoid self-enhancement bias.

## Rubric Design

Cover core dimensions with descriptive levels (excellent → failed), map to 0.0-1.0, apply per-dimension weights, compute a weighted aggregate. Passing thresholds: ~0.7 general use, ~0.9 high-stakes. Store individual dimension scores alongside the aggregate — the breakdown drives targeted improvement. Fail the eval if any single dimension falls below its minimum, even if the aggregate passes.

## Test Set Design

Start with 20-30 cases in early development (changes have dramatic impact); scale to 50+ for reliable signal. Sample from real usage, add known edge cases. **Stratify by complexity** and report per-stratum:
- Simple: single tool call, factual lookup
- Medium: multiple tool calls, comparison logic
- Complex: many tool calls, significant ambiguity
- Very complex: extended interaction, deep reasoning, synthesis

## Performance Drivers

Token usage is the primary variance driver (more exploration helps until cost/quality collapses); number of tool calls is secondary (helps only when calls retrieve useful evidence); model choice is secondary but multiplicative. Set production-realistic token budgets; compare model upgrades against token-budget increases; validate multi-agent architectures against single-agent baselines.

## Continuous Evaluation

Integrate evaluation into the workflow — run automatically on every significant change, track over time, block deployments that regress. Monitor production: sample interactions, alert on warning (<0.85 pass rate) and critical (<0.70) thresholds, watch trend dashboards for gradual degradation. For stateful agents, use **end-state evaluation** — assert the final state matches expectations rather than how the agent got there.

## Gotchas

- **Overfitting to specific code paths** — write criteria against outcomes/semantics; rotate test inputs.
- **LLM-judge self-enhancement bias** — use a different judge model family.
- **Test set contamination** — keep eval sets versioned and separate from prompt/training data.
- **Metric gaming** — cross-validate automated metrics against human judgment regularly.
- **Eval set too small** (<50) — high variance; scale up and report confidence intervals.
- **Not stratifying by difficulty** — easy cases inflate scores; report per stratum.
- **Treating eval as a one-time launch gate** — quality drifts as models/tools/usage evolve; run continuously.
