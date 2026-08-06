---
name: how-ethereum-and-evm-work
description: How Ethereum and the EVM work — a decentralized world computer with accounts and global state, the EVM executing bytecode deterministically, gas metering computation, and transactions as atomic state transitions. Use to understand Ethereum, the EVM, gas, accounts vs contracts, or how on-chain computation actually runs.
category: engineering
keywords_vi: ethereum, evm, world computer, gas đo lường tính toán, tài khoản và trạng thái toàn cục, evm chạy bytecode tất định, giao dịch chuyển trạng thái nguyên tử, eoa contract account
---

# How Ethereum and the EVM Work

Ethereum extended the blockchain idea from "a ledger of coins" (like Bitcoin) to a **general-purpose decentralized computer** — a shared machine that runs programs (smart contracts) and maintains global state. At its heart is the **EVM (Ethereum Virtual Machine)**, which executes contract bytecode deterministically across every node, metered by **gas** (see how-blockchain-works, how-smart-contracts-work).

## Ethereum as a "World Computer" with Global State

Where Bitcoin tracks only coin balances, Ethereum maintains a rich **global state** — a giant key-value map of all accounts and contract storage — that transactions **transition**. Two kinds of accounts:
- **Externally Owned Accounts (EOAs)** — controlled by a **private key** (a user's wallet — see how-crypto-wallets-and-keys-work); can send transactions.
- **Contract accounts** — controlled by their **code**; have persistent storage and run when called.
Every full node holds this state and re-executes transactions to stay in sync. The blockchain is the **ordered log of state transitions**; the current state is the result of applying them all.

## The EVM: A Deterministic Bytecode Machine

The **EVM** is a stack-based virtual machine that every node runs identically:
- Contracts compile (from Solidity/Vyper) to **EVM bytecode**.
- The EVM executes that bytecode **deterministically** — same input + state → same result on every node — which is what lets the decentralized network **agree** on the outcome.
- It's **sandboxed** and **isolated**: no access to the outside world (no network, no filesystem, no real randomness) — because any non-determinism would break consensus. This is why contracts need **oracles** to learn off-chain data (see how-oracles-work).
- "EVM-compatible" chains (Polygon, BNB, Arbitrum, etc.) run the same EVM, so the same contracts/tools work across them.

## Gas: Metering Computation

Because every node runs every operation and computation isn't free, Ethereum **meters** work with **gas**:
- Each EVM operation costs a fixed amount of **gas** (storage writes are very expensive, arithmetic cheap).
- The sender pays **gas × gas price** (in ETH) for their transaction; they set a **gas limit** (max they'll spend).
- Gas **prevents infinite loops / abuse** (you can only compute as much as you pay for) and **prices scarce block space** — when demand is high, gas prices spike (congestion).
- Run out of gas mid-execution → the transaction **reverts** (all changes undone) but the gas is **still spent**.
Gas is why on-chain code must be lean, and why complex logic moves off-chain or to L2s (see how-rollups-and-layer2-work).

## Transactions: Atomic State Transitions

A transaction is an **atomic** unit: it either **fully succeeds** (all state changes applied) or **fully reverts** (as if it never happened, though gas is paid). This all-or-nothing property is crucial — a multi-step contract interaction can't be left half-done. Transactions are ordered into blocks by consensus (Ethereum uses **proof of stake** since "the Merge").

## Design Guidance / Implications

- **Storage is the expensive resource** — minimize on-chain storage writes; keep large data off-chain (store a hash).
- **No external data natively** — use oracles for prices/real-world data (see how-oracles-work).
- **Everything is public** — all state and calldata are visible; no secrets on-chain.
- **Design for reverts** — atomicity means a failed step undoes everything; use it for safety.
- **Consider L2s** for cost — mainnet gas is expensive; rollups inherit security at lower cost (see how-rollups-and-layer2-work).

## Pitfalls (in understanding/using)

- Expecting the EVM to access **external data/APIs** → it can't (determinism); you need oracles.
- Ignoring **gas costs**, especially **storage writes** → prohibitively expensive or out-of-gas reverts.
- Putting **private/large data** on-chain → it's public and costly; store off-chain + a hash.
- Assuming a reverted transaction is **free** → gas is still consumed.
- Forgetting **EVM determinism** rules (no randomness/time reliance) → manipulable or consensus-breaking.
- Confusing **EOAs** (key-controlled) with **contract accounts** (code-controlled) — different capabilities.
