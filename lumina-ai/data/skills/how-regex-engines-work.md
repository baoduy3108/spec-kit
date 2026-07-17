---
name: how-regex-engines-work
description: How a regex engine matches — compiling a pattern to an NFA/DFA, the difference between DFA engines (linear time, no backtracking) and backtracking engines (support backreferences/lookaround but can blow up), and why catastrophic backtracking (ReDoS) happens. Use to understand regex performance, ReDoS, and why engines differ in features and speed.
category: engineering
keywords_vi: regex engine hoạt động thế nào, nfa dfa, backtracking regex, catastrophic backtracking redos, cơ chế khớp regex, vì sao regex chậm, hiểu regex sâu
---

# How Regex Engines Work

A regex is compiled into a state machine that consumes input characters and transitions between states; a match is reaching an accept state.

## NFA vs DFA

A pattern compiles to a **finite automaton**:
- **NFA (nondeterministic)** — from a state, a character may allow several transitions. Conceptually the engine explores possibilities.
- **DFA (deterministic)** — every (state, character) has exactly one next state.

An NFA can be converted to a DFA. A **DFA engine** (RE2, Go's regexp, awk) matches in **O(n)** time in the input length — no matter how nasty the pattern — because it never backtracks. The trade: DFAs can't support backreferences (`\1`) or some lookaround.

## Backtracking Engines

Most mainstream engines (PCRE, Perl, Python `re`, JavaScript, Java) are **backtracking**: they try one path, and on failure *back up* and try another. This is what enables **backreferences** and rich **lookaround** — but it means a single input can force exponential exploration.

## Catastrophic Backtracking (ReDoS)

With **nested/overlapping quantifiers** — `(a+)+$`, `(\w+\s*)*` — a non-matching input makes a backtracking engine try an exponential number of ways to split the string before giving up. A 30-character string can hang the thread for seconds or minutes. This is a real **denial-of-service** vector (ReDoS) when running user-controlled patterns or matching untrusted input against a vulnerable pattern.

Mitigations: avoid ambiguous nested quantifiers; make patterns unambiguous (stricter classes, anchors, atomic/possessive groups where supported); cap input length; add a match timeout; or use a **DFA engine (RE2)** which is immune by construction (at the cost of backreferences).

## Practical Takeaways

- **Feature vs safety trade-off** — need backreferences/lookaround → backtracking engine (accept ReDoS risk); need guaranteed linear time on untrusted input → RE2/DFA.
- Anchoring (`^…$`) and specific character classes reduce the search space and speed matching.
- The reason "the same regex is fast in Go but hangs in Python" is the engine type, not the pattern.
