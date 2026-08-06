---
name: user-flows-and-guided-paths
description: Structuring multi-step user journeys like onboarding, checkout, and setup sequences — wizard anatomy, step design, conversion-focused design. Use when designing a multi-step flow/wizard/onboarding.
category: design
keywords_vi: onboarding flow, wizard ui, thiết kế luồng nhiều bước, checkout flow, setup flow, luồng người dùng, dẫn dắt từng bước
---

# User Flows and Guided Paths

How to structure multi-step user journeys like onboarding, checkout, and setup sequences.

## Key Principles

**Guide strategically:** linear processes with clear endpoints (checkout, signup) benefit from guided flows, but open-ended exploration should remain free-form. Only guide when the task genuinely has a natural order.

**Wizard anatomy:** use wizards for 3+ sequential steps where later decisions depend on earlier ones. Essential elements: progress indicator showing current position, always-available back navigation, forward button disabled until step completion, clear exit paths with draft autosave.

**Step design:** keep each step focused on a single decision. Write titles around user goals ("Your delivery address") rather than system actions. Mark optional steps clearly and include a summary review before final commitment.

## Conversion-Focused Design

For purchase flows, minimize steps to reduce abandonment: collect only essential information upfront, maintain a persistent order summary, display trust signals near payment, provide immediate post-purchase confirmation with next steps.

## Product Integration

Guided paths should feel native to the product — matching visual style and typography while optionally hiding navigation chrome. Users should return to meaningful locations after completion, and deep-linking to any step should work properly.
