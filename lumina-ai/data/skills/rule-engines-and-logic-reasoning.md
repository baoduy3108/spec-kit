---
name: rule-engines-and-logic-reasoning
description: Rule engines and symbolic logic reasoning — forward vs backward chaining, the Rete algorithm, Datalog and logic programming, ontologies and SPARQL over knowledge graphs, and combining symbolic reasoning with LLMs (neuro-symbolic) for accountable, auditable inference. Use when building a rule engine, reasoning over a knowledge graph, writing Datalog/SPARQL, designing an expert system, or adding explainable symbolic logic to an AI.
category: ai-agent
keywords_vi: rule engine, forward chaining, backward chaining, rete, datalog, sparql, ontology, suy luận theo luật, neuro-symbolic, hệ chuyên gia expert system
---

# Rule Engines & Logic Reasoning

Not all AI reasoning should be a black-box LLM. **Symbolic reasoning** — rules, logic, knowledge graphs — gives **exact, explainable, auditable** inference: given facts and rules, derive conclusions you can *trace*. It complements LLMs (neuro-symbolic), and underpins knowledge-graph platforms that add provenance and accountability (see how-graphrag-works, graph-databases, formal-logic-and-argumentation).

## Forward vs Backward Chaining

- **Forward chaining (data-driven)** — start from known **facts**, apply rules to derive new facts, repeat until nothing new. "What can I conclude?" Good for monitoring, alerting, derived state (facts stream in → conclusions fire).
- **Backward chaining (goal-driven)** — start from a **goal**, find rules whose conclusion matches, recursively prove their premises. "Is X true, and why?" Good for queries/diagnosis (Prolog works this way).
- Choose by direction of the problem: many facts → few conclusions (forward) vs specific question (backward).

## The Rete Algorithm

- Naively re-checking every rule against every fact each cycle is O(rules×facts) — too slow at scale.
- **Rete** builds a **network** that caches partial matches, so only *changes* to the fact base propagate. It trades memory for speed and makes production rule engines (Drools-style) practical for thousands of rules/facts. Know it exists when rule evaluation is the bottleneck.

## Datalog & Logic Programming

- **Datalog** — a declarative query/rule language: define relations and rules (`ancestor(X,Z) :- parent(X,Y), ancestor(Y,Z)`), and the engine computes all derivable facts (with **recursion**, unlike plain SQL). Great for graph reachability, access control, program analysis.
- **Logic programming (Prolog)** — backward-chaining resolution over Horn clauses; unification + backtracking.
- Both are **declarative**: you state *what* holds, the engine figures out *how* to derive it.

## Ontologies, Knowledge Graphs & SPARQL

- **Ontology** — a formal schema of classes, properties, and relationships (RDFS/OWL); it lets you **infer** implicit facts (if `Dog subClassOf Mammal` and `x is a Dog`, then `x is a Mammal`).
- **Knowledge graph** — entities + typed relations as triples (subject-predicate-object). **SPARQL** queries them; reasoners derive entailments.
- **Provenance** — track *where each fact came from* and *which rules derived it* (e.g. W3C PROV-O) so conclusions are **auditable** — critical for accountable AI.

## Neuro-Symbolic: Combining with LLMs

- LLMs are great at **fuzzy** language/perception but hallucinate and can't guarantee consistency. Symbolic engines are **exact but brittle** (need clean facts/rules).
- **Combine**: let the LLM **extract** facts/relations from text (NER, relation extraction) into a knowledge graph; let the **rule engine reason** over them deterministically; use the LLM to explain results. You get LLM flexibility with **verifiable, traceable** conclusions.
- Use symbolic reasoning where **correctness and audit trails matter** (compliance, finance, medical rules), LLMs where nuance/language matters.

Add exact, explainable reasoning with **rule engines and symbolic logic**: pick **forward chaining** for data-driven derivation or **backward chaining** for goal-driven queries, use **Rete** when rule evaluation must scale, and express recursive logic in **Datalog**/logic programming. Reason over **ontologies/knowledge graphs via SPARQL** with **provenance** for auditability — and go **neuro-symbolic** by having LLMs populate the facts while the engine derives traceable, verifiable conclusions.
