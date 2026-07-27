---
name: certificate-transparency-and-pki
description: How the web decides which TLS certificates to trust — Public Key Infrastructure (PKI): root/intermediate CAs, chains of trust, revocation (CRL/OCSP) — and Certificate Transparency (CT), the public append-only logs that catch mis-issued certificates. Use to understand the CA trust model, why a chain validates, revocation's weaknesses, CT logs/SCTs, and how mis-issuance is detected.
category: security
keywords_vi: hạ tầng khoá công khai pki chuỗi tin cậy chứng chỉ tls, ca gốc và ca trung gian ký chứng chỉ, thu hồi chứng chỉ crl và ocsp và điểm yếu, minh bạch chứng chỉ certificate transparency log chỉ thêm, phát hiện chứng chỉ cấp sai mis-issuance, sct bằng chứng đã ghi log gắn vào chứng chỉ
---

# Certificate Transparency & PKI

When your browser connects to `https://bank.com`, how does it know the certificate really belongs to the bank and not an attacker? The answer is **Public Key Infrastructure (PKI)** — a hierarchy of **Certificate Authorities (CAs)** the browser trusts — plus **Certificate Transparency (CT)**, a public auditing system that catches CAs when they issue certificates they shouldn't (see how-https-tls-works, how-digital-signatures-work, forward-secrecy-and-key-exchange).

## The Chain of Trust

Trust is anchored in a small set of **root CA** certificates baked into your OS/browser **trust store**. Roots are kept offline and sign **intermediate CAs**, which sign the **leaf** (server) certificates. Validation walks the **chain**:
1. The server presents its leaf cert + intermediates.
2. Each cert's signature is verified by its issuer's public key, up to a trusted **root**.
3. The client checks the leaf's **domain** (SAN) matches, the **validity dates**, key usage, and that nothing is revoked.

If every link verifies up to a trusted root and the name matches, the cert is trusted. Any CA can technically issue a cert for **any** domain — which is the model's great weakness: **one compromised or rogue CA can mint a valid cert for your site**.

## Revocation (and why it's weak)

If a private key leaks or a cert is mis-issued, it must be **revoked** before expiry:
- **CRL** — certificate revocation lists (big, slow to propagate).
- **OCSP** — an online status check per cert; adds latency and a privacy leak, and browsers often **soft-fail** (treat "no answer" as "OK"), so an attacker who blocks OCSP defeats it.
- **OCSP stapling** — the server attaches a fresh signed status, fixing latency/privacy; **must-staple** hardens it.
Revocation's unreliability is exactly why **short-lived certificates** (e.g. 90-day, and shorter) have become the real defense — a leaked cert simply expires soon.

## Certificate Transparency (CT)

PKI's "any CA can issue for any domain" problem is mitigated by **Certificate Transparency**: every issued certificate must be recorded in **public, append-only, cryptographically-verifiable logs** (Merkle-tree based — see merkle-trees-and-anti-entropy). Browsers **require** proof of logging — a **Signed Certificate Timestamp (SCT)** — or they reject the cert. Consequences:
- **Mis-issuance is detectable** — domain owners (and monitors like crt.sh) watch the logs and spot certificates issued for their domains that they never requested → the rogue/compromised CA is caught and can be distrusted.
- The logs are **append-only and auditable**, so a log can't secretly hide or alter entries without detection.

CT turned CA misbehavior from *invisible* into *publicly visible after the fact* — a powerful accountability layer on top of the trust hierarchy.

## Design Guidance (for understanding/using)

- **Monitor CT logs for your domains** (crt.sh, log monitors) to catch unauthorized certificates early.
- **Use short-lived, auto-renewed certs** (ACME/Let's Encrypt) — resilient to revocation's weakness.
- **Enable OCSP must-staple** where practical; don't rely on browser revocation soft-fail.
- **Serve the full chain** (leaf + intermediates) — missing intermediates cause "untrusted" errors on some clients.
- **Consider CAA records** to restrict which CAs may issue for your domain.

## Pitfalls (in understanding/using)

- Assuming a valid chain means the **right** party — any CA can mis-issue; CT is what catches it.
- Relying on **revocation** to stop a leaked cert → soft-fail/propagation delays make it unreliable; prefer short lifetimes.
- Forgetting to serve **intermediate** certs → clients that don't cache them fail validation.
- Not **monitoring CT** → you won't notice a cert fraudulently issued for your domain.
- Treating an expired-but-unrevoked or self-signed cert as "probably fine" → it isn't; validate the whole chain and names.
