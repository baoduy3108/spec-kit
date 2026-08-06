---
name: configuration-management
description: How application configuration should be managed — separating config from code (twelve-factor), config by environment, secrets handling, config sources (env vars, files, config services), validation, and dynamic vs static config. Also covers server config management tools (Ansible/Chef/Puppet). Use to understand managing app config, environment variables, config per environment, or config management tools.
category: engineering
keywords_vi: configuration management, quản lý cấu hình, tách config khỏi code, config theo môi trường, env var biến môi trường, secrets, config service dynamic, ansible chef puppet
---

# Configuration Management

Configuration is everything that varies between deployments/environments without changing code — database URLs, API keys, feature toggles, tuning parameters. Managing it well keeps the same code artifact running correctly across dev, staging, and production, and keeps secrets safe.

## Separate Config From Code (twelve-factor)

The foundational principle (see twelve-factor-app): **config that varies by environment lives outside the code**, not hardcoded. The *same* built artifact should run in every environment, configured differently at runtime. This means you can promote the exact tested binary/image from staging to production with only config changing — no rebuild, no code edits per environment. Hardcoding environment-specific values (a prod DB URL in the source) is the anti-pattern this fixes.

## Config Sources

Common ways to supply config, in rough order of preference for cloud-native apps:
- **Environment variables** — the twelve-factor default: simple, language-agnostic, injected per environment, no config file in the image. Great for most settings.
- **Config files** — mounted per environment (YAML/JSON/TOML); good for larger/structured config.
- **Config services** — centralized stores (Consul, etcd, cloud parameter stores, feature-flag services) for **dynamic** config that can change without redeploy (see feature-flags-and-rollouts).
- **Secrets managers** — for sensitive values (below).

## Secrets Are Special

Secrets (passwords, API keys, tokens) are config but must **never** be in code, in the image, or committed to Git (see secrets-management, how-cryptographic-hashing-works). Store them in a **secrets manager** (Vault, cloud secret stores, sealed secrets) and inject at runtime. Rotate them. Treat leaked secrets as compromised. This is a top security concern (see owasp-top-10).

## Good Practices

- **Validate config at startup** — fail fast with a clear error if a required value is missing/malformed, rather than crashing mysteriously later.
- **Sensible defaults** for non-critical settings; require the critical ones explicitly.
- **Per-environment** overrides layered cleanly (defaults → environment → overrides).
- **Dynamic vs static** — most config is static (set at deploy); use dynamic config services for things you need to change live (feature flags, tuning) — but keep the truly critical config static and reviewed.
- **Don't log config** (especially secrets).

## Server Configuration Management Tools

For managing the configuration of **servers/machines** (installed packages, files, services) — as opposed to app config — tools like **Ansible, Chef, Puppet, SaltStack** declaratively define and enforce a server's desired state. In modern immutable/container workflows (see immutable-infrastructure, how-docker-containers-work), much of this shifts into building images, but these tools remain common for provisioning and non-container fleets.

## Pitfalls (in understanding/using)

- **Hardcoding** environment-specific values or **secrets** in code/images → can't reuse the artifact, and leaks secrets.
- Committing **secrets to Git** — a top breach cause; use a secrets manager.
- **Different builds per environment** — breaks reproducibility; same artifact, different config.
- **No validation** → the app starts with bad/missing config and fails confusingly later; validate at startup.
- **Config sprawl** — settings scattered across many places with no clear precedence; centralize and document.
- Logging or exposing config/secrets (in error messages, debug endpoints).
- Overusing **dynamic** config for things that should be static/reviewed (unreviewed live changes cause outages).
