---
name: playwright-testing
description: Playwright end-to-end testing best practices — role-based locators, web-first auto-retrying assertions, no fixed timeouts, test isolation, fixtures over globals, Page Object Model, CI retry/trace config, and mocking external services (never your own app). Use when writing, debugging, or scaling Playwright tests or fixing flaky ones.
category: engineering
keywords_vi: playwright, viết test playwright, e2e test, getbyrole, flaky, test bị flaky, page object model, tự động hóa test web, web-first assertion
---

# Playwright Testing Patterns

Best-practice patterns for reliable, maintainable Playwright end-to-end tests.

## Locators — Role First

Prefer `getByRole()` over CSS/XPath as the first choice — it mirrors how users perceive the page and is resilient to markup changes. Fall back to `getByLabel`/`getByText`/`getByTestId` only when role selection doesn't fit. Avoid brittle CSS/XPath chains tied to DOM structure.

## Assertions & Waiting — Web-First, No Fixed Timeouts

Use **web-first assertions** that auto-retry: `await expect(locator).toBeVisible()`, `.toHaveText(...)`. These poll until the condition holds or times out.

```js
// ✅ auto-retries
await expect(page.getByRole('heading')).toHaveText('Welcome')
// ❌ does NOT retry — snapshots once
expect(await page.getByRole('heading').textContent()).toBe('Welcome')
```

**Never** use `page.waitForTimeout(ms)` — arbitrary sleeps are the #1 source of flakiness. Wait on a *condition* (visibility, URL, network response), not a duration.

## Test Isolation

Every test runs fully isolated — no shared state, no execution-order dependency. One behaviour per test (multiple related assertions are fine). Set up state via fixtures or API calls in `beforeEach`, not by relying on a previous test having run.

## Fixtures over Globals

Share setup via `test.extend()` fixtures rather than module-level globals — fixtures compose, scope cleanly, and tear down automatically. Use the **Page Object Model** for complex pages (encapsulate selectors + actions), but don't over-abstract simple flows; helper functions are fine for small shared steps.

## CI & Flakiness

- `retries: 2` in CI, `0` locally — surface instability locally where you'll fix it, tolerate transient CI noise.
- `trace: 'on-first-retry'` — capture a debugging trace only when a test retries, avoiding CI slowdown.
- Run tests in parallel; ensure isolation makes that safe.
- A test that passes on retry but fails first is *flaky* — fix the root cause (usually a missing web-first wait), don't just accept the retry.

## Mock vs Real

Mock **external** services you don't own — third-party APIs, payment gateways, email providers — for speed and determinism. **Never mock your own application** under test; that's the thing you're verifying. Decide per-dependency: is it in scope of what this test proves?
