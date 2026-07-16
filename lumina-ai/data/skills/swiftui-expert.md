---
name: swiftui-expert
description: SwiftUI development best practices for iOS and macOS — state management, view composition, animations, deprecated API detection, correctness rules. Use when writing or reviewing SwiftUI code.
category: engineering
keywords_vi: swiftui, code swiftui, ios development, state management swift, swiftui best practice
---

# SwiftUI Expert

Guidance for SwiftUI development across iOS and macOS.

## Core Operating Principles

- Check for the latest APIs before using deprecated ones
- Prioritize native SwiftUI over UIKit/AppKit bridging unless necessary
- Focus on correctness and performance without enforcing unnecessary architectural patterns
- Use `#available` gating with fallbacks for version-specific features

## Main Task Workflows

1. **Code Review** — flag deprecated APIs, validate `#available` gating, apply topic-specific refactoring
2. **Code Improvement** — audit hot paths, extract complex views, replace soft-deprecated APIs
3. **New Implementation** — design data flow first, structure for optimal diffing, gate version APIs

## Critical Correctness Rules

- `@State` properties must be `private`
- Use `@StateObject` for view-owned objects; `@ObservedObject` for injected ones
- `ForEach` identity must be stable (never `.indices` or mutable-derived keys)
- Animations must include `.animation(_:value:)` with the value parameter
- Custom environment defaults must be stable (no `Model()`, `Date()`, `UUID()` expressions evaluated fresh each time)

## Topics Covered

State management, view composition, animations, accessibility, charts, localization, and platform-specific patterns (macOS/iOS).
