---
name: music-theory-basics
description: Music theory basics for composition — notes and intervals, scales and keys, chords and triads, diatonic chord functions and progressions, tension and resolution, rhythm and meter, and melody/harmony relationships. Use when composing music, writing chord progressions, understanding song structure, or programming generative/procedural music.
category: design
keywords_vi: nhạc lý cơ bản sáng tác, nốt và quãng interval, âm giai scale và điệu tính key, hợp âm ba triad chord, chức năng hợp âm diatonic vòng hòa thanh progression, căng và giải quyết tension resolution, nhịp phách rhythm meter, giai điệu và hòa âm melody harmony
---

# Music Theory Basics

Music theory is the vocabulary for *why* some note combinations sound stable, tense, sad, or triumphant. You don't need it to enjoy music, but to **compose** deliberately — or to generate music procedurally — it's the rule system that turns random notes into something that resolves and moves.

## Notes, Intervals & Scales

- **Notes** repeat every **octave** (12 semitones in Western music: C, C#, D … B).
- **Interval** — the distance between two notes, and the source of emotional color: a perfect 5th is stable/open, a minor 2nd is harsh, a major 3rd is bright, a minor 3rd is darker.
- **Scale** — a chosen subset of notes that defines a tonal palette. The **major scale** (W-W-H-W-W-W-H step pattern) sounds bright; the **natural minor** sounds darker. The scale + its home note (**tonic**) define the **key**.

Staying "in key" is why a melody sounds coherent; deliberately stepping out creates surprise or tension.

## Chords & Harmony

- **Triad** — three notes stacked in thirds (root, 3rd, 5th). **Major** triad = bright, **minor** = sad/soft, **diminished** = unstable, **augmented** = eerie.
- **Diatonic chords** — build a triad on each scale degree and you get the chords "in the key". They're numbered with Roman numerals (I, ii, iii, IV, V, vi, vii°), uppercase = major, lowercase = minor.
- **Seventh chords / extensions** add color (jazz, R&B lean on 7ths, 9ths).

## Function, Tension & Resolution

The engine of Western harmony is **movement between stability and tension**:
- **Tonic (I)** — home, rest.
- **Dominant (V)** — maximum tension; it *wants* to resolve back to I (the V→I cadence is the strongest "landing" in music).
- **Subdominant (IV)** — motion away from home, gentle.

Progressions are journeys through this tension. The **I–V–vi–IV** ("four chords") powers countless pop songs; **ii–V–I** is the backbone of jazz. Composing is largely arranging tension and release over time.

## Rhythm & Meter

- **Beat / tempo** — the pulse (BPM).
- **Meter** — how beats group (4/4 is most common; 3/4 waltz; 6/8 lilting). The **time signature** sets it.
- **Syncopation** — accenting off-beats for groove and energy.

Rhythm carries as much emotion as pitch — the same notes feel different urgent vs. laid-back.

## Melody & Harmony Together

- A **melody** is a sequence of single notes, usually drawn from the scale, shaped by contour (rise/fall), phrasing, and a mix of steps (adjacent notes, smooth) and leaps (dramatic).
- **Harmony** underneath (the chords) gives each melody note context — the same note sounds hopeful over one chord, melancholy over another.
- **Voice leading** — moving between chords smoothly (small movements per voice) sounds polished.

## For Procedural / Generative Music

Encode the rules: pick a key/scale, constrain melody notes to the scale, drive harmony with a functional progression (weighted transitions favoring V→I resolutions), quantize rhythm to the meter, and layer stems by intensity (see game-audio-and-adaptive-music). Theory becomes the **constraint system** that keeps generated music musical instead of random — the same way grammar keeps generated text readable.

Theory isn't rules to obey rigidly — great music breaks them on purpose. But you have to know where "home" and "tension" are to break them meaningfully.
