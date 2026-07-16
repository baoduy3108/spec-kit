---
name: codebase-design
description: Establishes a shared vocabulary for designing deep modules — maximizing leverage for callers and locality for maintainers while keeping code testable. Use when designing module boundaries, evaluating whether a module/abstraction earns its place, or discussing interface complexity vs implementation complexity.
category: engineering
keywords_vi: deep module, module sâu, thiết kế module, interface complexity, deletion test, seam
---

# Codebase Design Skill

This resource establishes a shared vocabulary for designing **deep modules** — the goal is to maximize leverage for callers and locality for maintainers while keeping code testable.

## Key Concepts

**Depth** describes the ratio of behavior to interface complexity. A module is deep when "a large amount of behaviour sits behind a small interface," and shallow when the interface is nearly as complex as what it hides. The goal is to hide complexity, not expose it.

The core principle: "Depth is a property of the interface, not the implementation." This means internal complexity is fine — what matters is what callers must learn.

**Seams** (borrowing Michael Feathers' term) mark locations where you can alter behavior without editing the module itself. Placing the seam is a distinct design choice from what goes behind it.

## Design Practices

Three testability rules emerge:

1. Accept dependencies rather than creating them internally
2. Return results instead of producing side effects
3. Keep the surface area small — fewer methods and simpler parameters mean simpler testing

The **deletion test** checks whether a module earns its place: if you remove it, does complexity vanish (shallow) or reappear across multiple callers (deep)?

## Shared Language

Consistent terminology matters here. Use "module," "interface," "seam," and "adapter" precisely — avoiding substitutes like "component," "API," or "boundary" that blur distinct concepts.
