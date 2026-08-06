---
name: llm-guardrails-and-safety
description: How to add guardrails to LLM apps — input and output filtering, moderation, topic/scope restriction, PII detection, structural validation, and layered defense; plus their limits. Use to make an LLM app safe, filter harmful/off-topic content, moderate inputs/outputs, or add guardrails around a model.
category: ai-agent
keywords_vi: llm guardrails safety, rào chắn an toàn llm, lọc input output, moderation kiểm duyệt, giới hạn chủ đề scope, phát hiện pii, validate cấu trúc, phòng thủ nhiều lớp
---

# LLM Guardrails & Safety

Guardrails are the checks around an LLM that keep an application **safe, on-topic, and reliable** — filtering harmful, off-scope, or malformed inputs and outputs. Since the model itself is unpredictable and can be manipulated (see prompt-injection-defense), guardrails are the enforcement layer that constrains what actually reaches users and downstream systems.

## Why the Model Alone Isn't Enough

You can't fully trust an LLM to police itself: it can be jailbroken/injected, hallucinate (see hallucination-mitigation), go off-topic, leak sensitive info, or produce unsafe/inappropriate content. Guardrails add **deterministic checks** around the probabilistic model — a safety net independent of the model's cooperation.

## Input Guardrails (before the model)

Screen what goes in:
- **Moderation** — block/flag harmful, abusive, or policy-violating inputs (moderation APIs/classifiers).
- **Prompt-injection / jailbreak detection** — spot known attack patterns (a layer, not a full defense — see prompt-injection-defense).
- **Scope/topic filtering** — reject off-topic requests for a focused app (a banking bot shouldn't answer medical questions).
- **PII detection** — catch sensitive data in inputs (redact/handle per policy — see below).
- **Length/format validation** — reject malformed or oversized inputs.

## Output Guardrails (before it reaches the user/systems)

Screen what comes out — often more important:
- **Content moderation** — block harmful/inappropriate generated content.
- **PII / secret leakage** — detect and redact sensitive data the model might emit (including regurgitated training/context data).
- **Groundedness/factuality checks** — flag unsupported claims for RAG (see rag-evaluation, hallucination-mitigation).
- **Structural validation** — ensure output matches the required schema before code uses it (see structured-output-from-llms).
- **Safety on actions** — validate any tool calls/commands the model produces (see llm-function-calling) — never execute unchecked.
- **Topic/brand compliance** — keep responses on-brand and within policy.

## Layered, Defense-in-Depth

Use **multiple layers** — no single check is perfect. Combine rules/regex (fast, deterministic for known patterns), classifiers/moderation models (broader coverage), and sometimes an LLM-based check (nuanced but fallible). Fail safe: when a guardrail triggers, degrade gracefully (a safe refusal/fallback message), don't crash or pass the bad content through.

## Limits (be realistic)

Guardrails **reduce** risk, they don't eliminate it: classifiers have false positives/negatives, attackers adapt, and over-aggressive filters block legitimate use (frustrating users). Tune the precision/recall trade-off to your risk tolerance (see how-anomaly-detection-works), and keep humans in the loop for high-stakes decisions. Guardrails are one part of a safety strategy (with least privilege, human confirmation, monitoring — see prompt-injection-defense, threat-modeling).

## Pitfalls (in understanding/using)

- **Trusting the model to self-moderate** — add independent, deterministic checks around it.
- **Only input** or **only output** guardrails — you need both (output is often the bigger risk).
- **Executing tool calls / using output** without validation → injection/damage (see llm-function-calling).
- **Over-filtering** → blocking legitimate use (false positives frustrate users); tune the balance.
- **Single-layer** reliance — no one check catches everything; layer them.
- **Not failing safe** — a triggered guardrail should degrade gracefully, not error out or leak.
- Treating guardrails as **complete safety** — they're one layer; combine with least privilege and human oversight.
- Ignoring **PII/compliance** obligations (logging inputs/outputs with sensitive data — see secrets-management, owasp-top-10).
