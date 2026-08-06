---
name: cognitive-load-theory
description: How cognitive load theory informs teaching and content design — working memory's limits, the three load types (intrinsic, extraneous, germane), managing them via chunking, worked examples, and removing distractions, and why overload blocks learning. Use to understand cognitive load, why learners get overwhelmed, instructional design, worked examples, or designing content that's learnable.
category: engineering
keywords_vi: cognitive load theory, tải nhận thức, giới hạn bộ nhớ làm việc, intrinsic extraneous germane load, chunking worked example, loại bỏ nhiễu, quá tải cản trở học
---

# Cognitive Load Theory

Cognitive Load Theory explains **why learners get overwhelmed and how to prevent it** — a foundational idea for teaching, tutoring, and designing any learning content (or even UI — see ui-density). The core constraint: our **working memory is very limited**, and learning fails when we exceed it.

## The Bottleneck: Working Memory

We have effectively unlimited **long-term memory** but tiny **working memory** — we can only hold and process a few items (~4–7) at once (see how-cpu-caches-work for a loose analogy). Learning means moving information into long-term memory (building **schemas**), and that processing happens in the bottlenecked working memory. **Overload the working memory and learning stops** — the learner can't process what they can't hold. Managing load is therefore central to effective instruction.

## The Three Types of Load

- **Intrinsic load** — the **inherent difficulty** of the material itself (some concepts are just complex, with many interacting parts). You can't remove it, but you can **manage** it by sequencing (simple → complex) and breaking it into parts.
- **Extraneous load** — load from **how it's presented**, unrelated to the actual learning: confusing explanations, cluttered visuals, split attention (info in two places you must combine), irrelevant detail, poor design. This is **wasted** load that you should **minimize** — it steals working-memory capacity from learning.
- **Germane load** — the "good" load of **actually building understanding** (making connections, forming schemas). You want to **free up capacity** (by cutting extraneous load) and direct it here.
The strategy: **reduce extraneous, manage intrinsic, maximize germane.**

## Practical Techniques

- **Chunk** — break content into small, digestible pieces; don't dump everything at once (respects working-memory limits).
- **Worked examples** — for novices, studying a **fully worked example** is far more efficient than struggling to solve from scratch (which overloads working memory with problem-solving instead of learning the method). Progress from worked examples → partially-completed → solve independently (the "completion effect" — links to scaffolding-and-zpd).
- **Remove extraneous load** — clear explanations, clean visuals, integrate related info (avoid split attention), cut irrelevant detail (see technical-writing, minimalist-ui).
- **Sequence from simple to complex** — build schemas incrementally so later material has a foundation.
- **Segment and pace** — let learners process before adding more.

## The Expertise Reversal

Important nuance: what helps **novices** (heavy scaffolding, worked examples, step-by-step guidance) can **hinder experts** (redundant, adds load). As learners build schemas, reduce support and let them solve independently (fading — see scaffolding-and-zpd). Match the support level to expertise.

## Pitfalls (in understanding/using)

- **Information dump** — presenting too much at once → working-memory overload, nothing learned. Chunk it.
- **Extraneous load** from cluttered/confusing presentation, split attention, or irrelevant detail — wasted capacity; simplify.
- Making **novices solve from scratch** instead of studying worked examples → overload, not learning.
- Ignoring **intrinsic load** sequencing — throwing complex material without building prerequisites.
- **Over-supporting experts** (expertise reversal) — redundant scaffolding that adds load; fade it.
- Confusing "looks comprehensive" with "learnable" — dense ≠ effective.
- Adding "engaging" extras (animations, tangents) that increase extraneous load without aiding learning.
