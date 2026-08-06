---
name: hateoas-and-rest-maturity
description: The Richardson Maturity Model and HATEOAS — the levels of REST (plain RPC → resources → HTTP verbs → hypermedia), what HATEOAS (links in responses) means, and why most "REST" APIs stop below full hypermedia. Use to understand the Richardson Maturity Model, HATEOAS, hypermedia APIs, REST levels, or how RESTful an API really is.
category: engineering
keywords_vi: hateoas và độ trưởng thành rest, richardson maturity model, các cấp rest rpc resource http verb hypermedia, hateoas là link trong response, vì sao phần lớn api rest dừng dưới hypermedia
---

# HATEOAS and REST Maturity

Most APIs called "REST" aren't fully RESTful — and that's usually fine. The **Richardson Maturity Model** describes REST as **levels** of adherence to its constraints, and the top level — **HATEOAS** (hypermedia) — is the one almost everyone skips. Understanding the levels clarifies what "RESTful" actually means and helps you decide **how much** REST you need (see rest-api-design-principles).

## The Richardson Maturity Model (levels of REST)

REST isn't binary; it's a **spectrum** of maturity:
- **Level 0 — "The Swamp of POX"** — a single endpoint, everything is a POST; HTTP is just a transport tunnel (RPC/SOAP-style). Not RESTful at all.
- **Level 1 — Resources** — introduce multiple **resource URLs** (`/users/123`, `/orders/45`) instead of one endpoint. You have *nouns* now.
- **Level 2 — HTTP verbs & status codes** — use **methods** (GET/POST/PUT/DELETE) for their meaning and **proper status codes** (see rest-api-design-principles). **This is where most "REST" APIs live** — and it captures the bulk of REST's practical benefits (predictability, caching, tooling).
- **Level 3 — HATEOAS (hypermedia)** — responses include **links** telling the client what it can do next. The "true REST" level, rarely fully implemented.
Climbing the levels = more RESTful. Level 2 is the pragmatic sweet spot for the vast majority of APIs.

## HATEOAS: Hypermedia as the Engine of Application State

**HATEOAS** means the API's responses include **hypermedia links** guiding the client to available **next actions and related resources** — the client **discovers** what it can do from the responses, rather than hard-coding URLs. Example: a response for an order might include links like:
```
"_links": {
  "self":   { "href": "/orders/45" },
  "cancel": { "href": "/orders/45/cancel" },
  "items":  { "href": "/orders/45/items" }
}
```
The idea (the theoretical heart of REST, per Fielding): a client starts at one URL and **navigates via links**, like a human browsing a website, so the server can **change URLs and available actions** without breaking clients that follow links instead of constructing URLs. It decouples clients from URL structure and makes the API **self-describing/discoverable**.

## Why Most APIs Skip HATEOAS

Despite being "true REST," full HATEOAS is **rarely** implemented, because:
- **Complexity** — building and consuming hypermedia is more work on both sides.
- **Client tooling** — most clients/SDKs hard-code URLs from docs anyway; they don't dynamically follow links.
- **Marginal benefit for many APIs** — the decoupling payoff often doesn't justify the cost, especially for internal or well-documented public APIs.
So the pragmatic reality: **most successful "REST" APIs are Level 2** (resources + verbs + status codes), and that's a perfectly reasonable, widely-accepted choice. Know what HATEOAS is, use it when discoverability/loose-coupling genuinely matters (some public/hypermedia APIs), and don't feel obligated otherwise.

## Design Guidance

- **Aim for Level 2** (resources, correct HTTP methods, proper status codes) — it delivers most of REST's value and is the norm.
- **Consider HATEOAS (Level 3)** only when **discoverability / decoupling clients from URLs** is a real requirement (some public/hypermedia APIs, long-lived clients).
- **Don't dismiss non-hypermedia APIs as "not real REST"** in a way that blocks shipping — Level 2 is a legitimate, pragmatic target.
- **Be consistent** about whichever level you choose.
- If you do HATEOAS, use a **standard hypermedia format** (HAL, JSON:API) rather than inventing links ad hoc.

## Pitfalls (in understanding/using)

- Thinking REST is **all-or-nothing** → it's a maturity spectrum; Level 2 is the practical target.
- **Purism** — insisting on HATEOAS everywhere despite its cost and clients that won't use it.
- Calling a **Level 0/1** RPC-over-HTTP API "REST" → it isn't (single endpoint / no verb semantics).
- Implementing **half-baked** hypermedia (ad-hoc links no client follows) → complexity with no payoff.
- Ignoring the **practical** benefits of Level 2 (caching, tooling, predictability) by over-focusing on hypermedia.
- Adding HATEOAS where clients just **hard-code URLs** anyway → wasted effort.
