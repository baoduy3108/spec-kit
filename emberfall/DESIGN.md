# EMBERFALL — design notes

## Why this shape of MMO

Most small multiplayer games are arenas: the other players are only there to be
beaten, and the world resets to nothing between rounds. That is a competitive
game with several people in it, not a *massively multiplayer* one.

EMBERFALL is built around a single question: **what makes another player's
presence good news?**

The answer here is that light is a common resource with a shared, visible
number attached to it. Darkness advances everywhere, all the time, on a clock
nobody controls. A stranger who banks motes at a beacon on the far side of the
map makes your corner of the world measurably safer, because:

- lit ground grows more motes, so income rises where people work;
- lit ground burns shades, so danger falls where people work;
- the dawn bar is global, so every deposit anyone makes moves the same number.

None of that requires chat, guilds, grouping UI, or trust. Cooperation is the
physics, not a feature.

The one explicit social mechanic is the co-op multiplier: bank at a beacon
within ten seconds of someone else and everyone's deposit is worth 25% more per
person. It gives strangers a reason to synchronise without a single word.

## The number that had to be true

The design claims a crowd is better. That is testable, so it is tested:

| lamplighters | time to dawn |
|---|---|
| 1–2 | never — you hold a candle |
| 4 | 69% lit after forty minutes, no dawn |
| 8 | ~12 minutes |
| 12 | ~10 minutes |
| 20 | ~8 minutes |
| 30 | ~8 minutes (saturated) |

That table came out of a harness that runs the real world with N bots, and the
monotonic part of it is now a regression test.

Getting there needed one real fix. Beacons originally lost a **fixed** amount
of charge per second. Measured result: four lamplighters kept the map at
*exactly zero* light forever — every mote they banked was eaten by the decay of
the eleven beacons they were not standing at. The fix is proportional decay
(`charge *= exp(-rate·dt)`): an almost-empty beacon barely leaks, so a lone
player's beacon holds and grows, while a blazing one costs more to maintain,
which is a soft cap for free. Small crews now see visible progress; only the
final push to dawn needs a crowd, which is exactly the intended feeling.

## Anti-cheat, such as it is

The server is authoritative about everything that matters. Clients send a
direction and a sequence number; they never send a position, a score, or a
"picked up a mote" message. That single decision removes the entire class of
cheats a hobby MMO usually dies to.

What remains is input abuse, which is bounded rather than trusted: 4 KB message
cap, inputs discarded past a per-tick rate, direction vectors normalised and
NaN-checked on arrival, names stripped to `[\w -]` and cut to 16 characters.
A test connects a client that sends malformed JSON, hostile numbers and a
`<script>` name while a well-behaved client keeps playing normally.

## Why the WebSocket server is hand-written

`ws` is the obvious dependency, and it is a good library. It is not here
because the whole project is worth more as something that runs with `node
server/index.js` on any machine with Node and nothing else — no install step,
no lockfile, no supply chain. RFC 6455 is about two hundred lines for the
subset a game needs, and it is pinned by tests against the RFC's own worked
example and against a real browser client.

## Costs and business model

The economics of a small MMO are the design constraint people usually skip:

- **One process holds a world.** The tick is O(players + motes + shades) with
  a hard cap on the last two, and the measured cost of 200 players for a
  simulated minute is under 8 seconds of CPU. A single small VM runs a shard.
- **Bandwidth is the real bill**, and area-of-interest culling is what keeps it
  flat: a client is sent its neighbourhood, not the world, so cost per player
  does not grow as the world fills.
- **Bots make the first player's experience good**, which is the hardest
  problem a new multiplayer game has. They cost nothing and they play by the
  same rules, so they are not a lie — they are the world being inhabited.

Where money would attach, and the rules that keep it honest:

| Slot | Mechanism | Guard-rail |
|---|---|---|
| Cosmetic embers | Colours, trails, beacon flames | Never brighter, faster or safer |
| Named beacons | A supporter's name on a beacon for a night | No mechanical effect |
| Private shards | A world for you and your friends | Same rules, same build |
| Season records | A cosmetic frame for ending a night on the board | Earned, purchasable only as a gift |

The three things refused: **selling light** (it is the scoreboard), **selling
safety** (shades are the only pressure the game has), and **selling speed**
(it is a shared world, so a paid advantage is taken from other people rather
than from the game).

## What I would build next

1. **Shards and a lobby.** One process is one world; the moment two worlds
   exist there needs to be a "where are my friends" screen. The state is
   already a single serialisable object, so a shard is a process and a file.
2. **Delta snapshots.** Snapshots are whole-state JSON today. Sending only what
   changed since the client's last acknowledged frame is the obvious next 5x on
   bandwidth, and the sequence numbers for it are already in the protocol.
3. **Something to build.** Beacons are found, not made. Letting a crowd raise a
   *new* beacon in dark ground would turn the map into a record of where people
   have been — the cheapest possible source of an MMO's real product, which is
   history.
