---
name: context-degradation
description: Diagnose and mitigate five context failure patterns that degrade LLM agent performance: lost-in-middle, poisoning, distraction, confusion, and clash. Use when discussing why an AI agent's quality drops over a long conversation/session, or how to architect context for a long-running agent.
category: engineering
keywords_vi: context degradation, suy giảm ngữ cảnh, lost in middle, context poisoning, agent quên context, trả lời tệ đi, chat càng dài càng tệ, càng chat càng tệ
---

# Context Degradation Skill Summary

This skill diagnoses and mitigates five context failure patterns that degrade agent performance: lost-in-middle, poisoning, distraction, confusion, and clash.

## Core Mechanisms

**Lost-in-Middle**: The attention U-curve means beginning and end positions receive reliable attention while middle sections suffer materially reduced recall accuracy as context grows. For contexts exceeding 4K tokens, this becomes significant.

**Poisoning**: Hallucinations or tool errors entering context compound through repeated self-reference, creating a cascading failure. Recovery requires truncating to before the poisoning point rather than layering corrections.

**Distraction**: Even single irrelevant documents trigger measurable degradation — the effect is step-function, not linear. Pre-load only immediately relevant content; gate reference material behind tool calls.

**Confusion**: Multiple task types in one context cause models to blend requirements from multiple sources. Explicit task segmentation prevents cross-contamination.

**Clash**: Contradictory-but-correct information (version conflicts, perspective differences) requires explicit priority rules before content enters context.

## Four-Bucket Mitigation Framework

- **Write**: Offload context to external storage when utilization exceeds 70%
- **Select**: Retrieve only relevant content through filtering and prioritization
- **Compress**: Summarize without losing information density
- **Isolate**: Split tasks across sub-agents to prevent any single context exceeding degradation thresholds

## Key Gotchas

Degradation isn't gradual — it's non-linear with sharp cliff edges. Needle-in-haystack test scores don't predict production performance. Model-specific thresholds shift with updates. Contradictory retrieved documents poison silently. Poor prompt structure mimics degradation symptoms.
