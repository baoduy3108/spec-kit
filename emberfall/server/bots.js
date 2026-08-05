// Server-side lamplighters.
//
// An MMO with nobody in it is a screensaver. Bots keep the world populated so
// a first player arrives somewhere that is visibly alive, and they are wired
// through exactly the same `setInput` a human uses — they have no privileges
// and no extra knowledge beyond what is near them.

import { CFG, addPlayer, nearestBeacon, removePlayer, setInput } from './world.js';

const NAMES = [
  'wickley', 'tinder', 'moth', 'candlewick', 'ash', 'pilot', 'flint', 'lantern',
  'sputter', 'kindling', 'taper', 'glim', 'foxfire', 'wisp', 'char', 'spark',
];

let counter = 0;

export function addBot(world) {
  const id = `bot:${++counter}`;
  const name = NAMES[counter % NAMES.length] + (counter > NAMES.length ? counter : '');
  const bot = addPlayer(world, id, name);
  bot.bot = true;
  bot.think = 0;
  return bot;
}

export function removeBot(world, id) {
  removePlayer(world, id);
}

/**
 * Keep the world at a believable population: bots fill the gap left by humans
 * and quietly step out as real players arrive.
 */
export function balance(world, { target = 10, maxBots = 22 } = {}) {
  let humans = 0;
  const bots = [];
  for (const p of world.players.values()) {
    if (p.bot) bots.push(p.id);
    else humans++;
  }
  const want = Math.max(0, Math.min(maxBots, target - humans));
  while (bots.length < want) bots.push(addBot(world).id);
  while (bots.length > want) removeBot(world, bots.pop());
  return { humans, bots: bots.length };
}

function nearest(items, x, y, maxDist) {
  let best = null;
  let bestD = maxDist * maxDist;
  for (const item of items) {
    const d = (item.x - x) ** 2 + (item.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = item;
    }
  }
  return best;
}

export function thinkAll(world, dt) {
  for (const bot of world.players.values()) {
    if (!bot.bot) continue;
    bot.think -= dt;
    if (bot.think > 0) continue;
    bot.think = 0.25;

    // 1. Run from anything close and hungry.
    const shade = nearest(world.shades.values(), bot.x, bot.y, 260);
    if (shade) {
      setInput(world, bot.id, bot.x - shade.x, bot.y - shade.y);
      continue;
    }

    // 2. Hands full (or nearly): bank it.
    if (bot.carry >= CFG.CARRY_CAP * 0.6) {
      const beacon = nearestBeacon(world, bot.x, bot.y);
      setInput(world, bot.id, beacon.x - bot.x, beacon.y - bot.y);
      continue;
    }

    // 3. Otherwise go and pick something up.
    const mote = nearest(world.motes.values(), bot.x, bot.y, 900);
    if (mote) {
      setInput(world, bot.id, mote.x - bot.x, mote.y - bot.y);
      continue;
    }

    // 4. Nothing nearby: drift towards the dimmest beacon that needs help.
    let dimmest = world.beacons[0];
    for (const b of world.beacons) if (b.charge < dimmest.charge) dimmest = b;
    const dx = dimmest.x - bot.x;
    const dy = dimmest.y - bot.y;
    if (Math.hypot(dx, dy) < 120) {
      setInput(world, bot.id, Math.cos(world.time + counter), Math.sin(world.time * 1.3));
    } else {
      setInput(world, bot.id, dx, dy);
    }
  }
}
