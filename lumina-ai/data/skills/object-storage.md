---
name: object-storage
description: How object storage (S3-style) works — storing files as objects with metadata in a flat namespace of buckets/keys accessed via HTTP API, why it differs from file/block storage, durability and eventual consistency, presigned URLs, and when to use it. Use to understand object storage, S3, blob storage, storing files/uploads at scale, or object vs file vs block storage.
category: engineering
keywords_vi: object storage, lưu trữ đối tượng s3, blob storage, bucket key flat namespace, http api, độ bền durability, presigned url, object vs file vs block storage
---

# Object Storage

Object storage (Amazon S3, Google Cloud Storage, Azure Blob, MinIO) is the standard way to store large amounts of unstructured data — images, videos, uploads, backups, logs, static assets — at massive scale and low cost. It's a fundamentally different model from a filesystem.

## The Model: Objects in Buckets

Instead of a hierarchical filesystem (see how-filesystems-work), object storage has a **flat namespace**:
- Data is stored as **objects** — the file's bytes **plus metadata** (content type, size, custom tags) **plus a unique key**.
- Objects live in **buckets** (containers).
- You access objects by their **key** via an **HTTP API** (GET/PUT/DELETE) — not a mounted filesystem path.
The "folders" you see (`photos/2024/img.jpg`) are just **key prefixes**, not real directories — the namespace is flat. This simplicity is what lets it scale essentially without limit.

## Object vs File vs Block Storage

- **Block storage** (disks, EBS) — raw blocks, low-level, attached to one machine; you put a filesystem on it. For databases, OS disks.
- **File storage** (NFS, a filesystem) — hierarchical directories, shared, POSIX semantics. For shared file access.
- **Object storage** — flat, HTTP-accessed, metadata-rich, massively scalable, but **not** a filesystem: no in-place edits (you replace the whole object), no real directories, higher latency per operation. For **web-scale unstructured data**.
Rule of thumb: user uploads, media, backups, static site assets, data-lake files → object storage; a database's data files → block storage.

## Key Properties

- **Massive scale & low cost** — store petabytes cheaply; effectively unlimited objects.
- **High durability** — providers replicate objects across devices/zones for extreme durability (e.g. "11 nines"). Your data is very unlikely to be lost — but that's durability, not backup (delete is still delete; use versioning).
- **Immutable-ish objects** — you typically **replace** an object, not edit it in place (no random writes). Append/edit workloads don't fit.
- **Consistency** — modern S3 offers strong read-after-write consistency (older systems were eventually consistent — know your provider's guarantees).
- **Tiered storage** — hot/cold/archive tiers trade access speed for cost (rarely-accessed data → cheap cold storage).

## Common Patterns

- **Presigned URLs** — grant temporary, scoped access to a specific object without exposing credentials — so clients can **upload/download directly** to/from the bucket (offloading your servers). Essential for user uploads at scale.
- **Static hosting + CDN** — serve assets from a bucket via a CDN (see how-cdns-work).
- **Data lake** — store raw data (Parquet, logs) for analytics (see how-data-warehouses-work).
- **Lifecycle rules** — auto-transition old objects to cheaper tiers or delete them.

## Pitfalls (in understanding/using)

- Treating it like a **filesystem** — no in-place edits, no real directories, higher per-op latency; don't expect POSIX semantics or fast random writes.
- Using it for **frequently-mutated** data or as a database — it's for whole-object read/write of unstructured blobs.
- Confusing **durability** with **backup** — replication protects against hardware loss, not accidental deletion; enable **versioning**.
- **Leaking credentials** by proxying all uploads through your server or hardcoding keys — use **presigned URLs** and least-privilege IAM (see secrets-management).
- **Public buckets** — a top cloud breach cause; lock down access explicitly (see owasp-top-10 misconfiguration).
- Ignoring **request costs / listing costs** at scale (many small objects, frequent LISTs) and egress fees.
- Assuming **eventual consistency** issues that no longer apply (or vice versa) — check your provider's actual guarantees.
