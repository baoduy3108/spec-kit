---
name: rails-upgrade
description: Assess and plan a Rails version upgrade without destructive overwrites — detect current/target version, classify the bump (patch/minor/major), pull the official upgrade guide and railsdiff.org config diffs, then do a selective manual merge that preserves local customizations instead of running `rails app:update` blindly. Use when planning or reviewing a Rails upgrade.
category: engineering
keywords_vi: nâng cấp rails, upgrade rails, app:update, đánh giá nâng cấp rails, giữ tùy biến khi nâng, nâng phiên bản rails, railsdiff
---

# Rails Upgrade Assessment

Plan Rails upgrades for transparency and reversibility — the goal is a reviewed, selective merge that preserves your customizations, not a blind overwrite.

## Why Not Just `rails app:update`

`rails app:update` overwrites config and boilerplate files indiscriminately, silently clobbering local customizations. Prefer a selective process that shows exactly what changes before applying it.

## 10-Step Process

1. **Verify it's a Rails app** — `Gemfile`, `config/application.rb`, `config/environment.rb` exist.
2. **Extract the current version** — from `Gemfile.lock` (authoritative) or `Gemfile`.
3. **Identify the latest stable target** — the newest stable release in the target series.
4. **Classify the bump** — patch (safe, do it), minor (review deprecations), or major (plan carefully, may need intermediate stops).
5. **Retrieve the official upgrade guide** — read the sections relevant to your jump.
6. **Analyze file diffs** — use railsdiff.org to see exactly which config/boilerplate files changed between versions.
7. **Check JS dependencies** — npm packages, importmap pins, `@rails/*` packages that must move in lockstep.
8. **Generate an assessment** — complexity rating (low/medium/high) + the recommended step sequence.
9. **Selective merge** — for each changed file, categorize as *new* (add), *safe* (apply), or *customized* (manual three-way merge). Use git to detect local customizations; show the user each change before applying.
10. **Enable framework defaults gradually** — flip `new_framework_defaults_x_y.rb` toggles one at a time, testing between each, then clean up.

## Principles

- **Upgrade one major version at a time** — don't skip from 5→7; go 5→6→7, green tests at each stop.
- **Bump Ruby first if required** before the Rails bump.
- **Pin and commit** the lockfile; keep the upgrade in its own PR, separate from feature work.
- **Deprecations are the map** — run the suite with deprecation warnings visible on the current version and clear them *before* bumping.
- **Show, don't overwrite** — every customized file gets a reviewed merge, never a silent replace.
