---
name: how-satellite-internet-works
description: How satellite internet works — geostationary (GEO) vs low-earth-orbit (LEO) constellations, why orbit altitude dictates latency, ground stations and inter-satellite links, spot beams, and the weather/capacity trade-offs. Use to understand satellite internet, Starlink/LEO vs traditional GEO, why satellite latency varies, or connectivity in remote areas.
category: engineering
keywords_vi: internet vệ tinh hoạt động thế nào, geo vs leo quỹ đạo thấp, độ trễ latency theo độ cao, trạm mặt đất ground station, inter-satellite link, starlink, spot beam, kết nối vùng xa
---

# How Satellite Internet Works

Satellite internet delivers connectivity via radio links to satellites in orbit, reaching places terrestrial cables and cell towers can't (oceans, mountains, rural areas). The single most important variable is **orbit altitude**, which dictates latency, coverage, and the whole system design.

## The Basic Path

Your **dish** (terminal) sends/receives radio signals to a **satellite**, which relays to a **ground station** (gateway) connected to the internet backbone (see how-internet-routing-works) — and back. The round trip goes: dish → satellite → ground station → internet → and all the way back. The distance those signals travel is what sets latency.

## GEO vs LEO (the key distinction)

- **Geostationary (GEO)** — satellites ~36,000 km up, orbiting at the same rate Earth spins, so each appears **fixed** in the sky (your dish points once and never moves). A few satellites cover the whole planet. **But**: the signal travels ~72,000+ km round trip → **~600 ms latency** minimum (light speed is the hard limit). Fine for TV/downloads, painful for video calls, gaming, and interactive use.
- **Low-Earth-Orbit (LEO)** — satellites ~500–1,200 km up (Starlink, OneWeb). Far closer → **~20–50 ms latency**, comparable to terrestrial. But each satellite covers a small area and **races across the sky** (not fixed), so you need a **constellation of hundreds/thousands** and a terminal that **tracks/hands off** between satellites continuously (like cellular handoff, see how-cellular-networks-work). This is the modern approach to low-latency satellite internet.

The trade: GEO = few satellites, simple, high latency; LEO = many satellites, complex, low latency.

## Spot Beams & Capacity

Modern satellites focus **spot beams** — narrow beams covering small regions — instead of one wide beam. This lets the same frequencies be **reused** across different beams (like cellular frequency reuse), multiplying capacity. Capacity is still **shared** among users in a beam, so dense areas can congest.

## Inter-Satellite Links

Advanced LEO constellations add **inter-satellite laser links** — satellites relay data to each other in space, so a packet can cross the globe through the constellation without hitting a ground station at every hop. This extends coverage over oceans/remote areas (no nearby gateway needed) and can even beat fiber over long distances (light is faster in vacuum than in glass).

## Trade-offs

- **Weather** — rain/snow (rain fade) attenuates the higher-frequency bands; heavy weather degrades the link.
- **Line of sight** — the dish needs a clear view of the sky (obstructions block it).
- **Latency vs coverage** — GEO covers wide with high latency; LEO gives low latency but needs a massive constellation and continuous tracking.

## Pitfalls (in understanding/using)

- Blaming the provider for **latency** that's really **physics** (GEO's altitude makes ~600 ms unavoidable — no fix without lower orbits).
- Expecting fiber-like consistency — weather (rain fade) and obstructions affect satellite links.
- Assuming unlimited capacity — bandwidth is **shared** per beam; congestion happens.
- Confusing GEO (fixed dish, high latency) with LEO (tracking, low latency) — very different experiences.
- Overlooking that LEO needs clear sky and continuous satellite handoff; obstructions cause dropouts.
- Treating satellite as private — encrypt end-to-end (HTTPS/VPN) as with any network.
