---
name: how-blockchain-works
description: How a blockchain works — cryptographic hashing links blocks into a tamper-evident chain, Merkle trees summarize transactions, digital signatures authorize them, and consensus (proof of work / proof of stake) lets a decentralized network agree on one history without a central authority. Use to understand blockchain, cryptocurrency, and why it's immutable/decentralized (and its trade-offs).
category: engineering
keywords_vi: blockchain hoạt động thế nào, cơ chế blockchain, proof of work proof of stake, merkle tree, hàm băm chuỗi khối, phi tập trung, cryptocurrency, hiểu blockchain
---

# How Blockchain Works

A blockchain is an append-only ledger replicated across many nodes, made tamper-evident by cryptography and kept consistent by a consensus rule — no central authority required.

## The Chain of Hashes

Each **block** contains a batch of transactions plus the **hash of the previous block**. A cryptographic hash is a one-way fingerprint: change any byte in a block and its hash changes completely. Because each block embeds the prior block's hash, altering an old block breaks every hash after it — so tampering is immediately detectable. This linkage is what "immutable" actually means.

## Merkle Trees

Transactions in a block are hashed pairwise up into a tree whose root (**Merkle root**) is stored in the block header. This lets you prove a specific transaction is in a block with a small proof (a path up the tree) without downloading every transaction — efficient verification for light clients.

## Signatures = Authorization

Ownership is public/private key cryptography. To spend, you **sign** the transaction with your private key; anyone verifies it with your public key. No password to steal on a server — but lose the private key and the funds are gone (self-custody trade-off).

## Consensus (the hard problem)

Many nodes must agree on *one* ordered history despite no central coordinator and possible bad actors:
- **Proof of Work** — nodes ("miners") race to find a nonce making the block hash meet a difficulty target; it's expensive to compute, trivial to verify. The longest valid chain wins. Security comes from the cost of redoing that work — but it burns enormous energy.
- **Proof of Stake** — validators lock up ("stake") capital and are chosen to propose/attest blocks; misbehavior gets their stake slashed. Far less energy; different security assumptions.

## Trade-offs (be honest)

Decentralization and tamper-evidence cost a lot: low throughput, latency (waiting for confirmations/finality), energy (PoW), and full replication of all data on every node. Most problems that "need a blockchain" are better served by a normal database with access controls — a blockchain earns its cost only when you genuinely need trustless coordination among mutually-distrusting parties with no acceptable central authority.
