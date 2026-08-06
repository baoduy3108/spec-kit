---
name: how-speech-recognition-works
description: How speech-to-text works — capturing audio as a waveform, feature extraction (spectrograms/MFCC), acoustic + language modeling, and modern end-to-end neural models (and how Whisper-style transformers changed it). Covers why accents/noise/homophones cause errors. Use to understand voice input, transcription, and speech-recognition limits.
category: ai-agent
keywords_vi: nhận dạng giọng nói hoạt động thế nào, speech to text, giọng nói thành chữ, spectrogram mfcc, acoustic language model, whisper, lỗi do giọng ồn, hiểu speech recognition
---

# How Speech Recognition Works

Automatic Speech Recognition (ASR) turns spoken audio into text. It bridges a messy analog signal and discrete words.

## Signal → Features

Sound is captured as a **waveform** (air-pressure samples over time). Raw samples are hard to model, so the system extracts **features**: it slices the audio into short frames and computes a **spectrogram** (how much energy at each frequency over time) — often summarized as **MFCCs**. This turns audio into a compact representation that captures the sounds (phonemes) being made, similar to how a spectrogram shows a voice's "shape."

## Classic Pipeline (acoustic + language model)

Traditional ASR combined:
- **Acoustic model** — maps audio features → phonemes/sounds ("what sounds were made?").
- **Pronunciation dictionary** — phonemes → words.
- **Language model** — which word sequences are likely ("recognize speech" vs "wreck a nice beach" — they sound identical; the language model picks the plausible one from context).
This is why context matters and why a good language model fixes homophones.

## Modern End-to-End Neural ASR

Today, a single deep neural network (often a **transformer**, e.g. Whisper) maps audio features **directly to text**, learning the acoustic and language patterns jointly from huge amounts of transcribed audio. It handles context, punctuation, and even multiple languages in one model, and is far more robust to real-world speech. (This is the same transformer family as LLMs — see how-llms-work; LUMINA uses a model like this for its voice/subtitle features.)

## Why Errors Happen

- **Accents/dialects** — underrepresented in training data → higher error rates (a real fairness issue).
- **Background noise / overlapping speakers / far mic** — degrade the signal.
- **Homophones** — resolved by the language model/context, which can still guess wrong.
- **Domain vocabulary / names / rare words** — not in training → mis-transcribed.
- **Code-switching** and fast/mumbled speech.

## Why It Matters

Explains: why transcription is great on clean speech but stumbles on accents/noise/jargon, why context (the language model) fixes some errors, why it can add plausible-but-wrong words (like MT/LLMs, fluent ≠ correct), and why important transcripts (medical, legal) need human review. For building: expect to handle noise, provide domain vocabulary/hints where possible, and evaluate on realistic audio, not clean studio samples.

## Pitfalls / Notes

- **Noisy/far-field audio** → poor accuracy; good mic and quiet help most.
- **Accent/language bias** in models — test on your actual users.
- Trusting transcripts of **high-stakes** audio without review.
- **Streaming vs batch** — real-time (low latency) trades some accuracy vs transcribing a whole file at once.
