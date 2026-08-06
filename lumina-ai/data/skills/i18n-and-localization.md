---
name: i18n-and-localization
description: Internationalize and localize software correctly — externalize strings, handle pluralization and gender, format dates/numbers/currency by locale, support right-to-left layouts, avoid string concatenation and hardcoded assumptions, and manage translation workflow. Use when adding multi-language support or fixing locale-specific bugs.
category: engineering
keywords_vi: đa ngôn ngữ, i18n l10n, bản địa hóa, dịch giao diện, định dạng theo locale, số nhiều plural, right-to-left rtl, hỗ trợ nhiều ngôn ngữ
---

# Internationalization & Localization

**i18n** = building software so it *can* be adapted to any locale (the engineering); **l10n** = actually adapting it to a specific locale (the translation/formatting). Do i18n up front — retrofitting it is expensive.

## Externalize Everything Translatable

- No user-facing strings hardcoded in code — put them in resource/message files keyed by id, loaded per locale.
- **Never build sentences by concatenation.** `"You have " + n + " messages"` is untranslatable — word order, plural rules, and grammar differ per language. Use full parameterized templates: `messages_count(n)`.
- Leave room for **text expansion** — translations can be 30–50% longer (German) or shorter; don't design fixed-width UI around English length.

## The Hard Parts

- **Pluralization** — languages have different plural categories (English: 1/other; others have zero/one/two/few/many/other). Use a plural-aware formatting library (ICU MessageFormat / CLDR rules), not `if (n == 1)`.
- **Gender & grammar** — some languages inflect by gender/case; provide message variants rather than gluing fragments.
- **Dates/numbers/currency** — format via locale APIs (`Intl` in JS, CLDR data), never hand-format. `1,000.50` vs `1.000,50`; MM/DD vs DD/MM; different calendars; currency symbol placement. (Store canonical values — UTC times, minor-unit integers — and format at display.)
- **Right-to-left (RTL)** — Arabic/Hebrew mirror the whole layout. Use logical CSS properties (`margin-inline-start`, not `margin-left`), `dir="rtl"`, and test mirrored UI.
- **Sorting & search** — collation is locale-specific (accents, character order); use locale-aware compare, not byte order.

## Workflow

- Keep a clean key→string catalog; give translators **context** (where the string appears, what a placeholder means) — ambiguous keys get mistranslated.
- Don't ship untranslated keys as fallback garbage — fall back to a default language gracefully.
- Handle **encoding** as UTF-8 end to end (see the encoding rules) — i18n and mojibake bugs travel together.
- Test with a pseudo-locale (accented, elongated text) early to catch hardcoded strings and truncation before real translation.
