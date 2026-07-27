---
name: bufferbloat-and-active-queue-management
description: Why fast internet links still feel laggy under load — bufferbloat, where oversized router/device buffers hold huge packet queues that inflate latency, and Active Queue Management (AQM) like CoDel/FQ-CoDel/PIE that fixes it by managing queue delay, not just size. Use to understand why a big download spikes your ping, why "more buffer" backfires with TCP, and how AQM and fair queueing restore low latency.
category: networking
keywords_vi: phình đệm bufferbloat buffer router quá lớn giữ hàng đợi khổng lồ, độ trễ tăng vọt khi tải nặng dù băng thông cao, quản lý hàng đợi chủ động aqm codel fq-codel pie, quản theo độ trễ hàng đợi thay vì kích thước, tcp loss-based lấp đầy buffer làm ping cao, xếp hàng công bằng fair queueing tách luồng
---

# Bufferbloat & Active Queue Management

You have a fast connection, yet the moment a big upload or download starts, your video call stutters and your ping jumps from 20ms to 500ms+. That's **bufferbloat**: network devices (home routers, modems, OS stacks) ship with **oversized buffers** that, under load, fill with a huge backlog of packets. Each packet now waits behind a long queue — adding **latency**, not throughput. The buffer was added to *avoid packet loss*, but it interacts terribly with TCP (see tcp-congestion-control, head-of-line-blocking, how-tcp-works).

## Why Big Buffers Backfire

Loss-based TCP (like CUBIC) **keeps increasing its send rate until it sees packet loss**. If the buffer is enormous, loss doesn't happen until the buffer is **completely full** — so TCP drives the queue to maximum depth and *holds it there*. A full 1-second buffer means **every** packet (including your latency-sensitive game/VoIP packets) waits ~1 second behind the bulk transfer. More buffer → more standing queue → more delay. The problem is **persistent standing queues**, not transient bursts.

## The Insight: Manage Delay, Not Size

You can't fix bufferbloat by sizing the buffer perfectly — the right size depends on bandwidth and RTT that vary constantly. **Active Queue Management (AQM)** instead **actively drops or marks packets before the buffer fills**, signaling TCP to back off *early* so the queue stays short. The breakthrough (**CoDel**, "Controlled Delay") measures the **time packets spend in the queue** (sojourn time), and if the *minimum* delay stays above a target (~5ms) for too long, it starts dropping — targeting **latency directly**, parameterless and self-tuning.

## Key Techniques

- **CoDel** — drop based on queue **sojourn time**, keeping standing delay low regardless of bandwidth.
- **FQ-CoDel** — combine CoDel with **fair queueing**: hash flows into separate sub-queues so a bulk transfer can't delay a sparse latency-sensitive flow (a per-flow HOL-blocking fix). The common, excellent default.
- **PIE** — proportional-integral controller targeting a delay setpoint (used in DOCSIS/cable).
- **ECN** (Explicit Congestion Notification) — **mark** packets instead of dropping, so TCP backs off *without* a retransmit; AQM + ECN is ideal.
- **CAKE** — an all-in-one shaper + FQ-CoDel + ECN for home gateways.

## Design Guidance (for understanding/using)

- **Enable AQM** (FQ-CoDel/CAKE) on the bottleneck (usually your router's uplink) — the single biggest latency-under-load win at home.
- **Shape slightly below line rate** — keep the queue in *your* AQM-managed device, not the ISP's dumb buffer.
- **Turn on ECN** end-to-end where supported to avoid loss-based backoff.
- **Measure with latency-under-load** tests (e.g. flent/Waveform bufferbloat test), not just raw speed tests — speed tests hide bufferbloat.
- **Don't "fix" lag by buying more bandwidth** — bufferbloat is a queue-management problem, not a capacity one.

## Pitfalls (in understanding/using)

- Adding **bigger** buffers to stop loss → worse bufferbloat (bigger standing queue).
- Judging a link by **throughput only** → misses the latency spike under load.
- Assuming high bandwidth means low latency → a saturated bloated link is high-latency regardless.
- Sizing buffers statically → correct size varies with RTT/bandwidth; use delay-based AQM instead.
- Confusing bufferbloat (standing queue latency) with packet loss (capacity) — AQM trades a little loss for much lower delay.
