---
name: immutable-infrastructure
description: How immutable infrastructure works — never modifying running servers in place; instead replacing them with new pre-built images on every change, eliminating configuration drift and enabling reliable rollbacks. Covers the pattern vs mutable "pets", golden images, and its role with containers. Use to understand immutable infrastructure, config drift, cattle vs pets, or why servers are replaced not patched.
category: engineering
keywords_vi: immutable infrastructure, hạ tầng bất biến, không sửa server đang chạy, thay thế bằng image mới, config drift trôi cấu hình, cattle vs pets, golden image, rollback
---

# Immutable Infrastructure

Immutable infrastructure means servers/instances are **never modified after deployment** — to change anything, you build a **new** version from an image and **replace** the old one, rather than patching it in place. This eliminates a whole class of reliability problems caused by servers drifting into unique, unreproducible states.

## Mutable ("Pets") vs Immutable ("Cattle")

- **Mutable infrastructure** — you SSH into servers and change them over time: patch packages, edit config, apply hotfixes. Over months, each server accumulates unique, undocumented changes. These are "**pets**" — hand-cared-for, irreplaceable, and each subtly different.
- **Immutable infrastructure** — servers are "**cattle**": identical, disposable, and never touched after launch. Need a change? Build a new image, deploy fresh instances from it, and destroy the old ones.
The mindset shift: **replace, don't repair.**

## The Problem It Solves: Configuration Drift

The core evil of mutable servers is **configuration drift** — servers that should be identical slowly diverge as manual changes, failed updates, and one-off fixes accumulate differently on each. Then "works on server 1 but not server 2" bugs appear, and no one knows the exact state of any server. It becomes impossible to reliably reproduce or recover an environment ("snowflake servers"). Immutable infra kills drift by **never changing** a running server — every instance came from the same image, guaranteed identical.

## How It Works

1. **Build a golden image** — bake the OS, dependencies, and app into a versioned, immutable artifact (a machine image / **container image** — see how-docker-containers-work) via an automated build (from code — see infrastructure-as-code ideas, gitops).
2. **Deploy fresh instances** from that image.
3. **To change anything** (new code, a patch, a config change) — build a **new** image version and roll out new instances, then terminate the old ones (a rolling/blue-green replace — see deployment-strategies).
4. **Never** SSH in to modify a running instance.
State that must persist (databases, user data) lives **externally** (managed DBs, object storage — see object-storage), so the compute instances stay stateless and disposable.

## Benefits

- **No config drift** — every instance is identical and reproducible from its image.
- **Reliable rollbacks** — a bad deploy? Redeploy the previous known-good image. No "undo the manual changes" guesswork.
- **Predictable/testable** — you test the exact image that goes to production.
- **Easier scaling & recovery** — launch more identical instances anytime; replace a failed one instantly.
- **Better security** — short-lived instances limit persistence of compromises; patch by rebuilding.
Containers and cloud auto-scaling groups make this the default modern pattern.

## Pitfalls (in understanding/using)

- **SSH-ing in to "quickly fix"** a running instance → reintroduces drift and defeats the model; change the image and redeploy.
- Storing **persistent state on the instance** — it's disposable; externalize databases/uploads (stateless compute).
- Slow image builds making replacement painful — invest in fast, automated image pipelines.
- Treating a long-lived instance as immutable while still patching it manually (a contradiction).
- Not versioning images / no clean rollback target — keep known-good image versions.
- Over-applying to genuinely stateful systems (databases) that need care — the pattern fits **stateless** compute best.
