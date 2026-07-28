---
name: stealth-game-design
description: Stealth game design — enemy perception (vision cones, hearing, alert states), readable detection and feedback, level design with cover and routes, tension and tools (distraction, hiding, takedowns), the detection-recovery loop, and forgiving-but-tense difficulty. Use when designing a stealth game, sneaking mechanics, or enemy AI awareness systems.
category: design
keywords_vi: thiết kế game lén lút stealth, nhận thức kẻ địch nón nhìn vision cone nghe âm thanh, trạng thái cảnh giác alert state, phát hiện dễ đọc và phản hồi, thiết kế màn có vật che và lối đi cover route, căng thẳng và công cụ đánh lạc hướng ẩn nấp hạ gục, vòng bị phát hiện và thoát
---

# Stealth Game Design

Stealth games are about **avoiding detection** — moving through a space of alert enemies using observation, timing, and the environment rather than force. The genre runs on tension: the thrill of nearly being caught, the satisfaction of slipping past. Designing it means building enemies whose senses are **legible and fair**, so evasion is a puzzle of information, not luck.

## Enemy Perception (Legible AI)

The heart of stealth is enemy **senses** the player can read and exploit:
- **Vision cones** — enemies see within a field of view and range; the player reads and stays out of it. Line-of-sight, distance falloff, and lighting (dark = harder to spot) matter.
- **Hearing** — noise (running, gunfire, thrown objects) draws attention; movement speed trades speed for stealth.
- **Peripheral / suspicion zones** — a graduated "spotted-ness" rather than binary, so players get warning.

The cardinal rule: **perception must be readable**. The player should *understand* why they were seen and feel it was their mistake. Unfair, invisible detection kills the genre. Telegraph sightlines, show enemy facing, and make the rules consistent.

## Alert States & Feedback

Detection is a **state machine** with clear feedback:
- **Unaware → Suspicious → Searching → Alerted → Combat → (cooldown back down).**
- **Meters/indicators** — a detection meter filling, a "?" then "!" icon, audio stings — tell the player exactly where they stand and give a window to react (break line of sight, hide) *before* full detection.
- **Search behavior** — alerted enemies investigate last-known-position, then give up after a time, letting the player recover. This graceful escalation/de-escalation is what makes stealth a loop rather than instant fail.

Good feedback turns "I got caught randomly" into "I lingered too long — I saw it coming."

## Level Design for Stealth

Stealth levels are spatial puzzles of **observation and routes**:
- **Cover & concealment** — shadows, foliage, crates, vents; places to hide and wait.
- **Multiple routes** — several viable paths (high/low, front/around) reward observation and planning; a single path is a memorization test, not stealth.
- **Patrol patterns** — enemies on readable, learnable routes create timing windows ("when he turns, I move"). Observation → plan → execute is the core loop.
- **Sightline & rhythm design** — arrange guards, lights, and cover so the space is a solvable-but-tense gauntlet with breathing points.

## Tools & Tension

Give the player agency over the encounter:
- **Distraction** — throw objects, make noise, lure guards away to open a path.
- **Takedowns** — silent removal of isolated enemies (with the tension of hiding the body / being seen).
- **Hiding spots** — closets, tall grass, ledges to break line of sight.
- **Gadgets** — see through walls, disable cameras, mark enemies.

These convert stealth from passive avoidance into active manipulation of the space and its guards.

## The Detection Loop & Difficulty

- **Fail states** — full alert may mean combat (many modern games let you fight or flee and re-hide) rather than instant game-over. Instant-fail stealth is punishing; a recovery loop is more forgiving and replayable.
- **Tension over punishment** — the *near-miss* is the fun. Design for lots of close calls, not lots of restarts.
- **Difficulty knobs** — guard counts, vision ranges, alert speed, save frequency. Optional "ghost" (never detected) challenges reward mastery.

## Emergent Play

The best stealth is a **systemic sandbox** — perception, physics, AI, and tools interacting so players improvise solutions the designer didn't script (chain distractions, use environment). Systemic depth gives replay value and player expression.

Design stealth games around **readable, fair enemy perception with clear alert feedback**, spatial levels of cover and multiple routes with learnable patrols, tools to manipulate guards, and a forgiving detection-recovery loop that maximizes tension over punishment. The magic is the held breath of *almost* being seen — and the exhale of slipping through.
