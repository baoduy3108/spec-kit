---
name: kubernetes-basics
description: Core Kubernetes concepts and good practices — pods/deployments/services/ingress, config vs secrets, resource requests/limits, liveness/readiness probes, rolling updates, namespaces, and common failure modes (CrashLoopBackOff, ImagePullBackOff, pending pods). Use when writing Kubernetes manifests or debugging why a workload isn't healthy.
category: engineering
keywords_vi: kubernetes, k8s, deployment pod service, manifest kubernetes, crashloopbackoff, probe liveness readiness, ingress, triển khai k8s
---

# Kubernetes Basics

Kubernetes runs containers declaratively: you describe the desired state, the control loop reconciles reality toward it.

## Core Objects

- **Pod** — the smallest unit (one or more co-located containers). You rarely create pods directly.
- **Deployment** — manages a ReplicaSet of identical pods; handles rolling updates and rollbacks. The default for stateless apps.
- **Service** — stable virtual IP/DNS name load-balancing across a set of pods (pods are ephemeral; Services aren't). `ClusterIP` (internal), `NodePort`, `LoadBalancer`.
- **Ingress** — HTTP(S) routing (host/path) into Services, with TLS termination. Needs an ingress controller.
- **ConfigMap / Secret** — externalize config and credentials from the image. Mount as env or files. Secrets are base64, not encrypted at rest by default — enable encryption/secret managers.
- **Namespace** — logical partition for isolation and quotas.
- **StatefulSet / PVC** — for stateful workloads needing stable identity and persistent storage.

## Must-Set on Every Workload

- **Resource requests & limits** — requests drive scheduling; limits cap usage. No requests → poor scheduling; no memory limit → a leak can take down the node (OOM). Set both.
- **Liveness probe** — restart a hung container. **Readiness probe** — hold traffic until the pod can serve (prevents routing to a not-ready pod during startup/rollout). They are different; set both.
- **Rolling update strategy** — `maxSurge`/`maxUnavailable` for zero-downtime deploys; keep replicas ≥ 2 + a PodDisruptionBudget for availability.

## Debugging Common Failures

- **CrashLoopBackOff** — app exits/crashes on start; `kubectl logs <pod> --previous`, check config/secrets and the command.
- **ImagePullBackOff** — wrong image name/tag or missing registry credentials (imagePullSecret).
- **Pending pod** — no node has the requested resources, or an unsatisfiable nodeSelector/taint; `kubectl describe pod` shows the reason.
- **Readiness never true** — the readiness probe path/port is wrong, or the app truly isn't up.

Workflow: `kubectl get pods` → `kubectl describe pod` (events) → `kubectl logs` (and `--previous`). The events section usually names the exact problem.
