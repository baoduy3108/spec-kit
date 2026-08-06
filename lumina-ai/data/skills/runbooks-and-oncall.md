---
name: runbooks-and-oncall
description: How to run effective on-call and write runbooks — documented step-by-step procedures for handling alerts/incidents, sustainable on-call rotations and escalation, reducing toil, and blameless follow-up. Use to understand runbooks, on-call rotations, incident response procedures, reducing operational burden, or preparing a team to operate a service.
category: engineering
keywords_vi: runbook oncall, tài liệu quy trình xử lý sự cố, ca trực luân phiên rotation, escalation leo thang, giảm toil công việc lặp, blameless, vận hành dịch vụ, playbook
---

# Runbooks & On-Call

Operating a production service means being ready to respond when things break. **Runbooks** are the documented procedures for handling known situations, and **on-call** is how a team stays available to respond. Done well, incidents get resolved fast and calmly; done badly, on-call burns people out.

## Runbooks (Operational Playbooks)

A **runbook** is a step-by-step guide for handling a specific situation — an alert, a failure, a routine operation. When an alert fires at 3am, a good runbook turns "panic and guess" into "follow the steps." A good runbook includes:
- **What the alert/situation means** and how to confirm it.
- **Impact** — who/what is affected, severity.
- **Diagnosis steps** — what to check, which dashboards/logs (see monitoring-and-alerting).
- **Remediation steps** — how to fix or mitigate, with exact commands.
- **Escalation** — who to contact if it's beyond the runbook.
Link the runbook directly from the **alert** so the responder has it instantly. Keep runbooks **current** (a wrong runbook is worse than none) — update them after every incident.

## On-Call Rotations

**On-call** is a rotation where someone is responsible for responding to alerts during their shift. Make it **sustainable**, or you burn out your best people:
- **Reasonable rotation** — spread across enough people that no one is on-call too often; humane shift lengths.
- **Follow-the-sun** where possible (distributed teams cover their daytime) to avoid chronic night pages.
- **Compensation/recognition** for on-call, and **time to recover** after a rough shift.
- **Reasonable alert volume** — if on-call is constantly paged, fix the **alerts** and the **underlying reliability**, don't just endure it (see monitoring-and-alerting, slos-and-error-budgets). On-call load is a signal of system health.

## Escalation

Define clear **escalation paths**: if the primary on-call doesn't acknowledge within N minutes, it escalates to a secondary, then to a manager/expert. For big incidents, an **incident commander** coordinates (see incident-response). Nobody should be stuck alone on something beyond them — escalation is expected, not failure.

## Reduce Toil

**Toil** is repetitive, manual operational work that doesn't improve the system (manually restarting a service, clearing a queue by hand every night). It scales badly and demoralizes. The SRE discipline: **measure toil and automate it away** — turn a manual runbook step into a script, then into automation that self-heals. The goal is fewer manual interventions over time, freeing people for engineering.

## Blameless Follow-Up

After an incident, a **blameless postmortem** (see incident-response) examines *what* happened and *how the system/process allowed it* — not *who* to blame. Feed the learnings back: fix the root cause, improve the runbook, tune the alert, add automation. Blame makes people hide problems; blamelessness makes systems safer.

## Pitfalls (in understanding/using)

- **No runbooks** (or stale ones) → every incident is solved from scratch under pressure; slow, error-prone.
- **Runbooks not linked from alerts** → responder scrambles to find the procedure.
- **Unsustainable on-call** (too frequent, too noisy) → burnout and attrition; treat alert volume as a fixable problem.
- **Enduring toil** instead of automating it — repetitive manual work compounds; automate it away.
- **Blame culture** → people hide incidents and don't share learnings; go blameless.
- **No escalation path** → someone stuck alone on a major incident.
- Not **updating** runbooks/alerts after incidents — losing the chance to improve.
