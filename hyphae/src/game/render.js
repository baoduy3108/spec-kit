// Draws the network. Reads state, never writes it.

import { TAU, vitality } from './network.js';

export class Renderer {
  constructor(canvas, network) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.net = network;
    this.t = 0;
    this.scale = 1;
    this.pulses = [];
    this.reduceMotion = false;
    this.grown = 0; // eased reach, so growth is visibly gradual
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.round(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * dpr));
    this.w = rect.width;
    this.h = rect.height;
    this.dpr = dpr;
  }

  /** A pulse travelling from a tip down to the root: one payday. */
  emitPulse() {
    if (this.reduceMotion || this.pulses.length > 60) return;
    const edges = this.net.edges;
    if (!edges.length) return;
    const visible = Math.max(1, Math.floor(edges.length * this.grown));
    const e = edges[Math.floor(Math.random() * visible)];
    this.pulses.push({ edge: e, p: 0, speed: 0.9 + Math.random() * 0.9 });
  }

  update(dt) {
    this.t += dt;
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.p += p.speed * dt;
      if (p.p >= 1) this.pulses.splice(i, 1);
    }
  }

  draw(state) {
    const g = this.ctx;
    if (!this.w) this.resize();
    const v = vitality(state);
    this.grown += (v.reach - this.grown) * 0.06;

    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    g.clearRect(0, 0, this.w, this.h);

    // The whole structure is drawn root-down, scaled to fit the panel.
    const spanX = this.net.bounds.maxX - this.net.bounds.minX || 1;
    const fit = Math.min(this.w / (spanX * 1.05), this.h / (-this.net.bounds.minY * 1.15));
    const ox = this.w / 2 - ((this.net.bounds.minX + this.net.bounds.maxX) / 2) * fit;
    const oy = this.h * 0.98;

    const px = (n) => ox + n.x * fit;
    const py = (n) => oy + n.y * fit;

    const nodes = this.net.nodes;
    const edges = this.net.edges;
    const visible = Math.max(1, Math.floor(edges.length * this.grown));
    const wobble = this.reduceMotion ? 0 : 1;

    // filaments
    g.lineCap = 'round';
    for (let i = 0; i < visible; i++) {
      const e = edges[i];
      const a = nodes[e.from];
      const b = nodes[e.to];
      const fade = 1 - e.depth / 14;
      const sway = Math.sin(this.t * 0.6 + e.phase) * 1.2 * wobble;
      g.strokeStyle = `rgba(${90 + v.glow * 70}, ${200 + v.glow * 40}, ${150 + v.glow * 60}, ${
        0.1 + 0.28 * fade
      })`;
      g.lineWidth = Math.max(0.6, 3.4 * fade * fit);
      g.beginPath();
      g.moveTo(px(a), py(a));
      g.lineTo(px(b) + sway, py(b));
      g.stroke();
    }

    // nodes: brighter where the chain is deeper
    for (let i = 0; i < visible; i++) {
      const n = nodes[edges[i].to];
      if (n.depth > 9) continue;
      const pulse = 0.5 + 0.5 * Math.sin(this.t * 1.6 + n.wobble) * wobble;
      const r = Math.max(0.8, (2.6 - n.depth * 0.18) * fit) * (0.8 + pulse * 0.4);
      g.fillStyle = `rgba(160, 255, 210, ${0.1 + 0.22 * (1 - n.depth / 12)})`;
      g.beginPath();
      g.arc(px(n), py(n), r, 0, TAU);
      g.fill();
    }

    // fruiting bodies
    if (v.fruiting > 0) {
      for (let i = 0; i < visible; i++) {
        const n = nodes[edges[i].to];
        if (!n.fruit || n.depth < 3) continue;
        const bob = Math.sin(this.t * 1.1 + n.wobble) * 1.5 * wobble;
        const r = Math.max(1.5, 4.2 * fit * v.fruiting);
        const x = px(n);
        const y = py(n) + bob;
        const grad = g.createRadialGradient(x, y, 0, x, y, r * 3);
        grad.addColorStop(0, `rgba(255, 226, 150, ${0.55 * v.fruiting})`);
        grad.addColorStop(1, 'rgba(255, 226, 150, 0)');
        g.fillStyle = grad;
        g.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
        g.fillStyle = `rgba(255, 240, 190, ${0.5 + 0.4 * v.fruiting})`;
        g.beginPath();
        g.arc(x, y, r, Math.PI, TAU);
        g.fill();
      }
    }

    // pulses of biomass running back to the root
    for (const p of this.pulses) {
      const a = nodes[p.edge.to];
      const b = nodes[p.edge.from];
      const x = px(a) + (px(b) - px(a)) * p.p;
      const y = py(a) + (py(b) - py(a)) * p.p;
      const r = 3.2 * fit + 1.2;
      const grad = this.ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      grad.addColorStop(0, 'rgba(210, 255, 230, 0.9)');
      grad.addColorStop(1, 'rgba(210, 255, 230, 0)');
      g.fillStyle = grad;
      g.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
    }

    // the deep tiers add a slow gold breath over everything
    if (v.deep > 0.01) {
      const breath = 0.04 + 0.03 * Math.sin(this.t * 0.5) * wobble;
      g.fillStyle = `rgba(255, 200, 110, ${breath * v.deep})`;
      g.fillRect(0, 0, this.w, this.h);
    }
  }
}
