---
name: computer-use-and-gui-agents
description: How vision-based agents operate a computer like a human — computer use / GUI agents that take a screenshot, reason, and output mouse/keyboard actions by pixel coordinates. Covers screenshot-perceive-act loops, coordinate grounding, set-of-mark prompting, why GUI agents generalize beyond APIs/DOM but are slower/less reliable, and safety. Use to understand Claude/OpenAI computer-use, desktop automation agents, and DOM-vs-vision trade-offs.
category: ai-ml-internals
keywords_vi: agent dùng máy tính bằng thị giác gui agent chụp màn hình suy luận rồi xuất thao tác chuột bàn phím theo toạ độ điểm ảnh, vòng lặp chụp cảm nhận hành động, định vị toạ độ grounding, set-of-mark đánh dấu phần tử, gui agent tổng quát hơn api dom nhưng chậm và kém tin cậy hơn, an toàn computer use claude openai
---

# Computer Use & GUI Agents

Some tasks have **no API and no clean DOM** — a native desktop app, a canvas-heavy tool, a legacy system, an arbitrary screen. **Computer-use / GUI agents** (Claude computer use, OpenAI's Operator/computer-use, open desktop agents) handle these the way a human would: **look at the screen, decide, and move the mouse / type**. Instead of calling functions or reading the DOM, the model perceives a **screenshot** and outputs **low-level GUI actions by pixel coordinate**. This generalizes to *anything on a screen*, at the cost of speed and reliability (see browser-automation-for-agents, web-perception-and-dom-for-agents, agent-safety-and-action-guardrails).

## The Loop: Screenshot → Reason → Act (by coordinate)

1. **Screenshot** — capture the current screen as an image.
2. **Reason** — a **vision-capable** LLM looks at the pixels, locates the target ("the blue Submit button"), and decides the action.
3. **Act** — output a concrete GUI command: `click(x, y)`, `type("text")`, `key("Enter")`, `scroll`, `drag`. A controller executes it on the real machine/VM.
4. **Observe** — take a new screenshot; the loop continues.

The defining feature (and difficulty) is **coordinate grounding**: the model must map "the button I see" to **accurate pixel coordinates** to click. Getting this precise is the core capability that makes computer-use models special.

## Set-of-Mark and Grounding Aids

Pure "guess the coordinates" is error-prone, so systems help the model:
- **Set-of-Mark prompting** — overlay **numbered boxes/labels** on detected UI elements in the screenshot, so the model picks a **label** ("click 7") instead of raw coordinates; the system maps the label back to coordinates. Far more reliable.
- **Hybrid with structure** — where an accessibility tree/DOM exists, combine it with the screenshot (best of both — see web-perception-and-dom-for-agents).
- **Grid/zoom** techniques to refine coordinates.

## GUI-Agent vs DOM/API — the Trade-off

- **Generality** — vision GUI agents work on **anything visible** (desktop apps, games, canvas, remote screens) where no API/DOM exists. That's their superpower.
- **Reliability** — they're **less reliable** than API/DOM automation: coordinate errors, misreads, and visual ambiguity cause wrong clicks. Where a clean API or a11y tree exists, **prefer it**.
- **Speed/cost** — a vision model call + screenshot per step is **slow and expensive**; long flows add up.
So: use **API > structured DOM/a11y > vision GUI** in that order of preference; drop to vision only when higher-signal interfaces aren't available.

## Safety Is Critical

A computer-use agent can do **anything a user can** — delete files, send messages, make purchases, change settings — driven by an LLM susceptible to mistakes and prompt injection (a malicious webpage/screenshot can try to hijack it). So it needs strong controls: run in a **sandboxed VM**, require **human confirmation for consequential actions**, restrict scope, and monitor (see agent-safety-and-action-guardrails, sandboxed-code-execution-for-agents).

## Design Guidance (for understanding/using)

- **Prefer API > DOM/a11y > vision GUI** — use computer-use only when no higher-signal interface exists.
- **Use set-of-mark / numbered elements** instead of raw coordinate guessing — big reliability gain.
- **Run in a sandboxed VM** and **confirm consequential actions** — the agent can do real damage.
- **Expect higher latency/cost and lower reliability** than API/DOM automation; keep flows short.
- **Combine screenshot + structure** where available for the most robust perception.

## Pitfalls (in understanding/using)

- Using a **GUI/vision** agent where a clean **API or DOM** exists → slower, costlier, more error-prone for no reason.
- Relying on **raw coordinate** guessing → mis-clicks; use set-of-mark labeling.
- Running computer-use **on the host, unsandboxed** → an errant/injected action damages the real machine.
- No **confirmation** on consequential actions → accidental purchases/deletions/messages.
- Ignoring **prompt injection via screen content** → a malicious page can hijack the agent's actions.
