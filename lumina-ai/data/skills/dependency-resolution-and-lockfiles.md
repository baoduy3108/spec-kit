---
name: dependency-resolution-and-lockfiles
description: How a package manager turns "I want these version ranges" into one concrete, reproducible set of installed packages — dependency resolution and lockfiles. Covers the version-range constraint-satisfaction (SAT-like) problem, transitive dependencies, why the lockfile pins the exact resolved graph for reproducibility, and committing the lockfile. Use to understand npm/pip/cargo installs, non-reproducible builds, and why you must commit the lockfile.
category: devops
keywords_vi: giải phụ thuộc dependency resolution biến các khoảng phiên bản mong muốn thành một tập gói cụ thể tái lập được, bài toán thoả mãn ràng buộc kiểu sat, phụ thuộc bắc cầu transitive, lockfile ghim đồ thị đã giải chính xác để tái lập, commit lockfile vào repo, cài đặt npm pip cargo không tái lập nếu thiếu lockfile
---

# Dependency Resolution & Lockfiles

You declare that your project needs `react ^18.0.0` and `some-lib ^2.1.0`. But those libraries have **their own** dependencies (transitive deps), which have theirs, each with **version ranges**. Turning this web of "I accept versions in this range" declarations into **one concrete, working set of exact packages** is **dependency resolution** — a genuine constraint-satisfaction problem — and the **lockfile** is what makes the result **reproducible** (see semantic-versioning-and-compatibility, dependency-hell-and-diamond-dependencies, incremental-and-hermetic-builds).

## Resolution: A Constraint-Satisfaction Problem

The resolver must find a set of package versions that **simultaneously satisfies every range** across the whole **transitive** graph:
- Your direct deps' ranges, plus every dependency-of-a-dependency's ranges.
- When two packages require **conflicting** ranges of a shared dependency, the resolver must find a version satisfying both (or, in some ecosystems, install **multiple copies** — see diamond dependencies).
This is essentially a **SAT/constraint** problem; for large graphs it can be slow or even have **no solution** (unsatisfiable constraints). Different ecosystems resolve differently: **npm** can nest multiple versions in `node_modules`; **pip** historically had a flat, weaker resolver (one version per package) prone to conflicts; **cargo/go** have stricter, more principled resolvers. The resolver also applies rules like "prefer newest satisfying version."

## The Lockfile: Pin the Exact Graph

Ranges (`^`, `~`) mean "install the newest compatible version **at install time**." So `npm install` today and next month can produce **different** versions (a dependency published a new patch), making builds **non-reproducible** and causing "works today, breaks tomorrow" bugs. The **lockfile** (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `Cargo.lock`, `poetry.lock`, `Pipfile.lock`) fixes this: after resolution, it records the **exact resolved version and integrity hash of every package** in the whole transitive graph. Then:
- **`install` reads the lockfile** and installs **exactly** those versions — same result on every machine, every CI run, every deploy.
- **Integrity hashes** verify each package's content (supply-chain safety — the installed bytes match what was resolved).
- Resolution (recomputing from ranges) happens only when you **add/update** a dependency; otherwise you install from the lock.

## Commit the Lockfile (the cardinal rule)

For **applications**, **commit the lockfile** to version control. Without it, every developer/CI/deploy re-resolves and may get different versions → non-reproducible builds and heisenbugs. With it, everyone gets the identical dependency graph. (Note: **libraries** often *don't* commit a lockfile, because their consumers resolve deps in their own context — a library ships ranges, an app pins them.)

## Design Guidance (for understanding/using)

- **Always commit the lockfile for applications** — it's what makes installs reproducible across machines/CI/deploys.
- **Use `ci`/`--frozen-lockfile` in CI** (e.g. `npm ci`) — install strictly from the lock, fail if it's out of sync, never silently re-resolve.
- **Update deps deliberately** — run the update command, review the lockfile diff, test; don't let ranges drift silently.
- **Understand your ecosystem's resolver** — npm nests versions, older pip is flat (conflict-prone), cargo/go are strict; conflicts behave differently.
- **Rely on integrity hashes** for supply-chain safety; treat lockfile changes in review as security-relevant.

## Pitfalls (in understanding/using)

- **Not committing** the lockfile → every install may resolve different versions → non-reproducible, "works on my machine."
- Using `npm install` (re-resolves) instead of `npm ci` in **CI** → CI can drift from the lockfile.
- Assuming ranges give reproducibility → they don't; only the **lockfile** pins exact versions.
- Ignoring **transitive** conflicts → unsatisfiable constraints or surprise multiple-version installs.
- Committing a lockfile for a **library** → can mislead; libraries publish ranges, apps pin.
