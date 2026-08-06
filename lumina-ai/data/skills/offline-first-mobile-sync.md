---
name: offline-first-mobile-sync
description: Offline-first mobile design — treating the local database as the source of truth so the app works without a network, then syncing changes bidirectionally with conflict resolution, queued mutations, and eventual consistency. Use to build an offline-capable app, sync local and server data, resolve sync conflicts, or design local-first mobile.
category: engineering
keywords_vi: offline-first mobile, ứng dụng chạy offline, local db là nguồn sự thật, đồng bộ hai chiều, giải quyết xung đột conflict, hàng đợi thay đổi, eventual consistency, local-first
---

# Offline-First Mobile Sync

Offline-first design treats the **local database as the source of truth**, so the app is **fully usable without a network** — reads and writes happen locally and instantly — and changes **sync** with the server in the background when connectivity allows. Mobile networks are unreliable (subways, elevators, spotty data), so building for offline isn't a nice-to-have; it's what makes an app feel fast and dependable (see mobile-app-architecture, delivery-semantics).

## The Problem: The Network Isn't Always There

An app that only works online **freezes or errors** whenever the connection drops or is slow — a terrible experience on mobile. Offline-first flips the default: **assume no network**, work against local storage, and treat the server as something you **sync with** rather than depend on for every action. The UI never blocks on the network.

## The Core Idea: Local Source of Truth + Background Sync

- **Read/write locally** — all UI operations hit a **local database** (SQLite, Realm, etc.), so they're instant and work offline. The UI observes the local DB.
- **Queue mutations** — when the user makes a change offline, record it as a **pending operation** in an outbox/queue.
- **Sync in the background** — when connectivity returns, **push** queued local changes to the server and **pull** server changes down, reconciling both into the local DB.
- **Optimistic UI** — show the change immediately (locally) and reconcile later, rather than waiting for the server (see the optimistic-ui idea).

The result: the app is always responsive; sync is an invisible background concern.

## The Hard Part: Conflict Resolution

When the **same data is edited both offline (locally) and on the server**, sync must reconcile the conflict. Strategies:
- **Last-write-wins (LWW)** — the most recent timestamp wins. Simple, but **can silently lose** the other edit.
- **Server-wins / client-wins** — a fixed policy; simple but blunt.
- **Field-level merge** — merge non-conflicting fields; only truly conflicting fields need resolution.
- **CRDTs** — conflict-free replicated data types that **mathematically merge** concurrent edits without conflicts (great for collaborative/local-first apps, more complex).
- **Prompt the user** — for important conflicts, ask which version to keep.
There's no universal answer — pick based on how bad a lost edit is for your data. This is inherently an **eventual-consistency** system (see delivery-semantics).

## Design Guidance

- **Local DB is the source of truth** for the UI; the server syncs into it.
- **Idempotent sync** — network retries mean operations may replay; use stable IDs / idempotency so re-syncing doesn't duplicate (see idempotency, delivery-semantics).
- **Track sync state** per record (synced / pending / conflicted) and surface it subtly to the user.
- **Client-generated IDs** (UUIDs) so records created offline have stable identity before the server sees them.
- **Change tracking** — use updated-at timestamps / version vectors / a change log to know what to sync.
- **Handle deletes** carefully (tombstones) so a delete syncs correctly and doesn't resurrect.
- **Choose a conflict policy deliberately** per data type; default LWW only where lost edits are acceptable.

## Pitfalls (in understanding/using)

- Blocking the UI on the **network** instead of local storage → the app feels broken offline/on slow networks.
- **Last-write-wins everywhere** → silently losing user edits on conflict.
- **Server-assigned IDs only** → offline-created records have no stable identity; use client-generated UUIDs.
- **Non-idempotent sync** → retried syncs duplicate records/actions.
- Ignoring **deletes** (no tombstones) → deleted items reappear after sync.
- Treating sync as **immediate/consistent** → it's eventual; design the UI to tolerate in-flight/pending state.
- Under-communicating **conflict/sync status** → users confused when data changes under them.
