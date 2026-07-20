---
name: model-hierarchy
description: Cost-optimized model routing for AI agents — route tasks to appropriate model tiers (cheap/mid/premium) based on task complexity to cut cost 10x while maintaining quality on difficult tasks. Use when discussing how to architect a multi-model AI system or reduce LLM API costs.
category: engineering
keywords_vi: chọn model theo tác vụ, tối ưu chi phí llm, model tier, model rẻ model đắt, tiết kiệm chi phí ai, dùng model nào
---

# Model Hierarchy — Cost-Optimized Model Routing

This skill guides cost-effective AI agent operations by routing tasks to appropriate model tiers based on complexity.

## Key Principle

**"80% of agent tasks are janitorial."** Routine work (file reads, status checks, formatting) doesn't require expensive models — reserve premium options for problems demanding deep reasoning.

## Three-Tier System

**Tier 1 (Cheap, $0.10–0.50/M tokens)**: cheap/fast models for routine operations. Critical note: text-only models cannot handle image/vision tasks — use vision-capable alternatives instead.

**Tier 2 (Mid, $1–5/M tokens)**: mid-tier models for code generation, summarization, and moderate synthesis work.

**Tier 3 (Premium, $10–75/M tokens)**: top-tier models for complex reasoning, debugging, and architecture decisions.

## Task Classification

- **Routine** → single-step operations, clear instructions (Tier 1)
- **Moderate** → multi-step but well-defined synthesis (Tier 2)
- **Complex** → novel problem-solving, high stakes, previous failures (Tier 3)

## Cost Impact

An 80/15/5 split across tiers costs roughly 10x cheaper than pure premium while maintaining quality on difficult tasks.

## Anti-Patterns

Never assign vision tasks to text-only models; never run high-frequency/routine operations on expensive tiers.
