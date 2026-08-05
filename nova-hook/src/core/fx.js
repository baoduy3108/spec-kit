// Juice layer: particles, shockwaves, floating text, screen shake, hit-stop.
// Nothing here affects gameplay — it only affects how gameplay *feels*.

import { TAU, clamp, damp } from './mathx.js';

const MAX_PARTICLES = 700;

export class Fx {
  constructor() {
    this.parts = [];
    this.rings = [];
    this.texts = [];
    this.trauma = 0;
    this.flash = { a: 0, r: 255, g: 255, b: 255 };
    this.timeScale = 1;
    this._slowTimer = 0;
    this._slowScale = 1;
    this.reduceMotion = false;
    this.shakeX = 0;
    this.shakeY = 0;
    this._t = 0;
  }

  clear() {
    this.parts.length = 0;
    this.rings.length = 0;
    this.texts.length = 0;
    this.trauma = 0;
    this.flash.a = 0;
    this.timeScale = 1;
    this._slowTimer = 0;
  }

  burst(x, y, opts = {}) {
    const {
      count = 12,
      speed = 190,
      spread = TAU,
      angle = 0,
      color = '#8ef6ff',
      life = 0.55,
      size = 3,
      drag = 3.2,
      gravity = 0,
      glow = true,
    } = opts;
    const n = this.reduceMotion ? Math.ceil(count * 0.45) : count;
    for (let i = 0; i < n; i++) {
      if (this.parts.length >= MAX_PARTICLES) this.parts.shift();
      const a = angle + (Math.random() - 0.5) * spread;
      const s = speed * (0.45 + Math.random() * 0.9);
      const l = life * (0.65 + Math.random() * 0.7);
      this.parts.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: l,
        max: l,
        size: size * (0.6 + Math.random() * 0.9),
        color,
        drag,
        gravity,
        glow,
      });
    }
  }

  ring(x, y, opts = {}) {
    const { r0 = 8, r1 = 90, life = 0.45, color = '#8ef6ff', width = 4 } = opts;
    this.rings.push({ x, y, r0, r1, life, max: life, color, width });
  }

  text(x, y, str, opts = {}) {
    const { color = '#ffffff', life = 0.9, size = 26, vy = 62 } = opts;
    this.texts.push({ x, y, str, color, life, max: life, size, vy });
  }

  shake(amount) {
    this.trauma = clamp(this.trauma + amount, 0, 1);
  }

  screenFlash(a, color = [255, 255, 255]) {
    if (a > this.flash.a) {
      this.flash.a = this.reduceMotion ? a * 0.4 : a;
      this.flash.r = color[0];
      this.flash.g = color[1];
      this.flash.b = color[2];
    }
  }

  /** Brief slow motion. `scale` < 1 slows the world down. */
  slowmo(scale = 0.35, duration = 0.18) {
    if (this.reduceMotion) return;
    this._slowScale = scale;
    this._slowTimer = Math.max(this._slowTimer, duration);
  }

  /**
   * Camera and time effects run on *real* time, never on the slowed-down
   * simulation clock — otherwise hit-stop would stretch itself out.
   */
  updateRealtime(dt) {
    this._t += dt;

    if (this._slowTimer > 0) {
      this._slowTimer -= dt;
      this.timeScale = damp(this.timeScale, this._slowScale, 26, dt);
    } else {
      this.timeScale = damp(this.timeScale, 1, 11, dt);
    }

    this.trauma = Math.max(0, this.trauma - dt * 1.55);
    const shake = this.reduceMotion ? 0 : this.trauma * this.trauma * 26;
    this.shakeX = Math.sin(this._t * 61.3) * shake;
    this.shakeY = Math.cos(this._t * 47.7) * shake;

    this.flash.a = Math.max(0, this.flash.a - dt * 3.4);
  }

  /** Particle motion, which *should* follow the simulation clock. */
  update(dt) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.parts.splice(i, 1);
        continue;
      }
      const d = Math.exp(-p.drag * dt);
      p.vx *= d;
      p.vy = p.vy * d + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      if (r.life <= 0) this.rings.splice(i, 1);
    }

    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt;
      t.y += t.vy * dt;
      t.vy *= Math.exp(-2.4 * dt);
      if (t.life <= 0) this.texts.splice(i, 1);
    }
  }
}
