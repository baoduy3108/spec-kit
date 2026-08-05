// The economy. Pure functions over a plain state object — no DOM, no canvas,
// no timers — so the whole game can be fast-forwarded in a test.
//
// The growth chain is a linear system with constant coefficients:
//
//     d(biomass)/dt = r1 * tier1
//     d(tier_i)/dt  = r_{i+1} * tier_{i+1}
//
// The coefficient matrix is strictly upper triangular, therefore nilpotent,
// therefore exp(At) is a *finite* series. That gives an exact closed form for
// "advance the world by t seconds", which is what makes offline progress here
// mathematically correct rather than an approximation with a fudge factor.
//
// Every quantity that can run away — biomass, tier counts, spores — is a
// Decimal, so the game has no ceiling.

import { D, ONE, ZERO } from '../core/decimal.js';
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_BONUS,
  BLOOM,
  BOOST_EVERY,
  BOOST_MULT,
  FORAGE,
  MUTATIONS,
  OFFLINE,
  TIERS,
  sporeMultiplier,
} from './config.js';

export const SIZE = TIERS.length + 1; // biomass + every tier
export const START_BIOMASS = 12;

export function newState(now = Date.now()) {
  return {
    version: 1,
    biomass: D(START_BIOMASS),
    /** Biomass earned since the last bloom — the bloom yield is based on it. */
    earned: ZERO,
    totalEarned: ZERO,
    spores: ZERO,
    totalSpores: ZERO,
    blooms: 0,
    tiers: TIERS.map(() => ({ count: ZERO, bought: 0 })),
    mutations: {},
    achievements: [],
    stats: {
      started: now,
      playTime: 0,
      bestOffline: 0,
      bestSpores: ZERO,
      forages: 0,
      buys: 0,
    },
    lastSeen: now,
  };
}

// --- multipliers ----------------------------------------------------------

export function mutationLevel(state, id) {
  return state.mutations[id] || 0;
}

export function globalMultiplier(state) {
  const roots = 1 + 0.4 * mutationLevel(state, 'roots');
  const awards = 1 + ACHIEVEMENT_BONUS * state.achievements.length;
  return sporeMultiplier(state.totalSpores).mul(roots).mul(awards);
}

/** Output of one unit of tier `i`, per second. */
export function boostEvery(state) {
  return Math.max(4, BOOST_EVERY - mutationLevel(state, 'cadence'));
}

export function unitRate(state, i, global = globalMultiplier(state)) {
  const boosts = Math.floor(state.tiers[i].bought / boostEvery(state));
  return D(TIERS[i].rate).mul(D(BOOST_MULT).pow(boosts)).mul(global);
}

/** What tier `i` currently produces per second, in units of its target. */
export function tierOutput(state, i, global = globalMultiplier(state)) {
  return state.tiers[i].count.mul(unitRate(state, i, global));
}

/** Biomass per second right now. */
export function biomassRate(state) {
  const global = globalMultiplier(state);
  let rate = tierOutput(state, 0, global);
  const sym = symbiosisFactor(state);
  if (sym > 0) rate = rate.add(tierOutput(state, 1, global).mul(sym));
  return rate;
}

export function symbiosisFactor(state) {
  return 0.12 * mutationLevel(state, 'symbiosis');
}

// --- costs ----------------------------------------------------------------

export function costOf(state, i) {
  const t = TIERS[i];
  const discount = Math.pow(0.94, mutationLevel(state, 'cheap'));
  return D(t.cost).mul(D(t.costMult).pow(state.tiers[i].bought)).mul(discount);
}

/** Total price of the next `n` purchases of tier `i` (geometric series). */
export function costOfMany(state, i, n) {
  if (n <= 0) return ZERO;
  const m = TIERS[i].costMult;
  return costOf(state, i)
    .mul(D(m).pow(n).sub(ONE))
    .div(m - 1);
}

/** How many of tier `i` the current biomass can buy, in closed form. */
export function affordable(state, i) {
  const c0 = costOf(state, i);
  if (state.biomass.lt(c0)) return 0;
  const m = TIERS[i].costMult;
  // n = log_m(1 + biomass * (m - 1) / c0)
  const ratio = state.biomass.mul(m - 1).div(c0);
  const log = ratio.log10() > 14 ? ratio.log10() : Math.log10(1 + ratio.toNumber());
  return Math.max(0, Math.floor(log / Math.log10(m) + 1e-9));
}

export function buy(state, i, count = 1) {
  const n = Math.min(count, affordable(state, i));
  if (n <= 0) return 0;
  state.biomass = state.biomass.sub(costOfMany(state, i, n));
  if (state.biomass.sign < 0) state.biomass = ZERO;
  state.tiers[i].count = state.tiers[i].count.add(n);
  state.tiers[i].bought += n;
  state.stats.buys += n;
  return n;
}

export function buyMax(state, i) {
  return buy(state, i, affordable(state, i));
}

// --- time -----------------------------------------------------------------

/**
 * Coefficient matrix. `A[i][j]` is how much x_j adds to x_i per second.
 * x_0 is biomass, x_k (k>=1) is tier k-1.
 */
export function coefficients(state) {
  const global = globalMultiplier(state);
  const sym = symbiosisFactor(state);
  const A = [];
  for (let i = 0; i < SIZE; i++) A.push(new Array(SIZE).fill(null));

  for (let t = 0; t < TIERS.length; t++) {
    const rate = unitRate(state, t, global);
    A[t][t + 1] = rate;
    // Symbiosis: a tier also drips into the slot two below it.
    if (sym > 0 && t >= 1) {
      A[t - 1][t + 1] = (A[t - 1][t + 1] || ZERO).add(rate.mul(sym));
    }
  }
  return A;
}

/**
 * Advance the world by `seconds` exactly, assuming nothing is bought during
 * that time. exp(A·t)·x, with a series that terminates because A is nilpotent.
 *
 * @returns the biomass gained (Decimal)
 */
export function advance(state, seconds) {
  if (!(seconds > 0)) return ZERO;
  const A = coefficients(state);

  const x = new Array(SIZE);
  x[0] = state.biomass;
  for (let i = 0; i < TIERS.length; i++) x[i + 1] = state.tiers[i].count;

  let term = x.slice();
  const out = x.slice();
  for (let k = 1; k < SIZE; k++) {
    const next = new Array(SIZE).fill(ZERO);
    let any = false;
    for (let i = 0; i < SIZE; i++) {
      let sum = ZERO;
      for (let j = i + 1; j < SIZE; j++) {
        const a = A[i][j];
        if (a && !a.isZero() && !term[j].isZero()) sum = sum.add(a.mul(term[j]));
      }
      if (!sum.isZero()) {
        next[i] = sum.mul(seconds / k);
        out[i] = out[i].add(next[i]);
        any = true;
      }
    }
    term = next;
    if (!any) break;
  }

  const gained = out[0].sub(state.biomass);
  state.biomass = out[0];
  for (let i = 0; i < TIERS.length; i++) state.tiers[i].count = out[i + 1];
  if (gained.sign > 0) {
    state.earned = state.earned.add(gained);
    state.totalEarned = state.totalEarned.add(gained);
  }
  state.stats.playTime += seconds;
  return gained.sign > 0 ? gained : ZERO;
}

// --- automation -----------------------------------------------------------

const AUTO_RANGES = { auto1: [0, 1], auto2: [2, 3], auto3: [4, 7] };

export function automatedTiers(state) {
  const tiers = [];
  for (const [id, [from, to]] of Object.entries(AUTO_RANGES)) {
    if (mutationLevel(state, id) > 0) {
      for (let i = from; i <= to; i++) tiers.push(i);
    }
  }
  return tiers;
}

/**
 * Spend from the most expensive automated tier down: buying the top of the
 * chain compounds hardest, which is what a good player does by hand.
 */
export function runAutomation(state) {
  const tiers = automatedTiers(state).sort((a, b) => b - a);
  let bought = 0;
  for (const i of tiers) bought += buy(state, i, affordable(state, i));
  return bought;
}

// --- manual action --------------------------------------------------------

export function forageValue(state) {
  const level = mutationLevel(state, 'forage');
  const flat = D(FORAGE.base * (1 + 2 * level));
  const fromIncome = biomassRate(state).mul(FORAGE.secondsOfIncome * (1 + level));
  return flat.max(fromIncome);
}

export function forage(state) {
  const gain = forageValue(state);
  state.biomass = state.biomass.add(gain);
  state.earned = state.earned.add(gain);
  state.totalEarned = state.totalEarned.add(gain);
  state.stats.forages++;
  return gain;
}

// --- bloom (prestige) -----------------------------------------------------

export function bloomGain(state) {
  if (state.earned.lt(BLOOM.threshold)) return ZERO;
  const heavy = 1 + 0.2 * mutationLevel(state, 'bloomier');
  const orders = state.earned.log10() - Math.log10(BLOOM.threshold);
  if (orders <= 0) return ZERO;
  return D(Math.pow(orders, BLOOM.exponent) * BLOOM.scale * heavy).floor();
}

export function canBloom(state) {
  return bloomGain(state).gte(ONE);
}

/** Reset the network, keep spores, mutations, achievements and stats. */
export function bloom(state) {
  const gain = bloomGain(state);
  if (gain.lt(ONE)) return ZERO;
  state.spores = state.spores.add(gain);
  state.totalSpores = state.totalSpores.add(gain);
  state.blooms++;
  state.stats.bestSpores = state.stats.bestSpores.max(gain);
  const keep = 0.1 * mutationLevel(state, 'wind');
  const before = state.tiers;
  state.biomass = D(START_BIOMASS);
  state.earned = ZERO;
  state.tiers = TIERS.map((_, i) => {
    const bought = keep > 0 ? Math.floor(before[i].bought * keep) : 0;
    return { count: D(bought), bought };
  });
  return gain;
}

// --- mutations ------------------------------------------------------------

export function mutationById(id) {
  return MUTATIONS.find((m) => m.id === id);
}

export function mutationCost(state, id) {
  const def = mutationById(id);
  if (!def) return null;
  const level = mutationLevel(state, id);
  if (level >= def.levels) return null;
  return D(Math.ceil(def.cost * Math.pow(def.costMult, level)));
}

export function buyMutation(state, id) {
  const cost = mutationCost(state, id);
  if (!cost || state.spores.lt(cost)) return false;
  state.spores = state.spores.sub(cost);
  state.mutations[id] = mutationLevel(state, id) + 1;
  return true;
}

// --- offline --------------------------------------------------------------

export function offlineLimits(state) {
  const level = mutationLevel(state, 'offline');
  return {
    capSeconds: (OFFLINE.baseCapHours + OFFLINE.capPerLevel * level) * 3600,
    efficiency: Math.min(1, OFFLINE.baseEfficiency + OFFLINE.effPerLevel * level),
  };
}

/**
 * Catch the world up after the tab was closed.
 *
 * Runs in chunks so automation still fires while you are away — an idle game
 * where automation stops the moment you close the tab is not an idle game.
 * Each chunk itself uses the exact closed form.
 */
export function applyOffline(state, elapsedSeconds, chunks = 120) {
  const { capSeconds, efficiency } = offlineLimits(state);
  const real = Math.max(0, elapsedSeconds);
  const used = Math.min(real, capSeconds) * efficiency;
  if (used <= 0) {
    return { away: real, simulated: 0, capped: false, gained: ZERO, bought: 0, efficiency };
  }

  const before = state.totalEarned;
  const automating = automatedTiers(state).length > 0;
  const steps = automating ? Math.max(1, Math.min(chunks, Math.ceil(used / 10))) : 1;
  const dt = used / steps;
  let bought = 0;
  for (let i = 0; i < steps; i++) {
    advance(state, dt);
    if (automating) bought += runAutomation(state);
  }

  state.stats.bestOffline = Math.max(state.stats.bestOffline, real);
  return {
    away: real,
    simulated: used,
    capped: real > capSeconds,
    gained: state.totalEarned.sub(before),
    bought,
    efficiency,
  };
}

// --- achievements ---------------------------------------------------------

/** @returns the achievements unlocked by this call. */
export function checkAchievements(state) {
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (state.achievements.includes(a.id)) continue;
    let ok = false;
    try {
      ok = a.test(state);
    } catch (_) {
      ok = false;
    }
    if (ok) {
      state.achievements.push(a.id);
      fresh.push(a);
    }
  }
  return fresh;
}
