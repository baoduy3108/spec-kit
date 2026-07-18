---
name: how-wifi-works
description: How Wi-Fi works — radio waves and frequency bands (2.4/5/6 GHz), channels and interference, how devices share the air (CSMA/CA), association and SSIDs, why range and speed trade off, and Wi-Fi security (WPA). Use to understand Wi-Fi, wireless networking, why Wi-Fi is slow/congested, channels/bands, or WPA security.
category: engineering
keywords_vi: wifi hoạt động thế nào, mạng không dây, sóng radio băng tần, 2.4 5 ghz kênh channel, nhiễu interference, csma ca chia sẻ sóng, ssid, bảo mật wpa
---

# How Wi-Fi Works

Wi-Fi carries network data over radio waves, letting devices connect without cables. Its behavior — variable speed, congestion, range limits — all follows from the physics of sharing a **broadcast radio medium** that everyone nearby hears.

## Radio Waves & Frequency Bands

Wi-Fi transmits by modulating **radio waves** in unlicensed bands:
- **2.4 GHz** — longer range, penetrates walls better, but **crowded** (shared with Bluetooth, microwaves, old devices) and slower — fewer non-overlapping channels.
- **5 GHz** — more bandwidth/speed, more channels, less crowded, but **shorter range** and worse wall penetration.
- **6 GHz** (Wi-Fi 6E/7) — even more clean spectrum, similar range trade-offs.
This is the fundamental trade-off: **lower frequency = better range, higher frequency = more speed but less reach**. Routers often broadcast multiple bands.

## Channels & Interference

Each band is divided into **channels**. Neighboring networks on the **same or overlapping channels** interfere — they must share airtime, slowing everyone. On 2.4 GHz, only a few channels (1, 6, 11) don't overlap. In dense areas (apartments), congestion — not your internet plan — is often the real bottleneck. Picking a clear channel helps.

## Sharing the Air: CSMA/CA

Radio is a **shared medium** — only one device can transmit at a time on a channel, or signals collide. Wi-Fi uses **CSMA/CA** (Carrier Sense Multiple Access with Collision Avoidance): a device **listens** first, and if the channel is busy, **waits** a random backoff before trying. Unlike wired Ethernet, it can't detect collisions while transmitting (it can't hear over its own signal), so it *avoids* them and uses acknowledgments to confirm receipt. Consequence: the more devices and traffic, the more everyone waits — Wi-Fi throughput **degrades with congestion** and is **shared**, not per-device.

## Association

To join, a device scans for **SSIDs** (network names, broadcast in beacon frames), then **associates** with an access point and authenticates. Signal strength (RSSI) and negotiated data rate depend on distance/obstacles — as you move away, the AP drops to slower, more robust modulation (more range, less speed). Multiple APs (mesh/roaming) hand devices off for coverage.

## Security

Because anyone in range receives your radio signals, **encryption is essential**:
- **WPA2/WPA3** — encrypt traffic over the air so eavesdroppers get ciphertext (WPA3 is current, stronger against offline password guessing). **WEP** and open networks are insecure — avoid.
- Even encrypted, treat public Wi-Fi cautiously (use HTTPS/VPN — see how-vpns-work, how-https-tls-works).

## Pitfalls (in understanding/using)

- Blaming your ISP for slowness that's really **Wi-Fi congestion/interference** (channel/band choice, neighbors, distance).
- Expecting the rated speed (a shared, theoretical max) as real per-device throughput.
- Using **2.4 GHz** for speed (crowded/slow) vs **5/6 GHz**, or 5 GHz where you need range through walls — pick per situation.
- Assuming more bars = fast — a strong but congested channel can be slow.
- Running **open/WEP** networks (insecure) — use WPA2/WPA3.
- Cramming many APs on the same channel (self-interference) instead of spreading them out.
