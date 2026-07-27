---
name: proof-driven-iteration
description: Judging AI/agent output by the RUNNING artifact — a live URL, a rendered screen, a recorded clip, passing tests — rather than by a clean compile or plausible-looking code, so visible defects drive the next iteration. Covers why "it compiles / it looks right" is a weak signal, closing the loop with real observation (run it, look at it, capture proof), and iterating until the artifact demonstrably works. Use to validate generated code/games/UIs, or set up outcome-driven iteration.
category: ai-agent
keywords_vi: lặp cải thiện dựa trên kết quả chạy thật, đánh giá từ sản phẩm đang chạy, không tin compile sạch, lỗi nhìn thấy được dẫn dắt lần sửa tiếp, đóng vòng lặp bằng quan sát thật
---

# Proof-Driven Iteration

A common failure of AI-generated work — code, games, UIs — is declaring success on a **weak signal**: "it compiles", "the code looks correct", "the function returns something". None of those prove the thing **actually works** for the user. **Proof-driven iteration** insists the judge of success is the **running artifact itself** — a live URL, the rendered screen, a recorded clip, a passing end-to-end test — and lets **observable defects** drive each next fix (see verification-before-completion if present, agent-observability-and-tracing, test-driven-development, agentic-workflow-patterns).

## The Weakness of "It Compiles / It Looks Right"

- **Compiles ≠ works** — a game can build cleanly and render a black screen; an API can typecheck and return wrong data.
- **Looks right ≠ is right** — code that reads plausibly can be subtly broken; an LLM is especially prone to *confident-looking* wrong output.
- **Unit test passes ≠ feature works** — the integration/user-visible behavior is what matters.
The model can't reliably grade its own untested output; it needs **external, observable evidence**.

## The Loop: Build → Run → Observe → Fix

1. **Build** the artifact.
2. **Run** it for real — start the server, open the page, launch the game, execute the flow.
3. **Observe** the actual result — screenshot the UI, capture a clip, read the real output, run E2E tests. This is the **proof**.
4. **Compare** to the intent; **visible defects become the next tasks** (blank screen, wrong layout, crash, wrong number).
5. **Fix and repeat** until the running artifact demonstrably matches the goal.
The distinguishing move: **the agent judges from the running product, not from the source or the compiler.**

## Why It Works

- **Grounds the model in reality** — real output can't be hallucinated away; a black screen is a black screen.
- **Turns vague "done" into a checklist** — each observed defect is a concrete next step.
- **Catches integration failures** unit tests miss (the parts don't combine correctly).
- **Produces trustworthy deliverables** — the user receives something *seen working*, not *assumed working*.

## Design Guidance

- **Define "proof" up front** — what observable evidence means success (screenshot matches, tests green, endpoint returns X).
- **Actually run it** — serve/render/execute; don't stop at compile.
- **Capture the evidence** — screenshot/clip/log/test output; make it inspectable (and replayable — see agent-observability-and-tracing).
- **Let visible defects set the agenda** — iterate on what you *see* failing.
- **Prefer end-to-end/visual checks** for user-facing work over unit tests alone.
- **Stop when the artifact demonstrably works**, not when it merely builds.

## Pitfalls (in understanding/using)

- Declaring done on **"it compiles"** → ships black screens / silent wrong behavior.
- Trusting **plausible-looking code** without running it → confident-wrong output.
- **Unit tests only** → misses integration/visual failures the user hits.
- Not **capturing proof** → can't tell if it truly worked or verify later.
- Iterating on the **source** instead of the **observed run** → fixing imagined problems.
- No up-front **definition of proof** → "done" stays subjective.
