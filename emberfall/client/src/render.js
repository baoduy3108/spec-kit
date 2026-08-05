// Drawing the night.
//
// The darkness is the interesting part: the server sends a 16x16 grid of light
// values, which is painted into a tiny offscreen canvas and then scaled up
// with smoothing. That gives a soft, correct-looking gloom for the price of
// 256 pixels a frame.

const TAU = Math.PI * 2;

export class Renderer {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = world;
    this.t = 0;
    this.shake = 0;
    this.flash = 0;

    this.lightCanvas = document.createElement('canvas');
    this.lightCanvas.width = world.regions;
    this.lightCanvas.height = world.regions;
    this.lightCtx = this.lightCanvas.getContext('2d');
    this.lightImage = this.lightCtx.createImageData(world.regions, world.regions);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.dpr = dpr;
  }

  update(dt) {
    this.t += dt;
    this.shake = Math.max(0, this.shake - dt * 3);
    this.flash = Math.max(0, this.flash - dt * 2);
  }

  /**
   * @param view {{me, players, motes, shades, beacons, light, carry}}
   */
  draw(view) {
    const g = this.ctx;
    if (!this.w) this.resize();
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const cx = this.w / 2;
    const cy = this.h / 2;
    const shakeX = this.shake ? (Math.random() - 0.5) * this.shake * 18 : 0;
    const shakeY = this.shake ? (Math.random() - 0.5) * this.shake * 18 : 0;
    const camX = view.me.x - cx + shakeX;
    const camY = view.me.y - cy + shakeY;
    const sx = (x) => x - camX;
    const sy = (y) => y - camY;

    g.fillStyle = '#05060f';
    g.fillRect(0, 0, this.w, this.h);

    this._ground(g, camX, camY);
    this._light(g, view.light, camX, camY);
    this._beacons(g, view.beacons, sx, sy);
    this._motes(g, view.motes, sx, sy);
    this._shades(g, view.shades, sx, sy);
    this._players(g, view.players, sx, sy);
    this._me(g, view.me, cx, cy);

    if (this.flash > 0) {
      g.fillStyle = `rgba(120, 20, 40, ${this.flash * 0.45})`;
      g.fillRect(0, 0, this.w, this.h);
    }
    this._vignette(g);
  }

  _ground(g, camX, camY) {
    const step = 200;
    g.strokeStyle = 'rgba(120, 140, 200, 0.05)';
    g.lineWidth = 1;
    g.beginPath();
    for (let x = -camX % step; x < this.w; x += step) {
      g.moveTo(x, 0);
      g.lineTo(x, this.h);
    }
    for (let y = -camY % step; y < this.h; y += step) {
      g.moveTo(0, y);
      g.lineTo(this.w, y);
    }
    g.stroke();

    // The edge of the world is a hard, cold line.
    g.strokeStyle = 'rgba(111, 168, 255, 0.35)';
    g.lineWidth = 3;
    g.strokeRect(-camX, -camY, this.world.w, this.world.h);
  }

  _light(g, light, camX, camY) {
    if (!light) return;
    const n = this.world.regions;
    const data = this.lightImage.data;
    for (let i = 0; i < n * n; i++) {
      const lit = Math.min(1, (light[i] || 0) / 100);
      const o = i * 4;
      data[o] = 8;
      data[o + 1] = 7;
      data[o + 2] = 18;
      data[o + 3] = Math.round(255 * (1 - lit) ** 1.15);
    }
    this.lightCtx.putImageData(this.lightImage, 0, 0);

    const cell = this.world.w / n;
    g.save();
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';
    // Draw half a cell out so the smoothing has something to blend towards.
    g.drawImage(
      this.lightCanvas,
      -camX - cell / 2,
      -camY - cell / 2,
      this.world.w + cell,
      this.world.h + cell,
    );
    g.restore();
  }

  _beacons(g, beacons, sx, sy) {
    for (const b of beacons) {
      const x = sx(b.x);
      const y = sy(b.y);
      if (x < -400 || y < -400 || x > this.w + 400 || y > this.h + 400) continue;
      const charge = (b.charge || 0) / 100;
      const r = 46;
      const pulse = 1 + Math.sin(this.t * 1.6 + b.id) * 0.06;

      const glow = g.createRadialGradient(x, y, 0, x, y, r * (3 + charge * 5));
      glow.addColorStop(0, `rgba(255, 200, 120, ${0.28 + charge * 0.35})`);
      glow.addColorStop(1, 'rgba(255, 200, 120, 0)');
      g.fillStyle = glow;
      g.fillRect(x - r * 8, y - r * 8, r * 16, r * 16);

      g.strokeStyle = `rgba(255, 217, 138, ${0.5 + charge * 0.4})`;
      g.lineWidth = 3;
      g.beginPath();
      g.arc(x, y, r * pulse, 0, TAU);
      g.stroke();

      // charge ring
      g.strokeStyle = '#ffd98a';
      g.lineWidth = 5;
      g.beginPath();
      g.arc(x, y, r * pulse + 8, -Math.PI / 2, -Math.PI / 2 + TAU * Math.min(1, charge));
      g.stroke();

      g.fillStyle = `rgba(255, 236, 190, ${0.5 + charge * 0.5})`;
      g.beginPath();
      g.arc(x, y, 9 + charge * 6, 0, TAU);
      g.fill();
    }
  }

  _motes(g, motes, sx, sy) {
    for (const m of motes) {
      const x = sx(m[1]);
      const y = sy(m[2]);
      if (x < -40 || y < -40 || x > this.w + 40 || y > this.h + 40) continue;
      const bob = Math.sin(this.t * 2.4 + m[0]) * 2;
      const grad = g.createRadialGradient(x, y + bob, 0, x, y + bob, 22);
      grad.addColorStop(0, 'rgba(255, 226, 150, 0.85)');
      grad.addColorStop(1, 'rgba(255, 226, 150, 0)');
      g.fillStyle = grad;
      g.fillRect(x - 22, y + bob - 22, 44, 44);
      g.fillStyle = '#fff3cf';
      g.beginPath();
      g.arc(x, y + bob, 3.5, 0, TAU);
      g.fill();
    }
  }

  _shades(g, shades, sx, sy) {
    for (const s of shades) {
      const x = sx(s[1]);
      const y = sy(s[2]);
      if (x < -60 || y < -60 || x > this.w + 60 || y > this.h + 60) continue;
      const wob = Math.sin(this.t * 3 + s[0]) * 2;
      const hunting = s[3] !== 0;

      const grad = g.createRadialGradient(x, y, 2, x, y, 34);
      grad.addColorStop(0, hunting ? 'rgba(255, 60, 90, 0.5)' : 'rgba(60, 40, 90, 0.5)');
      grad.addColorStop(1, 'rgba(10, 0, 20, 0)');
      g.fillStyle = grad;
      g.fillRect(x - 34, y - 34, 68, 68);

      g.fillStyle = hunting ? '#2a0a18' : '#160b24';
      g.beginPath();
      g.arc(x, y + wob, 17, 0, TAU);
      g.fill();
      g.fillStyle = hunting ? '#ff5c7a' : '#6b4fa0';
      g.beginPath();
      g.arc(x - 5, y + wob - 3, 2.6, 0, TAU);
      g.arc(x + 5, y + wob - 3, 2.6, 0, TAU);
      g.fill();
    }
  }

  _players(g, players, sx, sy) {
    for (const p of players) {
      const x = sx(p[1]);
      const y = sy(p[2]);
      if (x < -80 || y < -80 || x > this.w + 80 || y > this.h + 80) continue;
      this._ember(g, x, y, p[3] || 0, false, p[4]);
      const label = p.name || p[5];
      if (label) {
        g.font = '600 11px system-ui, sans-serif';
        g.textAlign = 'center';
        g.fillStyle = 'rgba(242, 234, 216, 0.75)';
        g.fillText(label, x, y - 26);
      }
    }
  }

  _me(g, me, cx, cy) {
    this._ember(g, cx, cy, me.carry || 0, true, me.invuln);
    g.font = '700 12px system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillStyle = 'rgba(255, 217, 138, 0.9)';
    g.fillText(me.name || 'you', cx, cy - 28);
  }

  _ember(g, x, y, carry, isMe, invuln) {
    const load = Math.min(1, carry / 25);
    const r = 11 + load * 6;
    const flicker = 1 + Math.sin(this.t * (isMe ? 9 : 6) + x) * 0.06;

    const grad = g.createRadialGradient(x, y, 0, x, y, (48 + load * 90) * flicker);
    grad.addColorStop(0, `rgba(255, 196, 110, ${0.4 + load * 0.4})`);
    grad.addColorStop(1, 'rgba(255, 150, 60, 0)');
    g.fillStyle = grad;
    const reach = (48 + load * 90) * flicker;
    g.fillRect(x - reach, y - reach, reach * 2, reach * 2);

    if (invuln) {
      g.strokeStyle = 'rgba(180, 220, 255, 0.7)';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(x, y, r + 9 + Math.sin(this.t * 8) * 2, 0, TAU);
      g.stroke();
    }

    g.fillStyle = isMe ? '#fff6df' : '#ffd7a0';
    g.beginPath();
    g.arc(x, y, r * flicker, 0, TAU);
    g.fill();
    g.fillStyle = 'rgba(255, 120, 40, 0.55)';
    g.beginPath();
    g.arc(x, y, r * 1.6 * flicker, 0, TAU);
    g.fill();
  }

  _vignette(g) {
    const grad = g.createRadialGradient(
      this.w / 2,
      this.h / 2,
      Math.min(this.w, this.h) * 0.3,
      this.w / 2,
      this.h / 2,
      Math.max(this.w, this.h) * 0.75,
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.72)');
    g.fillStyle = grad;
    g.fillRect(0, 0, this.w, this.h);
  }

  /** The little map in the corner: where the light is, and where you are. */
  drawMinimap(canvas, view) {
    const g = canvas.getContext('2d');
    const n = this.world.regions;
    const size = canvas.width;
    const cell = size / n;
    g.clearRect(0, 0, size, size);
    for (let i = 0; i < n * n; i++) {
      const lit = Math.min(1, (view.light?.[i] || 0) / 100);
      g.fillStyle = `rgba(255, 190, 110, ${0.06 + lit * 0.8})`;
      g.fillRect((i % n) * cell, Math.floor(i / n) * cell, cell + 0.5, cell + 0.5);
    }
    for (const b of view.beacons) {
      g.fillStyle = 'rgba(255, 240, 200, 0.9)';
      g.fillRect((b.x / this.world.w) * size - 1.5, (b.y / this.world.h) * size - 1.5, 3, 3);
    }
    for (const p of view.players) {
      g.fillStyle = 'rgba(255, 160, 80, 0.75)';
      g.fillRect((p[1] / this.world.w) * size - 1, (p[2] / this.world.h) * size - 1, 2, 2);
    }
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.arc((view.me.x / this.world.w) * size, (view.me.y / this.world.h) * size, 2.6, 0, TAU);
    g.fill();
  }
}
