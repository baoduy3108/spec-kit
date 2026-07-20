---
name: git-advanced
description: Advanced Git operations done safely — interactive rebase to clean history, cherry-pick, bisect to find a breaking commit, reflog to recover "lost" work, resetting (soft/mixed/hard), stashing, and untangling common messes. Use for history rewriting, recovering lost commits, or finding which commit introduced a bug. (For everyday branching/PR flow, see git-workflow-and-versioning.)
category: engineering
keywords_vi: git nâng cao, rebase interactive, git bisect, git reflog, khôi phục commit đã mất, cherry-pick, git reset, sửa lịch sử git, lỡ tay git
---

# Advanced Git

Git rarely loses committed work — reflog almost always has it. Stay calm and use the right tool.

## Recovering "Lost" Work

- **`git reflog`** — a log of everywhere HEAD has been. After a bad reset/rebase/branch delete, find the old commit hash here and `git checkout`/`git reset --hard <hash>` or `git branch recover <hash>`. This is the undo button for almost everything.
- A "lost" commit after `reset --hard` is still in reflog for ~90 days — not gone.

## History Editing

- **Interactive rebase** `git rebase -i <base>` — reorder, squash, fixup, edit, or drop commits to clean a branch before review. **Only rewrite history that hasn't been pushed/shared** — rewriting shared history forces everyone else into conflicts.
- **`git commit --amend`** — fix the last commit's message or add forgotten changes (also rewriting — don't amend pushed commits).
- **Squash before merge** to keep main's history readable, if that's the team convention.

## Moving & Finding Commits

- **`git cherry-pick <hash>`** — apply a specific commit from another branch (hotfix to release). Watch for duplicated commits if you later merge.
- **`git bisect`** — binary-search history for the commit that introduced a bug: `git bisect start`, mark `bad` and a known `good`, test each checkout, `git bisect good/bad`. Finds the culprit in log₂(n) steps. Automate with `git bisect run <test-cmd>`.
- **`git blame` / `git log -S"string"`** — who/when a line changed, or find the commit that added/removed a string.

## Reset vs Revert

- **`git reset --soft`** (keep changes staged) / **`--mixed`** (keep unstaged, default) / **`--hard`** (discard — dangerous; verify `git status` first). Reset moves your branch pointer — for local history.
- **`git revert <hash>`** — makes a *new* commit undoing a previous one. **Use this on shared/main branches** (safe, doesn't rewrite history) instead of reset.

## Everyday Rescues

- **`git stash`** (`-u` for untracked) to shelve work-in-progress and come back with `stash pop`.
- Merge conflict: edit the marked regions, `git add`, continue; abort with `git merge --abort` / `git rebase --abort`.
- Committed to the wrong branch: `git reset --soft HEAD~1` then checkout the right branch and commit; or cherry-pick.
- **Before any scary operation**, note the current hash (`git rev-parse HEAD`) or make a backup branch — then you can always get back.
