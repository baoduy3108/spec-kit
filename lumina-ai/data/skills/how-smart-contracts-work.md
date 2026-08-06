---
name: how-smart-contracts-work
description: How smart contracts work — self-executing code deployed on a blockchain that runs deterministically when called, holds funds, and can't be changed once deployed, plus gas, state, and why immutability cuts both ways. Use to understand smart contracts, on-chain programs, why they're immutable, gas costs, or how DeFi/NFTs are built.
category: engineering
keywords_vi: smart contract hoạt động thế nào, hợp đồng thông minh, code tự thực thi trên blockchain, chạy tất định khi được gọi, giữ tiền không sửa được sau khi deploy, gas trạng thái, bất biến
---

# How Smart Contracts Work

A smart contract is **program code deployed on a blockchain** that runs **deterministically** when called, can **hold and move funds**, and — crucially — **can't be changed** once deployed. Smart contracts are the foundation of everything "web3": DeFi, NFTs, DAOs. Understanding their unusual constraints (immutable, deterministic, gas-metered, adversarial) is key to reasoning about them (see how-blockchain-works, how-ethereum-and-evm-work, blockchain-security-pitfalls).

## What Makes Them Different From Normal Code

Smart contracts look like ordinary code (functions, state variables) but run in a radically different environment:
- **On-chain and decentralized** — the code and its state live on the blockchain, executed by every node. No server you control; the network runs it.
- **Deterministic** — given the same input and state, it must produce the **same** result on every node (so they can agree). No randomness, no real-world time/network calls, no non-determinism.
- **Immutable once deployed** — you generally **cannot patch** a deployed contract. A bug is permanent unless you designed an upgrade path in advance. "Code is law."
- **Handles real value** — contracts custody tokens/funds directly, so bugs mean **real money lost** — and the code runs in a **fully adversarial** environment where anyone can call any function.
- **Gas-metered** — every operation costs **gas** (paid in the chain's currency); computation is expensive and bounded (see how-ethereum-and-evm-work).

## How They Execute

1. **Deploy** — you publish compiled bytecode to the chain; it gets an **address** and its own persistent **state** (storage).
2. **Call** — anyone sends a transaction to a contract function (with inputs and maybe funds). 
3. **Execute** — every node runs the function in the VM (the EVM on Ethereum — see how-ethereum-and-evm-work), deterministically, updating the contract's state, moving funds, emitting **events** (logs apps can watch).
4. **Consensus** — the resulting state change is recorded on-chain once the block is agreed.
Contracts can **call other contracts**, which is what makes DeFi "money legos" **composable** — but also spreads risk.

## Immutability Cuts Both Ways

- **Upside** — trustless: no one (not even the author) can secretly change the rules or seize funds; behavior is predictable and verifiable.
- **Downside** — **you can't fix bugs**. A vulnerability is exploitable forever unless you built in an **upgrade pattern** (proxy contracts) or a pause/kill switch — and those add their own risks/centralization. This is why audits matter so much (see blockchain-security-pitfalls): there's often no "deploy a hotfix."

## Design Guidance

- **Assume adversarial callers** — anyone can call any public function with any input, in any order, reentrantly.
- **Test and audit exhaustively before deploy** — you usually can't patch; bugs are permanent and cost real money.
- **Minimize on-chain logic/state** — gas is expensive; keep contracts small and simple.
- **Plan upgradability deliberately** (proxy patterns) if you need it — but understand the added complexity/centralization.
- **Emit events** for off-chain apps to track state.
- **Handle failure explicitly** — reverts undo the whole transaction; design for atomicity.

## Pitfalls (in understanding/using)

- Treating it like **patchable** server code → deployed bugs are permanent; there's no quick hotfix.
- Forgetting the **adversarial** environment → assuming callers behave (they won't; reentrancy, front-running — see blockchain-security-pitfalls).
- Relying on **non-determinism** (randomness, external calls, timestamps) → breaks consensus or is manipulable.
- Ignoring **gas** → operations too expensive to run, or unbounded loops that hit gas limits.
- Storing **secrets/private data** on-chain → everything on-chain is **public** and permanent.
- Over-trusting **composability** → calling another contract inherits its risks (a dependency exploit drains you).
