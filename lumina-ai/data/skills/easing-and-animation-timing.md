---
name: easing-and-animation-timing
description: Why good motion isn't linear — easing curves and animation timing that make UI and game motion feel natural. Covers ease-out/ease-in/ease-in-out and when to use each, cubic-bezier and spring physics, duration guidelines, staggering/choreography, and respecting reduced-motion. Use to design micro-interactions, transitions, and animations that feel responsive and polished instead of robotic.
category: frontend
keywords_vi: chuyển động không tuyến tính đường cong easing và nhịp animation tự nhiên, ease-out ease-in ease-in-out dùng khi nào, cubic-bezier và vật lý lò xo spring, thời lượng duration hợp lý, so le stagger và biên đạo choreography, tôn trọng giảm chuyển động reduced-motion
---

# Easing & Animation Timing

The difference between motion that feels **cheap and robotic** and motion that feels **polished and alive** is almost entirely **easing** — how a value accelerates and decelerates over time. Nothing in the physical world moves at constant speed and stops instantly; linear animation looks wrong because our brains expect momentum. Mastering easing curves, durations, and choreography is what separates amateur UI/game motion from professional (see game-feel-and-juice, signals-and-fine-grained-reactivity, high-end-visual-design).

## Easing Curves — and When to Use Each

Easing maps "linear time" to "eased progress." The core families:
- **Ease-out** (fast start, slow settle) — the **default for UI** entering/responding. Elements appear to arrive quickly then settle gently; feels **responsive** because motion starts immediately. Use for things coming **in** or reacting to user input.
- **Ease-in** (slow start, fast end) — feels **sluggish** on its own; use mainly for elements **leaving** the screen (accelerate away), rarely for entrances.
- **Ease-in-out** (slow-fast-slow) — smooth and balanced; good for elements **moving between two on-screen positions** (a card sliding across), longer transitions.
- **Linear** — reserve for **continuous** motion (a spinner, a marquee, a progress bar) where there's no start/stop.
- **Spring / physics-based** — instead of a fixed duration, motion is driven by **stiffness/damping**; it can overshoot slightly and settle, feeling the most natural and **interruptible** (great for gestures/drag). Modern UI toolkits favor springs.
- **cubic-bezier(x1,y1,x2,y2)** — the CSS/JS way to define a custom curve; `ease-out` ≈ `cubic-bezier(0,0,0.2,1)`.

## Duration and Distance

- **Keep it fast** — most UI micro-interactions land in **~150–300ms**. Under ~100ms feels instant (sometimes too abrupt); over ~400ms starts to feel slow and blocks the user.
- **Scale duration with distance/size** — a small toggle animates faster than a full-screen sheet; huge elements moving in 150ms look frantic.
- **Enter vs exit** — exits can be a touch faster than entrances; don't make users wait to dismiss things.

## Choreography: Stagger and Sequence

When many elements animate at once, moving them **all simultaneously** looks chaotic. **Stagger** them — a small delay (~20–50ms) between items — so a list "cascades" in. Establish a **hierarchy**: the primary element leads, secondary elements follow. Coordinated, slightly-offset motion reads as intentional and premium (the reveal-on-scroll cascade is exactly this).

## Accessibility: Respect Reduced Motion

Some users get motion sickness or distraction from animation. **Honor `prefers-reduced-motion`**: when set, drop or drastically simplify non-essential motion (replace slides/parallax with a quick fade or nothing). This is a real accessibility requirement, not optional polish.

## Design Guidance (for understanding/using)

- **Never animate UI linearly** — default to **ease-out** for entrances/responses; springs for interactive/gestural motion.
- **Keep durations ~150–300ms** and scale with distance; fast feels responsive.
- **Ease-in for exits, ease-in-out for on-screen A→B moves**, linear only for continuous loops.
- **Stagger groups** with small delays and a clear lead element for premium choreography.
- **Respect `prefers-reduced-motion`** — provide a calm fallback.

## Pitfalls (in understanding/using)

- **Linear** easing on UI → robotic, cheap-feeling motion.
- **Ease-in** on entrances → sluggish, delayed-feeling response.
- Durations **too long** (>400ms) → the interface feels slow and gets in the way.
- Animating everything **at once** → chaotic; stagger and sequence instead.
- Ignoring **reduced-motion** → accessibility failure and motion sickness for some users.
