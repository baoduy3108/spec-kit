---
name: project-risk-management
description: How to manage project risk — identifying risks early, assessing by likelihood and impact, prioritizing, and choosing responses (avoid, mitigate, transfer, accept), plus tracking a risk register and dealing with unknowns. Use when planning a project, managing delivery risk, doing a pre-mortem, or deciding how to handle threats to a plan.
category: engineering
keywords_vi: project risk management, quản lý rủi ro dự án, nhận diện rủi ro sớm, đánh giá khả năng tác động, tránh giảm chuyển chấp nhận rủi ro, risk register, pre-mortem, xử lý bất định
---

# Project Risk Management

A risk is anything uncertain that could hurt (or help) a project — a dependency slipping, a key person leaving, an unproven technology, a vendor failing. Risk management is the discipline of **thinking about what could go wrong before it does**, so you're not blindsided. It doesn't eliminate uncertainty; it makes it manageable.

## Identify Risks Early

The cheapest time to handle a risk is **before** it materializes. Proactively brainstorm what could go wrong across categories: technical (unproven tech, integration), schedule (dependencies, estimates), people (availability, skills), external (vendors, market, regulation), and scope. A **pre-mortem** is powerful: imagine the project has already failed and ask "why?" — it surfaces risks people are reluctant to raise (see first-principles-review, threat-modeling for the security analog). Encourage the team to name risks without blame.

## Assess: Likelihood × Impact

Not all risks deserve equal attention. Rate each by:
- **Likelihood** — how probable is it?
- **Impact** — how bad if it happens?
Prioritize the **high-likelihood × high-impact** risks; those are where your attention goes. A rare, trivial risk can be noted and ignored; a likely, catastrophic one needs a plan now (see decision-making-frameworks).

## Choose a Response

For each significant risk, pick a strategy:
- **Avoid** — change the plan to remove the risk entirely (drop the risky feature, use proven tech).
- **Mitigate** — reduce its likelihood or impact (prototype the risky part early, add buffer, cross-train people).
- **Transfer** — shift it to someone better able to bear it (insurance, a vendor SLA, outsourcing).
- **Accept** — consciously decide to live with it (for low risks), ideally with a **contingency plan** ready if it happens.
The worst option is **ignore** (unconsciously accepting) — which is what happens without risk management.

## Track It: The Risk Register

Maintain a living **risk register** — the identified risks, their assessment, owner, and response — and **revisit it regularly**. Risks change: some pass, new ones appear, likelihoods shift. Assign each significant risk an **owner** responsible for watching it. Keep **buffer/contingency** in schedule and budget for the unknowns you can't enumerate (there are always some).

## Pitfalls (in understanding/using)

- **Ignoring risks** / optimism bias — assuming everything goes to plan (it won't); name risks explicitly.
- **Identifying risks once** and never revisiting — the register must be living.
- Treating all risks equally instead of **prioritizing by likelihood × impact**.
- **No contingency/buffer** — leaving zero slack so any surprise blows the plan.
- **No owner** — a risk everyone can see but no one watches.
- Confusing a risk (uncertain future event) with an **issue** (already happened — manage differently).
- **Analysis paralysis** — over-planning for improbable risks instead of shipping; balance diligence with pragmatism.
- Not fostering a culture where people can **raise** risks without being punished for pessimism.
