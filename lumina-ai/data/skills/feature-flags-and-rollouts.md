---
name: feature-flags-and-rollouts
description: Ship changes safely with feature flags and progressive delivery — decoupling deploy from release, flag types (release/experiment/ops/permission), gradual rollout and canary, kill switches, and avoiding flag debt. Use when planning a risky release, a gradual rollout, an A/B experiment gate, or a kill switch.
category: engineering
keywords_vi: feature flag, cờ tính năng, triển khai dần, canary rollout, kill switch, bật tắt tính năng, ra mắt an toàn, tách deploy và release
---

# Feature Flags & Progressive Rollouts

A feature flag is a runtime switch that decouples **deploy** (code is live but off) from **release** (feature turned on). This lets you merge and deploy continuously, then release when ready — and turn a bad feature off instantly without a redeploy.

## Flag Types (they have different lifespans)

- **Release flags** — hide in-progress work; gate a gradual rollout. Short-lived — remove after full rollout.
- **Experiment flags** — split traffic for A/B tests. Removed when the experiment concludes.
- **Ops flags / kill switches** — turn off an expensive or fragile subsystem under load. Long-lived by design.
- **Permission flags** — enable features for specific plans/users (entitlements). Long-lived.

Naming and cleanup differ by type — don't treat them all the same.

## Progressive Delivery

Roll out gradually rather than 0→100%: internal users → 1% → 5% → 25% → 100%, watching error rates and key metrics at each step. **Canary** — route a small slice of traffic to the new version and compare health before widening. If metrics degrade, flip the flag off (instant rollback) instead of redeploying. Target by percentage, user segment, or attribute.

## Discipline

- **Default to off / safe** — a flag's absence or a lookup failure must fall back to the safe (old) behavior.
- **Keep flag logic simple** — a single decision point per flag; avoid deeply nested flag combinations (they multiply into untestable states).
- **Consistency** — the same user should get the same variant across requests (hash the user id), or the experience flickers.
- **Test both paths** — code behind a flag still needs tests for on and off.

## Flag Debt (the real cost)

Every flag is a branch in your code and a combinatorial explosion of states. **Remove flags promptly** once a release is fully rolled out or an experiment ends — stale flags rot, confuse readers, and cause incidents ("nobody knew that flag still did something"). Track flags with owners and expiry dates; schedule cleanup as part of "done." A codebase full of forgotten flags is worse than no flags.
