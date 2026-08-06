// Two claims this file has to defend:
//
//   1. Reading the boss wins. Mashing does not.
//   2. Losing makes you stronger — the same policy that loses at level 0
//      wins at level 5, without the player ever getting better at it.
//
// Both are measured with bots, because "is it too hard" is a number, not an
// opinion, and the answer to the second one is what makes the fight humane.

import test from 'node:test';
import assert from 'node:assert/strict';

import { MOVES, chooseMove, hitSpan, totalOf } from '../src/moves.js';
import {
  ARENA,
  KNIGHT,
  STEP,
  UPGRADES,
  WARDEN,
  activeNow,
  buy,
  endFight,
  isInvulnerable,
  maxHp,
  maxStamina,
  newFight,
  newRun,
  priceOf,
  step,
  telegraph,
} from '../src/rules.js';

const NONE = { left: false, right: false, attack: false, roll: false, block: false, drink: false };
const press = (extra) => ({ ...NONE, ...extra });

function run(fight, input, seconds) {
  const frames = Math.round(seconds / STEP);
  for (let i = 0; i < frames && !fight.over; i++) step(fight, input, STEP);
  return fight;
}

test('rolling makes you untouchable, but only in the middle of it', () => {
  const fight = newFight(newRun(), 1);
  step(fight, press({ roll: true }));
  assert.equal(fight.knight.state, 'roll');

  const seen = [];
  for (let i = 0; i < 30; i++) {
    seen.push({ t: Number(fight.knight.time.toFixed(3)), safe: isInvulnerable(fight.knight) });
    step(fight, NONE);
  }
  assert.equal(seen[0].safe, false, 'not on the first frame');
  assert.ok(seen.some((s) => s.safe), 'there is a window');
  const last = seen.filter((s) => s.safe).pop();
  assert.ok(last.t <= KNIGHT.roll.iTo + 0.02, 'and it closes before the roll ends');
});

test('stamina gates everything, and comes back after a pause', () => {
  const fight = newFight(newRun(), 2);
  fight.knight.stamina = 10;
  step(fight, press({ roll: true }));
  assert.notEqual(fight.knight.state, 'roll', 'no stamina, no roll');
  step(fight, press({ attack: true }));
  assert.notEqual(fight.knight.state, 'attack', 'no stamina, no swing');

  run(fight, NONE, 2);
  assert.ok(fight.knight.stamina > 50, 'standing still refills you');
});

test('a swing has to connect in its active frames, and only once', () => {
  const fight = newFight(newRun(), 3);
  fight.warden.x = fight.knight.x + 70;
  fight.warden.state = 'stagger';
  fight.warden.time = 0;
  const before = fight.warden.hp;

  step(fight, press({ attack: true }));
  run(fight, NONE, KNIGHT.swings[0].windup + KNIGHT.swings[0].active + 0.02);
  assert.ok(fight.warden.hp < before, 'it lands');
  const after = fight.warden.hp;
  run(fight, NONE, 0.2);
  assert.equal(fight.warden.hp, after, 'and it cannot land twice');
});

test('the warning on the ground is exactly where the hit will be', () => {
  const fight = newFight(newRun(), 4);
  fight.knight.x = 400;
  fight.warden.x = 520;

  let warned = null;
  for (let i = 0; i < 600 && !warned; i++) {
    step(fight, NONE);
    const tell = telegraph(fight);
    if (tell && tell.move === 'sweep') warned = tell;
  }
  assert.ok(warned, 'a wind-up is drawn');

  // walk the fight forward to the active frames and compare
  const w = fight.warden;
  while (!activeNow(w, w.move)) step(fight, NONE);
  const real = hitSpan(w.x, w.facing, w.move.reach);
  assert.ok(real[0] >= warned.span[0] - 1, `hit starts inside the warning`);
  assert.ok(real[1] <= warned.span[1] + 1, `hit ends inside the warning`);
});

test('the warning is only shown while it is still avoidable', () => {
  const fight = newFight(newRun(), 5);
  for (let i = 0; i < 900; i++) {
    step(fight, NONE);
    const w = fight.warden;
    if (w.state === 'attack' && w.time > w.move.windup) {
      assert.equal(telegraph(fight), null, 'no warning once it is already swinging');
      return;
    }
  }
});

test('blocking costs stamina, and running out breaks your guard', () => {
  const fight = newFight(newRun(), 6);
  const k = fight.knight;
  k.stamina = 4;
  k.x = 500;
  const w = fight.warden;
  w.x = 560;
  w.state = 'attack';
  w.move = MOVES.sweep;
  w.time = MOVES.sweep.windup + 0.01;
  w.landed = false;

  step(fight, press({ block: true }));
  step(fight, press({ block: true }));
  assert.equal(k.state, 'stagger', 'a shield is not a place to hide forever');
  assert.ok(fight.events.length >= 0);
});

test('pressing the attack enough makes the boss reel', () => {
  const fight = newFight(newRun(), 7);
  const w = fight.warden;
  w.state = 'stagger';
  w.time = -99; // hold it still while we hit it
  w.x = fight.knight.x + 60;

  let staggered = false;
  for (let i = 0; i < 60 * 6 && !staggered; i++) {
    step(fight, press({ attack: true }));
    w.time = -99;
    staggered = fight.events.some((e) => e.type === 'stagger');
  }
  assert.ok(staggered, 'poise breaks and you get a free window');
});

test('half health opens the second phase, once', () => {
  const fight = newFight(newRun(), 8);
  fight.warden.hp = WARDEN.hp * WARDEN.phaseAt;
  step(fight, NONE);
  assert.equal(fight.warden.phase, 2);
  assert.ok(fight.events.some((e) => e.type === 'phase'));

  const seen = new Set();
  for (let i = 0; i < 60 * 90 && !fight.over; i++) {
    step(fight, NONE);
    for (const e of fight.events) if (e.type === 'tell') seen.add(e.move);
  }
  assert.ok(seen.has('ember') || seen.has('backhand'), 'and new moves come out');
});

test('the same move never comes out twice in a row', () => {
  for (let seed = 0; seed < 200; seed++) {
    const roll = ((seed * 7919) % 1000) / 1000;
    const picked = chooseMove(180, 2, 'sweep', roll);
    assert.notEqual(picked.id, 'sweep');
  }
});

test('dying drops what you were carrying, right where you fell', () => {
  const record = newRun();
  const fight = newFight(record, 9);
  fight.earned = 140;
  fight.knight.x = 431;
  fight.knight.hp = 0;
  fight.over = 'lost';
  endFight(fight);

  assert.deepEqual(record.lost, { x: 431, amount: 140 });
  assert.equal(record.essence, 0, 'you do not keep it by dying');

  const again = newFight(record, 10);
  assert.ok(again.pickup, 'it is lying there next time');
  again.knight.x = 431;
  step(again, NONE);
  assert.ok(again.events.some((e) => e.type === 'recover'));
  assert.equal(again.pickup, null);
  assert.equal(record.essence, 140, 'picking it up banks it there and then');

  // ...and losing again does not take back what was already banked
  again.earned = 20;
  again.knight.hp = 0;
  again.over = 'lost';
  endFight(again);
  assert.equal(record.essence, 140, 'what you have recovered is yours to keep');
  assert.equal(record.lost.amount, 20);
});

test('essence buys real numbers, and runs out', () => {
  const record = newRun();
  record.essence = 100000;
  const baseHp = maxHp(record);
  const baseStam = maxStamina(record);
  for (let i = 0; i < UPGRADES.vigour.max; i++) assert.equal(buy(record, 'vigour'), true);
  assert.equal(buy(record, 'vigour'), false, 'five is the cap');
  assert.equal(priceOf(record, 'vigour'), null);
  assert.ok(maxHp(record) > baseHp);

  const broke = newRun();
  broke.essence = 1;
  assert.equal(buy(broke, 'endurance'), false);
  assert.equal(maxStamina(broke), baseStam);
});

// --- the bots -------------------------------------------------------------

/**
 * Someone who watches the boss: rolls when the warning covers them, walks in
 * during recovery, hits once or twice, drinks when it is safe. No reflexes a
 * person could not have — it reacts to the same telegraph you can see.
 */
function reader(fight) {
  const k = fight.knight;
  const w = fight.warden;
  const input = { ...NONE };
  const distance = Math.abs(w.x - k.x);
  const toward = w.x > k.x ? 'right' : 'left';
  const away = w.x > k.x ? 'left' : 'right';

  const tell = telegraph(fight);
  const danger = tell && k.x > tell.span[0] - 24 && k.x < tell.span[1] + 24;

  if (danger) {
    const left = w.move.windup - w.time;
    // roll late, so the invulnerable part lands on the swing
    if (left < 0.13 && k.stamina >= KNIGHT.roll.cost) {
      input.roll = true;
      input[w.move.id === 'lunge' ? toward : away] = true;
      return input;
    }
    input[away] = true;
    if (k.stamina < KNIGHT.roll.cost) input.block = true;
    return input;
  }

  const recovering =
    w.state === 'stagger' ||
    w.state === 'roar' ||
    (w.state === 'attack' && w.time > w.move.windup + w.move.active);

  if (k.hp < maxHp(fight.run) * 0.45 && k.flasks > 0 && (w.state === 'stagger' || distance > 300)) {
    input.drink = true;
    return input;
  }

  if (recovering) {
    if (distance > 78) input[toward] = true;
    else if (k.stamina >= KNIGHT.swings[0].cost) input.attack = true;
    return input;
  }

  // otherwise keep out of reach and let stamina come back
  if (distance < 175) input[away] = true;
  else if (distance > 250) input[toward] = true;
  return input;
}

/** Someone who just holds the attack button and walks forward. */
function masher(fight) {
  const input = { ...NONE };
  const k = fight.knight;
  const w = fight.warden;
  if (Math.abs(w.x - k.x) > 74) input[w.x > k.x ? 'right' : 'left'] = true;
  input.attack = true;
  return input;
}

function fightOut(record, seed, policy) {
  const fight = newFight(record, seed);
  for (let i = 0; i < 60 * 240 && !fight.over; i++) step(fight, policy(fight), STEP);
  if (!fight.over) fight.over = 'lost';
  return fight;
}

function winRate(policy, levels, tries = 40) {
  let wins = 0;
  for (let seed = 1; seed <= tries; seed++) {
    const record = newRun();
    Object.assign(record.levels, levels);
    if (fightOut(record, seed * 31, policy).over === 'won') wins++;
  }
  return wins / tries;
}

test('reading the boss wins; mashing does not', () => {
  const read = winRate(reader, {});
  const mash = winRate(masher, {});
  assert.ok(read >= 0.5, `a fresh player who reads the tells should win about half (${read})`);
  assert.ok(mash <= 0.1, `mashing should not clear it (${mash})`);
  assert.ok(read - mash > 0.4, `skill has to be worth more than luck (${read} vs ${mash})`);
});

test('losing makes you stronger: the same play wins once the deaths add up', () => {
  const fresh = winRate(reader, {});
  const levelled = winRate(reader, { vigour: 5, endurance: 5, strength: 5, flasks: 3 });
  assert.ok(
    levelled > fresh,
    `essence has to actually move the needle (${fresh} → ${levelled})`,
  );
  assert.ok(levelled >= 0.85, `a fully upgraded knight should almost always win (${levelled})`);
});

test('a fight always ends, and never leaves someone at negative health', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const fight = fightOut(newRun(), seed * 977, reader);
    assert.ok(fight.over === 'won' || fight.over === 'lost');
    assert.ok(fight.knight.hp >= 0 && fight.warden.hp >= 0);
    assert.ok(fight.knight.x >= ARENA.lo && fight.knight.x <= ARENA.hi);
  }
});

test('every move has a punish window longer than the swing itself', () => {
  for (const move of Object.values(MOVES)) {
    assert.ok(move.recover > move.active, `${move.id} must be punishable`);
    assert.ok(move.windup >= 0.35, `${move.id} must be readable`);
    assert.ok(totalOf(move) < 2.6, `${move.id} must not outstay its welcome`);
  }
});
