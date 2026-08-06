---
name: characterization-testing
description: How characterization (golden master) testing works — writing tests that capture the CURRENT behavior of legacy code (even if buggy) to create a safety net before refactoring, rather than testing intended behavior. Use to safely refactor legacy code, add tests to untested code, understand golden master testing, or lock in existing behavior.
category: engineering
keywords_vi: characterization test golden master, viết test ghi lại HÀNH VI HIỆN TẠI của code cũ dù có bug, tạo lưới an toàn trước khi refactor, không phải test hành vi mong muốn, khóa hành vi hiện có
---

# Characterization (Golden Master) Testing

Characterization testing — also called **golden master** testing — writes tests that **capture what legacy code *currently does*, not what it *should* do**. The goal isn't to verify correctness; it's to create a **safety net** so you can **refactor or change untested code without accidentally altering its behavior**. It's the essential first move when working with **legacy code that has no tests** (see testing-strategy, snapshot-testing).

## The Problem: Changing Untested Legacy Code Is Terrifying

You need to modify (refactor, extend, fix) a piece of **old code with no tests**. But you don't fully understand what it does, and it may have behaviors — even **bugs** — that other systems now **depend on**. If you change it, you might break something and never know until production. You're stuck: you can't safely refactor without tests, but you can't easily write "correct" tests for code you don't understand. Characterization testing breaks this deadlock.

## The Core Idea: Pin the Current Behavior

Instead of testing **intended** behavior, you test **actual current** behavior:
1. **Run the existing code** with a range of inputs and **record its outputs** — exactly as they are, warts and all.
2. **Write tests asserting those recorded outputs** (the "golden master" — the captured current behavior).
3. Now you have a **safety net**: if a refactor changes any output, a test fails, telling you that you **altered behavior** — intended or not.
Crucially, these tests **encode current behavior including bugs** — because the point is "did I change anything?", not "is it correct?". If a test captures buggy output, that's fine: it means you'll *notice* if your change affects that output.

## How It Differs From Normal Testing

- **Normal tests** assert **intended/correct** behavior ("should return the discount").
- **Characterization tests** assert **whatever it currently does** ("returns exactly this, including that off-by-one"), as a **change detector**.
This is the same mechanism as **snapshot testing** (see snapshot-testing) — capture output, fail on diff — applied specifically to **understanding and safely changing legacy code**.

## The Workflow

1. **Characterize** — capture current behavior across representative inputs (a golden master of outputs).
2. **Refactor safely** — restructure the code; the characterization tests catch any behavior change.
3. **Then fix bugs deliberately** — once you have a safety net and understand the code, *intentionally* change behavior (fixing the captured bug) and **update** the test to the new correct value — a conscious decision, not an accident.
So characterization tests are often **scaffolding**: they protect the refactor, then get replaced by proper behavioral tests as understanding grows.

## Design Guidance

- **Use it before refactoring untested legacy code** — get a safety net first.
- **Capture a range of inputs** — cover the important paths so the net is meaningful (combine with coverage/mutation to find gaps).
- **Accept that it locks in bugs** — that's intended; it's a change detector, not a correctness check.
- **Review diffs deliberately** — when a characterization test fails, decide: unintended (revert) or intended (update the golden value)?
- **Evolve toward real tests** — as you understand the code, replace characterization tests with intention-revealing behavioral tests and fix the captured bugs on purpose.
- **Automate capture** for large output surfaces (golden files).

## Pitfalls (in understanding/using)

- Mistaking characterization tests for **correctness** tests → they pin *current* behavior (bugs included), not intended behavior.
- **"Fixing" a captured bug** during a refactor without realizing → the test fails; decide intentionally, don't blindly update.
- **Blindly updating** golden values on failure (like snapshot rubber-stamping) → defeats the safety net.
- Too **few inputs** captured → the net has holes; real behavior changes slip through.
- Keeping characterization tests **forever** as if they're good behavioral tests → evolve them into intention-revealing tests.
- Non-deterministic output making the golden master **flaky** → control time/randomness (see flaky-test-diagnosis).
