---
name: codebase-onboarding-guide
description: Structure a comprehensive onboarding guide for a new team member joining a project — project overview (stack, frameworks), the architectural layers, a guided learning tour (ordered path through key components), the domain/business-flow map, and a first-contribution path. Use when asked to help someone get up to speed on a codebase or write onboarding docs.
category: engineering
keywords_vi: hướng dẫn onboarding dự án, tài liệu cho người mới vào team, lộ trình học codebase, guided tour dự án, làm quen dự án mới, người mới bắt đầu từ đâu, onboarding developer
---

# Codebase Onboarding Guide

A good onboarding guide answers a newcomer's real question — *"where do I start and in what order?"* — not just "here is a list of folders." Structure it as a learning path, layered from the big picture down to first contribution.

## Structure

### 1. Project Overview
Start with orientation: what the product does, the primary languages and frameworks, the runtime/deployment shape, and the one-paragraph "why this exists." A newcomer should grasp the purpose before any file path.

### 2. Architectural Layers
Describe the system as a small number of layers (e.g. UI → application/services → domain → data/infra). For each layer: its responsibility, the key modules that live in it, and how requests flow across the boundaries. Layers give the newcomer a map to hang every later detail on.

### 3. Guided Tour (ordered)
The heart of the guide: an **ordered** walkthrough of the most important components — a recommended learning path, not an alphabetical index. Each stop has a title, why it matters, and the specific files/functions to read, sequenced so each builds on the last (entry point → core flow → key abstractions → cross-cutting concerns). Order by learning value, not by folder.

### 4. Domain / Business-Flow Map
Explain the *business* the code serves: the main domains, the key end-to-end flows (e.g. "sign-up", "checkout", "sync"), and the steps each flow passes through in code. This connects code structure to what the product actually does — the piece pure architecture diagrams miss.

### 5. Setup & First Contribution
Close with the practical on-ramp: how to run the project locally, how to run the tests, the conventions to follow (link an existing conventions doc rather than restating it), and a suggested small first task that touches a real but low-risk part of the system.

## Principles

- **Path, not inventory** — sequence content by learning value; a newcomer needs a route, not a directory listing.
- **Big picture first** — purpose and layers before file paths; details are meaningless without the frame.
- **Connect code to domain** — always tie structure back to what the product does.
- **Assume less** — write for someone who does not yet know the stack's idioms; name them.
- **Work from what you have** — base the guide on the code/docs the user provides; where a detail is missing, ask them to paste it rather than inventing project specifics.
