// A small mantissa/exponent number, because an incremental game whose numbers
// stop at 1e308 stops being an incremental game. Roughly 15 significant
// digits, exponents up to ~1e308 — far past anything a player will reach.
//
// Immutable by convention: every operation returns a new Decimal.

const LOG10 = Math.log(10);

export class Decimal {
  /** @param m mantissa in [1,10) (or 0)  @param e integer exponent */
  constructor(m = 0, e = 0) {
    this.m = m;
    this.e = e;
  }

  static of(value) {
    if (value instanceof Decimal) return value;
    if (typeof value === 'string') return Decimal.fromString(value);
    return Decimal.fromNumber(value);
  }

  static fromNumber(n) {
    if (!Number.isFinite(n) || n === 0) return new Decimal(0, 0);
    const e = Math.floor(Math.log10(Math.abs(n)));
    return normalise(n / Math.pow(10, e), e);
  }

  static fromString(str) {
    const s = String(str).trim();
    const at = s.indexOf('e');
    if (at < 0) return Decimal.fromNumber(Number(s));
    return normalise(Number(s.slice(0, at)), Number(s.slice(at + 1)));
  }

  /** Serialise as "m e" so saves stay exact and small. */
  toJSON() {
    return `${this.m}e${this.e}`;
  }

  static fromJSON(v) {
    if (v == null) return ZERO;
    if (typeof v === 'object' && 'm' in v) return new Decimal(v.m, v.e);
    return Decimal.of(v);
  }

  get sign() {
    return this.m === 0 ? 0 : this.m > 0 ? 1 : -1;
  }

  isZero() {
    return this.m === 0;
  }

  /** log10 of |x| as a plain number; -Infinity for zero. */
  log10() {
    if (this.m === 0) return -Infinity;
    return Math.log10(Math.abs(this.m)) + this.e;
  }

  toNumber() {
    if (this.m === 0) return 0;
    if (this.e > 308) return this.m > 0 ? Infinity : -Infinity;
    if (this.e < -320) return 0;
    return this.m * Math.pow(10, this.e);
  }

  neg() {
    return new Decimal(-this.m, this.e);
  }

  add(other) {
    const b = Decimal.of(other);
    if (this.m === 0) return b;
    if (b.m === 0) return this;
    const [big, small] = this.e >= b.e ? [this, b] : [b, this];
    const shift = small.e - big.e;
    if (shift < -17) return big;
    return normalise(big.m + small.m * Math.pow(10, shift), big.e);
  }

  sub(other) {
    return this.add(Decimal.of(other).neg());
  }

  mul(other) {
    const b = Decimal.of(other);
    if (this.m === 0 || b.m === 0) return ZERO;
    return normalise(this.m * b.m, this.e + b.e);
  }

  div(other) {
    const b = Decimal.of(other);
    if (b.m === 0) return ZERO;
    if (this.m === 0) return ZERO;
    return normalise(this.m / b.m, this.e - b.e);
  }

  /** x^n for a plain-number exponent. */
  pow(n) {
    if (n === 0) return ONE;
    if (this.m === 0) return ZERO;
    if (this.m < 0) throw new Error('Decimal.pow of a negative base');
    const log = this.log10() * n;
    if (!Number.isFinite(log)) return log > 0 ? new Decimal(1, 1e308) : ZERO;
    const e = Math.floor(log);
    return normalise(Math.pow(10, log - e), e);
  }

  /** Natural log as a plain number. */
  ln() {
    return this.log10() * LOG10;
  }

  cmp(other) {
    const b = Decimal.of(other);
    if (this.m === 0 && b.m === 0) return 0;
    if (this.sign !== b.sign) return this.sign < b.sign ? -1 : 1;
    const s = this.sign;
    if (this.e !== b.e) return (this.e < b.e ? -1 : 1) * s;
    if (this.m === b.m) return 0;
    return this.m < b.m ? -1 : 1;
  }

  gte(other) {
    return this.cmp(other) >= 0;
  }
  gt(other) {
    return this.cmp(other) > 0;
  }
  lt(other) {
    return this.cmp(other) < 0;
  }
  lte(other) {
    return this.cmp(other) <= 0;
  }
  eq(other) {
    return this.cmp(other) === 0;
  }

  max(other) {
    const b = Decimal.of(other);
    return this.gte(b) ? this : b;
  }
  min(other) {
    const b = Decimal.of(other);
    return this.lte(b) ? this : b;
  }

  floor() {
    if (this.e >= 17) return this;
    return Decimal.fromNumber(Math.floor(this.toNumber()));
  }

  toString() {
    return `${this.m}e${this.e}`;
  }
}

function normalise(m, e) {
  if (!Number.isFinite(m) || m === 0) return new Decimal(0, 0);
  if (!Number.isFinite(e)) return new Decimal(m > 0 ? 1 : -1, e > 0 ? 1e308 : -1e308);
  const abs = Math.abs(m);
  if (abs >= 1 && abs < 10) return new Decimal(m, e);
  const shift = Math.floor(Math.log10(abs));
  let mm = m / Math.pow(10, shift);
  let ee = e + shift;
  // guard against 9.999999999 -> 10 from floating point
  if (Math.abs(mm) >= 10) {
    mm /= 10;
    ee += 1;
  } else if (Math.abs(mm) < 1) {
    mm *= 10;
    ee -= 1;
  }
  return new Decimal(mm, ee);
}

export const ZERO = new Decimal(0, 0);
export const ONE = new Decimal(1, 0);
export const D = (v) => Decimal.of(v);
