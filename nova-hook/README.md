# NOVA HOOK

**One thumb, one rope, infinite orbit.**

A neon arcade climber for the web. You are a shard falling *upward* through an
endless shaft. You cannot steer. The only thing you can do is grab an anchor,
swing around it, and let go — and the exact moment you let go is the whole
game.

- Zero dependencies. Zero art assets. Zero network calls.
- ~100 KB, one HTML file, playable offline, installable as a PWA.
- Runs on a phone, a tablet, a laptop, or a smart fridge with a browser.

## Play

```bash
cd nova-hook
python3 -m http.server 8080     # or: npm run serve
# open http://localhost:8080
```

Or build the single-file version and just double-click it:

```bash
npm run build                   # -> dist/nova-hook.html
```

**Controls:** hold anywhere to hook, let go to release. Space bar works too.
That is the entire control scheme.

Your first run is coached: the world crawls until you throw your first hook,
drops into bullet time as your first swing approaches the release window, and
holds back every hazard until you have the rhythm. It ends by itself and never
comes back — `Settings → Replay the intro` if you want it again.

## The loop

1. **Hold** — the nearest anchor ahead of you catches your rope. Keep holding
   and the rope reels in, so you spin tighter and faster.
2. **The green arc** on your orbit is the release window. It points exactly at
   the next anchor — releasing inside it is a **PERFECT** and chains your
   combo, which multiplies everything you score.
3. **Let go too late** and the anchor overwinds, the rope snaps, and your chain
   goes to zero. There is a countdown ring around the anchor telling you how
   long you have.
4. Chain perfects to charge **NOVA SURGE**: a few seconds of invincible,
   shard-magnet, hazard-shredding speed.
5. The **void** rises from below the whole time. Stop climbing and it eats you.

Miss, and the run ends in a couple of seconds — which is the point. Runs are
short, the restart button is under your thumb, and the number to beat is right
there on the screen.

## What's in the box

| | |
|---|---|
| Guided first run | The intro coaches you through your first hook, release and chain — inside a real run |
| Endless mode | Procedurally generated, gets denser forever |
| Daily Run | One seed per calendar day — everybody plays the identical shaft |
| Missions | Three daily objectives, deterministic from the day's seed |
| Skins | Six cosmetic ships bought with shards. Cosmetic only — no pay-to-win |
| Second Wind | One free revive per run |
| Offline | Service worker caches everything on first visit |
| Accessibility | Reduced-motion mode, sound/music/haptics toggles, colour-blind-safe hazard palette |

Everything is stored in `localStorage`. No account, no server, no analytics, no
ad SDK.

## Layout

```
src/
  core/      engine, reusable and game-agnostic
    mathx.js   vectors, angles, easing        (pure)
    rng.js     seeded RNG + daily seeds       (pure)
    loop.js    fixed-timestep game loop
    input.js   pointer/touch/keyboard -> hold & release
    audio.js   procedural WebAudio synth, no audio files
    art.js     the sprite forge: every sprite is generated at runtime
    fx.js      particles, shockwaves, screen shake, hit-stop
  game/      the game itself
    config.js  every tuning number and the difficulty curve  (pure)
    physics.js attach / swing / release maths                (pure)
    level.js   procedural shaft generation                   (pure)
    scoring.js combo, score, Nova bookkeeping                (pure)
    coach.js   the guided first run                          (pure)
    world.js   simulation: player, tether, collisions, void
    render.js  all drawing (reads the world, never writes)
  meta/      progression
    save.js    localStorage with safe fallbacks
    skins.js   cosmetics
    missions.js daily objectives                             (pure)
  main.js    boot, screens, and the event -> juice mapping
tools/build.js   bundles everything into dist/nova-hook.html
```

The simulation has no DOM dependency at all, which is why it can be play-tested
in CI (see below).

## Tests

```bash
npm test
```

56 tests, no test framework, no dependencies — just `node --test`. Beyond the
usual unit coverage of the maths, the suite includes:

- **A headless play-through.** `tests/world.test.js` flies an autopilot through
  the real `World` for thousands of simulation steps. It asserts the bot
  climbs, stays inside the shaft, dies when it should, revives correctly, and
  that two runs of the same seed are bit-identical.
- **A difficulty guard.** The same bot plays twelve seeds; the median run has
  to land between 8 and 90 seconds. A tuning change that makes the game
  unplayable or trivially endless fails the build.
- **A fairness guard.** `tests/level.test.js` proves no hazard can ever reach
  the straight line between two anchors, so a clean run is always physically
  possible.

## Licence

MIT. See `DESIGN.md` for the design rationale and the business model.
