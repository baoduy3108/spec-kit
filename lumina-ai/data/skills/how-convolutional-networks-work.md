---
name: how-convolutional-networks-work
description: How convolutional neural networks (CNNs) work — convolution filters detecting local features, weight sharing and translation invariance, pooling, the hierarchy from edges to objects, and why CNNs suit images. Use to understand CNNs, convolution, image classification networks, feature maps, or why CNNs beat dense nets on images.
category: ai-agent
keywords_vi: cnn, convolutional neural network, mạng tích chập, bộ lọc convolution filter, chia sẻ trọng số, pooling, bất biến dịch chuyển, phân loại ảnh
---

# How Convolutional Neural Networks Work

Convolutional Neural Networks (CNNs) are the architecture that made computer vision work (see computer-vision-basics). They're designed around the structure of images — that meaningful features are **local** and can appear **anywhere** — making them vastly more efficient than plain dense networks for visual data.

## Why Not a Plain Dense Network?

A fully-connected network treating every pixel as an independent input would have an enormous number of weights (a megapixel image → millions of inputs × neurons) and would need to learn the same pattern separately for every position. It ignores that images have **spatial structure**. CNNs exploit that structure.

## Convolution: Local Feature Detectors

The core operation is **convolution**: a small **filter** (kernel, e.g. 3×3 weights) slides across the image, computing a weighted sum at each position, producing a **feature map**. Each filter learns to detect a specific **local pattern** — an edge, a corner, a color blob, a texture. Key properties:
- **Local connectivity** — each output looks at a small patch, matching how visual features are local.
- **Weight sharing** — the *same* filter is used at every position. So the network learns "detect a vertical edge" **once** and applies it everywhere → far fewer parameters, and **translation invariance** (a cat is recognized wherever it appears, because the same detectors scan the whole image).
Many filters per layer produce many feature maps (many detected features).

## Pooling: Downsampling

**Pooling** (e.g. max-pooling) shrinks feature maps by summarizing each small region (taking the max/average). This reduces computation, adds robustness to small shifts, and grows the **receptive field** (each deeper unit "sees" a larger area of the original image).

## The Hierarchy (why depth matters)

Stacking convolution+pooling layers builds a **feature hierarchy**:
- Early layers detect **simple** features (edges, colors).
- Middle layers combine these into **parts** (eyes, wheels, textures).
- Deep layers combine parts into **objects/concepts** (faces, cars).
The network learns increasingly abstract representations, culminating in a classifier. This edges→parts→objects progression mirrors how visual understanding is built up, and it's learned automatically from data.

## Where CNNs Fit

Image classification, object detection, segmentation, medical imaging, and as feature extractors. (Transformers — see how-transformers-work — now rival CNNs on vision via Vision Transformers, but CNNs remain efficient, strong, and widely used, especially with limited data.)

## Pitfalls (in understanding/using)

- Using a **dense** network on raw images — wasteful and position-dependent; CNNs' weight sharing is the point.
- Forgetting CNNs assume **locality/translation invariance** — great for images, less so for data without spatial structure.
- Overlooking **data augmentation** (flips, crops) — cheap way to improve generalization on images (see how-overfitting-and-regularization-work).
- Very deep CNNs without residual connections → vanishing gradients (see how-backpropagation-works).
- Assuming a CNN is robust to big rotations/scale changes — invariance is mainly to *translation*; augment for the rest.
