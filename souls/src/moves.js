// The Warden's moveset.
//
// Every attack is three parts: a wind-up you can read, a moment where it
// actually hurts, and a recovery where it cannot. That third part is the
// whole game — a souls fight is not about surviving the swing, it is about
// knowing what you are allowed to do afterwards.
//
// Wind-ups are long and the danger zone is drawn on the ground during them.
// Plenty of games in this genre hide that. This one does not: the difficulty
// should come from acting on what you can see, not from memorising what you
// could not.

export const MOVES = {
  /** A wide horizontal sweep. Fast, tempting to trade with, don't. */
  sweep: {
    id: 'sweep',
    windup: 0.62,
    active: 0.14,
    recover: 0.52,
    reach: [26, 168],
    damage: 15,
    /** How far the boss slides while swinging. */
    step: 60,
    colour: 'warn',
  },
  /** Both hands overhead. The longest tell and the biggest punish window. */
  slam: {
    id: 'slam',
    windup: 1.0,
    active: 0.1,
    recover: 0.9,
    reach: [10, 132],
    damage: 30,
    step: 24,
    shake: 16,
    colour: 'heavy',
  },
  /** Crosses the arena. The answer is to roll *through* it, not away. */
  lunge: {
    id: 'lunge',
    windup: 0.72,
    active: 0.34,
    recover: 0.72,
    reach: [0, 116],
    damage: 22,
    step: 430,
    colour: 'warn',
  },
  /** Phase two: drops the lantern and the floor burns for a moment. */
  ember: {
    id: 'ember',
    windup: 0.85,
    active: 0.5,
    recover: 0.62,
    reach: [-210, 210],
    damage: 20,
    step: 0,
    phase: 2,
    colour: 'fire',
  },
  /** Phase two: punishes standing behind it. Short tell, short reach. */
  backhand: {
    id: 'backhand',
    windup: 0.4,
    active: 0.12,
    recover: 0.44,
    reach: [-160, -18],
    damage: 17,
    step: 0,
    phase: 2,
    colour: 'warn',
  },
};

export const totalOf = (move) => move.windup + move.active + move.recover;

/**
 * Which move, given how far away you are. Distance decides, not dice — so the
 * fight can be learned. The only randomness picks between moves that are all
 * sensible at that range, and a move cannot come out twice in a row.
 */
export function chooseMove(distance, phase, lastId, roll) {
  const pool = [];
  if (distance > 235) pool.push('lunge', 'lunge', 'sweep');
  else if (distance > 130) pool.push('sweep', 'lunge');
  else pool.push('slam', 'sweep', 'sweep');

  if (phase >= 2) {
    if (distance > 150) pool.push('ember');
    else pool.push('backhand', 'ember');
  }

  const fresh = pool.filter((id) => id !== lastId);
  const list = fresh.length ? fresh : pool;
  return MOVES[list[Math.floor(roll * list.length) % list.length]];
}

/**
 * The window a hit lands in, in world units relative to the attacker, already
 * flipped for facing. Used both to resolve hits and to draw the warning, so
 * what you see on the ground is exactly what will hurt you.
 */
export function hitSpan(x, facing, reach) {
  const a = x + facing * reach[0];
  const b = x + facing * reach[1];
  return a < b ? [a, b] : [b, a];
}
