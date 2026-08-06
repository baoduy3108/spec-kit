---
name: how-container-runtimes-work
description: How container runtimes work at the low level — Linux namespaces for isolation, cgroups for resource limits, layered filesystems (union/overlay), and how a "container" is just an isolated process, not a VM. Use to understand what a container really is, namespaces/cgroups, how Docker isolates processes, container internals, or building a container runtime.
category: engineering
keywords_vi: container runtime, namespaces, cgroups, overlay filesystem, tiến trình cô lập, linux namespaces cô lập, layered filesystem, container không phải vm
---

# How Container Runtimes Work

A container feels like a lightweight VM, but under the hood it's **just a normal Linux process** given the **illusion of its own isolated system** using kernel features. Understanding the three pillars — **namespaces**, **cgroups**, and **layered filesystems** — demystifies containers and the VM-vs-container distinction (see how-docker-containers-work, how-virtualization-works).

## The Big Idea: An Isolated Process, Not a VM

Unlike a VM (which runs a full guest OS with its own kernel — see how-virtualization-works), a container is a process (or group) running on the **host's kernel**, but **restricted and isolated** so it can't see or affect the rest of the system. No guest OS, no hypervisor — just kernel features fencing off a process. That's why containers are so lightweight (MBs, instant start) — they're processes with fences, not virtual machines.

## Pillar 1: Namespaces (isolation — "what it can see")

**Linux namespaces** give a process its own **isolated view** of a system resource, so it thinks it has the whole thing:
- **PID namespace** — its own process-ID space (the container sees its main process as PID 1, can't see host processes).
- **Network namespace** — its own network interfaces, IP, ports (see how-nat-works, kubernetes-networking).
- **Mount namespace** — its own filesystem view.
- **UTS** — its own hostname.
- **User** — its own user/group ID mapping (a container root ≠ host root, with user namespaces).
- **IPC** — isolated inter-process communication.
Namespaces are what make a container feel like a separate machine — it **can't see** the host or other containers because they're in different namespaces.

## Pillar 2: cgroups (resource limits — "what it can use")

**Control groups (cgroups)** limit and account for a process's **resource usage** — CPU, memory, disk I/O, network. This lets you cap a container ("max 512MB RAM, 1 CPU") so one container can't starve others or the host. Namespaces isolate *visibility*; cgroups limit *consumption*. Together they contain a process.

## Pillar 3: Layered Filesystem (the image)

A container's filesystem comes from an **image** built as **read-only layers** stacked with a **union/overlay filesystem** (OverlayFS). Each Dockerfile instruction adds a layer (see container-image-optimization); layers are **shared** between images/containers (deduplication — many containers share the same base layers). The container gets a thin **writable layer** on top for its runtime changes (copy-on-write). This layering is why images are efficient to store/ship and containers start instantly (no copying the whole filesystem).

## Putting It Together

To "run a container," a runtime (runc, containerd, Docker) does roughly: create the namespaces, set up cgroup limits, mount the layered filesystem as the root, and start the process inside all of that. The process runs isolated, limited, and with its own filesystem — a container. The **kernel** does the real work; the runtime orchestrates the kernel features.

## Pitfalls (in understanding/using)

- Thinking a container is a **VM** — it shares the host **kernel** (no guest OS); isolation is weaker than a VM's (a kernel exploit can escape — see how-virtualization-works for when to use VMs).
- Assuming **strong security isolation** by default — containers share the kernel; harden them (user namespaces, seccomp, non-root — see security-and-hardening) for untrusted workloads.
- Ignoring **cgroup limits** → one container can exhaust host resources (noisy neighbor).
- Running as **root** in the container mapping to host root (without user namespaces) → escalation risk.
- Not understanding **layers** → bloated images, cache misses (see container-image-optimization).
- Expecting a container to run a **different kernel/OS** than the host (it can't — same kernel; that's a VM's job).
- Persisting important data in the **writable layer** (ephemeral) instead of a volume.
