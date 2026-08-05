// Small shared toolbox: maths, formatting, seeded noise. All pure.

export const TAU = Math.PI * 2;

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const sign = (v) => (v < 0 ? -1 : 1);
export const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);

export function wrapAngle(a) {
  let r = a % TAU;
  if (r <= -Math.PI) r += TAU;
  if (r > Math.PI) r -= TAU;
  return r;
}

export const angleDiff = (a, b) => wrapAngle(a - b);

export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function norm(x, y) {
  const l = Math.hypot(x, y);
  return l < 1e-6 ? { x: 0, y: 0 } : { x: x / l, y: y / l };
}

export function pointSegmentDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy;
  if (l2 < 1e-9) return Math.hypot(px - ax, py - ay);
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / l2, 0, 1);
  return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

// --- seeded randomness ----------------------------------------------------

export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const s = typeof seed === 'string' ? hashString(seed) : seed >>> 0;
  const next = mulberry32(s);
  return {
    seed: s,
    next,
    range: (a, b) => a + next() * (b - a),
    int: (a, b) => Math.floor(a + next() * (b - a + 1)),
    chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length) % arr.length],
  };
}

// --- formatting -----------------------------------------------------------

const SUFFIX = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];

export function fmt(value, decimals = 2) {
  if (!Number.isFinite(value)) return '∞';
  if (value < 0) return '-' + fmt(-value, decimals);
  if (value === 0) return '0';
  if (value < 1) return value < 0.01 ? value.toExponential(1) : trim(value.toFixed(2));
  if (value < 1000) return value < 10 ? trim(value.toFixed(1)) : String(Math.floor(value));
  const tier = Math.floor(Math.log10(value) / 3);
  if (tier >= SUFFIX.length) {
    const [m, e] = value.toExponential(decimals).split('e');
    return `${m}e${Number(e)}`;
  }
  const scaled = value / Math.pow(1000, tier);
  return trim(scaled.toFixed(scaled < 10 ? decimals : scaled < 100 ? 1 : 0)) + SUFFIX[tier];
}

export function fmtTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  const s = Math.floor(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ${m % 60}m`;
  return `${Math.floor(h / 24)}d ${h % 24}h`;
}

function trim(str) {
  return str.includes('.') ? str.replace(/\.?0+$/, '') : str;
}
