---
name: how-filesystems-work
description: How filesystems work — inodes and metadata, directories as name→inode maps, blocks and extents, allocation and fragmentation, journaling for crash consistency, and copy-on-write filesystems. Use to understand filesystems, inodes, how files are stored on disk, journaling, or crash recovery.
category: engineering
keywords_vi: filesystem hoạt động thế nào, hệ thống tệp, inode, thư mục directory, block phân bổ, journaling nhật ký, copy on write, lưu file trên đĩa
---

# How Filesystems Work

A filesystem organizes raw storage (a flat array of blocks) into named files and directories, tracks where each file's data lives, stores metadata, and survives crashes. It's the layer between "a disk of numbered blocks" and "open('/home/user/notes.txt')".

## Inodes — files are metadata + block pointers

A file is really an **inode**: a structure holding the file's **metadata** (size, permissions, owner, timestamps) and **pointers to the data blocks** that hold its contents. Crucially, the **filename is not in the inode** — it lives in a directory. This is why hard links work: multiple names can point to the same inode (same file, multiple directory entries), and the file exists until its link count hits zero.

## Directories — name → inode maps

A **directory** is just a special file whose contents are a table of `(name → inode number)` entries. Resolving `/a/b/c` means: read the root directory to find `a`'s inode, read `a` to find `b`, and so on — a walk down the tree. This separation (names in directories, data via inodes) is elegant and enables links, renames (cheap — just edit directory entries), and mount points.

## Blocks, Extents & Allocation

Data is stored in fixed **blocks** (e.g. 4 KB). Small files use direct block pointers; large files use **indirect blocks** (pointers to pointers) or **extents** (a start block + length, compact for contiguous data). The filesystem tracks free space (bitmaps/free lists) and tries to allocate blocks contiguously — scattered allocation causes **fragmentation**, hurting sequential read speed (less of an issue on SSDs than spinning disks).

## Crash Consistency — Journaling & CoW

A crash mid-write can corrupt the filesystem (a file's metadata updated but its data not, or vice versa). Two solutions:
- **Journaling** (ext4, NTFS) — write intended changes to a **journal** (log) first, then apply them. After a crash, replay/rollback the journal to reach a consistent state. Usually journals metadata (fast); optionally data too.
- **Copy-on-write** (ZFS, Btrfs, APFS) — never overwrite in place; write new versions elsewhere and atomically switch a pointer. Enables cheap **snapshots** and checksummed integrity, at some space/complexity cost.
This is why you can (usually) pull the plug and not lose the whole disk.

## Caching

The OS caches file data and metadata in RAM (**page cache**) — reads hit RAM, writes are buffered and flushed later. This is why `fsync` matters: without it, "written" data may only be in the cache, lost on power failure (see how-databases-work — DBs `fsync` for durability).

## Pitfalls (in understanding/using)

- Thinking the filename is part of the file — it's a directory entry (hence hard links).
- Assuming a write hit the disk — it may be in the page cache until `fsync`/flush.
- Ignoring fragmentation on HDDs (matters less on SSDs).
- Confusing hard links (same inode) with symlinks (a path pointer that can dangle).
- Forgetting that deleting a file open by a process only unlinks the name — space frees when the last handle closes.
- Assuming crash safety without journaling/CoW or `fsync` — you can lose or corrupt data.
