---
name: reproducible-builds-and-caching
description: How reproducible builds and build caching work — making a build produce bit-identical output from the same inputs (pinned deps, no timestamps/nondeterminism) for trust and cacheability, and content-addressed build caches that skip unchanged work. Use to understand reproducible/deterministic builds, build caching, hermetic builds, or why builds should be deterministic.
category: engineering
keywords_vi: build tái lập, build tất định, cache theo nội dung, hermetic, reproducible build, deterministic build, content-addressed cache, cùng input cùng output
---

# Reproducible Builds and Build Caching

A **reproducible (deterministic) build** produces **bit-identical output** every time it runs from the **same inputs** — same source, same dependencies, same tools. This property underpins both **trust** (you can verify a binary matches its source) and **speed** (identical inputs → reuse cached results). Non-deterministic builds silently undermine caching, security verification, and debugging (see software-supply-chain-security, web-build-tools-and-bundlers).

## The Problem: Builds That Vary

Run the same build twice and you often get **different** artifacts — even with unchanged source. Causes of non-determinism:
- **Timestamps** embedded in outputs (build date, file mtimes).
- **Non-pinned dependencies** — "latest" pulls a different version today.
- **Ordering** — files/entries in nondeterministic order (hash map iteration, parallelism).
- **Absolute paths / hostnames / usernames** baked in.
- **Randomness** (random seeds, temp filenames) in the toolchain.
Varying builds are a problem because: you **can't verify** a shipped binary came from the claimed source (supply-chain trust — see software-supply-chain-security), you **can't cache** effectively (outputs differ so caches miss), and "it built differently" bugs are maddening.

## Achieving Reproducibility

- **Pin everything** — exact dependency versions (lockfiles + hashes), exact tool/compiler versions, a fixed base image (see software-supply-chain-security).
- **Eliminate nondeterminism** — strip/normalize timestamps (or set a fixed `SOURCE_DATE_EPOCH`), sort file lists, avoid embedding paths/hostnames, seed any randomness.
- **Hermetic (isolated) builds** — the build depends **only** on declared inputs, not on ambient system state (whatever happens to be installed on the machine). Sandbox the build so it can't reach undeclared inputs. This is how systems like Bazel/Nix guarantee reproducibility.
- **Same inputs → same outputs**, verifiably (you can rebuild and compare hashes).

## Build Caching: Skip Unchanged Work

Reproducibility unlocks powerful **caching**. If a build step's **inputs are identical** to a previous run, its **output must be identical too** — so you can **skip the work** and reuse the cached result:
- **Content-addressed caching** — hash the **inputs** (source files, dependencies, command, flags) to a key; if that key's output is already cached, reuse it. Change one file → only steps depending on it re-run; everything else is a cache hit.
- **Layer caching** (Docker) — each image layer is cached by its inputs; unchanged layers are reused, so only changed layers rebuild (order your Dockerfile so volatile steps are last — see container-image-optimization).
- **Distributed/remote cache** — share the cache across a team/CI so one person's (or CI's) build results speed up everyone's; a cold CI build becomes mostly cache hits.
This is why modern build systems (Bazel, Turborepo, Nx, Gradle) are fast on large repos: **most of the build is cache hits** because unchanged inputs produce known outputs. But caching is only **correct** if builds are deterministic — otherwise you cache and reuse **wrong/stale** artifacts.

## Design Guidance

- **Pin dependencies and tools** (lockfiles, fixed images) for determinism.
- **Remove nondeterminism** — timestamps, ordering, paths, randomness.
- **Aim for hermetic builds** — declared inputs only; sandbox to catch hidden dependencies.
- **Key caches on inputs** (content-addressed); ensure the cache key captures *everything* that affects output (including tool versions/flags).
- **Order Dockerfile layers** from least- to most-frequently-changing for maximal layer cache hits.
- **Share a remote cache** across CI/team for big speedups.
- **Verify reproducibility** periodically (rebuild, compare hashes) — it's also a supply-chain check.

## Pitfalls (in understanding/using)

- **Non-deterministic builds** → broken caching (stale/wrong artifacts reused) and no way to verify source→binary.
- **Incomplete cache keys** — not hashing a relevant input (tool version, env, flag) → serving a **wrong** cached result (a nasty, hard-to-find bug).
- **Floating dependencies** ("latest") → different builds on different days; pin them.
- Embedded **timestamps/paths/hostnames** silently breaking bit-identical output.
- **Docker layer order** with volatile steps early → cache invalidated every build.
- Trusting a cache built from **non-hermetic** builds → hidden inputs make it unreliable.
- Assuming caching is safe without **determinism** — the two are linked; caching a nondeterministic build is a correctness hazard.
