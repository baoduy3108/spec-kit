---
name: combat-systems-and-hitboxes
description: Combat systems and hitboxes — hitboxes vs hurtboxes, frame data (startup/active/recovery), hit detection and priority, damage/knockback/hitstun, cancels and combos, i-frames, and readable telegraphed attacks. Use when building a game's combat, melee/fighting mechanics, or hit detection.
category: engineering
keywords_vi: hệ thống chiến đấu và hitbox, vùng tấn công hitbox vùng nhận đòn hurtbox, dữ liệu khung hình startup active recovery, phát hiện trúng đòn và ưu tiên, sát thương hất văng knockback hitstun, hủy đòn combo cancel, khung bất tử i-frame đòn báo trước telegraph
---

# Combat Systems & Hitboxes

Combat is a conversation of collisions: an attack's active area meets a target's vulnerable area, and a cascade of damage, knockback, and stun follows. Getting it to feel fair, weighty, and readable is one of the hardest crafts in games — and it lives on precise, tunable rules.

## Hitboxes vs Hurtboxes

The foundational separation:
- **Hitbox** — the region that *deals* damage (a sword swing's arc, a projectile). Active only during specific frames.
- **Hurtbox** — the region that *takes* damage (a character's body). Usually roughly their silhouette.

A hit occurs when an attacker's **hitbox overlaps a target's hurtbox** while the hitbox is active. Keeping these separate (and independent from the *collision* box used for walls) is what lets you tune reach, vulnerability, and dodging precisely — e.g. a crouch that shrinks the hurtbox under a high attack.

## Frame Data

Every attack has a timeline, measured in frames:
- **Startup** — wind-up before the hitbox activates. Longer startup = slower but often stronger; it's also the **telegraph** (see below).
- **Active** — frames the hitbox is live and can connect.
- **Recovery** — cooldown after, during which you're vulnerable/committed.

Frame data is the tuning language of combat. A fast jab (low startup, quick recovery) vs a heavy swing (long startup, big punish window) — the whole balance of a moveset is frame data. **Commitment** (recovery) is what makes attacks a meaningful risk.

## Hit Resolution

- **Detection** — overlap test each active frame. Beware **tunneling** (fast attacks skipping past thin hurtboxes between frames) — sweep or thicken as needed.
- **Priority / trades** — when two hitboxes clash, rules decide who wins (or both trade). Fighting games codify this carefully.
- **One hit per swing** — track who's already been hit this attack so a single swing doesn't multi-hit unintentionally (unless designed to).

## Reaction: Damage, Knockback, Hitstun

A clean hit triggers a bundle that sells impact:
- **Damage** to health.
- **Knockback** — push/launch, direction and force by move.
- **Hitstun** — the victim is stunned for N frames, unable to act. Hitstun is what enables **combos** (chaining attacks while the enemy can't respond).
- **Juice** — hitstop/freeze frames, screen shake, flash, particles, a punchy sound (see game-feel-and-juice). Feedback is half of whether a hit "feels" real.

## Depth: Cancels, Combos, I-Frames

- **Cancels** — interrupting one move's recovery into another enables combo strings; the cancel rules define a game's combo ceiling.
- **Invincibility frames (i-frames)** — brief invulnerability on dodges/rolls/wake-up, letting skilled players phase through attacks. Core to dodge-based action games.
- **Armor / stagger / poise** — resist or absorb hits under conditions, adding to the rock-paper-scissors.

## Readability & Fairness

Combat must be **fair and legible**: attacks need clear **telegraphs** (wind-up animation, audio cue) so the player can react — an unreadable hit feels cheap. Generous hurtbox/hitbox tuning in the player's favor (as with movement forgiveness) makes combat feel *tight* rather than punishing. The player should always feel a hit taken was their mistake, and a hit landed was their skill.

Great combat is this rule-set tuned until every exchange is readable, every hit has weight, and depth emerges from simple, consistent parts.
