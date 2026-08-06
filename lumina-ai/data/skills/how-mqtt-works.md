---
name: how-mqtt-works
description: How MQTT works — a lightweight publish/subscribe messaging protocol for IoT, the broker decoupling publishers from subscribers, topics and wildcards, quality-of-service levels, retained messages, and last will. Use to understand MQTT, IoT messaging, publish/subscribe, or lightweight telemetry protocols.
category: engineering
keywords_vi: mqtt, iot, publish subscribe, pub sub, broker, topic wildcard, qos, giao thức nhắn tin nhẹ, retained message last will
---

# How MQTT Works

MQTT is a lightweight **publish/subscribe** messaging protocol built for constrained devices and unreliable networks — the de facto standard for IoT telemetry (sensors, smart home, connected vehicles). It's designed to be tiny, efficient, and tolerant of flaky connections.

## Publish/Subscribe via a Broker

Unlike request/response (client asks server directly), MQTT **decouples** senders and receivers through a central **broker**:
- **Publishers** send messages to a **topic** (they don't know or care who's listening).
- **Subscribers** register interest in topics (they don't know who publishes).
- The **broker** receives all published messages and routes each to every client subscribed to that topic.
This decoupling means devices don't need to know about each other, can come and go independently, and one message can fan out to many consumers — ideal for many sensors and many dashboards/services (see message-queues-and-events for the general pattern).

## Topics & Wildcards

Topics are hierarchical strings, like paths: `home/livingroom/temperature`. Subscribers can use **wildcards**:
- `+` — single level (`home/+/temperature` → temperature of any room).
- `#` — multi-level (`home/#` → everything under home).
This lets you organize telemetry logically and subscribe at any granularity.

## Quality of Service (QoS)

MQTT offers three delivery guarantees, trading reliability for overhead — important on unreliable networks:
- **QoS 0** — "at most once" (fire and forget; may be lost). Cheapest.
- **QoS 1** — "at least once" (acknowledged; may be **duplicated**). Make handlers idempotent (see idempotency).
- **QoS 2** — "exactly once" (four-step handshake; no loss, no dup). Most overhead.
Pick per message importance — telemetry that's fine to occasionally miss uses QoS 0; commands might use QoS 1/2.

## Retained Messages & Last Will

Two features that suit intermittent devices:
- **Retained message** — the broker keeps the *last* message on a topic and immediately delivers it to any **new** subscriber → a device joining late instantly gets the current state (e.g. latest sensor value) instead of waiting for the next publish.
- **Last Will and Testament (LWT)** — a device registers a message the broker will publish **on its behalf if it disconnects unexpectedly** (e.g. `status: offline`) → other clients learn a device dropped off, even though the device couldn't announce it.

## Why It Fits IoT

Tiny header overhead (bytes), works over TCP with a persistent connection, tolerates low bandwidth and dropouts, keep-alive/LWT handle disconnections, and pub/sub scales to huge numbers of devices. Runs securely over TLS (see how-https-tls-works).

## Pitfalls (in understanding/using)

- Ignoring **QoS 1 duplicates** — handlers must be **idempotent**.
- Overusing **QoS 2** everywhere (overhead) where QoS 0/1 suffices.
- Forgetting **retained messages** persist — stale state delivered to new subscribers until overwritten (clear with an empty retained message).
- Making the **broker** a single point of failure without clustering/HA.
- Poor **topic design** (flat or overly deep) → hard to subscribe/filter; design the hierarchy deliberately.
- Running MQTT unencrypted/unauthenticated on the open internet — secure it (TLS + auth), IoT devices are prime targets.
