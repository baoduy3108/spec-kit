// The game server: static files, WebSocket upgrade, the tick, persistence.

import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { WebSocketServer } from './ws.js';
import { balance, thinkAll } from './bots.js';
import {
  CFG,
  addPlayer,
  averageLight,
  createWorld,
  removePlayer,
  setInput,
  snapshotFor,
  step,
} from './world.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CLIENT = join(ROOT, 'client');
const DATA = join(ROOT, 'data');
const SAVE = join(DATA, 'world.json');

const PORT = Number(process.env.PORT) || 8080;
const TICK_HZ = 20;
const SNAPSHOT_HZ = 10;
const SAVE_EVERY_MS = 30000;
/** A client may not send inputs faster than this, whatever it claims. */
const INPUT_RATE = 60;

// --- world ----------------------------------------------------------------

const world = createWorld(Number(process.env.SEED) || 20260805);
restore();

function restore() {
  try {
    if (!existsSync(SAVE)) return;
    const saved = JSON.parse(readFileSync(SAVE, 'utf8'));
    if (!saved || saved.regions !== CFG.REGIONS) return;
    world.night = saved.night || 1;
    world.time = saved.time || 0;
    if (Array.isArray(saved.light) && saved.light.length === world.light.length) {
      for (let i = 0; i < saved.light.length; i++) world.light[i] = saved.light[i];
    }
    if (Array.isArray(saved.beacons) && saved.beacons.length === world.beacons.length) {
      saved.beacons.forEach((b, i) => {
        world.beacons[i].x = b.x;
        world.beacons[i].y = b.y;
        world.beacons[i].charge = b.charge;
      });
    }
    console.log(`[world] restored night ${world.night}, light ${averageLight(world).toFixed(2)}`);
  } catch (err) {
    console.warn('[world] could not restore:', err.message);
  }
}

function persist() {
  try {
    mkdirSync(DATA, { recursive: true });
    writeFileSync(
      SAVE,
      JSON.stringify({
        regions: CFG.REGIONS,
        night: world.night,
        time: world.time,
        light: Array.from(world.light, (v) => Number(v.toFixed(4))),
        beacons: world.beacons.map((b) => ({ x: b.x, y: b.y, charge: Number(b.charge.toFixed(4)) })),
      }),
    );
  } catch (err) {
    console.warn('[world] could not save:', err.message);
  }
}

// --- static files ---------------------------------------------------------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
};

const http = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/stats') {
    let humans = 0;
    for (const p of world.players.values()) if (!p.bot) humans++;
    res.writeHead(200, { 'content-type': MIME['.json'] });
    res.end(
      JSON.stringify({
        online: humans,
        population: world.players.size,
        night: world.night,
        light: Number(averageLight(world).toFixed(3)),
        motes: world.motes.size,
        shades: world.shades.size,
        uptime: Math.round(process.uptime()),
      }),
    );
    return;
  }

  const wanted = url.pathname === '/' ? '/index.html' : url.pathname;
  const path = join(CLIENT, normalize(wanted).replace(/^(\.\.[/\\])+/, ''));
  if (!path.startsWith(CLIENT) || !existsSync(path)) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, {
    'content-type': MIME[extname(path)] || 'application/octet-stream',
    'cache-control': 'no-cache',
  });
  createReadStream(path).pipe(res);
});

// --- sockets --------------------------------------------------------------

const wss = new WebSocketServer(http, { maxPayload: 4096 });
let nextClient = 1;

wss.onConnect = (conn) => {
  conn.data.id = `p:${nextClient++}`;
  conn.data.joined = false;
  conn.data.inputs = 0;
  conn.send(JSON.stringify({ t: 'hello', world: { w: CFG.W, h: CFG.H, regions: CFG.REGIONS } }));
};

wss.onMessage = (conn, raw) => {
  if (typeof raw !== 'string') return;
  let msg;
  try {
    msg = JSON.parse(raw);
  } catch (_) {
    return;
  }

  if (msg.t === 'join' && !conn.data.joined) {
    conn.data.joined = true;
    const name = typeof msg.name === 'string' ? msg.name.replace(/[^\w \-]/g, '').slice(0, 16) : '';
    const player = addPlayer(world, conn.data.id, name || 'ember');
    conn.send(
      JSON.stringify({
        t: 'joined',
        id: player.id,
        name: player.name,
        beacons: world.beacons.map((b) => ({ id: b.id, x: Math.round(b.x), y: Math.round(b.y) })),
        night: world.night,
      }),
    );
    console.log(`[join] ${player.name} (${player.id}) — ${world.players.size} in world`);
    return;
  }

  if (msg.t === 'in' && conn.data.joined) {
    // Cheap flood protection: the tick is the only thing that moves anyone.
    if (++conn.data.inputs > INPUT_RATE) return;
    setInput(world, conn.data.id, Number(msg.dx) || 0, Number(msg.dy) || 0, Number(msg.seq) || 0);
  }
};

wss.onClose = (conn) => {
  if (conn.data.joined) {
    removePlayer(world, conn.data.id);
    console.log(`[part] ${conn.data.id} — ${world.players.size} in world`);
  }
};

// --- the loop -------------------------------------------------------------

let last = Date.now();
let sinceSnapshot = 0;
let sinceSave = 0;
let sinceBalance = 0;

const timer = setInterval(() => {
  const now = Date.now();
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;

  thinkAll(world, dt);
  const events = step(world, dt);

  sinceBalance += dt;
  if (sinceBalance > 3) {
    sinceBalance = 0;
    balance(world);
  }

  // Events everyone should see (dawn) go out immediately.
  const dawn = events.find((e) => e.type === 'dawn');
  if (dawn) {
    console.log(`[dawn] night ${dawn.night} ended; top ${dawn.board[0]?.name || 'nobody'}`);
    wss.broadcast(JSON.stringify({ t: 'dawn', night: dawn.night, board: dawn.board }));
  }

  sinceSnapshot += dt;
  if (sinceSnapshot >= 1 / SNAPSHOT_HZ) {
    sinceSnapshot = 0;
    for (const conn of wss.clients) {
      if (!conn.data.joined) continue;
      conn.data.inputs = 0;
      const snap = snapshotFor(world, conn.data.id);
      if (!snap) continue;
      const mine = events.filter((e) => e.player === conn.data.id && e.type !== 'mote');
      if (mine.length) snap.events = mine;
      conn.send(JSON.stringify(snap));
    }
  }

  sinceSave += dt * 1000;
  if (sinceSave > SAVE_EVERY_MS) {
    sinceSave = 0;
    persist();
  }
}, 1000 / TICK_HZ);

function shutdown() {
  console.log('\n[server] saving and closing');
  clearInterval(timer);
  persist();
  wss.stop();
  http.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

http.listen(PORT, () => {
  balance(world);
  console.log(`[server] EMBERFALL listening on http://localhost:${PORT}`);
  console.log(`[world] night ${world.night}, ${world.players.size} lamplighters`);
});
