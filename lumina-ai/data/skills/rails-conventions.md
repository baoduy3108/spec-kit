---
name: rails-conventions
description: Rails 8.x architecture and code review that matches the existing codebase rather than forcing generic patterns — framework-first (apps should look like Rails apps), minimal abstractions, single source of truth, mandatory codebase inspection before proposing changes, and no implicit backend migrations. Use when building or reviewing Rails models, controllers, routes, Hotwire, jobs, APIs, performance, security, or tests.
category: engineering
keywords_vi: rails, ruby on rails, quy ước rails, review code rails, rails native pattern, hotwire, solid queue, rails app chuẩn, kiến trúc rails
---

# Rails Conventions

Guide Rails 8.x work by matching the codebase you already have, not by importing borrowed architecture.

## Core Principles

- **Framework-first** — "Rails applications should look like Rails applications." Prefer Rails-native conventions over patterns imported from other ecosystems (service-object soup, hexagonal layers, etc.) unless the codebase already commits to them.
- **Minimal abstractions** — a class or module must justify its existence. Discourage wrappers/facades that exist only for naming or testing convenience; they add indirection without behaviour.
- **Single source of truth** — each behaviour, schema column, validation rule, and domain term has exactly one canonical location. Duplicated validation or domain logic is a defect.

## Mandatory Codebase Inspection (before proposing changes)

Scan `Gemfile`, `config/`, representative `app/` layers, and the test structure to detect what the project actually uses — then match it:
- Test framework (RSpec vs Minitest)
- Auth pattern (Devise, Rails 8 built-in authentication generator, custom)
- Frontend stack (Hotwire/Turbo/Stimulus vs React/Inertia)
- Queue backend (GoodJob vs Solid Queue vs Sidekiq)
- API serialization style (Jbuilder, serializers, plain Hash)

Never assume Rails 8 = Solid Queue. Detect via `config.active_job.queue_adapter`, `Gemfile`, or deploy config and **respect the existing backend** — no implicit migration.

## Domain Terminology

Keep a `docs/domain-terms.md` defining canonical terms, deprecated names, and naming rules for code, routes, params, and APIs — so the vocabulary stays consistent across models, URLs, and payloads.

## Review Lens (by area)

- **Models** — fat-model-thin-controller within reason; validations/associations/scopes over ad-hoc query objects; concerns only for genuinely shared behaviour.
- **Controllers** — RESTful actions; skinny; push logic down; use strong params.
- **Routes** — resourceful; avoid custom member/collection sprawl when a nested resource is clearer.
- **Hotwire** — Turbo Frames/Streams + Stimulus before reaching for a SPA.
- **Jobs** — idempotent; respect the detected queue backend.
- **APIs** — consistent serialization; version deliberately.
- **Performance** — watch N+1 (`includes`), add indexes, cache with Solid Cache where present.
- **Security** — strong params, `CSRF`, authorization checks, no secrets in code.
- **Testing** — match the project's framework; test behaviour, not implementation.
