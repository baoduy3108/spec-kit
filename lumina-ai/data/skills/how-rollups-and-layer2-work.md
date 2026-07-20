---
name: how-rollups-and-layer2-work
description: How layer-2 rollups scale blockchains — executing transactions off-chain in bulk and posting compressed data/proofs to layer 1, plus optimistic (fraud proofs) vs zk (validity proofs) rollups and their trade-offs. Use to understand layer 2, rollups, blockchain scaling, optimistic vs zk-rollups, or why L2s are cheaper than mainnet.
category: engineering
keywords_vi: rollup và layer 2 hoạt động thế nào, mở rộng blockchain, xử lý giao dịch off-chain gộp lô, đăng dữ liệu bằng chứng lên layer 1, optimistic fraud proof vs zk validity proof, l2 rẻ hơn mainnet
---

# How Rollups and Layer 2 Work

Rollups are the leading solution to the blockchain **scalability problem**: base layers like Ethereum are **secure but slow and expensive** (low throughput, high gas). A **layer 2 (L2)** rollup does the heavy computation **off-chain** in bulk, then posts a compact summary back to **layer 1 (L1)** — inheriting L1's security while offering far higher throughput and lower fees (see how-ethereum-and-evm-work, how-blockchain-works).

## The Problem: The Scalability Trilemma

A blockchain wants **security, decentralization, and scalability** — but base layers struggle to have all three at once (the "trilemma"). Ethereum prioritizes security + decentralization, so every node re-executes every transaction → limited throughput and **high gas** when busy. Simply making blocks bigger sacrifices decentralization. Rollups scale **without** giving up L1 security by moving execution off-chain while keeping the **data and settlement** anchored to L1.

## The Core Idea: Execute Off-Chain, Settle On-Chain

A rollup:
1. **Executes many transactions off-chain** on the L2 (its own faster environment), where they're cheap and quick.
2. **Batches (rolls up)** hundreds/thousands of them together.
3. **Posts compressed transaction data + the resulting state** back to L1 as a single transaction, **amortizing** the L1 cost across all of them → each user pays a tiny fraction.
4. **Anchors security to L1** — the transaction **data is published to L1** (so anyone can reconstruct/verify the L2 state), and L1 is the ultimate settlement/arbiter. This is what makes rollups "inherit" L1 security, unlike sidechains (which have their own separate, weaker security).

The key question is: **how does L1 know the off-chain execution was honest?** The two answers define the two rollup types.

## Optimistic vs ZK Rollups

**Optimistic rollups** (Arbitrum, Optimism):
- **Assume transactions are valid by default** (optimistic) and post the results to L1 **without** a proof.
- Anyone can **challenge** a result during a **dispute window** (e.g. ~7 days) by submitting a **fraud proof**; if fraud is proven, the batch is reverted and the submitter slashed.
- **Trade-off:** cheap and **EVM-compatible** (easy to port contracts), but **withdrawals to L1 take days** (you must wait out the challenge window) and security relies on someone watching to challenge.

**ZK rollups / validity rollups** (zkSync, StarkNet, Scroll):
- Post a **cryptographic validity proof (ZK-proof)** with each batch that **mathematically proves** the execution was correct — L1 verifies the proof, so no trust/dispute window needed.
- **Trade-off:** **fast finality** and withdrawals (proof = instant certainty), stronger security model, but proofs are **computationally expensive to generate**, and full EVM compatibility ("zkEVM") is harder/newer.

The rough summary: **optimistic = simpler, mature, EVM-easy, slow withdrawals; ZK = faster/final, cryptographically secure, more complex.** Both are far cheaper than L1.

## Data Availability (the crucial ingredient)

Rollups' security depends on the transaction **data being available** so anyone can verify/reconstruct L2 state. Posting data to L1 is the main cost; innovations (Ethereum's "blobs"/EIP-4844, and data-availability layers) reduce it. Variants that post data **off** L1 (validiums) are cheaper but trade away some security.

## Pitfalls (in understanding/using)

- Confusing **rollups** (inherit L1 security, post data to L1) with **sidechains** (separate, weaker security).
- Optimistic rollups: forgetting the **multi-day withdrawal** delay (challenge window) to L1.
- Assuming L2s are **fully independent** — their security rests on L1 data availability and settlement.
- Thinking **ZK-rollups** are trustless magic → the proof system and its setup must be sound; zkEVM compatibility is still maturing.
- Ignoring **data availability** — if data isn't published, the "rollup" loses its security guarantee (validium risk).
- Bridging assets between L1/L2/other L2s carries **bridge risk** (a top hack category), separate from the rollup itself.
