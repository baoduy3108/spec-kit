---
name: string-matching-algorithms
description: How efficient substring search works — the naive approach's cost, and the smart algorithms (KMP's failure function, Rabin-Karp's rolling hash, Boyer-Moore's skipping) that avoid rechecking characters. Use when implementing or understanding substring/pattern search, text search performance, or interview problems on string matching.
category: engineering
keywords_vi: string matching, tìm chuỗi con substring search, thuật toán khớp mẫu, kmp failure function, rabin-karp rolling hash, boyer-moore, tìm kiếm văn bản hiệu quả
---

# String Matching Algorithms

String matching — finding occurrences of a **pattern** within a **text** — is a fundamental operation (search, grep, DNA analysis, plagiarism detection). The naive method is simple but slow; classic algorithms achieve linear time by being clever about **not rechecking** characters.

## The Naive Approach & Its Cost

Try the pattern at every position in the text; at each, compare character by character. Worst case `O(n·m)` (text length n, pattern length m) — e.g. text `aaaa...a` and pattern `aaa...ab` rechecks almost everything at each shift. The smart algorithms all avoid this redundant re-comparison.

## KMP (Knuth-Morris-Pratt) — `O(n+m)`

Insight: when a partial match fails, we already **know** the matched prefix, so we needn't restart from scratch. KMP precomputes a **failure function** (longest proper prefix that's also a suffix) for the pattern. On a mismatch, it uses this table to shift the pattern to the next **potentially-matching** alignment **without moving backward in the text**. Result: each text character is examined a constant number of times → linear. Great worst-case guarantee.

## Rabin-Karp — hashing + rolling hash

Insight: compare **hashes** instead of characters. Compute a hash of the pattern and of each text window; only when hashes match do you verify character-by-character (guarding against hash collisions). The trick is a **rolling hash**: computing the next window's hash in `O(1)` from the previous (slide off one char, add the next) instead of rehashing the whole window. Average `O(n+m)`. Especially good for **multiple-pattern** search (hash a set) and 2D/plagiarism matching. Worst case degrades with many hash collisions.

## Boyer-Moore — skip ahead

Insight: match the pattern **right-to-left** and, on a mismatch, **skip ahead** by large amounts using two heuristics:
- **Bad character rule** — if the mismatched text character isn't in the pattern (or is far), jump past it.
- **Good suffix rule** — use the matched suffix to shift smartly.
Boyer-Moore can be **sub-linear** in practice (it skips characters it never even looks at) — which is why it (and variants like Boyer-Moore-Horspool) powers many real `grep`/text-search implementations. Best for **long patterns** and large alphabets.

## Choosing

- **KMP** — guaranteed linear, simple failure function; good default worst-case.
- **Rabin-Karp** — multiple patterns, rolling-hash scenarios, 2D matching.
- **Boyer-Moore** — fastest in practice for single long patterns / large alphabets (real-world text search).
For most everyday needs, your language's built-in `str.find`/regex (see how-regex-engines-work) already uses optimized versions — reach for these when implementing or in interviews.

## Pitfalls (in understanding/using)

- Using the **naive** `O(n·m)` search in a hot path on large text — use a linear algorithm or the stdlib.
- Rabin-Karp without **verifying** on hash match → false positives from collisions.
- Forgetting Rabin-Karp's power is the **rolling** hash (don't rehash each window from scratch).
- Reimplementing these when the **standard library / regex** already does it efficiently.
- Ignoring preprocessing cost for tiny inputs (naive is fine for short strings).
- Boyer-Moore's benefit shrinks for short patterns / small alphabets.
