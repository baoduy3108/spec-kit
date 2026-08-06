---
name: geospatial-mapping-and-geocoding
description: How geospatial data and mapping work — coordinates and projections, geocoding (address↔coordinates), spatial data types (points/lines/polygons) and formats (GeoJSON), spatial indexing for fast queries, and visualizing data on maps. Use to map events/data, geocode locations, do proximity/spatial queries, or build a map visualization.
category: engineering
keywords_vi: geospatial mapping geocoding, dữ liệu địa lý bản đồ, tọa độ phép chiếu projection, geocoding địa chỉ sang tọa độ, geojson point polygon, spatial index truy vấn không gian, trực quan hóa trên bản đồ
---

# Geospatial Mapping & Geocoding

Geospatial data ties information to **places on Earth**, and mapping visualizes it. For a monitoring/OSINT system, putting events on a map — and querying "what's near here" — is a powerful lens (see media-monitoring-and-social-listening, crisis-monitoring). Understanding coordinates, geocoding, and spatial queries makes it work.

## Coordinates & Projections

Locations are expressed as **latitude/longitude** (degrees) on a model of the Earth (the **WGS84** datum, used by GPS — see how-gps-works). But a round Earth must be flattened to a 2D map via a **projection**, which inevitably **distorts** something (area, shape, distance, or direction) — you can't have all at once. **Web Mercator** is the near-universal web-map projection (great for tiles, but exaggerates area near the poles — Greenland looks huge). Know which projection your data/map uses; mixing projections misplaces points.

## Geocoding

Converting between human addresses and coordinates:
- **Geocoding** — address/place name → coordinates ("1600 Pennsylvania Ave" → lat/lng). Needed to map textual location data (news often says *where* in words).
- **Reverse geocoding** — coordinates → address/place.
Geocoding is **fuzzy**: ambiguous names ("Springfield" — which one?), misspellings, incomplete addresses, and multiple matches. It returns **confidence/quality**, not certainty — handle ambiguity and verify for important cases. Respect geocoding API terms/limits.

## Spatial Data Types & Formats

Geometry comes as:
- **Point** — a single location (an event, a place).
- **LineString** — a path/route (a road, a border).
- **Polygon** — an area (a country, a zone, a flood extent).
**GeoJSON** is the common web format for these; **shapefiles** and others exist in GIS. Databases with spatial extensions (**PostGIS** for Postgres) store and query geometry natively.

## Spatial Indexing & Queries

The point of geospatial data is **spatial questions**: "events within 10km of here," "which region contains this point," "what intersects this area." Answering these fast over large datasets needs **spatial indexes** (R-trees, geohashing, quadtrees, S2/H3 cells) — analogous to regular indexes but for 2D space (see how-b-trees-work for the general idea). Without them, spatial queries scan everything. Common operations: proximity/radius search, point-in-polygon, bounding-box, nearest-neighbor.

## Visualization

Maps display geospatial data as layers over a **base map** (tiles): **markers/clusters** for points (cluster when many overlap), **heatmaps** for density, **choropleths** (shaded regions) for values per area, and lines for routes/connections (see data-visualization-principles). Choose the representation for the data and the question (density vs individual events vs regional metrics).

## Pitfalls (in understanding/using)

- **Mixing projections/datums** → points land in the wrong place (offsets). Keep everything in one coordinate system (usually WGS84 / Web Mercator for web).
- Treating **geocoding as exact** — it's fuzzy (ambiguity, bad matches); handle confidence and multiple results.
- Swapping **lat/lng order** — a classic bug (GeoJSON is [lng, lat]; many APIs are [lat, lng]).
- **No spatial index** → slow spatial queries on large data; use PostGIS/geohash/H3.
- Naively computing distance with flat math over large areas — the Earth is curved (use proper great-circle/haversine or a projected CRS).
- **Overplotting** thousands of markers → unreadable; cluster or use heatmaps/choropleths.
- Ignoring **privacy** when mapping people/personal locations (see osint-fundamentals ethics).
