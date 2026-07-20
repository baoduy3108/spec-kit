---
name: dependency-management
description: Manage third-party dependencies safely — semantic versioning and constraint ranges, lockfiles for reproducible installs, updating deliberately (patch/minor/major), auditing for vulnerabilities, minimizing dependency count, and supply-chain hygiene (typosquatting, pinning, provenance). Use when adding, updating, or auditing dependencies.
category: engineering
keywords_vi: quản lý dependency, semver, lockfile, cập nhật thư viện, lỗ hổng dependency, supply chain, pin version, thêm thư viện, npm audit
---

# Dependency Management

Every dependency is code you didn't write but now own the risk of. Add deliberately; keep the tree small and current.

## Semantic Versioning

`MAJOR.MINOR.PATCH`: **major** = breaking changes, **minor** = new backward-compatible features, **patch** = backward-compatible fixes. Constraint operators: `^1.2.3` allows minor+patch (`<2.0.0`), `~1.2.3` allows patch only, exact `1.2.3` pins. Understand what your manifest actually allows — `^` will pull new minors on a fresh install. (Note: semver is a promise libraries sometimes break; a "minor" can still break you.)

## Lockfiles

Commit the lockfile (`package-lock.json`, `poetry.lock`, `Cargo.lock`, `go.sum`). The manifest says what you *want*; the lockfile pins the exact resolved versions (including transitive deps) so every install and CI run is **reproducible**. Use `npm ci` / `--frozen-lockfile` in CI to install exactly the lockfile, not re-resolve.

## Updating Deliberately

- Update in **separate PRs from feature work** so a regression is easy to bisect and revert.
- **Patch/minor** — usually safe; batch and let tests catch issues.
- **Major** — read the changelog/migration guide; do one at a time.
- Keep dependencies reasonably current — a giant deferred upgrade is far more painful (and insecure) than steady small ones. Automate with a bot (Dependabot/Renovate) but review its PRs.

## Security & Supply Chain

- **Audit** regularly (`npm audit`, `pip-audit`, `cargo audit`, GitHub/OSV scanning); prioritize vulns that are actually reachable/exploitable in your usage.
- **Minimize count** — every dependency (and its transitive deps) adds attack surface, maintenance, and bloat. Prefer the standard library or a few lines of your own over a micro-dependency.
- **Supply-chain hygiene** — beware typosquatted package names, verify the real package before adding, pin versions (avoid `latest`), and be cautious with post-install scripts. Prefer well-maintained, widely-used packages with recent activity.
- Check **licenses** of dependencies for compatibility with your project's use (copyleft vs permissive).
