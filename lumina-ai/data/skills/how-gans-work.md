---
name: how-gans-work
description: How Generative Adversarial Networks work — a generator and a discriminator trained against each other, the minimax game, why training is unstable (mode collapse, non-convergence), and how GANs compare to diffusion models. Use to understand GANs, adversarial training, generator/discriminator, or generative image models before diffusion.
category: ai-agent
keywords_vi: gan, generative adversarial network, generator discriminator, huấn luyện đối kháng, minimax game, mode collapse, bất ổn khi train, gan vs diffusion
---

# How GANs Work

Generative Adversarial Networks (GANs) generate realistic data (images, faces, audio) by pitting **two neural networks against each other** in a competition. They dominated generative imaging before diffusion models (see how-diffusion-models-work) and remain a clean illustration of adversarial learning.

## The Two Players

- **Generator (G)** — takes random noise and tries to produce fake data (e.g. a fake face) that looks real.
- **Discriminator (D)** — a classifier that tries to tell **real** data (from the training set) from **fake** data (from G).
They train **simultaneously and adversarially**: G tries to fool D; D tries to catch G. It's a forger-vs-detective game.

## The Minimax Game

Formally a **minimax** competition:
- D is trained to **maximize** its accuracy at distinguishing real from fake.
- G is trained to **minimize** D's accuracy — i.e. to produce fakes D can't distinguish.
As they compete, both improve: D gets sharper at spotting flaws, forcing G to produce more convincing outputs, which forces D to get even better. At the ideal equilibrium, G's fakes are so realistic that D can only guess (50/50). The signal that trains G is **D's judgment** — G never sees real data directly; it learns purely from trying to fool the discriminator.

## Why Training Is Notoriously Hard

The adversarial setup is powerful but **unstable** — the classic pain of GANs:
- **Mode collapse** — G discovers a few outputs that reliably fool D and produces only those, ignoring the diversity of real data (e.g. generating the same face). Output variety collapses.
- **Non-convergence / oscillation** — the two networks chase each other without settling; if one overpowers the other (D too strong → G gets no useful gradient; G too strong → D is useless), learning stalls.
- Requires careful balancing (architectures like DCGAN, losses like Wasserstein/WGAN-GP, and tricks) to train stably.
This fragility is a big reason **diffusion models** overtook GANs for many tasks — diffusion trains more stably and covers data diversity better, though GANs can be faster at generation (single forward pass) and still excel in some niches.

## What GANs Are Good For

Photorealistic image synthesis, super-resolution, style transfer, face generation ("this person does not exist"), data augmentation, image-to-image translation. The adversarial idea also appears elsewhere (adversarial robustness, domain adaptation).

## Pitfalls (in understanding/using)

- **Mode collapse** — low output diversity; watch for it and use mitigations (minibatch discrimination, WGAN).
- **Unstable training** — balance G and D; a runaway discriminator kills G's learning signal.
- Expecting diffusion-level diversity/quality easily — GANs need careful tuning to match it.
- Judging G by fooling D alone — D can be weak; use external metrics (FID) to assess real quality.
- Ethical/misuse concerns — deepfakes and synthetic identities (a real societal risk).
- Confusing GANs (adversarial, one-shot generation) with diffusion (iterative denoising) — different paradigms.
