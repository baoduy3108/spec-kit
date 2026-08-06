---
name: software-supply-chain-security
description: How to secure the software supply chain — the risk from dependencies and build pipelines, SBOMs for visibility, artifact signing and provenance/attestation (SLSA), dependency pinning, and defending against compromised packages. Use to understand supply-chain security, SBOM, artifact signing, provenance/SLSA, dependency risk, or securing the build pipeline.
category: engineering
keywords_vi: supply chain security, sbom, slsa provenance, ký artifact attestation, chuỗi cung ứng phần mềm, dependency confusion typo-squatting, package bị chiếm, pipeline build bị tấn công
---

# Software Supply Chain Security

Modern software is **mostly other people's code** — dozens to thousands of dependencies, plus a build pipeline that pulls, compiles, and ships artifacts. Each link is an attack surface: a compromised dependency, a poisoned build step, or a tampered artifact can inject malware into **everything downstream**. Supply-chain security is about **knowing what's in your software and proving it wasn't tampered with** (see dependency-management, secrets-management, pci-dss-basics for the "trust boundaries" mindset).

## The Threat: Attacks Shift Left, Blast Radius Is Huge

Rather than attacking your app directly, attackers compromise something **upstream** that you (and thousands of others) trust:
- **Malicious/compromised dependencies** — a popular package is taken over, or a typo-squatted lookalike is published; you `npm install` malware.
- **Compromised build pipeline** — an attacker injects a step that tampers with the artifact during build (SolarWinds-style), so the source looks clean but the shipped binary is backdoored.
- **Dependency confusion** — a public package shadows your internal one and gets pulled instead.
- **Tampered artifacts** — a binary/image is swapped between build and deploy.
One compromised link poisons **every** downstream consumer — enormous blast radius. This is why supply-chain attacks are so prized and dangerous.

## The Defenses

- **SBOM (Software Bill of Materials)** — a complete **inventory** of every component/dependency (and version) in your software. You can't secure what you can't see; an SBOM gives visibility to answer "are we affected by this new CVE?" (like Log4Shell) in minutes instead of days.
- **Dependency pinning & lockfiles** — pin **exact versions** (and hashes) so builds are reproducible and a dependency can't silently change under you. Verify **integrity hashes**.
- **Artifact signing** — cryptographically **sign** build artifacts/images (Sigstore/cosign) so consumers can **verify** they came from you and weren't tampered with (see how-digital-signatures-work).
- **Provenance / attestation (SLSA)** — generate a signed, verifiable record of **how and where** an artifact was built (which source, which pipeline). **SLSA** is a framework of maturity levels for build integrity. Provenance lets you **verify the build**, defending against pipeline tampering.
- **Dependency scanning** — automatically scan dependencies for known **vulnerabilities** (CVEs) and license/policy issues; alert and update.
- **Least privilege in CI/CD** — the pipeline has powerful credentials; harden it, scope secrets tightly, use ephemeral/isolated build runners (a compromised pipeline is a top target).
- **Vendoring / trusted registries** — pull from controlled mirrors; verify sources.

## Design Guidance

- **Generate and keep SBOMs** — know exactly what's in every release (rapid CVE response).
- **Pin exact versions + verify hashes** (lockfiles) — reproducible, tamper-evident dependencies.
- **Sign artifacts and verify signatures** at deploy — reject unsigned/tampered images.
- **Produce build provenance** (SLSA/attestations) and verify it.
- **Scan dependencies continuously** for CVEs; automate updates (with review).
- **Harden CI/CD** — least-privilege, isolated runners, protect signing keys (a compromised pipeline defeats everything).
- **Guard against dependency confusion** — namespace/scope internal packages; prefer trusted registries.
- **Review new/updated dependencies** — especially transitive ones and maintainer changes.

## Pitfalls (in understanding/using)

- **No SBOM** → when a critical CVE drops, you can't quickly tell if you're affected.
- **Unpinned dependencies** (floating versions) → a compromised update silently ships; pin + hash.
- **Trusting artifacts without signatures/provenance** → tampered builds slip through.
- Ignoring the **build pipeline** as an attack surface → source is clean but the artifact is backdoored.
- **Typo-squatting / dependency confusion** — pulling a malicious lookalike or shadowing package.
- Treating a **passing build** as trustworthy → integrity ≠ correctness; verify provenance.
- Over-privileged **CI/CD credentials / exposed signing keys** → the whole chain of trust collapses.
