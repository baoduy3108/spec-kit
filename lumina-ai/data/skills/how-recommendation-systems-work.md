---
name: how-recommendation-systems-work
description: How recommendation systems work — collaborative filtering (user/item similarity, matrix factorization), content-based filtering, hybrid approaches, implicit vs explicit feedback, and the cold-start problem. Use to understand "recommended for you"/"people also bought" features and how to build or reason about recommenders.
category: ai-agent
keywords_vi: recommendation system hoạt động thế nào, hệ thống gợi ý, collaborative filtering, content-based, gợi ý sản phẩm, ma trận phân rã, cold start, người dùng cũng mua
---

# How Recommendation Systems Work

Recommenders predict what a user will like from patterns in behavior and item attributes — powering "recommended for you," "people also bought," and content feeds.

## Collaborative Filtering (the workhorse)

"People similar to you liked X, so you might too" — it uses the **interaction matrix** (users × items) without needing to understand the items:
- **User-based** — find users with similar taste, recommend what they liked.
- **Item-based** — "users who liked A also liked B"; recommend items similar in how people interact with them (often more stable and scalable).
- **Matrix factorization** — decompose the sparse user-item matrix into low-dimensional **latent factors** (learned "taste dimensions"); predict a missing rating as the dot product of user and item factors. Scales and generalizes better than raw similarity. (Modern systems use neural/embedding versions of this idea — see vector-embeddings.)

## Content-Based Filtering

"You liked action movies, here are more action movies" — recommend items **similar in attributes** to ones the user liked (genre, tags, text). Doesn't need other users' data (good for niche items), but can trap the user in a **filter bubble** of near-duplicates and can't surprise them.

## Hybrid (what real systems use)

Combine collaborative + content-based (and popularity, recency, business rules) to get the strengths of each. Netflix/Amazon/Spotify-style systems blend many signals and re-rank for diversity and freshness.

## Implicit vs Explicit Feedback

- **Explicit** — ratings, likes, thumbs. Clear but sparse (few people rate).
- **Implicit** — clicks, watches, purchases, dwell time, skips. Abundant but noisy (a click isn't always a like; a purchase might be a gift). Most production systems lean on implicit signals and model them carefully (a skip is negative signal).

## The Cold-Start Problem (the classic challenge)

Collaborative filtering needs interaction history — so it struggles with:
- **New users** (no history) — fall back to popularity, onboarding preferences, or content-based.
- **New items** (no interactions) — use content attributes until interactions accumulate.
Hybrid systems exist largely to cover cold-start.

## Design & Pitfalls

- **Diversity & serendipity** — pure "most similar" recommendations get repetitive; deliberately inject variety.
- **Popularity bias** — popular items get recommended more, get more interactions, get recommended more (a feedback loop that buries the long tail).
- **Filter bubbles** — over-narrowing to past behavior.
- **Evaluation** — offline metrics (precision@k) don't fully predict real engagement; A/B test.
- **Feedback loops** — the system shapes the behavior it then learns from; guard against runaway loops.
