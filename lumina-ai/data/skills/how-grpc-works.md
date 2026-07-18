---
name: how-grpc-works
description: How gRPC works — a high-performance RPC framework using Protocol Buffers for typed contracts and binary serialization over HTTP/2, code generation, streaming, and how it compares to REST/JSON. Use to understand gRPC, Protocol Buffers/protobuf, RPC, service-to-service communication, or gRPC vs REST.
category: engineering
keywords_vi: grpc hoạt động thế nào, remote procedure call rpc, protocol buffers protobuf, nhị phân http2, code generation, streaming, grpc vs rest, giao tiếp service
---

# How gRPC Works

gRPC is a framework for calling methods on a remote service as if they were local functions (**Remote Procedure Call**), designed for fast, typed, service-to-service communication. It's popular for internal **microservices** where efficiency and strict contracts matter (see microservices-and-boundaries).

## The Core Idea: RPC with a Contract

Instead of thinking in terms of HTTP verbs and URLs (like REST), you define **services and methods** in a schema and call them like functions: `client.GetUser(id)`. The plumbing (serialization, network, HTTP) is generated and hidden. This makes cross-service calls feel like local calls, with a compiler-checked contract on both ends.

## Protocol Buffers (the contract + wire format)

You define the API in a **`.proto`** file — messages (typed structs) and services (methods with request/response types):
```proto
message UserRequest { int32 id = 1; }
message User { int32 id = 1; string name = 2; }
service UserService { rpc GetUser(UserRequest) returns (User); }
```
**Protocol Buffers (protobuf)** then:
- **Generate code** for client and server in many languages from this one definition — strongly-typed stubs, no hand-written serialization. The `.proto` is the single source of truth shared by both sides.
- Serialize messages to a compact **binary** format (field numbers, not field names) — much smaller and faster to encode/parse than JSON text. The numbered fields also enable **schema evolution**: add fields without breaking old clients (they ignore unknown fields), as long as you don't reuse/renumber.

## HTTP/2 Transport & Streaming

gRPC runs over **HTTP/2**, which brings multiplexing (many calls over one connection), header compression, and — crucially — **streaming**. gRPC supports four call types:
- **Unary** — one request, one response (like a normal function call).
- **Server streaming** — one request, a stream of responses (e.g. live updates).
- **Client streaming** — a stream of requests, one response (e.g. uploading chunks).
- **Bidirectional streaming** — both sides stream concurrently (e.g. chat, real-time sync).
This makes gRPC strong for streaming/real-time internal APIs that REST handles awkwardly.

## gRPC vs REST/JSON

- **gRPC** — binary (small/fast), strict typed contract with codegen, HTTP/2 streaming, great for **internal service-to-service** and polyglot backends. Downsides: not human-readable, needs tooling, limited direct browser support (needs gRPC-Web/proxy), harder to debug by eye.
- **REST/JSON** — human-readable, universally supported (browsers, curl), looser typing. Great for **public/browser-facing** APIs.
Many systems use both: REST/GraphQL at the edge, gRPC between internal services.

## Pitfalls (in understanding/using)

- Using gRPC for **public/browser** APIs without gRPC-Web/a gateway — browsers can't speak raw gRPC.
- **Reusing or renumbering** protobuf field numbers → breaks wire compatibility (only add new numbers; never repurpose old ones).
- Forgetting it's **binary** — you can't just eyeball traffic; use proper tooling (grpcurl) to debug.
- Ignoring **deadlines/timeouts and cancellation** (gRPC has first-class support — use it; see retries-and-resilience).
- Treating the `.proto` casually — it's a shared contract; breaking changes ripple to every consumer.
- Over-adopting gRPC where simple REST would do (added complexity for external-facing or simple APIs).
