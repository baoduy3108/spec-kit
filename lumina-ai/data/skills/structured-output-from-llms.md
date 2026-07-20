---
name: structured-output-from-llms
description: How to get reliable structured output (JSON/schema) from LLMs — JSON mode, schema/constrained decoding, function-calling for structure, validation and retries, and prompt techniques; plus why free-text parsing is fragile. Use to make an LLM return valid JSON, extract structured data, integrate LLM output into code, or enforce an output schema.
category: ai-agent
keywords_vi: structured output llm, đầu ra có cấu trúc json schema, json mode, constrained decoding, function calling cho cấu trúc, validate retry, trích xuất dữ liệu có cấu trúc
---

# Structured Output from LLMs

To use an LLM's output **in code** (extract fields, drive logic, call APIs), you need it in a reliable **structured format** — usually JSON matching a schema — not free prose. Getting LLMs to produce valid, consistent structured output reliably is a distinct skill, because they naturally generate free text.

## Why Free-Text Parsing Is Fragile

Asking "return JSON" in the prompt and parsing the reply often works... until it doesn't: the model adds prose around the JSON ("Here's the data: {...} Hope this helps!"), uses wrong types, omits fields, adds trailing commas, or hallucinates structure. Regex/hand-parsing free text is brittle and breaks in production. You need stronger guarantees.

## Techniques (weakest to strongest)

- **Prompting** — clearly specify the exact schema, give an example, and ask for **only** JSON. Helps, but doesn't guarantee validity.
- **JSON mode** — many APIs have a mode that constrains output to **syntactically valid JSON** (no prose wrapper). Better, but doesn't enforce *your* schema (fields/types).
- **Function/tool calling** — define a function with a typed parameter **schema**; the model returns arguments matching it (see llm-function-calling). A robust, widely-supported way to get schema-shaped output — you're really using tool-calling to extract structured data.
- **Constrained / structured decoding** — the strongest: the decoder is **constrained at generation time** to only produce tokens valid under a JSON Schema/grammar (Outlines, JSON Schema mode, grammars). This **guarantees** the output parses and matches the schema — invalid output is literally impossible. Use when supported and correctness is critical.

## Validate, Then Retry

Even with the above, **always validate** the parsed output against your schema (types, required fields, ranges) with a real validator (Pydantic, Zod, JSON Schema — see how-json-serialization-works). On failure, **retry** — optionally feeding the validation error back to the model ("your output was missing field X / X must be a number") so it self-corrects. Validation + retry turns "usually works" into "reliably works." Never trust LLM output as valid without checking (see llm-guardrails-and-safety).

## Design the Schema Well

- Keep it **simple and flat** where possible — deeply nested/complex schemas are harder for models to fill correctly.
- Use **enums** for constrained fields (the model picks from allowed values).
- Provide **descriptions** per field (they guide the model like documentation).
- Allow a **"null/unknown"** option so the model can decline rather than fabricate a value (reduces hallucination — see hallucination-mitigation).

## Pitfalls (in understanding/using)

- **Parsing free text** with regex/string-hacking → brittle; use JSON mode / function-calling / constrained decoding.
- **No validation** of the parsed output → malformed/wrong-type data flows into your code and breaks later.
- Assuming "return JSON" in the prompt **guarantees** valid JSON — it doesn't; enforce it.
- **Over-complex/deeply-nested** schemas the model fills incorrectly — simplify/flatten.
- No **"unknown" escape** → the model fabricates values for fields it can't determine.
- **No retry** on validation failure — one bad generation fails the whole request.
- Ignoring that constrained decoding can slightly affect quality/latency — trade off vs the guarantee.
