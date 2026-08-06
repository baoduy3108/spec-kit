---
name: how-bittorrent-works
description: How BitTorrent and peer-to-peer file sharing work — splitting a file into hash-verified pieces, the torrent/magnet metadata, trackers vs DHT for peer discovery, the swarm (seeders/leechers), piece selection (rarest-first), and the tit-for-tat incentive. Use to understand P2P distribution, why it scales with demand, and decentralized peer discovery.
category: engineering
keywords_vi: bittorrent, chia sẻ p2p, peer to peer, torrent, seeder, leecher, swarm, dht, tải file phân tán
---

# How BitTorrent Works

BitTorrent distributes a file by turning every downloader into an uploader, so popularity *increases* capacity instead of overwhelming one server.

## Pieces & Verification

The file is split into fixed-size **pieces**, and the **hash of every piece** is recorded in the torrent metadata. A peer downloads pieces from many sources in any order and **verifies each against its hash** before trusting it — so corrupt or malicious data is detected and rejected per piece. Once you have a piece, you can share it immediately, even before the whole file is done.

## Metadata: Torrent File / Magnet

A **.torrent** file (or **magnet link**) carries the metadata: piece hashes, sizes, and how to find peers. A magnet link identifies the content by an **infohash** and lets you fetch the metadata itself from the network — no central file needed.

## Finding Peers

- **Tracker** — a server that keeps a list of peers currently sharing a torrent; you ask it for peers. Central-ish (a tracker going down hurts).
- **DHT (Distributed Hash Table)** — a fully decentralized peer directory spread across all peers (Kademlia): you look up "who has infohash X" by routing through the network, no central server. This is what makes trackerless/magnet torrents work and makes the system hard to shut down.

## The Swarm & Piece Selection

Everyone sharing a torrent is a **swarm**: **seeders** have the whole file; **leechers** are still downloading. To keep pieces available and downloads efficient:
- **Rarest-first** — download the piece fewest peers have next, so rare pieces spread before their only holder leaves (preventing a piece from disappearing).
- Download pieces from many peers **in parallel**, maximizing bandwidth.

## Incentives: Tit-for-Tat

To discourage "leeching" (only downloading), peers preferentially upload to peers who upload back to them (**tit-for-tat**), with occasional "optimistic unchoking" to discover new good partners. Cooperation is rewarded with faster downloads.

## Why It Matters

The design shows how to scale distribution without central infrastructure: content-addressed hash-verified chunks (also how Git and IPFS work), decentralized discovery (DHT), parallel multi-source transfer, and incentive-aligned cooperation. It's a masterclass in P2P system design — capacity grows with demand rather than collapsing under it.
