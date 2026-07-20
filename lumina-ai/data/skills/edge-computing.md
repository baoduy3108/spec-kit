---
name: edge-computing
description: How edge computing works — running compute close to users at the network edge (edge functions, CDNs) to cut latency, the trade-offs vs centralized cloud, edge vs origin, use cases (personalization, caching, IoT), and constraints. Use to understand edge computing, edge functions/workers, reducing latency, or CDN compute at the edge.
category: engineering
keywords_vi: edge computing, tính toán tại biên, chạy compute gần người dùng, edge function worker, giảm độ trễ latency, cdn compute, edge vs origin, iot xử lý tại chỗ
---

# Edge Computing

Edge computing runs computation **close to where data is generated or consumed** — at the "edge" of the network, near users or devices — instead of only in a distant centralized data center. The main payoff is **lower latency**; the cost is more distribution to manage.

## The Idea: Bring Compute to the User

A request to a centralized cloud region may travel thousands of kilometers each way — physics (speed of light) puts a floor on latency (see how-cdns-work, how-satellite-internet-works for the same distance-latency reality). **Edge computing** deploys code to many **points of presence** worldwide (or on-premise/on-device), so a user's request is handled at a nearby location. This slashes round-trip time and offloads the origin.

## From Static CDNs to Edge Functions

CDNs already cache **static** content at the edge (see how-cdns-work). Edge computing extends this to **running code** at those edge locations:
- **Edge functions/workers** (Cloudflare Workers, Lambda@Edge, Deno Deploy) — run lightweight serverless code at hundreds of edge POPs, milliseconds from users. Use for request routing, auth checks, A/B testing, personalization, header manipulation, lightweight APIs, and dynamic responses — without a round trip to the origin.
- **Edge caching + compute** — generate/customize responses at the edge and cache them.

## Edge vs Origin

The pattern is a split:
- **Edge** — latency-sensitive, lightweight, geographically-distributed work: routing, auth, caching, personalization, request/response transformation.
- **Origin (centralized)** — heavy compute, the primary database, and anything needing strong global consistency or big resources.
You push to the edge what benefits from proximity and keep at the origin what needs centralization. Data consistency across many edge locations is the hard part (see how-distributed-consensus-works) — edge state is often read-mostly caches or eventually-consistent.

## Use Cases

- **Low-latency web** — personalization, routing, and dynamic content generated near the user.
- **IoT / real-time** — process sensor data locally (a factory, a vehicle) for instant response and to avoid shipping huge raw data to the cloud (bandwidth). Only summaries go up.
- **Media** — transcoding/optimization near viewers.
- **Resilience/offline** — local processing continues even if the central connection drops.

## Constraints

Edge environments are **constrained** compared to a full server: limited CPU/memory/runtime, short execution time, small or no persistent local state, restricted APIs/languages (often a lightweight JS/WASM runtime — see how-webassembly-works). You design edge code to be **small, fast, and mostly stateless**, deferring heavy or stateful work to the origin. Managing code and data across **many** distributed locations also adds operational and consistency complexity.

## Pitfalls (in understanding/using)

- Trying to run **heavy/stateful** workloads at the edge — it's for lightweight, latency-sensitive logic; keep heavy compute/primary data centralized.
- Assuming **strong consistency** across edge locations — edge state is typically cached/eventually consistent; design for it.
- Ignoring the **operational complexity** of deploying and observing code across many POPs.
- Over-distributing — not everything benefits from the edge; use it where **proximity** genuinely helps.
- Hitting edge runtime **limits** (CPU/time/APIs) with code meant for a full server.
- Treating edge functions like a full backend rather than a fast front layer over the origin.
