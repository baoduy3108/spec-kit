# LUMENFALL

**The fifth game.** Four games merged in pairs, then merged again.

```
1  NOVA HOOK   arcade      ┐
                           ├─ 1×3  THE CLIMB    swing the shaft everyone shares
3  EMBERFALL   shared world┘

2  HYPHAE      idle        ┐
                           ├─ 2×4  THE ENGINE   the beam board IS the machine
4  PRISM       puzzle      ┘

3  EMBERFALL   shared world┐
                           ├─ 3×2  THE COMMONS  light decays for everyone, always
2  HYPHAE      idle        ┘

4  PRISM       puzzle      ┐
                           ├─ 4×1  THE LOCK     solve it while the dark rises
1  NOVA HOOK   arcade      ┘
                                      ↓
                                  LUMENFALL
```

The trick that makes it one game instead of four modes: **a lantern is the
same object in all four layers.**

- **1×3 · THE CLIMB.** You hold to hook a lantern and let go to fly. A perfect
  release — the tangent that fires you at the *next* lantern — pours every mote
  you are carrying into the one you just left. The shaft is persistent, and an
  echo of your last climb swings beside you, lighting what it lit, at half
  weight.
- **2×4 · THE ENGINE.** Every lit lantern keeps the beam board it was unlocked
  with, and how well that board is routed *is* its lumens per second, forever,
  including while the tab is closed. You do not buy a better lantern. You route
  it better. The solver knows each board's ceiling, so the game can tell you
  "×1.06, and ×1.62 is possible" — an idle upgrade curve made of puzzles.
- **3×2 · THE COMMONS.** Charge decays whether or not anyone is watching, on
  the same exponential the earnings integrate over. Dawn breaks when the whole
  shaft is bright enough, and hands you embers and a new shaft.
- **4×1 · THE LOCK.** A sealed lantern opens a beam puzzle mid-climb. You hang
  still while you think — but the dark keeps rising underneath you. A puzzle
  you can stare at forever is not part of an action game.

And they feed each other in a circle: the climb lights lanterns → each lantern
becomes a board you route → routed lanterns pay the lumens that buy reach and
capacity → which buy a better climb → which reaches the sealed lanterns higher
up, whose locks are harder, while the dark rises faster.

## Play

`dist/lumenfall.html` is the whole game in one file. Open it.

```bash
npm run build     # rebuild it from src/
npm test          # 15 tests
```

Hold anywhere (or space) to hook, let go in the green arc. Tap the mirrors when
a lock opens. Tap outside a board to leave it.

## The parts

```
src/core.js     maths, seeded rng, number formatting        (pure)
src/sim.js      the climb: hook, swing, release, motes, dark (pure)
src/puzzle.js   the beam board: as a lock, and as a machine  (pure)
src/night.js    decay, offline earnings, dawn, echoes        (pure)
src/main.js     canvas, screens, save
```

Offline is the closed form `∫ c₀·e^(−kt)·rate dt`, checked against 72,000 small
steps. Prestige pays on a log scale, because a power law here makes the loop
doubly exponential — a lesson HYPHAE paid for. Every lock is proven pickable by
an exhaustive solver before you are shown it, and every board's ceiling is that
same solver run over a score instead of a win condition.

The four originals are still in this repo, unchanged and playable on their own:
`nova-hook/`, `hyphae/`, `emberfall/`, `prism/`.
