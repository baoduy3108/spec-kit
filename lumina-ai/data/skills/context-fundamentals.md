---
name: context-fundamentals
description: Foundational concepts of context engineering — what context is, the anatomy of a context window, attention mechanics, the U-shaped attention curve, why context quality matters more than quantity, and the mental models to interpret every other context decision. Use for conceptual reasoning about how an LLM's finite attention budget constrains agent behaviour.
category: ai-agent
keywords_vi: context engineering cơ bản, cửa sổ ngữ cảnh, attention budget, chất lượng context, ngân sách token, progressive disclosure, cơ chế attention
---

# Context Engineering Fundamentals

Context is the complete state available to a language model at inference time: system instructions, tool definitions, retrieved documents, message history, and tool outputs. Context engineering is the discipline of curating the smallest high-signal token set that maximizes the likelihood of desired outcomes.

## Core Idea

Treat context as a finite **attention budget**, not a storage bin. Every token added competes for the model's attention and depletes a budget that cannot be refilled mid-inference. Maximize utility per token against three constraints: the hard token limit, the softer effective-capacity ceiling, and the **U-shaped attention curve** that penalizes information placed in the middle of context.

Four principles when assembling context:
1. **Informativity over exhaustiveness** — include only what matters for the current decision; retrieve more on demand.
2. **Position-aware placement** — put critical constraints at the beginning and end; the middle is recovered least reliably.
3. **Progressive disclosure** — load names/summaries at startup; load full content only when a skill or document activates.
4. **Iterative curation** — an ongoing discipline applied every time content is passed to the model, not a one-time prompt-writing step.

## Anatomy of Context

- **System prompts** persist throughout; organize with clear section boundaries; put the most critical constraints at start and end. Calibrate instruction "altitude": too low = brittle hardcoded logic, too high = vague. Aim for heuristic-driven (specific but flexible). Start minimal, add instructions reactively based on observed failures.
- **Tool definitions** answer: what it does, when to use it, what it returns. Keep the set minimal — bloated tool sets create ambiguous decision points and inflate 2-3x after JSON serialization.
- **Retrieved documents** — keep lightweight identifiers and load just-in-time (index, not copy). Strong identifiers (`customer_pricing_rates.json`) beat weak ones (`data/file1.json`). Chunk at semantic boundaries.
- **Message history** is the agent's scratchpad; it balloons silently in agentic loops. Replace stale verbatim tool outputs with compact summaries once processed.
- **Tool outputs** often dominate context — apply observation masking, keep only recently relevant content.

## Quality vs Quantity

Reject the assumption that a larger window solves memory problems. Processing cost grows disproportionately and performance degrades beyond effective capacity. Apply the **signal-density test**: for each piece of context, ask whether removing it would change the output. If not, remove it — redundant content dilutes attention from high-signal content.

## Gotchas

- **Nominal window ≠ effective capacity** — models degrade well before the advertised limit on complex retrieval/reasoning.
- **Character-based token estimates drift** — code is 2-3 chars/token, non-English often 1-2; use the real tokenizer for budget-critical math.
- **Message history balloons silently** — set a hard token ceiling and trigger compaction proactively (70-80% utilization).
- **Critical instructions in the middle get lost** — never place safety constraints or output-format rules in the middle of a long prompt; anchor them top or bottom.
- **Mixing instruction altitudes** (hyper-specific rules + vague directives) creates conflicting signals — group by altitude and keep each section consistent.
