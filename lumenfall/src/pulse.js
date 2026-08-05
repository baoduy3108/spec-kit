// The play layer of the fifth game.
//
// None of the four originals' *controls* survive here — only their cores:
//
//   from the arcade game : the value of one moment of commitment
//   from the puzzle game : arranging a static thing so energy flows well
//   from the idle game   : what you built keeps working without you
//   from the shared game : it fades for everyone, all the time
//
// So: a pulse walks the beam you routed. When it reaches a node a ring closes
// around it, and a single tap inside the window catches it. One finger, no
// dexterity, no reaction test — a beat, not a reflex.

import { DX, DY, KIND, N, bounce, idx, inside } from './puzzle.js';
import { clamp } from './core.js';

export const PULSE = {
  /** Cells per second the pulse travels. Slow enough to read. */
  speed: 5.5,
  /** Seconds the ring takes to close at a node. */
  window: 0.9,
  /** Fraction of the ring that counts as a catch. Generous on purpose. */
  sweet: 0.3,
  /** Charge a caught pulse pours into the node. */
  gain: 0.14,
  /** ...and what an uncaught one leaves behind anyway. */
  graze: 0.03,
  comboStep: 0.18,
  comboCap: 3,
  /** Seconds between pulses leaving the source. */
  every: 1.6,
};

/**
 * The ordered cells a pulse walks. At a splitter it takes the reflected
 * branch — one pulse, one readable line, rather than a fireworks display.
 */
export function beamPath(grid, emitter) {
  const path = [];
  let { x, y, dir } = emitter;
  const seen = new Set();

  for (let steps = 0; steps < N * N * 4; steps++) {
    const nx = x + DX[dir];
    const ny = y + DY[dir];
    if (!inside(nx, ny)) break;
    const key = `${nx},${ny},${dir}`;
    if (seen.has(key)) break; // a loop: the pulse has been here going this way
    seen.add(key);

    x = nx;
    y = ny;
    const cell = grid[idx(x, y)];
    path.push({ x, y, kind: cell.kind });

    const outs = bounce(cell.kind, cell.rot, dir);
    if (!outs.length) break;
    dir = outs[0];
  }
  return path;
}

/** The nodes on a path, with the step index the pulse reaches them at. */
export function nodesOn(path) {
  const nodes = [];
  path.forEach((cell, i) => {
    if (cell.kind === KIND.LANTERN) nodes.push({ at: i, x: cell.x, y: cell.y });
  });
  return nodes;
}

export function newBoardRun(board) {
  const path = beamPath(board.grid, board.emitter);
  return {
    board,
    path,
    nodes: nodesOn(path),
    /** Pulses in flight along the path. */
    pulses: [],
    time: 0,
    sinceEmit: PULSE.every,
    combo: 0,
    bestCombo: 0,
    caught: 0,
    missed: 0,
    poured: 0,
    events: [],
    taps: [],
  };
}

/** Re-walk the beam after the player rotates a mirror. */
export function rerouted(run) {
  run.path = beamPath(run.board.grid, run.board.emitter);
  run.nodes = nodesOn(run.path);
  run.pulses.length = 0;
  return run;
}

/**
 * @param dt seconds
 * @param tapped true on the frame the player tapped
 */
export function stepBoard(run, dt, tapped) {
  run.events.length = 0;
  run.time += dt;

  run.sinceEmit += dt;
  // Never send a second pulse while one is still waiting to be caught: one
  // finger cannot answer two rings, and losing a pulse you never had a chance
  // at is the kind of unfairness that makes people put a game down.
  const waiting = run.pulses.some((p) => p.waiting);
  if (!waiting && run.sinceEmit >= PULSE.every && run.path.length) {
    run.sinceEmit = 0;
    run.pulses.push({ pos: 0, waiting: null, ring: 0, strength: 1 });
    run.events.push({ type: 'emit' });
  }

  for (let i = run.pulses.length - 1; i >= 0; i--) {
    const p = run.pulses[i];

    if (p.waiting !== null) {
      // Sitting on a node with the ring closing.
      p.ring += dt / PULSE.window;
      const inWindow = p.ring >= 1 - PULSE.sweet && p.ring <= 1;
      if (tapped) {
        resolve(run, p, inWindow);
        tapped = false; // one tap, one pulse
      } else if (p.ring > 1) {
        resolve(run, p, false);
      }
      continue;
    }

    p.pos += PULSE.speed * dt;
    const step = Math.floor(p.pos);
    const node = run.nodes.find((n) => n.at === step);
    if (node && !p.done) {
      p.waiting = node;
      p.ring = 0;
      p.pos = step;
      run.events.push({ type: 'arrive', node });
    } else if (p.pos >= run.path.length) {
      run.pulses.splice(i, 1);
      run.events.push({ type: 'spent' });
    }
  }
  return run.events;
}

function resolve(run, pulse, caught) {
  const node = pulse.waiting;
  const cell = run.board.grid[idx(node.x, node.y)];

  if (caught) {
    run.combo++;
    run.bestCombo = Math.max(run.bestCombo, run.combo);
    run.caught++;
    const mult = Math.min(PULSE.comboCap, 1 + run.combo * PULSE.comboStep);
    const gain = PULSE.gain * mult * pulse.strength;
    cell.charge = (cell.charge || 0) + gain;
    run.poured += gain;
    pulse.strength = Math.min(3, pulse.strength * 1.15);
    run.events.push({ type: 'catch', node, gain, combo: run.combo, x: node.x, y: node.y });
  } else {
    run.combo = 0;
    run.missed++;
    cell.charge = (cell.charge || 0) + PULSE.graze;
    run.poured += PULSE.graze;
    run.events.push({ type: 'miss', node, x: node.x, y: node.y });
  }

  pulse.waiting = null;
  pulse.ring = 0;
  pulse.pos += 0.001;
}

/** Where a pulse is on screen, in grid coordinates. */
export function pulseAt(run, pulse) {
  if (pulse.waiting) return { x: pulse.waiting.x, y: pulse.waiting.y };
  const i = Math.floor(pulse.pos);
  const f = pulse.pos - i;
  const a = run.path[clamp(i, 0, run.path.length - 1)];
  const b = run.path[clamp(i + 1, 0, run.path.length - 1)];
  if (!a) return { x: 0, y: 0 };
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

/** How good the current routing is: nodes the beam actually reaches. */
export function routeScore(run) {
  return run.nodes.length;
}
