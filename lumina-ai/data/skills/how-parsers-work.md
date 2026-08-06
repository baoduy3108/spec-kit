---
name: how-parsers-work
description: How parsers work — turning a flat sequence of tokens into a structured tree by grammar rules, recursive descent vs parser generators, handling precedence and ambiguity, and error recovery. Use to understand parsing, building a parser, recursive descent, grammars, or how languages/config/data formats are parsed into structure.
category: engineering
keywords_vi: how parsers work, parser hoạt động thế nào, biến chuỗi token thành cây có cấu trúc, recursive descent parser generator, độ ưu tiên precedence, mơ hồ ambiguity, error recovery, grammar
---

# How Parsers Work

A parser takes a **flat sequence** (of characters or tokens) and builds a **structured representation** (a tree) according to a **grammar** — the rules of the language. Parsing is everywhere: programming languages (see how-compilers-work, how-interpreters-work), config/data formats (JSON/YAML — see how-json-serialization-works), query languages, markup, math expressions. Understanding it demystifies "how does the computer understand this text?"

## Tokenizing First (usually)

Parsing typically follows **lexing/tokenizing** (see how-compilers-work): raw characters are grouped into **tokens** (`123`, `+`, `if`, `"hello"`). The parser then works on tokens, not raw characters — separating "what are the words" from "how do the words fit together." (Some parsers combine the two — scannerless parsing.)

## The Grammar & the Tree

A **grammar** defines the valid structure via rules (e.g. "an expression is a term, then + or −, then another expression"). The parser applies these rules to the token stream to build an **Abstract Syntax Tree (AST)** — a tree capturing the *structure*: `2 + 3 * 4` becomes a tree where `*` binds tighter than `+`, encoding that multiplication happens first. The AST, not the flat text, is what downstream code (compilers, interpreters, evaluators) operates on. Parsing = recovering structure from a flat sequence per the grammar.

## Two Main Approaches

- **Recursive descent (hand-written)** — write a **function per grammar rule** that consumes tokens and recursively calls other rule-functions. `parseExpression` calls `parseTerm` calls `parseFactor`, mirroring the grammar. Intuitive, easy to write and give good errors, full control — the most common way to hand-build a parser (it's a top-down, predictive parser for LL grammars). PEG parsers are related.
- **Parser generators** — feed a grammar to a tool (yacc/bison, ANTLR) that **generates** a parser (often bottom-up LR). Handles complex grammars and is less manual, but generated code is harder to customize and debug. Good for large/formal grammars.

## Precedence & Associativity

A core challenge: operators have **precedence** (`*` before `+`) and **associativity** (left/right). The parser must build the tree so `2 + 3 * 4` groups the multiplication first, and `a - b - c` groups left-to-right. Techniques: structuring grammar rules by precedence level, or **precedence-climbing / Pratt parsing** (elegant for expressions). Getting this right is what makes `2 + 3 * 4` equal 14, not 20.

## Ambiguity & Error Recovery

- **Ambiguity** — a grammar where one input has multiple valid parse trees (the classic "dangling else") is a problem; resolve via grammar design or precedence rules.
- **Error recovery** — real parsers must handle **invalid** input gracefully: report a clear error (where and what — "expected `)` at line 5"), and ideally **recover** to keep parsing and find more errors rather than dying on the first. Good error messages are a hallmark of a good parser (and hard to do well).

## Pitfalls (in understanding/using)

- **Parsing with regex** for nested/recursive structures (HTML, code, balanced brackets) → regex can't handle recursion (see how-regex-engines-work); use a real parser.
- Botching **precedence/associativity** → `2 + 3 * 4` computed wrong; structure the grammar/use precedence climbing.
- **Ambiguous grammars** → unpredictable parses; design them unambiguously.
- **Poor error handling** — cryptic errors or dying on the first mistake; report clearly and recover.
- Conflating **lexing** (tokens) and **parsing** (structure) — separating them simplifies both.
- Hand-writing a parser for a **complex** formal grammar where a generator would be safer (or using a heavyweight generator for a trivial format).
- Forgetting the output is the **AST** (structure), which is what downstream logic uses.
