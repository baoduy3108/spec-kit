---
name: bit-manipulation
description: Bitwise techniques — AND/OR/XOR/NOT/shifts, common tricks (test/set/clear/toggle a bit, check power of two, lowest set bit, count bits), XOR properties for finding unique/missing numbers, and bitmasks for subset enumeration and compact state. Use for low-level bit problems, flags/permissions, and bitmask dynamic programming.
category: engineering
keywords_vi: bit manipulation, thao tác bit, bitwise, xor and or shift, đếm bit set, kiểm tra lũy thừa 2, bitmask, số xuất hiện lẻ lần, cờ flag bit
---

# Bit Manipulation

Working directly with the bits of an integer is fast, compact, and the intended solution to a class of problems. The operators: `&` AND, `|` OR, `^` XOR, `~` NOT, `<<`/`>>` shifts.

## Essential Tricks

- **Test bit i**: `(n >> i) & 1`.
- **Set bit i**: `n | (1 << i)`. **Clear bit i**: `n & ~(1 << i)`. **Toggle bit i**: `n ^ (1 << i)`.
- **Is power of two**: `n > 0 and (n & (n - 1)) == 0` (a power of two has exactly one set bit; `n & (n-1)` clears the lowest set bit).
- **Lowest set bit**: `n & (-n)`. **Clear lowest set bit**: `n & (n - 1)`.
- **Count set bits (popcount)**: repeatedly `n &= n-1` (loops once per set bit), or a builtin.
- **Multiply/divide by 2ᵏ**: `n << k` / `n >> k`.

## XOR Superpowers

XOR has the properties `x ^ x = 0`, `x ^ 0 = x`, and it's commutative/associative. This solves:
- **Find the single number** where every other appears twice: XOR them all — pairs cancel, the unique survives. O(n) time, O(1) space, no hash set.
- **Missing number** in 0..n: XOR all indices and values.
- **Swap without a temp**: `a ^= b; b ^= a; a ^= b` (rarely needed, but iconic).

## Bitmasks: Sets as Integers

An integer's bits represent membership in a small set (bit i = element i present). This gives:
- **Subset enumeration** — iterate `for mask in range(1<<n)` over all 2ⁿ subsets; `mask & (1<<i)` tests membership.
- **Bitmask DP** — state = which items are used/visited (Traveling Salesman, assignment problems) for n ≤ ~20.
- **Iterate submasks** of a mask: `sub = (sub - 1) & mask`.
- **Flags/permissions** — pack many booleans into one integer; combine with OR, test with AND.

## When to Use It

Problems mentioning "without extra space", "appears once/twice", "power of two", "count bits", small-set state (n ≤ 20) for DP, or packing flags. It's O(1) per operation and cache-friendly.

## Pitfalls

- **Operator precedence** — bitwise ops bind loosely; parenthesize (`(n >> i) & 1`, not `n >> i & 1` in some languages).
- **Signed shifts / integer width** — right-shifting negatives and fixed-width overflow differ by language; mind the sign bit and int size.
- **Off-by-one on bit indices** (0-based) and masks (`1 << n` for n bits).
- Don't over-use it where clear code matters — bit tricks are terse; comment them.
