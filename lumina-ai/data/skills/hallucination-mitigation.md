---
name: hallucination-mitigation
description: How to reduce LLM hallucinations — why models fabricate confident falsehoods, grounding in retrieved sources (RAG), citations and verification, letting the model say "I don't know", lowering temperature, and checking outputs. Use to reduce hallucinations, make LLM answers trustworthy, add citations/grounding, or handle when a model makes things up.
category: ai-agent
keywords_vi: hallucination mitigation, giảm ảo giác llm, mô hình bịa tự tin, grounding nguồn rag, trích dẫn citation xác minh, cho phép trả lời không biết, hạ temperature, kiểm tra đầu ra
---

# Hallucination Mitigation

LLMs **hallucinate** — produce confident, fluent statements that are false or fabricated (fake facts, invented citations, made-up APIs). It's inherent to how they work, not a bug you fully fix, so building trustworthy LLM apps means **reducing** hallucinations and **detecting** them (see how-llms-work, rag-fundamentals).

## Why Models Hallucinate

An LLM predicts **plausible** next tokens, not **true** ones. It has no built-in notion of truth or of "I don't know" — it generates the most likely-sounding continuation, which is usually right for well-represented facts but confidently wrong for things it doesn't actually know (rare facts, recent events, specifics like exact numbers/names/citations). Fluency masks the unreliability — it sounds equally confident whether right or wrong. The model also aims to be **helpful**, which biases it toward *answering* rather than admitting ignorance.

## Grounding (the biggest lever)

The most effective mitigation: **ground the model in real sources** instead of relying on its parametric memory.
- **RAG** (see rag-fundamentals) — retrieve relevant, authoritative content and instruct the model to answer **only from it**. It's far less likely to fabricate when the facts are in front of it.
- **Instruct grounding** — "Answer using only the provided context. If the answer isn't in the context, say you don't know." This constrains it to supported claims.
- **Faithfulness matters** — even with context, models can drift/embellish; measure and enforce groundedness (see rag-evaluation).

## Citations & Verification

- **Require citations** — have the model cite which source/passage each claim comes from. This makes answers **verifiable** (users/systems can check), and the act of citing constrains the model toward supported statements. (Beware: models can fabricate *citations too* — verify they exist and say what's claimed.)
- **Verify programmatically** — for critical facts, check the claim against the source or a tool (see llm-function-calling); cross-check with a second pass.

## Let It Say "I Don't Know"

A crucial design choice: **explicitly permit and reward "I don't know"/"not in the sources."** Models default to answering because that seems helpful; give them an out (in the prompt, in the output schema — see structured-output-from-llms) so uncertainty produces an honest non-answer instead of a confident fabrication. Test the unanswerable case.

## Other Levers

- **Lower temperature** for factual tasks — reduces creative drift toward invented content (higher temp = more variety = more fabrication risk).
- **Use a stronger model** for facts — bigger/better models hallucinate less (but never zero).
- **Constrain scope** — narrow, well-supported tasks hallucinate less than open-ended "tell me about X."
- **Human review / guardrails** for high-stakes outputs (see llm-guardrails-and-safety); check outputs before acting on them.

## Pitfalls (in understanding/using)

- Trusting **fluent, confident** output as true — confidence is uncorrelated with correctness for LLMs.
- Relying on the model's **memory** for specific facts (dates, numbers, names, citations, recent events) instead of **grounding** it in sources.
- **Not permitting "I don't know"** → the model fabricates rather than declining.
- Trusting **citations** the model produces without verifying they exist and support the claim (fabricated references are common).
- High **temperature** on factual tasks → more drift/invention.
- Assuming RAG **eliminates** hallucination — it reduces it; the model can still embellish beyond the context (measure faithfulness — see rag-evaluation).
- Acting on unverified LLM output in **high-stakes** contexts without human/programmatic checks.
