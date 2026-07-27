---
name: spatial-indexing-quadtrees-and-r-trees
description: Why a normal B-tree index can't answer "find everything near me" and how spatial indexes do — quadtrees, k-d trees, and R-trees. They partition 2D/3D space (or bound objects in nested rectangles) so range and nearest-neighbor queries prune most of the data. Use to understand spatial/geo queries, bounding-box pruning, why 1D indexes fail on multi-dimensional locality, and how PostGIS/maps do proximity search.
category: databases
keywords_vi: chỉ mục không gian spatial index cho truy vấn gần đây và trong vùng, b-tree một chiều không trả lời được tìm quanh vị trí, quadtree chia ô đệ quy và k-d tree chia theo trục, r-tree bao đối tượng trong hình chữ nhật lồng nhau bounding box, cắt tỉa theo hộp bao pruning bỏ qua phần lớn dữ liệu, postgis bản đồ tìm lân cận
---

# Spatial Indexing: Quadtrees, k-d Trees & R-Trees

A B-tree index makes `WHERE age BETWEEN 20 AND 30` fast because it orders data on **one** dimension. But "find all restaurants within 2km of me" or "which delivery zones contain this point" are **multi-dimensional** (latitude *and* longitude, together), and a 1D index can't capture 2D **locality** — points close in space can be far apart in any single-column order. **Spatial indexes** solve this by partitioning space itself, and they're what powers maps, geospatial databases (PostGIS), games, and collision detection (see geohashing-and-spatial-hashing, how-database-indexes-work, vector-index-algorithms).

## Why 1D Indexes Fail

Index by longitude alone and a nearby point can be anywhere in latitude; index by latitude alone, same problem. Even indexing `(lat, lng)` as a composite only clusters by latitude first — a range query in 2D still scans a huge band. You need a structure where **spatial proximity maps to storage proximity** in *all* dimensions at once.

## The Main Structures

**Quadtree** — recursively divide 2D space into **four quadrants**; subdivide a quadrant further only where it's **dense** (many points). Result: a tree where sparse regions are shallow and dense regions deep. Great for point data, adaptive to non-uniform distributions; the 3D analogue is the **octree** (eight children — used in games/graphics/voxels).

**k-d tree** — a binary tree that splits on **one axis at a time**, alternating axes by depth (split on x, then y, then x…). Excellent for **nearest-neighbor** search in low-to-moderate dimensions; harder to update dynamically.

**R-tree** — the workhorse for **databases and extended objects** (not just points — polygons, lines, rectangles). It groups nearby objects into **minimum bounding rectangles (MBRs)**, and groups those MBRs into bigger MBRs, forming a balanced tree of nested rectangles (like a B-tree for boxes). A query descends only into MBRs that **intersect** the query region. MBRs may overlap, and minimizing that overlap is the tuning challenge (R*-tree). Used by PostGIS, SQLite R*Tree, Oracle Spatial.

## The Common Trick: Bounding-Box Pruning

All of them share one idea: attach a **bounding region** to each subtree, and during a query **skip any subtree whose region can't satisfy the query**. A "within 2km" or "inside this polygon" query prunes away the vast majority of the tree, visiting only the few regions that could contain matches — turning an O(N) scan into a targeted descent. Nearest-neighbor search uses the same bounds to stop early once no unexplored region could hold a closer point.

## Design Guidance (for understanding/using)

- **Use a spatial index for geo/proximity/range queries** (`ST_DWithin`, "nearest", "contains") — a normal B-tree can't prune 2D locality.
- **R-tree for extended objects** (polygons, bounding boxes, map features); **quadtree/k-d tree for points**; **octree** for 3D/games.
- **Let the database do it** — PostGIS GiST (R-tree), SQLite R*Tree; index the geometry column and write sargable spatial predicates.
- **Combine with geohashing** for sharding/bucketing or approximate proximity when a full spatial index is overkill.
- **Watch skew and updates** — quadtrees adapt to density; R-trees need rebalancing; heavy churn degrades them.

## Pitfalls (in understanding/using)

- Using a plain B-tree / composite `(lat,lng)` for proximity → can't prune 2D; scans a huge band.
- Ignoring that R-tree **MBRs overlap** → excessive overlap kills pruning; use R*-tree/bulk-load.
- Wrapping the geometry column in a function → the spatial index won't be used (non-sargable).
- Using a **point** structure for **polygon/line** objects → R-trees handle extents; quadtrees/k-d trees are point-oriented.
- Assuming spatial indexes help **high-dimensional** vectors → k-d trees degrade in high dimensions; use ANN indexes (HNSW/IVF) instead.
