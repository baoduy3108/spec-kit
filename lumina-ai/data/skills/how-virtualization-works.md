---
name: how-virtualization-works
description: How virtualization works — hypervisors (type 1 bare-metal vs type 2 hosted), how a VM gets its own virtual CPU/memory/devices, hardware-assisted virtualization, paravirtualization, and how VMs differ from containers. Use to understand virtual machines, hypervisors, VMs vs containers, or cloud compute infrastructure.
category: engineering
keywords_vi: virtualization hoạt động thế nào, ảo hóa, hypervisor, máy ảo vm, type 1 type 2, hardware assisted, vm vs container, ảo hóa phần cứng
---

# How Virtualization Works

Virtualization lets one physical machine run multiple isolated **virtual machines (VMs)**, each thinking it has its own hardware and OS. It's the foundation of cloud computing — how a provider rents slices of a big server to many tenants safely.

## The Hypervisor

The **hypervisor** (Virtual Machine Monitor) is the software that creates and runs VMs, sharing the real hardware among them while keeping them isolated. Two types:
- **Type 1 (bare-metal)** — runs directly on the hardware (ESXi, Hyper-V, KVM, Xen). No host OS underneath; used in data centers/cloud for performance and isolation.
- **Type 2 (hosted)** — runs as an application on a normal OS (VirtualBox, VMware Workstation). Convenient on a desktop; a bit more overhead.

The hypervisor gives each VM a **virtual CPU, virtual memory, and virtual devices** (disk, NIC), and schedules them onto the real ones.

## How Isolation & Sharing Work

- **CPU** — VMs run their instructions **directly on the real CPU** for speed. Privileged/sensitive instructions (that would touch real hardware or other VMs) **trap** into the hypervisor, which emulates the intended effect safely. Modern CPUs have **hardware-assisted virtualization** (Intel VT-x, AMD-V) that makes this trapping efficient — a dedicated guest mode so most code runs at native speed and only truly privileged operations exit to the hypervisor.
- **Memory** — the hypervisor adds a second layer of address translation (nested/extended page tables) so each VM's "physical" memory maps to real machine memory without VMs seeing each other's (see how-virtual-memory-works).
- **Devices** — either **emulated** (the hypervisor pretends to be a disk/NIC — compatible but slower), **paravirtualized** (the guest uses hypervisor-aware drivers like virtio for speed), or **passed through** (direct hardware access for performance).

## VMs vs Containers (a key distinction)

- A **VM** virtualizes the **hardware** and runs a **full guest OS** (its own kernel) → strong isolation, but heavier (GBs, slower to boot).
- A **container** (see how-docker-containers-work) virtualizes the **OS** — processes share the host **kernel**, isolated by namespaces/cgroups → lightweight (MBs, instant start), but weaker isolation and tied to the host kernel.
Rule of thumb: containers for packaging/scaling apps on trusted infrastructure; VMs when you need a different/full OS or stronger isolation (multi-tenant, untrusted workloads). They're often combined (containers running inside VMs in the cloud).

## Why It Matters

- **Cloud/IaaS** — sell isolated compute slices; migrate/snapshot/resize VMs live.
- **Consolidation** — many workloads per physical server (better utilization).
- **Isolation & security** — a strong boundary between tenants/workloads.
- **Dev/test** — reproduce environments, run other OSes.

## Pitfalls (in understanding/using)

- Confusing VMs (own kernel, heavy, strong isolation) with containers (shared kernel, light, weaker isolation).
- Expecting native performance for **emulated** I/O — use paravirtualized (virtio) drivers or passthrough.
- Over-committing CPU/RAM across VMs → contention ("noisy neighbor") and swapping.
- Assuming a VM is perfectly secure — hypervisor escapes are rare but real; keep hypervisors patched.
- Ignoring virtualization overhead for latency-sensitive or hardware-specific workloads.
