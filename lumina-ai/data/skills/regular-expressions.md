---
name: regular-expressions
description: Write, read, and debug regular expressions — anchors, character classes, quantifiers (greedy vs lazy), groups and backreferences, lookahead/lookbehind, and the catastrophic-backtracking (ReDoS) trap. Use when building or fixing a regex for validation, extraction, or search-and-replace.
category: engineering
keywords_vi: regex, biểu thức chính quy, regular expression, viết regex, regex không khớp, tìm kiếm thay thế pattern, bắt chuỗi bằng regex
---

# Regular Expressions

Build regexes incrementally and test against real inputs including edge cases (empty, unicode, the almost-matches). A regex that passes your three happy examples often fails on input #4.

## Building Blocks

- **Anchors**: `^` start, `$` end, `\b` word boundary. Forgetting anchors is the #1 validation bug — `\d{4}` matches a 4-digit run *inside* longer text; `^\d{4}$` matches only exactly four digits.
- **Character classes**: `[a-z]`, `[^…]` (negation), shorthands `\d \w \s` (and `\D \W \S`). Prefer explicit classes over `.` when you know the alphabet.
- **Quantifiers**: `*` (0+), `+` (1+), `?` (0/1), `{m,n}`. **Greedy by default** — `.*` grabs as much as possible; add `?` for **lazy** (`.*?`) to grab as little.
- **Groups**: `(…)` capturing, `(?:…)` non-capturing (use when you only need grouping, not capture), `(?<name>…)` named. Backreference with `\1` or `\k<name>`.
- **Alternation**: `a|b` — bound it with a group: `^(cat|dog)$`, not `^cat|dog$` (which means `^cat` OR `dog$`).
- **Lookaround**: `(?=…)` lookahead, `(?!…)` negative, `(?<=…)`/`(?<!…)` lookbehind — assert context without consuming it.

## The Big Trap: Catastrophic Backtracking (ReDoS)

Nested quantifiers over overlapping patterns — `(a+)+$`, `(\w+\s*)*` — can take exponential time on a non-matching input, hanging the process. This is a real denial-of-service vector on user-supplied input. Avoid nested/ambiguous quantifiers; make patterns unambiguous (e.g., possessive/atomic groups where supported, or a stricter class). Never run an untrusted regex against untrusted input.

## Practical Rules

- **Don't parse HTML/JSON/nested structures with regex** — use a real parser. Regex can't match balanced nesting.
- **Escape literals**: `.` `*` `+` `?` `(` `)` `[` `]` `{` `}` `^` `$` `|` `\` are special — escape with `\` to match literally.
- **Know your flavor**: PCRE, JS, Python `re`, Go RE2 (no backtracking, so no lookbehind but no ReDoS) differ. RE2/Go is safe against ReDoS by design.
- **Comment complex patterns** with the `x`/verbose flag, or build them from named parts in code.
- **Validate loosely, then verify** — for emails/URLs, a simple regex + a real check beats a monstrous "perfect" regex.
