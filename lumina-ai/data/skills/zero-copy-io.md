---
name: zero-copy-io
description: Why sending a file over a socket the naive way copies the data four times, and how zero-copy (sendfile, splice, mmap) eliminates redundant copies and user/kernel crossings. Use to understand the copy/context-switch cost of read()+write(), how sendfile keeps data in the kernel, why Kafka/Nginx are fast, and DMA's role in true zero-copy.
category: systems-internals
keywords_vi: vào ra không sao chép zero-copy sendfile splice mmap, gửi tệp qua socket kiểu thường sao chép bốn lần, loại bỏ bản sao thừa và vượt biên user kernel, sendfile giữ dữ liệu trong kernel không lên user, kafka nginx nhanh nhờ zero-copy, dma chuyển thẳng không cần cpu sao chép
---

# Zero-Copy I/O

Serving a file over the network — a web server sending a static file, Kafka pushing a log segment to a consumer — seems trivial: `read()` the file, `write()` it to the socket. But that naive path copies the **same bytes four times** and crosses the user/kernel boundary four times, burning CPU and memory bandwidth on pure data shuffling. **Zero-copy** techniques eliminate the redundant copies, which is a big reason Nginx, Kafka, and CDNs move data so cheaply (see page-cache-and-memory-mapped-files, io-models-and-io-uring, context-switching-cost).

## The Naive Path: 4 Copies, 4 Context Switches

`read(file) → write(socket)`:
1. **DMA copy**: disk → kernel **page cache** (hardware, no CPU).
2. **CPU copy**: page cache → **user buffer** (your app's memory) — the `read()` returns here.
3. **CPU copy**: user buffer → kernel **socket buffer** — the `write()` starts here.
4. **DMA copy**: socket buffer → NIC (hardware).

Copies **2 and 3** are pure waste: the data goes kernel → user → kernel without the app even looking at it. Plus each syscall is a **user↔kernel context switch** (four of them). For a server doing this millions of times, those CPU copies and switches dominate.

## Zero-Copy: Keep Data in the Kernel

The fix: don't drag the data up into user space if you're just forwarding it.
- **`sendfile(out_socket, in_file)`** — tells the kernel to send file data straight to the socket. Data stays in the **kernel**: page cache → socket, no user-space copy. With modern NICs supporting **scatter-gather DMA**, even the page-cache→socket-buffer copy is skipped — the NIC DMAs directly from the page cache. That's **true zero-copy**: 2 DMA transfers, **zero CPU copies**, far fewer context switches.
- **`splice()` / `vmsplice()`** — move data between file descriptors via a kernel pipe without user-space copies (more general than sendfile).
- **`mmap()` + `write()`** — map the file so it's already in your address space (the page cache pages), avoiding the read copy; fewer copies than plain read/write, though not as clean as sendfile.

## Where It Matters

- **Kafka** famously uses `sendfile` to ship log segments from page cache to consumers — a core reason a broker can saturate a NIC with modest CPU.
- **Nginx / static file serving / video streaming / CDNs** — `sendfile` for cheap bulk delivery.
- Any **proxy** forwarding bytes it doesn't inspect.

## Design Guidance (for understanding/using)

- **Use `sendfile`/`splice`** (or your framework's zero-copy send) for **forwarding bytes you don't transform** — file→socket, socket→socket.
- **Zero-copy only helps if you don't touch the data** — TLS encryption, compression, or transformation forces the bytes through the CPU (though kernel TLS / offload can restore some of it).
- **Keep the file hot in page cache** — sendfile serves from cache; a cold file still pays the disk read.
- **Lean on it for throughput/CPU** — the win is CPU and memory-bandwidth, freeing cores for real work.
- **Frameworks expose it** — `FileChannel.transferTo` (Java NIO), `sendfile` in web servers; prefer these over manual read/write loops for static content.

## Pitfalls (in understanding/using)

- Doing `read()`+`write()` loops for large static files → 2 wasted CPU copies + extra context switches per chunk.
- Expecting zero-copy when you **transform** the data (encrypt/compress) → the CPU must see it; zero-copy doesn't apply (without kTLS/offload).
- Assuming sendfile avoids **disk** I/O → it avoids the **user-space copy**; a cold file still reads from disk.
- Ignoring that small files/transfers gain little → zero-copy shines on **bulk** data.
- Forgetting DMA does the device transfers → the "zero" refers to **CPU** copies, not hardware DMA.
