---
name: webauthn-and-passkeys
description: How passwordless authentication with WebAuthn and passkeys works — public-key credentials replacing passwords, the registration/authentication ceremonies, platform vs roaming authenticators, phishing resistance, and passkey syncing. Use to understand passkeys, WebAuthn, FIDO2, passwordless login, or why passkeys resist phishing.
category: engineering
keywords_vi: webauthn passkey, đăng nhập không mật khẩu passwordless, khóa công khai thay mật khẩu, fido2, registration authentication ceremony, chống phishing, platform roaming authenticator
---

# WebAuthn & Passkeys

WebAuthn (with FIDO2) enables **passwordless authentication** using public-key cryptography instead of shared secrets. **Passkeys** are the user-friendly form of this. They're phishing-resistant and eliminate password databases — the biggest auth upgrade in years (see how-public-key-crypto-works, authentication-and-authorization).

## The Core Idea: No Shared Secret

Passwords are a **shared secret** — the server stores (a hash of) it, and it can be phished, leaked, reused, or guessed (see how-cryptographic-hashing-works, owasp-top-10). WebAuthn replaces this with a **key pair**:
- The user's device (an **authenticator**) holds a **private key**, which never leaves it.
- The server stores only the **public key**.
- To log in, the device **signs a challenge** with the private key; the server verifies with the public key (see how-digital-signatures-work).
There's **no secret on the server** to steal, and nothing reusable to phish.

## The Two Ceremonies

- **Registration** — the authenticator generates a new key pair **scoped to that specific website (origin)**, keeps the private key, and sends the public key to the server to store against the account.
- **Authentication** — the server sends a random **challenge**; the authenticator signs it (after a **user gesture** — biometric/PIN/touch) and returns the signature; the server verifies it against the stored public key.
User verification (Face ID, fingerprint, PIN) unlocks the authenticator locally — the biometric never leaves the device.

## Why It Resists Phishing (the killer feature)

Each credential is **bound to the exact origin** (domain) it was created for. The authenticator will **only** sign challenges for the **matching** site. So a fake `paypaI.com` phishing page **cannot** get a signature valid for the real `paypal.com` — the browser/authenticator refuses. This structurally defeats phishing, credential stuffing, and replay — attacks passwords can't withstand. There's no secret for a user to be tricked into typing into the wrong site.

## Authenticators & Passkeys

- **Platform authenticators** — built into the device (Touch ID/Face ID/Windows Hello). Convenient.
- **Roaming authenticators** — external security keys (YubiKey) via USB/NFC/Bluetooth. Portable, strong.
- **Passkeys** — WebAuthn credentials that are **discoverable and synced** across a user's devices (via iCloud Keychain, Google Password Manager, etc.), so you don't get locked out if you lose one device, and can log in without typing a username. This syncing solved WebAuthn's biggest UX hurdle and drove mainstream adoption.

## Pitfalls (in understanding/using)

- Treating passkeys as "just another password" — the model is different (no shared secret, origin-bound); design flows around key registration/recovery.
- **Account recovery** — if a user loses all authenticators (and no synced passkey/backup), they're locked out; provide recovery paths (backup passkeys, a fallback method) without reintroducing a phishable weak link.
- Assuming universal support — have a **fallback** for older devices/browsers during the transition.
- Storing/handling the **public key** wrong, or not verifying the origin/challenge server-side (defeats phishing resistance).
- Confusing **user verification** (local biometric/PIN) with server auth — the biometric stays on-device; the server only sees the signature.
- Forgetting passkeys can be **synced** (convenience) vs **device-bound** (higher assurance) — choose per security needs.
