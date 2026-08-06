---
name: snapshot-testing
description: How snapshot testing works — capturing a component's or function's output as a stored "snapshot" and failing the test when future output differs, great for UI/serialization but prone to rubber-stamping and brittleness. Use to understand snapshot testing, snapshot tests for UI, when snapshots help vs hurt, or avoiding blindly updated snapshots.
category: engineering
keywords_vi: snapshot testing, snapshot, rubber-stamp cập nhật mù, kiểm thử ảnh chụp, lưu output báo lỗi khi khác, tốt cho ui serialization, snapshot giòn brittle
---

# Snapshot Testing

Snapshot testing captures the **output** of something (a rendered UI component, a serialized data structure, an API response) as a stored **snapshot** on first run, then on future runs **compares** the new output to the stored one and **fails if they differ**. It's fast to write and great for catching **unintended changes** — but it has a notorious failure mode: developers **blindly updating** snapshots, turning the tests into rubber stamps (see testing-strategy, playwright-testing).

## The Idea: Record Once, Compare Forever

Instead of writing explicit assertions about every field of an output, you:
1. Run the test once — it **records** the output as a snapshot file (committed to the repo).
2. On later runs, it **regenerates** the output and **diffs** it against the saved snapshot.
3. **Match** → pass. **Differ** → fail, showing the diff.
This is efficient for outputs with **many details** you'd never hand-assert (a big rendered component tree, a complex JSON). One snapshot covers the whole shape; any change surfaces as a diff.

## Where It Shines

- **UI component output** — catch unintended changes to rendered markup (React/Vue component trees).
- **Serialization / API responses** — detect unexpected changes to output structure.
- **Config/codegen output** — verify generated artifacts don't drift.
- **Regression safety net** — quickly flag "something about the output changed" across a large surface.

## The Big Pitfall: Rubber-Stamping

The failure mode that undermines snapshot testing: when a snapshot fails, tools make it **trivially easy** to "update" it (`--updateSnapshot`). Under deadline pressure, developers **blindly accept** the new snapshot without checking whether the change is **intended or a bug** — so the test "passes" again but verified nothing. A snapshot that's mindlessly updated is worse than no test (false confidence). The test only has value if someone **reviews the diff** and confirms the change was intended.

Related problems:
- **Brittleness** — huge snapshots break on any tiny (often irrelevant) change → constant noise → more rubber-stamping.
- **Opaqueness** — a snapshot doesn't express **intent** ("this should render a submit button"); it just freezes output, so failures don't say *what* behavior broke.

## Design Guidance

- **Keep snapshots small and focused** — snapshot the specific output you care about, not giant trees (small snapshots = meaningful diffs, less brittleness).
- **Review every snapshot change** in code review like any other change — an updated snapshot is a change to expected behavior.
- **Never blind-update** — investigate each diff: intended change or regression?
- **Prefer explicit assertions** for critical behavior — assert the specific thing that matters ("has a submit button") rather than relying on a snapshot to imply it.
- **Use snapshots as a supplement**, not the primary test for important logic.
- **Deterministic output** — strip timestamps/random IDs (see reproducible-builds-and-caching) or snapshots flap.

## Pitfalls (in understanding/using)

- **Blindly updating** failing snapshots → the test verifies nothing (rubber stamp) — the cardinal sin.
- **Giant, brittle** snapshots → break on trivial changes, training people to ignore/auto-update them.
- Snapshots as the **only** test for important logic → they don't express intent or verify specific behavior.
- **Non-deterministic** output (timestamps, random IDs, ordering) → flaky snapshots.
- Not **reviewing** snapshot diffs in PRs → regressions sail through as "just a snapshot update".
- Over-relying on snapshots → false confidence; pair with explicit behavioral assertions.
