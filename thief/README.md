# KẺ TRỘM MỘT MÌNH

*A house that learns you.*

Turn-based stealth on an 11×11 floor plan. Get in, take the thing in the vault,
get back out through a door. You move, then they move, then everyone looks.
There is no clock inside a turn — the whole game is deciding where to be.

The part that is not like other stealth games: **the house remembers.** Every
night it folds your route into a model of you and then changes itself to beat
that model, specifically:

| what it noticed | what it does |
| --- | --- |
| a shadow you keep waiting in | hangs a lamp there |
| a door you keep coming in by | fits a new lock (and releases the oldest one) |
| a corridor you wear out | splices a guard's patrol through it |
| that you are always quick | starts someone's round earlier |
| that you keep getting away | hires another pair of eyes |

Each change is announced in plain words, so the house is always telling you
which habit it just took away. The **DỄ ĐOÁN** number in the header is how
predictable you have been. It is not a score. It is what the house has to work
with tomorrow.

## The design claim, and the test that could falsify it

> A player who repeats a working plan must get worse at it.

`tests/thief.test.js` runs that claim against the real simulation: a bot with a
fixed route plays eight nights while the house adapts between them, and the
test fails if its late nights go better than its early ones. A second bot that
varies its route is asserted to leave the house with less to lock down.

Measured over 5 houses × 12 nights (`node` bots, no rendering):

| plays like | escapes |
| --- | --- |
| a careful player who reads the cones | ~60% |
| a shortest-path bot that ignores them | ~15% |

That gap is the game. Everything else is bookkeeping.

## Fairness rules, each of which exists because a bot found the unfair case

- **The cone a guard will look down next turn is drawn faintly on the board.**
  Turn-based stealth is only fair if you can see the next beat coming.
- **A doorway is cover.** Without this the house eventually parks a guard on
  your only way in and wins before you have made a decision.
- **The house can never bolt every door.** A new lock releases the oldest one,
  so the choice of way in survives forever.
- **Dawn ends the night at 45 turns.** Waiting is free; waiting forever is not.

## Tiếng Việt / English

The button in the top-right corner switches language, and it switches *the
whole history* — nothing in the game ever stores a sentence. The house records
what happened (`{ id: 'lock', door: 'garden' }`), doors carry ids rather than
names, and the words are chosen at drawing time, so twenty nights of notes
re-read themselves in one tap. Your choice is remembered; the first visit
follows the browser's own language.

## Run it

```sh
npm test          # 16 tests, node --test, no framework
npm run build     # → dist/thief.html, one self-contained file
```

`dist/thief.html` is the whole game: open it from the filesystem, no server, no
dependencies, no network. The house is stored in `localStorage`, because a
house that forgets you overnight is not this game. **Shift+R** burns it down and
builds a new one.

## Layout

```
src/house.js    the mansion, guards, turns — deterministic, DOM-free
src/memory.js   the house's model of you, and how it acts on it
src/text.js     both languages, and the only place a sentence exists
src/main.js     the blueprint renderer and the input
tools/build.js  inlines everything into one HTML file
```

`house.js` and `memory.js` never touch the DOM, which is why the bots in the
tests can play thousands of nights in a few milliseconds.
