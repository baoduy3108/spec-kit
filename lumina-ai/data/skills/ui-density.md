---
name: ui-density
description: Balancing information density across platforms and user types — desktop vs mobile density, density tokens, feature reduction by platform, reading cost. Use when deciding how dense/sparse a UI layout should be.
category: design
keywords_vi: ui density, độ dày đặc giao diện, compact vs spacious ui, mật độ thông tin giao diện, giao diện quá chật, quá chật hay quá thưa
---

# UI Density Guide

How to balance information density across platforms and user types.

## Key Principles

**Platform-appropriate density:** desktop supports medium-to-high density for precise work; mobile requires sparse layouts with touch-friendly spacing; tablet sits between.

**User type matters:** domain experts tolerate complexity if it solves the *right* problem quickly. Power users and enterprise operators accept denser interfaces, while occasional users need clear visual breathing room.

## Implementation Strategies

- Use CSS density tokens (compact, default, spacious variants) rather than ad-hoc padding values
- On mobile, remove or collapse secondary features instead of simply shrinking them
- Prioritize reading reduction — every word costs cognitive load across repeated visits
- Maintain minimum 44×44px touch targets even in compact variants

## Feature Reduction by Platform

Core tasks appear everywhere; secondary actions collapse on mobile; advanced settings link to separate screens on smaller devices.

## The Reading Cost

The most under-counted cost in a dense UI is reading. Users scan for scannable elements; leading with the key word/number reduces orientation time. Replace text with recognizable icons only where truly unambiguous — decorative icons become noise.
