---
name: how-syntax-highlighting-works
description: How syntax highlighting works — tokenizing/lexing source code into typed tokens (keywords, strings, comments), mapping token types to colors, regex/grammar-based vs parser-based approaches (TextMate grammars, Tree-sitter), and incremental highlighting in editors. Use to understand syntax highlighting, code coloring, TextMate grammars, Tree-sitter, or building a highlighter.
category: engineering
keywords_vi: how syntax highlighting works, tô màu cú pháp hoạt động thế nào, lexing token loại từ khóa chuỗi comment, map token sang màu, regex grammar vs parser, textmate tree-sitter, incremental
---

# How Syntax Highlighting Works

Syntax highlighting colors source code so keywords, strings, comments, and identifiers are visually distinct — making code far easier to read. It's a small but ubiquitous feature (every code editor, many docs), and it's essentially a **lightweight parsing** problem (see how-parsers-work, how-compilers-work).

## The Core: Tokenize, Then Color

Highlighting has two conceptual steps:
1. **Tokenize (lex)** — scan the code and classify each piece into a **token type**: keyword (`if`, `return`), string literal, number, comment, operator, identifier, etc. (see how-compilers-work's lexing). This is the same first step a compiler does — break the flat text into meaningful, typed chunks.
2. **Map token type → color/style** — a **theme** assigns colors to token types (keywords blue, strings green, comments gray). The editor renders each token in its style.
So highlighting = figure out *what each piece of code is*, then color it accordingly. The intelligence is in the tokenizing.

## Approach 1: Regex / Grammar-Based (TextMate grammars)

The traditional, widespread approach (VS Code, Sublime, many editors) uses **TextMate grammars** — a set of **regular expressions** (see how-regex-engines-work) with rules for matching each token type and handling nested contexts (a string inside code, code inside a template). It's:
- **Lightweight and language-agnostic** — write regex rules per language; no full parser needed.
- **Good enough** for most highlighting.
- **But imprecise** — regex can't truly understand code structure (it can't fully handle nesting/recursion — see how-parsers-work), so it makes mistakes on complex/ambiguous code (mis-coloring, confused by edge cases). It's pattern-matching, not real parsing.

## Approach 2: Parser-Based (Tree-sitter)

The modern, more accurate approach (**Tree-sitter**, used by many editors now) actually **parses** the code into a syntax tree (see how-parsers-work) and highlights based on the real structure. Benefits:
- **Accurate** — it understands the grammar, so it highlights correctly even in tricky cases (distinguishing a function call from a definition, handling nesting properly).
- **Structural queries** — highlight based on *role* (this identifier is a function name vs a variable), not just token shape.
- **Incremental** (below).
The cost is needing a real grammar/parser per language, but the accuracy is worth it.

## Incremental Highlighting (for editors)

In a live editor, re-tokenizing the **whole file** on every keystroke would be slow for large files. So editors highlight **incrementally** — re-process only the **changed region** (and any context it affects), reusing the rest. Tree-sitter is designed for exactly this: it **re-parses only the edited part** of the tree, enabling fast, accurate highlighting as you type even in huge files (see the diff/incremental idea in how-diff-algorithms-work).

## Pitfalls (in understanding/using)

- Expecting **regex-based** highlighting to be perfectly accurate — it can't truly parse; complex/nested code gets mis-highlighted (that's why parser-based Tree-sitter exists).
- **Re-highlighting the whole file** on each edit → laggy editor; highlight incrementally.
- Confusing **highlighting** (fast, approximate, per-token coloring) with full **semantic** analysis (types, scopes — that's a language server's job, deeper than highlighting).
- Assuming highlighting understands **meaning** — basic highlighting is syntactic (token types), not semantic (it may color an unknown function the same as a known one).
- Theme mapping token types poorly → low-contrast/unreadable colors (accessibility — see color-mode-and-theme).
- Grammar bugs causing a mis-match to "leak" (e.g. an unterminated string coloring the rest of the file).
