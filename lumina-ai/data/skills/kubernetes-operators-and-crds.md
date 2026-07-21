---
name: kubernetes-operators-and-crds
description: How Kubernetes operators and CRDs work — extending Kubernetes with custom resource types (CRDs) and a controller that runs a continuous reconcile loop to drive real state toward desired state, encoding operational knowledge as software. Use to understand operators, custom resources, the controller reconcile loop, or automating stateful app operations on Kubernetes.
category: engineering
keywords_vi: kubernetes operator, crd custom resource, reconcile loop controller, operator pattern, mở rộng k8s loại tài nguyên tùy chỉnh, mã hóa tri thức vận hành thành phần mềm, tự động vận hành stateful
---

# Kubernetes Operators and CRDs

Operators extend Kubernetes to **automate the operation of complex applications** (databases, message brokers, stateful systems) by encoding **human operational knowledge** — how to deploy, back up, upgrade, recover — as software that runs **inside** the cluster. They're built on two ideas: **Custom Resource Definitions (CRDs)** that add new resource types, and a **controller** running a **reconcile loop** (see kubernetes-basics, how-ai-agents-work for the loop analogy).

## The Foundation: Kubernetes Is a Reconcile Engine

Kubernetes already works by **reconciliation**: you declare **desired state** (a Deployment wants 3 replicas), and a **controller** continuously compares desired vs **actual** state and takes action to close the gap (start pods if fewer than 3, kill extras if more). This **control loop** — observe, diff, act, repeat — is the heart of Kubernetes. Operators apply this **same pattern to *your* application**.

## CRDs: Teaching Kubernetes New Resource Types

Out of the box, Kubernetes knows Pods, Services, Deployments. A **Custom Resource Definition (CRD)** **adds a new resource type** — e.g. `PostgresCluster`, `KafkaTopic`, `Certificate` — so you can create objects of that type with `kubectl` just like built-ins. The CRD defines the type's **schema** (its spec: "a Postgres cluster with 3 replicas, version 15, daily backups"). Now the cluster has a first-class object representing your app's desired state, in Kubernetes' own declarative language.

## The Operator: A Controller for Your App

A CRD alone is just data. The **operator** is the **controller** that gives it meaning — a program watching those custom resources and running a **reconcile loop**:
1. **Observe** — watch `PostgresCluster` objects and the real resources backing them.
2. **Diff** — compare the desired spec (3 replicas, v15, backups on) against reality.
3. **Act** — create/adjust the underlying Pods, StatefulSets, PVCs, backup jobs, etc. to match; handle failover, upgrades, scaling.
4. **Repeat** — continuously, so it **self-heals** and maintains the app.
The operator **encodes the ops team's knowledge** ("how to safely upgrade Postgres", "how to fail over", "how to take a backup") into automated, always-on software. You declare *what* you want (a healthy 3-node Postgres); the operator handles *how*.

## Why Operators Matter

- **Stateful apps** are hard on Kubernetes (databases need careful ordering, backups, failover) — operators automate that expertise.
- **Day-2 operations** (upgrades, scaling, recovery) become declarative and automated, not manual runbooks.
- **Consistency** — the operator applies the same correct procedure every time, cluster-wide.
- **Extends Kubernetes** into a platform for *your* domain (the "Kubernetes as a control plane for everything" idea).

## Design Guidance

- **Use existing operators** for common systems (databases, cert-manager, Prometheus) — don't reinvent.
- **Reconcile, don't imperatively script** — the loop must be **idempotent** and **level-triggered** (converge from any state), not a one-shot script (see idempotency).
- **Handle all states** — the reconcile must cope with partial failures, restarts, and drift (it may run anytime, from any state).
- **Design the CRD spec** as the user-facing API — clear, declarative desired state.
- **Status subresource** — report actual status back on the resource so users see health.
- **Build an operator** only when you have real operational complexity to automate; simple apps don't need one.

## Pitfalls (in understanding/using)

- Writing the controller as an **imperative script** instead of an idempotent, level-triggered **reconcile loop** → breaks on restarts/partial state.
- **Non-idempotent** reconcile → duplicate/inconsistent actions when it re-runs (it will re-run constantly).
- Not handling **drift / partial failure** → the operator assumes a clean state that isn't there.
- Building a **custom operator** for a simple stateless app → needless complexity; use a Deployment/Helm.
- CRD as an afterthought → a confusing user-facing API; design the spec deliberately.
- Forgetting the operator must run **continuously** (it's not a deploy-time script) and self-heal.
