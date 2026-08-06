---
name: geohashing-and-spatial-hashing
description: How to turn 2D coordinates into a single sortable string/number so ordinary databases and key-value stores can do proximity queries — geohashing and spatial hashing. Interleaving latitude/longitude bits (Z-order/Morton curve) gives a 1D key where nearby points usually share a prefix. Use to understand geohash prefixes, the edge-case where neighbors differ, space-filling curves, spatial hashing grids in games, and sharding by location.
category: databases
keywords_vi: geohash biến toạ độ 2d thành chuỗi số một chiều sắp xếp được, đan xen bit vĩ độ kinh độ theo đường z-order morton curve, điểm gần nhau thường chung tiền tố prefix geohash, trường hợp biên hàng xóm khác tiền tố phải kiểm ô lân cận, spatial hashing lưới ô trong game phát hiện va chạm, phân mảnh shard theo vị trí
---

# Geohashing & Spatial Hashing

Spatial indexes (R-trees, quadtrees) are powerful but need special index structures. Often you want proximity queries using the **plain tools you already have** — a sorted B-tree, a key-value store, a string column. **Geohashing** makes that possible by encoding a 2D coordinate into a **single sortable value** such that **nearby points tend to be near each other in that 1D ordering** — so a range scan or prefix match approximates a spatial query (see spatial-indexing-quadtrees-and-r-trees, how-consistent-hashing-works, geospatial-mapping-and-geocoding).

## The Idea: Interleave the Bits (Z-order / Morton)

Take latitude and longitude, express each as a binary fraction, and **interleave their bits** (one lat bit, one lng bit, alternating). The result is a single number that traces a **space-filling curve** (the **Z-order / Morton curve**) through the plane. Because high-order bits (which fix the coarse region) come first, two points in the same broad area **share a long common prefix**. **Geohash** encodes this interleaved value in base-32 as a short string like `u4pruyd`:
- **Longer geohash = smaller cell = more precision.** `u4` is a big region; `u4pruydqqvj` is a few meters.
- **Shared prefix ≈ spatial proximity.** Points in the same cell share the whole prefix; you can find "everything in this ~1km cell" with a `LIKE 'u4pru%'` / prefix range scan on an ordinary index.

So a geohash column + a B-tree index gives cheap coarse proximity with no special spatial index.

## The Catch: Edge Effects

The convenience has a well-known failure: **adjacent points can have completely different geohashes** if they straddle a cell boundary (the curve "jumps"). Two locations 10 meters apart but on opposite sides of a boundary share **no** prefix. So a naive prefix query **misses neighbors just across the border**. The standard fix: compute the query cell **and its 8 neighboring cells**, and query all nine — geohash libraries provide `neighbors()`. Always search the ring of adjacent cells, not just the center.

## Spatial Hashing (the grid variant, e.g. games)

A simpler cousin used in **games/physics/collision detection**: divide space into a **uniform grid** and hash each object into its cell(s) by `(floor(x/cellSize), floor(y/cellSize))`. To find potential collisions/neighbors, check only objects in the **same and adjacent cells** instead of all N objects — turning O(N²) all-pairs checks into near O(N) for evenly-spread objects. Cell size is the key knob (too big = many per cell; too small = objects span many cells).

## Design Guidance (for understanding/using)

- **Use geohashes to get proximity from ordinary indexes/KV stores** — sortable keys, prefix scans, easy sharding by location.
- **Always query the 8 neighbor cells too** — never rely on a single prefix; edge effects miss nearby points.
- **Pick precision (geohash length / cell size) to your query radius** — too coarse returns too much, too fine misses/needs more cells.
- **Refine with exact distance** — geohash gives candidates in a cell; compute true distance to filter (it's a pre-filter, not the final answer).
- **Spatial-hash grids for games/real-time** — cheap uniform buckets for broad-phase collision/neighbor checks.

## Pitfalls (in understanding/using)

- Querying only the **center** geohash cell → misses neighbors just across a cell boundary (edge effect); include the 8 neighbors.
- Treating a geohash prefix match as **exact** proximity → it's a coarse cell; refine with real distance.
- Wrong precision → too short returns a huge area, too long fragments neighbors across cells.
- Assuming geohash distance ≈ real distance monotonically → the Z-curve has discontinuities; don't sort purely by geohash for nearest-neighbor.
- Uniform spatial-hash grid on **highly clustered** data → some cells overloaded; consider adaptive structures (quadtree) instead.
