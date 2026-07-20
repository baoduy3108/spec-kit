---
name: policy-as-code
description: How policy-as-code works — defining governance, security, and compliance rules as version-controlled code that's automatically enforced in pipelines and at runtime (OPA/Rego, admission controllers, IaC scanning), versus manual review. Use to understand policy-as-code, OPA, automated compliance/guardrails, or enforcing security/governance rules automatically.
category: engineering
keywords_vi: policy as code, chính sách dưới dạng mã, quản trị tuân thủ bảo mật tự động, opa rego, admission controller, quét iac, guardrail tự động, thay thế review thủ công
---

# Policy as Code

Policy-as-code expresses **governance, security, and compliance rules as version-controlled code** that machines enforce automatically — instead of rules living in wiki docs and being checked by manual review. It brings automation, consistency, and auditability to "what's allowed" decisions.

## The Problem It Solves

Organizations have rules: "no public S3 buckets," "all resources must be tagged," "containers can't run as root," "only approved base images," "PII must be encrypted." Enforcing these via **manual review** is slow, inconsistent (reviewers miss things), doesn't scale, and provides weak audit trails. Policy-as-code turns these rules into **executable checks** that run automatically and uniformly.

## How It Works

- **Policies as code** — rules written in a policy language (e.g. **Rego** for **Open Policy Agent / OPA**) or a tool's policy DSL, stored in version control (reviewed, versioned, tested like any code).
- **Enforced automatically** at decision points:
  - **In CI/CD** — scan infrastructure-as-code (Terraform plans), Kubernetes manifests, and configs **before** deploy; block violations (see ci-cd-and-automation, terraform-and-opentofu). Shift-left: catch policy issues at PR time.
  - **At admission** — a Kubernetes **admission controller** (OPA Gatekeeper, Kyverno) rejects non-compliant resources at deploy time.
  - **At runtime** — services query a policy engine (OPA) for authorization decisions ("can this user do this?") — decoupling policy from app code.
The same policy can guard multiple layers.

## Why It's Valuable

- **Consistency** — the rule is applied identically everywhere, every time — no human variance.
- **Automation & scale** — enforce across thousands of resources/pipelines without manual gatekeepers.
- **Shift-left** — violations caught early (at PR/plan), cheap to fix, before they reach production.
- **Auditability** — policies and their evaluations are logged and versioned; you can **prove** compliance (great for SOC2/regulatory audits).
- **Guardrails, not gates** — teams move fast within automated safe boundaries instead of waiting on manual approval.
- **Decoupled authorization** — externalize authz logic from apps into a policy engine (see authentication-and-authorization).

## Where It's Used

Infrastructure compliance (cloud config, IaC scanning), Kubernetes governance (admission control), fine-grained application authorization, CI/CD gates, and cost/tagging governance (see cloud-cost-optimization).

## Pitfalls (in understanding/using)

- **Overly strict policies** that block legitimate work → teams route around them or get blocked; balance guardrails with flexibility, allow exceptions with approval.
- Policies with **no tests** — a buggy policy either lets bad things through or blocks everything; test policies like code.
- **Enforce-only, no visibility** — start in **warn/audit** mode to see impact before hard-blocking, to avoid surprise breakage.
- Treating it as a **replacement for security thinking** — it enforces known rules; you still need threat modeling (see threat-modeling) for the unknowns.
- Policy sprawl — too many scattered, unmanaged policies become their own mess; organize and own them.
- Only enforcing at **one** layer (e.g. CI) while runtime remains unguarded — layer enforcement where it matters.
- Slow/complex runtime policy checks adding latency to every request.
