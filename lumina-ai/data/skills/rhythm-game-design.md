---
name: rhythm-game-design
description: Rhythm game design — timing windows and judgment tiers, chart/beatmap authoring to music, audio latency and calibration, input and audio-visual sync, scoring and combo systems, difficulty layering, and readability of note streams. Use when designing a rhythm/music game, beatmap system, or any timing-based mechanic synced to audio.
category: design
keywords_vi: game nhịp điệu rhythm, cửa sổ thời gian, bậc chấm perfect good miss, soạn beatmap theo nhạc, độ trễ âm thanh, hiệu chỉnh calibration, đồng bộ input hình ảnh âm thanh sync, điểm số và combo, dễ đọc dòng nốt note
---

# Rhythm Game Design

Rhythm games task the player with hitting inputs **in time with music**. They feel simple but are unforgiving to design: everything hinges on **precise timing and tight audio-visual-input sync**, and a few milliseconds of error anywhere breaks the entire experience. Get the timing foundation right and the rest is authoring fun charts.

## Timing Windows & Judgment

Each note has a **timing window** — how close to the beat the input must land. Hits are graded in **tiers** (Perfect / Great / Good / Miss, or similar):
- **Windows define difficulty and feel** — tight windows demand precision (hardcore); wider windows are forgiving (casual). The Perfect window is the skill test.
- **Feedback is instant** — the judgment appears immediately with distinct visual/audio, so players self-correct ("I'm hitting early"). This feedback loop is how players learn the groove.
- **Early vs late indication** helps players calibrate their timing.

## The Sync Problem (The Hard Part)

Everything must align to a single truth: the **music's timeline**.
- **Audio latency** — sound output has delay (Bluetooth is terrible for this); the game must account for it or every hit feels off.
- **Input latency** — the gap from press to registration.
- **Display latency** — frames take time to show.

If notes are placed by the music but judged against a mis-synced clock, the whole game feels "wrong" in a way players can't articulate. Solutions:
- **Calibration** — let players tune audio and input offset (tap-to-the-beat wizards) so the game adapts to *their* hardware. Essential, not optional.
- **Drive everything off the audio playback position** (the authoritative clock), not frame counts — audio can drift from the render loop (see game-audio-and-adaptive-music).
- Compensate offsets in judgment, not by shifting the music.

Nailing sync is 80% of a rhythm game; nothing else matters if it feels laggy.

## Chart / Beatmap Design

The **chart** (beatmap) is the level — the sequence and timing of notes mapped to a song:
- **Match the music** — notes should fall on beats, emphasize the melody/percussion, and *feel* like you're playing the song. Off-music charts feel arbitrary.
- **Density = difficulty** — more notes, faster streams, harder patterns; layer multiple difficulties per song (Easy→Expert).
- **Patterns & flow** — ergonomic, learnable patterns; avoid unreadable walls or physically awkward inputs (unless that's the challenge).
- **Build with the song** — ramp intensity with the music's energy; drops and choruses get denser.

## Readability

Players must **read the note stream ahead of time** to prepare inputs:
- **Approach/scroll speed** — notes travel toward a judgment line; speed must give reaction time (often player-adjustable). Too slow crowds the screen; too fast is unreadable.
- **Clear visual language** — note types, holds, and lanes instantly distinguishable; the judgment line unmistakable.
- **Uncluttered** — effects and background must never obscure incoming notes. Readability > flashiness.

## Scoring & Motivation

- **Combos** — consecutive hits build a multiplier; a single miss breaking a long combo creates tension and stakes.
- **Score/accuracy grades** (S/A/B, % accuracy) give clear goals and chase-the-high-score replay.
- **Health/fail states** — miss too much and fail, or a lives system; tune so it's tense but fair.

## Difficulty & Accessibility

Layer difficulties per song so beginners and experts share content. Offer calibration, adjustable scroll speed, and (increasingly) accessibility options (no-fail, assist). The genre's joy is the flow state of nailing a song in rhythm — reachable at every skill level with the right layering.

Design rhythm games by getting **sync rock-solid first** (calibration, audio-clock timing), then authoring charts that *feel like the music*, kept readable with clear note streams and instant judgment feedback. Timing is everything — literally.
