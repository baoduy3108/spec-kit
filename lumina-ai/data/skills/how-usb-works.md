---
name: how-usb-works
description: How USB works — the host-controlled bus, device enumeration and descriptors, endpoints and transfer types (control/bulk/interrupt/isochronous), device classes (HID, mass storage), power delivery, and how USB-C differs. Use to understand USB, device enumeration, why USB is host-driven, USB-C/Power Delivery, or plug-and-play.
category: engineering
keywords_vi: usb, bus host điều khiển, enumeration, liệt kê thiết bị, endpoint transfer type, device class hid, power delivery, usb-c, plug and play
---

# How USB Works

USB (Universal Serial Bus) connects peripherals to computers with plug-and-play convenience. Behind that simplicity is a **host-controlled** protocol where the computer orchestrates everything and devices only speak when spoken to.

## Host-Controlled Bus (the key idea)

USB has one **host** (the computer) that controls the bus, and many **devices**. Devices **never** initiate communication — the host polls them and issues all transactions. This keeps the protocol simple and deterministic (no bus contention/collisions) but means a device can't spontaneously interrupt the host at the hardware level; it waits to be polled. A tiered **star topology** with hubs lets one host port fan out to many devices.

## Enumeration (plug-and-play)

When you plug in a device, the host **enumerates** it:
1. Detects the electrical connection and resets the device.
2. Assigns it a unique **address**.
3. Reads its **descriptors** — data structures the device reports describing what it is: vendor/product IDs, device **class**, endpoints, power needs, supported configurations.
4. Loads a matching **driver** and configures the device.
This is how the OS knows a keyboard is a keyboard without you installing anything — the device self-describes via standard descriptors.

## Endpoints & Transfer Types

Communication happens through **endpoints** (logical data sources/sinks on the device). USB defines four transfer types for different needs:
- **Control** — setup/configuration (used during enumeration).
- **Bulk** — large, reliable, error-checked but no timing guarantee (flash drives, printers).
- **Interrupt** — small, low-latency, polled regularly (keyboards, mice — the host polls every few ms).
- **Isochronous** — steady, time-critical, *no* retransmission (audio/webcams — a late frame is useless, so drop it rather than resend).
Choosing the right type matches the device's needs (throughput vs latency vs timing).

## Device Classes

Standard **classes** let one generic driver serve many devices: **HID** (keyboards, mice, gamepads), **Mass Storage** (drives), **Audio**, **Video (UVC)**, **CDC** (serial/networking). A device declaring a standard class works with the OS's built-in driver — no vendor software needed.

## Power & USB-C

USB also delivers **power** (originally 5 V / limited current). **USB-C** is a reversible **connector** (not a protocol) that carries USB data plus **Power Delivery (PD)** — negotiating higher voltages/currents (up to 100W+ and beyond) to charge laptops, and **alternate modes** (carrying DisplayPort/Thunderbolt over the same cable). This is why USB-C cables and their capabilities vary so much — the connector is standard but what it negotiates differs.

## Pitfalls (in understanding/using)

- Assuming devices can initiate transfers — the **host polls**; devices are passive (matters for latency and firmware design).
- Expecting all **USB-C cables** to be equal — they differ wildly (charging wattage, data speed, alt modes); the connector ≠ the capability.
- Confusing the connector (USB-C) with the protocol/speed (USB 2.0 vs USB4).
- Overloading a port/hub's **power budget** → devices under-power or disconnect.
- Using isochronous semantics where you need reliability (it doesn't retransmit) or bulk where you need timing.
