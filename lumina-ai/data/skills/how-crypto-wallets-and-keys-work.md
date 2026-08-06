---
name: how-crypto-wallets-and-keys-work
description: How crypto wallets and keys work — a wallet holds private keys (not coins), the private key signs transactions and derives the public address, seed phrases back up keys, and custodial vs non-custodial control, plus why losing the key means losing the funds. Use to understand crypto wallets, private/public keys, seed phrases, self-custody, or why key management is everything.
category: engineering
keywords_vi: ví crypto và khóa hoạt động thế nào, ví giữ khóa riêng không giữ coin, khóa riêng ký giao dịch suy ra địa chỉ, seed phrase sao lưu, custodial vs non-custodial, mất khóa mất tiền
---

# How Crypto Wallets and Keys Work

A crypto "wallet" is one of the most misunderstood concepts: it **doesn't hold coins** — it holds **cryptographic keys**. The coins live on the blockchain; the wallet holds the **private key** that proves you control an address and lets you authorize transactions. Understanding keys is understanding crypto ownership — and why "not your keys, not your coins" (see how-public-key-crypto-works, how-blockchain-works, how-ethereum-and-evm-work).

## Keys, Not Coins

Ownership on a blockchain is defined by **asymmetric cryptography** (see how-public-key-crypto-works):
- **Private key** — a secret number. Whoever knows it **controls** the funds at the corresponding address. It's used to **sign** transactions, proving authorization **without revealing the key**.
- **Public key / address** — derived from the private key (one-way). The **address** is your public "account number" that others send funds to. You can share it freely.
The blockchain records that "address X holds Y coins." To move them, you produce a **signature** with the matching private key; the network verifies it against the public key. So the wallet's whole job is to **store your private keys and sign with them** — the "coins" never leave the chain.

## Seed Phrases (backup and derivation)

Managing raw private keys is error-prone, so modern wallets use a **seed phrase** (a 12–24 word mnemonic):
- The seed phrase is a human-readable encoding of a master secret from which **all** your keys/addresses are **deterministically derived** (hierarchical deterministic / HD wallets).
- **Back up the seed phrase = back up every key.** Restore it on any compatible wallet and you regain all your accounts.
- **Anyone with your seed phrase has total control** of your funds — it's the master key. Never type it into a website, never store it digitally where it can leak, never share it.

## Custodial vs Non-Custodial (who holds the keys)

The critical distinction:
- **Non-custodial (self-custody)** — **you** hold the private keys (a hardware wallet, a browser/mobile wallet). You have full control — and full responsibility. No one can freeze or seize your funds, but **no one can recover them** if you lose your keys.
- **Custodial** — a third party (an exchange like Coinbase/Binance) holds the keys **for** you; you have an account with them. Convenient (password reset, support), but you're **trusting** them — they can freeze your account, get hacked, or become insolvent ("not your keys, not your coins"). The funds are effectively an IOU.

## The Brutal Truth: Lose the Key, Lose the Funds

Because there's **no central authority** and **no password reset** in self-custody:
- **Lose your private key / seed phrase → funds are gone forever.** No recovery. Billions in crypto are permanently lost this way.
- **Someone steals your key/seed → they take everything, irreversibly.** No chargebacks, no fraud department.
This makes **key management the entire security model** of self-custody. Hardware wallets keep keys offline; multisig and social recovery add safety nets.

## Design Guidance

- **Back up the seed phrase offline** (paper/metal), in multiple secure locations; never digital/online.
- **Never share** your seed phrase or private key — no legitimate service asks for it (a top scam).
- **Hardware wallets** for meaningful amounts — keys stay offline, signing happens on-device.
- **Verify addresses** before sending — transactions are **irreversible**; a wrong/malicious address loses funds.
- **Consider multisig / social recovery** to avoid a single point of failure.
- **Understand custodial trade-offs** — convenience vs counterparty risk.

## Pitfalls (in understanding/using)

- Thinking the wallet **holds coins** → it holds **keys**; the coins are on-chain.
- **Losing** the seed phrase/key → permanent, unrecoverable loss (no reset).
- **Sharing** or digitally storing the seed phrase → total theft (the #1 attack vector).
- Assuming exchange (custodial) balances are truly "yours" → they're an IOU; the exchange can freeze/fail.
- Sending to a **wrong/malicious address** → irreversible loss (no chargeback).
- Approving a malicious **transaction/signature** (phishing dapp) → draining approvals; read what you sign.
