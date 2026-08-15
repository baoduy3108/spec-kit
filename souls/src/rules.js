// The fight itself: two bodies on a line, stamina, and frames.
//
// DOM-free and deterministic at a fixed timestep, so the tests can run the
// whole fight a thousand times and ask the only question that matters about a
// game like this: can it be won by reading the boss, and can it *not* be won
// by mashing?

import { MOVES, chooseMove, hitSpan } from './moves.js';

export const STEP = 1 / 60;
export const ARENA = { lo: 70, hi: 890 };

export const KNIGHT = {
  hp: 100,
  stamina: 100,
  speed: 195,
  bodyR: 20,
  /** Rolling: fast, cheap enough to use often, and briefly untouchable. */
  roll: { time: 0.46, speed: 470, cost: 25, iFrom: 0.06, iTo: 0.31 },
  /** Two-hit combo. The second is slower and commits you. */
  swings: [
    { windup: 0.14, active: 0.09, recover: 0.3, damage: 11, reach: [18, 94], cost: 20 },
    { windup: 0.13, active: 0.1, recover: 0.42, damage: 16, reach: [18, 104], cost: 26 },
  ],
  block: { soak: 0.22, stamPerDamage: 1.7, regen: 9 },
  /**
   * The one thing worth taking from the four souls-like repositories that got
   * read: Cat's Godot 4 template exports `parry_window = .3` and makes the
   * first moments of a guard turn a block into a parry. That is a better idea
   * than a separate parry button, because it costs the player a decision
   * rather than a key.
   *
   * `lock` is mine, and it is the part that makes it a decision. Without it,
   * holding block down and re-tapping gives a window that is effectively
   * always open, and a parry that is always available is just a block that
   * does more. After a window closes you cannot open another for half a
   * second, so mashing is strictly worse than one press at the right moment.
   */
  parry: { window: 0.3, lock: 0.5, stagger: 1.1 },
  // There was no jump. Not a small omission: with no way off the ground every
  // room in the game had to be one flat floor, which is why 368 of them read as
  // a corridor rather than a place. A souls-like jump is a modest one — it
  // clears a ledge, it is not a platformer's double-jump — and it is a
  // commitment: you cannot roll or swing while you are in the air, and you owe
  // a short landing recovery when you come down.
  //
  // 547 up against 1700 of gravity peaks at 88 units — 2.6m — after 0.32s, and
  // is back down 0.64s after leaving the floor. At walking speed that clears a
  // 3.7m gap. Both numbers are what the level geometry is checked against.
  jump: { speed: 547, cost: 12, land: 0.12, control: 0.55 },
  gravity: 1700,

  /**
   * Three skills, and each one is the fiction doing something rather than a
   * button that was needed. You carry an unlit lantern, and your body is fired
   * clay with the kiln still burning in its cracks — so every skill spends one
   * of those two things.
   *
   * KINDLE. Open the cracks and light the lantern off your own chest. While it
   * burns, everything you land hits harder. It goes out on its own, and it
   * cannot be lit again until you sit at a fire, because there is only so much
   * of you to burn. Costs health, not stamina — you are the fuel.
   *
   * SEAL. Close the cracks. Damage taken drops hard while they are shut, but
   * nothing is feeding the fire, so stamina stops coming back and the lantern
   * cannot be kindled. A defensive stance that takes away your recovery is a
   * real decision; one that only protects is not.
   *
   * DRAW. Only inside the window a parry opens. Reach into a staggered thing
   * and take the ember out of it. Huge damage, and it refills a flask, which
   * makes the parry the only route to a free heal in the game.
   */
  skills: {
    kindle: { hpCost: 12, burn: 9, bonus: 1.45, oncePerRest: true },
    seal: { soak: 0.45, drain: 22, regenOff: true },
    draw: { damage: 62, window: 1.0, flask: 1 },
  },
  drink: { time: 0.95, heal: 46 },
  hurt: 0.34,
  stagger: 0.85,
  regen: 27,
  /** Stamina stops coming back for a moment after you spend it. */
  regenDelay: 0.42,
};

export const WARDEN = {
  hp: 300,
  bodyR: 46,
  speed: 96,
  /** How much damage it takes before it reels — the reward for pressing. */
  poise: 62,
  staggerTime: 0.7,
  think: 0.34,
  /** Half health: the lantern opens and two more moves come out. */
  phaseAt: 0.5,
  roarTime: 1.15,
};

/** What repeated deaths buy. Each one is small; together they are the answer. */
export const UPGRADES = {
  vigour: { max: 5, hp: 14, cost: (n) => 60 + n * 55 },
  endurance: { max: 5, stamina: 12, cost: (n) => 55 + n * 50 },
  strength: { max: 5, damage: 2.6, cost: (n) => 70 + n * 65 },
  flasks: { max: 3, cost: (n) => 90 + n * 90 },
};

function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function newRun() {
  return {
    attempts: 0,
    wins: 0,
    essence: 0,
    /** Dropped where you died, waiting to be walked over. */
    lost: null,
    levels: { vigour: 0, endurance: 0, strength: 0, flasks: 0 },
    /** Furthest the boss has been pushed, so progress is visible. */
    best: 0,
  };
}

export const maxHp = (run) => KNIGHT.hp + run.levels.vigour * UPGRADES.vigour.hp;
export const maxStamina = (run) =>
  KNIGHT.stamina + run.levels.endurance * UPGRADES.endurance.stamina;
export const swingDamage = (run, base) => base + run.levels.strength * UPGRADES.strength.damage;
export const flaskCount = (run) => 3 + run.levels.flasks;

export function newFight(run, seed = 1) {
  return {
    run,
    seed,
    rng: rngFrom(seed),
    t: 0,
    over: null, // 'won' | 'lost'
    shake: 0,
    events: [],
    /** Damage dealt this attempt — at risk until you win or pick it back up. */
    earned: 0,
    /** Recovered from the floor, already banked and already spendable. */
    banked: 0,
    /** The essence you dropped last death, lying on the floor. */
    pickup: run.lost ? { x: run.lost.x, amount: run.lost.amount } : null,
    knight: {
      x: 200,
      facing: 1,
      hp: maxHp(run),
      stamina: maxStamina(run),
      state: 'idle',
      time: 0,
      swing: 0,
      combo: false,
      landed: false,
      sinceSpend: 9,
      flasks: flaskCount(run),
      invuln: false,
    },
    warden: {
      x: 700,
      facing: -1,
      hp: WARDEN.hp,
      state: 'idle',
      time: 0,
      move: null,
      lastId: null,
      landed: false,
      poise: 0,
      parry: 0,
      parryLock: 0,
      lit: 0,        // seconds the lantern has left
      spent: false,  // kindled since the last rest
      sealed: false,
      opening: 0,    // seconds left to reach into something you just parried
      phase: 1,
    },
  };
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const spend = (knight, amount) => {
  knight.stamina = Math.max(0, knight.stamina - amount);
  knight.sinceSpend = 0;
};

/** Rolling only makes you untouchable in the middle of the roll. */
export function isInvulnerable(knight) {
  return (
    knight.state === 'roll' && knight.time >= KNIGHT.roll.iFrom && knight.time <= KNIGHT.roll.iTo
  );
}

export function canAct(knight) {
  return knight.state === 'idle' || knight.state === 'walk' || knight.state === 'block';
}

/**
 * @param input { left, right, attack, roll, block, drink } — attack/roll/drink
 *   are edge-triggered by the caller passing true on the frame of the press.
 */
export function step(fight, input, dt = STEP) {
  fight.events.length = 0;
  if (fight.over) return fight.events;

  fight.t += dt;
  fight.shake = Math.max(0, fight.shake - dt * 34);

  stepKnight(fight, input, dt);
  stepWarden(fight, dt);
  resolve(fight);

  if (fight.warden.hp <= 0 && !fight.over) {
    fight.over = 'won';
    fight.events.push({ type: 'end', won: true });
  }
  if (fight.knight.hp <= 0 && !fight.over) {
    fight.over = 'lost';
    fight.events.push({ type: 'end', won: false });
  }
  return fight.events;
}

function stepKnight(fight, input, dt) {
  const k = fight.knight;
  const run = fight.run;
  k.time += dt;
  k.sinceSpend += dt;

  k.parry = Math.max(0, k.parry - dt);
  k.parryLock = Math.max(0, k.parryLock - dt);
  k.lit = Math.max(0, k.lit - dt);
  k.opening = Math.max(0, k.opening - dt);
  k.sealed = !!input.seal && canAct(k);
  if (k.sealed) spend(k, KNIGHT.skills.seal.drain * dt);
  const regen = k.sealed ? 0 : k.state === 'block' ? KNIGHT.block.regen : KNIGHT.regen;
  if (k.sinceSpend > KNIGHT.regenDelay && k.state !== 'roll') {
    k.stamina = Math.min(maxStamina(run), k.stamina + regen * dt);
  }

  // face the boss unless committed to something
  if (canAct(k)) k.facing = fight.warden.x >= k.x ? 1 : -1;

  switch (k.state) {
    case 'roll': {
      const r = KNIGHT.roll;
      // Ease out, so the roll reads as a burst rather than a glide. The
      // max(0) matters: on the frame that overshoots the duration this base
      // goes negative, and a negative to a fractional power is NaN — which
      // silently teleports the knight out of the world.
      const speed = r.speed * Math.max(0, 1 - k.time / r.time) ** 0.7;
      k.x = clamp(k.x + k.facing * speed * dt, ARENA.lo, ARENA.hi);
      if (k.time >= r.time) enter(k, 'idle');
      break;
    }
    case 'attack': {
      const s = KNIGHT.swings[k.swing];
      if (input.attack && k.time > s.windup + s.active && k.swing === 0) k.combo = true;
      if (k.time >= s.windup + s.active + s.recover) {
        if (k.combo && k.stamina >= KNIGHT.swings[1].cost) {
          k.combo = false;
          k.swing = 1;
          k.time = 0;
          k.landed = false;
          spend(k, KNIGHT.swings[1].cost);
          fight.events.push({ type: 'swing', n: 1 });
        } else {
          k.combo = false;
          enter(k, 'idle');
        }
      }
      break;
    }
    case 'hurt':
      if (k.time >= KNIGHT.hurt) enter(k, 'idle');
      break;
    case 'stagger':
      if (k.time >= KNIGHT.stagger) enter(k, 'idle');
      break;
    case 'drink':
      if (k.time >= KNIGHT.drink.time) {
        k.hp = Math.min(maxHp(run), k.hp + KNIGHT.drink.heal);
        fight.events.push({ type: 'heal' });
        enter(k, 'idle');
      }
      break;
    default: {
      // free to act
      if (input.roll && k.stamina >= KNIGHT.roll.cost) {
        const dir = input.left ? -1 : input.right ? 1 : k.facing;
        k.facing = dir;
        spend(k, KNIGHT.roll.cost);
        enter(k, 'roll');
        fight.events.push({ type: 'roll' });
        break;
      }
      if (input.attack && k.stamina >= KNIGHT.swings[0].cost) {
        k.swing = 0;
        k.landed = false;
        k.combo = false;
        spend(k, KNIGHT.swings[0].cost);
        enter(k, 'attack');
        fight.events.push({ type: 'swing', n: 0 });
        break;
      }
      if (input.kindle && !k.spent && !k.sealed && k.hp > KNIGHT.skills.kindle.hpCost + 1) {
        // you are the fuel
        k.hp -= KNIGHT.skills.kindle.hpCost;
        k.lit = KNIGHT.skills.kindle.burn;
        k.spent = true;
        fight.events.push({ type: 'kindle', x: k.x });
        break;
      }
      if (input.draw && k.opening > 0 && fight.warden.state === 'stagger') {
        const w = fight.warden;
        k.opening = 0;
        w.hp = Math.max(0, w.hp - KNIGHT.skills.draw.damage);
        k.flasks = Math.min(flaskCount(fight.run), k.flasks + KNIGHT.skills.draw.flask);
        fight.shake = Math.max(fight.shake, 14);
        fight.events.push({ type: 'draw', x: w.x });
        break;
      }
      if (input.drink && k.flasks > 0) {
        k.flasks--;
        enter(k, 'drink');
        fight.events.push({ type: 'drink' });
        break;
      }
      const walking = (input.left ? -1 : 0) + (input.right ? 1 : 0);
      if (input.block) {
        if (k.state !== 'block') {
          enter(k, 'block');
          // A fresh guard opens a parry window, unless one just closed.
          if (k.parryLock <= 0) {
            k.parry = KNIGHT.parry.window;
            k.parryLock = KNIGHT.parry.window + KNIGHT.parry.lock;
          }
        }
        k.x = clamp(k.x + walking * KNIGHT.speed * 0.42 * dt, ARENA.lo, ARENA.hi);
      } else {
        if (k.state === 'block') enter(k, 'idle');
        if (walking) {
          k.state = 'walk';
          k.x = clamp(k.x + walking * KNIGHT.speed * dt, ARENA.lo, ARENA.hi);
        } else if (k.state === 'walk') {
          k.state = 'idle';
        }
      }
    }
  }
  k.invuln = isInvulnerable(k);
}

function enter(body, state) {
  body.state = state;
  body.time = 0;
}

function stepWarden(fight, dt) {
  const w = fight.warden;
  const k = fight.knight;
  w.time += dt;

  if (w.phase === 1 && w.hp <= WARDEN.hp * WARDEN.phaseAt) {
    w.phase = 2;
    enter(w, 'roar');
    fight.shake = 12;
    fight.events.push({ type: 'phase' });
    return;
  }

  switch (w.state) {
    case 'roar':
      if (w.time >= WARDEN.roarTime) enter(w, 'idle');
      break;
    case 'stagger':
      if (w.time >= (w.staggerFor || WARDEN.staggerTime)) enter(w, 'idle');
      break;
    case 'attack': {
      const m = w.move;
      // Phase two shortens the recovery, never the wind-up. The tells stay
      // exactly as readable; what shrinks is how much you are allowed to do
      // about them. That is the honest way for a boss to get harder.
      const total = m.windup + m.active + m.recover * (w.phase >= 2 ? 0.76 : 1);
      if (w.time > m.windup && w.time <= m.windup + m.active && m.step) {
        w.x = clamp(w.x + w.facing * m.step * dt, ARENA.lo, ARENA.hi);
      }
      if (w.time >= total) enter(w, 'idle');
      break;
    }
    default: {
      w.facing = k.x >= w.x ? 1 : -1;
      const distance = Math.abs(k.x - w.x);
      if (w.time < WARDEN.think) {
        // close the gap while deciding
        if (distance > 150) w.x = clamp(w.x + w.facing * WARDEN.speed * dt, ARENA.lo, ARENA.hi);
        break;
      }
      w.move = chooseMove(distance, w.phase, w.lastId, fight.rng());
      w.lastId = w.move.id;
      w.landed = false;
      enter(w, 'attack');
      fight.events.push({ type: 'tell', move: w.move.id });
    }
  }
}

/** Is this attacker in the frames where the swing actually hurts? */
export function activeNow(body, move) {
  if (!move) return false;
  return body.time > move.windup && body.time <= move.windup + move.active;
}

/** The warning painted on the ground: only during the wind-up. */
export function telegraph(fight) {
  const w = fight.warden;
  if (w.state !== 'attack' || !w.move || w.time > w.move.windup) return null;
  const m = w.move;
  // A move that travels has to warn about everywhere it will travel *to*,
  // not just where it starts, or the warning is a lie.
  const travel = m.id === 'lunge' ? m.step * m.active : 0;
  const [a, b] = hitSpan(w.x, w.facing, m.reach);
  return {
    span: w.facing > 0 ? [a, b + travel] : [a - travel, b],
    ready: w.time / m.windup,
    colour: m.colour,
    move: m.id,
  };
}

function resolve(fight) {
  const k = fight.knight;
  const w = fight.warden;

  // the knight's swing
  if (k.state === 'attack' && !k.landed) {
    const s = KNIGHT.swings[k.swing];
    if (activeNow(k, s)) {
      const [a, b] = hitSpan(k.x, k.facing, s.reach);
      if (w.x + WARDEN.bodyR >= a && w.x - WARDEN.bodyR <= b) {
        k.landed = true;
        // a lit lantern is the only thing in the game that scales your damage
        // without being bought
        const damage = swingDamage(fight.run, s.damage) * (k.lit > 0 ? KNIGHT.skills.kindle.bonus : 1);
        w.hp = Math.max(0, w.hp - damage);
        w.poise += damage;
        fight.earned += Math.round(damage);
        fight.shake = Math.max(fight.shake, 5);
        fight.events.push({ type: 'hit', on: 'warden', x: w.x, damage });
        if (w.poise >= WARDEN.poise && w.state !== 'roar') {
          w.poise = 0;
          w.staggerFor = WARDEN.staggerTime;
          enter(w, 'stagger');
          fight.events.push({ type: 'stagger' });
        }
      }
    }
  }

  // the warden's swing
  if (w.state === 'attack' && !w.landed && activeNow(w, w.move)) {
    const m = w.move;
    const [a, b] = hitSpan(w.x, w.facing, m.reach);
    if (k.x + KNIGHT.bodyR >= a && k.x - KNIGHT.bodyR <= b) {
      w.landed = true;
      if (isInvulnerable(k)) {
        fight.events.push({ type: 'dodge' });
      } else if (k.state === 'block' && facingIt(k, w) && k.parry > 0) {
        // Caught it on the way in: no damage, no stamina, and the Warden is
        // open. This is the only way to take a hit for free, and it is worth
        // that because you have to commit to it before the blow is thrown.
        k.parry = 0;
        w.poise = 0;
        enter(w, 'stagger');
        w.staggerFor = KNIGHT.parry.stagger;
        fight.shake = Math.max(fight.shake, 10);
        k.opening = KNIGHT.skills.draw.window;
        fight.events.push({ type: 'parry', x: k.x });
      } else if (k.state === 'block' && facingIt(k, w)) {
        const cost = m.damage * KNIGHT.block.stamPerDamage;
        if (k.stamina >= cost) {
          spend(k, cost);
          k.hp = Math.max(0, k.hp - m.damage * KNIGHT.block.soak);
          fight.shake = Math.max(fight.shake, 6);
          fight.events.push({ type: 'block', x: k.x });
        } else {
          // guard broken: the shield is not a place to hide forever
          spend(k, k.stamina);
          k.hp = Math.max(0, k.hp - m.damage * 0.65);
          enter(k, 'stagger');
          fight.shake = Math.max(fight.shake, 12);
          fight.events.push({ type: 'guardbreak', x: k.x });
        }
      } else {
        k.hp = Math.max(0, k.hp - m.damage * (k.sealed ? 1 - KNIGHT.skills.seal.soak : 1));
        enter(k, 'hurt');
        fight.shake = Math.max(fight.shake, m.shake || 9);
        fight.events.push({ type: 'hit', on: 'knight', x: k.x, damage: m.damage });
      }
    }
  }

  // essence lying on the floor from a previous death
  // Picking your essence back up banks it immediately, win or lose. Without
  // that, a player who never beats the boss could never buy anything, and the
  // promise that dying makes you stronger would be a lie.
  if (fight.pickup && Math.abs(k.x - fight.pickup.x) < 46) {
    const amount = fight.pickup.amount;
    fight.banked += amount;
    fight.run.essence += amount;
    fight.events.push({ type: 'recover', amount });
    fight.pickup = null;
    fight.run.lost = null;
  }
}

const facingIt = (k, w) => (w.x - k.x) * k.facing >= 0;

/**
 * Close the attempt.
 *
 * Losing costs you the essence you were carrying, but only until the next
 * attempt: it waits on the floor where you fell. Nothing is ever destroyed by
 * dying, which is the point — the fight gets easier every time you lose it.
 */
export function endFight(fight) {
  const run = fight.run;
  run.attempts++;
  const pushedTo = 1 - fight.warden.hp / WARDEN.hp;
  run.best = Math.max(run.best, pushedTo);

  if (fight.over === 'won') {
    run.wins++;
    run.essence += fight.earned;
    run.lost = null;
  } else {
    run.lost = { x: Math.round(fight.knight.x), amount: fight.earned };
  }
  return { won: fight.over === 'won', earned: fight.earned, pushedTo };
}

export function buy(run, key) {
  const up = UPGRADES[key];
  const level = run.levels[key];
  if (!up || level >= up.max) return false;
  const price = up.cost(level);
  if (run.essence < price) return false;
  run.essence -= price;
  run.levels[key]++;
  return true;
}

export const priceOf = (run, key) =>
  run.levels[key] >= UPGRADES[key].max ? null : UPGRADES[key].cost(run.levels[key]);
