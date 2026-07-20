---
name: llm-function-calling
description: How LLM function/tool calling works — giving a model tool definitions (name, description, parameter schema), the model choosing a tool and emitting structured arguments, your code executing it and returning results, and the agent loop. Use to understand function calling, tool use, connecting LLMs to APIs/data, or building agents that take actions.
category: ai-agent
keywords_vi: function calling, tool definition, agent loop tool, gọi hàm công cụ llm, model chọn tool emit arguments, thực thi trả kết quả, kết nối llm với api
---

# LLM Function Calling

Function calling (tool use) lets an LLM **take actions and fetch data** beyond generating text — search the web, query a database, call an API, run a calculation. It's the mechanism that turns a chatbot into an **agent** that can *do* things (see tool-design, multi-agent-patterns). Understanding the flow demystifies how agents work.

## The Core Flow

Function calling is a structured handshake between the model and **your** code:
1. **You define tools** — each with a **name**, a **description** (what it does / when to use it), and a **parameter schema** (typed inputs — see structured-output-from-llms). You send these definitions with the request.
2. **The model decides** — given the user's request and the available tools, the model chooses whether to call a tool and, if so, **which** one, emitting the **arguments** as structured data matching the schema (not prose).
3. **Your code executes** — the model **does not** run the tool; **you** parse its chosen call, execute the actual function (hit the API, run the query), and get a result. (This is the critical control/security point.)
4. **Return the result** — you feed the tool's output back to the model, which then uses it to continue — answer the user, or call another tool.
The model orchestrates *what* to do; your code does it. The LLM never directly touches your systems.

## The Agent Loop

For multi-step tasks, this becomes a **loop**: the model calls a tool → gets a result → decides the next step (another tool, or finish) → repeats until done (see agent-planning-patterns). This "reason → act → observe → repeat" cycle (ReAct) is how agents accomplish tasks requiring several actions. You cap iterations to prevent runaway loops.

## Writing Good Tool Definitions

The model relies entirely on your **descriptions** to choose correctly (it can't see the implementation):
- **Clear names and descriptions** — say precisely what the tool does and **when** to use it (and when not). Ambiguous descriptions → the model picks the wrong tool or misuses it.
- **Well-typed parameters** with descriptions and enums — so arguments are valid and unambiguous.
- **Few, well-scoped tools** — too many overlapping tools confuse the model; keep the set focused (see tool-design).
- Return **useful, concise** results (and clear errors so the model can recover/retry).

## Security & Control (critical)

Because the model decides *which actions to request*, and your code executes them, this is a **major security surface**:
- **Validate every tool call** — the model can emit wrong/malicious arguments (especially under prompt injection — see prompt-injection-defense). Never pass model-chosen arguments unchecked into SQL, shell, file paths, or sensitive APIs.
- **Least privilege** — give tools the minimum access needed; sandbox dangerous ones; require confirmation for irreversible actions.
- **Don't trust tool outputs** blindly (they may contain injected instructions).

## Pitfalls (in understanding/using)

- **Vague tool descriptions** → the model picks the wrong tool or fills bad arguments; write them like precise docs.
- **Executing model-chosen arguments unchecked** → injection/damage (SQL/shell/path); validate everything (see prompt-injection-defense, owasp-top-10).
- **Too many overlapping tools** → the model gets confused; keep the toolset small and distinct.
- **No iteration cap** → runaway agent loops (cost, infinite tool-calling).
- Assuming the model **executes** the function — *you* do; it only requests.
- Poor **error handling** — tools that fail silently or return unclear errors stall the agent (return actionable errors so it can recover).
- Over-privileged tools / no confirmation on destructive actions.
