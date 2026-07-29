---
name: coordinate-and-vector-geometry
description: Coordinate and vector geometry (thi chuyên/advanced math) — the Cartesian plane, lines and circles, conic sections, vectors (dot/cross product), 3D coordinate geometry (planes, lines), and using coordinates/vectors to solve geometry. Use for analytic geometry, vectors, conics, 3D geometry, or coordinate-bashing geometry problems.
category: knowledge
keywords_vi: hình học tọa độ và vector thi chuyên toán, mặt phẳng tọa độ đường thẳng và đường tròn, các đường conic elip parabol hypebol, vector tích vô hướng và tích có hướng, hình học tọa độ không gian mặt phẳng và đường thẳng, giải hình bằng tọa độ và vector
---

# Coordinate & Vector Geometry

Coordinate (analytic) geometry represents geometric objects with **numbers and equations**, turning geometry into algebra. Vectors add a powerful language for directions, lengths, and angles. Together they let you *compute* geometric facts and provide a systematic "bashing" alternative to synthetic proofs (see plane-geometry-olympiad).

## The Cartesian Plane: Lines & Circles

- **Points** as (x, y); **distance** = √((x₂−x₁)² + (y₂−y₁)²); **midpoint** = averages.
- **Lines** — slope m = Δy/Δx; forms y = mx + b, point-slope, and general ax + by + c = 0. **Parallel** lines share slope; **perpendicular** slopes multiply to −1.
- **Circles** — (x − h)² + (y − k)² = r² (center, radius). Intersections of lines and circles solve by substitution.
- **Distance from a point to a line** — a key formula |ax₀+by₀+c|/√(a²+b²).

## Conic Sections

Curves from slicing a cone, defined by quadratic equations:
- **Parabola** — y = ax² (or x = ay²); focus and directrix.
- **Ellipse** — x²/a² + y²/b² = 1; two foci, sum of distances constant.
- **Hyperbola** — x²/a² − y²/b² = 1; difference of distances constant; asymptotes.
- **Circle** is a special ellipse. Conics appear in orbits (see gravitation), optics, and advanced problems.

## Vectors

A **vector** has magnitude and direction (see linear-algebra-intuition):
- **Operations** — add/subtract (tip-to-tail), scalar multiply. Position vectors locate points.
- **Dot product** — **a·b = |a||b|cos θ** = a₁b₁ + a₂b₂. Gives **angles** (θ = 0 when perpendicular → a·b = 0) and **projections**. Central for perpendicularity and angle problems.
- **Cross product** (3D) — **a×b** is perpendicular to both, with magnitude |a||b|sin θ (the parallelogram area). Gives normals, areas, and volumes (scalar triple product).

## 3D Coordinate Geometry

- **Points** (x, y, z), distances, and the same vector tools in space.
- **Lines** — parametric form r = r₀ + t·d (point + direction vector).
- **Planes** — ax + by + cz + d = 0, with normal vector (a, b, c). Angle between planes/lines, distance from a point to a plane, line-plane intersections — all solved with vectors (dot/cross products). A major THPT topic (hình học không gian tọa độ).

## Solving Geometry with Coordinates/Vectors

The "bashing" approach — when synthetic geometry is hard:
- **Place a coordinate system** cleverly (put a vertex at the origin, a side on an axis) to simplify.
- Translate the problem into equations and **compute** — prove collinearity (same line equation), concurrency (common intersection), perpendicularity (dot product = 0), or find loci.
- **Vector methods** — express points as vectors, use dot/cross products for angles, areas, and to prove relations elegantly (often cleaner than coordinates).
- Trade-off: bashing is systematic and reliable but can be computation-heavy; synthetic proofs are elegant but require insight. Knowing when to bash is a competition skill.

Master coordinate and vector geometry via the **Cartesian plane** (lines, circles, distance formulas), **conic sections** (parabola/ellipse/hyperbola), **vectors** (dot product for angles/perpendicularity, cross product for areas/normals), **3D coordinate geometry** (planes and lines via normal/direction vectors), and using **coordinates/vectors to solve geometry** by clever placement and computation. This algebraic approach to geometry is both a THPT staple and a reliable thi-chuyên fallback when synthetic methods stall.
