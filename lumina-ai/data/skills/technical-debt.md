---
name: technical-debt
description: Manage technical debt — recognize the kinds (deliberate vs inadvertent, prudent vs reckless), make it visible, decide when to pay it down vs live with it, and communicate it to non-technical stakeholders as risk and interest, not just "messy code." Use when prioritizing refactoring vs features or explaining debt trade-offs.
category: ai-agent
keywords_vi: technical debt, nợ kỹ thuật, khi nào refactor hay làm tính năng, trả nợ code, quản lý nợ kỹ thuật, thuyết phục sếp refactor, đánh đổi tốc độ chất lượng
---

# Technical Debt

Technical debt is the implied future cost of choosing an easy/limited solution now instead of a better one that takes longer. Like financial debt, it can be a smart tool or a slow crisis — the metaphor's power is the **interest**: debt makes every future change slower until it's paid down.

## The Four Quadrants (not all debt is equal)

- **Deliberate & prudent** — "we'll ship the simple version now to hit the deadline and refactor after launch." A conscious, tracked trade-off. Fine — if you actually pay it.
- **Deliberate & reckless** — "we don't have time for design." Knowingly cutting corners with no plan. Dangerous.
- **Inadvertent & prudent** — "now that it's built, we see a better design." Learning; normal and healthy to address.
- **Inadvertent & reckless** — "what's layering?" Debt from not knowing better. Fix by growing the team's skill.
Prudent, tracked, deliberate debt is a legitimate tool; reckless/hidden debt is what kills velocity.

## Make It Visible

Invisible debt never gets paid. Track it explicitly — a debt backlog, `// TODO: tech-debt` markers, or tickets — with its **impact** (what it slows/risks) and **cost to fix**. You can't prioritize what you can't see.

## When to Pay It Down

- **Pay it** when it's in a **hot area** you keep touching (interest is high), when it's causing bugs/incidents, or when it blocks upcoming work. Refactor **opportunistically** — clean the code you're already changing (boy-scout rule) rather than big risky rewrites.
- **Live with it** when it's in a stable, rarely-touched corner (low interest — leave it), or when the product's future is uncertain. Not all debt must be repaid; repay the debt that's actually costing you.
- Reserve a **steady fraction** of capacity (e.g. ~20%) for debt/maintenance so it doesn't accumulate into a crisis — cheaper than a "we must stop and rewrite" event.

## Communicating to Stakeholders

Frame debt in business terms, not "the code is ugly": it's **risk and slowdown** — "this shortcut means each new feature here takes 2× longer and risks outages; N days of cleanup restores our speed." Tie it to velocity, reliability, and cost. Non-technical stakeholders fund *risk reduction and speed*, not aesthetics.

## Pitfalls

- **Ignoring it** until velocity collapses and you demand a full rewrite (usually a disaster).
- **Perfectionism** — treating all debt as urgent and never shipping (over-paying low-interest debt).
- **Invisible debt** — no tracking, so it never competes with features.
- **Big-bang rewrites** instead of incremental paydown (high risk, often fail).
- Calling every disliked decision "debt" — reserve the term for real deferred cost.
