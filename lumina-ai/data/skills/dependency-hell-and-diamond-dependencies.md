---
name: dependency-hell-and-diamond-dependencies
description: Why dependency graphs get stuck — dependency hell and the diamond-dependency problem, where two of your dependencies need incompatible versions of a shared library. Covers why native/global libraries can't coexist (one version wins) while some ecosystems allow multiple copies, transitive conflict resolution, minimizing dependencies, and strategies (align versions, isolate, vendor). Use to diagnose and avoid version-conflict deadlocks.
category: devops
keywords_vi: địa ngục phụ thuộc dependency hell và bài toán phụ thuộc kim cương diamond, hai phụ thuộc cần phiên bản không tương thích của một thư viện chung, thư viện native toàn cục chỉ một phiên bản thắng còn vài hệ sinh thái cho nhiều bản cùng tồn tại, giải xung đột bắc cầu, giảm số phụ thuộc, chiến lược căn version cô lập vendor
---

# Dependency Hell & Diamond Dependencies

As a project accumulates dependencies (which have dependencies, which have dependencies…), the graph can reach a state where **no set of versions satisfies everyone** — **dependency hell**. Its most famous shape is the **diamond dependency**: your app depends on **A** and **B**, and *both* A and B depend on a shared library **C** — but they need **incompatible versions** of C. Which C do you install? This is one of the oldest, most frustrating problems in software (see dependency-resolution-and-lockfiles, semantic-versioning-and-compatibility, monorepo-and-polyrepo-tooling).

## The Diamond

```
        App
       /   \
      A     B
       \   /
        C        A needs C >=1.0 <2.0 ,  B needs C >=2.0
```
There's **no single version of C** that satisfies both A and B. Now what happens depends entirely on your ecosystem's model of how libraries live.

## Two Ecosystem Models

**1. One global version wins (native/system libraries, Python, Go modules, Maven*).** In languages where a symbol/package can exist **only once** in a process (native `.so`/`.dll`, most interpreted single-namespace ecosystems), you **cannot** load two versions of C. One version must satisfy everyone. If none does, you're **stuck** — you must upgrade A or B, downgrade, patch, or drop one. This is true dependency hell. (Java's classloaders and "one version policy" in monorepos push toward a single reconciled version.)

**2. Multiple versions coexist (npm/node_modules, Rust cargo, some others).** These allow **each dependency to get its own copy** of C at its required version — A uses C@1, B uses C@2, side by side. This **dissolves** many diamond conflicts (at the cost of larger installs and duplicate code). **But** it breaks down when C's types/state must be **shared** across the boundary: if A returns a `C@1` object and B expects a `C@2` object, they're *different types* → runtime mismatches. "Multiple versions" only works when the versions don't have to interoperate.

## Related Symptoms of Dependency Hell

- **Unsatisfiable constraints** — the resolver finds no solution; you must relax/upgrade something.
- **Version thrash** — every dependency bump cascades into others.
- **Bloat** — huge transitive graphs (thousands of packages) with security and maintenance burden.
- **Transitive breakage** — a deep dependency ships a breaking change under a bad version bump (see Hyrum's Law / semver).

## Strategies

- **Minimize dependencies** — the best fix is fewer deps and shallower graphs; every dependency is a liability.
- **Align on a shared version** — push A and B (or their maintainers) to support a common range; "one version policy" in monorepos enforces this.
- **Upgrade to reconcile** — often the newest versions of A and B agree on a newer C; keep deps current.
- **Isolate** — where the ecosystem allows, let conflicting deps have separate copies (npm) — but only if they don't share types across the boundary.
- **Vendor / shade / re-namespace** — bundle a private copy of C under a renamed namespace so it can't clash (Java "shading", Go vendoring) — a last resort.
- **Pin with a lockfile** so a working resolution stays working (see lockfiles).

## Design Guidance (for understanding/using)

- **Keep the dependency graph small and shallow** — the single most effective way to avoid dependency hell.
- **Know your ecosystem's model** — one-global-version (must reconcile) vs multiple-copies (can isolate, unless types cross the boundary).
- **Keep dependencies current** — newer versions usually converge on compatible shared deps.
- **Enforce a shared version** (one-version policy / monorepo) when internal libs must interoperate.
- **Vendor/shade only as a last resort** — it hides the dependency and complicates updates/security.

## Pitfalls (in understanding/using)

- Assuming "multiple versions coexist" always works → **fails** when the shared type crosses a boundary (A's C@1 ≠ B's C@2).
- Piling on dependencies → deep graphs make diamonds and unsatisfiable constraints inevitable.
- Letting deps rot → old versions can't reconcile; upgrading later is worse.
- Trying to force a **native/global** ecosystem to load two versions → impossible; one must win.
- Reflexive **vendoring/shading** → hidden copies with divergent security patches.
