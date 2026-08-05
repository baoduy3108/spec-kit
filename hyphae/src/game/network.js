// The mycelium you are actually growing.
//
// The visual is not decoration bolted on afterwards: the branch count, depth
// and glow are all read off the same numbers the economy runs on, so the
// picture on screen *is* the save file. Deterministic from a seed, so the
// network you grow is yours and does not reshuffle every frame.

import { TIERS } from './config.js';

export const TAU = Math.PI * 2;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Build a branching network once. `capacity` is the largest structure we ever
 * draw; how much of it is *visible* is decided per frame by the game state.
 */
export function buildNetwork(seed = 1, capacity = 620) {
  const rng = mulberry32(seed);
  const nodes = [{ x: 0, y: 0, depth: 0, parent: -1, angle: -Math.PI / 2, len: 0 }];
  const edges = [];
  const frontier = [0];

  while (nodes.length < capacity && frontier.length) {
    const idx = frontier.shift();
    const parent = nodes[idx];
    const children = parent.depth === 0 ? 3 : rng() < 0.62 ? 2 : 1;
    for (let c = 0; c < children; c++) {
      if (nodes.length >= capacity) break;
      const spread = parent.depth === 0 ? 1.5 : 0.95;
      const angle = parent.angle + (rng() - 0.5) * spread;
      const len = (34 + rng() * 26) * Math.pow(0.88, parent.depth);
      const node = {
        x: parent.x + Math.cos(angle) * len,
        y: parent.y + Math.sin(angle) * len,
        depth: parent.depth + 1,
        parent: idx,
        angle,
        len,
        wobble: rng() * TAU,
        /** Fruiting bodies bloom on a deterministic subset of tips. */
        fruit: rng() < 0.16,
      };
      nodes.push(node);
      edges.push({ from: idx, to: nodes.length - 1, depth: node.depth, phase: rng() * TAU });
      frontier.push(nodes.length - 1);
    }
  }

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  for (const n of nodes) {
    minX = Math.min(minX, n.x);
    maxX = Math.max(maxX, n.x);
    minY = Math.min(minY, n.y);
  }
  return { nodes, edges, bounds: { minX, maxX, minY }, capacity };
}

/**
 * How much of the network is alive right now, from the state.
 *
 * Everything is read through log10 because the underlying numbers span
 * hundreds of orders of magnitude — a linear mapping would show nothing for
 * the first minute and then saturate forever after.
 */
export function vitality(state) {
  const biomass = Math.max(0, state.biomass.log10());
  const reach = Math.min(1, biomass / 26); // 0 at start, 1 around 1e26
  const tiers = state.tiers.map((t, i) => {
    const owned = t.count.log10();
    return {
      id: TIERS[i].id,
      owned: t.count,
      /** 0..1 presence of this tier in the picture */
      strength: t.count.isZero() ? 0 : Math.min(1, Math.max(0.08, (owned + 1) / 14)),
    };
  });
  return {
    reach,
    tiers,
    /** Fruiting bodies only appear once you actually own some. */
    fruiting: tiers[3] ? tiers[3].strength : 0,
    /** Deep tiers add the slow golden pulse. */
    deep: tiers[5] ? tiers[5].strength : 0,
    glow: Math.min(1, Math.max(0, state.totalSpores.log10() / 12)),
  };
}
