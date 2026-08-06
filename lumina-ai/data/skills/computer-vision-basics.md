---
name: computer-vision-basics
description: Core computer-vision concepts — images as pixel arrays, convolution and CNNs learning hierarchical features, the main tasks (classification, detection, segmentation), transfer learning, and modern vision transformers. Use to understand how machines "see" images, CV terminology, and choosing an approach for an image task.
category: ai-agent
keywords_vi: computer vision cơ bản, thị giác máy tính, cnn convolution, nhận diện ảnh phân loại, object detection segmentation, transfer learning, ảnh là mảng pixel, khái niệm cv
---

# Computer Vision Basics

Computer vision gets machines to interpret images and video. An image is just a grid of **pixels** (numbers — for color, three channels R/G/B), and CV turns that grid into meaning.

## Convolution & CNNs

The breakthrough for images is the **Convolutional Neural Network (CNN)**. A **convolution** slides a small learned **filter** across the image, detecting local patterns (edges, textures) regardless of position (translation invariance). Stacking convolution layers builds a **hierarchy**: early layers detect edges → later layers combine them into shapes → then object parts → then whole objects. **Pooling** downsamples to summarize and gain robustness. This hierarchical feature learning is why CNNs work so well on images (see how-neural-networks-work for the training mechanics).

## The Main Tasks

- **Image classification** — what's the main subject? ("cat"). One label per image.
- **Object detection** — *what* and *where*: bounding boxes around multiple objects (YOLO, Faster R-CNN).
- **Semantic segmentation** — label every pixel by class (road/car/sky).
- **Instance segmentation** — per-object masks (separate each car).
- Plus: face recognition, pose estimation, OCR (text in images), image generation, depth estimation, tracking in video.

## Transfer Learning (how you actually build one)

You rarely train from scratch — it needs huge labeled data. Instead, take a model **pretrained** on a massive dataset (ImageNet), which already learned general visual features, and **fine-tune** it on your smaller dataset. This works because early-layer features (edges, textures) are universal. Transfer learning makes strong CV possible with modest data and compute — the standard approach.

## Modern Approaches

**Vision Transformers (ViT)** apply the transformer/attention idea to image patches and now rival or beat CNNs at scale. **Multimodal models** (CLIP, and vision-capable LLMs like the one LUMINA uses for image understanding) connect images and text, enabling "describe this image" / "find images matching this text" — see how-llms-work.

## Practical Notes & Pitfalls

- **Data quantity/quality dominates** — CV models need lots of diverse, well-labeled images; use transfer learning to reduce the need.
- **Augmentation** (flip/rotate/crop/color-jitter) expands data and improves robustness.
- **Distribution shift** — a model trained on clean daytime photos fails on night/blurry/different-camera images; test on realistic data.
- **Bias/fairness** — biased training images → biased results (especially faces); a serious ethical concern.
- **Adversarial examples** — tiny pixel perturbations can fool models; relevant for safety-critical use.
- Match the task: classification ≠ detection ≠ segmentation — pick the right one for what you need to output.
