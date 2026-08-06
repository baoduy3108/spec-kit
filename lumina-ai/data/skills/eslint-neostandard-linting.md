---
name: eslint-neostandard-linting
description: Configuring ESLint v9 with flat config and neostandard for JavaScript/TypeScript projects — new setup, legacy .eslintrc migration, CI/editor integration. Use when the user needs to set up or migrate ESLint linting for a JS/TS project.
category: engineering
keywords_vi: eslint config, eslint 9, flat config, neostandard, thiết lập linting javascript
---

# ESLint v9 & Neostandard Linting Setup

Configuring ESLint v9 with flat config and neostandard for JavaScript/TypeScript projects.

## Key Use Cases

- Establish linting in new or existing projects
- Transition from legacy `.eslintrc*` formats to modern flat config
- Adopt neostandard as a Standard-like baseline
- Integrate linting checks into CI pipelines and git hooks

## Quick Setup

```bash
npm install --save-dev eslint@9 neostandard
```

```js
// eslint.config.js
import neostandard from 'neostandard'
export default neostandard()
```

```bash
npx eslint .
```

## Implementation Path

1. **Neostandard basics** — installation and rule extension
2. **Flat config structure** — building ESLint v9 configurations for JS/TS
3. **Standard → neostandard migration** — upgrading from the older package
4. **Legacy ESLint migration** — safe conversion from `.eslintrc*` files
5. **CI & editor integration** — automation and IDE setup

## Guiding Philosophy

Pinned dependency versions for consistency, minimal explicit configurations, flat config as the standard for v9 projects, lint enforcement as a quality gate in CI, and auto-fix enabled only in local development workflows.
