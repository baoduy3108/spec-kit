// Procedural audio. Every sound is synthesised on the fly with WebAudio —
// no mp3/ogg assets, so the game stays tiny and licence-clean.
//
// All entry points are defensive: a broken or blocked AudioContext must never
// take the game down with it.

const SCALE = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24]; // minor pentatonic-ish

export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.enabled = true;
    this.musicEnabled = true;
    this._musicTimer = null;
    this._step = 0;
  }

  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;
    try {
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.enabled ? 0.85 : 0;
      this.sfxGain.connect(this.master);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicEnabled ? 0.3 : 0;
      this.musicGain.connect(this.master);
    } catch (_) {
      this.ctx = null;
    }
  }

  setSfx(on) {
    this.enabled = on;
    if (this.sfxGain) this.sfxGain.gain.value = on ? 0.85 : 0;
  }

  setMusic(on) {
    this.musicEnabled = on;
    if (this.musicGain) this.musicGain.gain.value = on ? 0.3 : 0;
    if (on) this.startMusic();
    else this.stopMusic();
  }

  _tone({ freq = 440, dur = 0.16, type = 'sine', gain = 0.3, slide = 0, delay = 0, dest = null }) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest || this.sfxGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  _noise({ dur = 0.25, gain = 0.25, freq = 900, q = 1.2, sweep = -600, delay = 0 }) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const frames = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.setValueAtTime(freq, t0);
    filt.frequency.linearRampToValueAtTime(Math.max(80, freq + sweep), t0 + dur);
    filt.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(this.sfxGain);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  // --- game events --------------------------------------------------------

  hook() {
    this._tone({ freq: 220, dur: 0.1, type: 'square', gain: 0.14, slide: 180 });
  }

  release() {
    this._noise({ dur: 0.18, gain: 0.16, freq: 1500, sweep: -1100 });
  }

  perfect(combo) {
    const step = SCALE[Math.min(combo, SCALE.length - 1)];
    const base = 523.25 * Math.pow(2, step / 12);
    this._tone({ freq: base, dur: 0.24, type: 'triangle', gain: 0.24 });
    this._tone({ freq: base * 1.5, dur: 0.2, type: 'sine', gain: 0.13, delay: 0.045 });
  }

  shard() {
    this._tone({ freq: 1180, dur: 0.08, type: 'sine', gain: 0.12, slide: 420 });
  }

  snap() {
    this._noise({ dur: 0.3, gain: 0.24, freq: 420, sweep: -300, q: 0.7 });
    this._tone({ freq: 150, dur: 0.28, type: 'sawtooth', gain: 0.16, slide: -90 });
  }

  nova() {
    for (let i = 0; i < 5; i++) {
      this._tone({
        freq: 261.6 * Math.pow(2, [0, 4, 7, 11, 14][i] / 12),
        dur: 0.7,
        type: 'sawtooth',
        gain: 0.09,
        delay: i * 0.05,
      });
    }
    this._noise({ dur: 0.6, gain: 0.2, freq: 300, sweep: 3200, q: 0.6 });
  }

  death() {
    this._tone({ freq: 180, dur: 0.7, type: 'sawtooth', gain: 0.22, slide: -140 });
    this._noise({ dur: 0.8, gain: 0.26, freq: 800, sweep: -740, q: 0.5 });
  }

  ui() {
    this._tone({ freq: 660, dur: 0.07, type: 'triangle', gain: 0.12 });
  }

  // --- generative music ---------------------------------------------------

  startMusic() {
    if (!this.ctx || !this.musicEnabled || this._musicTimer) return;
    const beat = 0.34;
    this._musicTimer = setInterval(() => {
      if (!this.ctx || this.ctx.state !== 'running') return;
      const s = this._step++;
      const root = 65.4; // C2
      // pulsing sub
      if (s % 2 === 0) {
        this._tone({ freq: root, dur: 0.3, type: 'sine', gain: 0.5, dest: this.musicGain });
      }
      // arpeggio
      const seq = [0, 7, 10, 12, 15, 12, 10, 7];
      const note = seq[s % seq.length];
      this._tone({
        freq: root * 4 * Math.pow(2, note / 12),
        dur: 0.24,
        type: 'triangle',
        gain: 0.16,
        dest: this.musicGain,
      });
      if (s % 16 === 0) {
        this._tone({
          freq: root * 2 * Math.pow(2, 3 / 12),
          dur: 1.6,
          type: 'sawtooth',
          gain: 0.06,
          dest: this.musicGain,
        });
      }
    }, beat * 1000);
  }

  stopMusic() {
    if (this._musicTimer) {
      clearInterval(this._musicTimer);
      this._musicTimer = null;
    }
  }
}
