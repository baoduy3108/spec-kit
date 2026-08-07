---
name: voice-ai-agents-and-realtime-speech
description: Building real-time voice AI agents — the STT→LLM→TTS pipeline, streaming and latency budgets, turn-taking with voice-activity detection and barge-in, endpointing, and speech-to-speech models. Use when building a voice assistant/agent, a phone/voice bot, reducing conversational latency, handling interruptions, or wiring speech recognition and text-to-speech around an LLM.
category: ai-agent
keywords_vi: voice ai, trợ lý giọng nói, stt llm tts, turn taking, barge-in, endpointing, speech to speech, pipeline giọng nói, bot gọi điện giọng nói, độ trễ hội thoại giọng nói
---

# Voice AI Agents & Real-Time Speech

A voice agent lets a user **talk** to an AI and hear it reply naturally. The classic build is a **pipeline** — **STT → LLM → TTS** — and the whole game is keeping it **low-latency and interruptible** so it feels like conversation, not walkie-talkie (see how-speech-recognition-works, ai-agent-architecture, llm-fallback-and-reliability).

## The Pipeline

1. **STT (speech-to-text)** — stream the user's audio to a recognizer that emits partial then final transcripts as they speak.
2. **LLM** — feed the transcript (plus history/tools) to the model, **streaming** its response tokens out as soon as they arrive.
3. **TTS (text-to-speech)** — synthesize speech from the LLM tokens, **streaming audio** back — start speaking the first sentence before the model finishes the rest.

Every stage **streams and overlaps**; never wait for one stage to fully finish before starting the next.

## Latency Is the Product

- Target **sub-~800 ms** from end-of-user-speech to first audio out — beyond ~1s feels laggy. Budget every hop: STT finalization, network, LLM time-to-first-token, TTS first-chunk.
- **Stream everything**: partial STT, token-streaming LLM (see streaming-ux-for-ai-chat), sentence-by-sentence TTS. Speak the first chunk while generating the rest.
- Pick **fast models** for the interactive path; use a smaller/faster LLM or a fast TTS voice. Warm connections, avoid cold starts.

## Turn-Taking (what makes it feel human)

- **VAD (Voice Activity Detection)** — detect when the user is speaking vs silent, to know when to listen and when they've stopped.
- **Endpointing** — decide the user has *finished their turn* (not just a pause). Too eager = interrupts them; too slow = awkward wait. Combine silence duration + semantic cues.
- **Barge-in / interruption** — if the user starts talking while the agent speaks, **stop the TTS immediately** and listen. This is essential for natural feel; you must be able to cancel in-flight TTS/LLM.
- **Backchannels & filler** — a quick "mm-hm" or thinking sound can cover latency.

## Speech-to-Speech Models

- Newer **speech-to-speech** models take audio in and emit audio out **directly** (no explicit text stage), giving lower latency and preserving tone/emotion/prosody — at the cost of less control/observability than a pipeline. Choose per need: pipeline for control/tools/logging, S2S for naturalness/latency.

## Reliability & Practicalities

- **Robust to noise/accents/disfluencies**; handle STT errors gracefully (confirm ambiguous inputs).
- **Tools/functions** still work — the LLM can call tools mid-conversation; speak a filler while the tool runs.
- **Telephony** (SIP/WebRTC) for phone bots; handle packet loss, echo cancellation.
- **Fallbacks** — if STT/TTS/LLM fails, degrade gracefully (retry, apologize, hand off).

Build voice agents as a **streaming STT→LLM→TTS pipeline** obsessed with **latency** — overlap every stage, target sub-second first-audio, and use fast models. Make turns feel human with **VAD, endpointing, and instant barge-in** (cancel in-flight speech when interrupted). Consider **speech-to-speech models** when naturalness/latency beats the control of a text pipeline, and always degrade gracefully when a stage fails.
