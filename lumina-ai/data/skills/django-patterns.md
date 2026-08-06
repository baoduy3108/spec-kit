---
name: django-patterns
description: Build Django apps the Django way — fat models / thin views, the ORM (querysets, select_related/prefetch_related to kill N+1), migrations, forms and validation, class-based vs function views, settings/secrets, and security (CSRF, SQL injection protection, permissions). Use when building or reviewing a Django web application.
category: engineering
keywords_vi: django, django patterns, orm queryset, select_related prefetch_related n+1, migration, class-based view, bảo mật django, web python django
---

# Django Patterns

Django is a batteries-included Python web framework. Work *with* its conventions rather than fighting them.

## Structure: Fat Models, Thin Views

Put business logic in **models** (or dedicated services for complex cases), keep **views** thin (handle the request/response, call the logic), and templates dumb. A view stuffed with business logic is the common anti-pattern. Use model methods, managers, and querysets to encapsulate data logic.

## The ORM (and N+1)

- **QuerySets are lazy** — they don't hit the DB until evaluated; chain filters freely.
- **Kill N+1 queries** — the #1 Django performance bug: looping over objects and accessing a related field fires one query per row. Use **`select_related`** (SQL join, for foreign-key/one-to-one) and **`prefetch_related`** (separate query + join in Python, for many-to-many/reverse FK) to fetch related data in bounded queries. (See sql-query-optimization.)
- Use `.only()`/`.defer()`/`.values()` to fetch just what you need; `annotate`/`aggregate` for DB-side computation; `F()`/`Q()` for expressions and complex filters.
- Add DB indexes for filtered/ordered fields.

## Migrations

Schema changes are code: `makemigrations` → review the generated migration → `migrate`. **Review migrations before applying**, keep them reversible, and never edit an applied migration (add a new one). For big tables, mind locking (see database-schema-design's expand-contract).

## Forms & Validation

Use Django **forms/ModelForms** (or DRF serializers for APIs) for validation and cleaning — don't hand-parse `request.POST`. Validate at the form/serializer layer; keep model-level constraints too (defense in depth).

## Views

- **Function-based views** — explicit, simple, great for one-off logic.
- **Class-based views / generics** — DRY for standard CRUD; but their mixin indirection can obscure flow — don't force everything into CBVs.
Pick per case; readability wins.

## Settings, Secrets, Security

- **Settings** — split per environment; **never commit `SECRET_KEY`/DB passwords** (env vars — see secrets-management); `DEBUG = False` in production.
- Django gives strong security defaults **if you don't bypass them**: CSRF protection (keep it on), the ORM parameterizes queries (don't use raw string-formatted SQL — that reintroduces SQL injection), template auto-escaping (don't mark untrusted data safe), `ALLOWED_HOSTS`, and the auth/permissions system (enforce object-level permissions — see authentication-and-authorization).

## Pitfalls

- **N+1 queries** — forgetting `select_related`/`prefetch_related`.
- **Fat views / logic in templates.**
- **Raw SQL with string formatting** → SQL injection (use ORM/params).
- **Marking untrusted data `|safe`** → XSS.
- **`DEBUG = True`** or committed secrets in production.
- Editing applied migrations; unreviewed migrations locking big tables.
- Fighting the framework with non-idiomatic structure.
