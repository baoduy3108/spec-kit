---
name: secrets-management
description: Handle secrets (API keys, passwords, tokens, certs) safely — never commit them, inject via environment/secret managers, rotation, least privilege, encryption at rest/in transit, and what to do when a secret leaks. Use when handling credentials in code, config, CI/CD, or infrastructure.
category: engineering
keywords_vi: quản lý secret, secret api key, không commit, biến môi trường env, vault, secret manager, rotate secret, lộ key, bảo mật thông tin nhạy cảm
---

# Secrets Management

Secrets — API keys, DB passwords, tokens, private keys, certificates — grant access, so leaking one is a breach. Handle them with discipline.

## The Cardinal Rule: Never Commit Secrets

Secrets must **never** be in source code or committed config. Git history is forever — a secret committed and "deleted" in a later commit is still in history and must be treated as compromised. Use a **`.gitignore`** for `.env`/key files, provide a `.env.example` with blank placeholders, and add a **secret-scanning** pre-commit hook / CI check (gitleaks, GitHub secret scanning) to catch mistakes before they land.

## How to Provide Secrets Instead

- **Environment variables** — the common baseline; injected at runtime, not baked into the image. (Mind that env can leak via logs, error dumps, or `docker inspect`.)
- **Secret managers** — Vault, AWS/GCP/Azure secret managers, or the platform's secret store (Render/Kubernetes Secrets). They provide encrypted storage, access control, audit logs, and rotation. Prefer these for production.
- **Mounted secret files** over env for large/sensitive values (e.g. Docker/K8s secrets mounted as files).
- In **CI/CD**, use the platform's encrypted secrets, never plaintext in the pipeline YAML or logs (mask them).

## Ongoing Hygiene

- **Least privilege** — each secret grants the minimum scope needed; separate secrets per environment (dev/staging/prod) and per service. A leaked read-only key is less catastrophic than an admin one.
- **Rotation** — rotate secrets periodically and support rotation without downtime (accept old + new during a window). Short-lived/dynamic credentials beat long-lived static ones.
- **Encrypt** at rest (the secret store) and in transit (TLS everywhere).
- **Don't log secrets** — scrub them from logs, error messages, and traces; be careful echoing config.
- **No secrets in URLs** (they land in logs, browser history, referer headers) — use headers/body.

## When a Secret Leaks

Treat any exposed secret as compromised: **rotate/revoke it immediately** (don't just delete the commit), audit for misuse, and figure out how it leaked to prevent recurrence. Speed matters — automated scanners find public keys within minutes.

## Pitfalls

- Committing `.env` / keys (the #1 leak) — enforce with scanning.
- Secrets in front-end code or client bundles (anything shipped to the browser is public).
- Reusing one secret everywhere (one leak = total compromise).
- Long-lived credentials never rotated.
- Printing config (with secrets) to logs on startup.
