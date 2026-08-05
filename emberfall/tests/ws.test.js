// The WebSocket layer is hand-rolled, so it gets tested against a real client
// (node 22 ships one) and against the RFC's own worked examples.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

import { OP, WebSocketServer, acceptKey, decodeFrames, encodeFrame } from '../server/ws.js';

test('the handshake matches the example in RFC 6455', () => {
  // §1.3: key dGhlIHNhbXBsZSBub25jZQ== must accept as s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
  assert.equal(acceptKey('dGhlIHNhbXBsZSBub25jZQ=='), 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
});

test('frames round trip at every length boundary', () => {
  for (const size of [0, 1, 125, 126, 127, 65535, 65536, 70000]) {
    const payload = Buffer.alloc(size, 0x61);
    const framed = encodeFrame(OP.BINARY, payload);
    const { frames, rest } = decodeFrames(framed, 1 << 21);
    assert.equal(rest.length, 0, `size ${size} left a remainder`);
    assert.equal(frames.length, 1);
    assert.equal(frames[0].opcode, OP.BINARY);
    assert.equal(frames[0].payload.length, size);
    assert.ok(frames[0].payload.equals(payload));
  }
});

test('masked client frames are unmasked correctly', () => {
  const payload = Buffer.from('hello mask', 'utf8');
  const framed = encodeFrame(OP.TEXT, payload, { mask: true });
  assert.ok((framed[1] & 0x80) !== 0, 'the mask bit must be set');
  const { frames } = decodeFrames(framed);
  assert.equal(frames[0].payload.toString(), 'hello mask');
});

test('server frames are never masked', () => {
  const framed = encodeFrame(OP.TEXT, Buffer.from('x'));
  assert.equal(framed[1] & 0x80, 0);
});

test('a frame split across TCP chunks is buffered until complete', () => {
  const payload = Buffer.from('a'.repeat(500));
  const framed = encodeFrame(OP.TEXT, payload);
  let carry = Buffer.alloc(0);
  const collected = [];
  for (let i = 0; i < framed.length; i += 7) {
    carry = Buffer.concat([carry, framed.subarray(i, i + 7)]);
    const { frames, rest } = decodeFrames(carry);
    collected.push(...frames);
    carry = rest;
  }
  assert.equal(collected.length, 1);
  assert.equal(collected[0].payload.length, 500);
});

test('several frames in one chunk all come out', () => {
  const chunk = Buffer.concat([
    encodeFrame(OP.TEXT, Buffer.from('one')),
    encodeFrame(OP.TEXT, Buffer.from('two')),
    encodeFrame(OP.PING, Buffer.alloc(0)),
  ]);
  const { frames, rest } = decodeFrames(chunk);
  assert.equal(frames.length, 3);
  assert.equal(rest.length, 0);
  assert.equal(frames[1].payload.toString(), 'two');
  assert.equal(frames[2].opcode, OP.PING);
});

test('an oversized frame is refused rather than allocated', () => {
  const header = Buffer.alloc(10);
  header[0] = 0x82;
  header[1] = 127;
  header.writeBigUInt64BE(BigInt(1 << 30), 2);
  assert.throws(() => decodeFrames(header, 1 << 20), /too large/);
});

// --- end to end over a real socket ---------------------------------------

function listen(server) {
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
}

async function withServer(fn) {
  const http = createServer((_, res) => res.end('ok'));
  const wss = new WebSocketServer(http, { pingInterval: 0 });
  const port = await listen(http);
  try {
    await fn(wss, port);
  } finally {
    wss.stop();
    http.close();
  }
}

function connect(port) {
  const socket = new WebSocket(`ws://127.0.0.1:${port}`);
  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => resolve(socket));
    socket.addEventListener('error', reject);
  });
}

function nextMessage(socket) {
  return new Promise((resolve) => {
    socket.addEventListener('message', (ev) => resolve(ev.data), { once: true });
  });
}

test('a browser-grade client can connect, talk and be answered', async () => {
  await withServer(async (wss, port) => {
    const seen = [];
    wss.onConnect = (conn) => conn.send('welcome');
    wss.onMessage = (conn, message) => {
      seen.push(message);
      conn.send(`echo:${message}`);
    };

    const client = await connect(port);
    assert.equal(await nextMessage(client), 'welcome');
    client.send('hello');
    assert.equal(await nextMessage(client), 'echo:hello');
    assert.deepEqual(seen, ['hello']);
    client.close();
  });
});

test('many clients are served at once and cleaned up on close', async () => {
  await withServer(async (wss, port) => {
    wss.onMessage = (conn, message) => conn.send(message.toUpperCase());
    const clients = await Promise.all(Array.from({ length: 24 }, () => connect(port)));
    assert.equal(wss.clients.size, 24);

    const replies = await Promise.all(
      clients.map((c, i) => {
        const p = nextMessage(c);
        c.send(`client-${i}`);
        return p;
      }),
    );
    replies.forEach((r, i) => assert.equal(r, `CLIENT-${i}`));

    let closed = 0;
    wss.onClose = () => closed++;
    for (const c of clients) c.close();
    await new Promise((r) => setTimeout(r, 250));
    assert.equal(wss.clients.size, 0);
    assert.equal(closed, 24);
  });
});

test('a broadcast reaches everyone', async () => {
  await withServer(async (wss, port) => {
    const clients = await Promise.all([connect(port), connect(port), connect(port)]);
    const waits = clients.map((c) => nextMessage(c));
    wss.broadcast('tick');
    const all = await Promise.all(waits);
    assert.deepEqual(all, ['tick', 'tick', 'tick']);
    for (const c of clients) c.close();
  });
});

test('a large message survives the round trip', async () => {
  await withServer(async (wss, port) => {
    wss.onMessage = (conn, message) => conn.send(String(message.length));
    const client = await connect(port);
    const big = 'x'.repeat(200000);
    const wait = nextMessage(client);
    client.send(big);
    assert.equal(await wait, '200000');
    client.close();
  });
});
