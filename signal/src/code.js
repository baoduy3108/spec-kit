// The alphabet, which is only digits.
//
// A digit d is d pulses two ticks apart. Digits are separated by a longer
// gap, and the whole message repeats forever with a longer gap still. That is
// all — no morse chart to learn, nothing to memorise. You count blips.
//
// The one thing worth knowing: pairs two ticks apart are how a *person*
// speaks here. No machine in the sky uses a period of 2. So the grammar
// itself is the tell.

export const CODE = {
  /** Ticks between the pulses inside one digit. */
  pulseGap: 2,
  /** Silence between two digits. */
  digitGap: 7,
  /** Silence before the message starts over. */
  messageGap: 13,
  /** Digits are 1..9 — a message is never ambiguous about a leading zero. */
  lo: 1,
  hi: 9,
};

/** The tick offsets a message pulses on, and how long one repetition runs. */
export function encode(digits) {
  const marks = new Set();
  let t = 0;
  for (const d of digits) {
    for (let i = 0; i < d; i++) marks.add(t + i * CODE.pulseGap);
    t += (d - 1) * CODE.pulseGap + CODE.digitGap;
  }
  return { digits: [...digits], marks, length: t + CODE.messageGap };
}

/**
 * Read a repetition back. Used by the tests to prove the code is
 * unambiguous, and by the bot that plays the game headlessly.
 */
export function decode(marks, length) {
  const times = [...marks].sort((a, b) => a - b);
  if (!times.length) return [];
  const digits = [];
  let count = 1;
  for (let i = 1; i < times.length; i++) {
    const gap = times[i] - times[i - 1];
    if (gap <= CODE.pulseGap + 1) {
      count++;
    } else {
      digits.push(count);
      count = 1;
    }
  }
  digits.push(count);
  return digits;
}

/**
 * A hand on a key is never exact. Every repetition of a person's message is
 * nudged a little, and that unsteadiness is the only thing that tells them
 * apart from a machine imitating them.
 */
export function humanise(message, rng, variants = 4) {
  const out = [];
  for (let v = 0; v < variants; v++) {
    const marks = new Set(message.marks);
    for (const t of message.marks) {
      // Never move the first pulse of a digit: the gaps between digits have
      // to stay legible or the message stops being readable at all.
      if (!marks.has(t - CODE.pulseGap)) continue;
      if (rng() > 0.34) continue;
      if (marks.has(t + 1)) continue;
      marks.delete(t);
      marks.add(t + 1);
    }
    out.push(marks);
  }
  return out;
}

/** A frequency, said out loud. 47 becomes [4, 7]. */
export const digitsOf = (mark) => String(mark).split('').map(Number);
export const markOf = (digits) => Number(digits.join(''));
