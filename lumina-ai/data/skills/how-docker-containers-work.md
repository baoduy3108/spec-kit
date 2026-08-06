---
name: how-docker-containers-work
description: How containers work under the hood — Linux namespaces (isolation of PID/net/mount/user), cgroups (resource limits), the union/overlay filesystem and image layers, and why a container is a process, not a VM. Use to understand container isolation, image layering, and the difference between containers and virtual machines.
category: engineering
keywords_vi: container hoạt động thế nào, cơ chế docker bên trong, namespace cgroup, overlay filesystem image layer, container khác vm, hiểu docker sâu
---

# How Containers Work Internally

A container is **a normal Linux process** that the kernel has isolated and constrained — not a lightweight VM. Three kernel features do the work.

## Namespaces — Isolation

Linux **namespaces** give a process its own private view of a global resource:
- **PID** — the container sees its own process tree (its main process is PID 1).
- **Network** — its own interfaces, IPs, ports, routing table.
- **Mount** — its own filesystem view.
- **UTS** — its own hostname.
- **User** — its own UID/GID mapping (a "root" inside can map to an unprivileged UID outside).
- **IPC** — isolated shared memory/semaphores.
The process still runs on the host kernel — it just can't *see* outside its namespaces. This is why containers start in milliseconds (no OS to boot) but share the host kernel.

## cgroups — Resource Limits

**Control groups** cap and account for what a process (group) can use: CPU shares, memory limit (exceed it → OOM-killed), block I/O, PIDs. This is how `--memory`/`--cpus` and Kubernetes requests/limits are enforced.

## Union Filesystem — Images & Layers

An **image** is a stack of read-only **layers** (each Dockerfile instruction adds one), combined by an **overlay/union filesystem** into a single view. At runtime a thin writable layer is added on top (copy-on-write: modifying a file copies it up). This is why:
- Layers are **cached and shared** across images (the base OS layer is stored once).
- Ordering Dockerfile instructions by change frequency maximizes cache reuse.
- Changes in a container vanish when it's removed unless written to a volume.
- Secrets baked into a layer persist in the image history even if "deleted" later.

## Container vs VM

A **VM** virtualizes hardware and runs a full guest OS with its own kernel (strong isolation, heavy, slow boot). A **container** shares the host kernel and isolates at the process level (light, fast, higher density, weaker isolation boundary). Choose VMs for hard multi-tenant security/kernel isolation; containers for packaging and density. That shared kernel is also why a container can't run a different-kernel OS and why kernel exploits are the main container-escape risk.
