---
name: how-clustering-works
description: How clustering (unsupervised grouping) works — k-means and its centroids/iterations, choosing k (elbow/silhouette), density-based (DBSCAN) and hierarchical clustering, distance/scaling issues, and when clustering helps. Use to understand clustering, k-means, DBSCAN, unsupervised learning, or grouping data without labels.
category: ai-agent
keywords_vi: clustering, phân cụm, gom nhóm không giám sát, k-means centroid, chọn k elbow silhouette, dbscan mật độ, hierarchical clustering, unsupervised learning
---

# How Clustering Works

Clustering is **unsupervised** learning: grouping data points so that similar ones fall together, **without any labels**. It's how you discover natural structure — customer segments, related documents, anomaly groups — when you don't already know the categories.

## The Goal

Given points and a notion of **distance/similarity**, partition them into **clusters** where points in a cluster are close to each other and far from other clusters. Unlike classification, there's no "right answer" to learn — you're finding structure, so evaluation is trickier.

## K-Means (the workhorse)

The most common algorithm. You pick **k** (number of clusters), then iterate:
1. **Initialize** k cluster centers (**centroids**), often randomly (k-means++ picks smarter starts).
2. **Assign** each point to its nearest centroid.
3. **Update** each centroid to the mean of its assigned points.
4. Repeat 2–3 until assignments stop changing.
It converges to a local optimum. Simple, fast, scalable — but it assumes **roughly spherical, similarly-sized clusters**, is sensitive to initialization (run several times), and **needs k chosen in advance**.

## Choosing k

Since you specify k, how many? Heuristics:
- **Elbow method** — plot within-cluster variance vs k; look for the "elbow" where adding clusters stops helping much.
- **Silhouette score** — measures how well-separated clusters are; pick k that maximizes it.
There's rarely one "correct" k — domain knowledge matters.

## Other Approaches (when k-means doesn't fit)

- **DBSCAN (density-based)** — groups points in **dense** regions and labels sparse points as **noise/outliers**. It finds **arbitrarily shaped** clusters and **doesn't need k** — you set density parameters instead. Great for irregular shapes and outlier detection; struggles with varying densities.
- **Hierarchical clustering** — builds a tree (dendrogram) of nested clusters by successively merging (or splitting); you cut the tree at a chosen level. No preset k, and the dendrogram is interpretable, but it's slower on large data.
- **Gaussian Mixture Models** — soft clustering (probabilistic membership).

## Distance & Scaling Matter

Clustering depends entirely on the **distance metric**, and distances are dominated by large-scale features. **Standardize/normalize** features first (see feature-engineering) or one feature (e.g. income) swamps others (e.g. age). High dimensions also weaken distance meaning (curse of dimensionality) — consider dimensionality reduction first (see how-dimensionality-reduction-works).

## Pitfalls (in understanding/using)

- **Not scaling features** → distance dominated by big-magnitude features; standardize first.
- Forcing **k-means** on non-spherical/varying-density clusters — use DBSCAN/hierarchical instead.
- Treating **k** as objective — it's a choice; validate with elbow/silhouette + domain sense.
- Over-interpreting clusters as "real" categories — clustering always returns *something*; check it's meaningful.
- Ignoring initialization sensitivity in k-means (run multiple times / use k-means++).
- Clustering in high dimensions without reduction (distances blur).
