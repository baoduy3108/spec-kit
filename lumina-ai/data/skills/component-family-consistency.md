---
name: component-family-consistency
description: Maintaining visual and functional coherence across UI component libraries — reuse-before-building hierarchy, shared design tokens, role distinction (buttons vs badges vs inputs). Use when building or auditing a component library/design system.
category: design
keywords_vi: design system consistency, component library, thiết kế bộ component, token thiết kế đồng bộ, thành phần giao diện đồng bộ, đồng bộ với nhau
---

# Component Family Consistency

Framework for maintaining visual and functional coherence across UI component libraries and design systems.

## Core Principles

**Reuse Before Building:** before creating new components, audit existing options:
1. Use an existing component as-is
2. Generalize something close via props/variants rather than cloning
3. Only build new when nothing fits and nothing can be reasonably extended

Parallel one-offs — three near-identical buttons, two cards with different radius — are how a design system drifts.

## Shared Design DNA

All interactive components should inherit from unified token definitions:

- **Border-Radius:** use a base token with derived variations (sm, base, lg, full) rather than independent values per component
- **Border Style:** limit to maximum two width options (the "2-Step Rule")
- **Spacing & Height:** components at the same scale share identical heights and padding
- **Shadow & Colour:** consistent logic for focus states (outline over box-shadow), elevation patterns, colour roles
- **One Interaction Language:** pick single patterns for hover response, active state, focus ring, and motion — reuse everywhere

## Critical Distinctions

Components sharing DNA must remain visually distinct by role:
- **Buttons** are clickable (solid fill, pointer cursor, hover response)
- **Badges** are read-only (muted, no hover or pointer cursor)
- **Inputs** are editable (border, placeholder, text cursor)

Role must be readable before interaction — use at least two visual channels to distinguish them.

## Semantic Chip Components

Avoid generic Badge components with many variants — one component per meaning, not one component with many variants.
