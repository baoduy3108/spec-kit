// Sprite forge: every visual in the game is generated at runtime into
// offscreen canvases. No image files ship with the build, which keeps the
// whole game a single sub-100KB download that also works offline.

import { TAU } from './mathx.js';

export function makeCanvas(w, h) {
  const W = Math.max(1, w | 0);
  const H = Math.max(1, h | 0);
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(W, H);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  return c;
}

/** Soft additive blob — the workhorse behind every glow in the game. */
export function glowDot(size, color) {
  const s = size * 2;
  const c = makeCanvas(s, s);
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size, size, 0, size, size, size);
  grad.addColorStop(0, color);
  grad.addColorStop(0.35, hexA(color, 0.55));
  grad.addColorStop(1, hexA(color, 0));
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

export function shipSprite(palette, size = 34) {
  const c = makeCanvas(size * 2, size * 2);
  const g = c.getContext('2d');
  const cx = size;
  const cy = size;

  g.save();
  g.translate(cx, cy);

  // outer halo
  const halo = g.createRadialGradient(0, 0, 2, 0, 0, size);
  halo.addColorStop(0, hexA(palette.glow, 0.75));
  halo.addColorStop(1, hexA(palette.glow, 0));
  g.fillStyle = halo;
  g.fillRect(-size, -size, size * 2, size * 2);

  // hull: forward-pointing dart (nose along +X)
  g.beginPath();
  g.moveTo(15, 0);
  g.lineTo(-7, 10);
  g.lineTo(-3, 0);
  g.lineTo(-7, -10);
  g.closePath();
  const body = g.createLinearGradient(-9, 0, 15, 0);
  body.addColorStop(0, palette.hull);
  body.addColorStop(1, '#ffffff');
  g.fillStyle = body;
  g.fill();

  g.lineWidth = 1.6;
  g.strokeStyle = hexA(palette.glow, 0.95);
  g.stroke();

  // cockpit core
  g.beginPath();
  g.arc(2, 0, 3.2, 0, TAU);
  g.fillStyle = '#ffffff';
  g.fill();

  g.restore();
  return c;
}

export function anchorSprite(color, r = 16) {
  const pad = r * 2.6;
  const c = makeCanvas(pad * 2, pad * 2);
  const g = c.getContext('2d');
  g.translate(pad, pad);

  const halo = g.createRadialGradient(0, 0, r * 0.3, 0, 0, pad);
  halo.addColorStop(0, hexA(color, 0.5));
  halo.addColorStop(1, hexA(color, 0));
  g.fillStyle = halo;
  g.fillRect(-pad, -pad, pad * 2, pad * 2);

  g.lineWidth = 3;
  g.strokeStyle = color;
  g.beginPath();
  g.arc(0, 0, r, 0, TAU);
  g.stroke();

  g.beginPath();
  g.arc(0, 0, r * 0.42, 0, TAU);
  g.fillStyle = '#ffffff';
  g.fill();

  // three orbiting nubs so rotation is readable
  g.fillStyle = color;
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU;
    g.beginPath();
    g.arc(Math.cos(a) * r, Math.sin(a) * r, 3.4, 0, TAU);
    g.fill();
  }
  return c;
}

export function shardSprite(color, r = 9) {
  const c = makeCanvas(r * 4, r * 4);
  const g = c.getContext('2d');
  g.translate(r * 2, r * 2);

  const halo = g.createRadialGradient(0, 0, 0, 0, 0, r * 2);
  halo.addColorStop(0, hexA(color, 0.65));
  halo.addColorStop(1, hexA(color, 0));
  g.fillStyle = halo;
  g.fillRect(-r * 2, -r * 2, r * 4, r * 4);

  g.beginPath();
  g.moveTo(0, -r);
  g.lineTo(r * 0.62, 0);
  g.lineTo(0, r);
  g.lineTo(-r * 0.62, 0);
  g.closePath();
  g.fillStyle = '#ffffff';
  g.fill();
  g.lineWidth = 2;
  g.strokeStyle = color;
  g.stroke();
  return c;
}

export function mineSprite(color = '#ff4d7d', r = 15) {
  const pad = r * 2.4;
  const c = makeCanvas(pad * 2, pad * 2);
  const g = c.getContext('2d');
  g.translate(pad, pad);

  const halo = g.createRadialGradient(0, 0, 0, 0, 0, pad);
  halo.addColorStop(0, hexA(color, 0.45));
  halo.addColorStop(1, hexA(color, 0));
  g.fillStyle = halo;
  g.fillRect(-pad, -pad, pad * 2, pad * 2);

  g.strokeStyle = color;
  g.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    g.beginPath();
    g.moveTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7);
    g.lineTo(Math.cos(a) * r * 1.45, Math.sin(a) * r * 1.45);
    g.stroke();
  }
  g.beginPath();
  g.arc(0, 0, r * 0.72, 0, TAU);
  g.fillStyle = '#1a0512';
  g.fill();
  g.stroke();
  return c;
}

/** A tileable parallax star layer. */
export function starLayer(w, h, rng, count, color, maxSize) {
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  for (let i = 0; i < count; i++) {
    const x = rng.range(0, w);
    const y = rng.range(0, h);
    const s = rng.range(0.6, maxSize);
    g.globalAlpha = rng.range(0.25, 1);
    g.fillStyle = color;
    g.beginPath();
    g.arc(x, y, s, 0, TAU);
    g.fill();
  }
  g.globalAlpha = 1;
  return c;
}

/** Soft nebula clouds, also tileable vertically. */
export function nebula(w, h, rng, colors) {
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 14; i++) {
    const x = rng.range(0, w);
    const y = rng.range(0, h);
    const r = rng.range(80, 240);
    const col = colors[i % colors.length];
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, hexA(col, 0.16));
    grad.addColorStop(1, hexA(col, 0));
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return c;
}

/** #rrggbb + alpha -> rgba() string. Accepts rgba passthrough. */
export function hexA(hex, a) {
  if (typeof hex !== 'string' || hex[0] !== '#') return hex;
  let h = hex.slice(1);
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

/** Everything the renderer needs, rebuilt when the player changes skin. */
export class Art {
  constructor(rng) {
    this.rng = rng;
    this.stars = [
      starLayer(540, 960, rng.fork('s1'), 130, '#7f8cff', 1.3),
      starLayer(540, 960, rng.fork('s2'), 70, '#ffffff', 2.1),
    ];
    this.nebula = nebula(540, 960, rng.fork('neb'), ['#5b2bff', '#00e5ff', '#ff2ea6']);
    this.mine = mineSprite();
    this.setPalette({ hull: '#0f1030', glow: '#6ef0ff', trail: '#6ef0ff', shard: '#ffd66e' });
  }

  setPalette(palette) {
    this.palette = palette;
    this.ship = shipSprite(palette);
    this.anchor = anchorSprite(palette.glow);
    this.anchorFrail = anchorSprite('#ff8bd2');
    this.shard = shardSprite(palette.shard || '#ffd66e');
    this.dot = glowDot(16, palette.trail);
    this.dotWhite = glowDot(16, '#ffffff');
  }
}
