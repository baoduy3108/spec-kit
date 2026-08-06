# TÍN HIỆU / SIGNAL

*Finding one person in a sky full of machines.*

You are alone at a listening post with a dial and a paper roll. Most of what
is out there is machinery — stations pulsing on fixed periods, the same loops
for years. Somewhere among them a person is transmitting by hand.

Their message is two digits, and the two digits are **where they will be
tomorrow**. Write them in the log and you keep the thread: tomorrow you know
exactly where to tune, and they tell you one more thing about themselves. Get
it wrong and they are gone — tomorrow you sweep the whole band blind, and the
sky is one voice busier than it was.

That chain is the whole progression. There is no score and nothing to buy.
The reward for a night kept is a sentence from someone far away.

## What you are actually listening for

A digit is that many pulses, two notches apart. Two clusters, two digits.
Nothing else to learn — no morse chart.

**No machine in this sky uses a period of two.** The grammar itself is the
tell. And from the fifth night something starts sending in that same grammar,
with the wrong number — so the grammar stops being enough, and you need the
second tell:

> A hand on a key is never exact. The imitation keeps perfect time.
> The person doesn't.

Their transmitter also drifts off the mark as the night gets cold, and the
machine's does not. What makes a person findable here is precisely that they
are imperfect.

## The one thing this game deliberately does not show you

There is no panorama of the band. A spectrogram would hand you every station
for free and leave nothing to do but read. The meter tells you *something is
here*; only sitting on it and listening tells you *what it is*. That gap is
the game.

The technique it teaches, which is a real one: when a neighbour is drowning
your signal, **tune slightly off**. The interferer fades faster than the
voice you want. `bestSpot()` in `src/sky.js` is that idea made testable.

## The claim, and the test that could falsify it

> Every night can actually be read.

A deduction game whose generator can emit an unsolvable puzzle isn't hard, it
is broken — and the player cannot tell the difference, which is worse. So the
suite ends with a bot that gets nothing but the dial: it sweeps, stops at the
peaks, tries thresholds the way you'd nudge a gain knob, splits the trace on
the long silences, and only believes a number that arrived several times on a
steady beat.

| | |
| --- | --- |
| nights read correctly, seeds × nights 1–20 | **190 / 200** |
| nights where a readable spot exists | **100%**, asserted per night |

The generator proves the second one before it hands a night over: if the
person is buried below a clarity floor, it pushes the loudest neighbour away,
and as a last resort takes it off the air. The remaining 10 misses are the
bot's reading, not the sky's — a human can retune continuously and listen
longer than its 45-second window.

Difficulty is not speed and not precision. It is **more voices**: from one
clear night to 44% of ticks carrying something that isn't the person.

## Tiếng Việt / English

The corner button switches language, including every story line you have
already earned. Nothing in the game stores a sentence — `src/text.js` is the
only place words exist.

Sound is optional and off until you press ♪ (browsers require a gesture).
Everything the speaker says is drawn on the paper roll, so the game is fully
playable in silence.

## Run it

```sh
npm test          # 13 tests, node --test, no framework
npm run build     # → dist/signal.html, one self-contained file
```

No dependencies, no server, no network. Progress lives in `localStorage`.
**Shift+R** abandons the post and starts a new one.

## Layout

```
src/code.js    the alphabet: digits to pulses and back, plus the shaky hand
src/sky.js     stations, drift, what reaches the dial — deterministic, DOM-free
src/night.js   one night, and what carries over to the next
src/text.js    both languages, and the lines they send you
src/audio.js   hiss and a tone; the game does not depend on it
src/main.js    the scale, the paper roll, the log book
```
