---
name: how-multicast-works
description: How multicast works — delivering one stream to many receivers efficiently by sending a single copy that the network duplicates only where paths diverge, multicast groups, IGMP membership, and unicast vs broadcast vs multicast. Use to understand multicast, efficient one-to-many delivery, IPTV/streaming distribution, or unicast vs multicast vs broadcast.
category: engineering
keywords_vi: multicast, igmp, gửi một tới nhiều, một bản sao mạng nhân đôi, nhóm multicast group, unicast broadcast multicast, iptv phân phối
---

# How Multicast Works

Multicast is a network technique for delivering the **same data to many receivers efficiently** — sending it **once** and letting the network replicate it only where necessary. It sits between unicast (one-to-one) and broadcast (one-to-all).

## The Three Delivery Modes

- **Unicast** — one sender → one receiver. To reach N receivers you send N separate copies → bandwidth scales with the audience (fine for the web, wasteful for identical live content to millions).
- **Broadcast** — one sender → *everyone* on the network segment, whether they want it or not → doesn't scale and can't cross routers.
- **Multicast** — one sender → *a group* of interested receivers. The sender emits **one** copy; the network **duplicates packets only at branch points** where paths to different receivers diverge. So a link carries the stream at most once regardless of how many receivers are downstream.

## Multicast Groups

Receivers subscribe to a **multicast group**, identified by a special group address (a reserved IP range). The sender transmits to the group address, not to individual receivers — it doesn't know or track who's listening. Any host can **join** or **leave** a group at any time. This decoupling (sender unaware of the receiver set) is like pub/sub at the network layer.

## Managing Membership: IGMP

Routers and switches need to know **which** downstream links have interested receivers, so they only forward the stream there (not everywhere — that would be broadcast). Hosts announce group membership using **IGMP** (Internet Group Management Protocol); routers build a **distribution tree** from the source out to the subscribed receivers and forward along it, replicating at branches. Switches use **IGMP snooping** to avoid flooding multicast to ports with no members.

## Where It's Used

- **IPTV / live video** distribution within provider networks — one stream feeds thousands of set-top boxes without per-viewer bandwidth.
- **Financial market data**, **service discovery** (mDNS/Bonjour on LANs), **streaming** on managed networks.
Multicast shines for **live, identical, one-to-many** data.

## The Catch: Limited on the Public Internet

Multicast largely **doesn't work across the public internet** — it requires router support and coordination that ISPs generally don't provide end-to-end. So it thrives on **managed networks** (a single provider's IPTV network, enterprise LANs, data centers). On the open internet, one-to-many is instead handled by **CDNs** (see how-cdns-work), **unicast + edge replication**, or application-layer multicast/P2P. This is why you stream Netflix via unicast/CDN, not IP multicast.

## Pitfalls (in understanding/using)

- Expecting multicast to work **across the internet** — it's typically confined to managed networks; use CDNs/unicast for public one-to-many.
- Confusing multicast (to a *group* of interested receivers) with broadcast (to *everyone*).
- Forgetting **IGMP snooping** on switches → multicast floods all ports like broadcast (defeats the efficiency).
- Assuming reliability — multicast is UDP-based (no built-in retransmission); reliability needs app-layer handling.
- Overlooking that receivers must **join** the group to receive anything (nothing is pushed to non-members).
