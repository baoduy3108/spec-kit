---
name: how-computers-boot
description: How a computer boots — power-on, firmware (BIOS/UEFI) and POST, the bootloader, loading the kernel, initializing hardware and the init system, up to a running OS. Covers the boot chain, secure boot, and why boot order matters. Use to understand the boot process, BIOS/UEFI, bootloaders, or what happens between power button and login.
category: engineering
keywords_vi: máy tính khởi động thế nào, boot process, bios uefi, post, bootloader, nạp kernel, init system, secure boot, chuỗi khởi động
---

# How Computers Boot

Booting is the chain of steps from pressing the power button to a usable operating system. It's a **bootstrapping** problem: the CPU can only run code from memory, but memory is empty at power-on — so each stage loads and hands off to the next, progressively more capable stage.

## 1. Power-On & Firmware (BIOS/UEFI)

When power stabilizes, the CPU starts executing at a fixed address baked into **firmware** — historically **BIOS**, now **UEFI**. This firmware:
- Runs **POST** (Power-On Self-Test) — checks CPU, RAM, and essential hardware.
- Initializes basic hardware and enumerates devices.
- Decides **what to boot from** (boot order: SSD, USB, network) and loads the next stage.
UEFI is the modern replacement: it understands filesystems (loads bootloaders as files from an EFI System Partition), supports large disks (GPT), a pre-OS environment, and **Secure Boot**.

## 2. The Bootloader

The firmware loads a small **bootloader** (GRUB on Linux, Windows Boot Manager, systemd-boot). Its job is to find the OS **kernel**, possibly present a menu (multiple OSes/kernels), load the kernel and an initial RAM disk into memory, pass boot parameters, and jump into the kernel. It exists because firmware shouldn't hardcode how to find and load a specific OS.

## 3. Kernel Initialization

The **kernel** takes over: sets up memory management (virtual memory, see how-virtual-memory-works), initializes device drivers, mounts the root filesystem, and starts the first user-space process. The **initramfs/initrd** (initial RAM filesystem) provides drivers needed to reach the real root disk (e.g. to decrypt an encrypted disk or load a RAID/storage driver) before the true root is mounted.

## 4. Init System & User Space

The kernel launches the **init system** (PID 1 — systemd on most Linux, launchd on macOS). It starts services in dependency order (networking, logging, display manager), mounts remaining filesystems, and brings the system to a usable state — ending at a login prompt or desktop. From here, everything is ordinary processes.

## Secure Boot & Chain of Trust

**Secure Boot** ensures each stage is **cryptographically signed** and verified by the previous one (firmware verifies the bootloader, which verifies the kernel — see how-digital-signatures-work). This prevents boot-level malware (rootkits/bootkits) from silently replacing the bootloader or kernel. It's a chain of trust rooted in keys in the firmware.

## Pitfalls (in understanding/using)

- Confusing **firmware** (BIOS/UEFI, on the motherboard) with the **bootloader** (on disk) — different stages.
- Wrong **boot order** or missing EFI entry → "no bootable device" (a config issue, not always a dead disk).
- Breaking the **initramfs** (missing storage/crypto driver) → kernel can't mount root → boot failure.
- Assuming Secure Boot means the OS is safe — it only protects the **boot chain integrity**, not runtime security.
- Overwriting the bootloader/EFI partition during dual-boot installs (a classic way to "lose" an OS that's still there).
- Forgetting that a corrupt bootloader is recoverable (reinstall it) without losing data.
