---
name: trie-prefix-tree
description: The trie (prefix tree) data structure — store a set of strings as a tree of characters for O(L) insert/lookup and efficient prefix queries, autocomplete, and word-search. Use for autocomplete/typeahead, prefix matching, dictionary/spell problems, and word-grid search.
category: engineering
keywords_vi: trie, prefix tree, cây tiền tố, autocomplete gợi ý, tìm theo tiền tố, từ điển tìm từ, word search, cấu trúc dữ liệu chuỗi
---

# Trie (Prefix Tree)

A trie stores strings by their shared prefixes: each node is a character, each root-to-node path spells a prefix, and paths that end a word are marked. It makes prefix operations fast and natural.

## Structure

Each node has: children (a map char→node, or a fixed array for a known alphabet) and an `is_end` flag marking a complete word.
```
class Node: children = {}; is_end = False
def insert(word):
    node = root
    for ch in word:
        node = node.children.setdefault(ch, Node())
    node.is_end = True
def search(word):        # exact word
    node = walk(word); return node is not None and node.is_end
def starts_with(prefix): # any word with this prefix
    return walk(prefix) is not None
```
Insert and lookup are **O(L)** (length of the word) — independent of how many words are stored, unlike scanning a list.

## What It's Great For

- **Autocomplete / typeahead** — walk to the prefix node, then DFS to collect all words beneath it. This is the canonical use.
- **Prefix matching / longest-prefix** — routing tables, dictionary prefix checks.
- **Word search in a grid (Boggle)** — combine a trie of the dictionary with DFS/backtracking to prune paths that aren't a prefix of any word — a big speedup over checking each word separately.
- **Spell-check / word games**, IP routing (bitwise tries), and **XOR/maximum-pair** problems (binary tries over bits).

## Trade-offs

- **Fast prefix queries and shared-prefix compression** vs a hash set (which does exact O(1) lookup but can't do prefix queries).
- **Memory** — a node per character can be heavy; use arrays for small alphabets, maps for large, or a **compressed trie (radix tree)** that merges single-child chains to save space.
- For pure exact membership with no prefix needs, a hash set is simpler.

## Pitfalls

- Forgetting the `is_end` flag → can't distinguish a stored word from a mere prefix ("app" vs "apple").
- Memory blow-up with a naive per-char map over a huge dictionary — consider radix/compressed variants.
- Case/normalization consistency (store and query in the same normalized form).
