---
name: query-compilation-and-code-generation
description: How modern database engines execute queries faster than the classic row-at-a-time interpreter — the two execution models: vectorized (batch columns through operators) vs compiled (JIT-generate machine code for the specific query). Use to understand the interpretation overhead of the Volcano model, why vectorization amortizes it, how query compilation removes it, and the compile-time-vs-runtime trade.
category: databases
keywords_vi: biên dịch truy vấn và sinh mã code generation cho engine cơ sở dữ liệu, mô hình volcano diễn giải từng dòng tốn chi phí, thực thi vector hoá xử lý lô cột qua toán tử, biên dịch jit sinh mã máy riêng cho truy vấn, khử chi phí diễn giải trên mỗi dòng, đánh đổi thời gian biên dịch và thời gian chạy
---

# Query Compilation & Code Generation

The classic way a database runs a query — the **Volcano/iterator model** — calls `next()` down a tree of operators, pulling **one row at a time** through virtual function calls. It's elegant and composable, but for analytical queries over billions of rows the **interpretation overhead** dominates: per-row virtual calls, branch mispredictions, and poor CPU cache/pipeline use mean the CPU spends more time *deciding what to do* than *doing it*. Modern engines fix this two ways — **vectorized execution** and **query compilation** (see how-vectorized-query-execution-works, how-query-optimizers-work, ssa-form-and-compiler-optimization).

## Why the Row-at-a-Time Interpreter Is Slow

For each row, the iterator model does: a virtual `next()` call per operator, type dispatch, condition checks, and tuple deserialization. That's a lot of **overhead per row** relative to the actual work (add two numbers). At scale this overhead — not the arithmetic — is the bottleneck. The CPU's pipelines and caches, which love tight predictable loops over contiguous data, are starved.

## Approach 1: Vectorized Execution

Instead of one row at a time, push **batches** (vectors) of, say, 1024 values through each operator. A filter becomes a **tight loop over an array** of column values. This:
- **Amortizes** the per-call overhead over the whole batch (one dispatch per 1024 rows, not per row).
- Enables **SIMD** and great cache/branch behavior (columnar, contiguous data).
- Keeps the composable operator structure — easy to implement, no compiler needed at runtime.

Pioneered by MonetDB/X100, used by DuckDB, ClickHouse, Velox, Arrow. The pragmatic, robust default.

## Approach 2: Query Compilation (JIT Code Generation)

Go further: at runtime, **generate machine code specialized for this exact query** (e.g. emit LLVM IR / native code that fuses the operators into a tight loop with no interpretation at all). The filter-project-aggregate pipeline becomes a single compiled loop over the data, as if a programmer hand-wrote C for that one query. This removes interpretation overhead **entirely** and enables **operator fusion** (data stays in registers across operators). Pioneered by HyPer; used by Spark (whole-stage codegen), Postgres (JIT for expressions), Amazon Redshift.
- ✅ Fastest steady-state execution for complex/CPU-heavy queries.
- ❌ **Compilation latency** — generating and compiling code costs milliseconds; bad for tiny/short queries where compile time exceeds run time. Mitigations: cache compiled plans, or **adaptively** interpret first and compile only hot queries.

## Vectorized vs Compiled

They target the same enemy (interpretation overhead) differently — batch it away vs compile it away — and the gap between them is often small. Some systems **combine** both (compile vectorized primitives). The takeaway: fast analytical engines **don't** run the naive row-at-a-time interpreter.

## Design Guidance (for understanding/using)

- **Expect batch/columnar or compiled execution** in analytical engines — reason about performance in terms of tight loops over columns, not per-row work.
- **Feed them columnar data** (Parquet/Arrow) so vectorized/compiled operators get contiguous typed arrays.
- **Beware compile latency for tiny queries** — a JIT engine may be slower on trivial queries; systems cache/adaptively compile to cope.
- **Wide, CPU-heavy scans/aggregations** benefit most from these models; point lookups don't.
- **Don't fight the model** — UDFs/opaque expressions that can't vectorize or compile fall back to slow per-row interpretation.

## Pitfalls (in understanding/using)

- Assuming the DB runs a simple **row-at-a-time** loop → analytical engines vectorize/compile; your mental cost model is wrong otherwise.
- Opaque **UDFs / non-vectorizable expressions** → force per-row interpretation, defeating the fast path.
- Expecting JIT compilation to help **tiny** queries → compile time can exceed execution time.
- Feeding **row-oriented** data to a vectorized engine → misses SIMD/cache benefits; prefer columnar.
- Treating vectorized and compiled as opposites → many engines blend them; both beat naive interpretation.
