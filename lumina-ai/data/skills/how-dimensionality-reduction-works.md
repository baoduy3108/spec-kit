---
name: how-dimensionality-reduction-works
description: How dimensionality reduction works — compressing many features into few while preserving structure, PCA (principal components capturing maximum variance), t-SNE/UMAP for visualization, the curse of dimensionality it fights, and uses (visualization, denoising, speeding up models). Use to understand dimensionality reduction, PCA, t-SNE/UMAP, the curse of dimensionality, or visualizing high-dimensional data.
category: ai-agent
keywords_vi: dimensionality reduction, giảm chiều dữ liệu, pca principal component, phương sai lớn nhất, t-sne umap trực quan hóa, curse of dimensionality, nén đặc trưng
---

# How Dimensionality Reduction Works

Dimensionality reduction compresses data with **many features** (dimensions) into far fewer, while keeping the important structure. It fights the "curse of dimensionality," enables visualization, and speeds up downstream models.

## The Curse of Dimensionality (why we need it)

In high dimensions, data becomes **sparse** and distances lose meaning — everything is roughly equidistant, so similarity/clustering (see how-clustering-works) and many models degrade. High dimensions also mean more parameters, more overfitting risk, and heavier compute. Reducing to the dimensions that actually carry information helps on all fronts. Crucially, real high-dimensional data usually lies near a **lower-dimensional manifold** — there's less "true" structure than the raw dimension count suggests.

## PCA (the linear workhorse)

**Principal Component Analysis** finds new axes — **principal components** — that are linear combinations of the original features, ordered by how much **variance** (spread/information) they capture:
- The 1st component is the direction of **maximum variance** in the data; the 2nd is the next, orthogonal to the first; and so on.
- Keep the top few components (which capture most of the variance) and drop the rest → fewer dimensions, minimal information lost.
It's fast, deterministic, and interpretable (each component is a weighted mix of features). Great for **compression, denoising** (the dropped components are often noise), and preprocessing before other models. Limitation: it's **linear**, so it can't capture curved/nonlinear structure.

## t-SNE & UMAP (for visualization)

To **visualize** high-dimensional data in 2D/3D, nonlinear methods work better:
- **t-SNE** and **UMAP** place points so that **nearby points stay nearby**, revealing clusters/structure the eye can see. UMAP is faster and better preserves global structure; t-SNE excels at local clusters.
These are mainly for **exploration/visualization**, not as features for models. Read them cautiously (below).

## Uses

- **Visualization** — see clusters/patterns in embeddings or data (t-SNE/UMAP).
- **Preprocessing** — fewer, decorrelated features → faster, less overfit models (PCA).
- **Denoising & compression** — drop low-variance/noise dimensions.
- **Exploration** — understand what varies in your data.

## Pitfalls (in understanding/using)

- **Not scaling features** before PCA — high-variance-by-units features dominate the components; standardize first.
- Over-interpreting **t-SNE/UMAP** plots — cluster **sizes** and **distances between clusters** are often not meaningful; only local neighborhoods are reliable, and results vary with hyperparameters (perplexity/n_neighbors). Don't draw quantitative conclusions from them.
- Using t-SNE/UMAP output as **model features** (they're for visualization; unstable, non-parametric).
- Discarding too many components → losing real signal (check cumulative explained variance).
- Assuming PCA captures everything — it's linear; nonlinear structure needs other methods (autoencoders, UMAP).
- Reducing dimensions when you didn't need to (adds a step and can hurt if the features were all informative).
