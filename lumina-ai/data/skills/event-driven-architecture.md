---
name: event-driven-architecture
description: How event-driven architecture works — services communicating asynchronously by emitting and reacting to events instead of direct calls, loose coupling, event brokers, choreography vs orchestration, and the trade-offs (scalability vs harder debugging/consistency). Use to understand event-driven systems, pub/sub architecture, async decoupling, or event brokers like Kafka.
category: engineering
keywords_vi: event-driven architecture, kiến trúc hướng sự kiện, giao tiếp bất đồng bộ, phát và phản ứng sự kiện, loose coupling lỏng lẻo, event broker kafka, choreography orchestration, eventual consistency
---

# Event-Driven Architecture

Event-driven architecture (EDA) is a style where components communicate by **producing and reacting to events** — "something happened" notifications — rather than calling each other directly. It enables loose coupling and scalability, at the cost of harder reasoning about flow and consistency.

## Events vs Direct Calls

- **Request/response (synchronous)** — Service A **calls** Service B and waits. A must know B, and A is blocked/coupled to B's availability and latency.
- **Event-driven (asynchronous)** — Service A **emits an event** ("OrderPlaced") to a broker and moves on, not knowing or caring who consumes it. Interested services **subscribe** and react on their own. The producer and consumers are **decoupled** — they don't call each other directly (see message-queues-and-events).
This inverts the dependency: producers announce facts; consumers decide what to do.

## Loose Coupling (the main benefit)

Because producers don't know their consumers, you can **add new consumers** to an existing event without changing the producer (add a "send email" service that reacts to OrderPlaced — the order service is untouched). Services scale, deploy, and fail **independently**. A slow/down consumer doesn't block the producer (the broker buffers events). This flexibility and resilience is EDA's core appeal for complex, evolving systems (see microservices-and-boundaries).

## The Event Broker

A **broker/event bus** (Kafka, RabbitMQ, Pulsar, cloud pub/sub) sits between producers and consumers: it receives events and delivers them to subscribers, buffering when consumers are slow/down and often **retaining** events (Kafka keeps a durable log you can replay). Choose based on needs: durable log & replay (Kafka), flexible routing (RabbitMQ), managed simplicity (cloud pub/sub). See stream-processing for processing event streams.

## Choreography vs Orchestration

For multi-step workflows across services (see saga-pattern):
- **Choreography** — pure EDA: each service reacts to events and emits its own; the workflow **emerges** from the chain of reactions. Maximally decoupled, but the end-to-end flow is **implicit** and hard to see/debug.
- **Orchestration** — a central coordinator directs the steps. Explicit and traceable, but more coupled.
Balance decoupling against understandability.

## The Trade-offs (why not always EDA)

Loose coupling isn't free:
- **Harder to reason about / debug** — no single call stack; the flow is spread across async reactions. "What happens when an order is placed?" has no one place to look.
- **Eventual consistency** — reactions happen asynchronously, so the system is briefly inconsistent (see how-distributed-consensus-works); design for it.
- **Ordering, duplicates, and delivery** — events can arrive out of order or more than once; consumers must be **idempotent** (see idempotency).
- **Observability is essential** — you need distributed tracing (see distributed-tracing) to follow flows.
Use EDA where decoupling/scalability pays off; don't force it on simple synchronous flows.

## Pitfalls (in understanding/using)

- **Async everywhere** by default — a simple request/response is often clearer; use EDA where decoupling is genuinely valuable.
- **Untraceable flows** (especially choreography) → very hard debugging; invest in tracing/observability and consider orchestration for complex flows.
- Consumers not **idempotent** → duplicate events cause double-processing (see idempotency).
- Ignoring **eventual consistency** — expecting immediate consistency across services.
- **Event schema evolution** breaking consumers — version events carefully (see how-json-serialization-works).
- Treating the **broker** as a simple queue when it's a critical, must-be-HA dependency.
- Losing sight of business flow — no one owns the end-to-end process (document it, use correlation IDs).
