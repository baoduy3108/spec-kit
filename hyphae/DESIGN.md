# HYPHAE — design notes

## Why an idle game

Idle games have the best retention economics on the web: sessions are short,
the reason to return is built into the mechanics rather than bolted on with
notifications, and the game keeps its promise while the player is doing
something else. They are also the genre where *engineering* shows: offline
progress, number scale and curve stability are all real problems with real
answers.

The pitch is one sentence: **a fungal network that grows while you are away,
and that you deliberately destroy to make the next one bigger.**

The theme is doing work. Prestige in most idle games is an abstraction — you
"reset for points". Here the reset *is* the organism's life cycle: the network
fruits, releases spores, and dies. A player who has never read a wiki
understands why blooming is both a loss and the point.

## The three numbers that matter

**1. Depth of the chain: eight tiers.** Tier *n* produces tier *n−1*. That is
what turns idle time into polynomial growth — leave for an hour and the top of
the chain has been feeding the middle, which has been feeding the bottom.

**2. The boost interval: every ten purchases doubles a tier.** It gives every
purchase a visible countdown ("4 to x2") and makes "which tier do I buy" a
decision rather than an ordering.

**3. The prestige payout: logarithmic.** This one took measurement to get
right, and is the most important number in the game. See below.

## What the pacing harness caught

The economy was built before any UI existed, with a headless script that plays
the real engine and prints milestones. Two design bugs came out of it that no
amount of reading the code would have found:

**The manual button scaled with prestige currency.** `forage` was worth
`1 + 0.35 × total spores`. It looked generous. What it actually did: after a
bloom the network is empty, so one click instantly refunded the entire run,
which made every cycle two clicks long and collapsed the loop into a slot
machine. The fix is that foraging is worth a few seconds of the *current*
network and nothing else — it matters for the first ten minutes and is
flavour thereafter. `tests/engine.test.js` now pins this as a regression.

**The prestige payout was a power law.** `spores = 3 × (earned / threshold)^0.4`
is the standard shape, and it is wrong for a chain this deep. Spores multiply
every one of eight links, so earned biomass scales like M⁸; feeding that back
through a 0.4 exponent gives `gain ∝ S^2.7` — doubly exponential. Measured
result: cycles fell from 15 minutes to 40 seconds inside two hours and the
save hit 1e300 in forty minutes. Two intermediate fixes (lowering the
multiplier exponent to 0.3, then 0.18) only slowed the collapse.

The actual fix is to pay on a log scale:

```
spores = 2.6 × (log10(earned) − log10(threshold)) ^ 1.15
```

Biomass now has to grow by *orders of magnitude* to buy the next spore, which
is exactly the pacing this genre wants: numbers that look absurd, progress
that stays legible. Measured after the change: first bloom at 14 minutes,
cycles settling at 3–4 minutes, 45 spores and a ×9 network in the first hour,
and the spore count's growth rate visibly decelerating over six hours (+11
orders in hours 2–4, +5 in hours 4–6).

The whole band is now a test. A tuning change that breaks it fails CI.

## Offline progress, exactly

Most idle games approximate offline time: they tick a coarse loop and often
apply a penalty to hide the error. This one solves it.

The chain is `dx/dt = A·x` with `A` strictly upper triangular. Nilpotent
matrices have a terminating exponential series, so:

```
x(t) = exp(A·t)·x₀ = Σ (A^k · x₀ · t^k / k!)   for k = 0..8
```

Nine terms, no iteration, no drift. `advance()` is the same function for a
20 Hz tick and for a six-hour absence, so the two can never disagree — and
because it is exact, the offline *cap* and *efficiency* can be honest,
visible, upgradeable numbers instead of a hidden fudge factor.

Automation still runs while you are away: offline is simulated in chunks with
the reflexes firing between them. An idle game where automation stops the
moment you close the tab is not an idle game.

## Business model

The game as committed has **no ads, no ad SDK, no tracking, no payments, and no
server**. It is complete and free. Where money would attach, and the rules the
design already follows so that it could:

| Slot | Mechanism | Guard-rail |
|---|---|---|
| Offline cap | Rewarded video: run the network for an extra few hours, once per day | The base cap is generous and upgradeable with spores for free |
| Spore boost | Rewarded video: double the next bloom | Optional, never required, never compounding |
| Remove ads | One-off purchase, includes a cosmetic network palette | Changes nothing about the curve |
| Supporter pack | Cosmetics and an extra save slot | Nothing purchasable affects production |

The three things this design refuses: **energy timers** (they punish the exact
behaviour idle games are supposed to reward), **paid production multipliers**
(they make the curve meaningless), and **loot boxes**. The genre's biggest
earners use all three, and they are also why its reviews are what they are.

The honest retention levers are already in: offline progress that respects
your time, daily-ish upgrade goals, and a curve that always shows the next
thing you cannot quite afford.

## What I would build next

1. **A second prestige layer.** The mutation tree is a few hours of content;
   the standard answer is a layer above spores that resets *them*. The engine
   is already parameterised for it — a second currency multiplying
   `sporeMultiplier` is a config change.
2. **Named forests.** Procedural seed per run shown as a name, so a bloom is a
   place you left rather than a number that reset.
3. **Offline notifications.** The one legitimate use of push here: "your
   network filled its capacity" — the mechanic already knows when that is.
