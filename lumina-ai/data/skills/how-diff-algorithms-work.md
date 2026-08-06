---
name: how-diff-algorithms-work
description: How diff algorithms work — computing the minimal set of changes between two sequences via the longest common subsequence, the Myers diff algorithm, line vs character diffs, and how diffs power version control, patches, and merges. Use to understand diff/patch, how git shows changes, longest common subsequence, or computing differences between texts/files.
category: engineering
keywords_vi: diff algorithm, longest common subsequence, myers, so sánh khác biệt, lcs, diff theo dòng ký tự, patch merge, git hiển thị thay đổi
---

# How Diff Algorithms Work

A diff algorithm computes the **differences between two sequences** (usually lines of text) — what was added, removed, or unchanged — as the **minimal** set of edits to turn one into the other. It powers version control diffs (see how-git-works-internally), code review, patches, and merges. Understanding it clarifies why diffs sometimes look odd and how merges work.

## The Goal: Minimal Edit Script

Given an old version and a new version, produce the **shortest, most sensible** description of changes: which lines to delete, which to add, keeping the common parts aligned. "Minimal" matters — a diff that marks everything changed is useless; a good diff finds the **largest matching parts** and only flags the real differences, so a human sees exactly what changed.

## The Core: Longest Common Subsequence

The heart of diffing is the **Longest Common Subsequence (LCS)** — the longest sequence of lines (not necessarily contiguous) that appears in **both** versions in the same order. The LCS is the "unchanged" backbone; everything **not** in it is an insertion or deletion. Finding the largest common subsequence gives the minimal diff (fewest changes). LCS is a classic **dynamic programming** problem (see dynamic-programming-patterns) — but the naive DP is `O(n×m)` time and space, too slow for large files.

## Myers Diff (the practical algorithm)

Real tools (git, most diff utilities) use the **Myers diff algorithm** — an efficient approach that finds the shortest edit script by searching an "edit graph" for the path with the fewest insertions/deletions. It runs in roughly `O((n+m)·d)` where `d` is the number of differences — so it's **fast when files are similar** (small `d`), which is the common case (small changes to large files). Variants and heuristics (histogram, patience diff) produce **more human-readable** diffs by aligning on distinctive lines, avoiding the confusing alignments a pure-minimal diff can produce.

## Granularity: Line vs Character

- **Line-based diff** — the default for code/text; treats each line as a unit. Clear for source code (changes are usually line-level).
- **Word/character diff** — finer, showing exactly which words/characters changed within a line (useful for prose, or highlighting inline changes).
Tools often combine: line diff to find changed lines, then word diff within them.

## Powering Version Control

Diffs are the foundation of:
- **Showing changes** — `git diff`, code review (see code-review-and-quality).
- **Patches** — a diff *is* a patch; apply it to reproduce the change elsewhere.
- **Storage** — some systems store diffs/deltas rather than full copies (see how-git-works-internally).
- **Three-way merge** — merging combines two diffs against a common ancestor; conflicts arise where both sides changed the same region (see resolving-merge-conflicts). The diff/merge machinery is what makes collaborative version control work.

## Pitfalls (in understanding/using)

- Expecting the **minimal** diff to always be the **most readable** — pure-minimal diffs can align lines confusingly; tools use heuristics (patience/histogram) for clarity.
- Confusing **line** and **character** granularity — a one-character change shows as a whole changed line in line diffs.
- Assuming diff understands **semantics** — it's a text/sequence operation; it doesn't know code meaning (a moved function looks like delete+add).
- Large, dissimilar files → diffing is slower and diffs are huge/unhelpful.
- Whitespace/line-ending noise polluting diffs (normalize or use whitespace-ignoring options).
- Merge conflicts arising because diff/merge is **line-based** and both sides touched the same lines (see resolving-merge-conflicts).
