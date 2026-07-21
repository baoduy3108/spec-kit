---
name: helm-and-kubernetes-packaging
description: How Helm packages Kubernetes apps — charts as templated, versioned bundles of manifests with configurable values, releases and upgrades/rollbacks, and why templating YAML has trade-offs. Use to understand Helm charts, packaging Kubernetes apps, templated manifests, values files, or Helm vs Kustomize.
category: engineering
keywords_vi: helm đóng gói ứng dụng kubernetes, chart là bó manifest có template và phiên bản, values cấu hình, release nâng cấp rollback, đánh đổi khi template hóa yaml, helm vs kustomize
---

# Helm and Kubernetes Packaging

Deploying a real app to Kubernetes means managing **many** manifests (deployments, services, config maps, ingress, secrets) that vary per environment. **Helm** is the most common **package manager** for Kubernetes: it bundles those manifests into a **chart** — a templated, versioned, configurable package — so you can install, upgrade, and roll back an app as **one unit** (see kubernetes-basics, gitops).

## The Problem: Manifest Sprawl and Per-Environment Variation

A single app is a **pile of YAML** manifests, and you need slightly different versions per environment (dev/staging/prod differ in replicas, resources, image tags, hostnames, secrets). Copy-pasting and hand-editing YAML across environments is error-prone and unmaintainable. You want to **define once, parameterize, and deploy anywhere** — and treat the whole app as a versioned, installable package.

## The Core Idea: Templated, Configurable Charts

A **Helm chart** is a package containing:
- **Templates** — Kubernetes manifests with **placeholders** (Go templating): `replicas: {{ .Values.replicaCount }}`.
- **`values.yaml`** — the default **configuration values** that fill the templates.
- **Chart metadata** — name, **version**, dependencies.
To deploy, Helm **renders** the templates with a set of values (defaults + per-environment overrides) into final manifests and applies them. Same chart + different values = dev vs prod, no copy-paste. Charts are **versioned** and shareable (chart repositories), so you can install common apps (databases, ingress controllers) with one command.

## Releases: Install, Upgrade, Rollback

Helm tracks each deployment as a **release** with a revision history:
- **Install** — render + apply the chart as a named release.
- **Upgrade** — apply a new chart version/values; Helm computes the diff.
- **Rollback** — revert to a previous release revision if an upgrade breaks (a big operational win — one command to roll back the whole app).
This lifecycle management (versioned releases you can roll back) is a key reason to use Helm over raw `kubectl apply`.

## The Trade-off: Templating YAML

Helm's templating power has real downsides:
- **Text templating of YAML is fragile** — indentation bugs, quoting issues, and templates that produce invalid YAML; hard to read and debug at scale.
- **Complexity** — heavily-templated charts become hard to reason about (logic in templates).
- **Alternative: Kustomize** — patches/overlays over plain YAML (no templating language); simpler and native to `kubectl`, but less powerful for complex parameterization and no package/release management.
Rough guidance: **Helm** for packaging/sharing apps and needing versioned releases/rollbacks; **Kustomize** for straightforward per-environment overlays without templating complexity. Many teams use both.

## Design Guidance

- **Chart per app**, values per environment — define once, override per env.
- **Keep templates simple** — push complexity into values, not template logic; avoid clever conditionals.
- **Version charts** and pin dependency versions for reproducible deploys.
- **Use rollback** — Helm's revision history is a safety net for bad upgrades.
- **Don't put secrets in values in plaintext** — use secret managers / sealed secrets (see secrets-management).
- **Lint/template-render in CI** (`helm template`/`helm lint`) to catch YAML errors before deploy.
- **Consider Kustomize** when you just need overlays without templating overhead.

## Pitfalls (in understanding/using)

- **Over-templated** charts → fragile, unreadable YAML that's hard to debug.
- **Indentation/quoting** bugs from text-templating YAML → invalid manifests; render + lint in CI.
- **Plaintext secrets** in `values.yaml` (often committed) → leaks; use a secrets solution.
- Not pinning **chart/dependency versions** → non-reproducible deploys.
- Treating Helm as just `kubectl apply` → you lose its point (releases, upgrades, **rollback**).
- Reaching for Helm's complexity when **Kustomize** overlays would suffice.
- Forgetting to **diff/dry-run** upgrades → surprise changes in prod.
