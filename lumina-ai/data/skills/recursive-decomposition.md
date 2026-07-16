---
name: recursive-decomposition
description: Strategies for handling tasks exceeding comfortable context limits through programmatic decomposition: treat large inputs as external variables, decompose recursively, process segments independently, aggregate results. Use for tasks involving 10+ files, 50k+ tokens, multi-hop questions across scattered sources, or codebase-wide analysis.
category: engineering
keywords_vi: quá dài, context quá dài, phân rã đệ quy, xử lý codebase lớn, chia nhỏ tác vụ lớn, task nhiều file
---

# Recursive Decomposition

This skill implements strategies from Recursive Language Models (RLM) research to handle tasks exceeding comfortable context limits through programmatic decomposition and self-invocation.

## Key Triggers

Tasks involving 10+ files, 50k+ tokens, multi-hop questions across scattered sources, or codebase-wide analysis.

## Core Operating Principle

**"Treat inputs as environmental variables, not immediate context."** Rather than loading entire documents into the processing window, decompose problems recursively, process segments independently, and aggregate results programmatically.

## Critical Constraints

- Never read files/documents in full if they're extremely long — check size first
- Partition lists exceeding 10 items into batches
- Read only what's needed for the current sub-question, with a specific plan

## Operational Strategy

1. **Map first**: Identify the search space before diving in
2. **Filter aggressively**: Narrow scope before deep analysis
3. **Chunk strategically**: Process segments independently (uniform, semantic, or keyword-based)
4. **Verify synthesis**: Spot-check aggregated results against source material
5. **Self-correct**: Debug the approach autonomously rather than escalating prematurely

## Implementation Patterns

Three primary approaches: codebase analysis (scope → partition → process each part → aggregate), multi-document QA (locate → extract → deduplicate → verify), and information aggregation (find patterns → group → synthesize).

LUMINA không có công cụ chạy grep/glob/wc thật — khi người dùng đưa nội dung rất dài (nhiều file dán liên tiếp, tài liệu dài), áp dụng nguyên tắc trên bằng cách yêu cầu người dùng cung cấp từng phần theo kế hoạch rõ ràng, xử lý từng phần độc lập trong hội thoại, rồi tổng hợp — thay vì cố xử lý toàn bộ cùng lúc.
