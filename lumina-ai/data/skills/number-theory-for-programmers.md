---
name: number-theory-for-programmers
description: Practical number theory for coding — GCD/LCM and the Euclidean algorithm, modular arithmetic and modular exponentiation, primes and the Sieve of Eratosthenes, modular inverse, and where these show up (crypto, hashing, competitive programming). Use when working with GCD/LCM, modular arithmetic, primes, "answer mod 1e9+7" problems, or crypto math basics.
category: engineering
keywords_vi: number theory, gcd, euclid, lcm, số học modulo, modular exponentiation, sieve, số nguyên tố eratosthenes, modular inverse, mod 1e9+7
---

# Number Theory for Programmers

A handful of number-theory tools show up constantly in coding: hashing, cryptography (see how-public-key-crypto-works), competitive programming, and "give the answer modulo 1e9+7" problems. You don't need deep math — just these practical building blocks.

## GCD / LCM & the Euclidean Algorithm

The **greatest common divisor** (GCD) is found fast by **Euclid's algorithm**: `gcd(a, b) = gcd(b, a mod b)`, repeating until one is 0. It's `O(log min(a,b))` — very fast. **LCM** = `a * b / gcd(a, b)`. GCD underlies reducing fractions, tiling/period problems, and the **extended Euclidean algorithm** (which also finds coefficients `x, y` with `ax + by = gcd`, used for modular inverses).

## Modular Arithmetic

"Clock arithmetic" — numbers wrap around a modulus `m`. Essential because results in programming problems and cryptography are kept within a fixed range. Rules: addition and multiplication distribute over mod — `(a + b) mod m = ((a mod m) + (b mod m)) mod m`, same for multiplication. This lets you keep intermediate values small and avoid overflow (why competitive problems ask for the answer **mod a large prime like 1e9+7**: it keeps numbers bounded while preserving structure).
- **Careful with subtraction** (add `m` before mod to avoid negatives) and **division** (you can't just divide — see modular inverse).

## Modular Exponentiation (fast power)

Computing `a^n mod m` for huge `n` naively is impossible (n multiplications, giant numbers). **Fast/binary exponentiation** does it in `O(log n)` by squaring: `a^n = (a^(n/2))²`, reducing mod `m` at every step to keep numbers small. This is the workhorse of **RSA/Diffie-Hellman** and any "large power mod m" need.

## Primes & the Sieve of Eratosthenes

To find all primes up to `n`: the **Sieve of Eratosthenes** marks multiples of each prime as composite, in `O(n log log n)` — far faster than testing each number. For checking if a single large number is prime, use primality tests (Miller-Rabin). Primes are central to cryptography (key generation) and hashing (prime moduli reduce collisions).

## Modular Inverse (dividing under a modulus)

You can't divide directly in modular arithmetic; instead multiply by the **modular inverse** — `a⁻¹` such that `a · a⁻¹ ≡ 1 (mod m)`. Found via the extended Euclidean algorithm, or (when `m` is prime) **Fermat's little theorem**: `a⁻¹ ≡ a^(m−2) mod m` (compute with fast exponentiation). Needed for modular fractions/combinatorics (binomial coefficients mod p).

## Pitfalls (in understanding/using)

- **Integer overflow** — multiplying big numbers before taking mod can overflow; take mod at each step (use 64-bit or big-int where needed).
- **Negative mod** — many languages return negative results for `-5 % 3`; normalize with `((x % m) + m) % m`.
- Trying to **divide** under a modulus directly — use the **modular inverse**.
- Naive `a^n` or trial-division primality on large inputs — use fast exponentiation and the sieve/Miller-Rabin.
- Assuming a modular inverse always exists — it needs `gcd(a, m) = 1` (a and m coprime).
- Reinventing GCD/prime utilities your language's math library already provides.
