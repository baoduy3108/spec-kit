---
name: how-oracles-work
description: How blockchain oracles work — bringing off-chain data (prices, events, randomness) onto the chain for smart contracts that can't access the outside world, the oracle problem and trust, and manipulation risks like flash-loan price attacks. Use to understand oracles, the oracle problem, Chainlink, feeding real-world data to contracts, or price-feed manipulation.
category: engineering
keywords_vi: oracle blockchain hoạt động thế nào, đưa dữ liệu off-chain lên chain, smart contract không truy cập thế giới ngoài, bài toán oracle và niềm tin, thao túng giá flash loan, chainlink
---

# How Blockchain Oracles Work

Smart contracts are **isolated** from the outside world — the EVM is deterministic and sandboxed, so contracts **cannot** fetch a web API, a stock price, the weather, or even reliable randomness (see how-ethereum-and-evm-work). **Oracles** are the bridge that brings **off-chain data on-chain** so contracts can react to real-world information. But doing this trustlessly is genuinely hard — the "oracle problem" (see how-smart-contracts-work, blockchain-security-pitfalls).

## Why Contracts Can't Just Fetch Data

For all nodes to agree on execution, a contract must be **deterministic** — every node running it must get the **same** result. If a contract called an external API, different nodes might get **different** responses (or the API could be down), breaking consensus. So the EVM forbids external calls entirely. Yet contracts constantly **need** external data: DeFi needs asset **prices**, insurance needs real-world **events**, games need **randomness**, cross-chain apps need other chains' state. Oracles solve this by having data **pushed onto the chain** (as a transaction) where contracts can read it deterministically.

## How an Oracle Works

1. **Off-chain** — oracle nodes fetch the data (e.g. ETH price from many exchanges).
2. **On-chain** — they submit that data to an **oracle contract** in a transaction, writing it to on-chain storage.
3. **Consume** — your contract **reads** the value from the oracle contract (now it's just on-chain state, deterministic to read).
The data is only as fresh as the last update and only as trustworthy as the oracle.

## The Oracle Problem: Trust

Here's the deep issue: a blockchain can be trustless internally, but the **data an oracle provides is only as good as the oracle**. If the oracle lies or is wrong, the contract acts on **bad data** — and you've reintroduced a **trusted third party**, undermining decentralization. A single oracle is a **single point of failure** (and a juicy attack target). Solutions:
- **Decentralized oracle networks** (e.g. Chainlink) — **many independent** nodes report, and the values are **aggregated** (median), so no single node can corrupt the feed. This distributes trust, mirroring the blockchain's own model.
- **Multiple data sources** per node — resist any one exchange/API being wrong or manipulated.
- **Reputation/staking** — oracles stake value and are penalized for bad data.

## Manipulation: The Flash-Loan Price Attack

A notorious failure mode: a contract uses a **manipulable on-chain price** (like the spot price of a single DEX pool) as its "oracle." An attacker takes a **flash loan** (huge uncollateralized loan repaid in the same transaction), **swings that pool's price**, tricks the victim contract into mispricing (e.g. borrowing far more than collateral is worth), and profits — all atomically. This has caused many DeFi hacks. **Defenses:** use **decentralized oracles** (Chainlink) instead of a single DEX spot price, and **time-weighted average prices (TWAP)** that are expensive to manipulate over time (see blockchain-security-pitfalls).

## Special Case: Randomness

On-chain "randomness" (block hash, timestamp) is **manipulable** by block producers — never use it for anything valuable (lotteries, loot). Use a **verifiable random function (VRF)** oracle that provides randomness with a cryptographic proof it wasn't tampered with.

## Design Guidance

- **Never trust a single oracle / single-source price** — use decentralized, aggregated feeds.
- **Use TWAP / robust feeds** for prices to resist flash-loan manipulation.
- **Use a VRF** for randomness, never block variables.
- **Account for staleness** — check the oracle's last-update time; reject stale data.
- **Minimize oracle dependence** where possible; understand it's a trust assumption.

## Pitfalls (in understanding/using)

- Using a **single DEX spot price** as an oracle → flash-loan price manipulation (a top DeFi exploit).
- Trusting a **single** oracle node/source → single point of failure and manipulation.
- Using **block hash/timestamp** for randomness → block producers can manipulate it.
- Ignoring **staleness** → acting on outdated prices during volatility.
- Forgetting the **oracle problem** — an oracle reintroduces trust; the contract is only as honest as its data.
- Assuming "on-chain = trustless data" → the *data's* trustworthiness depends entirely on the oracle design.
