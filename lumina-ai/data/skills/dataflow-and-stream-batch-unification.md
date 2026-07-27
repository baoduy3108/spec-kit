---
name: dataflow-and-stream-batch-unification
description: Why "batch" and "streaming" are the same computation over different completeness — the Dataflow model — and the architectures that unify them: Lambda (batch + speed layers) vs Kappa (one streaming pipeline that reprocesses by replay). Use to decide between Lambda and Kappa, understand batch as a special case of streaming (bounded data), and avoid maintaining two copies of the same logic.
category: data-engineering
keywords_vi: mô hình dataflow batch và streaming là cùng một phép tính, batch là trường hợp đặc biệt dữ liệu hữu hạn bounded của streaming, kiến trúc lambda gồm lớp batch và lớp tốc độ, kiến trúc kappa một pipeline streaming tái xử lý bằng replay, tránh duy trì hai bản logic trùng nhau, tái xử lý lịch sử reprocessing
---

# Dataflow & Stream/Batch Unification

For years "batch" (process a finite dataset, e.g. nightly) and "streaming" (process events as they arrive) were separate worlds with separate tools, separate code, and separate teams. The **Dataflow model** (Google, → Apache Beam) reframed them: **batch is just streaming over *bounded* data**. The same operators — windowing, aggregation, joins — apply; the only difference is whether the input is **bounded** (a finite dataset, "the stream ends") or **unbounded** (never ends). This unification is the key mental shift (see event-time-and-watermarks, windowing-in-stream-processing, stream-processing).

## Batch as a Special Case of Streaming

Once you have **event-time + windows + watermarks + triggers**, a batch job is a streaming job where:
- the input is **bounded** (all data is available), so
- the watermark can jump straight to "+∞" (everything is present), and
- windows fire once, completely, with no late data.

So you write the logic **once** in a streaming model and run it over bounded or unbounded input. That's the promise: **one pipeline, no duplicated logic**.

## The Two Classic Architectures

Before unification (and still, in practice), teams combined batch and streaming two ways:

**Lambda architecture** — run **both**:
- a **batch layer** recomputes accurate results over all historical data (slow, correct, reprocessable);
- a **speed layer** streams recent data for low-latency (approximate) results;
- a **serving layer** merges them.
- ✅ Accurate *and* fast; batch can fix streaming's approximations.
- ❌ You maintain **two implementations of the same logic** in two systems — double the code, double the bugs, hard to keep consistent.

**Kappa architecture** — run **one** streaming pipeline:
- treat *everything* as a stream; the log (e.g. Kafka) retains history;
- to fix a bug or change logic, **replay** the log from the beginning through a new version of the streaming job, then swap.
- ✅ **One** codebase, one system; reprocessing = replay.
- ❌ Needs durable, replayable logs and enough retention; large reprocessing can be expensive; some heavy historical joins are still easier in batch.

## Choosing

- **Kappa** when your streaming framework is expressive enough to also do your "batch" work and you can retain/replay the log — the modern default, avoids dual logic.
- **Lambda** when you have a large legacy batch estate, need heavy historical computations impractical to stream, or must reconcile an approximate fast path with an authoritative slow path.
- **Unified engine (Beam/Flink)** — increasingly you get Kappa's single-codebase benefit with the option to run the same pipeline in batch or streaming mode.

## Design Guidance (for understanding/using)

- **Write the logic once** in an event-time streaming model; run it bounded (batch) or unbounded (stream).
- **Prefer Kappa** to avoid two divergent implementations — the biggest hidden cost of Lambda is drift between the layers.
- **Ensure replayability** for Kappa — durable log + enough retention + deterministic (event-time) processing so reprocessing reproduces results.
- **Keep event-time discipline** — unification only works if you process by event-time, not processing-time.

## Pitfalls (in understanding/using)

- Maintaining **two copies** of business logic (Lambda) that silently diverge → inconsistent batch vs streaming numbers.
- Choosing Kappa without **replayable, retained** logs → you can't reprocess/fix history.
- Using **processing-time** → batch and streaming give different results; unification breaks.
- Assuming streaming can trivially replace all batch → some large historical joins/backfills are still cheaper in batch.
- Forgetting reprocessing **cost/latency** — replaying months of data isn't instant.
