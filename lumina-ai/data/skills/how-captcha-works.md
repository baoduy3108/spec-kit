---
name: how-captcha-works
description: How CAPTCHA works — challenges that are easy for humans but hard for bots, from distorted-text and image-grid puzzles to invisible behavioral/risk-scoring (reCAPTCHA v3), and the arms race with automated solvers. Covers the accessibility and UX trade-offs. Use to understand bot prevention, CAPTCHA types, and their limitations.
category: engineering
keywords_vi: captcha hoạt động thế nào, chống bot, phân biệt người và máy, recaptcha, thử thách hình ảnh, invisible captcha behavioral, hạn chế captcha, hiểu captcha
---

# How CAPTCHA Works

CAPTCHA ("Completely Automated Public Turing test to tell Computers and Humans Apart") tries to block bots by posing a challenge that's easy for a human and hard to automate — protecting signups, logins, forms, and votes from abuse.

## The Evolution (an arms race)

- **Distorted text** (old) — read wavy/obscured letters. Once OCR and ML got good, machines could read these better than humans, so they became ineffective (and annoying).
- **Image-grid puzzles** ("select all crosswalks") — pick images matching a prompt. Harder for bots historically; also **doubled as free labeling** of training data (e.g. for self-driving). But modern vision models now solve many of these.
- **Behavioral / invisible (reCAPTCHA v3, hCaptcha)** — the modern approach: instead of a puzzle, the system **scores how human-like your behavior is** (mouse movement, timing, navigation, browser signals, IP/history) in the background and returns a **risk score**. Low-risk users pass invisibly; suspicious ones get a challenge or are blocked. Better UX (usually no puzzle), but relies on tracking signals.
- **Proof-of-work / device checks** (e.g. some privacy-focused ones) — make the client do a small computation, cheap for one user, expensive at bot scale.

## The Fundamental Tension

CAPTCHA is a **balance**, never a wall: too weak → bots pass; too hard → real users fail and abandon. And it's an **arms race** — as AI/solving services improve (including cheap human-solving farms and now vision LLMs), each CAPTCHA type weakens, pushing toward behavioral/risk-based systems. No CAPTCHA is unbeatable; it raises the *cost* of abuse, it doesn't eliminate it.

## Accessibility & UX Concerns

- **Accessibility** — visual/audio puzzles exclude users with disabilities; provide accessible alternatives (audio challenges are themselves solvable by speech recognition — the arms race again). Behavioral CAPTCHAs are more accessible but raise privacy concerns.
- **UX friction** — every CAPTCHA costs conversions; use it where abuse risk justifies it, not everywhere.
- **Privacy** — invisible/behavioral CAPTCHAs track users; a trade-off some object to.

## Why It Matters

Explains: why CAPTCHAs moved from puzzles to invisible risk-scoring, why they're never perfect (arms race + solving services + AI), the UX/accessibility/privacy costs, and that they're one layer of bot defense — pair them with rate limiting (see rate-limiting-algorithms), reputation, and monitoring rather than relying on CAPTCHA alone.

## Pitfalls / Notes

- **Over-using CAPTCHA** → lost real users/conversions.
- **Treating it as unbeatable** — bots and solving farms get through; it's cost-raising, not a wall.
- **Accessibility exclusion** without alternatives.
- **Privacy** implications of behavioral tracking.
- Better combined with rate limiting, anomaly detection, and reputation than used alone.
