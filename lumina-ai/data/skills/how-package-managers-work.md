---
name: how-package-managers-work
description: How package managers work — registries, dependency resolution and the diamond/version-conflict problem, semantic versioning constraints, lockfiles for reproducibility, transitive dependencies, and how installs are cached. Use to understand npm/pip/cargo/etc., dependency resolution, lockfiles, and "works on my machine" install issues.
category: engineering
keywords_vi: package manager, npm, pip cargo, registry kho gói, giải quyết phụ thuộc, dependency resolution, transitive, xung đột version, cơ chế cài gói
---

# How Package Managers Work

A package manager installs and manages the third-party libraries your project depends on — and, crucially, all of *their* dependencies too. Getting a consistent, working set is harder than it looks.

## Registry + Manifest + Lockfile

- **Registry** — a central server hosting published packages and their versions (npm registry, PyPI, crates.io).
- **Manifest** (`package.json`, `pyproject.toml`, `Cargo.toml`) — *what you want*: your direct dependencies and allowed version **ranges** (see semver).
- **Lockfile** (`package-lock.json`, `poetry.lock`, `Cargo.lock`) — *what got resolved*: the exact version of every package (direct + transitive) actually installed. Committing it makes installs **reproducible** across machines and CI (see dependency-management).

## Dependency Resolution (the hard part)

Your app depends on A and B; A depends on C@^1.2; B depends on C@^1.5. The resolver must find a **single set of versions** that satisfies **all** constraints simultaneously — across the whole **transitive** graph (dependencies of dependencies, often hundreds deep). This is a constraint-satisfaction problem:
- It reads each package's declared ranges, walks the graph, and picks versions that fit everyone.
- **The diamond/conflict problem** — when two dependencies need *incompatible* versions of a shared package, resolution fails (or, in ecosystems like npm, it may install **multiple copies** at different tree levels so each gets its needed version — which is why `node_modules` is huge and why you can have two versions of one library loaded).
- **pip** historically installs one version per package globally in the environment, so conflicts are hard errors — hence virtual environments per project.

## Semantic Versioning Drives It

Version ranges (`^1.2.0`, `~1.2.0`, `>=1.2 <2`) tell the resolver what's acceptable (see dependency-management). The resolver picks the newest version within everyone's ranges. This is why a fresh install *without* a lockfile can pull newer patch/minor versions than a teammate had — and why lockfiles exist to pin the exact resolution.

## Caching & Install

Resolved packages are downloaded (often from a CDN mirror), verified by checksum (integrity/supply-chain), and cached locally so repeat installs are fast. `npm ci` / `--frozen-lockfile` installs **exactly** the lockfile (no re-resolution) — what CI should use.

## Why It Matters

Explains: "works on my machine" (different resolved versions without a lockfile), why `node_modules` is enormous (transitive graph + duplicate versions), why version conflicts happen and how to fix them (align ranges, dedupe, or accept multiple copies), why lockfiles matter (reproducibility), and the supply-chain surface (every transitive dep is trusted code — see dependency-management/secrets).

## Pitfalls

- **No committed lockfile** → non-reproducible installs, "works on my machine."
- **Version conflicts** in the transitive graph → resolution failure or duplicate copies.
- **Re-resolving in CI** (plain `install`) instead of `ci`/frozen → drift.
- **Huge transitive trees** — one small package pulling in hundreds; audit and minimize.
- Ignoring integrity/supply-chain (typosquatting, compromised packages).
