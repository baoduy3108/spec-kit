// Local persistence. Everything is stored on-device; the game has no server,
// no account and no telemetry.

const KEY = 'novahook.save.v1';

export function defaults() {
  return {
    best: 0,
    bestDepth: 0,
    bestCombo: 0,
    coins: 0,
    runs: 0,
    totalShards: 0,
    skin: 'ion',
    owned: ['ion'],
    daily: { day: '', best: 0, runs: 0, done: false },
    missions: { day: '', list: [], claimed: false },
    settings: { sfx: true, music: true, reduceMotion: false, haptics: true },
    seenTutorial: false,
  };
}

function storage() {
  try {
    const s = window.localStorage;
    const probe = '__nh__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch (_) {
    return null;
  }
}

export function load() {
  const s = storage();
  if (!s) return defaults();
  try {
    const raw = s.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    const base = defaults();
    return {
      ...base,
      ...parsed,
      daily: { ...base.daily, ...(parsed.daily || {}) },
      missions: { ...base.missions, ...(parsed.missions || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) },
      owned: Array.isArray(parsed.owned) && parsed.owned.length ? parsed.owned : base.owned,
    };
  } catch (_) {
    return defaults();
  }
}

export function save(data) {
  const s = storage();
  if (!s) return false;
  try {
    s.setItem(KEY, JSON.stringify(data));
    return true;
  } catch (_) {
    return false;
  }
}

export function reset() {
  const s = storage();
  if (s) {
    try {
      s.removeItem(KEY);
    } catch (_) {
      /* ignore */
    }
  }
  return defaults();
}
