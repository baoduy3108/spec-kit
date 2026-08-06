---
name: kubernetes-networking
description: How Kubernetes networking works — the flat pod network and pod IPs, Services (ClusterIP/NodePort/LoadBalancer) for stable access and load balancing, DNS-based service discovery, Ingress for HTTP routing, and network policies. Use to understand Kubernetes Services, how pods communicate, Ingress, kube-dns, or exposing an app in Kubernetes.
category: engineering
keywords_vi: kubernetes networking, mạng k8s, service clusterip, ingress, pod ip mạng phẳng, nodeport loadbalancer, dns service discovery, network policy
---

# Kubernetes Networking

Kubernetes networking lets containers (pods) find and talk to each other and to the outside world, despite pods constantly being created, destroyed, and rescheduled with changing IPs. Understanding the model demystifies Services, Ingress, and "how does my app get traffic." (See kubernetes-basics for the broader platform.)

## The Flat Pod Network

Kubernetes requires that **every pod gets its own IP** and that **all pods can reach all other pods directly**, across nodes, without NAT (implemented by a CNI plugin — Calico, Cilium, etc.). So from a pod's view, the cluster is one **flat network** — no port-mapping gymnastics between containers. Simple mental model: each pod is like a little VM with its own IP.

## The Problem: Pods Are Ephemeral

Pod IPs are **not stable** — pods die and get replaced (new IP) constantly (scaling, updates, crashes). So you can't hardcode a pod's IP to reach a service. **Services** solve this.

## Services (stable access + load balancing)

A **Service** is a stable virtual endpoint (a stable **ClusterIP** and DNS name) that fronts a **set of pods** (selected by labels) and **load-balances** across them. Pods behind it can come and go; the Service IP stays constant and routes to whatever healthy pods currently match. Types:
- **ClusterIP** (default) — reachable only **inside** the cluster. For internal service-to-service.
- **NodePort** — exposes the Service on a port on every node's IP. Basic external access.
- **LoadBalancer** — provisions a cloud load balancer with an external IP pointing at the Service. The usual way to expose a service externally on a cloud.

## Service Discovery via DNS

Kubernetes runs cluster **DNS** (CoreDNS): every Service gets a DNS name (`my-service.my-namespace.svc.cluster.local`). Pods find services by **name**, not IP — `http://order-service` just works, resolving to the Service's stable ClusterIP, which load-balances to pods (see how-dns-works). This is how microservices in a cluster address each other robustly.

## Ingress (HTTP routing at the edge)

Exposing every service via its own LoadBalancer is expensive and crude. **Ingress** is an HTTP(S) router: a single entry point that routes external requests to internal Services based on **host/path** (`api.example.com/orders` → order Service), with TLS termination. An **Ingress controller** (nginx, Traefik) implements it. It's the Kubernetes-native API gateway for HTTP (see api-gateway-patterns, how-proxies-work).

## Network Policies (segmentation)

By default, all pods can talk to all pods (flat network) — not always desirable. **Network Policies** restrict which pods can communicate (a firewall for pod traffic — see how-firewalls-work), e.g. "only the API pods may reach the database pods." Essential for zero-trust segmentation (see threat-modeling).

## Pitfalls (in understanding/using)

- **Hardcoding pod IPs** — they change constantly; always go through a **Service** (DNS name).
- Giving **every service its own LoadBalancer** (costly) instead of using **Ingress** for HTTP routing.
- Assuming pods are **isolated** by default — they're not; add **Network Policies** for segmentation.
- Confusing Service types (ClusterIP internal vs LoadBalancer external) → services unreachable or wrongly exposed.
- Forgetting **readiness probes** — Services route to pods marked ready; misconfigured probes send traffic to unready pods.
- DNS/service-discovery issues from wrong namespace-qualified names.
- Exposing internal services externally by accident (security).
