// A minimal RFC 6455 WebSocket server, in about two hundred lines and with no
// dependencies. Enough for a realtime game: text and binary frames,
// fragmentation, ping/pong keepalive, close handshake, and hard limits so a
// hostile client cannot make the server allocate whatever it likes.

import { createHash, randomBytes } from 'node:crypto';

const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

export const OP = {
  CONT: 0x0,
  TEXT: 0x1,
  BINARY: 0x2,
  CLOSE: 0x8,
  PING: 0x9,
  PONG: 0xa,
};

/** The handshake response value for a client's Sec-WebSocket-Key. */
export function acceptKey(key) {
  return createHash('sha1')
    .update(key + GUID)
    .digest('base64');
}

/**
 * Encode one frame. Server frames are never masked (RFC 6455 §5.1).
 * @param {number} opcode
 * @param {Buffer} payload
 */
export function encodeFrame(opcode, payload = Buffer.alloc(0), { mask = false } = {}) {
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  header[0] = 0x80 | opcode; // FIN + opcode

  if (!mask) return Buffer.concat([header, payload]);

  header[1] |= 0x80;
  const key = randomBytes(4);
  const masked = Buffer.from(payload);
  for (let i = 0; i < masked.length; i++) masked[i] ^= key[i % 4];
  return Buffer.concat([header, key, masked]);
}

/**
 * Pull as many complete frames as possible out of a buffer.
 * @returns {{frames: Array, rest: Buffer}}
 */
export function decodeFrames(buffer, maxPayload = 1 << 20) {
  const frames = [];
  let offset = 0;

  while (offset + 2 <= buffer.length) {
    const first = buffer[offset];
    const second = buffer[offset + 1];
    const fin = (first & 0x80) !== 0;
    const opcode = first & 0x0f;
    const masked = (second & 0x80) !== 0;
    let len = second & 0x7f;
    let cursor = offset + 2;

    if (len === 126) {
      if (cursor + 2 > buffer.length) break;
      len = buffer.readUInt16BE(cursor);
      cursor += 2;
    } else if (len === 127) {
      if (cursor + 8 > buffer.length) break;
      const big = buffer.readBigUInt64BE(cursor);
      if (big > BigInt(maxPayload)) throw new Error('frame too large');
      len = Number(big);
      cursor += 8;
    }
    if (len > maxPayload) throw new Error('frame too large');

    let key = null;
    if (masked) {
      if (cursor + 4 > buffer.length) break;
      key = buffer.subarray(cursor, cursor + 4);
      cursor += 4;
    }
    if (cursor + len > buffer.length) break;

    const payload = Buffer.from(buffer.subarray(cursor, cursor + len));
    if (key) for (let i = 0; i < payload.length; i++) payload[i] ^= key[i % 4];

    frames.push({ fin, opcode, payload });
    offset = cursor + len;
  }

  return { frames, rest: buffer.subarray(offset) };
}

/** One connected client. */
class Connection {
  constructor(socket, server) {
    this.socket = socket;
    this.server = server;
    this.open = true;
    this.alive = true;
    this.buffer = Buffer.alloc(0);
    this.fragments = [];
    this.fragmentOp = null;
    this.data = {}; // free space for the game to hang state off
  }

  send(text) {
    this.sendFrame(OP.TEXT, Buffer.from(text, 'utf8'));
  }

  sendBinary(buf) {
    this.sendFrame(OP.BINARY, Buffer.from(buf));
  }

  sendFrame(opcode, payload) {
    if (!this.open) return false;
    try {
      this.socket.write(encodeFrame(opcode, payload));
      return true;
    } catch (_) {
      this.destroy();
      return false;
    }
  }

  ping() {
    this.sendFrame(OP.PING, Buffer.alloc(0));
  }

  close(code = 1000, reason = '') {
    if (!this.open) return;
    const payload = Buffer.alloc(2 + Buffer.byteLength(reason));
    payload.writeUInt16BE(code, 0);
    payload.write(reason, 2);
    this.sendFrame(OP.CLOSE, payload);
    this.destroy();
  }

  destroy() {
    if (!this.open) return;
    this.open = false;
    try {
      this.socket.destroy();
    } catch (_) {
      /* already gone */
    }
    this.server._drop(this);
  }

  _feed(chunk) {
    this.buffer = this.buffer.length ? Buffer.concat([this.buffer, chunk]) : chunk;
    let result;
    try {
      result = decodeFrames(this.buffer, this.server.maxPayload);
    } catch (_) {
      return this.close(1009, 'too big');
    }
    this.buffer = result.rest;

    for (const frame of result.frames) {
      if (frame.opcode === OP.CLOSE) return this.destroy();
      if (frame.opcode === OP.PING) {
        this.sendFrame(OP.PONG, frame.payload);
        continue;
      }
      if (frame.opcode === OP.PONG) {
        this.alive = true;
        continue;
      }

      if (frame.opcode === OP.CONT) {
        this.fragments.push(frame.payload);
      } else {
        this.fragments = [frame.payload];
        this.fragmentOp = frame.opcode;
      }
      if (!frame.fin) continue;

      const payload = Buffer.concat(this.fragments);
      this.fragments = [];
      const op = this.fragmentOp;
      this.fragmentOp = null;
      try {
        this.server.onMessage(this, op === OP.TEXT ? payload.toString('utf8') : payload, op);
      } catch (err) {
        this.server.onError(err, this);
      }
    }
  }
}

export class WebSocketServer {
  /**
   * @param httpServer a node http.Server to attach to
   */
  constructor(httpServer, { maxPayload = 1 << 20, pingInterval = 20000 } = {}) {
    this.clients = new Set();
    this.maxPayload = maxPayload;
    this.onConnect = () => {};
    this.onMessage = () => {};
    this.onClose = () => {};
    this.onError = (err) => console.error('[ws]', err.message);

    httpServer.on('upgrade', (req, socket) => this._upgrade(req, socket));

    if (pingInterval > 0) {
      this.heartbeat = setInterval(() => {
        for (const c of this.clients) {
          if (!c.alive) {
            c.destroy();
            continue;
          }
          c.alive = false;
          c.ping();
        }
      }, pingInterval);
      this.heartbeat.unref?.();
    }
  }

  _upgrade(req, socket) {
    const key = req.headers['sec-websocket-key'];
    if (req.headers.upgrade?.toLowerCase() !== 'websocket' || !key) {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      return;
    }
    socket.setNoDelay(true);
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
        'Upgrade: websocket\r\n' +
        'Connection: Upgrade\r\n' +
        `Sec-WebSocket-Accept: ${acceptKey(key)}\r\n\r\n`,
    );

    const conn = new Connection(socket, this);
    this.clients.add(conn);
    socket.on('data', (chunk) => conn._feed(chunk));
    socket.on('close', () => conn.destroy());
    socket.on('error', () => conn.destroy());
    try {
      this.onConnect(conn, req);
    } catch (err) {
      this.onError(err, conn);
    }
  }

  _drop(conn) {
    if (this.clients.delete(conn)) {
      try {
        this.onClose(conn);
      } catch (err) {
        this.onError(err, conn);
      }
    }
  }

  broadcast(text) {
    for (const c of this.clients) c.send(text);
  }

  stop() {
    clearInterval(this.heartbeat);
    for (const c of [...this.clients]) c.destroy();
  }
}
