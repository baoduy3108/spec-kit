---
name: reviewing-ai-generated-code
description: How to review code produced by AI agents — the specific risks (plausible-but-wrong logic, hallucinated APIs, over-engineering, security holes, silent assumptions), verifying it actually works, and the discipline of never merging unreviewed AI code. Use to review AI-generated code, verify agent output, or catch the common failure modes of AI-written code.
category: engineering
keywords_vi: reviewing ai generated code, review code ai, ai generated code, hallucinate api, logic sai hợp lý plausible, over-engineering lỗ hổng bảo mật, kiểm chứng chạy thật, không merge code chưa review
---

# Reviewing AI-Generated Code

AI agents produce code fast, but it can be **subtly wrong in ways that look right** — which makes reviewing it a distinct, essential skill. The core discipline: **you are responsible for AI-generated code as if you wrote it**, so never merge what you haven't reviewed, understood, and verified (see working-with-ai-coding-agents, code-review-and-quality).

## Why AI Code Needs Special Scrutiny

AI code is **plausible by construction** — it's generated to look like correct code, so it passes a casual glance even when it's wrong. Unlike an obvious error, a hallucinated API, a subtly incorrect condition, or a missing edge case blends in. And agents are confident regardless of correctness. So "it looks right" and "it compiled" are **not** enough — AI output demands active verification, not passive approval.

## The Specific Risks to Look For

- **Plausible-but-wrong logic** — code that reads sensibly but has a subtle bug (off-by-one, wrong condition, mishandled edge case, incorrect assumption about behavior). The most common and dangerous.
- **Hallucinated APIs / libraries** — calls to functions, parameters, or packages that **don't exist** or don't work as the agent "believes" (see hallucination-mitigation). Verify APIs are real and used correctly.
- **Over-engineering** — unnecessary abstraction, complexity, or unrequested features the agent added eagerly (see preventing-agent-over-engineering). Is every piece justified?
- **Security issues** — injection, missing validation, unsafe handling, leaked secrets — agents readily produce insecure code (see security-and-hardening, owasp-top-10).
- **Silent assumptions** — the agent guessed on an ambiguity and built the wrong behavior (check against the spec/intent — see writing-executable-specifications).
- **Missing edge cases / error handling** — happy path works, boundaries/failures unhandled.
- **Doesn't match conventions** — ignores project patterns/constitution (see writing-a-project-constitution).
- **Subtle inefficiency** — works but is needlessly slow/wasteful.

## Verify It Actually Works

Reviewing the code isn't enough — **run and test it** (see verification-before-completion). AI code that reads correctly can fail at runtime (hallucinated API, wrong logic). Execute the relevant path, run/extend tests, check it against the acceptance criteria. "I read it and it looks fine" has burned many; observe it working.

## Review Like a Skeptical Senior on a Junior's PR

Treat AI output like a **junior developer's pull request**: assume good-but-unverified. Read it critically, ask "why does this work / where could it fail," check it against the **intent** (not just internal consistency), and don't approve on trust. Understand every line you merge — if you can't explain what it does and why it's correct, don't ship it.

## Pitfalls (in understanding/using)

- **Merging on "looks right"** — AI code is plausible by design; looks-right ≠ correct.
- **Not running/testing** it — verify it actually works, don't just read it (see verification-before-completion).
- Missing **hallucinated APIs** — check that calls/params/libraries are real and correct.
- Overlooking **security** issues agents readily introduce (validation, injection, secrets).
- Not checking against **intent/spec** — the code can be internally fine but build the wrong thing (silent assumptions).
- Accepting **over-engineering** — trim unrequested complexity/abstraction.
- Merging code you **don't understand** — you own it; if you can't explain it, don't ship it.
- Reviewing less carefully **because** an AI wrote it (or because it's fast) — the speed makes discipline more important, not less.
