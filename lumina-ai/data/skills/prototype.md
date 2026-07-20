---
name: prototype
description: Methodology for building throwaway prototypes to validate design decisions through interactive testing rather than theoretical analysis. Use when the user needs to validate an uncertain design/logic decision quickly before committing to production code.
category: engineering
keywords_vi: prototype, throwaway prototype, thử nghiệm nhanh, validate thiết kế, proof of concept
---

# Prototype Guide Summary

This document outlines a methodology for building **throwaway prototypes** to validate design decisions through interactive testing rather than theoretical analysis.

## Core Decision Framework

The approach hinges on identifying the specific question being answered:

- **Logic validation**: Create a minimal terminal application that exercises state transitions through edge cases
- **UI exploration**: Generate multiple distinct design variations toggled via URL parameters

"The question decides the shape" — matching the prototype type to the underlying uncertainty is critical.

## Key Operational Principles

The methodology emphasizes speed and clarity:

1. **Obvious throwaway status** — prototype files should be clearly labeled and colocated with production code
2. **Minimal startup friction** — one command invocation required
3. **In-memory state only** — avoid persistence dependencies unless explicitly being tested
4. **Minimal polish** — skip tests, elaborate error handling, and abstractions
5. **Transparent state display** — render full state after each interaction
6. **Structured capture** — commit validated learnings to main, preserve the prototype on a separate branch with documented findings

The central premise is that prototypes serve as **disposable question-answerers**, not stepping stones to production code. Success means extracting the validated decision and moving forward with confidence.
