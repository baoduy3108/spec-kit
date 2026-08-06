---
name: progressive-disclosure
description: Progressive disclosure — showing only what's needed now and revealing complexity on demand (advanced sections, "show more", accordions, staged flows, sensible defaults). Balances simplicity for novices with power for experts. Use when a UI feels overwhelming, has too many options, or needs to serve both beginners and advanced users.
category: design
keywords_vi: tiết lộ dần, progressive disclosure, ẩn phần nâng cao, nút xem thêm show more, accordion, mặc định hợp lý bớt lựa chọn, đơn giản cho người mới mạnh cho chuyên gia, giao diện bớt quá tải rối
---

# Progressive Disclosure

Progressive disclosure is the technique of showing users only what they need at each moment, and revealing additional complexity **on demand**. It resolves the core tension of interface design: novices want simplicity, experts want power, and cramming everything on screen serves neither.

## Why It Works

Every visible option costs attention and adds to the perceived complexity of a screen. A page with 30 controls feels intimidating even if a user only needs 3. By hiding the rarely-used behind a deliberate reveal, you make the **common case simple** while keeping the **advanced case reachable**. This maps to how people actually learn a tool — master the basics, then grow into the depth.

## Common Patterns

- **"Advanced options" / "More settings"** — a collapsed section for power features (custom config, edge-case toggles). Most users never open it; those who need it know to look.
- **"Show more" / "Read more"** — truncate long content, expand on click.
- **Accordions** — one section open at a time; great for FAQs, settings groups, long forms.
- **Staged flows / wizards** — break a big task into steps so each screen is small and focused (see user-flows). Only ask for what's relevant at that step.
- **Contextual reveal** — a field appears only when a prior choice makes it relevant (choosing "Other" reveals a text box; "Ship to different address" reveals the address fields).
- **Defaults that hide decisions** — sensible defaults mean most users never touch a setting at all. The best disclosure is the option the user never had to consider.

## Do It Well

- **Signal there's more** — the entry point (a chevron, "Advanced", a "+N more") must be visible and clearly labeled, or you've hidden features into oblivion. Discoverability is the whole risk of disclosure.
- **Put the right things behind it** — hide the *advanced/rare*, never the *essential*. If a novice needs it to succeed, it can't be buried. Getting this split right is the skill.
- **Predictable, not surprising** — the label should tell the user what they'll get, so opening it feels intentional, not like a mystery box.
- **Remember state** where helpful — if a user always opens "advanced", consider keeping it open for them.

## The Balance

Progressive disclosure is powerful but abusable: hide too much and you frustrate people hunting for a basic feature; the reveal becomes a maze. The judgment call is *what counts as advanced* — informed by real usage data, not guesses. Frequently-used things stay visible; genuinely occasional things fold away.

Applied well, it's how one interface can feel effortless to a first-timer and complete to a daily power user — the same screen, disclosing exactly as much as each person needs.
