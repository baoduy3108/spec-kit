// LUMENFALL — the simulation, where four games become one object.
//
// A LANTERN is:
//   · the thing you swing around      (the arcade game)
//   · the lock you have to pick       (the puzzle game)
//   · the machine that earns offline  (the idle game)
//   · the light the night is eating   (the shared-world game)
//
// One object, four roles. Everything in this file is pure and DOM-free.

import { TAU, clamp, lerp, makeRng, norm, sign, wrapAngle, angleDiff } from './core.js';

export const VIEW = { W: 540, H: 960 };
export const WALL = 22;

export const CFG = {
  player: {
    r: 11,
    hookRange: 230,
    minRadius: 52,
    maxRadius: 230,
    reelRate: 150,
    maxTurns: 1.1,
    regrabDelay: 0.9,
    baseSpeed: 300,
    maxSpeed: 460,
  },
  /** Half width of the perfect-release window, radians. */
  sweetHalf: 0.33,
  carryCap: 20,
  /** Charge one mote is worth when banked into a lantern. */
  chargePerMote: 0.055,
  /** A lantern this dim is sealed and cannot be hooked until it is picked. */
  sealedBelow: 0.001,
  gapMin: 250,
  gapMax: 400,
  anchorClearance: 100,
  /** The dark rises from below; falling into it ends the run. */
  darkBase: 46,
  darkGrowth: 90,
  darkLag: 620,
  moteEvery: 3,
};

// --- hook maths (the arcade half) ----------------------------------------

export function chooseLantern(player, lanterns, range = CFG.player.hookRange) {
  let best = null;
  let bestCost = Infinity;
  const dir = norm(player.vx, player.vy);
  for (const a of lanterns) {
    if (a.cool > 0 || a.broken) continue;
    const dx = a.x - player.x;
    const dy = a.y - player.y;
    const d = Math.hypot(dx, dy);
    if (d > range || d < 12) continue;
    const nd = norm(dx, dy);
    const facing = nd.x * dir.x + nd.y * dir.y;
    if (facing < -0.35) continue;
    const cost = d * (1.55 - facing * 0.55);
    if (cost < bestCost) {
      bestCost = cost;
      best = a;
    }
  }
  return best;
}

/** The longest rope that keeps the whole orbit inside the shaft. */
export function wallLimit(lantern) {
  const margin = CFG.player.r + 4;
  return Math.min(lantern.x - (WALL + margin), VIEW.W - WALL - margin - lantern.x);
}

export function attach(player, lantern) {
  const dx = player.x - lantern.x;
  const dy = player.y - lantern.y;
  const max = Math.max(
    CFG.player.minRadius,
    Math.min(CFG.player.maxRadius, wallLimit(lantern)),
  );
  const radius = clamp(Math.hypot(dx, dy), CFG.player.minRadius, max);
  const cross = dx * player.vy - dy * player.vx;
  return { lantern, radius, angle: Math.atan2(dy, dx), dir: sign(cross), turns: 0 };
}

export function tangentAt(angle, dir) {
  return { x: -Math.sin(angle) * dir, y: Math.cos(angle) * dir };
}

/**
 * The release angle that throws you from the orbit straight into (tx,ty):
 * the tangent point of the line from the target to the swing circle. Aiming
 * from the lantern's centre instead misses by up to a rope length.
 */
export function releaseAngleFor(lantern, radius, dir, tx, ty) {
  const dx = tx - lantern.x;
  const dy = ty - lantern.y;
  const d = Math.hypot(dx, dy);
  if (d <= radius + 1e-6) {
    const t = norm(dx, dy);
    return Math.atan2(-t.x * dir, t.y * dir);
  }
  const phi = Math.atan2(dy, dx);
  const alpha = Math.acos(clamp(radius / d, -1, 1));
  let best = phi + alpha;
  let bestDot = -Infinity;
  for (const th of [phi + alpha, phi - alpha]) {
    const px = lantern.x + Math.cos(th) * radius;
    const py = lantern.y + Math.sin(th) * radius;
    const t = tangentAt(th, dir);
    const dot = t.x * (tx - px) + t.y * (ty - py);
    if (dot > bestDot) {
      bestDot = dot;
      best = th;
    }
  }
  return wrapAngle(best);
}

export function stepSwing(tether, speed, dt, reel = true) {
  const radius = reel
    ? Math.max(CFG.player.minRadius, tether.radius - CFG.player.reelRate * dt)
    : tether.radius;
  const omega = (speed / radius) * tether.dir;
  return {
    lantern: tether.lantern,
    radius,
    angle: wrapAngle(tether.angle + omega * dt),
    dir: tether.dir,
    turns: tether.turns + Math.abs(omega * dt) / TAU,
    snapped: tether.turns + Math.abs(omega * dt) / TAU >= CFG.player.maxTurns,
  };
}

// --- the shaft (the shared, persistent half) ------------------------------

/**
 * Lanterns are generated deterministically from the night's seed, so the
 * shaft you light is the same shaft tomorrow morning — and the same shaft an
 * echo of your last run remembers climbing.
 */
export function buildShaft(seed, count = 60) {
  const rng = makeRng(seed);
  const lanterns = [];
  let side = 1;
  let x = VIEW.W / 2;
  let y = 340;

  for (let i = 0; i < count; i++) {
    lanterns.push({
      id: i,
      x,
      y,
      /** 0 = sealed and dark. Charge is what makes it hookable and earning. */
      charge: i === 0 ? 0.6 : 0,
      sealed: i !== 0,
      /** Seed for this lantern's board — its lock, and later its engine. */
      lock: (seed ^ (i * 2654435761)) >>> 0,
      /** Multiplier from how well its engine board is routed (2x4). */
      yieldMult: 1,
      /** The best routing the solver could find, for showing the gap. */
      yieldBest: 1,
      cool: 0,
      broken: false,
      nextX: x,
      nextY: y + CFG.gapMax,
    });
    side = -side;
    const halfSpan = VIEW.W / 2 - WALL - CFG.anchorClearance;
    const off = rng.range(halfSpan * 0.35, halfSpan);
    const nx = clamp(
      VIEW.W / 2 + side * off,
      WALL + CFG.anchorClearance,
      VIEW.W - WALL - CFG.anchorClearance,
    );
    const ny = y + rng.range(CFG.gapMin, CFG.gapMax);
    if (i > 0) {
      lanterns[i - 1].nextX = x;
      lanterns[i - 1].nextY = y;
    }
    x = nx;
    y = ny;
  }
  for (let i = 0; i < lanterns.length - 1; i++) {
    lanterns[i].nextX = lanterns[i + 1].x;
    lanterns[i].nextY = lanterns[i + 1].y;
  }
  return lanterns;
}

/** Motes float between lanterns, thicker where the shaft is already lit. */
export function seedMotes(lanterns, seed) {
  const rng = makeRng(seed ^ 0x51ed);
  const motes = [];
  for (let i = 1; i < lanterns.length; i++) {
    const a = lanterns[i - 1];
    const b = lanterns[i];
    const lit = Math.min(1, (a.charge + b.charge) / 2);
    const n = CFG.moteEvery + Math.round(lit * 3);
    for (let k = 1; k <= n; k++) {
      const t = k / (n + 1);
      motes.push({
        id: i * 100 + k,
        x: clamp(lerp(a.x, b.x, t) + rng.range(-26, 26), WALL + 24, VIEW.W - WALL - 24),
        y: lerp(a.y, b.y, t),
        taken: false,
      });
    }
  }
  return motes;
}

export function speedFor(altitude, embersMult = 1) {
  const t = clamp(altitude / 9000, 0, 1);
  return lerp(CFG.player.baseSpeed, CFG.player.maxSpeed, t) * Math.min(1.35, embersMult ** 0.08);
}

// --- a run ----------------------------------------------------------------

export function newRun(lanterns, motes, opts = {}) {
  return {
    lanterns,
    motes,
    player: { x: VIEW.W / 2, y: 60, vx: 0, vy: CFG.player.baseSpeed, angle: Math.PI / 2 },
    tether: null,
    candidate: null,
    carry: 0,
    banked: 0,
    perfects: 0,
    releases: 0,
    combo: 0,
    bestCombo: 0,
    altitude: 0,
    maxY: 60,
    time: 0,
    darkY: -700,
    dead: false,
    /** Set while a lantern's lock is open; the run is frozen meanwhile. */
    picking: null,
    events: [],
    inputs: [],
    embersMult: opts.embersMult || 1,
    carryBonus: opts.carryBonus || 0,
    rangeBonus: opts.rangeBonus || 0,
  };
}

/**
 * One simulation step. `held` is the only input the game has.
 * Returns the events of this step.
 */
export function stepRun(run, dt, held) {
  run.events.length = 0;
  if (run.dead) return run.events;

  // 4x1 — puzzle under pressure. While a lock is open the climber hangs on
  // the lantern and cannot move, but the dark keeps rising underneath. A
  // puzzle you can think about forever is not part of an action game.
  if (run.picking) {
    run.time += dt;
    riseDark(run, dt);
    if (run.player.y < run.darkY + CFG.player.r) die(run, 'dark');
    return run.events;
  }

  run.time += dt;
  const p = run.player;
  const speed = speedFor(run.altitude, run.embersMult);
  const carryCap = CFG.carryCap + run.carryBonus;

  for (const l of run.lanterns) if (l.cool > 0) l.cool = Math.max(0, l.cool - dt);

  if (run.tether) {
    const next = stepSwing(run.tether, speed, dt, held);
    run.tether = next;
    p.x = next.lantern.x + Math.cos(next.angle) * next.radius;
    p.y = next.lantern.y + Math.sin(next.angle) * next.radius;
    const t = tangentAt(next.angle, next.dir);
    p.vx = t.x * speed;
    p.vy = t.y * speed;
    if (next.snapped) release(run, 'snap', speed);
    else if (!held) release(run, null, speed);
  } else {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    run.candidate = chooseLantern(p, run.lanterns, CFG.player.hookRange + run.rangeBonus);
    if (held && run.candidate) {
      const target = run.candidate;
      if (target.sealed) {
        // A sealed lantern is a lock. The climb stops until it is picked.
        run.picking = target;
        run.events.push({ type: 'lock', lantern: target.id });
      } else {
        run.tether = attach(p, target);
        run.events.push({ type: 'hook', lantern: target.id, x: target.x, y: target.y });
      }
    }
  }

  p.angle = Math.atan2(p.vy, p.vx);

  if (p.y > run.maxY) {
    run.altitude += p.y - run.maxY;
    run.maxY = p.y;
  }

  // motes
  for (const m of run.motes) {
    if (m.taken || run.carry >= carryCap) continue;
    if (Math.hypot(m.x - p.x, m.y - p.y) > CFG.player.r + 15) continue;
    m.taken = true;
    run.carry++;
    run.events.push({ type: 'mote', x: m.x, y: m.y });
  }

  riseDark(run, dt);
  if (p.y < run.darkY + CFG.player.r) die(run, 'dark');

  if (p.x < WALL + CFG.player.r || p.x > VIEW.W - WALL - CFG.player.r) {
    if (run.tether) p.x = clamp(p.x, WALL + CFG.player.r, VIEW.W - WALL - CFG.player.r);
    else die(run, 'wall');
  }
  return run.events;
}

function release(run, forced, speed) {
  const t = run.tether;
  if (!t) return;
  const l = t.lantern;
  const sweet = releaseAngleFor(l, t.radius, t.dir, l.nextX, l.nextY);
  const perfect = !forced && Math.abs(angleDiff(t.angle, sweet)) <= CFG.sweetHalf;

  const tan = tangentAt(t.angle, t.dir);
  run.player.vx = tan.x * speed;
  run.player.vy = tan.y * speed;
  run.tether = null;
  l.cool = CFG.player.regrabDelay;
  run.releases++;

  if (forced === 'snap') {
    run.combo = 0;
    run.events.push({ type: 'snap', x: l.x, y: l.y });
    return;
  }

  if (perfect) {
    run.combo++;
    run.perfects++;
    run.bestCombo = Math.max(run.bestCombo, run.combo);
    // THE FUSION: a perfect release pours what you carry into the lantern.
    if (run.carry > 0) {
      const mult = 1 + Math.min(2, run.combo * 0.12);
      const gain = run.carry * CFG.chargePerMote * mult * run.embersMult ** 0.25;
      l.charge = Math.min(4, l.charge + gain);
      run.banked += run.carry;
      run.events.push({
        type: 'bank',
        lantern: l.id,
        motes: run.carry,
        charge: gain,
        combo: run.combo,
        x: l.x,
        y: l.y,
      });
      run.carry = 0;
    } else {
      run.events.push({ type: 'perfect', x: l.x, y: l.y, combo: run.combo });
    }
  } else {
    run.combo = Math.floor(run.combo / 2);
    run.events.push({ type: 'ok', x: l.x, y: l.y });
  }
}

function riseDark(run, dt) {
  const growth = CFG.darkBase + CFG.darkGrowth * clamp(run.altitude / 9000, 0, 1);
  run.darkY += growth * dt;
  const lag = run.maxY - run.darkY;
  if (lag > CFG.darkLag) run.darkY += (lag - CFG.darkLag) * 1.6 * dt;
}

export function die(run, cause) {
  if (run.dead) return;
  run.dead = true;
  run.cause = cause;
  run.events.push({ type: 'death', cause });
}

/** The lock was picked: the lantern joins the shaft for good. */
export function unseal(run, lantern) {
  lantern.sealed = false;
  lantern.charge = Math.max(lantern.charge, 0.25);
  run.picking = null;
  run.events.push({ type: 'unsealed', lantern: lantern.id });
}

export function abandonLock(run) {
  if (run.picking) run.picking.cool = 1.5;
  run.picking = null;
}

export function runSummary(run) {
  return {
    depth: Math.floor(run.altitude / 10),
    banked: run.banked,
    perfects: run.perfects,
    combo: run.bestCombo,
    time: run.time,
    accuracy: run.releases ? run.perfects / run.releases : 0,
    cause: run.cause || 'dark',
  };
}
