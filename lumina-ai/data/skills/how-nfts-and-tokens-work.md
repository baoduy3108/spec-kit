---
name: how-nfts-and-tokens-work
description: How tokens and NFTs work — token standards (ERC-20 fungible, ERC-721/1155 non-fungible) as smart contracts tracking ownership, what an NFT actually is (a pointer, often to off-chain metadata), and common misconceptions. Use to understand tokens, NFTs, ERC-20/721/1155, fungible vs non-fungible, or what you actually own with an NFT.
category: engineering
keywords_vi: nft, erc-20, erc-721, token fungible non-fungible, chuẩn token erc-1155, smart contract theo dõi sở hữu, nft là con trỏ tới metadata off-chain, hiểu nhầm nft
---

# How Tokens and NFTs Work

"Tokens" and "NFTs" are just **smart contracts that track ownership** of units on a blockchain. A token isn't a special blockchain feature — it's a contract that maintains a ledger of "who owns how much" and follows a **standard interface** so wallets/exchanges can interact with it uniformly. Understanding this demystifies both fungible tokens (like most cryptocurrencies-on-Ethereum) and NFTs (see how-smart-contracts-work, how-ethereum-and-evm-work).

## A Token Is a Smart Contract

On a chain like Ethereum, a token is a **contract** whose storage is essentially a mapping of **address → balance** (or address → owned item IDs). "Sending a token" calls the contract's `transfer` function, which updates that mapping. Standards define the **interface** (functions/events) so any wallet or exchange can work with any compliant token:
- **ERC-20** — the **fungible** token standard. Every unit is **interchangeable** (like currency: 1 USDC = any other 1 USDC). Used for stablecoins, governance tokens, most "coins" on Ethereum. The contract tracks balances and allowances.
- **ERC-721** — the **non-fungible** token (NFT) standard. Each token has a **unique ID** and is **distinct** (not interchangeable) — one contract, many unique items, each individually owned.
- **ERC-1155** — a **multi-token** standard handling both fungible and non-fungible in one contract efficiently (common in games: many item types, some unique, some stacked).

## What an NFT Actually Is (and Isn't)

An NFT is a **unique token ID owned by an address**, recorded on-chain. But here's the crucial, widely-misunderstood part: **the NFT usually does not contain the image/art itself**. On-chain storage is expensive (see how-ethereum-and-evm-work), so typically:
- The NFT stores a **token ID** and a **URI** pointing to **metadata** (name, attributes, image URL).
- That metadata and the image are often stored **off-chain** — on a server, or ideally on **IPFS**/decentralized storage.
So owning an NFT means: the blockchain records **you own token #N** of contract X. What that token *points to* (the image) may live elsewhere. If the metadata is on a **centralized server** that goes down or changes, the NFT can point to **nothing or something different** — the on-chain ownership record persists, but the "art" can rot. IPFS with content-addressing mitigates this (the URI is a hash of the content).

## What You Actually Own

- You own an **on-chain record** that address→ token #N, transferable and verifiable — real, provable digital ownership/scarcity.
- You do **not** automatically own **copyright** to the artwork (that's a separate legal matter defined by the project's terms), and you don't necessarily control where the image is hosted.
- The value/utility is whatever the project and market ascribe — membership, in-game items, provenance, art — not an inherent property of the token.

## Uses Beyond Art

- **Fungible tokens** — currencies, stablecoins, governance/voting, rewards, in-app credits.
- **NFTs** — digital art/collectibles, game items, event tickets, identity/credentials, domain names, membership passes, real-world asset provenance.

## Pitfalls (in understanding/using)

- Thinking the NFT **contains** the image → it's usually a **pointer** to (often off-chain) metadata; the image can be centralized and rot.
- Assuming NFT ownership = **copyright** → it doesn't, unless the project's license grants it.
- Metadata/image on a **centralized server** → single point of failure; prefer IPFS/content-addressed storage.
- Confusing **fungible** (ERC-20, interchangeable) with **non-fungible** (ERC-721, unique) tokens.
- Believing a token is a special chain primitive → it's just a **contract**; its safety depends on that contract's code (see blockchain-security-pitfalls).
- Trusting a token's **stated** supply/behavior without reading the contract → it can mint infinitely, block transfers, etc.
