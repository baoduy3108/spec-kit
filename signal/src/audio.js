// The receiver's voice.
//
// Hiss all the time, and a tone that opens on a pulse. The whole game is
// playable in silence — the paper roll shows everything the speaker says —
// but a radio game with no sound is a spreadsheet, so: hiss, a tone, and the
// tone gets purer as you tune closer, which is the oldest feedback in radio.

let ctx = null;
let noiseGain = null;
let toneGain = null;
let tone = null;
let filter = null;
let on = false;

function build() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();

  // two seconds of noise, looped — cheaper and calmer than a ScriptProcessor
  const frames = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frames; i++) {
    // brown-ish noise: gentler on the ear than white over a long night
    last = (last + (Math.random() * 2 - 1) * 0.09) * 0.985;
    data[i] = last;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.7;

  noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.16;

  tone = ctx.createOscillator();
  tone.type = 'sine';
  tone.frequency.value = 620;
  toneGain = ctx.createGain();
  toneGain.gain.value = 0;

  noise.connect(filter).connect(noiseGain).connect(ctx.destination);
  tone.connect(toneGain).connect(ctx.destination);
  noise.start();
  tone.start();
  return true;
}

/** Must be called from a real tap or keypress, or the browser will refuse. */
export function enableSound() {
  if (!ctx && !build()) return false;
  ctx.resume();
  on = true;
  return true;
}

export function muteSound() {
  on = false;
  if (toneGain) toneGain.gain.cancelScheduledValues(ctx.currentTime);
  if (toneGain) toneGain.gain.value = 0;
  if (noiseGain) noiseGain.gain.value = 0;
}

export const soundOn = () => on;

/** Called once per tick: level is what the paper roll is drawing. */
export function blip(level, strength) {
  if (!on || !ctx) return;
  const now = ctx.currentTime;
  // Off-tune is hissier and duller; on-tune the noise drops and the tone rings.
  noiseGain.gain.setTargetAtTime(0.17 - strength * 0.11, now, 0.08);
  filter.frequency.setTargetAtTime(700 + strength * 900, now, 0.08);

  const loud = Math.min(0.32, Math.max(0, (level - 0.18) * 0.36));
  if (loud <= 0.005) {
    toneGain.gain.setTargetAtTime(0, now, 0.02);
    return;
  }
  // A short envelope, so a run of pulses is countable by ear.
  toneGain.gain.cancelScheduledValues(now);
  toneGain.gain.setValueAtTime(toneGain.gain.value, now);
  toneGain.gain.linearRampToValueAtTime(loud, now + 0.012);
  toneGain.gain.linearRampToValueAtTime(0, now + 0.085);
}
