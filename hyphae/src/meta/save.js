// Persistence. Decimals are stored as "m e" strings, so a save survives
// numbers that no JSON number could hold.

import { D, Decimal, ZERO } from '../core/decimal.js';
import { newState } from '../game/engine.js';
import { TIERS } from '../game/config.js';

const KEY = 'hyphae.save.v1';

/** Fields that are Decimals at the top level of the state. */
const DECIMALS = ['biomass', 'earned', 'totalEarned', 'spores', 'totalSpores'];

export function serialise(state) {
  const out = {
    version: state.version,
    blooms: state.blooms,
    mutations: state.mutations,
    achievements: state.achievements,
    lastSeen: Date.now(),
    stats: { ...state.stats, bestSpores: state.stats.bestSpores.toJSON() },
    tiers: state.tiers.map((t) => ({ count: t.count.toJSON(), bought: t.bought })),
  };
  for (const key of DECIMALS) out[key] = state[key].toJSON();
  return out;
}

export function deserialise(raw, now = Date.now()) {
  const state = newState(now);
  if (!raw || typeof raw !== 'object') return state;
  try {
    for (const key of DECIMALS) {
      if (raw[key] != null) state[key] = Decimal.fromJSON(raw[key]);
    }
    if (Array.isArray(raw.tiers)) {
      state.tiers = TIERS.map((_, i) => {
        const t = raw.tiers[i] || {};
        return {
          count: t.count != null ? Decimal.fromJSON(t.count) : ZERO,
          bought: Number(t.bought) || 0,
        };
      });
    }
    state.blooms = Number(raw.blooms) || 0;
    state.mutations = raw.mutations && typeof raw.mutations === 'object' ? raw.mutations : {};
    state.achievements = Array.isArray(raw.achievements) ? raw.achievements : [];
    state.lastSeen = Number(raw.lastSeen) || now;
    if (raw.stats) {
      state.stats = {
        ...state.stats,
        ...raw.stats,
        bestSpores: raw.stats.bestSpores != null ? Decimal.fromJSON(raw.stats.bestSpores) : ZERO,
      };
    }
  } catch (_) {
    return newState(now);
  }
  // A corrupt or hand-edited save must never produce NaN numbers.
  for (const key of DECIMALS) {
    if (!Number.isFinite(state[key].m) || !Number.isFinite(state[key].e)) state[key] = ZERO;
  }
  if (state.biomass.isZero() && state.totalEarned.isZero()) state.biomass = D(12);
  return state;
}

function storage() {
  try {
    const s = window.localStorage;
    s.setItem('__hy__', '1');
    s.removeItem('__hy__');
    return s;
  } catch (_) {
    return null;
  }
}

export function save(state) {
  const s = storage();
  if (!s) return false;
  try {
    s.setItem(KEY, JSON.stringify(serialise(state)));
    return true;
  } catch (_) {
    return false;
  }
}

/** @returns {{state, raw}} — `raw` is null when there was no save. */
export function load(now = Date.now()) {
  const s = storage();
  if (!s) return { state: newState(now), raw: null };
  try {
    const text = s.getItem(KEY);
    if (!text) return { state: newState(now), raw: null };
    const raw = JSON.parse(text);
    return { state: deserialise(raw, now), raw };
  } catch (_) {
    return { state: newState(now), raw: null };
  }
}

export function wipe() {
  const s = storage();
  if (s) {
    try {
      s.removeItem(KEY);
    } catch (_) {
      /* ignore */
    }
  }
}

/** Export/import so a player can move a save between devices by hand. */
export function exportSave(state) {
  const json = JSON.stringify(serialise(state));
  if (typeof btoa === 'function') return btoa(unescape(encodeURIComponent(json)));
  return Buffer.from(json, 'utf8').toString('base64');
}

export function importSave(text, now = Date.now()) {
  try {
    const json =
      typeof atob === 'function'
        ? decodeURIComponent(escape(atob(text.trim())))
        : Buffer.from(text.trim(), 'base64').toString('utf8');
    const raw = JSON.parse(json);
    if (!raw || typeof raw !== 'object') return null;
    return deserialise(raw, now);
  } catch (_) {
    return null;
  }
}
