---
name: button-states
description: Consistent visual states for interactive components — rest/hover/active/focus/disabled/loading, algorithmic color derivation from base color. Use when implementing or reviewing button/interactive element states.
category: design
keywords_vi: trạng thái nút bấm, nút bấm thiếu trạng thái, hover disabled, hover active disabled, thiết kế nút bấm, focus state button
---

# Button and Interactive Element States

## Six Required States

Every interactive element needs: rest (default appearance), hover (slightly darker), active/pressed (noticeably darker), focus (visible ring), disabled (low contrast), and loading (spinner or pulse).

## Algorithmic Color Derivation

Rather than arbitrarily selecting state colors, calculate them from the base color by adjusting HSL lightness:
- **Hover**: darken 8%
- **Active**: darken 14%

Example: a primary button at `hsl(243, 100%, 68%)` would have hover at `hsl(243, 100%, 60%)` and active at `hsl(243, 100%, 54%)`.

## Key Implementation Details

**Focus states** must use `outline` (not box-shadow) with 2–4px offset and cannot rely solely on hover styling, since keyboard users don't trigger hover.

**Disabled buttons** should have reduced opacity (0.4), `cursor: not-allowed`, and `pointer-events: none` to prevent interaction.

**Loading states** require `pointer-events: none` and `cursor: wait`, while maintaining button width to avoid layout shifts.

Optional: apply a subtle `scale(0.97)` transform on active for tactile feedback (keep scale between 0.95–0.98).

Transitions should run 80–150ms for a responsive feel without feeling sluggish.
