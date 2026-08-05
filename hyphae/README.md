# HYPHAE

**An idle game about a fungal network learning to think.**

You are a thread under a dead forest. You spread. Threads meet and become
nodes, nodes braid into cords, cords push fruiting bodies through the soil,
and eventually a valley's worth of root and rot is thinking one slow thought.

Then you let go, the whole thing turns to spores, and you start again — bigger.

- Zero dependencies. No art files, no audio files, no network calls.
- ~65 KB as a single HTML file. Works offline, installs as a PWA.
- It keeps growing while the tab is closed. Exactly, not approximately.

## Play

```bash
cd hyphae
python3 -m http.server 8080     # or: npm run serve
# open http://localhost:8080
```

Or build the one-file version and double-click it:

```bash
npm run build                   # -> dist/hyphae.html
```

## The loop

1. **FORAGE** by hand until the first Hypha pays for itself. About thirty
   seconds.
2. **Buy the chain.** Hyphae make biomass, Mycelial Nodes make Hyphae,
   Rhizomorphs make Nodes — eight tiers deep. Every tenth purchase of a tier
   doubles its output, so the shape of the game is *where do I spend next*.
3. **Come back later.** The network runs while you are away, and your reflexes
   (automation) keep buying without you.
4. **BLOOM** at around fifteen minutes. Everything resets except spores,
   mutations and records. Spores multiply every tier forever after.
5. Spend spores on **mutations** — automation, cheaper growth, longer offline
   time, keeping a slice of the network through a bloom — and go again. Cycles
   settle at three to five minutes.

The number in the corner will pass a googol. That is on purpose.

## What is actually interesting here

**Offline progress is exact.** The chain is a linear system with constant
coefficients, and its matrix is strictly upper triangular — therefore
nilpotent, therefore `exp(At)` is a *finite* series. So "you were away for six
hours" is solved in closed form in about nine terms rather than approximated
by ticking a loop with a fudge factor. Online and offline run the same
function, so they can never disagree. `tests/engine.test.js` checks it against
90,000 small steps.

**Numbers have no ceiling.** `src/core/decimal.js` is a small mantissa/exponent
number, because an incremental whose numbers stop at 1e308 stops being an
incremental. Saves store `"m e"` strings, so a save with 1e1200 biomass round
trips exactly.

**The balance is measured, not guessed.** `tests/pacing.test.js` plays the real
engine for an hour with a reference player and asserts the milestones land in a
human band: first bloom between 5 and 25 minutes, 10–5000 spores in the first
hour, cycles never shorter than 30 seconds, and the upgrade tree still
unfinished when the hour is up. Two real design bugs were caught this way and
both are now regression tests — see `DESIGN.md`.

**The picture is the save file.** The mycelium on screen is drawn from the same
numbers the economy runs on: branch count from biomass, fruiting bodies from
tier four, the gold breath from tier six. Nothing about it is decorative.

## Layout

```
src/
  core/
    decimal.js   mantissa/exponent numbers          (pure)
    format.js    12345 -> "12.35K", 1e918 -> "4.2e918"  (pure)
  game/
    config.js    every tuning number in the game     (pure)
    engine.js    the whole economy                   (pure)
    network.js   procedural mycelium + how alive it is (pure)
    render.js    canvas drawing
  meta/
    save.js      localStorage, export/import codes
  main.js        loop, DOM, and the bridge between them
tools/build.js   bundles everything into dist/hyphae.html
```

`engine.js` has no DOM dependency at all, which is why an hour of play fits in
a 1.3 second test run.

## Tests

```bash
npm test        # 47 tests, node --test, no framework, no dependencies
```

## Licence

MIT. `DESIGN.md` has the design rationale, the balance derivation and the
business model.
