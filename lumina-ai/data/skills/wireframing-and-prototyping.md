---
name: wireframing-and-prototyping
description: Wireframing and prototyping — fidelity levels (paper/lo-fi/hi-fi), when to use each, wireframes for structure vs mockups for visuals vs prototypes for flow, clickable prototypes for user testing, fast iteration over polish, and avoiding premature high fidelity. Use when planning a UI, sketching layouts, or building a prototype to validate before building.
category: design
keywords_vi: khung dây wireframe, tạo mẫu prototype, mức độ chi tiết fidelity, lo-fi hi-fi, wireframe cấu trúc mockup hình ảnh, mẫu bấm được clickable, test người dùng trước khi code, lặp nhanh thay vì đánh bóng sớm, tránh chi tiết cao quá sớm premature
---

# Wireframing & Prototyping

Before building a UI, you sketch it — and *how much* you sketch depends on what question you're trying to answer. Wireframing and prototyping are about learning cheaply: catching structure and flow problems on paper or a mockup, where a change costs minutes, instead of in code, where it costs days.

## Fidelity Levels

Fidelity is how finished the artifact looks, and each level answers a different question:
- **Paper / sketch (lo-fi)** — boxes and labels, hand-drawn. Fastest possible; ideal for brainstorming layout and flow. Its *roughness is a feature*: nobody argues about the shade of blue on a napkin sketch, so feedback stays on structure and ideas.
- **Wireframe** — clean but grayscale, no real styling. Focuses attention on **structure, hierarchy, and content** — what goes where, what's prioritized — deliberately *without* visual design distracting the conversation.
- **Mockup (hi-fi)** — real colors, type, imagery; looks like the finished product. For evaluating **visual design** and getting stakeholder sign-off on look.
- **Prototype** — connected screens you can click through. For testing **flow and interaction** — can a user actually get through the task?

## Match Fidelity to the Question

The key skill is not over-investing too early. **Premature high fidelity** wastes effort (you polish pixels on a layout that testing will reveal is wrong) and, worse, makes people reluctant to change something that "looks done" — sunk-cost bias sets in. Start rough, raise fidelity only as ideas stabilize:
- Exploring *what to build* / arrangement → paper or wireframe.
- Validating *the flow works* → clickable prototype (fidelity can still be low).
- Deciding *the visual language* / selling it → mockup.

## Prototypes for Testing

A clickable prototype is the cheapest way to run **usability testing before writing code**. Wire up the happy path (and a couple of error branches), hand it to real users, and watch where they hesitate, misclick, or get lost. Each finding fixed here is one you didn't ship. The prototype needn't be complete — just real enough to observe genuine behavior on the core task.

## Iterate Fast, Stay Cheap

- **Quantity early** — many rough sketches beat one polished idea; explore before committing.
- **Reusable components / a kit** speed hi-fi mockups once the direction is set.
- **Don't gold-plate throwaways** — a prototype's job is to be learned from and discarded; polish belongs in the real build.
- **Keep the throughline** — carry decisions from wireframe → mockup → build so the rationale isn't lost.

The whole point is **de-risking**: every layout mistake, confusing flow, and misplaced priority caught in a sketch or prototype is a mistake that never reaches production — where it would be slow and expensive to undo.
