---
name: context-optimization
description: Improving context efficiency — context budgeting, observation masking, prefix/KV-cache strategy, partitioning, token-cost reduction, and extending effective context capacity without lowering answer quality. Use when token costs or budgets constrain task complexity.
category: ai-agent
keywords_vi: tối ưu token, observation masking, kv-cache, prefix cache, chia nhỏ context, ngân sách token, giảm chi phí token
---

# Context Optimization Techniques

Extend the effective capacity of limited context windows through compression, masking, caching, and partitioning — but only with measurement discipline. Apply four strategies in priority order (impact and risk):

1. **KV-cache optimization** (cheapest, lowest risk) — reorder and stabilize the prompt so the inference engine reuses cached Key/Value tensors. Apply first when stable prefixes exist.
2. **Observation masking** (largest capacity gains) — replace verbose tool outputs with compact references once their purpose is served; original stays retrievable.
3. **Compaction** — summarize when utilization exceeds ~70%, then reinitialize with the summary. Lossy — apply after masking removed low-value bulk.
4. **Context partitioning** — split work across sub-agents with isolated contexts when a single window can't hold the problem. Reserve for tasks exceeding ~60% of the window; coordination overhead is real.

## KV-Cache Ordering

Structure every prompt so stable content occupies the prefix and dynamic content is last:
1. System prompt (never changes in a session) → 2. Tool definitions → 3. Reused templates/few-shots → 4. Conversation history → 5. Current query/dynamic content.

Remove timestamps, session counters, request IDs from the system prompt — even a single whitespace change invalidates the entire cached block downstream. Target 70%+ hit rate → ~50% cost and ~40% latency reduction on cached tokens.

## Observation Masking

- **Never mask**: current-task-critical observations, the most recent turn, active reasoning chains, error outputs during debugging.
- **Mask after 3+ turns**: verbose outputs whose key points were already extracted → `[Obs:{ref_id} elided. Key: {summary}. Full content retrievable.]`
- **Always mask immediately**: duplicates, boilerplate, already-summarized outputs.

Target 60-80% reduction with <2% quality impact. The key is retrievability.

## Compaction

Trigger above 70%. Compress tool outputs first (80%+ of tokens), then old turns, then documents. **Never compress the system prompt.** Target 50-70% reduction with <5% quality loss; audit if it exceeds 70%.

## Budget Management

Allocate explicit budgets per category (system prompt, tools, documents, history, tool outputs, 5-10% reserve). Use trigger-based (not periodic) optimization: >80% util → compact; degradation signals (repetition, missed instructions) → mask + compact; quality drop → audit composition first.

## Gotchas

- **Whitespace/timestamps break KV-cache** — pin system prompts as immutable strings; move dynamic metadata to a user message.
- **Compaction under pressure (>85%) loses state** — trigger at 70-80%; if late, use a separate clean model call.
- **Masking error outputs breaks debugging** — suspend masking for error observations during active debugging.
- **Partitioning overhead can exceed savings** — for <3 independent subtasks, coordination often costs more than it saves.
- **Compaction creates false confidence in stale summaries** — re-validate against the current goal after compacting.
