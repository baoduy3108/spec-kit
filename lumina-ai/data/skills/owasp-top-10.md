---
name: owasp-top-10
description: The most common web application security risks (OWASP Top 10) and how to defend against each — broken access control, injection, cryptographic failures, SSRF, security misconfiguration, vulnerable dependencies, auth failures, and more. Use when securing a web app, doing a security review, or learning what vulnerabilities to guard against.
category: engineering
keywords_vi: owasp top 10, lỗ hổng web phổ biến, broken access control, injection sql, ssrf, cấu hình sai bảo mật, phòng thủ ứng dụng web, danh sách rủi ro bảo mật
---

# OWASP Top 10 — Web Application Risks

The OWASP Top 10 is the industry's consensus list of the most critical web application security risks. Knowing them is baseline security literacy — most breaches exploit these, not exotic zero-days. Defenses below; see also security-and-hardening, threat-modeling, authentication-and-authorization.

## The Risks & Defenses

1. **Broken Access Control** (the #1 risk) — users acting outside their permissions (viewing others' data by changing an ID, accessing admin routes). **Defend:** enforce authorization on **every** request server-side (never trust the client/UI to hide things); deny by default; check ownership on each object (IDOR); don't expose direct object references without a check.

2. **Cryptographic Failures** — exposing sensitive data via weak/missing crypto. **Defend:** TLS everywhere; encrypt sensitive data at rest (see how-encryption-at-rest-works); hash passwords with bcrypt/argon2 (never MD5/SHA1, never plaintext); don't invent crypto; manage keys properly (see secrets-management).

3. **Injection** (SQL, NoSQL, command, LDAP) — untrusted input interpreted as code/query. **Defend:** parameterized queries / prepared statements (never string-concatenate SQL); validate and escape input; use safe APIs. XSS (injection into the browser) → escape output, Content-Security-Policy (see security-headers).

4. **Insecure Design** — flaws in the design itself, not the implementation. **Defend:** threat model early (see threat-modeling); secure design patterns; don't bolt security on after.

5. **Security Misconfiguration** — default creds, verbose errors, unnecessary features, open cloud buckets. **Defend:** harden defaults; minimal surface; disable debug in prod; review cloud/permissions config; security headers.

6. **Vulnerable & Outdated Components** — known-vulnerable dependencies. **Defend:** inventory dependencies; scan (SCA tools, `npm audit`); patch promptly; remove unused deps (see dependency-management).

7. **Identification & Authentication Failures** — weak auth, credential stuffing, poor session management. **Defend:** MFA; strong password policy + breach checks; rate-limit/lock login; secure session tokens; proper logout/expiry (see authentication-and-authorization).

8. **Software & Data Integrity Failures** — trusting unverified updates/data, insecure deserialization, compromised CI/CD (supply chain). **Defend:** verify signatures; don't deserialize untrusted data unsafely; secure the pipeline.

9. **Security Logging & Monitoring Failures** — not detecting breaches. **Defend:** log security events (logins, access-control failures); monitor and alert; don't log secrets (see logging-and-observability).

10. **Server-Side Request Forgery (SSRF)** — server tricked into making requests to internal resources. **Defend:** validate/allowlist outbound URLs; block requests to internal IPs/metadata endpoints; segment the network.

## Practical Approach

- **Defense in depth** — layer controls; assume any single one can fail.
- **Validate input, encode output, authorize every action** — three habits that prevent most of the list.
- Automate what you can (dependency scanning, SAST/DAST) but don't skip design-level thinking (threat modeling).
- Keep dependencies current — a huge fraction of real breaches are known-CVE components.

## Pitfalls

- **Client-side-only security** (hiding a button ≠ authorization) — enforce server-side.
- **Rolling your own crypto/auth** instead of vetted libraries.
- **String-building queries** → injection.
- **Trusting the network perimeter** — internal services get attacked too (SSRF, lateral movement).
- Treating the Top 10 as a checklist to pass once rather than ongoing practice.
