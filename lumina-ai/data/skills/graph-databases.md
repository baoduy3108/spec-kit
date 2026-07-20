---
name: graph-databases
description: When and how to use a graph database — nodes, edges, and properties; why relationship-heavy queries (social, recommendations, fraud, knowledge graphs) are fast in a graph and painful in SQL; traversal/pattern queries (Cypher); and when a relational DB is still the right choice. Use when modeling highly-connected data or deciding graph vs relational.
category: engineering
keywords_vi: graph database, cơ sở dữ liệu đồ thị, node edge relationship, neo4j cypher, dữ liệu nhiều liên kết, mạng xã hội gợi ý fraud, knowledge graph, khi nào dùng graph db
---

# Graph Databases

A graph database stores data as **nodes** (entities), **edges** (relationships between them), and **properties** on both. It's purpose-built for data where the **relationships** are as important as the data itself.

## Why Not Just SQL?

In a relational DB, relationships are implicit — you reconstruct them at query time with **JOINs** on foreign keys. That's fine for shallow relationships, but **deep, variable-length traversals** ("friends of friends of friends", "all accounts within 4 hops of this fraud ring") require many self-joins that get exponentially slow and unwieldy. In a graph database, following a relationship is a **direct pointer hop** — traversing connections is fast and constant per hop regardless of total data size ("index-free adjacency"). Relationships are first-class, stored, and traversed natively.

## What It's Great For

- **Social networks** — people, follows, friendships; "who's connected to whom, how many hops."
- **Recommendations** — "people who bought X also bought Y", collaborative paths (see how-recommendation-systems-work).
- **Fraud detection** — find rings and suspicious connection patterns.
- **Knowledge graphs** — entities and their relationships (powering search, Q&A, and RAG grounding).
- **Network/dependency/impact analysis** — IT infrastructure, supply chains, "what depends on this?"
- **Routing / pathfinding** — shortest paths between connected things (see shortest-paths).
The common thread: **many-to-many, deeply connected data** where you query the *connections*.

## Querying

Graph query languages (Cypher for Neo4j, Gremlin, GQL) express **patterns** visually: `MATCH (a:Person)-[:FRIEND]->(b)-[:FRIEND]->(c) WHERE a.name='...' RETURN c` finds friends-of-friends declaratively — far cleaner than the equivalent multi-join SQL. You describe the shape of the relationships you want.

## When NOT to Use a Graph DB

- **Mostly tabular/transactional data** with simple relationships → relational is simpler, more mature, and better tooled.
- **Aggregations over large sets** ("sum all sales by region") → columnar/relational/warehouse wins.
- Your relationships are shallow (1–2 joins) → SQL handles it fine; a graph DB adds operational complexity for no benefit.
Graph databases are specialized — use one because your problem is genuinely relationship-centric, not by default. Many systems use a relational/document DB as the primary store and a graph DB for the specific connected-data queries.

## Why It Matters

Explains: why some queries ("degrees of separation", ring detection, recommendation paths) are trivial and fast in a graph but slow and gnarly in SQL, and when that justifies adding a graph database. Knowledge graphs also increasingly ground LLMs/RAG with structured relationships.

## Pitfalls / Notes

- **Using a graph DB for tabular/aggregation** workloads → wrong tool, worse performance.
- **Operational maturity** — relational tooling/expertise is more widespread.
- **Modeling** — deciding what's a node vs a property vs an edge takes thought (over-noding bloats the graph).
- Super-dense "supernodes" (a node with millions of edges) can hurt traversal performance.
