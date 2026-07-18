---
name: agile-and-scrum
description: How agile, Scrum, and Kanban work — the agile mindset (iterative delivery, feedback, adaptation), Scrum roles/events/artifacts (sprints, standups, reviews, retros), Kanban's flow/WIP limits, and common failure modes ("fake agile"). Use when working in an agile team, running Scrum/Kanban, understanding sprints, or improving a team's process.
category: engineering
keywords_vi: agile scrum kanban, phát triển linh hoạt, lặp iterative, sprint standup review retrospective, product owner scrum master, wip limit flow, fake agile, quy trình đội nhóm
---

# Agile, Scrum & Kanban

Agile is a **mindset** for building software: deliver value **iteratively** in small increments, get **feedback** early, and **adapt** — rather than planning everything up front and delivering once at the end (the old "waterfall" way). Scrum and Kanban are the two most common frameworks that implement it.

## The Agile Mindset (what actually matters)

The Agile Manifesto values: **individuals and interactions** over processes/tools, **working software** over documentation, **customer collaboration** over contracts, and **responding to change** over following a plan. The essence: build in small slices, show real working software often, learn from feedback, and adjust. The *mindset* matters more than the ceremonies — many teams "do Scrum" without being agile.

## Scrum

A structured framework built on **time-boxed sprints** (typically 1–2 weeks), each producing a potentially shippable increment.
- **Roles** — **Product Owner** (owns/prioritizes the backlog, represents the customer — see roadmap-prioritization), **Scrum Master** (facilitates the process, removes blockers), **Development Team** (builds it).
- **Events** — **Sprint Planning** (pick backlog items for the sprint), **Daily Standup** (brief daily sync: progress, plan, blockers), **Sprint Review** (demo the increment, get feedback), **Retrospective** (reflect on how to improve the *process*).
- **Artifacts** — **Product Backlog** (all the work, prioritized), **Sprint Backlog** (this sprint's commitment), the **Increment**.
The **retrospective** is arguably the most valuable event — continuous improvement of how the team works.

## Kanban

A lighter, **flow-based** approach — no fixed sprints. Work items flow across a board (To Do → In Progress → Done), with **WIP (work-in-progress) limits** capping how many items are in each stage. Limiting WIP exposes bottlenecks, reduces context-switching, and improves throughput and cycle time. Great for continuous/unpredictable work (support, ops) or teams wanting less ceremony. Focus: **visualize flow, limit WIP, optimize cycle time**.

## Scrum vs Kanban

- **Scrum** — cadenced (sprints), role-defined, good for feature teams delivering in planned increments.
- **Kanban** — continuous flow, minimal roles, good for a steady stream of varied work.
Many teams blend them (Scrumban). Pick what fits the work, not dogma.

## Pitfalls (in understanding/using)

- **"Fake agile" / cargo-culting** — doing the ceremonies (standups, sprints) without the mindset (feedback, adaptation, empowered teams) → all overhead, no benefit.
- **Standups as status reports** to a manager instead of team coordination — keep them brief and for the team.
- **Skipping or wasting retrospectives** — losing the continuous-improvement engine.
- Treating **story points/velocity** as productivity targets to game (they're for planning, not performance).
- **No WIP limits** in Kanban → everything "in progress," nothing finished.
- Micromanaging via agile theater instead of **empowering the team** (a core agile value).
- Rigidly following a framework rather than adapting the process to the team's reality.
