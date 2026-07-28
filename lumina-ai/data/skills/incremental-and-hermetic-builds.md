---
name: incremental-and-hermetic-builds
description: Why modern build systems only rebuild what changed and get identical results everywhere — incremental and hermetic builds. Covers the build graph (targets + dependencies), content-based change detection, why hermeticity (declared inputs, no ambient state) is what makes caching and remote execution correct, and the "works on my machine" root cause. Use to understand Bazel/Buck/Nx-style builds and why undeclared inputs break caching.
category: devops
keywords_vi: build tăng dần incremental chỉ dựng lại phần đã thay đổi và build kín hermetic cho kết quả giống nhau mọi nơi, đồ thị build target và phụ thuộc, phát hiện thay đổi theo nội dung băm, hermetic khai báo đủ input không phụ thuộc trạng thái môi trường là điều kiện để cache và remote execution đúng, works on my machine do input không khai báo bazel buck nx
---

# Incremental & Hermetic Builds

Building a large project from scratch every time is unbearably slow, and builds that behave differently on each machine ("works on mine") are a nightmare. Modern build systems (Bazel, Buck, Nx, Turborepo, Gradle) solve both with two linked ideas: **incremental** builds (only rebuild what changed) and **hermetic** builds (fully-declared, reproducible, environment-independent). Crucially, **incrementality is only correct if the build is hermetic** — undeclared inputs are what silently break caching (see reproducible-builds-and-caching, monorepo-and-polyrepo-tooling, dependency-resolution-and-lockfiles).

## The Build Graph

A build system models the project as a **directed acyclic graph** of **targets** (a compiled library, a bundle, a test) and their **dependencies** (source files, other targets, tools). To build a target, you build its dependencies first. This graph is what enables everything else: the system knows exactly what each output depends on.

## Incremental Builds: Rebuild Only What Changed

Given the graph, the system detects **what changed** and rebuilds only the affected targets and their downstream dependents — leaving everything else untouched. Change detection is best done by **content hashing** (hash of inputs), not timestamps: timestamps are unreliable (clock skew, checkout order, touch), while a content hash of a target's inputs (sources + dependency outputs + compiler flags + toolchain) is a stable **cache key**. If the key matches a previous build, reuse the cached output — no rebuild. This is why a one-line change recompiles one module, not the world.

## Hermeticity: The Correctness Foundation

An **incremental/cached build is only correct if it captured all the inputs.** If a target secretly reads an **undeclared input** — a system-installed library, an environment variable, the wall clock, a network resource, a file outside its declared deps — then the cache key doesn't reflect that input, and the system will **reuse a stale/wrong cached result** when that hidden input changes. **Hermetic** builds forbid this: every input is **explicitly declared**, the build runs in an **isolated sandbox** (no ambient filesystem/network/env), and toolchains are pinned. Then the hash truly captures everything, so:
- **Caching is correct** — same inputs → same output, guaranteed.
- **Reproducibility** — the build gives identical results on any machine.
- **Remote execution & shared caching** — because builds are hermetic and content-addressed, work can run on remote workers and outputs can be **shared across a whole team/CI** (someone already built this exact target → download it). This is Bazel's superpower.

Hermeticity is also the real cure for "works on my machine": that bug **is** an undeclared input (a local tool/env the build depended on but didn't declare).

## Design Guidance (for understanding/using)

- **Model the build as a dependency graph** with explicitly declared inputs/outputs per target.
- **Key caches on content hashes of all inputs** (sources + deps + flags + toolchain), not timestamps.
- **Make builds hermetic** — sandbox them, declare every input, pin toolchains; no ambient env/network/clock.
- **Exploit hermeticity for shared/remote caching** — a team/CI reuses each other's build outputs by content key.
- **Hunt undeclared inputs** when caching gives wrong results or builds aren't reproducible — that's almost always the cause.

## Pitfalls (in understanding/using)

- Caching incremental builds **without hermeticity** → stale/wrong outputs when an undeclared input changes.
- Using **timestamps** for change detection → false rebuilds or missed rebuilds; hash content instead.
- **Undeclared inputs** (system libs, env vars, clock, network) → "works on my machine" and cache poisoning.
- Non-pinned **toolchains** → different results per machine; pin compiler/tool versions.
- Assuming a green local build means a green CI build → only true if the build is hermetic.
