---
name: web-perception-and-dom-for-agents
description: How a web page is turned into something an LLM agent can actually understand and act on — web perception for agents. Covers why raw HTML is too big/noisy, using the accessibility tree, extracting and INDEXING interactive elements, DOM-vs-screenshot (or hybrid) perception, and token-budget pruning. Use to design the observation layer of a browser agent so the model sees a clean, actionable representation of the page.
category: ai-ml-internals
keywords_vi: cảm nhận trang web cho agent biến trang thành thứ llm hiểu và thao tác được, html thô quá lớn và nhiễu, dùng cây trợ năng accessibility tree, trích và đánh số phần tử tương tác indexing interactive elements, cảm nhận dom so với ảnh chụp màn hình screenshot hoặc lai, cắt tỉa theo ngân sách token
---

# Web Perception & DOM for Agents

Before a browser agent can decide "click the login button", it has to **perceive** the page in a form an LLM can consume. This is the observation half of the browser-agent loop, and it's deceptively hard: a real web page's **raw HTML is enormous and noisy** (scripts, tracking, styling, hidden nodes), far too big and useless to hand to a model. Good **web perception** distills the page into a **compact, actionable** representation the model can reason over (see browser-automation-for-agents, computer-use-and-gui-agents, agent-computer-interface).

## Why Raw HTML Doesn't Work

A modern page can be **hundreds of KB** of HTML — most of it irrelevant to the task (analytics, inline SVGs, framework noise, invisible elements). Dumping it into the prompt blows the token budget, buries the interactive elements, and confuses the model. You need to **extract signal**: what's on the page, what's **interactive**, and what's **visible**.

## The Accessibility Tree: Perception Done Right

The best structured source is usually the **accessibility (a11y) tree** — the same semantic representation screen readers use. It exposes each element's **role** (button, link, textbox, checkbox), **name/label**, **value**, and **state** (disabled, checked, expanded), while dropping styling and noise. It's compact, semantically meaningful, and roughly reflects what a **user perceives**, so it's ideal for an agent. Perception layers extract the a11y tree (or a pruned DOM) and turn it into a short list the model can read.

## Indexing Interactive Elements

The crucial trick: **assign a stable index/id to each interactive element** and present them as a numbered list:
```
[0] button "Sign in"
[1] textbox "Email"
[2] textbox "Password"
[3] link "Forgot password?"
```
Now the model acts by **index** — "type into [1]", "click [0]" — instead of guessing a brittle CSS selector or XPath. The perception layer maps index → real element handle for the automation driver. This indexed action space is far more reliable than letting the LLM invent selectors, and it's compact.

## DOM vs Screenshot vs Hybrid

- **DOM/a11y-tree (text)** — compact, precise element references, cheap; but misses purely-visual cues (canvas, images, custom-rendered widgets) and layout.
- **Screenshot (vision)** — the model *sees* the page like a human (computer-use style); handles visual/canvas content, but needs coordinate grounding and is heavier/costlier (see computer-use-and-gui-agents).
- **Hybrid** — a11y-tree for element references **plus** a screenshot (often with numbered boxes over elements) so the model gets both structure and appearance. Increasingly the strong default.

## Token-Budget Pruning

Even the a11y tree can be big. Prune to fit the budget: keep **visible, in-viewport, interactive** elements; drop offscreen/hidden nodes; truncate long text; collapse repetitive lists; optionally focus on the region relevant to the goal. Less, but *relevant*, beats a complete dump.

## Design Guidance (for understanding/using)

- **Extract the accessibility tree / a pruned semantic DOM**, not raw HTML — role/name/state per element.
- **Index interactive elements** and let the model act by index — avoids brittle model-guessed selectors.
- **Prune to visible + interactive + in-viewport**, truncate/collapse to fit the token budget.
- **Use a hybrid (a11y + annotated screenshot)** when pages have visual/canvas content the DOM can't convey.
- **Keep the representation stable** across steps so element indices don't shuffle unexpectedly.

## Pitfalls (in understanding/using)

- Feeding **raw HTML** to the model → token blowup, noise, poor action accuracy.
- Letting the model reference **raw CSS/XPath** → brittle; index elements instead.
- **DOM-only** perception on canvas/image-heavy pages → the agent is blind to visual content; add a screenshot.
- No **pruning** → offscreen/hidden elements clutter the context and mislead actions.
- Unstable indexing (indices shift each step) → the model clicks the wrong element.
