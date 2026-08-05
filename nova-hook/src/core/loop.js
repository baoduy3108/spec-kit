// Fixed-timestep game loop with a render pass on top.
// Fixed steps keep the swing physics identical on 60Hz and 144Hz screens.

const STEP = 1 / 120;
const MAX_STEPS = 8;

export class Loop {
  constructor({ update, render }) {
    this.update = update;
    this.render = render;
    this.acc = 0;
    this.last = 0;
    this.running = false;
    this.timeScale = 1;
    this._frame = this._frame.bind(this);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    requestAnimationFrame(this._frame);
  }

  stop() {
    this.running = false;
  }

  _frame(now) {
    if (!this.running) return;
    requestAnimationFrame(this._frame);
    // Clamp so a backgrounded tab doesn't fast-forward the whole run.
    const raw = Math.min((now - this.last) / 1000, 0.25);
    this.last = now;

    this.acc += raw * this.timeScale;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.update(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    this.render(raw);
  }
}

export { STEP };
