// One-thumb input: press anywhere to hook, let go to release.
// Mouse, touch, pen and keyboard all collapse into the same two signals.

export class Input {
  constructor(target = window) {
    this.held = false;
    this.pressed = false; // consumed once per frame
    this.released = false;
    this._onFirst = null;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      this._press();
    };
    const up = () => this._release();

    target.addEventListener('pointerdown', down, { passive: true });
    // Up/cancel go on the window so releasing off-canvas still counts.
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    window.addEventListener('blur', up);
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        this._press();
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') this._release();
    });

    this._down = down;
    this._up = up;
  }

  /** Runs once, on the very first interaction — used to unlock WebAudio. */
  onFirstInteraction(fn) {
    this._onFirst = fn;
  }

  _press() {
    if (this._onFirst) {
      const fn = this._onFirst;
      this._onFirst = null;
      try {
        fn();
      } catch (_) {
        /* audio unlock is best-effort */
      }
    }
    if (!this.held) this.pressed = true;
    this.held = true;
  }

  _release() {
    if (this.held) this.released = true;
    this.held = false;
  }

  /** Call at the end of each simulation step. */
  clear() {
    this.pressed = false;
    this.released = false;
  }

  reset() {
    this.held = false;
    this.pressed = false;
    this.released = false;
  }
}
