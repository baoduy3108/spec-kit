---
name: how-ssh-works
description: How SSH works — securing a remote shell over an untrusted network, the key exchange establishing an encrypted channel, host key verification (TOFU), password vs public-key authentication, and features like tunneling/port forwarding and agents. Use to understand SSH, SSH keys, host key warnings, SSH tunneling, or secure remote access.
category: engineering
keywords_vi: ssh hoạt động thế nào, shell từ xa an toàn, key exchange kênh mã hóa, host key verification tofu, xác thực khóa công khai vs mật khẩu, ssh tunnel port forwarding, ssh agent
---

# How SSH Works

SSH (Secure Shell) gives you an encrypted, authenticated connection to a remote machine over an untrusted network — the standard way to log into servers, run commands, and move data securely. It replaced telnet/rlogin, which sent everything (including passwords) in plaintext.

## Establishing the Secure Channel

When you connect, SSH first sets up encryption **before** any authentication:
1. Client and server negotiate algorithms and perform a **key exchange** (Diffie-Hellman) — over the open network, they derive a **shared session key** that an eavesdropper can't compute (see how-public-key-crypto-works). All further traffic is encrypted with this symmetric key.
2. This means your password/keystrokes are protected even on a hostile network — that's the whole point.

## Host Key Verification (trust on first use)

How do you know you connected to the *real* server and not an impostor (MITM)? Each server has a **host key** (its own public/private key pair). On first connection, SSH shows the host key's fingerprint and asks you to accept it ("The authenticity of host ... can't be established"). It's then **remembered** in `known_hosts`. On later connections, SSH checks the host key **matches** — if it suddenly changes, SSH loudly warns (possible MITM, or the server was rebuilt). This **trust-on-first-use (TOFU)** model puts responsibility on you to verify that first fingerprint out-of-band for sensitive systems.

## Authenticating You: Password vs Public Key

After the channel is secure, SSH authenticates the **user**:
- **Password** — simple but weak (guessable, phishable, brute-forceable).
- **Public-key** (strongly preferred) — you generate a key pair; put the **public** key in the server's `authorized_keys`, keep the **private** key secret. To log in, you prove you hold the private key (a signature the server verifies with your public key — see how-digital-signatures-work) without sending any secret. Passwordless, far more secure, and scriptable. Protect the private key with a passphrase.

## Handy Features

- **SSH agent** — holds your decrypted private key in memory so you don't retype the passphrase each time (agent forwarding lets you hop through hosts — use cautiously).
- **Port forwarding / tunneling** — carry other traffic *inside* the SSH connection: **local forwarding** (reach a remote service as if local), **remote forwarding**, and **SOCKS proxy** (dynamic) — a quick encrypted tunnel through a server (a lightweight VPN-like capability; see how-vpns-work).
- **scp/sftp** — file transfer over the same secure channel.

## Pitfalls (in understanding/using)

- **Ignoring host-key-changed warnings** — that's exactly the MITM alert; investigate, don't blindly accept.
- Using **passwords** where keys are available — enable key auth and disable password login on servers.
- Leaking or unprotected **private keys** (no passphrase, world-readable) — anyone with the key is you (see secrets-management).
- Exposing SSH (port 22) to the whole internet with password auth → brute-force target; restrict by firewall/keys, consider fail2ban.
- Careless **agent forwarding** to untrusted hosts (they can use your agent).
- Assuming SSH secures the *server* — it secures the *connection*; the server still needs hardening.
