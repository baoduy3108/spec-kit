---
name: api-versioning-strategies
description: How to version an API — URL path, header, or media-type versioning, what counts as a breaking change, backward-compatible evolution, and deprecation/sunset processes so you can evolve an API without breaking existing clients. Use to version an API, handle breaking changes, evolve an API compatibly, or deprecate old versions.
category: engineering
keywords_vi: chiến lược versioning api, version qua url header media-type, thay đổi nào là breaking, tiến hóa tương thích ngược, quy trình deprecate sunset, tiến hóa api không phá client cũ
---

# API Versioning Strategies

Once an API has real users, you **can't freely change it** — existing clients depend on its exact behavior, and you can't force everyone to update at once. Versioning lets you **evolve the API** (add features, fix mistakes) **without breaking existing clients**. The core skills: knowing what's a **breaking change**, preferring **backward-compatible** evolution, and having a clean **deprecation** process (see api-and-interface-design, data-contracts-and-schema-evolution, deprecation-and-migration).

## What Counts as a Breaking Change

The key distinction that drives everything:
- **Non-breaking (backward-compatible)** — existing clients keep working: **adding** a new optional field, a new endpoint, a new optional parameter, a new enum value clients can ignore.
- **Breaking** — existing clients break: **removing/renaming** a field or endpoint, **changing a type** or the meaning of a field, making an optional field required, changing response structure, changing error codes/behavior, tightening validation.
Rule of thumb: **additive changes are safe; removals, renames, and semantic changes are breaking.** The single most valuable habit is designing changes to be **additive** so you rarely need a new version at all.

## The Versioning Strategies

When a breaking change is truly necessary, you version. The common approaches:
- **URI path versioning** — `/v1/users`, `/v2/users`. Most **explicit and common**; easy to see, route, and test; but "version in the URL" is arguably un-RESTful (the resource is the same). Simple and pragmatic — the popular default.
- **Header versioning** — a custom header (`API-Version: 2`) or **media-type** versioning via `Accept: application/vnd.myapi.v2+json`. Keeps URLs clean and is more "RESTful", but is **less discoverable** and harder to test (can't just paste a URL in a browser).
- **Query parameter** — `?version=2`. Simple but mixes versioning with filtering; less common.
There's no consensus "best" — **URL path** is the most widely used for its clarity; media-type is the purist choice. Pick one and be **consistent**.

## Evolve Compatibly, Version Rarely

Because every new version is a **maintenance burden** (you support v1 *and* v2), the goal is to **avoid** versioning as long as possible via backward-compatible evolution:
- **Add, don't change** — new optional fields/endpoints instead of altering existing ones.
- **Tolerant reader** — clients should ignore unknown fields, so you can add safely.
- Reserve a **new major version** for genuinely unavoidable breaking changes, and batch breaking changes together rather than versioning constantly.

## Deprecation and Sunset

When you do retire an old version, do it **gracefully**:
- **Announce** deprecation early with a clear timeline; document the migration path.
- **Signal in responses** — `Deprecation` and `Sunset` headers, warnings.
- **Support both** versions during a **transition window** so clients can migrate.
- **Monitor** usage of the old version; don't shut it off while significant traffic remains.
- **Then remove** — after the sunset date and once usage is negligible (see deprecation-and-migration).

## Pitfalls (in understanding/using)

- **Breaking changes without a new version** → you silently break existing clients.
- **Versioning too eagerly** (new version for every small change) → many versions to maintain; prefer additive evolution.
- **Inconsistent** versioning (mix of URL and header across endpoints) → confusing API.
- Treating **adding an optional field** as breaking (it's not) → needless versions; and treating a **rename** as safe (it's breaking).
- **No deprecation process** — yanking an old version abruptly breaks clients that hadn't migrated.
- Clients that **don't tolerate unknown fields** → your safe additive changes break them (design clients as tolerant readers).
- Never **sunsetting** old versions → unbounded maintenance of many versions.
