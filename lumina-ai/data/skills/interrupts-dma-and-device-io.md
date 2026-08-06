---
name: interrupts-dma-and-device-io
description: How the CPU talks to devices without wasting cycles waiting — interrupts (the device signals "I'm done") vs polling, and DMA (the device moves data to/from memory without the CPU copying it). Use to understand why polling wastes CPU, interrupt handlers (top/bottom halves), interrupt storms and NAPI, DMA and cache coherence, and why high-throughput I/O switches from interrupts back to polling.
category: systems-internals
keywords_vi: ngắt interrupt thiết bị báo xong thay vì cpu chờ, thăm dò polling lãng phí cpu quay vòng hỏi, dma thiết bị tự chuyển dữ liệu vào ra bộ nhớ không cần cpu sao chép, xử lý ngắt nửa trên nửa dưới top bottom half, bão ngắt interrupt storm và napi chuyển sang polling, i/o thông lượng cao quay lại polling
---

# Interrupts, DMA & Device I/O

The CPU runs at billions of cycles per second; a disk or network packet takes an eternity by comparison. The core question of device I/O is: **how does the CPU coordinate with slow devices without wasting its time?** Two mechanisms answer it — **interrupts** (so the CPU doesn't sit spinning) and **DMA** (so the CPU doesn't do the byte-copying). Together they let a machine handle millions of I/O events while still doing real work (see io-models-and-io-uring, zero-copy-io, context-switching-cost).

## Polling vs Interrupts

- **Polling** — the CPU repeatedly asks the device "are you done yet?". Simple, but if the device is slow, the CPU **burns cycles spinning** on nothing. Wasteful at low I/O rates.
- **Interrupts** — the device **signals the CPU** when it's ready (data arrived, write finished). The CPU goes off doing other work and is **interrupted** only when there's something to handle. It jumps to an **interrupt handler (ISR)**, services the event, and resumes. Efficient when events are **infrequent** relative to CPU speed.

## Interrupt Handling: Top and Bottom Halves

An ISR must be **fast** — while it runs, other interrupts may be blocked, and it's stealing time from whatever was running. So the kernel splits the work:
- **Top half (hard IRQ)** — the minimal, urgent part: acknowledge the device, grab the data reference, schedule the rest. Runs immediately, keeps interrupts off briefly.
- **Bottom half (softirq/tasklet/workqueue)** — the heavier processing (parse the packet, wake the waiting thread) runs **later** in a normal, interruptible context.

This keeps the system responsive under I/O load.

## DMA: Don't Make the CPU Copy

Even with interrupts, if the CPU had to **copy** every byte between a device and memory, it'd be swamped. **Direct Memory Access (DMA)** lets the device's controller **read/write main memory directly**. The CPU just says "transfer these blocks to this buffer", the **DMA engine moves the data** while the CPU does other work, and an **interrupt** fires when the transfer completes. This is the "DMA copy" in zero-copy discussions — hardware moving data with **zero CPU involvement**. Caveat: the CPU's **caches** must stay coherent with DMA'd memory (hardware coherence or explicit cache flush/invalidate on some architectures).

## The Twist: High Throughput Flips Back to Polling

At **very high** I/O rates (10/40/100GbE), interrupts become the problem: an **interrupt storm** — millions of interrupts/sec — spends all the CPU on interrupt overhead and context switches (**receive livelock**). The fix is **hybrid**: Linux **NAPI** switches a busy NIC **from interrupts to polling** — take one interrupt, then **poll** for a batch of packets with interrupts disabled, amortizing overhead. Kernel-bypass frameworks (**DPDK**) go all the way to **pure busy-polling** in user space for line-rate networking. So the "polling vs interrupts" answer is **rate-dependent**: interrupts for low rate, polling for high rate.

## Design Guidance (for understanding/using)

- **Interrupts for infrequent events, polling for high rates** — neither is universally better; it depends on I/O intensity.
- **Expect batching (NAPI/interrupt coalescing)** on fast NICs — it trades a little latency for far less CPU overhead.
- **Lean on DMA** — never assume the CPU copies device data; it's the DMA engine, freeing cores (basis of zero-copy).
- **Keep ISRs tiny** — defer heavy work to bottom halves; long interrupt handlers hurt latency system-wide.
- **For line-rate networking**, consider kernel-bypass (DPDK/XDP) that polls, when interrupt overhead dominates.

## Pitfalls (in understanding/using)

- Assuming **polling** is always wasteful → at high I/O rates it beats interrupt storms.
- Assuming the **CPU copies** device data → DMA does it; the CPU is freed.
- Doing heavy work in the **top half** ISR → blocks other interrupts, hurts latency; defer it.
- Ignoring **cache coherence** with DMA buffers on non-coherent hardware → stale/torn data.
- Forgetting **interrupt coalescing** exists → surprised that low-latency tuning and high-throughput tuning conflict.
