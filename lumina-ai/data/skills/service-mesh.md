---
name: service-mesh
description: How a service mesh works — sidecar proxies handling service-to-service networking (mTLS, retries, load balancing, observability) transparently, the data plane vs control plane, and when the complexity is worth it. Use to understand service meshes (Istio/Linkerd), sidecar proxies, mTLS between services, or managing microservice networking.
category: engineering
keywords_vi: service mesh, lưới dịch vụ, sidecar proxy, giao tiếp service to service, mtls retry load balancing tự động, data plane control plane, istio linkerd, quan sát microservice
---

# Service Mesh

A service mesh is an infrastructure layer that handles **service-to-service communication** for microservices — encryption, retries, load balancing, and observability — **transparently**, without changing application code. It moves networking concerns out of your services and into the platform.

## The Problem It Solves

In a microservices system, every service calls other services, and each needs the same cross-cutting networking concerns: **secure connections (mTLS), retries, timeouts, load balancing, circuit breaking, and telemetry** (see retries-and-resilience). Implementing these in **every service, in every language**, is repetitive, inconsistent, and error-prone. A service mesh provides them **uniformly** at the infrastructure level.

## How It Works: Sidecars

The mesh injects a **sidecar proxy** (e.g. Envoy) alongside each service instance — a separate container in the same pod. **All** of the service's inbound and outbound traffic is transparently routed through its sidecar. The proxies handle the networking; your app just makes normal calls to `localhost`/the service name, unaware. Because the logic lives in the proxy, you get consistent behavior across all services regardless of language, with no app code changes.

## Data Plane vs Control Plane

- **Data plane** — the mesh of **sidecar proxies** that actually carry and manage the traffic (route, encrypt, retry, measure).
- **Control plane** — the central management layer (Istio's istiod, Linkerd's control plane) that **configures** all the proxies: you set policies (routing rules, mTLS, retry limits) centrally, and it pushes them to the data plane.
You declare intent in the control plane; the proxies enforce it.

## What You Get

- **Automatic mTLS** — encrypted, authenticated service-to-service traffic (zero-trust networking) without app changes — a big security win (see threat-modeling).
- **Traffic management** — fine-grained routing, canary/blue-green traffic splitting (see deployment-strategies), retries, timeouts, circuit breaking — configured centrally.
- **Observability** — uniform metrics, logs, and **distributed tracing** (see distributed-tracing) for all inter-service calls, "for free."
- **Policy** — access control, rate limiting between services.

## Is It Worth the Complexity?

A service mesh adds **significant operational complexity** (running the control plane, a proxy per pod, latency/resource overhead, a steep learning curve). It pays off for **large microservice deployments** where consistent security/observability/traffic-management across many services is genuinely hard. For a handful of services, it's usually **overkill** — libraries or a simpler API gateway (see api-gateway-patterns) suffice. Lighter meshes (Linkerd) reduce the cost. Adopt when the pain it solves is real.

## Pitfalls (in understanding/using)

- **Adopting it too early** — for a few services, the complexity/overhead outweighs the benefit; don't cargo-cult it.
- Underestimating **operational cost** — running and upgrading the mesh, debugging proxy issues, resource/latency overhead per sidecar.
- Expecting it to fix **application** problems — it handles networking, not your service logic/bugs.
- Blindly trusting **automatic mTLS** as total security — it secures transport, not authorization or app-level flaws.
- Debugging complexity — an extra network hop (the proxy) complicates troubleshooting.
- Confusing it with an **API gateway** — the mesh is east-west (service-to-service, internal); the gateway is north-south (client-to-system, edge).
