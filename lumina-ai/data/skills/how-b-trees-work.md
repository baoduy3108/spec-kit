---
name: how-b-trees-work
description: How B-trees and B+ trees work — balanced, high-fanout search trees that power database and filesystem indexes, why they minimize disk I/O, node splitting/merging, and how range scans work. Use to understand database indexes, B-trees/B+ trees, why indexes speed up queries, or how sorted on-disk data structures work.
category: engineering
keywords_vi: b-tree hoạt động thế nào, b+ tree, chỉ mục database index, cây cân bằng, giảm i/o đĩa, node split, range scan, cấu trúc dữ liệu sắp xếp trên đĩa
---

# How B-Trees Work

B-trees (and their variant **B+ trees**) are the data structure behind almost every database and filesystem index. They keep data **sorted** and allow search, insert, delete, and **range scans** in `O(log n)` while being optimized for the real bottleneck: **disk/page I/O**.

## Why Not a Binary Tree?

A balanced binary search tree is `O(log₂ n)` too — but each node holds one key, so `n` items means ~`log₂ n` **pointer chases**, each potentially a separate disk page read. Disk reads are ~million× slower than comparisons, so the *number of pages touched* dominates. B-trees fix this by making nodes **big and wide**.

## High Fanout — the key idea

Each B-tree node holds **many keys** (hundreds) and is sized to **one disk page/block**. With fanout `b`, the tree height is `log_b n` — very shallow. A B-tree over millions of rows is often just **3–4 levels deep**, so a lookup reads only 3–4 pages. Fewer, larger reads beat many tiny ones. This "wide and shallow" shape is the whole point.

## Structure & Balance

- Keys in each node are **sorted**; a node with `k` keys has `k+1` child pointers, each covering a key range (a generalization of BST ordering).
- The tree stays **balanced** automatically: all leaves are at the same depth. Inserts that overfill a node **split** it (pushing a key up, occasionally growing the tree by one level at the root); deletes that underfill **merge/rebalance**. Nodes are kept at least half-full, guaranteeing the height bound.

## B+ Tree (what databases actually use)

In a **B+ tree**, **all values live in the leaves**, and interior nodes hold only keys for routing. Leaves are **linked in a sorted list**. Two big benefits:
- Interior nodes hold *only* keys → even higher fanout → shallower tree.
- **Range scans are fast**: find the start leaf, then walk the leaf linked-list sequentially (`WHERE age BETWEEN 20 AND 30`, `ORDER BY`). This is why a B+ tree index accelerates ranges and sorts, not just equality.

## Why Indexes Speed Up Queries

A DB index is a B+ tree keyed on a column. Without it, the DB scans every row (`O(n)`); with it, it navigates the tree (`O(log n)`) to the matching rows. The trade-off: indexes **cost space and slow writes** (every insert/update maintains the tree), so index the columns you filter/join/sort on — not everything (see sql-query-optimization, database-schema-design).

## Pitfalls (in understanding/using)

- Confusing B-tree with binary tree — B-trees are wide/shallow by design for I/O.
- Over-indexing — each index taxes every write and uses space.
- Expecting an index to help a query that can't use it (leading-column rule for composite indexes; functions on the column; low-selectivity predicates).
- Forgetting B+ tree leaf-linking is what makes range/sort fast (vs a plain hash index — `O(1)` equality but no ranges; see how-hash-tables-work).
- Ignoring that random inserts cause page splits/fragmentation; sequential keys pack better.
