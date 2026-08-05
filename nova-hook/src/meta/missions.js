// Three daily missions, deterministic from the day seed. Pure functions so the
// progression rules are unit-testable.

import { makeRng } from '../core/rng.js';

const TEMPLATES = [
  { id: 'depth', stat: 'depth', label: (n) => `Reach ${n}m in one run`, tiers: [400, 700, 1100] },
  { id: 'combo', stat: 'combo', label: (n) => `Chain ${n} perfect releases`, tiers: [6, 10, 15] },
  { id: 'shards', stat: 'shards', label: (n) => `Collect ${n} shards`, tiers: [40, 70, 110], cumulative: true },
  { id: 'nova', stat: 'novas', label: (n) => `Trigger ${n} Nova Surges`, tiers: [2, 4, 6], cumulative: true },
  { id: 'score', stat: 'score', label: (n) => `Score ${n} in one run`, tiers: [1500, 3000, 5000] },
  { id: 'runs', stat: 'runs', label: (n) => `Finish ${n} runs`, tiers: [3, 5, 8], cumulative: true },
];

/** @returns three distinct missions for the given seed. */
export function dailyMissions(seed) {
  const rng = makeRng(seed);
  const pool = TEMPLATES.slice();
  const picked = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    const idx = rng.int(0, pool.length - 1);
    const tpl = pool.splice(idx, 1)[0];
    const tier = rng.int(0, tpl.tiers.length - 1);
    const goal = tpl.tiers[tier];
    picked.push({
      id: tpl.id,
      stat: tpl.stat,
      cumulative: !!tpl.cumulative,
      goal,
      progress: 0,
      done: false,
      reward: 60 + tier * 55,
      text: tpl.label(goal),
    });
  }
  return picked;
}

/**
 * Fold one finished run into the mission list.
 * `run` is a scoring.summary() object plus { runs: 1 }.
 * @returns { missions, earned } — earned coins from missions completed now.
 */
export function applyRun(missions, run) {
  let earned = 0;
  const next = missions.map((m) => {
    if (m.done) return m;
    const value = m.stat === 'runs' ? 1 : run[m.stat] || 0;
    const progress = m.cumulative ? m.progress + value : Math.max(m.progress, value);
    const done = progress >= m.goal;
    if (done) earned += m.reward;
    return { ...m, progress: Math.min(progress, m.goal), done };
  });
  return { missions: next, earned };
}

export function allDone(missions) {
  return missions.length > 0 && missions.every((m) => m.done);
}
