# EMBERFALL

**A shared world where light is a common resource.**

You are an ember. The dark comes back every night, everywhere, all the time.
Motes grow where it is bright; you carry them to beacons; beacons push the dark
back. Shades come out of the unlit ground and take what you are holding.

One person can hold a candle. It takes a crowd to bring the dawn — and that is
not a slogan, it is measured: with eight lamplighters the night ends in about
twelve minutes, with twenty in about eight, and alone it does not end at all.

- Zero dependencies. The WebSocket server is ~200 lines of RFC 6455.
- Authoritative server, client-side prediction, entity interpolation, AOI culling.
- Bots keep the world populated, and they play by exactly the same rules you do.

## Run it

```bash
cd emberfall
npm start                    # http://localhost:8080
PORT=3000 npm start          # somewhere else
```

Open it in two browsers. You will see each other.

`GET /stats` reports population, night number and how lit the world is.

## Playing

- **Move** with the mouse/finger (drag anywhere) or WASD. Your ember follows.
- **Motes** are the little lights. Touch them to pick them up — up to 25. Full
  hands slow you down.
- **Beacons** are the big rings. Walk into one and everything you carry becomes
  light. Bank at the same beacon as other people within ten seconds of each
  other and everyone's deposit is worth more.
- **Shades** hunt whoever is carrying the most. They take your motes and put
  you back at a beacon. Bright ground burns them.
- **Dawn** breaks when the whole map is bright. Everyone who helped is named,
  then night falls somewhere new.

## How it works

```
server/
  ws.js      RFC 6455 WebSocket server — handshake, framing, ping, close  (pure-ish)
  world.js   the entire simulation: players, motes, shades, beacons, light (pure)
  bots.js    server-side lamplighters, driven through the same input path  (pure)
  index.js   static files, socket upgrade, the 20 Hz tick, persistence
client/
  src/net.js     socket, snapshot buffer, interpolation, reconciliation
  src/render.js  the night, drawn from a 16x16 light grid
  src/main.js    input, prediction, HUD, screens
```

**Authority.** The server owns every position. A client sends a *direction* and
a sequence number, never a position — `{t:'in', dx, dy, seq}` — and the tick is
the only thing that moves anyone. Rubbish input is coerced or ignored; the
message cap is 4 KB and inputs are rate limited per tick.

**Prediction and interpolation.** Your own ember moves locally at 60fps using
the same speed constant the server uses, and each snapshot eases you back
towards the truth (a big disagreement — a shade caught you — snaps at once).
Everyone else is drawn 120 ms in the past, interpolated between the two
snapshots either side of that moment, which is what turns 10 snapshots a second
into smooth movement.

**Area of interest.** A snapshot only contains what is within 1400 units of
you, so the cost per client does not grow with the size of the world. A
snapshot in a 200-player world is under 24 KB, and that is a test.

**Persistence.** The light grid, the beacons and the night number are written
to `data/world.json` every 30 seconds and on shutdown, so the world you come
back to is the world you left.

## Tests

```bash
npm test        # 36 tests, node --test, no framework, no dependencies
```

They cover the parts that are easy to get wrong:

- **The WebSocket layer** against the RFC's own worked example, at every frame
  length boundary, split across TCP chunks, and with 24 real browser-grade
  clients connected at once.
- **The simulation** — movement, carry caps, deposits, the co-op multiplier,
  shades hunting and burning, dawn and the reset — plus 200 players for a
  simulated minute inside 8 seconds.
- **The multiplayer claim itself**: a spawned server, forty concurrent clients,
  all of them joining, all of them receiving snapshots, and `/stats` agreeing.
  Plus a client that sends deliberate rubbish while a well-behaved one keeps
  playing.
- **The design claim**: twenty lamplighters must reach dawn strictly sooner
  than eight, and a night must take longer than four minutes and less than
  twenty-five.

## Licence

MIT. `DESIGN.md` covers why the game is shaped this way and where the money
would come from.
