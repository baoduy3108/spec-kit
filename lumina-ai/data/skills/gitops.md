---
name: gitops
description: How GitOps works — using Git as the single source of truth for declarative infrastructure and deployments, with an agent continuously reconciling the running system to match the repo, enabling audit, rollback, and pull-based deploys. Use to understand GitOps, ArgoCD/Flux, declarative deployments, or managing infrastructure/Kubernetes via Git.
category: engineering
keywords_vi: gitops, git là nguồn sự thật, khai báo declarative, reconcile đồng bộ liên tục, argocd flux, pull-based deploy, audit rollback qua git, quản lý hạ tầng bằng git
---

# GitOps

GitOps is an operational model where **Git is the single source of truth** for your infrastructure and application deployments, and an automated agent **continuously reconciles** the running system to match what's declared in the repo. It brings the rigor of code review and version control to operations.

## The Core Idea

Everything about your desired system state — Kubernetes manifests, infrastructure config, app versions — is stored **declaratively in a Git repository**. You don't run deploy commands manually; instead:
1. You change the **desired state** in Git (a commit/PR).
2. An **agent** running in the cluster detects the change and **applies** it, making reality match the repo.
3. The agent **continuously reconciles** — if the live system drifts from Git (someone hand-edits, something crashes), it corrects it back to the declared state.
Git holds *what should be*; the agent makes it so, forever.

## Declarative & Pull-Based

- **Declarative** — you describe the desired end state, not the steps to get there (like Kubernetes/Terraform). The system figures out how to converge (see terraform-and-opentofu).
- **Pull-based** (the security advantage) — the agent runs **inside** the cluster and **pulls** changes from Git, rather than an external CI system **pushing** into the cluster. So the cluster's credentials never leave it, and you don't hand CI broad production access. (Tools: **ArgoCD**, **Flux**.)

## Why It's Valuable

- **Audit trail & review** — every change is a Git commit: who, what, when, why, reviewed via PR (see git-workflow-and-versioning). Operations become as auditable and collaborative as code.
- **Easy rollback** — revert the commit and the agent rolls the system back to the previous declared state. No special rollback tooling.
- **Drift detection & self-healing** — the agent notices and corrects manual changes/drift, keeping the system consistent with Git.
- **Reproducibility** — the repo fully describes the system; you can recreate an environment from Git.
- **No manual `kubectl apply`** — reduces human error and "works on my machine" ops.

## GitOps vs Traditional CI/CD

Traditional CI/CD often **pushes** deploys from a pipeline with cluster credentials. GitOps separates **CI** (build/test, produce artifacts) from **CD** (the in-cluster agent syncs desired state from Git). CI writes the new desired state to Git; the GitOps agent deploys it. This decoupling improves security and gives a clean, declarative deployment record (see ci-cd-and-automation, deployment-strategies).

## Pitfalls (in understanding/using)

- **Manual changes** to the live system → drift; the agent reverts them (which surprises people). Change via Git, not by hand.
- Putting **secrets in plaintext** in Git — never; use sealed secrets/external secret managers (see secrets-management).
- Treating GitOps as only a tool (ArgoCD) rather than the **discipline** (Git as source of truth, declarative, reconciled).
- Not handling **non-declarative** actions (data migrations, one-off tasks) that don't fit the model.
- A giant single repo/config that's hard to review — structure repos/environments sensibly.
- Forgetting the agent needs to be **healthy and monitored** — if it stops reconciling, drift accumulates silently.
