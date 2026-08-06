---
name: tcp-congestion-control
description: How TCP shares limited network capacity without collapsing — congestion control. The sender probes for bandwidth with a congestion window, grows it (slow start, then AIMD), and backs off on loss; modern algorithms like CUBIC and BBR change how aggressively. Use to understand slow start, additive-increase/multiplicative-decrease, why throughput saw-tooths, bufferbloat's effect, and why one slow flow can starve or dominate.
category: networking
keywords_vi: điều khiển tắc nghẽn tcp chia sẻ băng thông, cửa sổ tắc nghẽn congestion window dò tìm băng thông, khởi động chậm slow start rồi tăng cộng giảm nhân aimd, mất gói thì lùi lại tránh sụp đổ mạng, thuật toán cubic và bbr đo băng thông và độ trễ, throughput răng cưa saw-tooth
---

# TCP Congestion Control

The internet is a shared resource with no central scheduler. If every sender blasted at full speed, routers' queues would overflow, packets would drop en masse, everyone would retransmit, and the network would **collapse** (this actually happened in 1986). **Congestion control** is TCP's decentralized answer: each sender **probes** for its fair share of bandwidth and **backs off** when the network signals overload — with no coordination beyond observing its own packet loss and delay (see how-tcp-works, bufferbloat-and-active-queue-management, head-of-line-blocking).

## The Congestion Window (cwnd)

Separate from the receiver's flow-control window, the sender keeps a **congestion window** — how many bytes it may have *in flight* (unacknowledged). Throughput ≈ `cwnd / RTT`. The whole game is choosing `cwnd`: too small wastes capacity, too large overflows queues and drops packets. TCP has **no idea** what the true capacity is, so it **dynamically searches** for it.

## Slow Start → Congestion Avoidance (AIMD)

- **Slow start** — begin small, **double** `cwnd` every RTT (exponential ramp) to quickly find the rough capacity.
- At a threshold (`ssthresh`), switch to **congestion avoidance**: grow **linearly** (+1 segment per RTT) — cautious probing near the limit.
- On **loss** (the congestion signal): **multiplicatively decrease** (classically halve `cwnd`).

This **Additive-Increase / Multiplicative-Decrease (AIMD)** produces the famous **saw-tooth**: slow linear climb, sharp drop on loss, repeat. AIMD is what makes competing flows converge toward **fairness** — the multiplicative cut hits big flows harder.

## Loss-based vs Delay/Model-based

- **CUBIC** (Linux default) — loss-based; a cubic growth function ramps back to the prior operating point fast on high-bandwidth, high-latency ("long fat") links. Fills buffers until loss, which **worsens bufferbloat**.
- **BBR** — models the path's **bottleneck bandwidth and round-trip propagation time** directly, aiming to operate at the "knee" (full bandwidth, minimal queue) instead of waiting for loss. Lower latency, but fairness with CUBIC is debated.

The key shift: loss-based algorithms treat **loss** as the signal (and thus fill queues); model-based ones treat **delay/bandwidth estimates** as the signal (and keep queues short).

## Design Guidance (for understanding/using)

- **Throughput = cwnd / RTT** — high latency caps a single flow's speed; that's why long-distance transfers need big windows (window scaling) or parallel streams.
- **Loss ≠ always congestion** — on wireless/lossy links, random loss makes loss-based control back off needlessly; this motivates BBR and link-layer retransmission.
- **Bufferbloat interacts** — oversized router buffers let loss-based flows inflate latency badly (see AQM/CoDel).
- **One RTT dominates** — a flow sharing a bottleneck with a lower-RTT flow gets less; RTT unfairness is real.
- Prefer **modern defaults** (CUBIC/BBR) and enable **window scaling**; don't hand-tune sockets without measuring.

## Pitfalls (in understanding/using)

- Assuming TCP instantly uses full bandwidth → it **ramps** (slow start) and re-probes; short flows never leave slow start.
- Treating all packet loss as congestion → hurts throughput on lossy wireless links.
- Ignoring RTT → high-latency links throttle single-flow throughput regardless of raw bandwidth.
- Huge router buffers "to avoid loss" → **bufferbloat**: latency balloons while loss-based control keeps them full.
- Expecting perfect fairness → RTT and algorithm differences skew each flow's share.
