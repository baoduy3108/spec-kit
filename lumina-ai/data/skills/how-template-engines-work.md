---
name: how-template-engines-work
description: How template engines work — parsing a template with placeholders and control structures, compiling to an intermediate form, and rendering by combining it with data; plus escaping/autoescaping, and logic-ful vs logic-less templates. Use to understand template engines (Jinja/Handlebars/etc.), how HTML templating works, template rendering, or building a template engine.
category: engineering
keywords_vi: how template engines work, template engine hoạt động thế nào, placeholder biến điều khiển, parse compile render, kết hợp với dữ liệu, autoescape, logic-ful vs logic-less, jinja handlebars
---

# How Template Engines Work

A template engine takes a **template** (text with placeholders and control structures) and **data**, and produces output (HTML, email, config, code) by filling the placeholders and evaluating the logic. It's how web frameworks turn data into pages, and understanding it demystifies templating and its security concerns.

## The Model: Template + Data → Output

You write a template with:
- **Placeholders / expressions** — `{{ user.name }}` — substituted with data values.
- **Control structures** — loops (`{% for item in items %}`), conditionals (`{% if %}`), includes/inheritance — to generate repeated/conditional content.
- **Static text** — passed through unchanged.
The engine combines the template with a **data context** (variables) to render the final output. Separating the template (structure) from the data (content) is the point — designers edit templates, code provides data.

## How It Works: Parse → Compile → Render

Under the hood, most engines:
1. **Parse** the template into a structure (tokens → an AST — see how-parsers-work), identifying static text, expressions, and control blocks.
2. **Compile** — many engines compile the template **once** into an intermediate form (often generated code/functions) so rendering is fast and repeatable (compile once, render many times with different data). Others interpret the AST directly.
3. **Render** — execute the compiled template against a data context: evaluate expressions, run loops/conditionals, and assemble the output string.
Compilation + caching is why production template engines are fast even for pages rendered thousands of times.

## Escaping (the security-critical part)

When generating **HTML**, template engines must **escape** output to prevent **XSS** (see owasp-top-10, security-headers): a value like `<script>` inserted into HTML must be escaped to `&lt;script&gt;` so it's shown as text, not executed. Good engines **autoescape by default** — escaping all interpolated values unless explicitly marked safe. This is a major reason to use a real template engine rather than string concatenation (which forgets to escape and creates XSS holes).

## Logic-ful vs Logic-less

A design spectrum:
- **Logic-ful** (Jinja2, ERB) — allow significant logic in templates (expressions, filters, some code). Powerful and convenient, but can tangle logic into presentation.
- **Logic-less** (Mustache) — deliberately minimal (just placeholders and simple sections), forcing logic into the code and keeping templates dumb/portable. Cleaner separation, less power.
The trade-off: convenience/power vs strict separation of concerns.

## Pitfalls (in understanding/using)

- **String-concatenating HTML** instead of a template engine → forgotten escaping → XSS holes; use an autoescaping engine.
- **Disabling autoescape / marking untrusted data "safe"** → XSS (only mark genuinely-safe content).
- **Server-Side Template Injection (SSTI)** — letting **users** control the template itself (not just the data) → code execution; never render user-supplied templates (see owasp-top-10).
- Putting **too much logic** in templates (logic-ful) → unmaintainable, untestable presentation.
- Not **compiling/caching** templates → slow rendering under load.
- Confusing template **data** (safe to interpolate, escaped) with the **template** (must be trusted).
