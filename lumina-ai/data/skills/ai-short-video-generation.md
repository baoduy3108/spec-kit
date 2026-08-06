---
name: ai-short-video-generation
description: The pipeline for auto-generating short-form videos (TikTok/Reels/Shorts) from a topic with AI — script generation, sourcing matching visuals (stock/generated clips), voiceover (TTS), auto-subtitles, background music, and composition/rendering. Covers the stages, quality levers, and pitfalls. Use when planning or building an automated short-video generator, or reasoning about AI video pipelines.
category: ai-agent
keywords_vi: tạo video ngắn ai, sinh video tự động, tiktok reels shorts, script visual voiceover phụ đề nhạc nền, pipeline video ai, dựng video tự động, hiểu tạo video ai
---

# AI Short-Video Generation

Automated short-video tools turn a **topic or script into a finished vertical video** by chaining several AI/media steps. Understanding the pipeline explains the quality levers and where things go wrong. (LUMINA itself does related work — subtitles and dubbing — see the README.)

## The Pipeline

1. **Script generation** — an LLM turns the topic/keywords into a short, punchy script (a hook in the first 2 seconds, tight pacing for the format). Script quality drives everything downstream; a weak hook = no views.
2. **Sourcing visuals** — for each script beat, find or generate matching footage: **stock clips** (Pexels/Pixabay by keyword) or **AI-generated** images/video. Matching visuals to the narration is the hardest quality step — mismatched B-roll looks cheap/AI-slop.
3. **Voiceover (TTS)** — synthesize narration with text-to-speech. Free options (Edge TTS) vs premium (more natural, per-provider APIs — a cost/quality trade-off). Prosody and pacing matter for watchability.
4. **Subtitles** — auto-generate captions (from the script, or transcribe the audio with something like Whisper) and burn them in with timing. **Essential** — most short video is watched muted, so on-screen captions carry the message. Style them for readability (see how-video-streaming-works for codecs).
5. **Background music** — add a track at low volume under the voiceover; match mood, and duck it under speech.
6. **Composition & rendering** — assemble clips + voice + subtitles + music on a timeline (e.g. MoviePy/ffmpeg), in **vertical 9:16**, with cuts synced to the narration/beat, and export.

## Quality Levers

- **The script/hook** — the single biggest factor for retention.
- **Visual-to-narration matching** — relevant, high-quality footage vs generic mismatched stock.
- **Voice naturalness** and **caption timing/style**.
- **Pacing/cuts** — short clips, quick cuts, synced to speech keep attention.
- **Format fit** — 9:16 vertical, safe zones for captions, platform length limits.

## Dependencies & Costs (be realistic)

These pipelines usually stitch together **several third-party services**: an LLM for scripts, a TTS provider, a stock-footage API, sometimes an image/video-generation API — most needing **API keys and costing money per video** (see the reasons LUMINA doesn't bundle paid video-gen skills — it uses free Edge TTS + Gemini for its own subtitle/dubbing features). Free stacks exist (Edge TTS + open Whisper + free stock) but quality varies.

## Why It Matters

Explains how "type a topic → get a video" tools work (LLM script → matched visuals → TTS → burned subtitles → music → ffmpeg compose), where quality comes from (script/hook + visual matching + captions), and the real cost/complexity (multiple paid APIs). For anyone building or evaluating one, the pipeline stages *are* the checklist.

## Pitfalls / Notes

- **Weak script/hook** → no retention, regardless of production polish.
- **Mismatched/generic visuals** → looks like low-effort AI slop.
- **No or badly-timed subtitles** → lost on muted autoplay (most viewers).
- **Robotic voice / bad pacing** → viewers bounce.
- **Cost blindness** — per-video API costs add up at volume.
- **Copyright** — stock/music/footage must be properly licensed; AI-generated content and platform rules on "AI slop" are evolving.
- Wrong aspect ratio / captions outside safe zones.
