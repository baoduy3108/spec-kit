---
name: loading-states-perceived-performance
description: Manage user expectations during wait times through strategic loading states — spinners vs skeleton screens vs progress bars by duration, optimistic UI, perceived performance. Use when designing loading/wait states for a UI.
category: design
keywords_vi: loading state, trạng thái loading, skeleton screen, optimistic ui, trạng thái tải, hiệu năng cảm nhận
---

# Loading States and Perceived Performance

How to manage user expectations during wait times through strategic loading states.

## Choose Loading Patterns by Duration

- Under 1 second: inline spinners
- 1–3 seconds: skeleton screens
- Over 3 seconds: progress bars
- Full page: staggered animations

## Skeleton Screens

Should mirror final content layout, include subtle shimmer effects (~1.5s animation), and fade actual content in smoothly rather than snapping into place.

## Prioritize What Matters

Load high-value content first, stream secondary elements behind skeletons, and prefetch predictable next steps without speculatively loading everything.

## Add Personality

Use brand-aligned copy ("Brewing your dashboard..."), custom animations, or process transparency for waits over 2 seconds.

## Optimistic UI

Update the interface immediately assuming success, rolling back only on failure — ideal for toggles, likes, or renames.

## Critical Practices

- Disable buttons during loading to prevent double-submissions
- Match skeleton shapes exactly to reduce layout shift
- Keep shimmer animations subtle and slow
- Respect `prefers-reduced-motion` for all animations
- Provide clear rollback paths for optimistic actions

Smooth, contextual loading experiences reduce frustration far more than actual speed improvements alone.
