// The network half of the client: one socket, a snapshot buffer, and the
// reconciliation that lets your own ember move at 60fps while the server is
// only telling you the truth ten times a second.

/** Render everyone else this far behind the newest snapshot, in ms. */
export const INTERP_DELAY = 120;

export class Net {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.id = null;
    this.name = '';
    this.connected = false;
    this.joined = false;
    this.beacons = [];
    this.world = { w: 4000, h: 4000, regions: 16 };
    /** Snapshots kept for interpolation, oldest first. */
    this.buffer = [];
    this.latest = null;
    this.seq = 0;
    this.pending = [];
    this.rtt = 0;
    this.onEvent = () => {};
    this.onStatus = () => {};
  }

  connect() {
    this.onStatus('connecting…');
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      this.connected = true;
      this.onStatus('connected');
    });
    this.socket.addEventListener('close', () => {
      this.connected = false;
      this.joined = false;
      this.onStatus('disconnected — reconnecting');
      setTimeout(() => this.connect(), 1500);
    });
    this.socket.addEventListener('error', () => this.onStatus('connection trouble'));
    this.socket.addEventListener('message', (ev) => this._receive(ev.data));
  }

  join(name) {
    this.name = name;
    this._send({ t: 'join', name });
  }

  _send(obj) {
    if (this.socket && this.socket.readyState === 1) this.socket.send(JSON.stringify(obj));
  }

  /** Push an input and remember it so it can be replayed after a correction. */
  sendInput(dx, dy, dt) {
    this.seq++;
    this.pending.push({ seq: this.seq, dx, dy, dt });
    if (this.pending.length > 200) this.pending.shift();
    this._send({ t: 'in', dx, dy, seq: this.seq });
  }

  _receive(raw) {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch (_) {
      return;
    }

    if (msg.t === 'hello') {
      this.world = msg.world;
      return;
    }
    if (msg.t === 'joined') {
      this.id = msg.id;
      this.name = msg.name;
      this.beacons = msg.beacons;
      this.joined = true;
      this.onStatus('in the world');
      this.onEvent({ type: 'joined', night: msg.night });
      return;
    }
    if (msg.t === 'dawn') {
      this.onEvent({ type: 'dawn', night: msg.night, board: msg.board });
      return;
    }
    if (msg.t === 's') {
      msg.received = performance.now();
      this.latest = msg;
      this.buffer.push(msg);
      while (this.buffer.length > 24) this.buffer.shift();
      // Inputs the server has already accounted for are no longer pending.
      this.pending = this.pending.filter((p) => p.seq > msg.seq);
      for (const e of msg.events || []) this.onEvent(e);
    }
  }

  /**
   * Two snapshots to interpolate between, and how far between them we are.
   * Returns null until there is enough history.
   */
  interpolated(now = performance.now()) {
    const target = now - INTERP_DELAY;
    if (this.buffer.length < 2) return null;
    for (let i = this.buffer.length - 1; i > 0; i--) {
      const b = this.buffer[i];
      const a = this.buffer[i - 1];
      if (a.received <= target && target <= b.received) {
        const span = b.received - a.received || 1;
        return { a, b, t: (target - a.received) / span };
      }
    }
    const last = this.buffer[this.buffer.length - 1];
    return { a: last, b: last, t: 0 };
  }
}

/** Linear blend of two entity lists keyed by id, for smooth movement. */
export function blendEntities(a, b, t, key = 0) {
  const out = [];
  const byId = new Map();
  for (const e of b) byId.set(e[key], e);
  for (const prev of a) {
    const next = byId.get(prev[key]);
    if (!next) continue;
    byId.delete(prev[key]);
    out.push([
      prev[0],
      prev[1] + (next[1] - prev[1]) * t,
      prev[2] + (next[2] - prev[2]) * t,
      next[3],
      next[4],
      next[5],
    ]);
  }
  // Entities that only exist in the newer snapshot pop in where they are.
  for (const next of byId.values()) out.push(next.slice());
  return out;
}
