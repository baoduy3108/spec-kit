---
name: threat-modeling
description: Systematically find security threats during design — identify assets and trust boundaries, enumerate threats (STRIDE: spoofing, tampering, repudiation, info disclosure, DoS, elevation of privilege), assess risk, and decide mitigations. Use when designing a system or feature and you want to find security holes before building, not after a breach.
category: engineering
keywords_vi: threat modeling, mô hình hóa mối đe dọa, stride, trust boundary, tìm lỗ hổng bảo mật khi thiết kế, đánh giá rủi ro bảo mật, phân tích an ninh hệ thống
---

# Threat Modeling

Threat modeling is thinking like an attacker **during design** to find security weaknesses before they're built (and exploited). Far cheaper than discovering them via a breach. It answers four questions: *What are we building? What can go wrong? What are we doing about it? Did we do a good job?*

## 1. Model the System

Diagram the system's **data flows**: components, data stores, external entities, and how data moves. Mark **trust boundaries** — where data crosses from less-trusted to more-trusted (user → server, service → service, internet → internal network). **Threats concentrate at trust boundaries** — that's where untrusted input meets trusted logic. Identify your **assets** (what's worth protecting: user data, credentials, money, availability).

## 2. Enumerate Threats — STRIDE

For each component/data flow, ask what could go wrong using **STRIDE**:
- **S — Spoofing** — pretending to be someone/something else (weak auth). → authentication.
- **T — Tampering** — modifying data/code in transit or at rest. → integrity (signing, TLS, validation).
- **R — Repudiation** — denying an action was performed. → logging/audit trails.
- **I — Information disclosure** — leaking data to the unauthorized. → encryption, access control, least data.
- **D — Denial of service** — making it unavailable. → rate limiting, quotas, resilience.
- **E — Elevation of privilege** — gaining rights you shouldn't have. → authorization, least privilege, input validation.
Walk each element through STRIDE; the letters prompt threats you'd otherwise miss.

## 3. Assess & Prioritize

Rate each threat by **likelihood × impact** (see decision-making-frameworks/probability). Focus mitigation on high-risk threats; you can't fix everything. Some threats you accept (low risk), some you mitigate, some redesign away.

## 4. Mitigate

For each threat you'll address, choose a control (the STRIDE→defense mapping above; see security-and-hardening, authentication-and-authorization, secrets-management). Prefer **designing threats out** (eliminate the trust boundary, don't store the sensitive data) over bolting on controls. Re-model when the design changes.

## Practical Approach

- Do it **early** (at design) and keep it **lightweight** — a whiteboard data-flow diagram + a STRIDE pass beats a heavy formal process nobody does.
- Involve the team — different perspectives catch different threats.
- **Assume breach** for defense in depth — layer controls so one failure isn't catastrophic (see defense in depth ideas in security-and-hardening).
- Focus on **your** likely attackers and assets, not exotic nation-state scenarios (unless that's your threat).

## Pitfalls

- **Not doing it** — finding security flaws in production/after a breach (the expensive way).
- **Boiling the ocean** — over-formal modeling that stalls; keep it pragmatic.
- **Ignoring trust boundaries** — the exact places threats live.
- **Only thinking about outside attackers** — insiders, compromised dependencies, and mistakes matter too.
- Modeling once and never updating as the system evolves.
- Listing threats but never mitigating or accepting them explicitly.
