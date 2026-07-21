---
name: fuzzing-basics
description: How fuzzing works — automatically feeding a program vast amounts of random, malformed, and edge-case input to find crashes, hangs, and security bugs, plus coverage-guided fuzzing and why it excels at parsers and untrusted input. Use to understand fuzzing, fuzz testing, finding crashes/security bugs automatically, or coverage-guided fuzzers.
category: engineering
keywords_vi: fuzzing, fuzz testing, coverage-guided fuzzing, ném input ngẫu nhiên méo mó tìm crash, kiểm thử mờ, tìm lỗi bảo mật tự động, giỏi với parser input không tin cậy
---

# Fuzzing Basics

Fuzzing is an automated testing technique that **throws huge amounts of random, malformed, and unexpected input** at a program to make it **crash, hang, or misbehave** — surfacing bugs and security vulnerabilities that human-written tests miss because nobody thought to try that weird input. It's especially effective on code that parses **untrusted input** (see testing-strategy, security-and-hardening).

## The Idea: Let a Machine Try the Weird Inputs

Human tests check inputs humans **think of** — mostly valid/expected cases. But bugs and vulnerabilities hide in the inputs nobody imagined: malformed files, absurd sizes, unexpected byte sequences, boundary values, deeply nested structures. Fuzzing **automates** exploring that vast, weird input space: generate mountains of inputs, feed them in, and watch for **crashes, hangs, assertion failures, memory errors, or infinite loops**. The machine tries millions of cases you never would. Any input that triggers a failure is a **bug report** (with a reproducer).

## Coverage-Guided Fuzzing (the smart kind)

Naive random fuzzing rarely gets past input validation (random bytes are usually rejected immediately). Modern fuzzers (AFL, libFuzzer) are **coverage-guided**: they **instrument** the program to see which code paths each input reaches, and **evolve** inputs that explore **new** paths — mutating the inputs that reached deeper, keeping the ones that unlock new code. This is a feedback loop (almost genetic): it "learns" the input format enough to burrow deep into the logic, finding bugs far past the surface. This made fuzzing dramatically more effective.

## What Fuzzing Catches

- **Crashes** — segfaults, null derefs, unhandled exceptions.
- **Memory safety bugs** (C/C++) — buffer overflows, use-after-free (paired with sanitizers like ASan) — a major source of security vulnerabilities.
- **Hangs / infinite loops / resource exhaustion** — DoS conditions.
- **Assertion failures / invariant violations** — logic bugs.
- **Security vulnerabilities** — much of modern vuln research is fuzzing.

## Where It Excels

- **Parsers / decoders** — file formats, network protocols, media codecs, deserializers — anything turning bytes into structure. These process **untrusted input** and are historically bug-riddled — the perfect fuzzing target.
- **Anything taking untrusted input** — APIs, input validation, interpreters.
- **Libraries** with a clear input→output boundary (easy to write a fuzz target).

## Design Guidance

- **Fuzz code that parses untrusted input** — highest ROI (parsers, decoders, deserializers, protocol handlers).
- **Use coverage-guided fuzzers** (libFuzzer/AFL) — vastly more effective than pure random.
- **Pair with sanitizers** (ASan/UBSan/MSan) to catch memory/undefined-behavior bugs the fuzzer triggers.
- **Write a fuzz target** — a small harness taking a byte array and exercising your code.
- **Seed the corpus** with valid example inputs so the fuzzer starts from realistic structure.
- **Run continuously** (fuzzing finds more over time) — CI/OSS-Fuzz style; save the corpus.
- **Fix + add reproducers** — turn each crash into a regression test.

## Pitfalls (in understanding/using)

- **Pure random** fuzzing without coverage guidance → stuck at input validation, shallow.
- Not pairing with **sanitizers** → miss memory-safety bugs that don't immediately crash.
- **No seed corpus** → the fuzzer wastes time rediscovering the input format.
- Fuzzing only **briefly** → fuzzing rewards long/continuous runs; short runs find little.
- Ignoring **hangs / resource exhaustion**, not just crashes → miss DoS bugs.
- Treating a fuzz-found crash as an edge case → many are exploitable security bugs; triage seriously.
- Expecting fuzzing to check **correctness** → it mostly finds crashes/hangs; use assertions/oracles for logic (or property-based testing).
