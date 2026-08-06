---
name: form-design
description: Form UI best practices across three guidance layers — helper text, placeholder, validation timing (on blur/real-time/on submit), submit button behavior, required/optional marking. Use when designing or reviewing a form UI.
category: design
keywords_vi: thiết kế form, validate form, validation form, form ui, helper text form, form nhập liệu
---

# Form Design Guidance

Best practices for form UI across three guidance layers.

## Layer 1 — Helper Text

Explains *what* to enter. Appears below the input, always visible, in small secondary text. Keep it to one sentence in plain language, avoiding redundancy with the label.

## Layer 2 — Placeholder

Shows format through realistic examples (e.g. `+84 90 123 4567`). Never substitute for labels since it disappears on input.

## Layer 3 — Validation (most critical)

Three timing strategies:
- **On blur**: default for most fields
- **Real-time**: for complex formats (passwords, IBAN, URLs), with 300–500ms debounce to avoid premature errors
- **On submit**: catches remaining issues

## Submit Button Behavior

The submit button enables when the form is valid. For short forms, disable when incomplete. For longer forms, validate on submit instead to avoid user frustration.

## Essential Details

- Mark only the minority (required *or* optional fields, not both)
- Group related fields using semantic `<fieldset>` and `<legend>`
- Use appropriate `type` attributes for mobile keyboard optimization
- Enable browser autofill via `autocomplete` attributes
- Always pair inputs with visible labels — never rely on placeholders alone
