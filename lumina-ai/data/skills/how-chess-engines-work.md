---
name: how-chess-engines-work
description: How chess engines work — board representation, move generation, the minimax search with alpha-beta pruning, evaluation functions, search optimizations (transposition tables, iterative deepening), and the shift to neural-net evaluation (NNUE/AlphaZero). Use to understand chess engines, game-tree search, alpha-beta pruning, minimax, or building a game AI.
category: engineering
keywords_vi: chess engine, cờ vua, minimax alpha-beta, transposition table, evaluation cờ vua, biểu diễn bàn cờ sinh nước đi, iterative deepening, nnue alphazero
---

# How Chess Engines Work

A chess engine plays chess by **searching** possible move sequences and choosing the best. The classic approach — minimax search with alpha-beta pruning plus a good evaluation function — is a masterclass in game AI, and applies to many turn-based games (see game-theory-basics, game-design-fundamentals).

## Board Representation & Move Generation

- **Board representation** — how the position is stored. Efficient engines use **bitboards** (a 64-bit integer per piece type, one bit per square — see how-transistors-and-logic-gates-work / bit-manipulation) so move generation and attacks are fast bitwise operations.
- **Move generation** — given a position, produce all **legal moves** (respecting piece rules, check, pins, castling, en passant). Fast, correct move generation is foundational — it's the branching of the search tree.

## The Search: Minimax + Alpha-Beta

The engine looks ahead by building a **game tree** of moves and countermoves:
- **Minimax** — assume both players play optimally: you **maximize** your outcome, the opponent **minimizes** it (see game-theory-basics). Search down to some depth, evaluate the leaf positions, and propagate the best achievable value back up. The move leading to the best guaranteed outcome is chosen.
- **Alpha-beta pruning** — the crucial optimization: **skip** branches that can't affect the result. If one move already refutes a line (the opponent has a response making it worse than an already-found alternative), stop searching that line — it won't be chosen. With good move ordering, alpha-beta prunes so much it roughly **doubles** the searchable depth for the same effort. Without it, deep search is infeasible; with it, engines see many moves ahead.

## Evaluation Function

At the leaves (where you stop searching), you can't search further, so you **evaluate** the position with a heuristic — a number estimating who's winning. Classic evaluation sums: **material** (piece values), **position** (piece placement, king safety, pawn structure, mobility, center control). A better evaluation = better play. The search finds the move leading to the best-evaluated reachable position.

## Search Optimizations

Real engines add many tricks to search deeper:
- **Iterative deepening** — search depth 1, then 2, then 3... using earlier results to order moves (better move ordering → more alpha-beta pruning) and to stop anytime within a time budget.
- **Transposition tables** — cache evaluated positions (many move orders reach the same position) so you don't re-search them (see caching-strategies, how-hash-tables-work) — using Zobrist hashing to key positions.
- **Quiescence search** — extend search in "noisy" positions (captures/checks) to avoid the "horizon effect" (stopping mid-exchange and misjudging).
- **Pruning heuristics** — null-move pruning, late-move reductions, etc.

## The Neural Network Shift

Modern strength jumped with learned evaluation:
- **AlphaZero** — learned to play from self-play using a neural network for evaluation + Monte Carlo Tree Search (a different search — see reinforcement-learning-basics), reaching superhuman play with no human knowledge.
- **NNUE** — efficient neural-network evaluation that runs fast on CPUs, adopted by traditional engines (Stockfish) — replacing hand-crafted evaluation with a learned one while keeping alpha-beta search. The combination of deep search + neural evaluation is today's state of the art.

## Pitfalls (in understanding/using)

- **No alpha-beta pruning** → far shallower search; pruning (with good move ordering) is essential.
- **Bad move ordering** → less pruning → wasted search (order likely-best moves first).
- **Weak evaluation** → the search optimizes toward a bad heuristic; evaluation quality caps play.
- **Horizon effect** — stopping search mid-tactics and misjudging; add quiescence search.
- Ignoring **transposition tables** → re-searching identical positions (huge waste).
- Assuming brute-force depth alone wins — evaluation and pruning matter as much as depth.
- Overlooking that modern strength comes from **learned evaluation** (NNUE/AlphaZero), not just deeper classic search.
