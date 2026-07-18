---
name: how-mapreduce-works
description: How MapReduce works — the programming model for processing huge datasets across a cluster via map (transform in parallel), shuffle (group by key), and reduce (aggregate), plus data locality, fault tolerance, and how it evolved into Spark. Use to understand MapReduce, distributed batch processing, the map/shuffle/reduce model, or big-data frameworks.
category: engineering
keywords_vi: mapreduce hoạt động thế nào, xử lý dữ liệu lớn phân tán, map shuffle reduce, gom nhóm theo key, data locality, chịu lỗi fault tolerance, spark big data
---

# How MapReduce Works

MapReduce is a programming model for processing datasets too big for one machine, by spreading the work across a cluster. It made "big data" tractable for ordinary engineers by hiding the hard parts (parallelism, distribution, fault tolerance) behind two functions you write: **map** and **reduce**.

## The Model — Map, Shuffle, Reduce

Classic example: count word frequencies across billions of documents.
1. **Map** — each worker processes a **chunk** of input in parallel, emitting **key→value** pairs. For word count: for each word, emit `(word, 1)`. Maps are independent → embarrassingly parallel.
2. **Shuffle** — the framework **groups all values by key** and routes each key's values to a single reducer (all `(word, 1)` for "the" go to one place). This is the network-heavy, framework-managed step you don't write.
3. **Reduce** — each reducer receives a key and all its values, and **aggregates**: sum the 1's → `(word, total)`. Reducers for different keys run in parallel too.

You write only the map and reduce logic; the framework handles splitting input, scheduling, shuffling, retries, and collecting output.

## Data Locality (the key performance idea)

Moving petabytes over the network is the bottleneck. MapReduce **moves the computation to the data**: it schedules map tasks on the machines that already **store** the input chunks (on a distributed filesystem like HDFS). Reading local disk beats pulling data across the network — "ship code, not data."

## Fault Tolerance

In a big cluster, machines fail routinely. MapReduce handles it transparently:
- The master tracks each task; if a worker dies or stalls, its task is **re-run** elsewhere (map/reduce functions are deterministic and idempotent over their input, so re-running is safe).
- Slow workers ("stragglers") get **speculative** duplicate tasks; whichever finishes first wins.
Intermediate results are written to disk so a failed reducer can restart from map outputs. This is why it scales to thousands of commodity (unreliable) machines.

## Strengths, Limits, and Evolution

- **Great for:** large-scale **batch** processing (ETL, aggregations, log analysis, index building) that fits the map→group→reduce shape.
- **Weak for:** iterative algorithms (ML) and interactive queries — writing intermediate data to disk each stage is slow. **Apache Spark** improved on this by keeping data **in memory** across stages (RDDs/DAG of transformations), often 10–100× faster for iterative work, while keeping the same "parallel transform + shuffle + aggregate" essence. Higher-level tools (SQL engines, dataflow) now hide MapReduce entirely, but the model still shapes how distributed data processing works.

## Pitfalls (in understanding/using)

- Forcing problems that aren't naturally map/reduce-shaped into it (awkward, slow).
- **Skewed keys** — one key with most of the data overloads a single reducer (the whole job waits on it); mitigate with combiners/salting.
- Ignoring the **shuffle** cost — it's the expensive, network-bound step; reduce data before shuffling (use a combiner to pre-aggregate).
- Using batch MapReduce for **low-latency/streaming** needs (use stream processing instead, see stream-processing).
- Non-deterministic map/reduce functions breaking fault-tolerant re-execution.
