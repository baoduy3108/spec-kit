---
name: intelligent-tutoring-systems
description: How intelligent tutoring systems (ITS) work — modeling the domain, the learner, and pedagogy to deliver adaptive, one-on-one-style instruction; the classic components (domain/student/tutor model + interface), step-level feedback, and why adaptivity matters. Use to understand intelligent tutoring systems, adaptive educational software, or the architecture of an AI tutor.
category: engineering
keywords_vi: intelligent tutoring systems its, hệ thống dạy học thông minh, mô hình miền học viên sư phạm, dạy kèm thích ứng adaptive, phản hồi từng bước, kèm 1-1
---

# Intelligent Tutoring Systems

An Intelligent Tutoring System (ITS) is educational software that provides **adaptive, one-on-one-style instruction** — adjusting to each learner like a good human tutor, rather than showing everyone the same fixed content. The famous finding motivating them: one-on-one tutoring produces dramatically better outcomes than classroom instruction (Bloom's "2 sigma"), and ITS aim to approximate that at scale.

## Why One-on-One Works (and what ITS emulate)

A good tutor **adapts continuously**: they know the subject, sense what the student does and doesn't understand, and choose the right next question, hint, or explanation for *that* student at *that* moment. Fixed content (a video, a textbook) can't do this. ITS try to replicate the tutor's adaptivity computationally.

## The Classic Components

Traditional ITS have four interacting models:
1. **Domain model** — the **expert knowledge** of the subject: the concepts, skills, procedures, and how to solve problems correctly. What's being taught, structured.
2. **Student (learner) model** — a running estimate of **what this learner knows**, their misconceptions, and progress (see knowledge-tracing). The system's belief about the student's state, updated as they work.
3. **Tutoring (pedagogical) model** — the **teaching strategy**: given the domain and the student model, decide what to do next — pose a problem, give a hint, explain, review, advance. The decision-making brain.
4. **Interface / UI** — how the learner interacts (the learning environment).
The loop: observe the learner's actions → update the student model → the tutoring model picks the next best pedagogical action → present it → repeat.

## Step-Level Feedback (a key strength)

Unlike an end-of-quiz grade, ITS give **immediate, step-by-step feedback** as the learner works through a problem — catching errors when they happen, offering targeted hints, and preventing the student from practicing mistakes. This granular, timely feedback (see formative-assessment-and-feedback) is much of what makes tutoring effective.

## Adaptivity

The core value: **personalization**. The system adjusts difficulty, pacing, hints, and content to the individual — spending time where the learner struggles, skipping what they've mastered (see adaptive-and-personalized-learning, mastery-learning). No two learners get the same path.

## The Modern (LLM) Shift

Classic ITS required painstakingly hand-authored domain and pedagogical models (expensive, narrow). **LLM-based tutors** (see building-an-ai-tutor) can converse, explain, and adapt across broad domains more flexibly — but bring their own challenges (hallucination, giving away answers, no guaranteed correctness). The **principles** of ITS (model the learner, adapt, give step-level feedback, follow sound pedagogy) remain the blueprint for building a good AI tutor.

## Pitfalls (in understanding/using)

- Building a **fixed content** delivery system and calling it a "tutor" — the value is **adaptivity** to the individual.
- **No student model** — you can't adapt if you don't estimate what the learner knows (see knowledge-tracing).
- **Weak pedagogy** — a system that just presents/tests without sound teaching strategy (scaffolding, feedback, sequencing) isn't tutoring.
- **Delayed/coarse feedback** instead of timely step-level feedback (letting learners practice errors).
- For LLM tutors: **hallucinating** wrong content or **giving away answers** instead of guiding (see building-an-ai-tutor, hallucination-mitigation).
- Ignoring **motivation/engagement** (see learner-motivation-and-engagement) — a technically-adaptive tutor learners won't use fails.
- Over-personalizing to noise (over-fitting the student model to a few actions).
