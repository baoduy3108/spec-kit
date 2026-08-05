// The shared world. Server-authoritative and completely pure: no sockets, no
// timers, no randomness that is not seeded. `step()` is the only thing that
// moves time forward, which is what makes an MMO testable at all.
//
// The premise: light is a common resource. Darkness creeps back everywhere,
// all the time. Players carry motes to beacons; a lit region grows more motes
// and spawns fewer shades, so the world visibly rewards the group that keeps
// it lit. When the whole map is bright enough, dawn breaks, everyone is
// credited, and night falls again.

export const CFG = {
  W: 4000,
  H: 4000,
  /** The map is scored on a coarse grid; this is its side length. */
  REGIONS: 16,
  PLAYER_SPEED: 235,
  PLAYER_R: 15,
  CARRY_CAP: 25,
  MOTE_R: 9,
  MOTE_MAX: 420,
  /** Motes per second, scaled by how lit the world is. */
  MOTE_SPAWN: 9,
  SHADE_R: 17,
  SHADE_MAX: 140,
  SHADE_SPEED: 190,
  SHADE_SPAWN: 2.2,
  SHADE_SIGHT: 620,
  BEACON_R: 46,
  BEACON_COUNT: 12,
  /** Light added to a beacon per mote deposited. */
  DEPOSIT_LIGHT: 0.016,
  /**
   * Beacons lose a *fraction* of their charge per second, not a fixed amount.
   * With flat decay a small crew could never get anything off the ground —
   * measured: four lamplighters kept the map at exactly zero light forever.
   * Proportional decay means a lone player's beacon holds, and a blazing one
   * costs more to maintain, which is its own soft cap.
   */
  BEACON_DECAY: 0.006,
  /** How much light a beacon at full charge gives its own region. */
  BEACON_REACH: 2.4,
  DARK_RATE: 0.0075,
  /** Average light across the map that ends the night. */
  DAWN_AT: 0.8,
  RESPAWN_INVULN: 2.5,
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist2 = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export function regionIndex(x, y) {
  const cx = clamp(Math.floor((x / CFG.W) * CFG.REGIONS), 0, CFG.REGIONS - 1);
  const cy = clamp(Math.floor((y / CFG.H) * CFG.REGIONS), 0, CFG.REGIONS - 1);
  return cy * CFG.REGIONS + cx;
}

export function createWorld(seed = 1) {
  const world = {
    seed,
    rng: mulberry32(seed),
    time: 0,
    night: 1,
    nextId: 1,
    players: new Map(),
    motes: new Map(),
    shades: new Map(),
    beacons: [],
    light: new Float32Array(CFG.REGIONS * CFG.REGIONS).fill(0.12),
    events: [],
    /** Cumulative motes banked this night, for the dawn scoreboard. */
    contributions: new Map(),
  };
  placeBeacons(world);
  for (let i = 0; i < 140; i++) spawnMote(world);
  return world;
}

function placeBeacons(world) {
  world.beacons = [];
  const cols = 4;
  const rows = Math.ceil(CFG.BEACON_COUNT / cols);
  for (let i = 0; i < CFG.BEACON_COUNT; i++) {
    const cx = i % cols;
    const cy = Math.floor(i / cols);
    const x = ((cx + 0.5) / cols) * CFG.W + (world.rng() - 0.5) * 260;
    const y = ((cy + 0.5) / rows) * CFG.H + (world.rng() - 0.5) * 260;
    world.beacons.push({
      id: i,
      x: clamp(x, 200, CFG.W - 200),
      y: clamp(y, 200, CFG.H - 200),
      charge: i === 0 ? 0.45 : 0.12,
      /** Players who deposited here recently, for the co-op bonus. */
      recent: new Map(),
    });
  }
}

// --- entities -------------------------------------------------------------

export function addPlayer(world, id, name = 'ember') {
  const home = world.beacons[Math.floor(world.rng() * world.beacons.length)];
  const player = {
    id,
    name: String(name).slice(0, 16) || 'ember',
    x: home.x + (world.rng() - 0.5) * 160,
    y: home.y + (world.rng() - 0.5) * 160,
    dx: 0,
    dy: 0,
    carry: 0,
    banked: 0,
    invuln: CFG.RESPAWN_INVULN,
    bot: false,
    seq: 0,
  };
  world.players.set(id, player);
  return player;
}

export function removePlayer(world, id) {
  world.players.delete(id);
}

/** Input is a direction; the server owns the speed. */
export function setInput(world, id, dx, dy, seq = 0) {
  const p = world.players.get(id);
  if (!p) return;
  const len = Math.hypot(dx, dy);
  if (!Number.isFinite(len) || len < 0.001) {
    p.dx = 0;
    p.dy = 0;
  } else {
    p.dx = dx / Math.max(1, len);
    p.dy = dy / Math.max(1, len);
  }
  if (seq > p.seq) p.seq = seq;
}

function spawnMote(world, x, y) {
  if (world.motes.size >= CFG.MOTE_MAX) return null;
  const id = world.nextId++;
  if (x === undefined) {
    // Motes prefer lit ground: darkness is barren, which is the whole point.
    let best = null;
    for (let tries = 0; tries < 6; tries++) {
      const px = world.rng() * CFG.W;
      const py = world.rng() * CFG.H;
      const l = world.light[regionIndex(px, py)];
      if (!best || l > best.l) best = { x: px, y: py, l };
      if (l > 0.5) break;
    }
    x = best.x;
    y = best.y;
  }
  const mote = { id, x, y };
  world.motes.set(id, mote);
  return mote;
}

function spawnShade(world) {
  if (world.shades.size >= CFG.SHADE_MAX) return null;
  let spot = null;
  for (let tries = 0; tries < 8; tries++) {
    const x = world.rng() * CFG.W;
    const y = world.rng() * CFG.H;
    const l = world.light[regionIndex(x, y)];
    if (!spot || l < spot.l) spot = { x, y, l };
    if (l < 0.2) break;
  }
  // Shades are a symptom of darkness, so bright ground simply does not make them.
  if (spot.l > 0.45) return null;
  const id = world.nextId++;
  const shade = { id, x: spot.x, y: spot.y, vx: 0, vy: 0, target: 0 };
  world.shades.set(id, shade);
  return shade;
}

// --- the step -------------------------------------------------------------

export function step(world, dt) {
  world.time += dt;
  world.events.length = 0;

  movePlayers(world, dt);
  collectMotes(world);
  depositAtBeacons(world, dt);
  moveShades(world, dt);
  updateLight(world, dt);
  spawnStuff(world, dt);
  checkDawn(world);
  return world.events;
}

function movePlayers(world, dt) {
  for (const p of world.players.values()) {
    p.invuln = Math.max(0, p.invuln - dt);
    // Carrying light is heavy: full hands are slower, which is the tension.
    const load = 1 - 0.3 * (p.carry / CFG.CARRY_CAP);
    p.x = clamp(p.x + p.dx * CFG.PLAYER_SPEED * load * dt, 0, CFG.W);
    p.y = clamp(p.y + p.dy * CFG.PLAYER_SPEED * load * dt, 0, CFG.H);
  }
}

function collectMotes(world) {
  const reach = (CFG.PLAYER_R + CFG.MOTE_R) ** 2;
  for (const p of world.players.values()) {
    if (p.carry >= CFG.CARRY_CAP) continue;
    for (const mote of world.motes.values()) {
      if (dist2(p.x, p.y, mote.x, mote.y) > reach) continue;
      world.motes.delete(mote.id);
      p.carry++;
      world.events.push({ type: 'mote', player: p.id, x: mote.x, y: mote.y });
      if (p.carry >= CFG.CARRY_CAP) break;
    }
  }
}

function depositAtBeacons(world, dt) {
  const reach = (CFG.PLAYER_R + CFG.BEACON_R) ** 2;
  for (const beacon of world.beacons) {
    for (const [id, until] of beacon.recent) {
      if (until < world.time) beacon.recent.delete(id);
    }
    for (const p of world.players.values()) {
      if (dist2(p.x, p.y, beacon.x, beacon.y) > reach) continue;
      p.invuln = Math.max(p.invuln, 0.6); // beacons are safe ground
      if (p.carry <= 0) continue;

      // Everyone who banked here in the last 10s multiplies everyone else.
      const company = beacon.recent.size + (beacon.recent.has(p.id) ? 0 : 1);
      const coop = 1 + 0.25 * (company - 1);
      const light = p.carry * CFG.DEPOSIT_LIGHT * coop;
      beacon.charge = Math.min(3, beacon.charge + light);
      beacon.recent.set(p.id, world.time + 10);

      p.banked += p.carry;
      world.contributions.set(p.id, (world.contributions.get(p.id) || 0) + p.carry);
      world.events.push({
        type: 'deposit',
        player: p.id,
        beacon: beacon.id,
        motes: p.carry,
        coop,
      });
      p.carry = 0;
    }
  }
}

function moveShades(world, dt) {
  const caught = (CFG.PLAYER_R + CFG.SHADE_R) ** 2;
  const sight2 = CFG.SHADE_SIGHT ** 2;

  for (const shade of world.shades.values()) {
    let target = null;
    let best = sight2;
    for (const p of world.players.values()) {
      if (p.invuln > 0) continue;
      const d = dist2(shade.x, shade.y, p.x, p.y);
      // A shade prefers whoever is carrying the most light.
      const weighted = d / (1 + p.carry * 0.05);
      if (weighted < best) {
        best = weighted;
        target = p;
      }
    }

    if (target) {
      const dx = target.x - shade.x;
      const dy = target.y - shade.y;
      const len = Math.hypot(dx, dy) || 1;
      shade.vx = (dx / len) * CFG.SHADE_SPEED;
      shade.vy = (dy / len) * CFG.SHADE_SPEED;
      shade.target = target.id;
    } else {
      shade.target = 0;
      // drift towards darkness
      if (world.rng() < dt * 0.6) {
        const a = world.rng() * Math.PI * 2;
        shade.vx = Math.cos(a) * CFG.SHADE_SPEED * 0.35;
        shade.vy = Math.sin(a) * CFG.SHADE_SPEED * 0.35;
      }
    }

    shade.x = clamp(shade.x + shade.vx * dt, 0, CFG.W);
    shade.y = clamp(shade.y + shade.vy * dt, 0, CFG.H);

    // Light burns them off, so a defended beacon actually clears its ground.
    if (world.light[regionIndex(shade.x, shade.y)] > 0.72) {
      world.shades.delete(shade.id);
      world.events.push({ type: 'burn', x: shade.x, y: shade.y });
      continue;
    }

    for (const p of world.players.values()) {
      if (p.invuln > 0) continue;
      if (dist2(shade.x, shade.y, p.x, p.y) > caught) continue;
      const lost = p.carry;
      p.carry = 0;
      p.invuln = CFG.RESPAWN_INVULN;
      const home = nearestBeacon(world, p.x, p.y);
      p.x = home.x + (world.rng() - 0.5) * 120;
      p.y = home.y + (world.rng() - 0.5) * 120;
      world.events.push({ type: 'caught', player: p.id, motes: lost, beacon: home.id });
    }
  }
}

export function nearestBeacon(world, x, y) {
  let best = world.beacons[0];
  let bestD = Infinity;
  for (const b of world.beacons) {
    const d = dist2(x, y, b.x, b.y);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best;
}

function updateLight(world, dt) {
  const n = CFG.REGIONS;
  const cell = CFG.W / n;

  for (let i = 0; i < world.light.length; i++) {
    world.light[i] = Math.max(0, world.light[i] - CFG.DARK_RATE * dt);
  }

  for (const beacon of world.beacons) {
    beacon.charge *= Math.exp(-CFG.BEACON_DECAY * dt);
    const bx = beacon.x / cell;
    const by = beacon.y / cell;
    const radius = 1 + beacon.charge * 1.6;
    const r = Math.ceil(radius);
    for (let gy = Math.floor(by - r); gy <= by + r; gy++) {
      for (let gx = Math.floor(bx - r); gx <= bx + r; gx++) {
        if (gx < 0 || gy < 0 || gx >= n || gy >= n) continue;
        const d = Math.hypot(gx + 0.5 - bx, gy + 0.5 - by);
        if (d > radius) continue;
        const falloff = 1 - d / (radius + 0.001);
        const target = Math.min(1, beacon.charge * CFG.BEACON_REACH * falloff);
        const idx = gy * n + gx;
        if (target > world.light[idx]) {
          world.light[idx] = Math.min(1, world.light[idx] + (target - world.light[idx]) * dt * 1.4);
        }
      }
    }
  }
}

function spawnStuff(world, dt) {
  const lit = averageLight(world);
  world.moteDebt = (world.moteDebt || 0) + dt * CFG.MOTE_SPAWN * (0.35 + lit);
  while (world.moteDebt >= 1) {
    world.moteDebt -= 1;
    spawnMote(world);
  }
  world.shadeDebt = (world.shadeDebt || 0) + dt * CFG.SHADE_SPAWN * (1.2 - lit);
  while (world.shadeDebt >= 1) {
    world.shadeDebt -= 1;
    spawnShade(world);
  }
}

export function averageLight(world) {
  let sum = 0;
  for (let i = 0; i < world.light.length; i++) sum += world.light[i];
  return sum / world.light.length;
}

function checkDawn(world) {
  if (averageLight(world) < CFG.DAWN_AT) return;

  const board = [...world.contributions.entries()]
    .map(([id, motes]) => ({
      id,
      motes,
      name: world.players.get(id)?.name || 'someone who left',
    }))
    .sort((a, b) => b.motes - a.motes)
    .slice(0, 10);

  world.events.push({ type: 'dawn', night: world.night, board });
  world.night++;
  world.contributions.clear();

  // Night falls again, somewhere else.
  world.rng = mulberry32(world.seed + world.night * 7919);
  world.light.fill(0.12);
  world.motes.clear();
  world.shades.clear();
  placeBeacons(world);
  for (let i = 0; i < 140; i++) spawnMote(world);
  for (const p of world.players.values()) {
    const home = nearestBeacon(world, p.x, p.y);
    p.x = home.x;
    p.y = home.y;
    p.carry = 0;
    p.banked = 0;
    p.invuln = CFG.RESPAWN_INVULN;
  }
}

// --- snapshots ------------------------------------------------------------

/**
 * What one player can see. Area-of-interest culling is what keeps an MMO
 * affordable: a client is only ever sent its own neighbourhood.
 */
export function snapshotFor(world, id, radius = 1400) {
  const me = world.players.get(id);
  if (!me) return null;
  const r2 = radius * radius;
  const near = (e) => dist2(me.x, me.y, e.x, e.y) <= r2;

  const players = [];
  for (const p of world.players.values()) {
    // You are sent as `me`; including yourself here too would draw a ghost.
    if (p.id === id || !near(p)) continue;
    players.push([p.id, Math.round(p.x), Math.round(p.y), p.carry, p.invuln > 0 ? 1 : 0, p.name]);
  }
  const motes = [];
  for (const m of world.motes.values()) {
    if (near(m)) motes.push([m.id, Math.round(m.x), Math.round(m.y)]);
  }
  const shades = [];
  for (const s of world.shades.values()) {
    if (near(s)) shades.push([s.id, Math.round(s.x), Math.round(s.y), s.target]);
  }

  return {
    t: 's',
    time: Math.round(world.time * 1000),
    seq: me.seq,
    me: [Math.round(me.x), Math.round(me.y), me.carry, me.banked, me.invuln > 0 ? 1 : 0],
    players,
    motes,
    shades,
    beacons: world.beacons.map((b) => [b.id, Math.round(b.charge * 100)]),
    light: Array.from(world.light, (v) => Math.round(v * 100)),
    night: world.night,
    dawn: Math.round(averageLight(world) * 1000),
    online: world.players.size,
  };
}
