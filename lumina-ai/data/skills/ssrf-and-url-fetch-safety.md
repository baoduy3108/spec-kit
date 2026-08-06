---
name: ssrf-and-url-fetch-safety
description: Why letting your server fetch a user-supplied URL is dangerous — Server-Side Request Forgery (SSRF) — where an attacker makes your server request internal services, cloud metadata endpoints, or the loopback interface. Covers the cloud-metadata (169.254.169.254) attack, why blocklists fail (DNS rebinding, redirects, encodings), and the allowlist + network-egress defense. Use to safely implement webhooks, link previews, image proxies, and imports.
category: security
keywords_vi: giả mạo yêu cầu phía máy chủ ssrf server tự gọi url do người dùng nhập, tấn công endpoint metadata đám mây 169.254.169.254 lấy khoá iam, gọi tới dịch vụ nội bộ và loopback localhost, blocklist thất bại vì dns rebinding redirect và mã hoá, phòng thủ bằng allowlist và chặn egress mạng, webhook link preview image proxy nhập url an toàn
---

# SSRF & URL-Fetch Safety

The moment your server **fetches a URL that a user controls** — a webhook target, a link-preview generator, an "import from URL", an image proxy, a PDF-from-URL feature — you risk **Server-Side Request Forgery (SSRF)**. The attacker doesn't want *their* server hit; they supply a URL pointing **inward**, and your server — which sits *inside* your trusted network and often has cloud credentials — makes the request on their behalf. SSRF is a top-tier vulnerability (it enabled the Capital One breach) precisely because your server can reach things the attacker can't (see how-cors-works, ssrf's cousin csrf-and-same-site-defenses, how-nat-works).

## Why It's So Dangerous: The Metadata Endpoint

Cloud VMs expose an **instance metadata service** at a fixed link-local IP: **`169.254.169.254`**. Querying it returns instance info — and, critically, **temporary IAM credentials** for the VM's role. An SSRF that fetches `http://169.254.169.254/latest/meta-data/iam/security-credentials/...` hands the attacker **your cloud keys**. Beyond metadata, SSRF lets them reach:
- **Internal services** — admin panels, databases, `redis://`/`gopher://` on private IPs never meant to be internet-facing.
- **Loopback** — `127.0.0.1`/`localhost` services bound "safely" to the local machine.
- **Port scan** the internal network via timing/error differences.

## Why Naive Blocklists Fail

"Just block `127.0.0.1` and `169.254.*`" is **not enough** — attackers bypass string checks many ways:
- **Alternate encodings** of IPs (decimal `2130706433`, octal, hex, IPv6 `[::1]`, `0.0.0.0`).
- **DNS rebinding** — the hostname resolves to a public IP when you validate, then to `127.0.0.1` when you actually connect (TOCTOU).
- **Redirects** — the allowed URL 302-redirects to an internal one; if you follow redirects, you're SSRF'd.
- **`@` tricks / weird parsers** — `http://expected.com@169.254.169.254/`.
Blocklists on the *string* lose this game.

## The Real Defenses

- **Allowlist, don't blocklist** — permit only specific known hosts/domains where possible; deny by default.
- **Resolve then validate then pin** — resolve the hostname, check the **resolved IP** is public (reject private/link-local/loopback ranges), and connect to *that IP* (defeats DNS rebinding). Re-validate on **every redirect hop**, or disable redirects.
- **Network-layer egress control** — the strongest fix: put the fetcher in a segment that **cannot reach** the metadata IP, internal ranges, or loopback (firewall/egress rules, a locked-down proxy). Block `169.254.169.254` at the network. Use IMDSv2 (session-token metadata) which resists simple SSRF.
- **Restrict schemes/ports** — allow only `http`/`https` on `80`/`443`; block `file://`, `gopher://`, `dict://`, etc.
- **No secrets in reach** — don't run the fetcher with ambient cloud credentials.

## Design Guidance (for understanding/using)

- **Treat every user-supplied URL fetch as SSRF-exposed** — webhooks, previews, imports, proxies.
- **Prefer an allowlist**; if you must allow arbitrary hosts, **validate the resolved IP** and connect to it, re-checking redirects.
- **Block the metadata IP and private ranges at the network** — belt-and-suspenders beyond app checks; enable IMDSv2.
- **Limit schemes/ports** and **disable or re-validate redirects**.
- **Isolate the fetcher** from internal services and credentials.

## Pitfalls (in understanding/using)

- **String blocklists** for `localhost`/`127.0.0.1` → bypassed by encodings, IPv6, DNS rebinding, redirects.
- Validating the **hostname** but connecting via a **fresh DNS lookup** → DNS-rebinding TOCTOU; resolve-and-pin instead.
- **Following redirects** without re-validating each hop → allowed URL bounces to an internal one.
- Running the fetcher with **cloud credentials** reachable via metadata → SSRF → full account compromise.
- Allowing exotic **schemes** (`file`, `gopher`) → local file read / protocol smuggling.
