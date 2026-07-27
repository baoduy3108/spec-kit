---
name: forward-secrecy-and-key-exchange
description: How two parties agree on a shared secret over a public channel (Diffie-Hellman / ECDH) and why using EPHEMERAL keys gives forward secrecy — so stealing a long-term private key later can't decrypt past traffic. Use to understand DH/ECDH key exchange, ephemeral vs static keys, perfect forward secrecy (PFS), why TLS 1.3 mandates it, and the "harvest now, decrypt later" threat.
category: security
keywords_vi: trao đổi khoá diffie-hellman ecdh trên kênh công khai, bí mật chuyển tiếp forward secrecy khoá tạm ephemeral, lộ khoá riêng dài hạn không giải mã được lưu lượng cũ, pfs perfect forward secrecy tls 1.3 bắt buộc, khoá tạm mỗi phiên rồi vứt bỏ, thu thập giờ giải mã sau harvest now decrypt later
---

# Forward Secrecy & Key Exchange

Two parties who have never met need a **shared secret** to encrypt a conversation — but they can only talk over a **public** channel an attacker is watching. **Diffie-Hellman (DH)** and its elliptic-curve version **ECDH** solve this: each side sends a public value, and combining your private value with the other's public value yields the **same** shared secret — which an eavesdropper watching both public values **cannot** compute. The deeper question is *what happens if a private key is stolen later*, and the answer is **forward secrecy** (see how-public-key-crypto-works, how-https-tls-works, key-derivation-functions).

## Key Exchange (DH / ECDH) in one paragraph

Public parameters aside: Alice has private `a`, sends public `A = g^a`; Bob has private `b`, sends public `B = g^b`. Alice computes `B^a = g^(ab)`; Bob computes `A^b = g^(ab)`. Both get the same secret `g^(ab)`; an eavesdropper sees only `A` and `B` and can't derive `g^(ab)` (the discrete-log problem). The raw shared secret is then run through a **KDF (HKDF)** to get actual session keys — you never use `g^(ab)` directly.

## Ephemeral Keys = Forward Secrecy

The critical design choice is whether the DH keys are **static** (long-lived) or **ephemeral** (freshly generated per session, then discarded):
- **Static keys** — if the attacker records encrypted traffic today and **steals the long-term private key next year**, they can retroactively derive the session key and **decrypt everything** they recorded.
- **Ephemeral keys (DHE/ECDHE)** — each session uses a **brand-new** DH keypair that is **thrown away** after the handshake. There's no long-term secret that unlocks past sessions. Compromising a party's long-term signing key later lets an attacker impersonate them *going forward*, but **cannot decrypt past recorded traffic**.

This property — *past sessions stay secret even if long-term keys are later compromised* — is **(Perfect) Forward Secrecy (PFS)**. The long-term key is used only to **authenticate** the ephemeral exchange (sign it), not to derive the session secret.

## Why It Matters Now

- **TLS 1.3 mandates** ephemeral (EC)DHE — non-forward-secret key exchange (old RSA key transport) was removed precisely because a stolen server key could decrypt archived traffic.
- **"Harvest now, decrypt later"** — adversaries record encrypted traffic today hoping to decrypt it once keys leak or quantum computers arrive. Forward secrecy defeats the "keys leak" version; post-quantum key exchange addresses the quantum version (see cryptographic-agility-and-algorithm-migration).

## Design Guidance (for understanding/using)

- **Always use ephemeral key exchange (ECDHE)** — insist on forward secrecy; it's the default in modern TLS, keep it.
- **Discard ephemeral private keys** promptly after the handshake — retaining them silently kills forward secrecy.
- **Long-term keys authenticate, ephemeral keys establish secrets** — keep those roles separate.
- **Run the DH output through HKDF** — never use the raw shared secret as a key.
- **Plan for post-quantum** — hybrid ECDHE + PQ key exchange for long-lived confidentiality.

## Pitfalls (in understanding/using)

- Using **static** DH/RSA key transport → one stolen key decrypts all past recorded sessions.
- **Caching/reusing** ephemeral keys across sessions → you lose the forward secrecy you thought you had.
- Thinking forward secrecy protects **future** sessions after key theft → it protects **past** ones; a stolen auth key still enables future impersonation.
- Using the raw DH secret directly → derive session keys via HKDF instead.
- Assuming TLS = forward-secret automatically → true in 1.3, but misconfigured old suites may not be.
