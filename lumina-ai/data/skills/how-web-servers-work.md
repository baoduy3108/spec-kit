---
name: how-web-servers-work
description: How a web server works from the socket up — listening/accepting TCP connections, parsing the HTTP request, the concurrency models (process/thread-per-connection, thread pool, event loop, async), keep-alive, and how a reverse proxy fronts application servers. Use to understand server performance, concurrency limits, and the request lifecycle.
category: engineering
keywords_vi: web server hoạt động thế nào, cơ chế server bên trong, socket lắng nghe, xử lý request http, event loop vs thread pool, reverse proxy, hiểu server sâu
---

# How Web Servers Work

At bottom, a web server is a loop around a socket: accept a connection, read a request, write a response.

## The Socket Loop

1. **Bind & listen** on a port; the OS queues incoming TCP connections.
2. **Accept** a connection (a new socket for that client).
3. **Read** bytes and **parse** the HTTP request (method, path, headers, body — delimited by `\r\n`; body length from `Content-Length` or chunked encoding).
4. **Route** to a handler, produce a response, **write** it back (status line, headers, body).
5. **Keep-alive** — reuse the connection for more requests (avoids repeating the TCP+TLS handshake) or close it.

## Concurrency Models (the real design choice)

Handling many clients at once is the whole game:
- **Process/thread per connection** — simple; each client gets its own thread. Memory and context-switch cost limits you to thousands; a blocking call only blocks that thread. (Classic Apache prefork.)
- **Thread pool** — a bounded set of workers pulls connections from a queue; caps resource use, but a pool-full of slow/blocking requests stalls everyone.
- **Event loop (async, non-blocking I/O)** — a single thread multiplexes thousands of connections with `epoll`/`kqueue`, doing other work while any one waits on I/O. Extremely high concurrency for I/O-bound work (nginx, Node.js) — but a CPU-bound or blocking call freezes the whole loop.
- **Async/await + worker threads** — combine an event loop for I/O with a pool for CPU work.

The right model follows the workload: **I/O-bound → event loop**; **CPU-bound → threads/processes across cores**. This is why a single blocking DB call can tank an async server, and why "how many concurrent requests" depends entirely on the model.

## Reverse Proxy in Front

Production usually puts a reverse proxy (nginx/Envoy) before app servers to terminate TLS, serve static files, load-balance across app instances, buffer slow clients, apply rate limits, and add caching — letting the app servers focus on dynamic work. Understanding this explains where TLS, gzip, timeouts, and load balancing actually happen.
