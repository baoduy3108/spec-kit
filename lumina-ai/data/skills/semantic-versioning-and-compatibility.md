---
name: semantic-versioning-and-compatibility
description: How version numbers communicate compatibility — Semantic Versioning (MAJOR.MINOR.PATCH) — and what actually counts as a breaking change. Covers the semver contract, why any observable behavior change can break someone (Hyrum's Law), version-range operators (^ ~), pre-release/build metadata, and deprecation strategy. Use to version libraries/APIs responsibly and to reason about dependency ranges.
category: devops
keywords_vi: đánh số phiên bản ngữ nghĩa semantic versioning major minor patch để truyền đạt tương thích, thế nào là thay đổi phá vỡ breaking change, định luật hyrum mọi hành vi quan sát được đều có người phụ thuộc, toán tử khoảng phiên bản caret tilde, tiền phát hành pre-release và metadata, chiến lược deprecation
---

# Semantic Versioning & Compatibility

A version number isn't decoration — it's a **compatibility contract** between a library and everyone who depends on it. **Semantic Versioning (SemVer)** standardizes that contract as **`MAJOR.MINOR.PATCH`**, so a consumer can tell, from the number alone, whether an upgrade is safe. Getting versioning right (and knowing what a "breaking change" really is) is essential for anyone publishing a library or API (see dependency-resolution-and-lockfiles, dependency-hell-and-diamond-dependencies, deprecation-and-migration).

## The SemVer Contract

Given `MAJOR.MINOR.PATCH`, increment:
- **PATCH** (`1.2.3` → `1.2.4`) — **backward-compatible bug fixes** only. No new features, no behavior changes consumers rely on. Safe to auto-upgrade.
- **MINOR** (`1.2.3` → `1.3.0`) — **backward-compatible new features/additions**. Existing code keeps working; you may use the new stuff or not. Safe to upgrade.
- **MAJOR** (`1.2.3` → `2.0.0`) — **breaking changes**. Existing code may stop working; consumers must read the migration guide and update.
- **`0.x.y`** — the "anything can change" zone; pre-1.0 has no stability guarantees (many treat `0.MINOR` as breaking).
- **Pre-release / build metadata** — `1.0.0-rc.1`, `1.0.0+build.7` for release candidates and build info; pre-releases sort *before* the release.

The promise: **the number tells you the risk of upgrading.** Break it (ship a breaking change as a patch) and you break the whole ecosystem's trust and automation.

## What Counts as "Breaking" — Hyrum's Law

The subtle part: a breaking change is **not** just "removed a function." **Hyrum's Law** states that *with enough users, every observable behavior of your system will be depended on by somebody* — even things you never promised. So a "bug fix" that changes output format, timing, error messages, ordering, or performance **can break real consumers**. Practical guidance: treat any **observable** behavior change as potentially breaking; document what's part of the contract vs implementation detail; and when in doubt, bump MAJOR. Removing/renaming public API, changing signatures/types, tightening validation, and changing defaults are clearly breaking.

## Version Ranges (how consumers depend)

Package managers let consumers accept a **range** so they get compatible updates automatically:
- **Caret `^1.2.3`** — allow MINOR+PATCH up to (not including) `2.0.0` (compatible updates). The common default.
- **Tilde `~1.2.3`** — allow PATCH up to `1.3.0` (more conservative).
- **Exact `1.2.3`** / **pinned** — no automatic updates.
These ranges only work **because** publishers honor SemVer — the whole `^` system assumes MINOR/PATCH are safe (see lockfiles for pinning the resolved version).

## Deprecation, Not Sudden Removal

Don't break in place. **Deprecate first**: keep the old API working, mark it deprecated (warnings, docs), point to the replacement, give a migration window, and **remove only in the next MAJOR**. This lets consumers migrate on their schedule.

## Design Guidance (for understanding/using)

- **Bump MAJOR for any breaking change; MINOR for additive; PATCH for compatible fixes** — and honor it religiously.
- **Treat observable behavior changes as potentially breaking** (Hyrum's Law) — define your contract explicitly.
- **Deprecate before removing** — warn, document the migration, remove only at the next MAJOR.
- **Understand `^`/`~` ranges** — they trust publishers' SemVer; pair with a lockfile to pin actual resolved versions.
- **Use pre-releases** (`-rc.x`) to ship risky changes for testing before a stable release.

## Pitfalls (in understanding/using)

- Shipping a **breaking change as a MINOR/PATCH** → silently breaks consumers using `^`/`~` auto-updates.
- Assuming only removals break → **any observable change** can break someone (Hyrum's Law).
- **Removing** APIs without a deprecation period → forced, painful migrations.
- Misreading ranges (`^0.x` behaves specially) → unexpected (non-)updates.
- Relying on ranges **without a lockfile** → non-reproducible installs when a dependency publishes.
