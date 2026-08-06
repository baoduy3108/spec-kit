---
name: verification-before-completion
description: A discipline to run before claiming work is complete, fixed, or passing — require fresh verification evidence (run the command, read the output, confirm) before making any success claim. Use before committing, opening PRs, reporting a bug fixed, or moving to the next task.
category: engineering
keywords_vi: xác minh trước khi báo, trước khi báo xong, bằng chứng trước khẳng định, chạy verification trước khi nói pass, tuyên bố hoàn thành, chưa kiểm chứng đã báo xong, evidence before claims
---

# Verification Before Completion

Claiming work is complete without verification is dishonesty, not efficiency. **Core principle: evidence before claims, always.**

## The Iron Law

> NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

If you haven't run the verification command *in this message*, you cannot claim it passes.

## The Gate Function

Before claiming any status or expressing satisfaction:
1. **Identify** — what command proves this claim?
2. **Run** — execute the FULL command (fresh, complete).
3. **Read** — full output, check the exit code, count failures.
4. **Verify** — does the output confirm the claim? If no, state the actual status with evidence; if yes, state the claim *with* evidence.
5. **Only then** make the claim.

Skipping any step is claiming without proof.

## What Each Claim Requires

| Claim | Requires | Not sufficient |
|---|---|---|
| Tests pass | Test output: 0 failures | Previous run, "should pass" |
| Linter clean | Linter output: 0 errors | Partial check, extrapolation |
| Build succeeds | Build command: exit 0 | Linter passing, "logs look good" |
| Bug fixed | Test the original symptom: passes | Code changed, assumed fixed |
| Regression test works | Red-green cycle verified | Test passes once |
| Sub-task completed | VCS diff shows the changes | A "success" report |
| Requirements met | Line-by-line checklist | Tests passing |

## Red Flags — Stop

Using "should"/"probably"/"seems to"; expressing satisfaction before verification ("Great!", "Perfect!", "Done!"); about to commit/push/PR without verification; trusting a delegated agent's success report; relying on partial verification; "just this once"; tired and wanting the work over. **Any wording implying success without having run verification** triggers the gate.

## Rationalization Prevention

"Should work now" → run the verification. "I'm confident" → confidence ≠ evidence. "Linter passed" → linter ≠ compiler. "Agent said success" → verify independently (check the diff). "I'm tired" → exhaustion ≠ excuse. "Partial check is enough" → partial proves nothing. "Different words so the rule doesn't apply" → spirit over letter.

## Bottom Line

Run the command. Read the output. **Then** claim the result. For regression tests specifically: write → run (pass) → revert the fix → run (must FAIL) → restore → run (pass). No shortcuts.
