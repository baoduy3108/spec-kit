---
name: how-face-recognition-works
description: How face recognition works — detecting a face, extracting a numeric "faceprint" embedding with a neural network, and comparing embeddings by distance for verification (1:1) vs identification (1:many). Covers accuracy factors, bias, and privacy concerns. Use to understand face recognition/unlock, its limits, and its ethical issues.
category: ai-agent
keywords_vi: nhận diện khuôn mặt hoạt động thế nào, face recognition, phát hiện mặt, faceprint embedding, so khớp khoảng cách vector, verification identification, bias quyền riêng tư, hiểu face recognition
---

# How Face Recognition Works

Face recognition maps a face to a numeric signature and compares signatures. It's built on the same embedding idea as other vision/NLP systems.

## The Pipeline

1. **Detection** — find the face(s) in an image (where are they?) — a prerequisite step (see computer-vision-basics).
2. **Alignment** — normalize the face (rotate, scale, crop to a standard pose) so comparisons are fair.
3. **Embedding (the key step)** — a neural network converts the face into a **faceprint**: a vector of numbers (an embedding) that captures the identity-relevant features, such that **the same person's faces produce nearby vectors and different people's produce distant ones** (see vector-embeddings). The network is trained so distance in this space ≈ "different person."
4. **Comparison** — measure the **distance** between embeddings; below a threshold → "same person."

## Verification vs Identification

- **Verification (1:1)** — "is this the person they claim to be?" Compare the live face to *one* stored faceprint (phone unlock, passport gate). Easier, higher accuracy.
- **Identification (1:many)** — "who is this?" Compare against a *database* of many faceprints to find a match (surveillance, tagging). Harder, and error compounds with database size (more candidates → more chances of a false match).

## Accuracy Factors

Lighting, pose/angle, occlusion (masks, glasses), expression, age change, image quality, and camera differences all affect accuracy. Modern systems are very accurate on cooperative, well-lit, frontal faces (unlock), less so "in the wild."

## The Serious Concerns (don't skip these)

- **Demographic bias** — many systems have been shown to be **less accurate for women and darker-skinned people** (biased/unbalanced training data). In identification/surveillance use, false matches can have severe consequences (wrongful accusations). This is a well-documented, serious fairness problem.
- **Privacy & consent** — faceprints are biometric data you can't change (unlike a password). Mass face recognition enables surveillance and tracking; it raises major ethical and legal issues, and several jurisdictions restrict it.
- **Spoofing** — photos/videos/masks can fool weaker systems; **liveness detection** (is it a real live face?) is needed for security uses.

## Why It Matters

Explains: how face unlock works (1:1 embedding comparison + liveness), why 1:many identification is riskier and error-prone at scale, why accuracy varies with conditions and demographics, and why the technology is ethically fraught — accuracy is only part of the picture; bias, consent, and misuse are central. Build/deploy it (if at all) with liveness, bias testing, consent, and narrow scope.

## Pitfalls / Notes

- **Demographic bias** → unequal error rates; test across groups.
- **1:many at scale** → false matches; high stakes.
- **No liveness detection** → spoofable by photos.
- **Biometric = unchangeable** — a leaked faceprint can't be reset.
- Treating it as infallible in high-stakes settings (it isn't).
