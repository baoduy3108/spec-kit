---
name: save-systems-and-serialization
description: Save systems for games — serializing game state to disk, save slots and autosave, schema versioning and migration for backward compatibility, atomic writes to avoid corruption, checksums, and what to save (state) vs recompute (derived). Use when building save/load, checkpoints, or persisting game progress safely.
category: engineering
keywords_vi: hệ thống lưu game save system, ghi trạng thái ra đĩa serialize, ô lưu slot tự động autosave, phiên bản schema tương thích ngược save cũ, ghi nguyên tử tránh hỏng file save, checksum kiểm tra hỏng, lưu trạng thái không lưu dữ liệu suy ra
---

# Save Systems & Serialization

A save system persists the player's progress so it survives closing the game. It sounds simple — "write state to a file" — but doing it *robustly* (no corruption, no broken saves after an update) is where the real engineering lives. A lost save is one of the worst experiences you can inflict on a player.

## What to Save

Save the **authoritative state**, not everything:
- **Save**: player position/stats, inventory, quest flags, world changes (opened chests, killed bosses), settings, RNG seed.
- **Don't save**: anything **derived** (recompute it on load — current velocity, pathfinding caches, rendered sprites), and transient UI.

Minimizing what you save shrinks files, cuts bugs, and makes versioning easier. A good rule: if you can recompute it deterministically from saved state, don't store it.

## Serialization

Turn the live object graph into bytes:
- **Text formats** (JSON, YAML) — human-readable, debuggable, forgiving to version — great for small/moderate saves.
- **Binary** (protobuf, MessagePack, custom) — compact and fast for large state; less debuggable (see protobuf-and-wire-format).
- Handle **references** — an entity referring to another must serialize an **ID**, not a pointer; rebuild links on load.

## Versioning & Migration

This is the part beginners skip and later regret. **Games ship updates**, and old saves must still load:
- Stamp every save with a **version number**.
- On load, if `saveVersion < currentVersion`, run **migrations** in sequence (v1→v2→v3) that transform old data to the new shape (add a defaulted field, rename, restructure).
- Design formats to be **additive-friendly**: unknown fields ignored, missing fields defaulted. Never assume a field exists.

Without this, every patch bricks existing players' progress. Plan for versioning from day one — retrofitting it is painful.

## Atomic Writes: Don't Corrupt

If the game crashes or power dies *mid-write*, a naïve "open file, overwrite" leaves a **half-written, corrupt save** — catastrophic. The fix is an **atomic write**:
1. Write to a **temp file** (`save.tmp`).
2. `fsync` to force it to disk.
3. **Rename** temp → real name (rename is atomic on most filesystems).

Now the real save is always either the complete old one or the complete new one — never a torn mix. Keep the **previous save as a backup** and rotate, so a bad save still leaves a fallback.

## Integrity & Safety

- **Checksum** the save; on load, verify — detect corruption or truncation and fail gracefully to a backup instead of loading garbage.
- **Autosave** at safe points (checkpoints, level exits), and to a *separate* slot from manual saves so an autosave can't clobber a manual one.
- If tampering matters (leaderboards), sign saves; but don't punish honest offline players for it.

## Slots & UX

Offer multiple slots with metadata (playtime, location, timestamp, screenshot) so players can identify saves. Confirm before overwriting. Make save/load fast and quiet — it should never feel risky.

A save system is judged only when it fails. Build it to *never* lose progress, and players will never think about it — which is exactly the goal.
