# NOVA HOOK — design notes

## The pitch

> You cannot steer. You can only choose *when to let go*.

Every successful hyper-casual game is one verb with a deep skill ceiling.
Flappy Bird is "flap". Crossy Road is "hop". NOVA HOOK is **"let go"**.

That single constraint is what makes it worth building:

- **One input.** Hold and release. No buttons, no menu, nothing to configure.
  A first-time player understands the game in four seconds because the green
  arc on the screen tells them exactly what to do.
- **A real skill ceiling.** The release window is a tangent-point calculation
  (see `physics.releaseAngleFor`): a perfect release fires you from your orbit
  *straight into* the next anchor. Two players with the same input scheme can be
  ten times apart in score.
- **Runs are 20–60 seconds.** Death is instant and unambiguous, the restart
  button is under the thumb that just died, and the number to beat is on
  screen. That is the loop that produces "one more go".

## The first sixty seconds

A hyper-casual game gets one chance to explain itself, and a text tutorial
spends that chance badly. NOVA HOOK teaches inside a real run (`game/coach.js`):

- **The world waits.** Until the first hook lands, time runs at 0.34x. A new
  player cannot be "too slow" for their first press, and the anchor they should
  grab wears a pulsing dashed halo.
- **Bullet time on the first swing.** As the swing sweeps towards the release
  window, time drops to 0.42x. The player experiences the timing of a perfect
  release before they are fast enough to hit it at full speed.
- **The shaft is disarmed.** No hazards, no frail anchors below 2,600px, and
  the void starts 700px further down. Nothing can kill you before you have
  understood the verb.
- **It reacts to what happened.** If the first release lands in the arc the
  next line reads "PERFECT — a clean release aims you at the next ring"; if it
  missed, "Missed it — the green arc points at the next ring".
- **It leaves.** Six short lines, no taps to dismiss, no modal, and it never
  returns. The run it coaches is a real scoring run, so nothing is wasted.

Every step is a pure predicate over a counter object, so the whole flow is
unit-tested without a browser.

## Why it can chart

Nothing about the *idea* makes a game chart. These are the properties that
give it a chance, and each one is implemented rather than aspirational:

1. **Zero friction to first play.** It is a web page. No install, no account,
   no download screen. A link is the entire funnel — which is what makes paid
   user acquisition and organic sharing cheap.
2. **A screenshot-shaped result screen.** Score, altitude, chain, perfect
   percentage, all in one frame with a share button that puts the number and
   the URL on the clipboard.
3. **A reason to come back tomorrow.** The Daily Run is one seed per calendar
   day, generated from the date, so everyone plays the exact same shaft and
   scores are directly comparable. Three daily missions sit on top of that.
4. **A reason to come back in ten minutes.** Missions are per-day but progress
   accumulates across runs, so there is always a partially finished objective.
5. **Instantly readable video.** Neon trails, chain multipliers, screen shake
   and NOVA SURGE were built for 9:16 capture. A "chain 20" clip is legible
   with the sound off, which is the format that actually travels.
6. **It installs.** The PWA manifest and service worker mean a player who likes
   it can put it on their home screen and play on a plane.

## The three-hazard rule

Every hazard is a circle or a pair of segments, placed with a guaranteed
clearance from the straight line between two anchors:

| Hazard | Behaviour | What it punishes |
|---|---|---|
| **Mine** | Drifts sideways on a slow sine | Wide, lazy orbits |
| **Spinner** | Two arms sweeping a fixed radius | Bad timing on the release |
| **Pulsar** | Inflates to a telegraphed radius, then collapses | Hesitation |

The fairness invariant is enforced by a test: `toLine > reach + 20`. If a
generator change ever crowds the ideal path, CI fails. A player who flies the
perfect line is never killed by something they could not avoid — they are
killed by their own sloppy release, which is the only failure that teaches
anything.

An earlier iteration used a "gate" hazard (beams with a gap). It was cut: the
player's swing arc crosses a horizontal line at an angle nobody can predict,
so gates killed players who had done nothing wrong. Measuring the actual
crossing offsets (p90 was 118px against a 76px gap) is what settled it.

## The difficulty curve

`config.difficultyAt(altitude)` is the single source of truth.

- `t` ramps over the first 12,000px — roughly the first 30 seconds of good
  play. Speed, hazard density, anchor fragility and gap length all ride on it.
- `late` is a slow endless creep after that. **Speed deliberately stops rising**
  at 468px/s: past that the game stops being readable and starts being random.
  What keeps rising is density — a second hazard per segment, more frail
  anchors — which is a challenge the player can still *read*.
- The void's speed is capped below 55% of the player's speed at every
  altitude, so it can never out-climb someone who is actually playing. It only
  punishes stalling.

This was tuned with a bot, not with vibes: `tests/world.test.js` flies twelve
seeds and asserts the median run stays in the 8–90 second band. The current
build sits around 37 seconds for a bot that never dodges a single hazard.

## Business model

The game as committed contains **no ads, no ad SDK, no tracking, and no
payments**. It is complete and free. What follows is where the money would come
from if it were commercialised, and the rules the design already follows so
that it could be:

**What is already true**

- *Cosmetics are cosmetic.* `tests/progression.test.js` asserts that a skin
  carries nothing but colours. Skins never touch speed, hitbox or scoring, so
  selling them can never be pay-to-win.
- *Currency is earned honestly.* Shards come from playing. The cheapest skin is
  250 and a decent run pays ~120, so the first unlock lands in run two or
  three — early enough to teach the loop, cheap enough not to feel like a wall.
- *Second Wind is free, once per run.* The revive slot exists and is not
  monetised.

**Where revenue would attach**

| Slot | Mechanism | Guard-rail |
|---|---|---|
| Second Wind | Optional rewarded video for a *second* revive | Never more than one paid revive per run; the free one stays free |
| Between runs | Interstitial every ~5 runs, never on a personal best | Skippable; never between death and the score screen |
| Remove Ads | One-off IAP, also grants a cosmetic | Removes ads, changes nothing about gameplay |
| Skin bundles | Direct purchase of cosmetics already earnable | Everything purchasable is also earnable |

The three things this design refuses: energy timers, paid stat boosts, and
loot boxes. They monetise better in the short term and they are why players
uninstall.

## What I would build next

1. **Server-backed daily leaderboard.** The Daily Run is already deterministic
   and the run summary is already tamper-evident enough to validate
   server-side by replaying the seed. That is the single biggest retention
   lever left.
2. **Ghost replays.** Runs are deterministic from a seed plus an input stream;
   an entire replay is a few hundred bytes. Racing your friend's ghost down the
   same daily shaft costs almost nothing to store.
3. **Weekly mutators.** Reverse gravity, no rope reeling, double anchors. The
   simulation is already parameterised by `config.js`, so a mutator is a config
   patch, not a code branch.
