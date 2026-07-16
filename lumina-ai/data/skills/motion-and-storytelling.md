---
name: motion-and-storytelling
description: Applying Disney's 12 animation principles and cinematic techniques to UI motion — squash/stretch, anticipation, staging, timing, easing, parallax. Use when designing animation/motion for a UI.
category: design
keywords_vi: animation principle, motion design ui, disney animation ui, easing timing animation, chuyển động kể chuyện, motion storytelling
---

# Motion and Storytelling in UI

Applies Disney's 12 animation principles, cinematic techniques, and comic book conventions to web interface design. Core philosophy: motion should be felt, not watched — it serves communication, not decoration.

## Disney's 12 Applied

- Squash/stretch for physicality (button press feedback)
- Anticipation prepares users for actions
- Staging directs attention clearly
- Staggered animations feel more natural than simultaneous ones
- Easing curves matter — never use linear
- Arcs follow natural paths via `transform-origin`
- Timing conveys meaning (80–120ms for micro-interactions; 250–400ms for page transitions)
- Exaggeration adds satisfaction (10–15% overshoots)

## Cinematic Techniques

- Reveal animations guide user attention during scroll
- Parallax creates depth (use subtly)
- Cuts for decisive changes; dissolves for related states
- Scene-setting establishes context before details appear

## Comic Book Logic

- Sequential panels imply motion
- Typography conveys emotional tone
- Transitions are "the gutter" — where mental coherence forms

## Critical Rules

1. Respect `prefers-reduced-motion` media query
2. Animate only `transform` and `opacity` (avoid layout reflow)
3. Keep most transitions under 400ms
4. Use staggered list entrances (40–60ms offsets)
5. Match motion to brand personality
