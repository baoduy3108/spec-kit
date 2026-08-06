---
name: how-terraform-state-works
description: How Terraform state works — the state file maps your config to real infrastructure, why it's the source of truth, remote state with locking for teams, drift between state and reality, and why you never edit state by hand. Use to understand Terraform state, remote state, state locking, drift, or why Terraform needs to track infrastructure.
category: engineering
keywords_vi: terraform state, remote state, state locking, state drift, file state ánh xạ config với hạ tầng thật, không sửa state bằng tay, terraform import state rm
---

# How Terraform State Works

Terraform's **state** is the thing that makes declarative infrastructure work — and the thing most Terraform problems trace back to. State is a file that **maps your configuration to the real resources** Terraform created, so it knows what exists, what to change, and what to destroy. Understanding it explains remote state, locking, drift, and why hand-editing state is dangerous (see terraform-and-opentofu, infrastructure-as-code, configuration-drift-and-immutability).

## Why Terraform Needs State

Terraform is **declarative**: you describe the desired infrastructure, and Terraform figures out the changes to reach it. To do that, it must know **what currently exists** and which real resource corresponds to each config block. It can't reliably reconstruct that from the cloud APIs alone (resources have generated IDs, and mapping config→reality is ambiguous). So Terraform keeps a **state file** recording, for each resource in your config, the **real resource ID** and its known attributes. On `plan`, it **diffs** config (desired) against state (last-known reality) to compute what to create/update/destroy. State is the **source of truth** Terraform plans against.

## The Team Problem: Remote State + Locking

The default **local** state file (`terraform.tfstate`) breaks down with a team:
- If two people run Terraform with **different** local state, they clobber each other's infrastructure.
- The state must be **shared** and **consistent**.
Solution: **remote state** — store the state in a shared backend (S3, GCS, Terraform Cloud, etc.) so everyone uses the same authoritative state. Add **state locking** — before applying, Terraform **locks** the state (e.g. via DynamoDB) so **two applies can't run at once** and corrupt it. Remote state + locking is essential for any team.

## Drift: State vs Reality

**Drift** is when the real infrastructure **diverges from what state records** — someone changed a resource **manually** (in the cloud console), or an external process modified it. Now state is stale. Terraform detects drift on `plan`/`refresh` (it queries real resources and compares to state) and will try to **revert** the manual change back to config (or show it as a diff). This is why **manual changes to Terraform-managed resources are dangerous** — they cause drift, surprising diffs, and can be undone. The rule: **change managed infra through Terraform, not by hand.**

## State Contains Secrets

State often stores resource attributes **including sensitive values** (passwords, keys, connection strings) in **plaintext**. So state is sensitive: store it in an **encrypted, access-controlled** backend, never commit it to git, and restrict who can read it (see secrets-management).

## Why You Never Hand-Edit State

The state file is Terraform's model of reality. Hand-editing it (or deleting it) desyncs Terraform from the real world → it may try to **recreate** resources that exist (duplicates) or **destroy/orphan** resources. For legitimate surgical changes, use **state commands** (`terraform state mv/rm/import`) — not a text editor. `import` brings existing resources under management; `state rm` forgets a resource without destroying it.

## Design Guidance

- **Use remote state with locking** for any team — never share local state files.
- **Encrypt and access-control** state (it holds secrets); never commit it to git.
- **Change managed resources only via Terraform** to avoid drift; run `plan` to detect drift.
- **Use state commands** (`mv`/`rm`/`import`), never hand-edit the JSON.
- **Split state** by environment/component (separate state files) to limit blast radius and lock contention.
- **Back up** state / enable versioning on the backend so you can recover.

## Pitfalls (in understanding/using)

- **Local state on a team** → people clobber each other's infrastructure; use remote state + locking.
- **Manual changes** to managed resources → drift; Terraform surprises you or reverts them.
- **Hand-editing/deleting** the state file → desync, duplicated or orphaned resources; use state commands.
- **Committing state to git** → leaks secrets and causes conflicts.
- No **locking** → concurrent applies corrupt state.
- **One giant state** for everything → slow, risky, lock contention; split by component/env.
- Forgetting state holds **plaintext secrets** → protect the backend.
