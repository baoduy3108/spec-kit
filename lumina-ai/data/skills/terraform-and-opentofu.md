---
name: terraform-and-opentofu
description: Diagnose-first guidance for Terraform/OpenTofu — module hierarchy, count vs for_each identity, state backends and organization, testing strategy, CI/CD pipeline stages, secrets/security, version pinning, and modern features by version floor. Use when writing, reviewing, or debugging Terraform/OpenTofu modules, tests, CI, or state operations.
category: engineering
keywords_vi: terraform, opentofu, hạ tầng như mã, iac, terraform module, terraform state backend, count vs for_each, terraform ci/cd, terraform secret
---

# Terraform / OpenTofu

Diagnose the failure mode first, then generate. Every response should state assumptions & version floor, the risk category addressed (identity churn, secret exposure, blast radius, CI drift, state corruption, provider-upgrade risk), the chosen remediation & tradeoffs, a validation plan (`fmt -check`, `validate`, `plan -out`, policy check), and rollback notes. **Never recommend direct production apply without a reviewed plan artifact and approval.** Never `terraform destroy` without first `plan -destroy` showing every resource (including implicit dependents via locals/`for_each`) and explicit confirmation; never `-auto-approve` on destroy.

## Module Hierarchy

| Type | When | Scope |
|---|---|---|
| Resource module | Single group of connected resources | VPC + subnets |
| Infrastructure module | Collection of resource modules for a purpose | Modules in one region/account |
| Composition | Complete infrastructure | Multiple regions/accounts |

Separate **environments/** (prod/staging/dev) from **modules/**; use **examples/** as both docs and test fixtures. Keep modules small and single-responsibility.

## Naming & Structure

- Descriptive resource names (`aws_instance.web_server`, not `.main`); reserve `this` for genuine singletons.
- Prefix variables with context (`vpc_cidr_block`, not `cidr`). Standard files: `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`.
- Resource block order: `count`/`for_each` → arguments → `tags` → `depends_on` → `lifecycle`.
- Variable contracts: always `description` + explicit `type`; use `validation`, `sensitive = true`, and `optional()` typed defaults over `map(any)`.

## count vs for_each

- Boolean create/don't → `count = condition ? 1 : 0`.
- Items may reorder/remove → `for_each = toset(list)` (stable addresses).
- Reference by key / multiple named → `for_each = map`.
- **Never** use a list index as long-lived identity — removing a middle element reshuffles every address after it. Use `moved` blocks (1.1+) to refactor without destroy/recreate.

## State

Never use local state in teams/production. Remote backends give locking, encryption, versioning, audit. On 1.10+ use S3 native `use_lockfile` (DynamoDB no longer required). Organize per-environment + per-component (hybrid recommended: `prod/networking/`, `prod/compute/`). Split state when different teams/cadences or >500 resources; combine when tightly coupled, <100 resources, same lifecycle.

## Testing

Static (`validate`, `fmt`, `tflint`, `trivy`, `checkov`, free) → native `terraform test` (1.6+) → Terratest (integration) → policy (OPA/Sentinel). `command = plan` for input-derived values; `command = apply` for **computed values** (ARNs) and **set-type nested blocks** (can't index sets with `[0]`). Mock providers (1.7+) cut cost on PR validation.

## CI/CD & Security

Pipeline: **validate → test → plan → apply** (env protection). Apply the *reviewed plan artifact* — don't re-run `plan` in the apply job. Pin runtime (`~> 1.9`) and providers (`~> 5.0`); commit `.terraform.lock.hcl`; keep upgrades in a separate PR. Don't store secrets in variables/`.tfvars` (`sensitive` only masks display — value stays in state; use `write_only`/`*_wo` on 1.11+ or a cloud secret manager). Don't open SGs to `0.0.0.0/0`; use dedicated VPCs, encryption at rest + TLS, least-privilege, separate ingress/egress rule resources.

## Modern Features by Version Floor

`try()` (0.13) · `nullable=false` (1.1) · `moved` (1.1) · `optional()` defaults (1.3) · `import` blocks (1.5) · `check` blocks (1.5) · native `test` (1.6) · mock providers (1.7) · `removed` blocks (1.7) · cross-variable `validation` (1.9) · S3 native lock (1.10) · `write_only` (1.11). Verify the runtime floor before emitting a feature. Both Terraform and OpenTofu (starts at 1.6) supported.
