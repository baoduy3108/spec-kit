---
name: resolving-merge-conflicts
description: Systematic approach to handling git merge and rebase conflicts — assess, investigate root causes, resolve preserving intent, validate with checks, complete. Use when the user pastes conflicting code/diffs and needs help resolving a merge or rebase conflict.
category: engineering
keywords_vi: merge conflict, xung đột merge, giải quyết merge conflict, git rebase, xung đột khi merge, conflict marker
---

# Resolving Merge Conflicts

This guide outlines a systematic approach to handling git merge and rebase conflicts:

**Step 1: Assess the Situation**
See the current state of the merge/rebase. Check git history, and the conflicting files.

**Step 2: Investigate Root Causes**
Research the reasoning behind conflicting changes by examining commit messages, pull requests, and related issues to understand the original intent behind each modification.

**Step 3: Handle Each Conflict**
Preserve both intentions when feasible. When modifications are incompatible, align with the merge's primary objective and document any trade-offs made. Do **not** invent new behaviour. Always resolve; never abort.

**Step 4: Validate with Automated Tools**
Execute the project's standard checks in sequence — typically type checking, then testing, then code formatting — to verify the merge didn't introduce breaking changes.

**Step 5: Complete the Process**
Stage all changes and create a commit. For rebasing operations, continue until all commits have been successfully rebased.
