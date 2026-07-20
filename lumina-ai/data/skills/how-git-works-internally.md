---
name: how-git-works-internally
description: How Git actually works under the hood — the content-addressable object store (blobs, trees, commits, tags), SHA hashing, refs and HEAD, the commit DAG, how branches/merges/rebases are just pointer moves and new commits, and the staging area. Use to understand why Git commands behave as they do, or to reason about recovery and history.
category: engineering
keywords_vi: git lưu trữ, git lưu trữ dữ liệu, cơ chế object, object blob tree commit, cơ chế git bên trong, git internals, git hoạt động bên trong, dag commit, git content-addressable
---

# How Git Works Internally

Git is a content-addressable filesystem with a version-control UI on top. Once you see the object model, every command makes sense.

## The Object Store

Git stores four object types, each named by the **SHA hash of its content** (change the content → new hash → new object; identical content → stored once):
- **Blob** — the raw bytes of a file (no name, no metadata). Deduplicated by hash.
- **Tree** — a directory listing: names → (blob or subtree) hashes + modes. Represents a snapshot of a folder.
- **Commit** — a pointer to one root tree + parent commit(s) + author/message/timestamp. A commit is a full **snapshot**, not a diff (diffs are computed on demand).
- **Tag** — an annotated pointer to an object.

Because commits point to parents, history is a **directed acyclic graph (DAG)** of snapshots.

## Refs & HEAD

A **branch** is just a movable file containing a commit hash (`refs/heads/main`). **HEAD** points to the current branch (or a commit, when "detached"). This is why branching is instant and cheap — creating a branch writes 40 bytes; it doesn't copy files.

## Why Commands Behave As They Do

- **Commit** — snapshots the staging area into a new tree + commit object, then moves the current branch pointer to it.
- **Branch/checkout** — just changes which ref HEAD follows and updates the working tree; no history is touched.
- **Merge** — creates a commit with two parents (or fast-forwards a pointer if linear).
- **Rebase** — *replays* commits as brand-new commit objects onto a new base (new hashes!) — which is why rebasing shared history is disruptive: everyone else still has the old objects.
- **Reset** — moves a branch pointer to another commit (the old commits still exist, unreferenced, until GC — recoverable via reflog).

## The Three Areas & GC

Working tree (your files) → **staging area/index** (the next snapshot you're composing) → repository (committed objects). `git add` writes blobs and stages tree entries. Unreferenced objects linger (findable via reflog) until garbage collection prunes them after a grace period — which is why "lost" committed work is almost always recoverable.
