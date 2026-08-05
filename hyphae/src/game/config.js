// All game data. Balance lives here and nowhere else, so the pacing test can
// reason about the whole economy from one file.

import { ONE } from '../core/decimal.js';

/**
 * The growth chain. Tier 1 makes Biomass; every other tier makes the tier
 * below it. That structure is what turns idle time into polynomial growth
 * instead of linear trickle.
 */
export const TIERS = [
  {
    id: 'hypha',
    name: 'Hypha',
    blurb: 'A single thread, feeling forward through the dark.',
    cost: 8,
    costMult: 1.42,
    rate: 1.0,
  },
  {
    id: 'node',
    name: 'Mycelial Node',
    blurb: 'Where threads meet, they decide things.',
    cost: 180,
    costMult: 1.47,
    rate: 0.2,
  },
  {
    id: 'rhizomorph',
    name: 'Rhizomorph',
    blurb: 'A root-cord: the network builds highways.',
    cost: 8000.0,
    costMult: 1.52,
    rate: 0.09,
  },
  {
    id: 'fruit',
    name: 'Fruiting Body',
    blurb: 'It breaks the surface. Something is watching.',
    cost: 400000,
    costMult: 1.57,
    rate: 0.055,
  },
  {
    id: 'cloud',
    name: 'Spore Cloud',
    blurb: 'The forest inhales you and carries you further.',
    cost: 2.5e+07,
    costMult: 1.62,
    rate: 0.032,
  },
  {
    id: 'symbiont',
    name: 'Symbiont Root',
    blurb: 'A tree agrees to the arrangement.',
    cost: 1.6e+09,
    costMult: 1.67,
    rate: 0.02,
  },
  {
    id: 'oldgrowth',
    name: 'Old Growth',
    blurb: 'Two hundred years of quiet cooperation.',
    cost: 1.2e+11,
    costMult: 1.72,
    rate: 0.014,
  },
  {
    id: 'mind',
    name: 'Forest Mind',
    blurb: 'The whole valley, thinking one slow thought.',
    cost: 1e+13,
    costMult: 1.77,
    rate: 0.009,
  },
];

/** Every 10 purchases of a tier double that tier's output. */
export const BOOST_EVERY = 10;
export const BOOST_MULT = 2;

/**
 * The manual button. It is worth a few seconds of the *current* network, and
 * deliberately NOT a function of total spores: scaling it with prestige
 * currency turns every bloom into a one-click restart and collapses the whole
 * loop. (It did. The pacing harness caught it.)
 */
export const FORAGE = { base: 2, secondsOfIncome: 1.5 };

export const BLOOM = {
  /** You cannot bloom before this much biomass has been earned this cycle. */
  threshold: 3e9,
  /**
   * spores = scale * (log10(earned) - log10(threshold)) ^ exponent
   *
   * Logarithmic on purpose. The network grows polynomially in time *and*
   * compounds through eight links, so any power-law payout makes the prestige
   * loop doubly exponential — cycles collapse from 15 minutes to 40 seconds
   * inside two hours. On a log scale, biomass has to grow by whole orders of
   * magnitude to buy the next spore, which is exactly the pacing this genre
   * wants: numbers that look absurd, progress that stays legible.
   */
  scale: 2.6,
  exponent: 1.15,
};

/**
 * Spores give a permanent multiplier to every tier.
 *
 * The exponent looks timid on purpose. It multiplies all eight links of the
 * chain, and the chain compounds it to roughly the eighth power, so a x3
 * shown here is about x6500 in practice. Raising it turns the prestige loop
 * doubly exponential and the game eats itself in under an hour — that is not
 * a guess, it is what the pacing harness printed.
 */
export function sporeMultiplier(totalSpores) {
  if (totalSpores.isZero() || totalSpores.sign < 0) return ONE;
  return ONE.add(totalSpores.pow(0.35).mul(0.8));
}

/**
 * Mutations: permanent upgrades bought with spores. `levels` > 1 means the
 * upgrade is repeatable and the cost grows by `costMult` each level.
 */
export const MUTATIONS = [
  {
    id: 'roots',
    name: 'Deeper Roots',
    blurb: '+40% biomass from the whole network, per level.',
    cost: 2,
    costMult: 4.4,
    levels: 30,
  },
  {
    id: 'forage',
    name: 'Fine Hyphae',
    blurb: 'Foraging by hand is worth far more of the network.',
    cost: 1,
    costMult: 6,
    levels: 8,
  },
  {
    id: 'cheap',
    name: 'Frugal Growth',
    blurb: 'Every tier costs 6% less to expand, per level.',
    cost: 4,
    costMult: 5.5,
    levels: 20,
  },
  {
    id: 'offline',
    name: 'Night Shift',
    blurb: 'Offline growth runs +6h longer and +12% more efficiently.',
    cost: 3,
    costMult: 4.2,
    levels: 8,
  },
  {
    id: 'bloomier',
    name: 'Heavy Spores',
    blurb: 'Blooming yields +20% more spores, per level.',
    cost: 6,
    costMult: 5.2,
    levels: 20,
  },
  {
    id: 'auto1',
    name: 'Reflex: Hyphae',
    blurb: 'Automatically buys Hyphae and Mycelial Nodes.',
    cost: 3,
    costMult: 1,
    levels: 1,
  },
  {
    id: 'auto2',
    name: 'Reflex: Cords',
    blurb: 'Automatically buys Rhizomorphs and Fruiting Bodies.',
    cost: 12,
    costMult: 1,
    levels: 1,
  },
  {
    id: 'auto3',
    name: 'Reflex: Canopy',
    blurb: 'Automatically buys every remaining tier.',
    cost: 45,
    costMult: 1,
    levels: 1,
  },
  {
    id: 'cadence',
    name: 'Quick Study',
    blurb: 'A tier doubles its output every 9 purchases instead of 10, per level.',
    cost: 40,
    costMult: 9,
    levels: 4,
  },
  {
    id: 'wind',
    name: 'Spore Wind',
    blurb: 'Blooming keeps 10% of your purchases in every tier, per level.',
    cost: 120,
    costMult: 12,
    levels: 5,
  },
  {
    id: 'symbiosis',
    name: 'Symbiosis',
    blurb: 'Each tier also feeds the tier two below it, at 12% per level.',
    cost: 20,
    costMult: 6.5,
    levels: 12,
  },
];

/** Offline defaults, before Night Shift is bought. */
export const OFFLINE = { baseCapHours: 4, baseEfficiency: 0.5, capPerLevel: 6, effPerLevel: 0.12 };

export const ACHIEVEMENTS = [
  { id: 'first', name: 'First Thread', blurb: 'Buy a Hypha.', test: (s) => s.tiers[0].bought >= 1 },
  { id: 'ten', name: 'A Braid', blurb: 'Own 10 Hyphae.', test: (s) => s.tiers[0].count.gte(10) },
  {
    id: 'node',
    name: 'A Decision',
    blurb: 'Buy a Mycelial Node.',
    test: (s) => s.tiers[1].bought >= 1,
  },
  {
    id: 'kilo',
    name: 'Standing Crop',
    blurb: 'Hold 1K biomass.',
    test: (s) => s.biomass.gte(1e3),
  },
  {
    id: 'mega',
    name: 'Understorey',
    blurb: 'Hold 1M biomass.',
    test: (s) => s.biomass.gte(1e6),
  },
  {
    id: 'bloom1',
    name: 'Let Go',
    blurb: 'Bloom for the first time.',
    test: (s) => s.blooms >= 1,
  },
  {
    id: 'bloom5',
    name: 'Seasons',
    blurb: 'Bloom five times.',
    test: (s) => s.blooms >= 5,
  },
  {
    id: 'fruit',
    name: 'Above Ground',
    blurb: 'Buy a Fruiting Body.',
    test: (s) => s.tiers[3].bought >= 1,
  },
  {
    id: 'deep',
    name: 'Old Friends',
    blurb: 'Buy a Symbiont Root.',
    test: (s) => s.tiers[5].bought >= 1,
  },
  {
    id: 'mind',
    name: 'One Slow Thought',
    blurb: 'Buy a Forest Mind.',
    test: (s) => s.tiers[7].bought >= 1,
  },
  {
    id: 'spores',
    name: 'Windborne',
    blurb: 'Earn 100 spores in total.',
    test: (s) => s.totalSpores.gte(100),
  },
  {
    id: 'night',
    name: 'It Grew Without You',
    blurb: 'Come back to 4 hours of offline growth.',
    test: (s) => s.stats.bestOffline >= 4 * 3600,
  },
];

/** Each achievement is worth a small, permanent nudge. */
export const ACHIEVEMENT_BONUS = 0.03;
