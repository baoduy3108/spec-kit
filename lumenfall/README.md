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

**None of the four control schemes survived.** Swinging on a rope was fun to
build and unplayable to hand someone — so the fifth game keeps the four
*cores* and throws the four *interfaces* away:

| taken from | the core, not the controls |
|---|---|
| NOVA HOOK | the value of a single moment of commitment |
| PRISM | arranging a static thing so energy flows well |
| HYPHAE | what you built keeps working without you |
| EMBERFALL | it fades for everyone, all the time |

What those four make together is a form of play none of them had: **a pulse
walks the line you routed, and you tap once as the ring closes on each node.**
One finger. No reflexes, no dexterity, no failure state — a beat, not a test.

The trick that makes it one game instead of four modes: **a node is the same
object in all four cores.**

- **1×3 · THE BEAT.** A pulse leaves the source and walks the beam. At each
  node a ring closes; one tap inside it catches the pulse, charges the node,
  and extends your chain. Miss and the node still keeps a little light — the
  game never takes progress away, it only pays you less.
- **2×4 · THE ROUTE.** Which nodes are on the beat is decided entirely by how
  the mirrors are turned. Tap a mirror to re-route. The exhaustive solver knows
  every board's ceiling, so the game can honestly say "this is 1.2 of a
  possible 1.6" — an idle upgrade curve made of puzzles rather than purchases.
- **3×2 · THE NIGHT.** Charged nodes earn lumens per second, including while
  the tab is closed, and decay on the same exponential the earnings integrate
  over. You come back to more than you left, and less than you hoped.
- **4×1 · THE DAWN.** When the board is bright enough the night breaks: embers,
  a permanent multiplier, and a new board to route from scratch.

They feed each other in a circle: routing decides where the beats are → beats
charge the nodes → charged nodes pay lumens → lumens widen the window, quicken
the source and add nodes → which makes routing matter more.

## Play

`dist/lumenfall.html` is the whole game in one file. Open it.

```bash
npm run build     # rebuild it from src/
npm test          # 15 tests
```

Tap anywhere as the ring closes on a node. Tap a mirror to re-route the beam.
That is the whole control scheme.

## The parts

```
src/core.js     maths, seeded rng, number formatting        (pure)
src/pulse.js    the beat: the pulse, the ring, the catch      (pure)
src/puzzle.js   the beam: routing, scoring, the solver         (pure)
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
