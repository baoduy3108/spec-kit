// The night: the idle half and the shared-world half of LUMENFALL.
//
// Lit lanterns earn lumens whether or not you are watching, and the dark eats
// their charge whether or not you are watching. Both are solved in closed
// form, so eight hours away costs one evaluation and is exactly right rather
// than approximately right.
//
//   charge(t) = c0 · e^(−kt)
//   lumens    = ∫ c0 · e^(−kt) · rate dt = c0 · rate · (1 − e^(−kt)) / k

import { clamp } from './core.js';

export const NIGHT = {
  /** Fraction of charge a lantern loses per second. */
  decay: 0.0022,
  /** Lumens per second per unit of charge. */
  yield: 0.55,
  /** Offline runs at this fraction of real time, before upgrades. */
  offlineEfficiency: 0.55,
  offlineCapHours: 6,
  /** Average charge across the shaft that breaks the night. */
  dawnAt: 1.15,
  dawnScale: 2.4,
  dawnExponent: 1.15,
  dawnFloor: 12,
};

export const UPGRADES = [
  { id: 'window', name: 'Slow Hand', blurb: 'The catch window is wider, per level.', cost: 30, mult: 2.4, levels: 6 },
  { id: 'tempo', name: 'Quick Source', blurb: 'Pulses leave sooner, per level.', cost: 70, mult: 2.9, levels: 7 },
  { id: 'nodes', name: 'One More Node', blurb: 'Another node joins the board.', cost: 150, mult: 3.6, levels: 6 },
  { id: 'yield', name: 'Bright Oil', blurb: '+35% lumens from every node, per level.', cost: 90, mult: 3.0, levels: 12 },
  { id: 'wick', name: 'Steady Wick', blurb: 'Nodes lose 18% less charge, per level.', cost: 120, mult: 3.2, levels: 6 },
  { id: 'night', name: 'Night Watch', blurb: 'Offline runs +4h longer and +10% better.', cost: 200, mult: 3.4, levels: 6 },
];

export function newNight(seed, embers = 0, night = 1) {
  return {
    seed,
    night,
    lumens: 0,
    lifetime: 0,
    embers,
    lifetimeEmbers: embers,
    upgrades: {},
    runs: 0,
    bestDepth: 0,
    lastSeen: Date.now(),
    echo: null,
  };
}

export function level(state, id) {
  return state.upgrades[id] || 0;
}

export function embersMultiplier(embers) {
  return embers <= 0 ? 1 : 1 + Math.pow(embers, 0.3) * 0.6;
}

export function decayRate(state) {
  return NIGHT.decay * Math.pow(0.82, level(state, 'wick'));
}

export function yieldRate(state) {
  return (
    NIGHT.yield *
    (1 + 0.35 * level(state, 'yield')) *
    embersMultiplier(state.embers + (state.spentEmbers || 0))
  );
}

export function offlineLimits(state) {
  const l = level(state, 'night');
  return {
    capSeconds: (NIGHT.offlineCapHours + 4 * l) * 3600,
    efficiency: Math.min(1, NIGHT.offlineEfficiency + 0.1 * l),
  };
}

/**
 * Advance the whole shaft by `seconds`, exactly.
 * @returns lumens earned
 */
export function advance(state, lanterns, seconds) {
  if (!(seconds > 0)) return 0;
  const k = decayRate(state);
  const rate = yieldRate(state);
  const fall = Math.exp(-k * seconds);
  let earned = 0;
  for (const l of lanterns) {
    if (l.charge <= 0) continue;
    // Each lantern earns at its own rate: charge from the climb (1x3),
    // multiplied by how well its board is routed (2x4).
    earned += (l.charge * rate * (l.yieldMult || 1) * (1 - fall)) / k;
    l.charge *= fall;
  }
  state.lumens += earned;
  state.lifetime += earned;
  return earned;
}

/** Catching up after the tab was closed: capped, taxed, and honest about it. */
export function applyOffline(state, lanterns, elapsedSeconds) {
  const { capSeconds, efficiency } = offlineLimits(state);
  const away = Math.max(0, elapsedSeconds);
  const used = Math.min(away, capSeconds) * efficiency;
  const earned = advance(state, lanterns, used);
  return { away, simulated: used, capped: away > capSeconds, efficiency, earned };
}

/** Lumens per second right now, per lantern and in total. */
export function shaftRate(state, lanterns) {
  const rate = yieldRate(state);
  let total = 0;
  for (const l of lanterns) total += l.charge * rate * (l.yieldMult || 1);
  return total;
}

export function totalLight(lanterns) {
  if (!lanterns.length) return 0;
  let sum = 0;
  for (const l of lanterns) sum += l.charge;
  return sum / lanterns.length;
}

export function dawnProgress(lanterns) {
  return clamp(totalLight(lanterns) / NIGHT.dawnAt, 0, 1);
}

/**
 * Embers for ending the night. Logarithmic on purpose: the same lesson the
 * idle game taught — a power law here makes the whole loop doubly exponential
 * and the game eats itself inside an hour.
 */
export function emberGain(state) {
  if (state.lifetime < NIGHT.dawnFloor) return 0;
  const orders = Math.log10(state.lifetime) - Math.log10(NIGHT.dawnFloor);
  if (orders <= 0) return 0;
  return Math.floor(Math.pow(orders, NIGHT.dawnExponent) * NIGHT.dawnScale) + 1;
}

export function canDawn(lanterns) {
  return dawnProgress(lanterns) >= 1;
}

/** Dawn: keep embers and upgrades, lose the shaft, get a new seed. */
export function breakDawn(state) {
  const gain = emberGain(state);
  state.embers += gain;
  state.lifetimeEmbers += gain;
  state.night++;
  state.seed = (state.seed * 1103515245 + state.night * 12345) >>> 0;
  state.lumens = 0;
  state.lifetime = 0;
  state.echo = null;
  return gain;
}

export function upgradeCost(state, id) {
  const def = UPGRADES.find((u) => u.id === id);
  if (!def) return null;
  const l = level(state, id);
  if (l >= def.levels) return null;
  return Math.ceil(def.cost * Math.pow(def.mult, l));
}

export function buyUpgrade(state, id) {
  const cost = upgradeCost(state, id);
  if (cost === null || state.lumens < cost) return false;
  state.lumens -= cost;
  state.upgrades[id] = level(state, id) + 1;
  return true;
}



// --- echoes ---------------------------------------------------------------
//
// A run is deterministic given the shaft and the held/released timeline, so a
// whole ghost is a few hundred bytes: the seed and the moments the button
// changed. Your last run climbs beside you, and what it lights counts —
// at half weight, because it is a memory, not a person.

export function recordInput(run, held) {
  const last = run.inputs[run.inputs.length - 1];
  if (!last || last[1] !== (held ? 1 : 0)) run.inputs.push([Number(run.time.toFixed(2)), held ? 1 : 0]);
}

export function makeEcho(run, summary) {
  if (run.inputs.length < 2) return null;
  return { inputs: run.inputs.slice(0, 400), depth: summary.depth, banked: summary.banked };
}

/** What the echo's button is doing at time `t`. */
export function echoHeld(echo, t) {
  if (!echo) return false;
  let held = false;
  for (const [at, value] of echo.inputs) {
    if (at > t) break;
    held = value === 1;
  }
  return held;
}

export const ECHO_WEIGHT = 0.5;
