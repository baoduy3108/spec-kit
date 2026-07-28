---
name: monorepo-and-polyrepo-tooling
description: The trade-off between one big repository and many small ones — monorepo vs polyrepo — and the tooling that makes each work. Covers atomic cross-project changes and unified versioning (monorepo) vs independent ownership and blast-radius isolation (polyrepo), the tooling monorepos require (affected-target detection, build caching, code owners), and why scale forces specialized tools. Use to choose a repository strategy and understand Nx/Turborepo/Bazel-style monorepos.
category: devops
keywords_vi: đánh đổi giữa một kho lớn monorepo và nhiều kho nhỏ polyrepo, thay đổi nguyên tử xuyên nhiều project và đánh version thống nhất của monorepo, sở hữu độc lập và cô lập bán kính ảnh hưởng của polyrepo, monorepo cần công cụ phát hiện target bị ảnh hưởng build caching code owners, quy mô lớn buộc dùng công cụ chuyên biệt nx turborepo bazel
---

# Monorepo vs Polyrepo Tooling

Where does your code live — **one repository** holding many projects (monorepo), or **many repositories** each holding one (polyrepo/multirepo)? It's a foundational engineering-org decision with real trade-offs, and the choice largely dictates what **tooling** you need. Google/Meta run giant monorepos; many companies run polyrepos; both work, but for different reasons and with different costs (see incremental-and-hermetic-builds, dependency-resolution-and-lockfiles, semantic-versioning-and-compatibility).

## Monorepo: One Repo, Many Projects

**Strengths:**
- **Atomic cross-project changes** — a single commit can change a shared library **and** every consumer together, so you never have a broken intermediate state. Huge for refactoring shared code.
- **One version of everything** — a single source of truth for dependency versions ("one version policy"); no diamond-dependency hell across internal packages.
- **Easy code sharing & discovery** — all code visible, trivial to reuse and search; unified tooling/CI/standards.
- **Coordinated CI** — test the whole graph together.

**Costs (and the tooling they force):**
- **Scale** — millions of files break naive git/IDE/CI. You **can't** build/test everything on every commit, so you need:
  - **Affected-target detection** — compute which targets a change impacts (via the build graph) and build/test **only those** (Nx/Turborepo/Bazel).
  - **Build/test caching** (local + remote/shared) — reuse unchanged results (see incremental-and-hermetic-builds).
  - **CODEOWNERS / access control** — many teams in one repo need ownership boundaries and review routing.
  - Sometimes **sparse/partial checkout** and virtual filesystems for very large repos.

## Polyrepo: Many Small Repos

**Strengths:**
- **Independent ownership & lifecycle** — each team owns its repo, releases on its own cadence, with clear boundaries.
- **Blast-radius isolation** — a change/CI failure is contained to one repo; smaller, faster per-repo CI.
- **Simple standard tooling** — normal git/CI scales fine per repo.

**Costs:**
- **Cross-repo changes are painful** — updating a shared library means publishing a new version and then a **coordinated rollout** of PRs across every consumer repo (no atomic change).
- **Dependency drift & diamond dependencies** — repos pin different versions of shared libs; you get version-conflict and "which version is deployed?" problems (see dependency-hell).
- **Duplication** — tooling, config, and standards get copied and diverge.

## Choosing

Roughly: **monorepo** shines when many projects **change together** and you want atomic refactors + one version — but you **must** invest in scale tooling (affected detection, caching, ownership). **Polyrepo** shines when teams/services are **independently owned and released** and isolation matters more than atomic cross-cutting changes. Many orgs land on a **hybrid** (a few monorepos per domain). The decision is as much about **team topology** as technology.

## Design Guidance (for understanding/using)

- **Pick based on how often code changes *together*** and your team structure, not hype.
- **A monorepo without scale tooling is a trap** — you need affected-target detection + caching or CI melts down.
- **A polyrepo needs a versioning/release discipline** for shared libs (semver + coordinated rollouts) or you get dependency drift.
- **Enforce ownership** (CODEOWNERS) in monorepos so many teams coexist.
- **Consider hybrid** — group tightly-coupled projects into a monorepo, keep independent services separate.

## Pitfalls (in understanding/using)

- Adopting a **monorepo** without affected-target detection/caching → building/testing everything on every commit; CI collapses.
- **Polyrepo** shared libraries with no version discipline → dependency drift and diamond conflicts.
- Expecting **atomic cross-project changes** in polyrepo → impossible; you get multi-PR coordinated rollouts.
- Ignoring **ownership/access** in a big monorepo → chaotic reviews and accidental cross-team breakage.
- Choosing by trend rather than by how your code and teams actually change together.
