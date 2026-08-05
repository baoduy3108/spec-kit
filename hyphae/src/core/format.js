// Number formatting. An idle game is a machine for showing numbers, so this
// is a load-bearing module: it has to stay readable from 0 to 1e300.

const SUFFIXES = [
  '',
  'K',
  'M',
  'B',
  'T',
  'Qa',
  'Qi',
  'Sx',
  'Sp',
  'Oc',
  'No',
  'Dc',
  'UDc',
  'DDc',
  'TDc',
  'QaDc',
  'QiDc',
  'SxDc',
  'SpDc',
  'OcDc',
  'NoDc',
  'Vg',
];

/**
 * 12345 -> "12.35K", 1.2e40 -> "1.20e40".
 * Accepts plain numbers and Decimals; values below 1000 keep enough decimals
 * that early progress visibly moves.
 */
export function fmt(value, decimals = 2) {
  if (value && typeof value === 'object' && typeof value.log10 === 'function') {
    return fmtDecimal(value, decimals);
  }
  if (!Number.isFinite(value)) return '∞';
  if (value < 0) return '-' + fmt(-value, decimals);
  if (value === 0) return '0';

  if (value < 1) {
    if (value < 0.001) return value.toExponential(2);
    return trim(value.toFixed(3));
  }
  if (value < 1000) {
    if (value < 10) return trim(value.toFixed(2));
    if (value < 100) return trim(value.toFixed(1));
    return String(Math.floor(value));
  }

  const tier = Math.floor(Math.log10(value) / 3);
  if (tier >= SUFFIXES.length) {
    const exp = value.toExponential(decimals);
    const [mantissa, e] = exp.split('e');
    return `${mantissa}e${Number(e)}`;
  }
  const scaled = value / Math.pow(1000, tier);
  return trim(scaled.toFixed(scaled < 10 ? decimals : scaled < 100 ? 1 : 0)) + SUFFIXES[tier];
}

/** Beyond the double range we work from log10 alone. */
function fmtDecimal(d, decimals) {
  if (d.isZero()) return '0';
  if (d.sign < 0) return '-' + fmtDecimal(d.neg(), decimals);
  const log = d.log10();
  if (log < 15) return fmt(d.toNumber(), decimals);
  const tier = Math.floor(log / 3);
  if (tier < SUFFIXES.length) {
    const scaled = d.m * Math.pow(10, d.e - tier * 3);
    return trim(scaled.toFixed(scaled < 10 ? decimals : scaled < 100 ? 1 : 0)) + SUFFIXES[tier];
  }
  return `${trim(d.m.toFixed(decimals))}e${d.e}`;
}

/** Whole numbers, no suffix below 1000 — used for counts you can buy. */
export function fmtInt(value) {
  const isDec = value && typeof value === 'object' && typeof value.log10 === 'function';
  const n = isDec ? (value.log10() < 15 ? value.toNumber() : null) : value;
  if (n !== null && n < 1000) return String(Math.floor(n));
  return fmt(value);
}

/** "3h 12m", "45s" — for offline time and session length. */
export function fmtTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  const s = Math.floor(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ${m % 60}m`;
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h`;
}

/** Per-second rates read better with a slash. */
export function fmtRate(value) {
  return `${fmt(value)}/s`;
}

function trim(str) {
  return str.includes('.') ? str.replace(/\.?0+$/, '') : str;
}
