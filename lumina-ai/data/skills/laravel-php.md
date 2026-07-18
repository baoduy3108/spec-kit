---
name: laravel-php
description: Build Laravel (PHP) apps the Laravel way — Eloquent ORM (and N+1 with eager loading), MVC + routing, middleware, migrations, request validation, Blade templates, queues, and security (mass assignment, CSRF, SQL/XSS protection). Use when building or reviewing a Laravel web application.
category: engineering
keywords_vi: laravel php, eloquent orm, mvc routing middleware, migration, request validation, blade template, queue job, bảo mật laravel mass assignment, web php
---

# Laravel (PHP) Patterns

Laravel is a batteries-included PHP framework with elegant conventions. Work with its idioms — routing, Eloquent, and its rich helpers.

## MVC, Routing, Controllers

Requests hit **routes** (`routes/web.php`, `routes/api.php`) → **controllers** → return views or JSON. Keep controllers thin; use **resource controllers** for RESTful CRUD, **middleware** for cross-cutting concerns (auth, throttling), and **form requests** for validation. Move complex logic into services/actions, not fat controllers.

## Eloquent ORM

Eloquent is Laravel's ActiveRecord ORM — models map to tables with expressive relationships (`hasMany`, `belongsTo`, `belongsToMany`).
- **N+1 queries** — the #1 Laravel performance bug: looping over models and accessing a relation fires a query each. Use **eager loading** (`Model::with('relation')`) to load relations in bounded queries (see sql-query-optimization). Enable `Model::preventLazyLoading()` in dev to catch it.
- Use query scopes, `whereHas`, and collections; add DB indexes for filtered columns.

## Migrations & Validation

- **Migrations** version your schema (`php artisan make:migration`); reversible `up`/`down`; run with `migrate`. Never edit an applied migration.
- **Validation** — use **Form Requests** or `$request->validate([...])` with rules; don't trust input. Validation failures auto-return errors.

## Blade & Security

Laravel is secure by default **if you don't bypass it**:
- **Blade templates** auto-escape output (`{{ $var }}`) → XSS-safe; only use `{!! !!}` (unescaped) for trusted content.
- **Eloquent/Query Builder** parameterize queries → SQL-injection-safe; don't concatenate raw SQL.
- **CSRF protection** on web forms (the `@csrf` directive) — keep it.
- **Mass assignment** — protect against it with `$fillable`/`$guarded` on models; blindly `Model::create($request->all())` can let users set fields they shouldn't (a real Laravel vuln).
- **Authorization** — policies/gates for who-can-do-what (see authentication-and-authorization).

## Queues & Jobs

Offload slow work (emails, image processing, API calls) to **queued jobs** (`dispatch`) with a queue worker — keeps requests fast (see message-queues-and-events). Make jobs idempotent and handle failures/retries.

## Config & Secrets

Config via `.env` (never committed) + `config/` files; `APP_DEBUG=false` in production; cache config in prod (`config:cache`).

## Pitfalls

- **N+1 queries** — missing `with()` eager loading.
- **Mass assignment** without `$fillable`/`$guarded`.
- **`{!! !!}`** on untrusted data → XSS.
- **Raw SQL** with interpolation → SQL injection.
- **Fat controllers**; business logic in the wrong place.
- **`APP_DEBUG=true`** / committed `.env` in production.
- Slow work in the request instead of queued jobs.
