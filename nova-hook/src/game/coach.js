// First-time user experience.
//
// No tutorial level, no modal, no "tap to continue". The coach rides along
// with a real run and does two things: it puts one short line of text on the
// screen, and it slows the world down at the exact moments a new player needs
// more time — before their first hook, and while their first swing is
// approaching the release window.
//
// Pure logic: `update()` takes the world and returns a time scale, so the
// whole flow is testable without a browser.

import { SWEET_HALF } from './config.js';
import { angleDiff } from '../core/mathx.js';

/** Hazards and frail anchors are suppressed below this altitude on run one. */
export const TUTORIAL_SAFE_UNTIL = 2600;

const STEPS = [
  {
    id: 'hold',
    text: () => 'HOLD anywhere to throw your hook',
    // The world crawls until the hook lands, so the first press cannot be
    // "too late". Normal speed resumes the instant they are attached.
    scale: (world) => (world.tether ? 1 : 0.34),
    done: (c) => c.hooks > 0,
  },
  {
    id: 'release',
    text: () => 'LET GO inside the green arc',
    scale: (world) => {
      if (!world.tether) return 1;
      const info = world.sweetInfo();
      if (!info) return 1;
      const off = Math.abs(angleDiff(world.tether.angle, info.angle));
      // Bullet time as the swing sweeps towards the window.
      return off < SWEET_HALF * 2.6 ? 0.42 : 0.8;
    },
    done: (c) => c.releases > 0,
  },
  {
    id: 'aim',
    text: (c) =>
      c.perfects > 0
        ? 'PERFECT — a clean release aims you at the next ring'
        : 'Missed it — the green arc points at the next ring',
    done: (c, t) => t > 3.2,
  },
  {
    id: 'chain',
    text: () => 'Chain perfects: the multiplier is your score',
    done: (c, t) => t > 3.4 || c.combo >= 4,
  },
  {
    id: 'nova',
    text: () => 'Fill the bar for NOVA SURGE — nothing can touch you',
    done: (c, t) => t > 3.6 || c.novas > 0,
  },
  {
    id: 'void',
    text: () => 'Never stop climbing. The void is right behind you.',
    done: (c, t) => t > 3.4,
  },
];

export class Coach {
  constructor() {
    this.reset();
  }

  reset() {
    this.active = false;
    this.step = 0;
    this.timer = 0;
    this.text = '';
    this.counts = { hooks: 0, releases: 0, perfects: 0, novas: 0, combo: 0 };
  }

  start() {
    this.reset();
    this.active = true;
    this.text = STEPS[0].text(this.counts);
  }

  /** Feed it the same events the juice layer gets. */
  onEvent(type, e) {
    if (!this.active) return;
    const c = this.counts;
    if (type === 'hook') c.hooks++;
    else if (type === 'perfect') {
      c.perfects++;
      c.releases++;
      c.combo = Math.max(c.combo, e && e.combo ? e.combo : 0);
    } else if (type === 'release' || type === 'snap') c.releases++;
    else if (type === 'nova') c.novas++;
  }

  /**
   * @param dt real (unscaled) seconds
   * @returns the time scale the world should run at
   */
  update(world, dt) {
    if (!this.active) return 1;
    let step = STEPS[this.step];
    if (!step) {
      this.finish();
      return 1;
    }
    this.timer += dt;

    // Advance first, so the new line is on screen the same frame the old
    // step is satisfied — a one-frame stale prompt reads as lag.
    if (step.done(this.counts, this.timer)) {
      this.step++;
      this.timer = 0;
      step = STEPS[this.step];
      if (!step) {
        this.finish();
        return 1;
      }
    }
    this.text = step.text(this.counts);
    return step.scale ? step.scale(world, this.counts) : 1;
  }

  finish() {
    this.active = false;
    this.text = '';
  }

  /** True while the very first "press something" prompt is up. */
  get emphasising() {
    return this.active && STEPS[this.step] && STEPS[this.step].id === 'hold';
  }
}

export { STEPS as COACH_STEPS };
