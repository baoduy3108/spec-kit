// The simulation. Owns the player, the tether, the level stream, collisions
// and the void. Rendering lives in render.js and only reads from here.

import { NOVA, PLAYER, VIEW, VOID, WALL, difficultyAt } from './config.js';
import { Level, pulsarRadius } from './level.js';
import {
  attach,
  chooseAnchor,
  isPerfect,
  releaseAngleFor,
  releaseVelocity,
  stepSwing,
  swingPosition,
  tangentAt,
} from './physics.js';
import {
  addAltitude,
  collectShard,
  applyRelease,
  newRun,
  novaActive,
  tickNova,
  tryStartNova,
} from './scoring.js';
import { makeRng } from '../core/rng.js';
import { clamp, damp, dist, norm, pointSegmentDist } from '../core/mathx.js';

const TRAIL_MAX = 30;

export class World {
  constructor(onEvent = () => {}) {
    this.onEvent = onEvent;
    this.reset(1, 'endless');
  }

  reset(seed, mode = 'endless') {
    this.rng = makeRng(seed);
    this.level = new Level(this.rng);
    this.run = newRun(seed, mode);
    this.player = {
      x: VIEW.W / 2,
      y: 60,
      vx: 0,
      vy: difficultyAt(0).speed,
      angle: Math.PI / 2,
      squash: 0,
    };
    this.prevY = this.player.y;
    this.tether = null;
    this.candidate = null;
    this.cam = { y: 0 };
    this.voidY = -520;
    this.maxY = this.player.y;
    this.trail = [];
    this.invuln = 1.2;
    this.time = 0;
    this._smashCd = 0;
    this._nearCd = 0;
    this.dead = false;
    this.deathCause = null;
    this.level.ensure(this.player.y + 2600);
  }

  get speed() {
    const diff = difficultyAt(this.run.altitude);
    return diff.speed * (novaActive(this.run) ? NOVA.speedMul : 1);
  }

  update(dt, input) {
    if (this.dead) return;
    this.time += dt;
    this.run.time += dt;
    this.invuln = Math.max(0, this.invuln - dt);

    const diff = difficultyAt(this.run.altitude);
    const speed = this.speed;
    const p = this.player;
    this.prevY = p.y;
    this._smashCd = Math.max(0, this._smashCd - dt);
    this._nearCd = Math.max(0, this._nearCd - dt);

    tickNova(this.run, dt);

    if (this.tether) {
      const next = stepSwing(this.tether, speed, dt, input.held);
      this.tether = next;
      const pos = swingPosition(next);
      p.x = pos.x;
      p.y = pos.y;
      const t = tangentAt(next.angle, next.dir);
      p.vx = t.x * speed;
      p.vy = t.y * speed;

      if (next.snapped) this._release('snap');
      else if (input.released || !input.held) this._release();
    } else {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      // Holding the button keeps trying to grab: forgiving input buffering.
      this.candidate = chooseAnchor(p, this.level.anchors);
      if (input.held && this.candidate) this._attach(this.candidate);
    }

    p.angle = Math.atan2(p.vy, p.vx);
    p.squash = damp(p.squash, 0, 9, dt);

    // Score follows the highest point reached, so yo-yoing can't farm points.
    if (p.y > this.maxY) {
      addAltitude(this.run, p.y - this.maxY);
      this.maxY = p.y;
    }

    if (tryStartNova(this.run)) this.onEvent('nova', { x: p.x, y: p.y });

    this._trail();
    this._stream();
    this._entities(dt);
    this._shards(dt);
    this._hazards(dt);
    this._void(dt, diff);
    this._camera(dt);
    this._bounds();
  }

  /** Ambient motion behind the menus: no player, just drift and animation. */
  idle(dt) {
    this.time += dt;
    this.cam.y += 26 * dt;
    this.player.y = this.cam.y + VIEW.H * 0.4;
    this.level.ensure(this.cam.y + 2400);
    this.level.prune(this.cam.y - 900, null);
    this._entities(dt);
  }

  // --- tether -------------------------------------------------------------

  _attach(anchor) {
    this.tether = attach(this.player, anchor);
    this.player.squash = 1;
    this.onEvent('hook', { x: anchor.x, y: anchor.y, anchor });
  }

  _release(forced = null) {
    const t = this.tether;
    if (!t) return;
    const speed = this.speed;
    const a = t.anchor;

    const sweet = releaseAngleFor(a, t.radius, t.dir, a.nextX, a.nextY);
    const perfect = !forced && isPerfect(t.angle, sweet);
    const quality = forced || (perfect ? 'perfect' : 'ok');

    const v = releaseVelocity(t, speed);
    this.player.vx = v.vx;
    this.player.vy = v.vy;
    this.tether = null;
    this.player.squash = 1;

    a.cool = PLAYER.regrabDelay;

    if (a.type === 'frail' || quality === 'snap') {
      a.broken = true;
      this.onEvent('break', { x: a.x, y: a.y });
    }

    applyRelease(this.run, quality);
    this.onEvent(quality === 'perfect' ? 'perfect' : quality === 'snap' ? 'snap' : 'release', {
      x: this.player.x,
      y: this.player.y,
      combo: this.run.combo,
      anchor: a,
    });
  }

  // --- world upkeep -------------------------------------------------------

  _trail() {
    const p = this.player;
    const last = this.trail[this.trail.length - 1];
    if (!last || dist(last.x, last.y, p.x, p.y) > 7) {
      this.trail.push({ x: p.x, y: p.y });
      if (this.trail.length > TRAIL_MAX) this.trail.shift();
    }
  }

  _stream() {
    this.level.ensure(this.player.y + 2400);
    this.level.prune(this.cam.y - 900, this.tether ? this.tether.anchor : null);
  }

  _entities(dt) {
    for (const a of this.level.anchors) {
      if (a.cool > 0) a.cool = Math.max(0, a.cool - dt);
    }
    for (const h of this.level.hazards) {
      if (h.dead) continue;
      if (h.kind === 'mine') {
        h.phase += dt * 0.85;
        h.x = h.homeX + Math.sin(h.phase) * h.drift;
      } else if (h.kind === 'spinner') {
        h.phase += h.spin * dt;
      } else if (h.kind === 'pulsar') {
        h.phase += dt;
      }
    }
  }

  _shards(dt) {
    const p = this.player;
    const nova = novaActive(this.run);
    for (const s of this.level.shards) {
      if (s.taken) continue;
      if (Math.abs(s.y - p.y) > 700) continue;
      s.phase += dt * 3;
      const d = dist(s.x, s.y, p.x, p.y);
      if (nova && d < NOVA.magnet) {
        const n = norm(p.x - s.x, p.y - s.y);
        const pull = (1 - d / NOVA.magnet) * 460 * dt;
        s.x += n.x * pull;
        s.y += n.y * pull;
      }
      if (d < PLAYER.r + 15) {
        s.taken = true;
        collectShard(this.run);
        this.onEvent('shard', { x: s.x, y: s.y });
      }
    }
  }

  _hazards() {
    const p = this.player;
    const nova = novaActive(this.run);
    const safe = nova || this.invuln > 0;

    for (const h of this.level.hazards) {
      if (h.dead) continue;
      if (Math.abs(h.y - p.y) > 500) continue;

      let hit = false;
      let near = Infinity;

      if (h.kind === 'mine') {
        const d = dist(h.x, h.y, p.x, p.y);
        near = d - (h.r + PLAYER.r);
        hit = d < h.r + PLAYER.r;
      } else if (h.kind === 'spinner') {
        for (let i = 0; i < 2; i++) {
          const a = h.phase + i * Math.PI;
          const ex = h.x + Math.cos(a) * h.arm;
          const ey = h.y + Math.sin(a) * h.arm;
          const d = pointSegmentDist(p.x, p.y, h.x, h.y, ex, ey);
          near = Math.min(near, d - (7 + PLAYER.r));
          if (d < 7 + PLAYER.r) hit = true;
        }
      } else if (h.kind === 'pulsar') {
        const r = pulsarRadius(h);
        const d = dist(h.x, h.y, p.x, p.y);
        near = d - (r + PLAYER.r);
        hit = r > 0 && d < r + PLAYER.r;
      }

      if (hit) {
        if (safe) {
          h.dead = true;
          this.onEvent('smash', { x: h.x !== undefined ? h.x : p.x, y: h.y });
        } else {
          this.die(h.kind);
          return;
        }
      } else if (near < 26 && near > -1 && this._nearCd <= 0) {
        this._nearCd = 0.45;
        this.onEvent('nearmiss', { x: p.x, y: p.y });
      }
    }
  }

  _void(dt, diff) {
    const nova = novaActive(this.run);
    this.voidY += diff.voidSpeed * (nova ? 0.55 : 1) * dt;
    // Measured against the peak, not the current height, so a deep swing
    // never yanks the void up behind you.
    const lag = this.maxY - this.voidY;
    if (lag > VOID.maxLag) this.voidY += (lag - VOID.maxLag) * VOID.catchUp * dt;
    if (this.player.y < this.voidY + PLAYER.r && this.invuln <= 0) this.die('void');
  }

  _camera(dt) {
    const target = this.player.y - VIEW.H * 0.4;
    if (target > this.cam.y) this.cam.y = damp(this.cam.y, target, 7, dt);
    // Never let the player climb off the top of the screen.
    const hardTop = this.player.y - VIEW.H * 0.8;
    if (this.cam.y < hardTop) this.cam.y = hardTop;
    // The rising void owns the bottom of the frame.
    this.cam.y = Math.max(this.cam.y, this.voidY - 36);
  }

  _bounds() {
    const p = this.player;
    const min = WALL + PLAYER.r;
    const max = VIEW.W - WALL - PLAYER.r;
    if (p.x < min || p.x > max) {
      if (novaActive(this.run) || this.invuln > 0 || this.tether) {
        p.x = clamp(p.x, min, max);
        if (!this.tether) p.vx *= -1;
        if (this._smashCd <= 0) {
          this._smashCd = 0.2;
          this.onEvent('smash', { x: p.x, y: p.y });
        }
      } else {
        this.die('wall');
      }
    }
  }

  // --- life ---------------------------------------------------------------

  die(cause) {
    if (this.dead) return;
    this.dead = true;
    this.run.dead = true;
    this.deathCause = cause;
    this.tether = null;
    this.onEvent('death', { x: this.player.x, y: this.player.y, cause });
  }

  /** Second chance: push the void back down and clear the neighbourhood. */
  revive() {
    if (!this.dead) return;
    this.dead = false;
    this.run.dead = false;
    this.run.revives++;
    this.run.combo = 0;
    const p = this.player;
    p.x = clamp(p.x, WALL + 60, VIEW.W - WALL - 60);
    p.y = Math.max(p.y, this.voidY + 260);
    p.vx = 0;
    p.vy = this.speed;
    this.maxY = Math.max(this.maxY, p.y);
    this.voidY -= VOID.revivePush;
    this.invuln = PLAYER.reviveGrace;
    this.trail.length = 0;
    for (const h of this.level.hazards) {
      if (Math.abs(h.y - p.y) < 620) h.dead = true;
    }
    this.onEvent('revive', { x: p.x, y: p.y });
  }

  /** Angle that would count as a perfect release right now (for the HUD arc). */
  sweetInfo() {
    const t = this.tether;
    if (!t) return null;
    const a = t.anchor;
    return {
      angle: releaseAngleFor(a, t.radius, t.dir, a.nextX, a.nextY),
      dir: t.dir,
      radius: t.radius,
      anchor: a,
      turns: t.turns,
    };
  }
}

