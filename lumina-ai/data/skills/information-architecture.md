---
name: information-architecture
description: How users navigate large applications through structure, naming, and relationships — naming decisions, data model alignment, confirmation dialogs, navigation at scale, button labels. Use when designing navigation, IA, or naming conventions for an app.
category: design
keywords_vi: information architecture, kiến trúc thông tin, thiết kế navigation, điều hướng ứng dụng, đặt tên tính năng, navigation app
---

# Information Architecture

Information architecture determines how users navigate large applications by establishing clear structure, naming, and relationships. Good IA is invisible; bad IA forces users to mentally map the product.

## Naming Decisions

- Use customer vocabulary, not internal terminology — "Use the user's vocabulary, not the engineer's."
- Be specific, consistent, and distinguish similar entities
- Name actions by effect (e.g. "Archive" vs. "Hide")
- Keep invented terms to ~10 maximum across the product

## Data Model Alignment

The interface should mirror how data actually works. Match entities to screens, expose relationships through hierarchy, show transformation paths (draft → published), and signal action scope before users commit.

## Confirmation Dialogs

Required for irreversible actions, bulk operations, wide-scope changes, and account-level decisions. A proper confirm dialog names the specific entity, states consequences, labels the destructive action descriptively, and makes Cancel the default focus.

## Navigation at Scale

- Limit primary navigation to 3 hierarchy levels maximum
- Group by user goals, not backend features
- Use search as an escape hatch for larger products
- Maintain consistent global headers across all views
- Use breadcrumbs for deep hierarchies (3+ levels)

## Button Labels

Keep them terse — ideally one word, maximum three. Let surrounding titles carry fuller context.
