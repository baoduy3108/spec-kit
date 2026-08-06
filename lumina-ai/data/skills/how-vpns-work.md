---
name: how-vpns-work
description: How a VPN works — an encrypted tunnel between your device and a VPN server that wraps your traffic, hiding it from the local network/ISP and presenting the VPN server's IP to the internet. Covers what a VPN does and doesn't protect, tunneling/encryption, and use cases. Use to understand VPNs, privacy claims, and remote-access networking.
category: engineering
keywords_vi: vpn hoạt động thế nào, mạng riêng ảo, tunnel mã hóa, ẩn ip địa chỉ, vpn có an toàn không, remote access, vượt kiểm duyệt, hiểu vpn
---

# How VPNs Work

A VPN (Virtual Private Network) creates an **encrypted tunnel** between your device and a VPN server. Your traffic goes through that tunnel, so the local network can't read it, and the internet sees the VPN server's address instead of yours.

## The Mechanism

1. Your device authenticates to a **VPN server** and they establish an encrypted tunnel (protocols: WireGuard, OpenVPN, IPsec).
2. Your outgoing packets are **encrypted and wrapped** (encapsulated), sent to the VPN server.
3. The VPN server **decrypts** them and forwards them to the real destination, using **its own IP**.
4. Responses come back to the VPN server and return through the tunnel to you.
Result: to your local network/ISP, all they see is encrypted traffic to the VPN server (not *what* you're doing); to the websites you visit, the request appears to come from the VPN server's IP and location.

## What a VPN Protects

- **Hides your traffic from the local network/ISP** — on public Wi-Fi, the café/airport (and ISP) can't see the contents or destinations. (Though HTTPS already encrypts *contents* — a VPN also hides *which sites* from the local network.)
- **Masks your IP/location** from destination sites — appear to be elsewhere (bypass geo-blocks/censorship, though sites use other signals too).
- **Remote access** — connect securely into a private corporate network as if you were on-site (the original enterprise use).

## What a VPN Does NOT Do

- **It's not anonymity.** Your traffic is now visible to the **VPN provider** instead of your ISP — you've moved trust, not eliminated it. A logging/malicious provider sees everything.
- **Doesn't stop tracking** by cookies, logins, browser fingerprinting, or accounts you sign into.
- **Doesn't make you secure** against malware, phishing, or a compromised site — it only protects the transport.
- **Doesn't hide activity from a site you log into** (you told it who you are).

## Use Cases (and honest limits)

Good for: untrusted networks (public Wi-Fi), accessing a private network remotely, bypassing geo-restrictions/censorship, hiding browsing from the local network/ISP. Not a magic privacy/anonymity tool — for strong anonymity, Tor and careful operational security are different tools with different trade-offs. Choose a trustworthy, no-logs provider, since you're trusting them with everything.

## Pitfalls

- Believing a VPN = anonymity or total security (it isn't).
- Trusting a shady free VPN (they may log/sell your traffic — you moved the risk to them).
- Assuming it protects logged-in activity or stops cookie/fingerprint tracking.
- DNS/WebRTC leaks revealing your real IP despite the VPN (use a leak-tested client).
