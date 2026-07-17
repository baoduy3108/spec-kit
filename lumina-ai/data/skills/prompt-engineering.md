---
name: prompt-engineering
description: Design effective prompts for LLMs — be explicit and specific, give role/context, show examples (few-shot), let the model reason before answering, structure with delimiters, control output format, and iterate against failures. Use when writing or debugging a prompt, a system prompt, or an LLM feature.
category: ai-agent
keywords_vi: viết prompt, prompt engineering, tối ưu prompt, system prompt, prompt cho ai, few-shot, câu lệnh cho model, prompt không ra kết quả đúng
---

# Prompt Engineering

Prompts are specifications. Vague prompts get vague outputs; the fix is almost always more specificity, not clever wording.

## Core Techniques

- **Be explicit and specific** — state exactly what you want, the constraints, and what "done" looks like. Don't rely on the model to infer unstated requirements.
- **Give role and context** — who the model is acting as, who the audience is, and why. Context shapes tone and depth.
- **Show, don't just tell (few-shot)** — 2–5 examples of input→output teach format and edge-case handling far better than description. Make examples cover the tricky cases.
- **Let it reason first** — for anything non-trivial, ask for step-by-step thinking *before* the final answer. Forcing an answer first degrades reasoning quality. (With reasoning models, don't over-prescribe the steps.)
- **Structure with delimiters** — separate instructions, context, examples, and the user's data with clear markers (headings, XML-like tags, triple backticks). Ambiguity about "which part is the data" causes errors.
- **Control the output** — specify the exact format (JSON schema, markdown, bullet list, length). For machine-parsed output, give the schema and one example; say what to do when a field is unknown.

## Structure a System Prompt

Role & goal → capabilities & tools → hard rules/constraints → output format → examples. Put the most important constraints at the **start and end** (models attend least to the middle). Prefer positive instructions ("respond in Vietnamese") over long lists of prohibitions.

## Iterate

Prompt engineering is empirical. Collect failing cases, identify the pattern, add a targeted instruction or example, re-test. Change one thing at a time. Keep a small eval set so a fix for one case doesn't regress others.

## Anti-Patterns

- **Politeness as instruction** — "please try to maybe consider…" reads as optional; state requirements directly.
- **Overloading one prompt** — if it must do five unrelated things, split into steps/chained calls.
- **Contradictory instructions** — "be concise" + "explain thoroughly" forces a coin-flip; resolve the tension explicitly.
- **Negative-only specs** — listing what *not* to do without saying what *to* do leaves the target undefined.
- **Assuming hidden context** — the model only knows what's in the prompt; paste the data, don't reference "the file above" that isn't there.
