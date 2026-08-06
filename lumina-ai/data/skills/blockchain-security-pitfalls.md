---
name: blockchain-security-pitfalls
description: Common smart-contract security pitfalls — reentrancy, integer overflow, access-control mistakes, oracle/price manipulation, front-running/MEV, and the irreversibility that makes bugs catastrophic, plus defensive patterns. Use to understand smart-contract vulnerabilities, reentrancy, why audits matter, or how DeFi hacks happen.
category: engineering
keywords_vi: lỗ hổng bảo mật smart contract, reentrancy tấn công gọi lại, tràn số nguyên, sai phân quyền, thao túng oracle giá, front-running mev, bất biến khiến bug thảm họa, mẫu phòng thủ
---

# Blockchain Security Pitfalls

Smart-contract security is uniquely unforgiving: contracts are **immutable** (can't patch a bug), **hold real value**, run in a **fully adversarial** environment, and every transaction is **irreversible**. A single flaw has drained hundreds of millions of dollars. Understanding the common vulnerability classes is essential before deploying anything on-chain (see how-smart-contracts-work, how-oracles-work).

## Why On-Chain Bugs Are Catastrophic

Ordinary bugs get patched. On-chain bugs:
- **Can't be fixed** after deployment (unless you built an upgrade path) — the vulnerability is live forever.
- **Directly move money** — exploitation means immediate, **irreversible** theft (no chargebacks).
- **Are public** — the code is visible; attackers study it, and anyone can call any function.
This is why **audits, formal verification, and testnets are non-negotiable**, and why "move fast and break things" is a disaster here.

## The Classic Vulnerability Classes

- **Reentrancy** — the most famous (the DAO hack). A contract makes an **external call** (e.g. sends funds) **before** updating its own state; the recipient is a malicious contract that **calls back in** during that call, re-entering the function while state is stale — repeatedly draining funds. **Fix:** the **checks-effects-interactions** pattern (update state *before* external calls) and/or reentrancy guards.
- **Integer overflow/underflow** — arithmetic wrapping around (e.g. balance underflows to a huge number). **Fix:** safe-math (built into Solidity ≥0.8, which reverts on overflow).
- **Access control mistakes** — sensitive functions (mint, withdraw, upgrade) not properly restricted (missing `onlyOwner`), letting anyone call them. **Fix:** rigorous access checks; least privilege.
- **Oracle / price manipulation** — a contract trusts a price from a manipulable source (e.g. a spot DEX price), and an attacker moves that price (often via a **flash loan**) to trick the contract into mispricing. **Fix:** robust oracles, time-weighted average prices (see how-oracles-work).
- **Front-running / MEV** — the mempool is public, so anyone (including block producers) can see your pending transaction and **insert their own** first (sandwiching a trade, sniping). **Fix:** commit-reveal schemes, slippage limits, private mempools.
- **Unchecked external calls / delegatecall** — trusting return values or delegating execution to untrusted code that can hijack your contract's state.
- **Logic errors in economic design** — incentives that can be gamed (even with "correct" code), governance attacks, flash-loan-enabled exploits.

## Defensive Patterns

- **Checks-Effects-Interactions** — validate, then update state, then make external calls last (defeats reentrancy).
- **Pull over push payments** — let users **withdraw** rather than pushing funds to them (avoids reentrancy and failed-transfer issues).
- **Use audited libraries** (OpenZeppelin) instead of hand-rolling standards/access control.
- **Least privilege + timelocks + multisig** on admin functions.
- **Robust oracles** (decentralized, TWAP) — never trust a single manipulable price.
- **Audits + formal verification + extensive testing** (including fuzzing) before mainnet.
- **Bug bounties** and gradual value ramp-up after launch.

## Pitfalls (in understanding/using)

- **External call before state update** → reentrancy; always checks-effects-interactions.
- Trusting a **single, manipulable price** feed → flash-loan price manipulation.
- **Missing access control** on privileged functions → anyone drains/mints.
- Assuming the **mempool is private** → front-running/MEV; use slippage limits/commit-reveal.
- **Deploying without an audit** → permanent, exploitable, irreversible losses.
- Hand-rolling token/access **standards** instead of using audited libraries.
- Forgetting **immutability** — you likely can't hotfix; get it right (or design safe upgradability) before deploy.
