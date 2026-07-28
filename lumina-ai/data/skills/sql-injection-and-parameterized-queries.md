---
name: sql-injection-and-parameterized-queries
description: How attacker input turns a query into a weapon — SQL injection — and the one real fix: parameterized queries (prepared statements) that separate code from data. Covers why string concatenation is the root cause, why escaping/blocklists fail, handling identifiers that can't be parameterized (allowlist), least-privilege DB accounts, and that ORMs help but raw fragments reopen the hole. Use to write injection-proof data access.
category: security
keywords_vi: tiêm sql injection dữ liệu kẻ tấn công biến câu truy vấn thành vũ khí, sửa thật bằng truy vấn tham số hoá prepared statement tách mã khỏi dữ liệu, nối chuỗi là gốc rễ lỗ hổng, escape và blocklist thất bại, tên bảng cột không tham số hoá được phải dùng allowlist, tài khoản db quyền tối thiểu, orm giúp nhưng mảnh sql thô mở lại lỗ hổng
---

# SQL Injection & Parameterized Queries

**SQL injection** is the archetypal "data treated as code" vulnerability and still one of the most damaging. It happens when user input is **concatenated into a SQL string**, letting an attacker change the query's *structure* — reading other users' data, dumping the whole database, bypassing auth (`' OR '1'='1`), or destroying tables (`'; DROP TABLE users; --`). Despite being decades old, it persists wherever developers build queries by string-building. The fix is simple, complete, and non-negotiable: **parameterized queries** (see xss-and-output-encoding, idor-and-broken-access-control, authentication-and-authorization).

## The Root Cause: Concatenation Mixes Code and Data

```
query = "SELECT * FROM users WHERE email = '" + input + "'"   // WRONG
```
If `input` is `x' OR '1'='1`, the query becomes `... WHERE email = 'x' OR '1'='1'` — always true. The database can't tell the developer's SQL from the attacker's; it just parses the final string. **Anywhere untrusted data is glued into a query, structure can be hijacked.**

## The Fix: Parameterized Queries (Prepared Statements)

Send the SQL **structure** and the **data separately**:
```
db.execute("SELECT * FROM users WHERE email = ?", [input])    // RIGHT
```
The `?` (or `:name`/`$1`) is a **placeholder**. The database parses the query template **first** (fixing its structure), then binds the input strictly as a **value** — it can *never* become SQL syntax, no matter what characters it contains. This is a **complete** fix for value injection (not a mitigation), and it's often faster too (the DB can cache the plan). Use it for **every** query with any dynamic value — always, not just "risky-looking" ones.

## Why Escaping and Blocklists Fail

Manually escaping quotes or blocking words like `DROP`/`UNION` is fragile: escaping rules differ per DB and encoding, Unicode/hex tricks slip through, numeric contexts don't need quotes, and legitimate data contains apostrophes. **Don't escape; parameterize.** Blocklists are security theater against a determined attacker.

## The Cases Parameters Don't Cover: Identifiers

Placeholders bind **values**, not **identifiers** — you **cannot** parameterize a table name, column name, `ORDER BY` column, or `ASC/DESC` direction. When those must be dynamic (sortable columns, dynamic filters), you **cannot** interpolate user input; instead **map user input against a strict allowlist** of known-safe identifiers (`{"name": "users.name", "date": "created_at"}[input]`). Never build identifiers from raw input.

## Defense in Depth

- **Least-privilege DB accounts** — the app's user should only have the rights it needs (no `DROP`, no access to unrelated tables); limits blast radius if injection slips through.
- **ORMs / query builders** help because they parameterize by default — **but** raw SQL fragments, `.raw()`, string-built `WHERE` clauses, and dynamic `ORDER BY` reopen the hole. Audit those.
- **Input validation** (type/length/format) is good hygiene but is **not** the injection defense — parameterization is.
- **Stored procedures** help only if they themselves use parameters, not dynamic SQL inside.

## Design Guidance (for understanding/using)

- **Parameterize every query with dynamic values** — no exceptions, no "it's just an internal id".
- **Never concatenate/escape** user input into SQL; placeholders are the fix.
- **Allowlist dynamic identifiers** (table/column/sort) — they can't be parameters.
- **Run the app on a least-privilege DB account** to cap damage.
- **Audit ORM escape hatches** (`raw`, string `where`, dynamic order) — that's where ORMs get injected.

## Pitfalls (in understanding/using)

- String-concatenating "safe-looking" values (numeric ids, internal fields) → still injectable; parameterize all.
- **Escaping** quotes instead of parameterizing → bypassable across encodings/DBs.
- Interpolating a **table/column/ORDER BY** from user input → injection that parameters can't stop; use an allowlist.
- Trusting an **ORM** blindly while using `.raw()`/string `where` → reopens injection.
- Treating input validation as the fix → it's hygiene; parameterization is the actual defense.
