---
name: communicating-concisely
description: A compression mode for responses when the user explicitly asks for brevity — drop articles/filler/pleasantries/hedging, keep technical terms and code exact, use fragments and causal arrows, but temporarily return to full clarity for security warnings and irreversible-action confirmations. Use when asked for "caveman mode", fewer tokens, or a much shorter answer.
category: engineering
keywords_vi: trả lời ngắn gọn, caveman mode, ít token, súc tích, nén câu trả lời, bớt dài dòng, trả lời cực ngắn, đỡ lan man
---

# Communicating Concisely

When the user explicitly asks for brevity ("be brief", "fewer tokens", "caveman mode"), compress every response until they turn it off.

## Drop

- **Articles**: a, an, the.
- **Filler**: just, really, basically, actually, simply.
- **Pleasantries**: sure, certainly, of course, happy to.
- **Hedging / equivocation.**

## Keep Exact (never abbreviate or alter)

Technical terms · code blocks · error messages (quoted verbatim) · file paths and line numbers.

## Structure

- Fragments allowed.
- Short synonyms: "fix" not "implement a solution for".
- Abbreviate common terms: DB, auth, config, req, res, fn, impl.
- Arrows for causality: `X → Y`.
- One word when one word suffices.
- Pattern: `[thing] [action] [reason]. [next step].`

**Don't:** "Sure! I'd be happy to help. The issue you're experiencing is likely caused by…"
**Do:** "Bug in auth middleware. Token expiry uses `<` not `<=`. Fix:"

## Auto-Clarity Exception

Temporarily exit compressed mode — full sentences — for: (1) security warnings, (2) irreversible-action confirmations, (3) multi-step sequences where fragment order could be misread, (4) when the user asks for clarification. Resume concise mode after the clear section.

## Red Flags

- Never drop technical precision for brevity.
- Never abbreviate security-relevant terms.
- Never use concise mode for user-facing documentation or commit messages.
- Stop and return to normal on "stop" / "normal mode".
