---
name: incident-response
description: Respond to production incidents calmly and effectively — detect and assess severity, stop the bleeding (mitigate before diagnosing), communicate status, coordinate roles, restore service, then run a blameless postmortem with real action items. Use during an outage/incident or when setting up on-call/incident process.
category: engineering
keywords_vi: sự cố production, incident response, ứng phó sự cố, hệ thống sập, mitigate rollback, postmortem, on-call, xử lý outage, khắc phục sự cố
---

# Incident Response

During an incident the goal is **restore service fast**, not find the perfect fix. Mitigate first, understand fully later.

## Stop the Bleeding First

The instinct to root-cause immediately is wrong under an active outage. **Mitigate before you diagnose**: roll back the recent deploy, flip the feature flag off, fail over, scale up, or shed load — whatever restores service fastest, even if you don't yet know *why*. A rollback that fixes it in 2 minutes beats a root-cause hunt that fixes it in 2 hours. Recent change? Revert it first, investigate after.

## Assess & Coordinate

- **Severity** — gauge blast radius and urgency (all users down vs one feature degraded) to decide the response level and who to page.
- **Roles** — for anything bigger than a quick fix, name an **incident commander** (coordinates, decides — doesn't dig in the code), plus responders (investigate/fix) and a comms person. One coordinator prevents chaos and duplicated effort.
- **One source of truth** — a single channel/doc with a running timeline of what's observed and what's been tried, so anyone joining catches up instantly.

## Communicate

Post status early and regularly, even "still investigating." Internal stakeholders and (for user-facing outages) a status page. Silence during an outage erodes trust more than the outage. State impact, what you're doing, and next update time.

## Restore, Then Verify

Apply the mitigation, **confirm with evidence** that service is actually restored (metrics back to normal, not just "should be fixed"), then stand down. Keep the temporary mitigation in place until a real fix ships.

## Blameless Postmortem

Afterward, write it up **blamelessly** — focus on the system and process that let it happen, never on punishing a person (people act reasonably given the info they had; blame just hides future incidents). Cover: timeline, impact, what went well/badly, root cause (use "5 whys" — the deploy that broke it isn't the root cause; *why did a broken deploy reach prod* is). End with **specific, owned, tracked action items** that reduce the chance or blast radius next time — a postmortem with no follow-through is theater.

## Prevent

The compounding wins: good monitoring/alerting (detect before users do), easy + fast rollback, feature flags/kill switches, gradual rollouts, runbooks for known failure modes, and load-tested capacity.
