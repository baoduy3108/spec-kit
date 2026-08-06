// The sky: everything transmitting tonight, and what reaches your dial.
//
// Pure and deterministic — no DOM, no audio, no clock. A tick is a tick, and
// the same seed gives the same night, which is what makes the whole thing
// testable and what lets a bot listen to a thousand nights in a second.

import { CODE, encode, humanise } from './code.js';

export const BAND = { lo: 0, hi: 99 };
/** How far either side of a station you can still hear it. */
export const REACH = 3.2;
/** Ticks per second. Slow enough to count blips without hurrying. */
export const HZ = 8;
/** Machines never use a period of 2 — that spacing belongs to people. */
export const PERIODS = [3, 4, 5, 6, 7, 9];

function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function rngFor(seed) {
  const next = mulberry(seed);
  return {
    next,
    int: (a, b) => a + Math.floor(next() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length) % arr.length],
    chance: (p) => next() < p,
  };
}

/** A mark both of whose digits are 1..9, so it is always sayable. */
export function sayableMark(rng) {
  return rng.int(CODE.lo, CODE.hi) * 10 + rng.int(CODE.lo, CODE.hi);
}

/**
 * One night's sky.
 *
 * @param target where the person is tonight
 * @param next   the mark they will move to, which is what they are saying
 */
export function buildSky(seed, night, target, next) {
  const rng = rngFor(seed);
  const sources = [];
  const taken = new Set([target]);

  const place = (near, spread) => {
    for (let tries = 0; tries < 40; tries++) {
      const mark = near === undefined
        ? rng.int(BAND.lo + 2, BAND.hi - 2)
        : Math.round(near + (rng.next() * 2 - 1) * spread);
      if (mark < BAND.lo + 1 || mark > BAND.hi - 1) continue;
      if (taken.has(mark)) continue;
      taken.add(mark);
      return mark;
    }
    return null;
  };

  // The sky fills up as the nights go by. This is the difficulty curve: not
  // faster, not twitchier — just more voices between you and the one you want.
  const machines = Math.min(9, 4 + Math.floor(night / 2));
  for (let i = 0; i < machines; i++) {
    const mark = place();
    if (mark === null) continue;
    sources.push({
      kind: 'machine',
      mark,
      freq: mark,
      period: rng.pick(PERIODS),
      phase: rng.int(0, 8),
      power: 0.55 + rng.next() * 0.35,
      drift: (rng.next() * 2 - 1) * 0.012,
    });
  }

  // A jammer is parked deliberately close: a wall of noise over the person.
  if (night >= 3) {
    const mark = place(target, Math.max(2, 6 - Math.floor(night / 3)));
    if (mark !== null) {
      sources.push({
        kind: 'jammer',
        mark,
        freq: mark,
        period: rng.chance(0.5) ? 1 : 2,
        phase: rng.int(0, 3),
        power: 0.5 + rng.next() * 0.2,
        drift: 0,
      });
    }
  }

  if (night >= 10) {
    const mark = place(target, 8);
    if (mark !== null) {
      sources.push({
        kind: 'jammer',
        mark,
        freq: mark,
        period: 2,
        phase: rng.int(0, 3),
        power: 0.45 + rng.next() * 0.2,
        drift: 0,
      });
    }
  }

  const message = encode(String(next).split('').map(Number));
  sources.push({
    kind: 'person',
    mark: target,
    freq: target,
    message,
    variants: humanise(message, rng.next),
    phase: rng.int(0, message.length - 1),
    power: 0.85,
    // A set built by hand in a cold room does not hold its frequency.
    drift: (rng.next() * 2 - 1) * 0.02 - 0.006,
  });

  // From the fifth night someone starts answering in the same grammar, with
  // the wrong number. It is exact where a person is not: that is the tell.
  if (night >= 5) {
    const mark = place(target, 7);
    if (mark !== null) {
      const lie = String(sayableMark(rng)).split('').map(Number);
      const fake = encode(lie);
      sources.push({
        kind: 'impostor',
        mark,
        freq: mark,
        message: fake,
        variants: [fake.marks, fake.marks, fake.marks, fake.marks],
        phase: rng.int(0, fake.length - 1),
        power: 0.8,
        drift: 0,
      });
    }
  }

  makeReadable(sources, sources.find((s) => s.kind === 'person'));

  return { seed, night, target, next, sources, tick: 0 };
}

/** Below this the person is buried and the night is unwinnable, not hard. */
export const MIN_CLARITY = 1.35;

/** How far the person stands above everything else, at one dial position. */
export function clarityAt(sources, person, dial) {
  const mine = gainAt(person, dial);
  let others = 0;
  for (const source of sources) {
    if (source === person) continue;
    others += gainAt(source, dial);
  }
  return { mine, others, ratio: others > 0.001 ? mine / others : 99 };
}

/**
 * The spot on the dial where they come through best — which is rarely dead
 * centre on them. Sliding a little off a neighbour to null it out is the
 * technique the game is actually teaching.
 */
export function bestSpot(sources, person) {
  let best = { ratio: -1, dial: person.freq, mine: 0, others: 0 };
  for (let d = person.freq - REACH; d <= person.freq + REACH; d += 0.25) {
    const c = clarityAt(sources, person, d);
    if (c.mine < 0.25) continue; // too far off to hear them at all
    if (c.ratio > best.ratio) best = { ...c, dial: d };
  }
  return best;
}

/**
 * A generator that can emit an unreadable night has a bug, not a difficulty
 * curve. This pushes the loudest neighbour away until there is somewhere to
 * listen from, and as a last resort takes it off the air entirely.
 */
function makeReadable(sources, person) {
  for (let pass = 0; pass < 10; pass++) {
    if (bestSpot(sources, person).ratio >= MIN_CLARITY) return;
    const loudest = sources
      .filter((s) => s !== person)
      .map((source) => ({ source, gain: gainAt(source, person.freq) }))
      .sort((a, b) => b.gain - a.gain)[0];
    if (!loudest || loudest.gain <= 0.01) return;

    if (pass >= 7) {
      sources.splice(sources.indexOf(loudest.source), 1);
      continue;
    }
    const away = loudest.source.mark <= person.mark ? -2 : 2;
    loudest.source.mark = Math.min(BAND.hi - 1, Math.max(BAND.lo + 1, loudest.source.mark + away));
    loudest.source.freq = loudest.source.mark;
  }
}

// --- listening ------------------------------------------------------------

/** How strongly a station reaches the dial. Zero past REACH. */
export function gainAt(source, dial) {
  const d = Math.abs(source.freq - dial);
  if (d >= REACH) return 0;
  return (1 - d / REACH) ** 1.6 * source.power;
}

/** Is this station putting out a pulse on this tick? */
export function pulsing(source, tick) {
  const t = tick + source.phase;
  if (source.variants) {
    const len = source.message.length;
    const pos = ((t % len) + len) % len;
    const rep = Math.floor(t / len);
    const variant = source.variants[((rep % 4) + 4) % 4];
    return variant.has(pos);
  }
  return ((t % source.period) + source.period) % source.period === 0;
}

/** A little hiss, deterministic so a night is reproducible. */
export function hiss(tick, dial) {
  const n = Math.sin(tick * 12.9898 + Math.round(dial * 4) * 78.233) * 43758.5453;
  return (n - Math.floor(n)) * 0.07;
}

/**
 * What you hear at this dial position on this tick.
 *
 * `level` is the sum, so two stations pulsing together are visibly louder
 * than either alone. That is the whole reading skill: a taller blip is two
 * voices, and you have to work out which part of it is the one you want.
 */
export function sample(sky, dial, tick) {
  let level = 0;
  const voices = [];
  for (const source of sky.sources) {
    const gain = gainAt(source, dial);
    if (gain <= 0.01) continue;
    const on = pulsing(source, tick);
    if (on) level += gain;
    voices.push({ source, gain, on });
  }
  return { level: Math.min(1.6, level + hiss(tick, dial)), voices };
}

/** The tuning meter: how much carrier is nearby, regardless of pulses. */
export function strengthAt(sky, dial) {
  let total = 0;
  for (const source of sky.sources) total += gainAt(source, dial);
  return Math.min(1, total);
}

/** Everything within earshot, nearest first — for the dial's little marks. */
export function nearby(sky, dial) {
  return sky.sources
    .map((source) => ({ source, gain: gainAt(source, dial) }))
    .filter((v) => v.gain > 0.02)
    .sort((a, b) => b.gain - a.gain);
}

/** Stations wander. Seconds, not ticks: drift is a property of the night. */
export function drift(sky, seconds) {
  for (const source of sky.sources) {
    if (!source.drift) continue;
    source.freq += source.drift * seconds;
    if (source.freq < BAND.lo || source.freq > BAND.hi) {
      source.drift *= -1;
      source.freq = Math.min(BAND.hi, Math.max(BAND.lo, source.freq));
    }
  }
  return sky;
}
