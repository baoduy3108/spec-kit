---
name: micro-interactions
description: Brief animations (200-600ms) that make interfaces feel responsive — confirmatory feedback, animated icons, spring easing, the 'button stability rule' (never scale/shift buttons). Use when designing or reviewing UI animations/micro-interactions.
category: design
keywords_vi: micro-interaction, animation ui, animation nút bấm, hiệu ứng nút bấm, animation phản hồi, thiết kế animation
---

# Micro-Interactions

Brief animations (200–600ms) that make interfaces feel responsive and thoughtful. They confirm actions, reward milestones, reveal information, or add texture to moments that matter.

## What Works

- Animations rooted in natural physics (ease-out, spring curves, overshoot)
- Confirmatory feedback that clarifies user intent
- Non-blocking transitions that let users continue immediately
- Celebration for genuine achievements, restraint for routine tasks

## What Fails

- Blocking or repetitive animations that create noise
- Pure decoration with no informational value
- Layout-destabilizing effects on interactive elements

## Key Patterns

- Animated icons (checkmark draw-on, heart pulse, hamburger morph)
- Toggles with spring easing that overshoot slightly before settling
- Skeleton-to-content fades at 150–200ms
- Remote attention-grabbers (badge bloom, subtle highlight fade) that stop once complete
- **Button stability rule**: never scale, shift, or resize buttons on interaction — convey feedback through color, inner shadows, or interior element movement

## The Sacred Rule

Buttons must remain rock-solid in the layout. Feedback happens *within* the button's bounds, never affecting its footprint or position.

## Restraint Test

Does this clarify the result or just add visual bustle? Also respect `prefers-reduced-motion` accessibility preferences.
