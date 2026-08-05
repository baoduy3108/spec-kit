// All drawing. Reads the world, never writes to it.
//
// World space is y-up; canvas space is y-down. `sy()` is the only place that
// conversion happens, and angles are negated when they cross over.

import { SWEET_HALF, VIEW, WALL } from './config.js';
import { pulsarRadius } from './level.js';
import { hexA } from '../core/art.js';
import { TAU, clamp } from '../core/mathx.js';

export class Renderer {
  constructor(ctx, art) {
    this.ctx = ctx;
    this.art = art;
    this.t = 0;
    /** Device-pixel scale; main.js updates this on resize. */
    this.scale = 1;
    /** Set while the intro is asking for the player's very first press. */
    this.emphasis = false;
  }

  /** world y -> canvas y */
  sy(worldY, camY) {
    return VIEW.H - (worldY - camY);
  }

  draw(world, fx, dt) {
    this.t += dt;
    const g = this.ctx;
    const cam = world.cam.y;
    const nova = world.run.novaTimer > 0;

    g.save();
    g.setTransform(this.scale, 0, 0, this.scale, 0, 0);
    this._background(cam, nova);

    // Shake moves the world layers only; the overlay stays put.
    g.save();
    g.translate(fx.shakeX, fx.shakeY);

    this._walls(cam, nova);
    this._shards(world, cam);
    this._hazards(world, cam);
    this._anchors(world, cam);
    this._tether(world, cam);
    this._trail(world, cam, nova);
    this._player(world, cam, nova);
    this._particles(fx, cam);
    this._void(world, cam);
    g.restore();

    this._overlay(world, fx, nova);
    g.restore();
  }

  // --- layers -------------------------------------------------------------

  _background(cam, nova) {
    const g = this.ctx;
    const grad = g.createLinearGradient(0, 0, 0, VIEW.H);
    grad.addColorStop(0, nova ? '#170a3a' : '#080b1e');
    grad.addColorStop(1, nova ? '#3a0f4e' : '#0d0730');
    g.fillStyle = grad;
    g.fillRect(0, 0, VIEW.W, VIEW.H);

    this._parallax(this.art.nebula, cam, 0.06, 0.9);
    this._parallax(this.art.stars[0], cam, 0.16, 0.75);
    this._parallax(this.art.stars[1], cam, 0.32, 0.95);
  }

  _parallax(tile, cam, factor, alpha) {
    const g = this.ctx;
    const off = (((cam * factor) % VIEW.H) + VIEW.H) % VIEW.H;
    g.globalAlpha = alpha;
    g.drawImage(tile, 0, off - VIEW.H, VIEW.W, VIEW.H);
    g.drawImage(tile, 0, off, VIEW.W, VIEW.H);
    g.globalAlpha = 1;
  }

  _walls(cam, nova) {
    const g = this.ctx;
    const col = nova ? '#ffd166' : '#ff3d7f';
    for (const x of [0, VIEW.W - WALL]) {
      const grad = g.createLinearGradient(x, 0, x + WALL, 0);
      const inner = x === 0 ? 1 : 0;
      grad.addColorStop(inner, hexA(col, 0.85));
      grad.addColorStop(1 - inner, hexA(col, 0.05));
      g.fillStyle = grad;
      g.fillRect(x, 0, WALL, VIEW.H);
    }
    // Scanline crawling down the walls sells the vertical motion.
    const scan = (((cam * 0.9) % 140) + 140) % 140;
    g.fillStyle = hexA('#ffffff', 0.22);
    for (let y = scan - 140; y < VIEW.H; y += 140) {
      g.fillRect(0, y, WALL, 3);
      g.fillRect(VIEW.W - WALL, y + 70, WALL, 3);
    }
  }

  _anchors(world, cam) {
    const g = this.ctx;
    const cand = world.tether ? world.tether.anchor : world.candidate;
    for (const a of world.level.anchors) {
      const y = this.sy(a.y, cam);
      if (y < -80 || y > VIEW.H + 80) continue;
      const spr = a.type === 'frail' ? this.art.anchorFrail : this.art.anchor;
      const pulse = 1 + Math.sin(this.t * 3 + a.phase) * 0.05;
      const s = (spr.width / 2) * pulse;

      g.save();
      g.translate(a.x, y);
      g.globalAlpha = a.broken ? 0.18 : 1;
      g.rotate(a.broken ? this.t * 2 : -this.t * 0.6 * (a.side || 1));
      g.drawImage(spr, -s, -s, s * 2, s * 2);
      g.restore();

      if (!a.broken && a === cand) {
        g.strokeStyle = hexA('#ffffff', 0.55 + Math.sin(this.t * 9) * 0.25);
        g.lineWidth = 2;
        g.beginPath();
        g.arc(a.x, y, 26 + Math.sin(this.t * 9) * 2.5, 0, TAU);
        g.stroke();

        if (this.emphasis) {
          // A second, breathing halo so a first-time player cannot miss it.
          const grow = (this.t % 1.1) / 1.1;
          g.save();
          g.globalAlpha = 1 - grow;
          g.strokeStyle = '#7dff9c';
          g.lineWidth = 3;
          g.setLineDash([8, 10]);
          g.beginPath();
          g.arc(a.x, y, 34 + grow * 46, 0, TAU);
          g.stroke();
          g.restore();
        }
      }
    }
  }

  _tether(world, cam) {
    const t = world.tether;
    if (!t) return;
    const g = this.ctx;
    const a = t.anchor;
    const ay = this.sy(a.y, cam);
    const p = world.player;
    const py = this.sy(p.y, cam);
    const info = world.sweetInfo();

    // rope
    g.strokeStyle = hexA(this.art.palette.glow, 0.85);
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(a.x, ay);
    g.lineTo(p.x, py);
    g.stroke();

    // orbit guide
    g.strokeStyle = hexA('#ffffff', 0.14);
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(a.x, ay, t.radius, 0, TAU);
    g.stroke();

    // sweet arc — release inside it for a PERFECT
    this._arc(a.x, ay, t.radius, info.angle - SWEET_HALF, info.angle + SWEET_HALF, {
      color: '#7dff9c',
      width: 7,
      alpha: 0.85,
    });

    // overwind meter: the arc drains as the anchor heats up
    const frac = clamp(t.turns / 1.2, 0, 1);
    this._arc(a.x, ay, t.radius + 12, 0, TAU * (1 - frac), {
      color: frac > 0.75 ? '#ff4d7d' : hexA('#ffffff', 0.5),
      width: 3,
      alpha: 0.7,
      offset: t.angle,
    });
  }

  /** Arc drawn from world-space angles (handles the y flip). */
  _arc(cx, cy, r, a0, a1, { color = '#fff', width = 4, alpha = 1, offset = 0 } = {}) {
    const g = this.ctx;
    const steps = 26;
    g.save();
    g.globalAlpha = alpha;
    g.strokeStyle = color;
    g.lineWidth = width;
    g.lineCap = 'round';
    g.beginPath();
    for (let i = 0; i <= steps; i++) {
      const a = a0 + ((a1 - a0) * i) / steps + offset;
      const x = cx + Math.cos(a) * r;
      const y = cy - Math.sin(a) * r;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
    g.restore();
  }

  _shards(world, cam) {
    const g = this.ctx;
    const spr = this.art.shard;
    for (const s of world.level.shards) {
      if (s.taken) continue;
      const y = this.sy(s.y, cam);
      if (y < -40 || y > VIEW.H + 40) continue;
      const bob = Math.sin(this.t * 3 + s.phase) * 3;
      const sc = 1 + Math.sin(this.t * 5 + s.phase) * 0.12;
      const w = (spr.width / 2) * sc;
      g.drawImage(spr, s.x - w, y + bob - w, w * 2, w * 2);
    }
  }

  _hazards(world, cam) {
    const g = this.ctx;
    for (const h of world.level.hazards) {
      if (h.dead) continue;
      const y = this.sy(h.y, cam);
      if (y < -140 || y > VIEW.H + 140) continue;

      if (h.kind === 'mine') {
        const spr = this.art.mine;
        const s = spr.width / 2;
        g.save();
        g.translate(h.x, y);
        g.rotate(this.t * 0.8);
        g.drawImage(spr, -s, -s, s * 2, s * 2);
        g.restore();
      } else if (h.kind === 'spinner') {
        g.save();
        g.translate(h.x, y);
        g.strokeStyle = '#ff4d7d';
        g.lineWidth = 7;
        g.lineCap = 'round';
        g.shadowBlur = 14;
        g.shadowColor = '#ff4d7d';
        g.beginPath();
        for (let i = 0; i < 2; i++) {
          const a = -(h.phase + i * Math.PI);
          g.moveTo(0, 0);
          g.lineTo(Math.cos(a) * h.arm, Math.sin(a) * h.arm);
        }
        g.stroke();
        g.shadowBlur = 0;
        g.fillStyle = '#ffd166';
        g.beginPath();
        g.arc(0, 0, 7, 0, TAU);
        g.fill();
        g.restore();
      } else if (h.kind === 'pulsar') {
        const r = pulsarRadius(h);
        const charge = r / h.rMax;
        g.save();
        g.translate(h.x, y);
        // core
        g.fillStyle = '#ff8a3d';
        g.shadowBlur = 16;
        g.shadowColor = '#ff8a3d';
        g.beginPath();
        g.arc(0, 0, 9 + charge * 4, 0, TAU);
        g.fill();
        g.shadowBlur = 0;
        // telegraphed bloom
        if (r > 1) {
          const grad = g.createRadialGradient(0, 0, r * 0.55, 0, 0, r);
          grad.addColorStop(0, hexA('#ff3d7f', 0.05));
          grad.addColorStop(1, hexA('#ff3d7f', 0.32 + charge * 0.3));
          g.fillStyle = grad;
          g.beginPath();
          g.arc(0, 0, r, 0, TAU);
          g.fill();
          g.strokeStyle = hexA('#ffd166', 0.5 + charge * 0.5);
          g.lineWidth = 2 + charge * 2;
          g.stroke();
        }
        // the ring it will reach, so it can be read before it fires
        g.setLineDash([6, 10]);
        g.strokeStyle = hexA('#ff3d7f', 0.22);
        g.lineWidth = 1.5;
        g.beginPath();
        g.arc(0, 0, h.rMax, 0, TAU);
        g.stroke();
        g.setLineDash([]);
        g.restore();
      }
    }
  }

  _trail(world, cam, nova) {
    const g = this.ctx;
    const pts = world.trail;
    if (pts.length < 2) return;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    g.lineJoin = 'round';
    for (let i = 1; i < pts.length; i++) {
      const f = i / pts.length;
      g.strokeStyle = hexA(nova ? '#ffd166' : this.art.palette.trail, 0.5 * f);
      g.lineWidth = 1 + 9 * f;
      g.beginPath();
      g.moveTo(pts[i - 1].x, this.sy(pts[i - 1].y, cam));
      g.lineTo(pts[i].x, this.sy(pts[i].y, cam));
      g.stroke();
    }
    g.restore();
  }

  _player(world, cam, nova) {
    const g = this.ctx;
    const p = world.player;
    const y = this.sy(p.y, cam);
    const spr = this.art.ship;
    const s = spr.width / 2;
    const squash = 1 + p.squash * 0.28;

    g.save();
    g.translate(p.x, y);
    g.rotate(-p.angle);
    g.scale(squash, 2 - squash);
    if (world.invuln > 0 && Math.floor(world.invuln * 12) % 2 === 0) g.globalAlpha = 0.45;
    g.drawImage(spr, -s, -s, s * 2, s * 2);
    g.restore();

    if (nova) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      const r = 34 + Math.sin(this.t * 14) * 5;
      const dot = this.art.dotWhite;
      g.globalAlpha = 0.5;
      g.drawImage(dot, p.x - r, y - r, r * 2, r * 2);
      g.restore();
    }
  }

  _particles(fx, cam) {
    const g = this.ctx;
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const p of fx.parts) {
      const a = clamp(p.life / p.max, 0, 1);
      const y = this.sy(p.y, cam);
      if (y < -60 || y > VIEW.H + 60) continue;
      const r = p.size * (0.5 + a);
      g.globalAlpha = a;
      g.fillStyle = p.color;
      g.beginPath();
      g.arc(p.x, y, r, 0, TAU);
      g.fill();
    }
    g.globalAlpha = 1;

    for (const r of fx.rings) {
      const t = 1 - r.life / r.max;
      const rad = r.r0 + (r.r1 - r.r0) * (1 - Math.pow(1 - t, 3));
      const y = this.sy(r.y, cam);
      g.globalAlpha = 1 - t;
      g.strokeStyle = r.color;
      g.lineWidth = r.width * (1 - t) + 0.5;
      g.beginPath();
      g.arc(r.x, y, rad, 0, TAU);
      g.stroke();
    }
    g.restore();

    g.save();
    g.textAlign = 'center';
    for (const t of fx.texts) {
      const a = clamp(t.life / t.max, 0, 1);
      const y = this.sy(t.y, cam);
      g.globalAlpha = a;
      g.font = `900 ${t.size}px system-ui, "Segoe UI", sans-serif`;
      g.fillStyle = t.color;
      g.shadowBlur = 12;
      g.shadowColor = t.color;
      g.fillText(t.str, t.x, y);
    }
    g.restore();
  }

  _void(world, cam) {
    const g = this.ctx;
    const y = this.sy(world.voidY, cam);
    if (y > VIEW.H + 40) return;
    const grad = g.createLinearGradient(0, y - 60, 0, VIEW.H);
    grad.addColorStop(0, hexA('#ff2e6a', 0));
    grad.addColorStop(0.25, hexA('#ff2e6a', 0.55));
    grad.addColorStop(1, hexA('#3a0016', 0.98));
    g.fillStyle = grad;
    g.fillRect(0, y - 60, VIEW.W, VIEW.H - y + 60);

    g.strokeStyle = '#ffd166';
    g.lineWidth = 3;
    g.beginPath();
    for (let x = 0; x <= VIEW.W; x += 18) {
      const wy = y + Math.sin(x * 0.05 + this.t * 5) * 6 + Math.sin(x * 0.11 - this.t * 3) * 4;
      if (x === 0) g.moveTo(x, wy);
      else g.lineTo(x, wy);
    }
    g.stroke();
  }

  _overlay(world, fx, nova) {
    const g = this.ctx;
    if (nova) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      g.fillStyle = hexA('#ffb03a', 0.07 + Math.sin(this.t * 10) * 0.02);
      g.fillRect(0, 0, VIEW.W, VIEW.H);
      g.restore();
    }
    if (fx.flash.a > 0.001) {
      g.fillStyle = `rgba(${fx.flash.r},${fx.flash.g},${fx.flash.b},${clamp(fx.flash.a, 0, 1) * 0.6})`;
      g.fillRect(0, 0, VIEW.W, VIEW.H);
    }
    // vignette
    const v = g.createRadialGradient(
      VIEW.W / 2,
      VIEW.H / 2,
      VIEW.H * 0.32,
      VIEW.W / 2,
      VIEW.H / 2,
      VIEW.H * 0.78,
    );
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.55)');
    g.fillStyle = v;
    g.fillRect(0, 0, VIEW.W, VIEW.H);
  }
}
