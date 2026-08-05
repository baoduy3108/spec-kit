// Deterministic, seedable RNG. Same seed => same run, which is what makes
// the Daily Challenge fair (everyone plays the identical level).

/** FNV-1a, returns an unsigned 32 bit int. */
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Classic mulberry32: tiny, fast, good enough for level generation. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const seedInt = typeof seed === 'string' ? hashString(seed) : seed >>> 0;
  const next = mulberry32(seedInt);
  return {
    seed: seedInt,
    next,
    range: (a, b) => a + next() * (b - a),
    int: (a, b) => Math.floor(a + next() * (b - a + 1)),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length) % arr.length],
    fork: (salt) => makeRng((seedInt ^ hashString(String(salt))) >>> 0),
  };
}

/** YYYY-MM-DD in local time — the key everything "daily" hangs off. */
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dailySeed(date = new Date()) {
  return hashString('nova-hook-daily-' + dayKey(date));
}
