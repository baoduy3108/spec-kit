# NGƯỜI GÁC ĐÈN / THE LANTERN WARDEN

*A souls-like where dying is how you get stronger — not a metaphor, a mechanic.*

One hall, one boss, five languages. You have a sword, a roll, a shield and
three flasks. The Warden has five attacks and a lantern it opens at half
health.

## The thing this genre usually gets wrong for new players

Souls games hide the wind-up and expect you to learn it by dying twenty
times. This one **paints the danger zone on the floor while it is still
avoidable** — where the blow will land, and a bar that fills as it gets
closer. The warning disappears the instant the swing goes live.

It is tested, not promised:

- `the warning on the ground is exactly where the hit will be` — walks a real
  fight to the active frames and asserts the true hit span sits inside the
  span that was drawn.
- `the warning is only shown while it is still avoidable` — asserts it is gone
  once the swing is live, so it can never be a lie in the other direction.

Difficulty still escalates. It just never escalates by hiding things: phase
two shortens the **recovery**, never the wind-up. The tells stay exactly as
readable; what shrinks is how much you are allowed to do about them.

## Dying makes you stronger

Damage you deal becomes essence. Die and it drops where you fell — walk over
it next attempt and **it banks immediately**, spendable whether or not you win
that one. So every attempt pays for the next.

That detail came from a browser playtest that ended `ESSENCE 0` after taking
the boss to 53%. Essence had only banked on a win, which meant a player who
could not beat the boss could never buy anything, and the whole premise was a
lie. It is now a test.

Essence buys vigour, endurance, strength and flasks — five ranks each.

| plays like | wins |
| --- | --- |
| reads the tells, level 0 | **82%** |
| reads the tells, all upgrades | **100%** |
| walks forward mashing attack | **0%** |

Two bots measure this every run. The gap between the first and last row is
the claim that skill matters; the gap between the first and second is the
claim that persistence does.

## Fairness rules, each one a test

- Every move's recovery is longer than its active frames, so **everything is
  punishable**.
- Every wind-up is at least 0.35s, so **everything is readable**.
- The same move never comes out twice in a row.
- A travelling attack warns about everywhere it will travel *to*, not just
  where it starts.

## Languages

Tiếng Việt · English · 日本語 · 한국어 · 中文, on one button in the corner.
The button lives outside the HUD on purpose: a fixed-position parent makes its
own stacking context, so a button inside it can never rise above the death
screen — which is exactly where most of the words are.

## Run it

```sh
npm test          # 15 tests, node --test, no framework
npm run build     # → dist/souls.html, one self-contained file
```

No dependencies, no server, no network. `localStorage` keeps your essence and
levels. **Shift+R** starts over.

Controls: `A D` move · `J`/tap swing (press again for the second hit) ·
`Space` roll · `K` block · `L` drink. Touch buttons for phones.

## Layout

```
src/moves.js   the Warden's five attacks — wind-up, active, recovery
src/rules.js   the fight: stamina, i-frames, poise, essence. DOM-free
src/art.js     jointed silhouettes posed from the same state the rules track
src/text.js    five languages, the only place a sentence exists
src/main.js    fixed-step loop, input, the HUD and the fire
```

The renderer poses the figures from the rules' own state and timers — never
from a parallel animation clock. An animation that can disagree with the
simulation is the usual reason a fight "feels off", and this one cannot.
