---
name: context-compression
description: Compressing long-running agent sessions — structured summarization, compaction, token-per-task optimization, and durable handoff summaries that preserve decisions, files, risks, and next actions. Use when sessions exceed the context window, when an agent "forgets" which files it modified, or when designing conversation summarization.
category: ai-agent
keywords_vi: nén ngữ cảnh, tóm tắt phiên dài, compaction, handoff summary, agent quên file, token per task, tóm tắt hội thoại
---

# Context Compression Strategies

When agent sessions generate huge conversation histories, compression becomes mandatory. The naive target is minimizing tokens per request. The correct target is **tokens per task**: total tokens to complete a task, including re-fetching costs when compression loses critical information. A strategy saving 0.5% more per request but causing 20% more re-fetching costs more overall. Track re-fetching frequency as the primary quality signal.

## Three Approaches

1. **Anchored Iterative Summarization** — for long sessions where file tracking matters. Maintain a structured, persistent summary; on each trigger, summarize only the newly-truncated span and merge into existing sections (don't regenerate wholesale — regeneration drifts and loses detail). Best quality.
2. **Opaque Compression** — for short sessions where re-fetching is cheap and maximum savings needed. 99%+ ratios but zero interpretability; never use when debugging or artifact tracking matters.
3. **Regenerative Full Summary** — when readability is critical and sessions have clear phase boundaries. Weakness: cumulative detail loss across cycles.

## Solve the Artifact Trail First

Artifact-trail integrity is usually the weakest dimension. Preserve explicitly every cycle: files created (full paths), files modified + what changed (function names, not just file names), files read but unchanged, and specific identifiers (function/variable names, error messages, error codes). Prefer a separate file-state index over relying on the summarizer.

## Structure Summaries with Mandatory Sections

Each section acts as a checklist that makes omissions visible:

```
## Session Intent      ## Files Modified
## Decisions Made      ## Current State      ## Next Steps
```

Adapt sections to the domain (debugging → "Root Cause"/"Error Messages"; migration → "Source/Target Schema"). Any explicit schema outperforms freeform.

## Triggers & Evaluation

Default to a **sliding window** (keep last N turns + summary) for coding agents; use **task-boundary** triggers when phases are clear. Trigger at 70-80% utilization, not 90%+.

Evaluate with **probes**, not ROUGE/embedding metrics: after compression, ask questions testing whether critical info survived (recall, artifact, continuation, decision). Score across six dimensions: accuracy, context awareness, artifact trail, completeness, continuity, instruction following.

## Gotchas

- **Never compress tool definitions/schemas** — the agent can't invoke tools whose parameters were summarized away.
- **Summaries hallucinate** — validate against source before discarding, especially file paths, error codes, numbers.
- **Compression breaks artifact references** — preserve identifiers verbatim in dedicated sections, not in prose.
- **Early turns hold irreplaceable constraints** — protect them or extract into a persistent preamble.
- **Aggressive ratios compound** across cycles — calibrate assuming multiple passes.
- **Code and prose need different compression** — summarize prose aggressively, keep code/structured data verbatim.
