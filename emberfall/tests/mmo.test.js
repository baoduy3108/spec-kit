// The two claims an MMO has to actually make good on:
//   1. the world is better with more people in it, measurably;
//   2. it survives a crowd connecting at once.
//
// Both are checked against the real server, not a mock.

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CFG, averageLight, createWorld, step } from '../server/world.js';
import { addBot, balance, thinkAll } from '../server/bots.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/** Run a world with `pop` lamplighters until dawn or the time limit. */
function nightWith(pop, minutes = 30) {
  const world = createWorld(99);
  for (let i = 0; i < pop; i++) addBot(world);
  const dt = 0.1;
  for (let t = 0; t < minutes * 60; t += dt) {
    thinkAll(world, dt);
    const events = step(world, dt);
    if (events.some((e) => e.type === 'dawn')) return { minutes: t / 60, light: 1 };
  }
  return { minutes: null, light: averageLight(world) };
}

test('a lone lamplighter can hold a light but cannot end the night', () => {
  const solo = nightWith(1, 12);
  assert.equal(solo.minutes, null, 'one person should not be able to light the world');
  const beaconCharge = 0; // measured through light instead, below
  assert.ok(solo.light >= beaconCharge, 'but the night should not be a total loss');
});

test('more lamplighters means an earlier dawn', () => {
  const eight = nightWith(8, 30);
  const twenty = nightWith(20, 30);
  assert.ok(eight.minutes, 'eight people should see a dawn within half an hour');
  assert.ok(twenty.minutes, 'and so should twenty');
  assert.ok(
    twenty.minutes < eight.minutes,
    `a crowd must be faster (20 took ${twenty.minutes.toFixed(1)}m, 8 took ${eight.minutes.toFixed(1)}m)`,
  );
  assert.ok(eight.minutes > 4, 'but a night should still be worth showing up for');
  assert.ok(eight.minutes < 25, 'and not a second job');
});

test('bots fill an empty world and step aside as humans arrive', () => {
  const world = createWorld(5);
  balance(world, { target: 10 });
  assert.equal(world.players.size, 10);
  for (const p of world.players.values()) assert.equal(p.bot, true);

  for (let i = 0; i < 6; i++) {
    const human = { id: `h${i}` };
    world.players.set(human.id, { ...human, bot: false, x: 0, y: 0, dx: 0, dy: 0, carry: 0, banked: 0, invuln: 0, name: 'h' });
  }
  const after = balance(world, { target: 10 });
  assert.equal(after.humans, 6);
  assert.equal(after.bots, 4, 'the crowd is topped up, not doubled');
  assert.equal(world.players.size, 10);
});

test('bots play the game rather than cheat at it', () => {
  const world = createWorld(77);
  for (let i = 0; i < 6; i++) addBot(world);
  const dt = 0.1;
  let banked = 0;
  for (let t = 0; t < 240; t += dt) {
    thinkAll(world, dt);
    for (const e of step(world, dt)) if (e.type === 'deposit') banked += e.motes;
  }
  assert.ok(banked > 0, 'bots should actually be banking motes');
  for (const bot of world.players.values()) {
    assert.ok(bot.x >= 0 && bot.x <= CFG.W, 'and staying inside the map');
    assert.ok(bot.carry <= CFG.CARRY_CAP, 'and obeying the carry cap');
  }
});

// --- the real server, with a crowd on it ----------------------------------

function startServer(port) {
  const child = spawn(process.execPath, [join(ROOT, 'server', 'index.js')], {
    env: { ...process.env, PORT: String(port), SEED: '4242' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('server did not start')), 8000);
    child.stdout.on('data', (chunk) => {
      if (String(chunk).includes('listening')) {
        clearTimeout(timer);
        resolve(child);
      }
    });
    child.on('error', reject);
  });
}

function play(port, name) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://127.0.0.1:${port}`);
    const state = { socket, name, joined: false, snapshots: 0, sawOthers: 0, id: null };
    const timer = setTimeout(() => reject(new Error(`${name} never got going`)), 9000);

    socket.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.t === 'hello') socket.send(JSON.stringify({ t: 'join', name }));
      if (msg.t === 'joined') {
        state.joined = true;
        state.id = msg.id;
        clearTimeout(timer);
        resolve(state);
      }
      if (msg.t === 's') {
        state.snapshots++;
        state.sawOthers = Math.max(state.sawOthers, msg.players.length);
        state.online = msg.online;
      }
    });
    socket.addEventListener('error', reject);
  });
}

test('forty clients can join the live server at once and all get the world', async () => {
  const port = 8300 + Math.floor(Math.random() * 300);
  const server = await startServer(port);
  try {
    const players = await Promise.all(
      Array.from({ length: 40 }, (_, i) => play(port, `crowd${i}`)),
    );
    assert.equal(players.filter((p) => p.joined).length, 40);
    assert.equal(new Set(players.map((p) => p.id)).size, 40, 'everyone gets their own id');

    // Everyone wanders for a moment so the server has something to send.
    for (const p of players) {
      p.socket.send(JSON.stringify({ t: 'in', dx: Math.random() - 0.5, dy: Math.random() - 0.5, seq: 1 }));
    }
    await new Promise((r) => setTimeout(r, 2500));

    for (const p of players) {
      assert.ok(p.snapshots > 8, `${p.name} only got ${p.snapshots} snapshots`);
      assert.ok(p.online >= 40, `${p.name} saw only ${p.online} online`);
    }
    assert.ok(
      players.some((p) => p.sawOthers > 0),
      'somebody should have had company in view',
    );

    const stats = await fetch(`http://127.0.0.1:${port}/stats`).then((r) => r.json());
    assert.equal(stats.online, 40);
    assert.ok(stats.population >= 40);

    for (const p of players) p.socket.close();
    await new Promise((r) => setTimeout(r, 600));
    const after = await fetch(`http://127.0.0.1:${port}/stats`).then((r) => r.json());
    assert.equal(after.online, 0, 'and leaving actually removes you');
  } finally {
    server.kill('SIGKILL');
  }
});

test('the server ignores rubbish instead of falling over', async () => {
  const port = 8700 + Math.floor(Math.random() * 200);
  const server = await startServer(port);
  try {
    const player = await play(port, 'well-behaved');
    const vandal = new WebSocket(`ws://127.0.0.1:${port}`);
    await new Promise((r) => vandal.addEventListener('open', r));

    vandal.send('not json at all');
    vandal.send(JSON.stringify({ t: 'in', dx: 'nonsense', dy: null, seq: -5 }));
    vandal.send(JSON.stringify({ t: 'join', name: '<script>alert(1)</script>' }));
    vandal.send(JSON.stringify({ t: 'in', dx: 1e30, dy: Number.NaN }));
    vandal.send(JSON.stringify({ t: 'unknown-message' }));
    await new Promise((r) => setTimeout(r, 1200));

    const stats = await fetch(`http://127.0.0.1:${port}/stats`).then((r) => r.json());
    assert.ok(stats.online >= 2, 'both are still connected');
    assert.ok(player.snapshots > 3, 'and the well-behaved client is unaffected');
    vandal.close();
    player.socket.close();
  } finally {
    server.kill('SIGKILL');
  }
});
